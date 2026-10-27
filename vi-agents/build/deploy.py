#!/usr/bin/env python3
"""Build and deploy one Vi agent project to the Kore.ai Agent Platform through Arch MCP.

usage: deploy.py <project-dir> [--skip-mocks] [--no-publish] [--env dev]

<project-dir>/arch.json      project name, description, entry agent, model, agents
<project-dir>/mocks/*.js     one mock backend system per file (header declares the tool contract)
<project-dir>/agents/*.abl   agent sources; a line `#include-tools: a, b` expands to tool signatures

Steps: ensure project + model -> create/update/publish/activate one workflow per mock and
generate its workflow-backed tool -> assemble package in .build/ -> validate -> import ->
publish every agent -> create a deployment in the target environment.
Workflow IDs are cached in <project-dir>/.arch-state.json so reruns update in place.
"""
import argparse
import json
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from arch import ArchError, call, find_project, ok, wait_execution  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHARED_JS = (ROOT / "shared" / "personas.js").read_text()
ENVS = ("dev", "staging", "production")


def parse_mock(path):
    """Read the @-header of a mock file into a tool spec."""
    spec = {"name": path.stem, "inputs": [], "outputs": [], "effect": "read_only", "abl": ""}
    lines = path.read_text().splitlines()
    body, in_abl = [], False
    for ln in lines:
        s = ln.strip()
        if in_abl:
            if s.startswith("*/"):
                in_abl = False
            else:
                spec["abl"] += ln + "\n"
            continue
        if s.startswith("/* @abl"):
            in_abl = True
        elif s.startswith("// @description "):
            spec["description"] = s[len("// @description "):]
        elif s.startswith("// @effect "):
            spec["effect"] = s.split()[2]
        elif s.startswith("// @in "):
            m = re.match(r'// @in (\w+)(\?)?:(\w+)\s+"(.*)"', s)
            if not m:
                raise SystemExit(f"{path}: bad @in line: {s}")
            spec["inputs"].append({"name": m[1], "optional": bool(m[2]), "type": m[3], "description": m[4]})
        elif s.startswith("// @out "):
            spec["outputs"] += s.split()[2:]
        else:
            body.append(ln)
    spec["code"] = "\n".join(body).strip()
    if "description" not in spec or not spec["outputs"]:
        raise SystemExit(f"{path}: needs // @description and // @out")
    return spec


def signature(spec):
    params = ", ".join(f"{i['name']}{'?' if i['optional'] else ''}: {i['type']}" for i in spec["inputs"])
    return f"{spec['name']}({params}) -> object"


def tool_contract(spec, indent="  "):
    """Signature plus the contract properties shared by the tool file and agent declarations."""
    out = [indent + signature(spec), f'{indent}  description: "{spec["description"]}"',
           f"{indent}  effect: {spec['effect']}", f"{indent}  confirm: never"]
    if spec["inputs"]:
        out.append(f"{indent}  params:")
        for i in spec["inputs"]:
            out += [f"{indent}    {i['name']}:", f'{indent}      description: "{i["description"]}"']
    if spec["abl"]:
        out += [indent + "  " + ln for ln in spec["abl"].rstrip().splitlines()]
    return "\n".join(out)


def workflow_definition(spec):
    code = (SHARED_JS + "\nconst input = context.steps.start.output || {};\n"
            + "return (function (input) {\n" + spec["code"] + "\n})(input);\n")
    start_vars = [{"name": i["name"], "type": "json" if i["type"] in ("object",) else i["type"],
                   "required": not i["optional"], "description": i["description"]} for i in spec["inputs"]]
    nodes = [
        {"id": "start", "nodeType": "start", "name": "start", "position": {"x": 0, "y": 0},
         "config": {"inputVariables": start_vars}},
        {"id": "fn", "nodeType": "function", "name": "mock", "position": {"x": 240, "y": 0},
         "config": {"code": code}},
        {"id": "end", "nodeType": "end", "name": "end", "position": {"x": 480, "y": 0},
         "config": {"outputMapping": {o: "{{context.steps.mock.output.%s}}" % o for o in spec["outputs"]}}},
    ]
    edges = [{"id": "e1", "source": "start", "target": "fn", "sourceHandle": "on_success"},
             {"id": "e2", "source": "fn", "target": "end", "sourceHandle": "on_success"}]
    return nodes, edges


_WF_CACHE = {}


def existing_workflows(pid):
    if pid not in _WF_CACHE:
        r = ok("platform_workflows", {"action": "list", "projectId": pid, "limit": 200})
        items = r.get("data") or r.get("workflows") or []
        if isinstance(items, dict):
            items = items.get("workflows") or items.get("items") or []
        _WF_CACHE[pid] = {w["name"]: w.get("id") or w.get("_id") for w in items}
    return _WF_CACHE[pid]


