"""Minimal client for the Arch MCP server exposed by build/bridge.mjs on 127.0.0.1:7777."""
import json
import time
import urllib.request

BRIDGE = "http://127.0.0.1:7777/call"
_opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))


class ArchError(RuntimeError):
    pass


def call(tool, args=None, timeout=600, retries=6):
    """Call an Arch tool; wait out the tenant's 60 requests/minute budget on HTTP 429."""
    body = json.dumps({"name": tool, "arguments": args or {}}).encode()
    for attempt in range(retries + 1):
        with _opener.open(urllib.request.Request(BRIDGE, data=body), timeout=timeout) as r:
            d = json.load(r)
        if "error" in d and "result" not in d:
            raise ArchError(f"{tool}: {d['error']}")
        text = d["result"]["content"][0]["text"]
        try:
            res = json.loads(text)
        except ValueError:
            return {"raw": text}
        limited = res.get("status") == 429 or "429 Too Many Requests" in str(res.get("error", ""))
        if limited and attempt < retries:
            wait = ((res.get("body") or {}).get("retryAfterMs") or 60000) / 1000 + 1
            print(f"    rate limited; waiting {wait:.0f}s")
            time.sleep(wait)
            continue
        return res


def ok(tool, args=None, **kw):
    """Call a tool and raise unless it reports success."""
    r = call(tool, args, **kw)
    if r.get("success") is False:
        raise ArchError(f"{tool} {json.dumps(args)[:300]} -> {json.dumps(r)[:1500]}")
    return r


def find_project(name):
    for p in ok("platform_projects", {"action": "list"}).get("projects", []):
        if p["name"] == name:
            return p["id"]
    return None


def wait_execution(project_id, workflow_id, execution_id, timeout=60):
    t0 = time.time()
    while time.time() - t0 < timeout:
        e = call("platform_workflows", {"action": "get_execution", "projectId": project_id,
                                        "workflowId": workflow_id, "executionId": execution_id})
        e = e.get("data", e)
        if e.get("status") in ("completed", "failed", "error", "cancelled"):
            return e
        time.sleep(1.5)
    raise ArchError(f"execution {execution_id} did not finish in {timeout}s")
