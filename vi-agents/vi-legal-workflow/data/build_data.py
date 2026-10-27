#!/usr/bin/env python3
"""Build legal-data.js (mock prelude) from the vi-legal synthetic fixtures and gold labels.
Gold lines ("> Gold ...") are stripped from the documents the agents read; gold labels are kept
separately for the evaluation tool only."""
import json, pathlib, re
D = pathlib.Path(__file__).parent
docs = {}
for f in ["synthetic_ndas.md", "synthetic_partner_mous.md", "synthetic_vendor_ai_clauses.md", "synthetic_dpdp_requests.md"]:
    cur = None
    for ln in (D / "fixtures" / f).read_text().splitlines():
        m = re.match(r"^## ([A-Z]+-\d+) — (.*)$", ln)
        if m:
            cur = docs.setdefault(m[1], {"title": m[2], "lines": []}); continue
        if cur is None or ln.startswith("> Gold") or ln.strip() == "---" or ln.startswith("# "):
            continue
        if ln.strip():
            cur["lines"].append(ln.strip())
for k, v in docs.items():
    v["text"] = "\n".join(v["lines"]); del v["lines"]
gold = [json.loads(l) for l in (D / "fixtures" / "gold_labels.jsonl").read_text().splitlines() if l.strip()]
G = {"docs": docs, "gold": gold}
lib = {}
for m in re.finditer(r'\*\*(CL-[\w/-]+) [^:*]+:\*\* (.*)', (D / "references" / "clause_library.md").read_text()):
    q = re.findall(r'"(.*?)"', m[2])
    lib[m[1]] = " ".join(q) if q else m[2]
eng = (D / "engine.js").read_text()
out = ("// SYNTHETIC LEGAL FIXTURES ONLY (vi-legal test_fixtures): fictional counterparties; Gold lines stripped.\n"
       "const LG = " + json.dumps(G, ensure_ascii=False, separators=(",", ":")) + ";\n"
       "const LIB = " + json.dumps(lib, ensure_ascii=False) + ";\n" + eng)
(D.parent / "legal-data.js").write_text(out)
print("docs", len(docs), "gold", len(gold), "bytes", len(out))
