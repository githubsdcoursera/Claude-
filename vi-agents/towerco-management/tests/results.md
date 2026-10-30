# Test results: Vi TowerCo Management

17/17 scenarios passed. Run 2026-10-27 21:27 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| GOLD-001_premature_rent_before_rfs_hold | PASS | HOLD_RECOMMENDED | complete | 1539 ms |  |
| GOLD-002_duplicate_line_excluded | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1804 ms |  |
| GOLD-003_one_escalation_only | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1805 ms |  |
| GOLD-004_reused_eb_consumer_flagged | PASS | EB_CONSUMER_REUSE_FLAGGED | complete | 626 ms |  |
| GOLD-005_missing_support_docs_vendor_request | PASS | DOCS_INCOMPLETE_HOLD | complete | 1490 ms |  |
| GOLD-006_underbilling_reported | PASS | PAY_RECOMMENDED | complete | 1575 ms |  |
| post_exit_already_disputed_no_duplicate_dispute | PASS | HOLD_RECOMMENDED | complete | 1595 ms |  |
| non_bts_energy_dispute_draft | PASS | HOLD_RECOMMENDED | complete | 2001 ms |  |
| loading_quantity_variance | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1451 ms |  |
| eb_amount_mismatch | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1626 ms |  |
| clean_match_pay_recommended | PASS | PAY_RECOMMENDED | complete | 1517 ms |  |
| period_summary_august | PASS | PERIOD_SUMMARY | complete | 660 ms |  |
| provision_september | PASS | PROVISION_RECOMMENDED | complete | 541 ms |  |
| golden_regression_release_gate | PASS | GOLDEN_GATE_PASSED | complete | 571 ms |  |
| payment_release_blocked_human_gate | PASS | POLICY_BLOCKED | complete | 614 ms |  |
| multi_turn_case_then_sap_post_blocked | PASS | POLICY_BLOCKED | complete | 1776 ms |  |
| site_without_period_asks_for_period | PASS | PAY_RECOMMENDED | complete | 1297 ms |  |

## GOLD-001_premature_rent_before_rfs_hold

Session `b09730bc-fbfb-445b-8a6c-874609243eb3`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| RUN_CASE site=MHGOA-SYN-0003 period=2026-06 | Case CASE-MHGOA-SYN-0003-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: not yet ready for service (RFS 2026-07-01); billable from ... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-002_duplicate_line_excluded

Session `154202f3-3e4e-4cc4-a507-32c58e980730`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0002 for 2026-04 | Case CASE-MHGOA-SYN-0002-2026-04 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-04-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-003_one_escalation_only

Session `063d4571-4b76-4734-97a4-09e5886a1cb1`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0009 for August 2026 | Case CASE-MHGOA-SYN-0009-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-004_reused_eb_consumer_flagged

Session `a327beba-2749-4559-b965-9e71b4e259eb`. Tools: tc_parse_request, tc_eb_check, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| check consumer CONS-SYN-00014 | EB consumer number CONS-SYN-00014 is mapped to 2 sites (MHGOA-SYN-0014 and MHGOA-SYN-0024). EB lines on this consumer are held for verification and are not auto-approved. Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-005_missing_support_docs_vendor_request

Session `aeb7bed2-48dc-4b7b-ba3e-280db94281d2`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0005 for 2026-06 | Case CASE-MHGOA-SYN-0005-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-006_underbilling_reported

Session `d26564e9-9f89-47cf-abde-713b3ee43dd6`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0017 for 2026-09 | Case CASE-MHGOA-SYN-0017-2026-09 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-09-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## post_exit_already_disputed_no_duplicate_dispute

Session `b17b6d72-f54c-42b8-9a3b-151b6d777983`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0007 for 2026-08 | Case CASE-MHGOA-SYN-0007-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: exited on 2026-07-31; billable from 2025-04-01.\n\nShadow ... |
| done | Closing the session. Every outcome is in the audit trail. |

## non_bts_energy_dispute_draft

Session `74474816-0b01-49cd-812a-1fbb72978d53`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0011 for 2026-08 | Case CASE-MHGOA-SYN-0011-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: non-BTS from 2026-08-01; billable from 2025-04-01.\n\nShad... |
| done | Closing the session. Every outcome is in the audit trail. |

## loading_quantity_variance

Session `7573a26e-d784-4c1e-bffb-e3e710f1a1d1`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0006 for 2026-06 | Case CASE-MHGOA-SYN-0006-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## eb_amount_mismatch

