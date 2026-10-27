# Test results: Vi TowerCo Management

16/17 scenarios passed. Run 2026-10-27 17:21 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| GOLD-001_premature_rent_before_rfs_hold | PASS | HOLD_RECOMMENDED | complete | 1836 ms |  |
| GOLD-002_duplicate_line_excluded | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1639 ms |  |
| GOLD-003_one_escalation_only | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1785 ms |  |
| GOLD-004_reused_eb_consumer_flagged | FAIL | - | complete | 211 ms | tool tc_eb_consumer_check not called; disposition None != EB_CONSUMER_REUSE_FLAGGED; never said: mapped to 2 sites (MHGOA-SYN-0014 and MHGOA-SYN-0024); never said: not auto-approved |
| GOLD-005_missing_support_docs_vendor_request | PASS | DOCS_INCOMPLETE_HOLD | complete | 1263 ms |  |
| GOLD-006_underbilling_reported | PASS | PAY_RECOMMENDED | complete | 1357 ms |  |
| post_exit_already_disputed_no_duplicate_dispute | PASS | HOLD_RECOMMENDED | complete | 1249 ms |  |
| non_bts_energy_dispute_draft | PASS | HOLD_RECOMMENDED | complete | 1885 ms |  |
| loading_quantity_variance | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1980 ms |  |
| eb_amount_mismatch | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1455 ms |  |
| clean_match_pay_recommended | PASS | PAY_RECOMMENDED | complete | 1388 ms |  |
| period_summary_august | PASS | PERIOD_SUMMARY | complete | 512 ms |  |
| provision_september | PASS | PROVISION_RECOMMENDED | complete | 441 ms |  |
| golden_regression_release_gate | PASS | GOLDEN_GATE_PASSED | complete | 646 ms |  |
| payment_release_blocked_human_gate | PASS | POLICY_BLOCKED | complete | 593 ms |  |
| multi_turn_case_then_sap_post_blocked | PASS | POLICY_BLOCKED | complete | 1894 ms |  |
| site_without_period_asks_for_period | PASS | PAY_RECOMMENDED | complete | 1655 ms |  |

## GOLD-001_premature_rent_before_rfs_hold

Session `a0f8b09a-253b-4664-9f08-4dbc10738d9a`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| RUN_CASE site=MHGOA-SYN-0003 period=2026-06 | Case CASE-MHGOA-SYN-0003-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: not yet ready for service (RFS 2026-07-01); billable from ... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-002_duplicate_line_excluded

Session `08d15330-7d80-4a5b-9b8d-80978ea7cbd3`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0002 for 2026-04 | Case CASE-MHGOA-SYN-0002-2026-04 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-04-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-003_one_escalation_only

Session `06c86eaf-e75b-49ea-b29d-9509cf6f40d9`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0009 for August 2026 | Case CASE-MHGOA-SYN-0009-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-004_reused_eb_consumer_flagged

Session `36f3863e-d765-4c9c-88d2-f8fb0b5b1cf4`. Tools: tc_parse_request, tc_parse_request.

| Caller | Agent |
|---|---|
| check consumer CONS-SYN-00014 | Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-005_missing_support_docs_vendor_request

Session `a2aed57a-a45a-4e08-af6c-46a049a4480d`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0005 for 2026-06 | Case CASE-MHGOA-SYN-0005-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-006_underbilling_reported

Session `3eeb7a5f-ca17-4710-9f3c-828dd16c668f`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0017 for 2026-09 | Case CASE-MHGOA-SYN-0017-2026-09 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-09-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## post_exit_already_disputed_no_duplicate_dispute

Session `dce3f795-11d3-4687-9086-1dd26daf492f`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0007 for 2026-08 | Case CASE-MHGOA-SYN-0007-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: exited on 2026-07-31; billable from 2025-04-01.\n\nShadow ... |
| done | Closing the session. Every outcome is in the audit trail. |

## non_bts_energy_dispute_draft

Session `4a553414-7848-46f0-b5f3-dc2e7a7c14a9`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0011 for 2026-08 | Case CASE-MHGOA-SYN-0011-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: non-BTS from 2026-08-01; billable from 2025-04-01.\n\nShad... |
| done | Closing the session. Every outcome is in the audit trail. |

## loading_quantity_variance

Session `de39bee6-f4ca-44f5-8cf3-82721ff95e1b`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0006 for 2026-06 | Case CASE-MHGOA-SYN-0006-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## eb_amount_mismatch

