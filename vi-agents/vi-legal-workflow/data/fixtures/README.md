# Test Fixtures — SYNTHETIC DATA ONLY

All counterparties, people, numbers and facts in this folder are **fictional** and created for evaluating the `vi-legal` skills. They do not describe any real company, negotiation or Vi partner. Vi is the only real party named.

| File | Items | Used by | What it tests |
|---|---|---|---|
| `synthetic_ndas.md` | NDA-01…NDA-08 | `nda-triage`, `execution-check` | Tiering, hidden terms, foreign law, residuals, execution defects |
| `synthetic_partner_mous.md` | MOU-01…MOU-04 | `ai-partner-mou`, `execution-check`, `obligations-tracker` | Planted deviations against the MoU playbook, partner patterns |
| `synthetic_vendor_ai_clauses.md` | VC-01…VC-12 | `vendor-ai-contract-review`, `obligations-tracker` | GRACIE applicability, deleted RAI pack, data, liability |
| `synthetic_dpdp_requests.md` | DP-01…DP-08 | `dpdp-rights-request` | Classification, verification gate, escalations |
| `gold_labels.jsonl` | one line per item | all | Expected outputs for automated scoring |

## How to run an eval
1. Run the skill on each item (paste the item text as the document).
2. Compare the skill's output to the matching line in `gold_labels.jsonl`:
   - `overall_tier` exact match
   - every entry in `must_find` appears as a finding (by item ID or family)
   - `must_not` items do not appear
   - `escalate` matches
3. Score per skill against the targets in its SKILL.md. Any miss on a `critical: true` item is a stop-ship.

## Extending the set
Add real (redacted) Vi documents only after Legal approval and anonymisation; keep synthetic and real sets separate.