def ensure_mock(pid, spec, state, env):
    """Create or update the mock workflow, publish and activate it everywhere; return its id."""
    nodes, edges = workflow_definition(spec)
    wf_name = ("m_" + spec["name"])[:30]
    wid = state["workflows"].get(spec["name"]) or existing_workflows(pid).get(wf_name)
    desc = f"MOCK backend for tool {spec['name']} - replace with the real Vi system integration"
    if wid:
        ok("platform_workflows", {"action": "update", "projectId": pid, "workflowId": wid,
                                  "nodes": nodes, "edges": edges, "description": desc})
    else:
        r = ok("platform_workflows", {"action": "create", "projectId": pid, "name": wf_name,
                                      "description": desc, "nodes": nodes, "edges": edges})
        wid = r["data"]["id"]
    state["workflows"][spec["name"]] = wid
    pub = ok("platform_workflows", {"action": "publish", "projectId": pid, "workflowId": wid,
                                    "changelog": "deploy.py"})
    ver = pub["version"]
    ok("platform_workflows", {"action": "activate_version", "projectId": pid, "workflowId": wid,
                              "version": ver, "environment": env})
    state["workflow_versions"][spec["name"]] = ver
    return wid


def smoke_mock(pid, wid, spec, sample):
    r = ok("platform_workflows", {"action": "execute", "projectId": pid, "workflowId": wid, "input": sample})
    e = wait_execution(pid, wid, r["executionId"])
    if e.get("status") != "completed":
        raise ArchError(f"mock {spec['name']} failed: {json.dumps(e)[:800]}")
    return e.get("output")


def expand_agent(src, specs, snippet_dir=None):
    out = []
    for ln in src.splitlines():
        m = re.match(r"(\s*)#include-snippet:\s*(\w+)", ln)
        if m:
            body = (snippet_dir / f"{m[2]}.abl").read_text().rstrip().splitlines()
            out += [m[1] + b if b.strip() else b for b in body]
            continue
        m = re.match(r"\s*#include-tools:\s*(.*)", ln)
        if m:
            for name in [n.strip() for n in m[1].split(",") if n.strip()]:
                if name not in specs:
                    raise SystemExit(f"#include-tools references unknown tool {name}")
                out.append(tool_contract(specs[name]))
        else:
            out.append(ln)
    return "\n".join(out) + "\n"


