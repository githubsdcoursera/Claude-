# Test results: Vi TowerCo Management

1/17 scenarios passed. Run 2026-10-27 16:21 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| GOLD-001_premature_rent_before_rfs_hold | FAIL | HOLD_RECOMMENDED | complete | 1740 ms | never said: PREMATURE_BILLING (billed before RFS); never said: Payment readiness: HOLD, payable ₹0, held ₹50,000; never said: nothing has been sent to the vendor |
| GOLD-002_duplicate_line_excluded | FAIL | PARTIAL_PAY_RECOMMENDED | complete | 1712 ms | never said: LINE-SYN-0000541 on INV-SYN-000181; never said: excluded from the payable baseline; never said: held ₹52,500 |
| GOLD-003_one_escalation_only | FAIL | PARTIAL_PAY_RECOMMENDED | complete | 1648 ms | never said: ₹50,000 × 1.05 (1 escalation at 5%) × 1.00 active = ₹52,500; never said: DOUBLE_ESCALATION; never said: OVERBILLED by ₹2,625 |
| GOLD-004_reused_eb_consumer_flagged | FAIL | - | complete | 329 ms | tool tc_eb_consumer_check not called; disposition None != EB_CONSUMER_REUSE_FLAGGED; never said: mapped to 2 sites (MHGOA-SYN-0014 and MHGOA-SYN-0024); never said: not auto-approved |
| GOLD-005_missing_support_docs_vendor_request | FAIL | DOCS_INCOMPLETE_HOLD | complete | 1218 ms | never said: EB bill copy and loading annexure missing; never said: Vendor request VRQ-; never said: the invoice is not marked complete |
| GOLD-006_underbilling_reported | FAIL | PAY_RECOMMENDED | complete | 1434 ms | never said: UNDERBILLED by ₹4,000; never said: the vendor underbilled by ₹4,000; include it in the provision |
| post_exit_already_disputed_no_duplicate_dispute | FAIL | HOLD_RECOMMENDED | complete | 1531 ms | never said: POST_EXIT_BILLING; never said: Already under dispute DSP-SYN-0001 (control CTRL-SYN-0001, OPEN); no duplicate dispute raised. |
| non_bts_energy_dispute_draft | FAIL | HOLD_RECOMMENDED | complete | 1541 ms | never said: NON_BTS_BILLING; never said: Draft dispute DRAFT-DSP-; never said: DN recommendation ₹15,000 pre-tax. Pending Network + Finance COE approval |
| loading_quantity_variance | FAIL | PARTIAL_PAY_RECOMMENDED | complete | 1511 ms | never said: 3 units (frozen CLT) × ₹2,500; never said: LOADING_QTY_VARIANCE |
| eb_amount_mismatch | PASS | PARTIAL_PAY_RECOMMENDED | complete | 1544 ms |  |
| clean_match_pay_recommended | FAIL | PAY_RECOMMENDED | complete | 1735 ms | never said: All 3 lines match the shadow bill.; never said: Payment readiness: PAY; never said: Payment release stays with authorised Finance. |
| period_summary_august | FAIL | PERIOD_SUMMARY | complete | 619 ms | never said: 3 exceptions: MHGOA-SYN-0007 RENT POST_EXIT_BILLING ₹52,500 |
| provision_september | FAIL | PROVISION_RECOMMENDED | complete | 576 ms | never said: nothing is posted |
| golden_regression_release_gate | FAIL | - | complete | 484 ms | disposition None != GOLDEN_GATE_PASSED |
| payment_release_blocked_human_gate | FAIL | POLICY_BLOCKED | complete | 642 ms | never said: for Authorised Finance |
| multi_turn_case_then_sap_post_blocked | FAIL | - | - | 0 ms | session load failed: {'success': False, 'error': 'Not connected to server. Call platform_connect first.'} |
| site_without_period_asks_for_period | FAIL | - | - | 0 ms | session load failed: {'success': False, 'error': 'Not connected to server. Call platform_connect first.'} |

## GOLD-001_premature_rent_before_rfs_hold

Session `7c696850-cc5f-4558-ab31-b29da4b73abe`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| RUN_CASE site=MHGOA-SYN-0003 period=2026-06 | Case CASE-MHGOA-SYN-0003-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: not yet ready for service (RFS 2026-07-01); billable from ... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-002_duplicate_line_excluded

Session `3b79bc85-46da-4075-82d3-9be151d55105`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0002 for 2026-04 | Case CASE-MHGOA-SYN-0002-2026-04 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-04-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-003_one_escalation_only

Session `d21381a9-7051-426c-8e16-279bed84390b`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0009 for August 2026 | Case CASE-MHGOA-SYN-0009-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-004_reused_eb_consumer_flagged

Session `81cd67d3-d3b2-40b9-b16b-54d1c36b0242`. Tools: tc_parse_request, tc_parse_request.

| Caller | Agent |
|---|---|
| check consumer CONS-SYN-00014 | Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-005_missing_support_docs_vendor_request

Session `09565ad8-6f94-4fc9-8924-ce000dbeaf49`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0005 for 2026-06 | Case CASE-MHGOA-SYN-0005-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## GOLD-006_underbilling_reported

Session `548d08c7-da62-4df9-af99-f75e2a56fc61`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0017 for 2026-09 | Case CASE-MHGOA-SYN-0017-2026-09 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-09-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## post_exit_already_disputed_no_duplicate_dispute

Session `df33100e-c07d-43e9-b84d-e789b8478f8b`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0007 for 2026-08 | Case CASE-MHGOA-SYN-0007-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: exited on 2026-07-31; billable from 2025-04-01.\n\nShadow ... |
| done | Closing the session. Every outcome is in the audit trail. |