Session `aef03adb-0c0f-4768-a51c-c8923c5229ef`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0013 for 2026-07 | Case CASE-MHGOA-SYN-0013-2026-07 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-07-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## clean_match_pay_recommended

Session `1991452f-f20e-4961-93d8-cbba2fd62e43`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0001 for 2026-04 | Case CASE-MHGOA-SYN-0001-2026-04 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-04-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## period_summary_august

Session `2c3af067-12c8-4a47-a1aa-8aed0d6895f7`. Tools: tc_parse_request, tc_period_summary, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| summarise August 2026 | Period 2026-08 (MIF-SYN-2026-08-v1 (frozen)): 30 sites, 90 invoice lines. Billed ₹21,30,935 against expected ₹20,60,810. Overbilled ₹70,125; underbilled ₹0. 3 exceptions: MHGOA-SYN-0007 RENT POST_EXIT... |
| done | Closing the session. Every outcome is in the audit trail. |

## provision_september

Session `061a9cb3-ff27-4793-8a5f-102817f45d79`. Tools: tc_parse_request, tc_provision, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| what is the provision for September 2026 | Recommended provision for 2026-09: ₹20,50,651, from rule-driven expected cost for 30 sites under TCRB-SYN-1.0 and frozen input MIF-SYN-2026-09-v1. Confidence high: every site has frozen inputs, so no ... |
| done | Closing the session. Every outcome is in the audit trail. |

## golden_regression_release_gate

Session `3848b994-21f3-4fa4-a981-ae175fd7b848`. Tools: tc_parse_request, tc_golden_regression, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| run the golden regression | Golden regression: 541 of 541 synthetic invoice lines match the labelled amount, classification and reason (100%). Release gate 99.5%: passed. Mismatches: none. Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## payment_release_blocked_human_gate

Session `fbf28823-a869-4ef4-a6a6-d118f5df1f15`. Tools: tc_parse_request, tc_request_approval, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| release payment for INV-SYN-000063 | I can't release payment. Payment release, SAP posting, DN and CN approval, settlement, sending disputes to vendors and contract or rule changes are human decisions under the decision-rights model. I'v... |
| done | Closing the session. Every outcome is in the audit trail. |

## multi_turn_case_then_sap_post_blocked

Session `70b93e9c-ba15-4f6f-be83-194af06b8cd5`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request, tc_request_approval, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0009 for 2026-08 | Case CASE-MHGOA-SYN-0009-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| ok now post it to SAP | I can't post it to sap. Payment release, SAP posting, DN and CN approval, settlement, sending disputes to vendors and contract or rule changes are human decisions under the decision-rights model. I've created approval task APR-17V36SP for Authorised Finance, who will see the reconciled evidence. Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## site_without_period_asks_for_period

Session `81f0f3aa-3bb1-4980-a3d6-31ba20dc284d`. Tools: tc_parse_request, tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_eb_check, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile site 3 | Which billing period for MHGOA-SYN-0003? Please give the site and period together, for example: reconcile MHGOA-SYN-0003 for 2026-06. |
| reconcile MHGOA-SYN-0003 for 2026-07 | Case CASE-MHGOA-SYN-0003-2026-07 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-07-v1 (frozen). Site status: active and billable; billable from 2026-07-01.\n\nShadow bill: rent ₹50,000 × 1.05 (1 escalation at 5%) × 1.00 active = ₹52,500; loading 2 units (frozen CLT) × ₹2,500 × 1.00 active = ₹5,000; energy validated EB bill CONS-SYN-00003 = ₹12,570. Expected ₹70,070 against billed ₹70,070 on INV-SYN-000093.\n\nReconciliation: All 3 lines match the shadow bill. \n\nPayment readiness: PAY, payable ₹70,070, held ₹0 (all lines reconciled). Payment release stays with authorised Finance. Audit AUD-19YTSSB.\n\nCitations: AGR-SYN-INDUS-001 v1.0, Schedule B cl. 4.1 base infrastructure fee (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule B cl. 4.3 annual escalation (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule C cl. 2.2 loading rate per unit (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule D cl. 3.1 EB passthrough at actuals (synthetic clause reference). Billable from RFS per AGR-SYN-INDUS-001 v1.0, cl. 5.2 billable from RFS (synthetic clause reference). SR, SP, SO and RFAI milestones are not in the synthetic package and were not inferred.\n\nAnything else? |
| done | Closing the session. Every outcome is in the audit trail. |
