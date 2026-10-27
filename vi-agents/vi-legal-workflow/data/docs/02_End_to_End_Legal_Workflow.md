# Vi Legal AI — 02 End-to-End Legal Workflow

**Version:** v1.0 · 27 Oct 2026 · **Classification:** Internal – Confidential (C2)

One workflow for every contract-type matter: NDA, partner MoU, vendor / AI vendor agreement, amendment, renewal. Privacy requests (DPDP) run a parallel lane (Section 4).

---

## 1. Stages

```
W0 Request → W1 Intake & classify → W2 Triage → W3 Review / Draft → W4 Negotiate → W5 Approve
          → W6 Execute (sign + stamp) → W7 Register & extract obligations → W8 Monitor & renew → W9 Close / learn
```

| Stage | What happens | Agent / skill | Human gate | Output |
|---|---|---|---|---|
| W0 Request | Business emails Legal, fills the intake form, or forwards counterparty paper | — | — | Request |
| W1 Intake | Identify matter type, counterparty, value, deadline, Vi paper vs their paper, business owner; dedupe against open matters | `legal-intake` (LG01) | — | `Matter` record |
| W2 Triage | GREEN / YELLOW / RED on first read; route by tier | `nda-triage` (LG02), `ai-partner-mou` review mode (LG03), `vendor-ai-contract-review` (LG04) | Lawyer confirms tier for YELLOW/RED | Tier + routing |
| W3 Review / Draft | Clause-by-clause playbook comparison; redline in Word; or draft MoU from Vi template | LG02 / LG03 / LG04 + LG-TR | Lawyer reviews 100% at pilot | Review memo + tracked changes |
| W4 Negotiate | Counterparty markup comes back → diff against last Vi version → re-tier only changed clauses; track open-issues list | LG03/LG04 in "markup" mode; claude-for-legal Amendment Tracer | Lawyer leads negotiation | Issues list v2…vN |
| W5 Approve | Route to approver per authority matrix; RAI Board if GRACIE clause deviates | LG00 + `commercial-legal:escalation-flagger` | **Approver signs off** | Approval record |
| W6 Execute | Execution-copy check: entity names, signatories, authority, annexures, stamp duty, dates, internal comments stripped | `execution-check` (LG05) | Lawyer clears checklist | Clean execution copy + e-sign envelope draft |
| W7 Register | File signed copy; extract obligations, dates, renewal, notice periods, RAI audit rights | `obligations-tracker` (LG06) | Owner confirms obligations | Contract register + obligations |
| W8 Monitor | Reminders before notice / renewal / PoC end / MoU expiry / audit dates; deviation debrief | LG06 scheduled watcher | Owner acts | Alerts, weekly digest |
| W9 Close / learn | Accepted deviations logged; playbook update proposals | Playbook Monitor (claude-for-legal) | Legal approves playbook change | Updated playbook |

---

## 2. Routing rules (LG00)

| Matter type | Default skill | Fast path | Always escalate |
|---|---|---|---|
| NDA (Vi paper, unchanged) | `nda-triage` | GREEN → L3 release after HITL exit | — |
| NDA (counterparty paper) | `nda-triage` | GREEN → lawyer spot-check | Non-compete, foreign seat, residuals clause |
| AI partner MoU (new) | `ai-partner-mou` draft mode | — | Any exclusivity, binding commercials, GRACIE removal |
| AI partner MoU (counterparty markup) | `ai-partner-mou` review mode | — | Same as above |
| Vendor / AI vendor agreement or amendment | `vendor-ai-contract-review` | — | GRACIE clauses removed; data outside India; uncapped Vi liability |
| Execution-ready document | `execution-check` | — | Missing authority, stamp duty, entity mismatch |
| Signed contract | `obligations-tracker` | — | — |
| Data Principal request | `dpdp-rights-request` | — | Request from a minor's guardian, legal heir, or involving law enforcement |

---

## 3. Swimlane (who does what)

| Step | Business owner | Legal Supervisor (LG00) | Specialist skill | Vi lawyer | Approver |
|---|---|---|---|---|---|
| Submit | ✔ | | | | |
| Intake + dedupe | | ✔ | LG01 | | |
| Triage | | ✔ | LG02/03/04 | Confirms Y/R | |
| Review / draft | Answers business questions | | ✔ | ✔ reviews | |
| Negotiate | Commercial points | Tracks versions | Diff + re-tier | ✔ leads | |
| Approve | | Routes | | Recommends | ✔ |
| Execute | Signs (if authorised) | | LG05 | ✔ clears | |
| Register / monitor | Owns obligations | ✔ | LG06 | | |

---

## 4. DPDP lane (parallel)

```
P0 Request received (app, web, email, store, call centre)
→ P1 Log + acknowledge (statutory clock starts) → P2 Verify identity / authority
→ P3 Classify right (access, correction, completion, update, erasure, grievance, nomination, consent withdrawal)
→ P4 Locate data across systems (task to data owners) → P5 Assess exemptions / retention obligations
→ P6 Draft response → P7 DPO / Legal approve → P8 Respond + log → P9 Close with evidence
```
Skill: `dpdp-rights-request` (LG07). Timelines and exemptions come from the DPO-approved configuration (L7) — never from model knowledge.

---

## 5. Service levels (proposed — L1 to approve)

| Matter | Tier | First turnaround target |
|---|---|---|
| NDA | GREEN | Same day |
| NDA | YELLOW / RED | 2 working days |
| Partner MoU draft | — | 2 working days from complete intake |
| Partner MoU markup review | — | 2 working days |
| Vendor / AI vendor agreement | — | 5 working days |
| Execution check | — | 4 hours |
| DPDP request acknowledgement | — | Per L7 configuration |

---

## 6. Metrics

| Metric | Target |
|---|---|
| Intake-to-first-response time | −60% vs baseline |
| Lawyer hours per NDA | −70% |
| Lawyer hours per MoU cycle | −50% |
| Missed RED items (audit sample) | **0** |
| Privilege / internal-comment leaks to counterparties | **0** |
| Executed contracts with obligations registered within 5 days | 100% |
| Missed renewal / notice dates | **0** |
| Gold-label agreement on fixtures | per skill (≥ 90–95%) |
