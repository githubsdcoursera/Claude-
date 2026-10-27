# Test results: Vi RA-UC1 Research and Policy Intelligence

9/9 scenarios passed. Run 2026-10-27 22:12 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| E1_brief_all_questions_exact_deadlines_verified | PASS | BRIEF_READY | complete | 1153 ms |  |
| E9_followup_grounded_in_brief_sources | PASS | FOLLOWUP_ANSWERED | complete | 448 ms |  |
| E2_seeded_false_claim_unsupported | PASS | UNSUPPORTED_FLAGGED | complete | 371 ms |  |
| E3_E10_precedents_and_3plus_jurisdictions | PASS | PRECEDENTS_READY | complete | 516 ms |  |
| E4_competitor_map_no_inferred_stances | PASS | POSITION_MAP_READY | complete | 380 ms |  |
| E5_restricted_document_no_content | PASS | NO_CONTENT | complete | 602 ms |  |
| E6_new_notification_alert_and_uc3_handoff | PASS | NEW_DOCUMENT_ALERTED | complete | 676 ms |  |
| E7_superseded_regulation_labelled | PASS | SUMMARY_READY | complete | 602 ms |  |
| E8_poor_scan_fields_flagged_not_guessed | PASS | SUMMARY_READY | complete | 571 ms |  |

## E1_brief_all_questions_exact_deadlines_verified

Session `c5954ed4-bf2e-4fa1-9f2a-ebd2af87507b`. Tools: rp_parse, rp02_summarise, rp03_precedents, rp04_competitor_map, rp05_brief, r_cite_verify, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha research brief on TRAI-SYN-CP-2026-11 | AI research brief BRIEF-155IMFC, for officer review.\n\n1. Why it matters: The paper decides how satellite operators get spectrum for retail services, which sets the cost and obligations of a direct c... |
| done | Closing the session. Every brief and source is in the audit trail. |

## E9_followup_grounded_in_brief_sources

Session `4ff274ae-eb24-4cd5-bde6-8cc75bfe6314`. Tools: rp_parse, rp02_summarise, rp_parse, rp_followup, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha summarise TRAI-SYN-CP-2026-11 | AI summary, for officer review. [SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial Services issued by TRAI on 20 October 2026 (124 pages) seeks comments on 6 questions. ... |
| what does Q3 propose? | Q3 (TRAI-SYN-CP-2026-11, p. 47) asks: Should the assignment period be 5, 10 or 20 years? The paper proposes a period of 5 years, subject to review. Anything else? |
| done | Closing the session. Every brief and source is in the audit trail. |

## E2_seeded_false_claim_unsupported

Session `af4e58eb-2809-4313-b498-35777d67bc1c`. Tools: rp_parse, r_cite_verify, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha verify: TRAI proposes a 20-year assignment period [TRAI-SYN-CP-2026-11, p. 47] | Verification: 0 supported, 0 partial, 1 unsupported. UNSUPPORTED: "user=officer.asha verify: TRAI proposes a 20-year assignment period" (number 20 is not in the source passage) Unsupported claims must... |
| done | Closing the session. Every brief and source is in the audit trail. |

## E3_E10_precedents_and_3plus_jurisdictions

Session `6f98361e-4b7b-40c0-9c86-08854154e0b5`. Tools: rp_parse, rp03_precedents, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha show precedents and international comparison on satellite spectrum | Precedents on satellite_spectrum: TRAI-SYN-REC-2023-04 (TRAI, 2 June 2023): Recommended a light-touch gateway authorisation (para 3.7) and left spectrum assignment for later consultation (para 3.9). T... |
| done | Closing the session. Every brief and source is in the audit trail. |

## E4_competitor_map_no_inferred_stances

Session `8bf9e6a4-43f7-4f0e-b970-da2e988b4f81`. Tools: rp_parse, rp04_competitor_map, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha competitor map for TRAI-SYN-CP-2026-11 | Stakeholder position map for TRAI-SYN-CP-2026-11 (published responses only; no stance is inferred): Q1: Operator-A (SYNTHETIC): oppose (auction ensures level playing field) [OPA-SYN-RESP-2026-11 (publ... |
| done | Closing the session. Every brief and source is in the audit trail. |

## E5_restricted_document_no_content

Session `ea718dcc-ccbe-4847-8b8f-4ed0e18e563a`. Tools: rp_parse, rp02_summarise, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha summarise VI-SYN-AGR-NOTE-07 | I found no document VI-SYN-AGR-NOTE-07 that you are authorised to see. Anything else? |
| done | Closing the session. Every brief and source is in the audit trail. |

## E6_new_notification_alert_and_uc3_handoff

Session `f223356b-bc82-429a-8f51-ffafd123131e`. Tools: rp_parse, rp01_source_poll, rp01_propose_obligation, r_notify, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha check the sources for anything new | New on an approved source (Approved source register: DoT notifications page): DOT-SYN-NOTIF-2026-10-27, [SYNTHETIC] Notification on revised EMF self-certification format, published by DoT on 27 Octobe... |
| done | Closing the session. Every brief and source is in the audit trail. |

## E7_superseded_regulation_labelled

Session `81838198-47fe-4128-b7ca-ace2601b9531`. Tools: rp_parse, rp02_summarise, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha summarise DOT-SYN-LIC-2025-03 | AI summary, for officer review. SUPERSEDED by DOT-SYN-LIC-2026-01 ([SYNTHETIC] Licence Amendment No. 1 of 2026 on Spectrum Sharing). [SYNTHETIC] Licence Amendment No. 3 on Spectrum Sharing: Permitted ... |
| done | Closing the session. Every brief and source is in the audit trail. |

## E8_poor_scan_fields_flagged_not_guessed

Session `dd5e909a-73c9-4603-8548-bf9c2352e060`. Tools: rp_parse, rp02_summarise, r_audit_log, rp_parse.

| Caller | Agent |
|---|---|
| user=officer.asha summarise VI-SYN-INWARD-0912 | AI summary, for officer review. [SYNTHETIC] Scanned letter on QoS audit (poor scan): Requests QoS audit data for two circles; the date and deadline are illegible. Deadlines: Deadline not legible: flag... |
| done | Closing the session. Every brief and source is in the audit trail. |