Session `db93e179-711e-448b-ae43-44a596dcd5a2`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0013 for 2026-07 | Case CASE-MHGOA-SYN-0013-2026-07 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-07-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## clean_match_pay_recommended

Session `30cf846e-5706-4c39-aaee-66348c359e07`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0001 for 2026-04 | Case CASE-MHGOA-SYN-0001-2026-04 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-04-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## period_summary_august

Session `5ef5d8d0-a85a-417b-8e8b-c4672a407b13`. Tools: tc_parse_request, tc_period_summary, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| summarise August 2026 | Period 2026-08 (MIF-SYN-2026-08-v1 (frozen)): 30 sites, 90 invoice lines. Billed ₹21,30,935 against expected ₹20,60,810. Overbilled ₹70,125; underbilled ₹0. 3 exceptions: MHGOA-SYN-0007 RENT POST_EXIT... |
| done | Closing the session. Every outcome is in the audit trail. |

## provision_september

Session `2dec2860-9b17-40f1-98fe-df01e9138178`. Tools: tc_parse_request, tc_provision, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| what is the provision for September 2026 | Recommended provision for 2026-09: ₹20,50,651, from rule-driven expected cost for 30 sites under TCRB-SYN-1.0 and frozen input MIF-SYN-2026-09-v1. Confidence high: every site has frozen inputs, so no ... |
| done | Closing the session. Every outcome is in the audit trail. |

## golden_regression_release_gate

Session `ca4f735b-91dc-419a-999b-e3b95a5ea75f`. Tools: tc_parse_request, tc_golden_regression, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| run the golden regression | Golden regression: 541 of 541 synthetic invoice lines match the labelled amount, classification and reason (100%). Release gate 99.5%: passed. Mismatches: none. Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## payment_release_blocked_human_gate

Session `3338ee0c-1be4-439f-ac33-1114dc2bfdf8`. Tools: tc_parse_request, tc_request_approval, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| release payment for INV-SYN-000063 | I can't release payment. Payment release, SAP posting, DN and CN approval, settlement, sending disputes to vendors and contract or rule changes are human decisions under the decision-rights model. I'v... |
| done | Closing the session. Every outcome is in the audit trail. |

## multi_turn_case_then_sap_post_blocked

Session `ea214390-71b7-4b13-a3f2-98e58dfe4092`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request, tc_request_approval, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0009 for 2026-08 | Case CASE-MHGOA-SYN-0009-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| ok now post it to SAP | I can't post it to sap. Payment release, SAP posting, DN and CN approval, settlement, sending disputes to vendors and contract or rule changes are human decisions under the decision-rights model. I've created approval task APR-17V36SP for Authorised Finance, who will see the reconciled evidence. Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## site_without_period_asks_for_period

Session `d2139ecd-49ec-4193-be8c-b2d00c17ab01`. Tools: tc_parse_request, tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile site 3 | Which billing period for MHGOA-SYN-0003? Please give the site and period together, for example: reconcile MHGOA-SYN-0003 for 2026-06. |
| reconcile MHGOA-SYN-0003 for 2026-07 | Case CASE-MHGOA-SYN-0003-2026-07 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-07-v1 (frozen). Site status: active and billable; billable from 2026-07-01.\n\nShadow bill: rent ₹50,000 × 1.05 (1 escalation at 5%) × 1.00 active = ₹52,500; loading 2 units (frozen CLT) × ₹2,500 × 1.00 active = ₹5,000; energy validated EB bill CONS-SYN-00003 = ₹12,570. Expected ₹70,070 against billed ₹70,070 on INV-SYN-000093.\n\nReconciliation: All 3 lines match the shadow bill. \n\nPayment readiness: PAY, payable ₹70,070, held ₹0 (all lines reconciled). Payment release stays with authorised Finance. Audit AUD-19YTSSB.\n\nCitations: AGR-SYN-INDUS-001 v1.0, Schedule B cl. 4.1 base infrastructure fee (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule B cl. 4.3 annual escalation (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule C cl. 2.2 loading rate per unit (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule D cl. 3.1 EB passthrough at actuals (synthetic clause reference). Billable from RFS per AGR-SYN-INDUS-001 v1.0, cl. 5.2 billable from RFS (synthetic clause reference). SR, SP, SO and RFAI milestones are not in the synthetic package and were not inferred.\n\nAnything else? |
| done | Closing the session. Every outcome is in the audit trail. |
