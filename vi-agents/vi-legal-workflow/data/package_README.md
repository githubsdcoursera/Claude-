# Vi Legal AI — Agent Build Pack (`vi-legal` plugin)

**Version:** v1.0 · 27 Oct 2026 · **Classification:** Internal – Confidential (C2)
**Owner:** Vi Legal (GC office) with the AI Office / AI Lab · **Pattern:** follows `anthropics/claude-for-legal` (plugin → `CLAUDE.md` practice profile → `skills/<skill>/SKILL.md` → `references/` → scheduled agents)

Every output from this pack is a **draft for Vi Legal review** — not legal advice, not a legal conclusion. A Vi lawyer verifies and owns anything that leaves Vi.

---

## What's in the pack

```
vi-legal/
├── README.md                          ← this file (index, decisions, reuse map)
├── CLAUDE.md                          ← Vi practice profile — every skill reads it first
├── .claude-plugin/plugin.json
├── docs/
│   ├── 01_Legal_AI_Common_Foundation.md   ← architecture, guardrails, autonomy, RAI
│   ├── 02_End_to_End_Legal_Workflow.md    ← intake → triage → review → negotiate → approve → sign → obligations → renewal
│   └── 03_Legal_Agent_Register.md         ← every agent: goal, instructions, tools, done-when
├── skills/
│   ├── legal-intake/SKILL.md              ← /vi-legal:legal-intake
│   ├── nda-triage/SKILL.md                ← /vi-legal:nda-triage
│   ├── ai-partner-mou/SKILL.md            ← /vi-legal:ai-partner-mou (draft + review)
│   ├── vendor-ai-contract-review/SKILL.md ← /vi-legal:vendor-ai-contract-review
│   ├── dpdp-rights-request/SKILL.md       ← /vi-legal:dpdp-rights-request
│   ├── execution-check/SKILL.md           ← /vi-legal:execution-check
│   └── obligations-tracker/SKILL.md       ← /vi-legal:obligations-tracker (+ scheduled watcher)
├── references/
│   ├── nda_playbook.md
│   ├── ai_partner_mou_playbook.md         ← encodes the Vi AI Partner MoU Playbook (AWS baseline)
│   ├── vendor_ai_contract_playbook.md     ← incl. GRACIE / Responsible AI clause pack
│   └── clause_library.md                  ← Vi standard and fallback wording
└── test_fixtures/                         ← SYNTHETIC data only — fictional counterparties
    ├── README.md
    ├── synthetic_ndas.md                  ← 8 NDAs, gold GREEN/YELLOW/RED labels
    ├── synthetic_partner_mous.md          ← 4 partner MoU markups with planted deviations
    ├── synthetic_vendor_ai_clauses.md     ← 12 clause sets incl. "remove RAI clauses" pattern
    ├── synthetic_dpdp_requests.md         ← 8 Data Principal requests
    └── gold_labels.jsonl                  ← machine-readable expected outputs for evals
```

---

## Decision Flags (close before G0)

| # | Decision | Owner | Status |
|---|---|---|---|
| L1 | Named Legal owner per skill and approval matrix (who can sign off GREEN / YELLOW / RED) | General Counsel | **OPEN** |
| L2 | Runtime: Claude (Cowork / Claude for Word, Bedrock in `ap-south-1`) vs Copilot Studio vs Artemis — and whether Legal docs may leave M365 | AI Office + InfoSec + Legal | **OPEN** |
| L3 | Reconcile `references/ai_partner_mou_playbook.md` with the signed-off Vi AI Partner MoU Playbook & Template (C3) — this pack encodes it from working knowledge | Vi Legal (Radhika) + AI Office | **OPEN** |
| L4 | NDA thresholds in `references/nda_playbook.md` (term, governing law, non-solicit, residuals) | Vi Legal | **OPEN** |
| L5 | GRACIE clause pack is mandatory for any vendor using AI on Vi data — confirm it is non-negotiable and who can waive | RAI Board + GC | **OPEN** |
| L6 | Signing entities and authority matrix (VIL vs subsidiaries) | Company Secretary + Legal | **OPEN** |
| L7 | DPDP: grievance/response timelines and Consent Manager position to encode | DPO + Legal | **OPEN** |
| L8 | Connectors: CLM / DMS / e-sign Vi actually uses (SharePoint, DocuSign/Leegality/eMudhra, CLM if any) | Legal Ops + IT | **OPEN** |

---

## Reuse map — what to take from claude-for-legal vs build Vi-specific

| Need at Vi | Reuse from claude-for-legal | Vi-specific in this pack |
|---|---|---|
| NDA triage | `commercial-legal` NDA Triager (GREEN/YELLOW/RED) | Indian law thresholds, stamp duty, Vi entities → `nda-triage` |
| Vendor MSA review | `commercial-legal` Vendor Agreement Reviewer | Telecom security, CERT-In, data localisation → `vendor-ai-contract-review` |
| Vendor AI terms | `ai-governance-legal` Vendor AI Reviewer | **GRACIE clause pack**, "no AI used" pushback handling |
| Partner MoUs | — (no equivalent) | **`ai-partner-mou`** — Vi AI Partner MoU Playbook |
| Data rights requests | `privacy-legal` DSAR Responder (GDPR/CCPA) | **DPDP Act 2023** Data Principal rights → `dpdp-rights-request` |
| Renewals / obligations | `commercial-legal` Renewal Watcher | MoU validity, PoC end dates, RAI audit dates → `obligations-tracker` |
| Escalation | `commercial-legal` Escalation Router | Vi approval matrix (L1) |
| Regulatory feed | `regulatory-legal` Reg Feed Watcher | Covered by Regulatory pack RA-UC1 |
| Playbook drift | `commercial-legal` Playbook Monitor / Deal Debrief | Feeds L3/L4 updates |

**Install path (pilot):** install `commercial-legal`, `privacy-legal`, `ai-governance-legal` from claude-for-legal → run each `cold-start-interview` with Vi seed documents → add this `vi-legal` plugin for the Vi-specific skills. Practice profile lives at `~/.claude/plugins/config/claude-for-legal/<plugin>/CLAUDE.md`.

---

## Delivery gates

- **G0:** L1–L8 closed; playbooks signed by Vi Legal.
- **G1 PoC (4–6 weeks, AI Lab):** each skill passes its `test_fixtures` gold labels (targets in each SKILL.md).
- **G2 RAI stage-gate (GRACIE):** privilege handling, confidentiality, citation/traceability audit.
- **G3 Pilot:** lawyer reviews 100% of outputs; deviation log feeds playbook updates.
- **G4 Scale:** sample review after exit criteria in `docs/01`.
