#!/usr/bin/env python3
"""Run scripted voice-call scenarios against a deployed or draft agent and check the trace.

usage: run_tests.py <project-dir> [scenario-name ...]

<project-dir>/tests/scenarios.json:
  [{"name": "...", "turns": ["CALL_START msisdn=... direction=...", "caller says", ...],
    "expect": {"tools": ["a08_activate_ir_pack"], "no_tools": ["a08_send_sms"],
               "disposition": "IR_ACTIVATED", "exit": "complete|escalate|prompt",
               "says": ["phrase the agent must say"], "never_says": ["phrase it must not say"],
               "max_turn_ms": 1200}}]

Writes <project-dir>/tests/results.md with one row per scenario plus the per-turn transcript.
"""
import json
import pathlib
import sys
import time

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from arch import call  # noqa: E402


def load_session(pid, agent, first):
    t0 = time.time()
    while True:  # the tenant caps concurrent sessions; idle ones expire, so retry for up to 30 minutes
        s = call("debug_load_agent", {"agentPath": f"default/{agent}", "projectId": pid, "initialMessage": first})
        if s.get("sessionId") or "Concurrent session limit" not in str(s) or time.time() - t0 > 1800:
            return s.get("sessionId"), s
        time.sleep(20)


def run(pid, agent, sc):
    sid, raw = load_session(pid, agent, sc["turns"][0])
    if not sid:
        return {"name": sc["name"], "ok": False, "fail": [f"session load failed: {str(raw)[:200]}"], "transcript": []}
    time.sleep(2)
    transcript = []
    for u in sc["turns"][1:]:
        r = call("debug_send_message", {"text": u, "sessionId": sid, "waitForResponse": True, "timeout": 90000})
        transcript.append((u, r.get("response") or ""))
    for _ in range(10):  # traces land asynchronously; wait until the call's final exit is recorded
        time.sleep(2)
        evs = list(reversed(call("debug_traces", {"sessionId": sid, "limit": 1000}).get("events", [])))
        if any(e.get("type") == "agent_exit" and (e.get("data") or {}).get("result") in ("complete", "escalate") for e in evs):
            time.sleep(1)
            evs = list(reversed(call("debug_traces", {"sessionId": sid, "limit": 1000}).get("events", [])))
            break
    if not evs:  # live buffers are lost if the MCP server restarts; fall back to persisted Runtime traces
        hist = call("debug_traces", {"sessionId": sid, "limit": 1000, "source": "historical", "projectId": pid}).get("events", [])
        evs = sorted(hist, key=lambda e: e.get("timestamp") or "")
    call("debug_session", {"action": "unsubscribe", "sessionId": sid})

    replies, tools, turn_ms, exit_result, disposition, path = [], [], [], None, None, []
    for e in evs:
        t, d = e.get("type"), e.get("data") or {}
        if t == "agent_response" and d.get("content"):
            replies.append(d["content"])
        elif t == "tool_call" and d.get("phase") == "complete":
            tools.append(d.get("toolName"))
            if d.get("toolName") in ("a11_write_post_call", "a11_record_outcome", "tc_record_case", "r_audit_log"):
                inp = d.get("input") or {}
                if "_preview" in inp:
                    try:
                        inp = json.loads(inp["_preview"].rsplit("...", 1)[0] + "}")
                    except ValueError:
                        key = '"disposition":"' if '"disposition":"' in inp["_preview"] else '"outcome":"'
                        inp = {"disposition": inp["_preview"].split(key)[1].split('"')[0]}
                disposition = inp.get("disposition") or inp.get("outcome") or disposition
        elif t == "flow_transition":
            path.append(d.get("toStep"))
        elif t == "agent_exit" and d.get("result") in ("complete", "escalate"):
            exit_result = d.get("result")
        elif t == "runtime_io_timing" and d.get("operation") == "execute_message.total":
            turn_ms.append(d.get("durationMs") or 0)
    first_turn = []
    for e in evs:  # replies produced before the second caller turn belong to the call-start turn
        if e.get("type") == "turn_start" and (e.get("data") or {}).get("conversationTurn", 1) > 1:
            break
        if e.get("type") == "agent_response" and (e.get("data") or {}).get("content"):
            first_turn.append(e["data"]["content"])
    transcript.insert(0, (sc["turns"][0], " ".join(first_turn)))
    spoken = " ".join(replies + [a for _, a in transcript])
    exp, fail = sc.get("expect", {}), []
    for tname in exp.get("tools", []):
        if tname not in tools:
            fail.append(f"tool {tname} not called")
    for tname in exp.get("no_tools", []):
        if tname in tools:
            fail.append(f"tool {tname} called but must not be")
    if "disposition" in exp and disposition != exp["disposition"]:
        fail.append(f"disposition {disposition} != {exp['disposition']}")
    if "exit" in exp and (exit_result or "prompt") != exp["exit"]:
        fail.append(f"exit {exit_result or 'prompt'} != {exp['exit']}")
    for p in exp.get("says", []):
        if p.lower() not in spoken.lower():
            fail.append(f"never said: {p}")
    for p in exp.get("never_says", []):
        if p.lower() in spoken.lower():
            fail.append(f"said forbidden: {p}")
    worst = max(turn_ms or [0])
    if worst > exp.get("max_turn_ms", 1200):
        fail.append(f"slowest turn {worst:.0f} ms > {exp.get('max_turn_ms', 1200)} ms")
    return {"name": sc["name"], "ok": not fail, "fail": fail, "session": sid, "disposition": disposition,
            "exit": exit_result or "prompt", "tools": tools, "worst_ms": worst,
            "transcript": transcript, "path": path}