def summarize_issues(preview):
    blocking = []
    for i in (preview or {}).get("issues", []) + (preview or {}).get("syntaxErrors", []):
        tag = "BLOCK" if i.get("blocking") or i.get("severity") == "error" else "warn "
        line = f"  {tag} {i.get('code')} {i.get('agent') or i.get('file') or ''}: {str(i.get('message'))[:300]}"
        print(line)
        if tag == "BLOCK":
            blocking.append(line)
    return blocking


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project_dir")
    ap.add_argument("--skip-mocks", action="store_true", help="reuse cached workflow ids")
    ap.add_argument("--no-publish", action="store_true")
    ap.add_argument("--env", default="dev", choices=ENVS)
    ap.add_argument("--prune", action="store_true", help="delete project agents and tools that are not in the package")
    a = ap.parse_args()

    pdir = pathlib.Path(a.project_dir).resolve()
    cfg = json.loads((pdir / "arch.json").read_text())
    state_path = pdir / ".arch-state.json"
    state = json.loads(state_path.read_text()) if state_path.exists() else {}
    state.setdefault("workflows", {})
    state.setdefault("workflow_versions", {})

    pid = state.get("projectId") or find_project(cfg["name"])
    if not pid:
        ok("platform_projects", {"action": "create", "name": cfg["name"], "description": cfg["description"]})
        pid = find_project(cfg["name"])
    state["projectId"] = pid
    print(f"project {cfg['name']}: {pid}")

    opts = ok("platform_config", {"action": "get_model_options", "projectId": pid})["data"]["options"]
    model = next((o for o in opts if o["displayName"] == cfg["model"]), None)
    if not model:
        raise SystemExit(f"model {cfg['model']} not available: {[o['displayName'] for o in opts]}")
    binding = {"tenantModelId": model["tenantModelId"], "connectionId": model["connectionId"]}
    ok("platform_config", {"action": "set_model_selection", "projectId": pid,
                           "selected": [binding], "defaultBinding": binding})

    mock_files = sorted((pdir / "mocks").glob("*.js")) + [ROOT / "shared" / "mocks" / f"{n}.js" for n in cfg.get("shared_mocks", [])]
    specs = {s["name"]: s for s in (parse_mock(p) for p in mock_files)}
    build = pdir / ".build"
    for sub in ("agents", "tools"):
        (build / sub).mkdir(parents=True, exist_ok=True)
        for f in (build / sub).iterdir():
            f.unlink()

    tools_manifest = {}
    for name, spec in specs.items():
        if a.skip_mocks and name in state["workflows"]:
            wid = state["workflows"][name]
        else:
            wid = ensure_mock(pid, spec, state, a.env)
            state_path.write_text(json.dumps(state, indent=2))
            sample = {i["name"]: (cfg.get("smoke_inputs", {}).get(i["name"], "9800000001")) for i in spec["inputs"]
                      if not i["optional"]}
            out = smoke_mock(pid, wid, spec, sample)
            print(f"  mock {name}: {json.dumps(out)[:160]}")
        (build / "tools" / f"{name}.tools.abl").write_text(
            "TOOLS:\n" + tool_contract(spec) + f"\n    type: workflow\n    workflow_id: {wid}\n    timeout_ms: 8000\n")
        tools_manifest[name] = {"path": f"tools/{name}.tools.abl"}

    agents_manifest = {}
    for agent_name, rel in cfg["agents"].items():
        src = (pdir / rel).read_text()
        (build / "agents" / pathlib.Path(rel).name).write_text(expand_agent(src, specs, pdir / "agents" / "snippets"))
        agents_manifest[agent_name] = {"path": f"agents/{pathlib.Path(rel).name}"}
    (build / "project.json").write_text(json.dumps({
        "format_version": "2.0", "entry_agent": cfg["entry_agent"], "layers_included": ["core"],
        "agents": agents_manifest, "tools": tools_manifest}, indent=2))

    val = call("platform_validate_package", {"path": str(build)})
    diag = val.get("data", {}).get("diagnostics", {})
    print(f"validate: valid={diag.get('valid')} {json.dumps(diag.get('summary', {}))}")
    blocking = summarize_issues({"issues": diag.get("issues", [])})
    if not diag.get("valid") or blocking:
        raise SystemExit("validation failed")

    imp_args = {"action": "import", "projectId": pid, "path": str(build), "confirm": True}
    if a.prune:
        imp_args["data"] = {"deleteUnmatched": True}
    imp = call("platform_import_export", imp_args)
    if not imp.get("success"):
        summarize_issues(imp.get("preview"))
        raise SystemExit(f"import failed: {json.dumps({k: v for k, v in imp.items() if k != 'preview'})[:1500]}")
    applied = imp["data"]["result"]["applied"]
    print(f"import: {json.dumps(applied)}")
    ok("platform_projects", {"action": "update", "projectId": pid, "entryAgentName": cfg["entry_agent"]})

    if not a.no_publish:
        manifest = {}
        for agent_name in cfg["agents"]:
            r = ok("platform_versions", {"action": "publish", "projectId": pid, "agentName": agent_name,
                                         "changelog": cfg.get("changelog", "deploy.py")})
            manifest[agent_name] = {"version": r["data"]["version"]}
        wf_manifest = {}
        for name, wid in state["workflows"].items():
            if name in specs:
                wf = ok("platform_workflows", {"action": "get", "projectId": pid, "workflowId": wid})
                wf_name = (wf.get("data") or wf).get("name")
                wf_manifest[wf_name] = {"version": state["workflow_versions"][name]}
        dep = ok("platform_deployments", {"action": "create", "projectId": pid, "environment": a.env,
                                          "label": cfg.get("deployment_label", "deploy.py"),
                                          "entryAgentName": cfg["entry_agent"],
                                          "agentVersionManifest": manifest,
                                          "workflowVersionManifest": wf_manifest})
        d = dep["data"]["deployment"]
        for ag in (dep["data"].get("preflightReport") or {}).get("agents", []):
            for f in (ag.get("report") or {}).get("findings", []):
                if f.get("severity") in ("warning", "error"):
                    print(f"  preflight {f['severity']} {ag.get('agentName')}: {f.get('code')} {f.get('title')} - {str(f.get('detail'))[:240]}")
        state["deployment"] = {"env": a.env, "id": d["id"], "endpointSlug": d["endpointSlug"],
                               "agents": manifest, "preflight": dep["data"].get("preflightReport", {}).get("status")}
        print(f"deployment {a.env}: {d['id']} preflight={state['deployment']['preflight']} agents={manifest}")
    state_path.write_text(json.dumps(state, indent=2))


if __name__ == "__main__":
    main()
