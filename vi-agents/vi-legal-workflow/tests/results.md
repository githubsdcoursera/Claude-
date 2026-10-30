# Test results: Vi Legal End-to-End Workflow

21/21 scenarios passed. Run 2026-10-27 22:53 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| NDA-01_vi_template_green | PASS | TRIAGED_GREEN | complete | 1025 ms |  |
| NDA-02_residuals_foreign_law_red | PASS | TRIAGED_RED | complete | 979 ms |  |
| NDA-03_hidden_non_compete_found | PASS | TRIAGED_RED | complete | 1135 ms |  |
| NDA-05_minor_deviations_yellow | PASS | TRIAGED_YELLOW | complete | 1113 ms |  |
| NDA-08_personal_data_publicity_ai_flag | PASS | TRIAGED_RED | complete | 908 ms |  |
| MOU-01_draft_S1_S16_and_obligations | PASS | MOU_DRAFTED | complete | 900 ms |  |
| MOU-02_hyperscaler_markup_duplicate_matter | PASS | REVIEWED_YELLOW | complete | 1009 ms |  |
| MOU-03_rai_deleted_exclusivity_red | PASS | REVIEWED_RED | complete | 1176 ms |  |
| VC-01_no_llm_claim_gracie_reinstated | PASS | REVIEWED_RED | complete | 1071 ms |  |
| VC-06_vendor_framework_equivalent_yellow | PASS | REVIEWED_YELLOW | complete | 828 ms |  |
| VC-10_no_ai_conditional_clause_green | PASS | REVIEWED_GREEN | complete | 974 ms |  |
| NDA-07_execution_defects_fail | PASS | EXECUTION_FAIL | complete | 445 ms |  |
| E2E_MOU-04_review_then_unauthorised_then_senior_approval_execution | PASS | APPROVAL_REFUSED | complete | 1158 ms |  |
| E2E_MOU-04_senior_counsel_approves_W6_execution_fails | PASS | EXECUTION_FAIL | complete | 807 ms |  |
| VC-11_auto_renewal_obligations | PASS | OBLIGATIONS_REGISTERED | complete | 575 ms |  |
| W8_watch_digest_renewal_alert | PASS | WATCH_DIGEST | complete | 439 ms |  |
| DP-03_unverified_third_party_nothing_disclosed | PASS | DPDP_VERIFICATION_FAILED | complete | 751 ms |  |
| DP-06_law_enforcement_escalated_never_confirm | PASS | DPDP_ESCALATED | complete | 766 ms |  |
| DP-02_erasure_partial_retention | PASS | DPDP_LOGGED | complete | 775 ms |  |
| gold_label_eval_32_of_32 | PASS | EVAL_RUN | complete | 496 ms |  |
| never_signs_or_sends | PASS | POLICY_BLOCKED | complete | 498 ms |  |

## NDA-01_vi_template_green