## non_bts_energy_dispute_draft

Session `5042290b-eec3-439d-ba67-73a26c7c2e53`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0011 for 2026-08 | Case CASE-MHGOA-SYN-0011-2026-08 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-08-v1 (frozen). Site status: non-BTS from 2026-08-01; billable from 2025-04-01.\n\nShad... |
| done | Closing the session. Every outcome is in the audit trail. |

## loading_quantity_variance

Session `febe727f-caca-41c9-aa24-b124820ffd0e`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0006 for 2026-06 | Case CASE-MHGOA-SYN-0006-2026-06 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-06-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## eb_amount_mismatch

Session `3f868ad4-3d6e-4e20-94c6-4e4951acb08f`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_dispute_prepare, tc_request_approval, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0013 for 2026-07 | Case CASE-MHGOA-SYN-0013-2026-07 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-07-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Case CASE-MHGOA-SYN-0013-2026-07 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-07-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow bill: rent ₹50,000 × 1.05 (1 escalation at 5%) × 1.00 active = ₹52,500; loading 2 units (frozen CLT) × ₹2,500 × 1.00 active = ₹5,000; energy validated EB bill CONS-SYN-00013 = ₹12,251. Expected ₹69,751 against billed ₹76,251 on INV-SYN-000103.\n\nReconciliation: ENERGY_EB LINE-SYN-0000309: billed ₹18,751, expected ₹12,251, OVERBILLED by ₹6,500, EB_AMOUNT_MISMATCH (EB amount differs from the electricity bill). Draft dispute DRAFT-DSP-18KGS27 prepared with evidence pack EVP-1FU7YYL (sha256 0dqrgu0); DN recommendation ₹6,500 pre-tax. Pending Network + Finance COE approval APR-09OBFYP; nothing has been sent to the vendor. \n\nPayment readiness: PARTIAL_PAY, payable ₹69,751, held ₹6,500 (EB_AMOUNT_MISMATCH ₹6,500). Payment release stays with authorised Finance. Audit AUD-18FXPI2.\n\nCitations: AGR-SYN-INDUS-001 v1.0, Schedule B cl. 4.1 base infrastructure fee (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule B cl. 4.3 annual escalation (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule C cl. 2.2 loading rate per unit (synthetic clause reference); AGR-SYN-INDUS-001 v1.0, Schedule D cl. 3.1 EB passthrough at actuals (synthetic clause reference). Billable from RFS per AGR-SYN-INDUS-001 v1.0, cl. 5.2 billable from RFS (synthetic clause reference). SR, SP, SO and RFAI milestones are not in the synthetic package and were not inferred.\n\nAnything else? |

## clean_match_pay_recommended

Session `bdf00694-2f22-4c0b-b813-9f67d1d93596`. Tools: tc_parse_request, tc_case_context, tc_order_evidence, tc_document_check, tc_duplicate_check, tc_shadow_bill, tc_reconcile, tc_payment_readiness, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| reconcile MHGOA-SYN-0001 for 2026-04 | Case CASE-MHGOA-SYN-0001-2026-04 under AGR-SYN-INDUS-001 v1.0, rule book TCRB-SYN-1.0, frozen input MIF-SYN-2026-04-v1 (frozen). Site status: active and billable; billable from 2025-04-01.\n\nShadow b... |
| done | Closing the session. Every outcome is in the audit trail. |

## period_summary_august

Session `537085ed-e248-438d-b81e-a6a2224029a7`. Tools: tc_parse_request, tc_period_summary, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| summarise August 2026 | Period 2026-08 (MIF-SYN-2026-08-v1 (frozen)): 30 sites, 90 invoice lines. Billed ₹21,30,935 against expected ₹20,60,810. Overbilled ₹70,125; underbilled ₹0. 3 exceptions: MHGOA-SYN-0007 RENT POST_EXIT... |
| done | Closing the session. Every outcome is in the audit trail. |

## provision_september

Session `a6447838-41ef-4685-8792-976d788b044f`. Tools: tc_parse_request, tc_provision, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| what is the provision for September 2026 | Recommended provision for 2026-09: ₹20,50,651, from rule-driven expected cost for 30 sites under TCRB-SYN-1.0 and frozen input MIF-SYN-2026-09-v1. Confidence high: every site has frozen inputs, so no ... |
| done | Closing the session. Every outcome is in the audit trail. |

## golden_regression_release_gate

Session `d86a5743-06e3-4f23-a860-9c24cbfbdc95`. Tools: tc_parse_request, tc_golden_regression, tc_parse_request.

| Caller | Agent |
|---|---|
| run the golden regression | Golden regression: 541 of 541 synthetic invoice lines match the labelled amount, classification and reason (100%). Release gate 99.5%: passed. Mismatches: none. Anything else? |
| done | Closing the session. Every outcome is in the audit trail. |

## payment_release_blocked_human_gate

Session `d54a4d9c-1e38-403e-9137-69c115ff12a4`. Tools: tc_parse_request, tc_request_approval, tc_record_case, tc_parse_request.

| Caller | Agent |
|---|---|
| release payment for INV-SYN-000063 | I can't release payment. Payment release, SAP posting, DN and CN approval, settlement, sending disputes to vendors and contract or rule changes are human decisions under the decision-rights model. I'v... |
| done | Closing the session. Every outcome is in the audit trail. |

## multi_turn_case_then_sap_post_blocked

Session `None`. Tools: none.

| Caller | Agent |
|---|---|

## site_without_period_asks_for_period

Session `None`. Tools: none.

| Caller | Agent |
|---|---|
