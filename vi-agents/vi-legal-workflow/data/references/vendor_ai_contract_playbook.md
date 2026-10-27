# Vi Vendor & AI Contract Playbook (v1.0 DRAFT — Vi Legal + RAI Board to approve, L4/L5)

Read by `vendor-ai-contract-review`. `{{ }}` values set by Vi Legal.

## Clause families

| # | Family | Vi position (GREEN) | Fallback (YELLOW) | RED |
|---|---|---|---|---|
| V1 | Parties, order of precedence | Vi MSA prevails over vendor terms/SOWs | SOW prevails for scope only | Vendor online terms prevail |
| V2 | Scope & deliverables | Specific deliverables, acceptance criteria | Milestone-based acceptance | "Reasonable efforts" with no deliverable |
| V3 | Fees & payment | Fixed or capped; `{{60}}` days | `{{45}}` days | Uncapped T&M; auto-escalation |
| V4 | Term & termination | Vi convenience termination `{{30}}` days | `{{60}}` days | No Vi convenience right; long lock-in |
| V5 | IP | Vi owns deliverables and Vi-specific outputs; vendor licenses background | Vendor owns generic tooling; perpetual licence to Vi | Vendor owns Vi-specific outputs/models trained on Vi data |
| V6 | Data ownership & use | Vi owns Vi data; use only to perform services | Aggregated anonymised service metrics with consent | Any secondary use or training |
| V7 | Data residency & transfer | Stored/processed in India | Transfer only with Vi written approval and equivalent safeguards | Offshore by default |
| V8 | Security & incidents | Vi security policies; breach notice ≤ `{{24}}` h; cooperation with CERT-In reporting `[verify]`; audit rights | Breach notice ≤ `{{48}}` h | No notice period; no audit |
| V9 | **Responsible AI (GRACIE pack R1–R10)** | All present | Materially equivalent vendor framework mapped to R1–R10 | Any item deleted or pack removed |
| V10 | Sub-contracting | Prior written consent | Notice + objection right | Free sub-contracting |
| V11 | Liability cap | `{{1}}`× annual fees (vendor) | `{{1.5}}`–`{{2}}`× | Cap below fees paid; Vi uncapped |
| V12 | Liability carve-outs | Uncapped: confidentiality, data breach, IP indemnity, wilful misconduct, fraud | Super-cap for data breach `{{x}}`× | No carve-outs |
| V13 | Governing law & disputes | Indian law; arbitration, seat Mumbai | SIAC rules, Indian seat | Foreign law/seat |
| V14 | Exit | Transition assistance; data return and deletion certificate | — | No exit support |

## GRACIE Responsible AI clause pack (V9)

Applies when the vendor uses AI/ML (not only LLMs) on Vi data or delivers AI-driven outputs Vi relies on.

| ID | Requirement |
|---|---|
| R1 | **Disclosure:** vendor discloses all AI/ML components, models (incl. third-party), and their purpose in the services; updates Vi before material change |
| R2 | **Adherence:** vendor complies with Vi's Responsible AI principles (GRACIE) and Vi RAI stage-gate for the AI components |
| R3 | **Data use limits:** no training or fine-tuning of vendor or third-party models on Vi data without written approval |
| R4 | **Human oversight:** AI outputs are recommendations; decisions remain with Vi; vendor documents limitations and confidence |
| R5 | **Testing:** vendor tests for accuracy, bias and robustness relevant to the use case and shares results |
| R6 | **Explainability & documentation:** model card / method note sufficient for Vi to explain outputs to management and regulators |
| R7 | **Audit & cooperation:** Vi (or its auditor) may review AI governance evidence; vendor cooperates with Vi RAI reviews |
| R8 | **Incident reporting:** AI incidents (material errors, bias, data leakage, misuse) reported within `{{48}}` h with remediation plan |
| R9 | **Security of AI components:** prompt-injection, data-leakage and access controls appropriate to the risk |
| R10 | **Exit:** on exit, Vi data removed from AI systems, including embeddings, fine-tunes and logs; certificate provided |

## Handling "no AI is used" pushback
1. Ask for and record the evidence: SOW, proposal, technical presentations, meeting notes, statements by the vendor's technical leaders.
2. If any AI/ML is used, the pack applies — scope it to those components rather than drop it.
3. If the vendor maintains no AI/ML is used: offer a **conditional clause** — "If the Vendor uses any AI/ML system in performing the Services, Annex [RAI] applies from first use, and the Vendor shall notify Vi before such use." Accepting the conditional clause is GREEN; refusing it is RED.
4. Escalate to RAI Board via the AI Office if the vendor refuses both.

## Model response to vendor (counterparty-facing, clean)
> Vi's Responsible AI requirements apply to any service that uses artificial intelligence or machine-learning techniques on Vi data or produces outputs Vi relies on, not only large language models. Based on the approach described in [proposal/presentation of date], the services include such techniques. We have therefore reinstated Annex [RAI], scoped to those components. If no such technique will be used, the conditional wording in clause [x] means the obligations will only apply if that changes.
