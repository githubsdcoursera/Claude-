# Vi Legal AI — 03 Agent Register

**Version:** v1.0 · 27 Oct 2026 · **Classification:** Internal – Confidential (C2)
Each agent's full step-by-step method lives in its `skills/<name>/SKILL.md`. This register is the one-page view for the AI Office agent asset register.

| ID | Agent | Skill / command | Goal | Inputs | Outputs | Autonomy | Done when |
|---|---|---|---|---|---|---|---|
| LG00 | Legal Supervisor | (orchestrator) | Route every request to the right skill and gate | Request, matter record | Routing, approvals, audit | L2 | Matter routed and tier gate enforced |
| LG01 | Legal Intake | `/vi-legal:legal-intake` | Turn any request into a complete, deduplicated matter | Email, form, attachment | `Matter` record, missing-info list | L2 | All mandatory fields present or requested |
| LG02 | NDA Triager | `/vi-legal:nda-triage` | GREEN/YELLOW/RED any NDA against the Vi NDA playbook | NDA (.docx/.pdf) | Triage table, redline, business summary | L1 → L3 for GREEN Vi paper | Every playbook item checked and tiered |
| LG03 | AI Partner MoU Drafter & Reviewer | `/vi-legal:ai-partner-mou` | Draft MoUs from the Vi AI Partner MoU Playbook; review partner markups against it | Partner brief or partner markup | MoU draft or issues list + redline + note to Vi Legal | L1 | Every playbook section covered; every deviation tiered |
| LG04 | Vendor AI Contract Reviewer | `/vi-legal:vendor-ai-contract-review` | Review vendor / AI vendor agreements and amendments; protect GRACIE clauses | Agreement / amendment / markup | Review memo, redline, RAI clause gap list | L1 | All clause families checked; GRACIE gaps flagged |
| LG05 | Execution Checker | `/vi-legal:execution-check` | Make the execution copy right before signature | Final document, approval record | Checklist pass/fail, clean copy, envelope draft | L1 | All checks pass or exceptions listed |
| LG06 | Obligations & Renewal Tracker | `/vi-legal:obligations-tracker` | Capture every obligation and date from signed contracts; alert in time | Signed contract | Register entries; scheduled alerts | L2 | Obligations confirmed by owner |
| LG07 | DPDP Rights Request Handler | `/vi-legal:dpdp-rights-request` | Handle Data Principal requests within the configured timelines | Request + identity evidence | Log, data-locate tasks, draft response | L1 (L2 for acknowledgement) | Response approved by DPO and logged |
| LG-DI | Document Reader | (shared) | Faithful clause/term/party extraction | Any document | Structured JSON with refs | L0 | — |
| LG-PB | Playbook Engine | (shared) | Clause-to-playbook comparison | Clauses + playbook | Positions, deviations, fallbacks | L0 | — |
| LG-TR | Traceability Checker | (shared) | Exact-quote verification | Findings + source | Verified / unverified list | L0 | — |
| LG-PR | Privilege Guard | (shared) | Strip internal material from external outputs | Any outbound draft | Clean draft + strip log | L0 | — |
| LG-AU | Audit Logger | (shared) | Full audit trail | Every run | Audit records | L0 | — |

## Reused from claude-for-legal (no rebuild)

| Agent | Plugin | Used at stage |
|---|---|---|
| Amendment Tracer | `commercial-legal` | W4 negotiate (version diff) |
| Escalation Router | `commercial-legal` | W5 approve |
| Renewal Watcher | `commercial-legal` | W8 (alongside LG06) |
| Deal Debrief / Playbook Monitor | `commercial-legal` | W9 learn |
| Vendor AI Reviewer | `ai-governance-legal` | W3 (LG04 extends it with GRACIE) |
| DPA Reviewer | `privacy-legal` | W3 for processing terms |

## Agent-card fields for the AI Office asset register

`agent_id · name · business owner (L1) · skill path · playbook version · model + region · connectors · autonomy level · RAI tier · eval set + last score · HITL status · go-live gate`