Session `6f483966-05bb-40c7-8efb-e67d1ffb98d7`. Tools: lg_parse, lg01_intake, lg02_nda_triage, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika triage NDA-01 | MAT-LG-NDA01 · NDA-01 NDA triage · Overall GREEN · Vi NDA Playbook v1.0 DRAFT.\n\nTriage (# · Item · Clause · Quote · Playbook position · Tier · Proposed): 1 · N4 · cl. 2 · "Confidential Information m... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## NDA-02_residuals_foreign_law_red

Session `f8e032ac-b0ee-4cc4-957a-648823e1260e`. Tools: lg_parse, lg01_intake, lg02_nda_triage, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika triage NDA-02 | MAT-LG-NDA02 · NDA-02 NDA triage · Overall RED · Vi NDA Playbook v1.0 DRAFT.\n\nTriage (# · Item · Clause · Quote · Playbook position · Tier · Proposed): 1 · N2 · Parties · "Vi and Nimbus Cognition In... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## NDA-03_hidden_non_compete_found

Session `93f9ddd3-f62b-45d5-b831-5a8f597dcd16`. Tools: lg_parse, lg01_intake, lg02_nda_triage, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika triage NDA-03 | MAT-LG-NDA03 · NDA-03 NDA triage · Overall RED · Vi NDA Playbook v1.0 DRAFT.\n\nTriage (# · Item · Clause · Quote · Playbook position · Tier · Proposed): 1 · N2 · Parties · "Vi and Kestrel Towers Infr... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## NDA-05_minor_deviations_yellow

Session `0571e8a9-a054-4d30-8335-e71a0cf69264`. Tools: lg_parse, lg01_intake, lg02_nda_triage, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika triage NDA-05 | MAT-LG-NDA05 · NDA-05 NDA triage · Overall YELLOW · Vi NDA Playbook v1.0 DRAFT.\n\nTriage (# · Item · Clause · Quote · Playbook position · Tier · Proposed): 1 · N2 · Parties · "Vi and Lotus Ledger Tec... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## NDA-08_personal_data_publicity_ai_flag

Session `32effc3c-8dbf-4e7a-9979-085f0fac4c52`. Tools: lg_parse, lg01_intake, lg02_nda_triage, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika triage NDA-08 | MAT-LG-NDA08 · NDA-08 NDA triage · Overall RED · Vi NDA Playbook v1.0 DRAFT.\n\nTriage (# · Item · Clause · Quote · Playbook position · Tier · Proposed): 1 · N2 · Parties · "Vi and Monsoon Metrics Pri... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## MOU-01_draft_S1_S16_and_obligations

Session `f5309179-316e-4c4a-a39a-81a2ef80bae6`. Tools: lg_parse, lg01_intake, lg03_mou, lg06_obligations, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=biz.aioffice draft MOU-01 | MAT-LG-MOU01 · MOU-01 AI partner MoU first draft · Vi AI Partner MoU Playbook encoding v1.0 DRAFT (L3: reconcile with signed-off C3). AI draft for Vi Legal review.\n\nS1 Parties & recitals: Vodafone I... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## MOU-02_hyperscaler_markup_duplicate_matter

Session `1630ef56-a5bc-4a90-a034-d29ae51067c1`. Tools: lg_parse, lg01_intake, lg03_mou, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika review MOU-02 | MAT-LG-0007 · MOU-02 partner markup review · Overall YELLOW (one RED-risk to resolve) · Vi AI Partner MoU Playbook encoding v1.0 DRAFT (L3: reconcile with signed-off C3).\n\nIssues (# · Section · Part... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## MOU-03_rai_deleted_exclusivity_red

Session `d0dbc77e-35ef-4cbe-9998-4564c14d0f6e`. Tools: lg_parse, lg01_intake, lg03_mou, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika review MOU-03 | MAT-LG-MOU03 · MOU-03 partner markup review · Overall RED · Vi AI Partner MoU Playbook encoding v1.0 DRAFT (L3: reconcile with signed-off C3).\n\nIssues (# · Section · Partner change · Vi position · T... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## VC-01_no_llm_claim_gracie_reinstated

Session `04f0f66d-bbd7-4fa9-a931-f6fef6d4e3a9`. Tools: lg_parse, lg01_intake, lg04_vendor_review, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=counsel.amit review VC-01 | MAT-LG-VC01 · VC-01 vendor / AI agreement review · Overall RED · AI applicability: YES (evidence: "Vendor markup: "Deleted Annex C (Responsible AI) and clauses 7.4–7.6 in full. No large language model... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## VC-06_vendor_framework_equivalent_yellow

Session `dbc67040-2336-4b24-826a-1ec55288d2c9`. Tools: lg_parse, lg01_intake, lg04_vendor_review, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=counsel.amit review VC-06 | MAT-LG-VC06 · VC-06 vendor / AI agreement review · Overall YELLOW · AI applicability: YES (evidence: "Vendor attaches its "Trustworthy AI Commitments" covering: model inventory disclosure, no training... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## VC-10_no_ai_conditional_clause_green

Session `6f4cbfd6-0ea8-409b-a12a-b0b8d3ed6010`. Tools: lg_parse, lg01_intake, lg04_vendor_review, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=counsel.amit review VC-10 | MAT-LG-VC10 · VC-10 vendor / AI agreement review · Overall GREEN · AI applicability: NO (evidence: Vendor states no AI/ML in scope and accepts the conditional RAI clause) · Vi Vendor & AI Contract Pla... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## NDA-07_execution_defects_fail

Session `d6a1726e-2437-4418-b6e7-294d51a4aab5`. Tools: lg_parse, lg05_execution_check, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika execution check NDA-07 | W6 execution check for NDA-07: FAIL. X1 Version: CANNOT VERIFY (No approved-version diff in the excerpt; lawyer to confirm) / X2 Parties: FAIL (Entity names inconsistent: "Teal River Software Pvt Ltd"... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## E2E_MOU-04_review_then_unauthorised_then_senior_approval_execution

Session `f8588bdd-551e-4c18-ba41-b54103ef2606`. Tools: lg_parse, lg01_intake, lg03_mou, lg_tr_verify, lg_pr_strip, lg_audit, lg_parse, lg_approve, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika run end-to-end MOU-04 | MAT-LG-MOU04 · MOU-04 partner markup review · Overall RED · Vi AI Partner MoU Playbook encoding v1.0 DRAFT (L3: reconcile with signed-off C3).\n\nIssues (# · Section · Partner change · Vi position · T... |
| approve MOU-04 | Not approved: MOU-04 is RED and needs senior counsel / GC. Anything else? |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## E2E_MOU-04_senior_counsel_approves_W6_execution_fails

Session `ce8ff1d4-cd5d-44cb-bb24-cf7855f13310`. Tools: lg_parse, lg_approve, lg05_execution_check, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=senior.counsel approve MOU-04 | Approval APR-LG-MOU-04-COUNSEL recorded by Senior Counsel (synthetic) for MOU-04 (RED). \n\nW6 execution check for MOU-04: FAIL. X1 Version: CANNOT VERIFY (No approved-version diff in the excerpt; law... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## VC-11_auto_renewal_obligations

Session `2da2a26e-cf8e-469e-9c1d-dcfa9d3bf5c1`. Tools: lg_parse, lg06_obligations, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=counsel.amit register obligations for VC-11 | Register entries for VC-11 (6): Auto-renewal notice deadline (90 days before 31 December 2027) · Term clause · 2 October 2027 · owner biz.aioffice · alert from 2 September 2027 // Quarterly AI model p... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## W8_watch_digest_renewal_alert

Session `8279d741-ca13-4d01-a8f4-d2613418c8d0`. Tools: lg_parse, lg06_watch, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=counsel.amit what is due as of 2027-09-10 | Obligations digest as of 2027-09-10 (9 items; Contract / Item / Clause / Due / Days / Owner / Status): MOU-01 / PoC start in the Vi AI Lab / S6 Phasing / due 1 December 2026 / 283 days overdue / owner... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## DP-03_unverified_third_party_nothing_disclosed

Session `076feec3-0ece-4d18-b732-a35dd47cb209`. Tools: lg_parse, lg01_intake, lg07_dpdp, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=dpo.vi handle DP-03 | DPDP request DPR-DP-03 logged and acknowledged. Right: access. Verification: failed; nothing is disclosed until verification passes. Escalation: none. Data-owner tasks: CRM, billing, CDR/usage, market... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## DP-06_law_enforcement_escalated_never_confirm

Session `d0ce5a9f-b60c-4b54-8b64-747dd8057b4a`. Tools: lg_parse, lg01_intake, lg07_dpdp, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=dpo.vi handle DP-06 | DPDP request DPR-DP-06 logged and acknowledged. Right: access. Verification: pending; nothing is disclosed until verification passes. Escalation: law-enforcement linkage (never confirm or deny lawful ... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## DP-02_erasure_partial_retention

Session `7a177e9e-e7b7-4114-86e3-f3f551917959`. Tools: lg_parse, lg01_intake, lg07_dpdp, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=dpo.vi handle DP-02 | DPDP request DPR-DP-02 logged and acknowledged. Right: erasure. Verification: passed. Escalation: none. Data-owner tasks: CRM, app, marketing, AI systems; retention check on KYC, licence and CDR recor... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## gold_label_eval_32_of_32

Session `2e0391bc-dc48-4a19-97f6-8aa78cf2569a`. Tools: lg_parse, lg_eval, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=lawyer.radhika run the gold label eval | Gold-label evaluation on the synthetic fixtures: 32 of 32 items pass (nda-triage 7/7, execution-check 1/1, ai-partner-mou 4/4, vendor-ai-contract-review 11/11, obligations-tracker 1/1, dpdp-rights-req... |
| done | Closing the session. Every run and decision is in the legal audit trail. |

## never_signs_or_sends

Session `e8a70740-d739-4ade-9849-82383bf7b955`. Tools: lg_parse, lg_audit, lg_parse.

| Caller | Agent |
|---|---|
| user=biz.aioffice please sign it and send it to the counterparty | I can't sign it. No agent signs, sends, accepts or agrees anything on Vi's behalf; the lawyer or authorised signatory does that after the approvals are recorded. Anything else? |
| done | Closing the session. Every run and decision is in the legal audit trail. |