def main():
    pdir = pathlib.Path(sys.argv[1]).resolve()
    only = set(sys.argv[2:])
    cfg = json.loads((pdir / "arch.json").read_text())
    state = json.loads((pdir / ".arch-state.json").read_text())
    scenarios = [s for s in json.loads((pdir / "tests" / "scenarios.json").read_text()) if not only or s["name"] in only]
    results = []
    for sc in scenarios:
        r = run(state["projectId"], cfg["entry_agent"], sc)
        results.append(r)
        print(f"{'PASS' if r['ok'] else 'FAIL'} {r['name']}  disp={r.get('disposition')} exit={r.get('exit')} "
              f"slowest={r.get('worst_ms', 0):.0f}ms {'; '.join(r['fail'])}", flush=True)
    passed = sum(r["ok"] for r in results)
    lines = [f"# Test results: {cfg['name']}", "",
             f"{passed}/{len(results)} scenarios passed. Run {time.strftime('%Y-%m-%d %H:%M UTC', time.gmtime())} "
             f"against the draft agent through Arch debug sessions; backend systems are mock workflows.", "",
             "| Scenario | Result | Disposition | End | Slowest turn | Notes |", "|---|---|---|---|---:|---|"]
    for r in results:
        lines.append(f"| {r['name']} | {'PASS' if r['ok'] else 'FAIL'} | {r.get('disposition') or '-'} | "
                     f"{r.get('exit', '-')} | {r.get('worst_ms', 0):.0f} ms | {'; '.join(r['fail']) or ''} |")
    for r in results:
        lines += ["", f"## {r['name']}", "", f"Session `{r.get('session')}`. Tools: {', '.join(r.get('tools', [])) or 'none'}.", ""]
        lines.append("| Caller | Agent |")
        lines.append("|---|---|")
        for u, a in r.get("transcript", []):
            lines.append(f"| {u.replace('|', '/')} | {a.replace('|', '/')} |")
    (pdir / "tests" / "results.md").write_text("\n".join(lines) + "\n")
    print(f"{passed}/{len(results)} passed")
    sys.exit(0 if passed == len(results) else 1)


if __name__ == "__main__":
    main()
