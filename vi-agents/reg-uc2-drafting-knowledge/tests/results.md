# Test results: Vi RA-UC2 Drafting and Institutional Knowledge

11/11 scenarios passed. Run 2026-10-27 21:42 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| E1_E3_E4_draft_all_questions_gap_options_current_positions | PASS | DRAFT_PACKAGED | complete | 939 ms |  |
| E6_restricted_note_not_used_or_mentioned | PASS | DRAFT_PACKAGED | complete | 1050 ms |  |
| E6b_authorised_user_sees_restricted_label | PASS | DRAFT_PACKAGED | complete | 1113 ms |  |
| E2_conflicting_positions_flagged_escalated | PASS | MEMO_CONFLICT_ESCALATED | complete | 795 ms |  |
| E8_internal_memo_template | PASS | MEMO_DRAFTED | complete | 724 ms |  |
| E10_what_did_we_say_in_2023 | PASS | POSITION_LOOKUP | complete | 640 ms |  |
| E4b_superseded_labelled_in_lookup | PASS | POSITION_LOOKUP | complete | 414 ms |  |
| E5_fake_citation_flagged | PASS | UNSUPPORTED_FLAGGED | complete | 621 ms |  |
| E7_head_files_final_register_updated | PASS | FINAL_FILED_REGISTER_UPDATED | complete | 624 ms |  |
| E7b_officer_cannot_file_final | PASS | FILE_REFUSED | complete | 402 ms |  |
| E9_heavy_edits_captured | PASS | EDITS_CAPTURED | complete | 421 ms |  |

## E1_E3_E4_draft_all_questions_gap_options_current_positions

Session `3c1791a0-39ee-4bdd-ab2c-076636e7ee3e`. Tools: rd_parse, rd01_scope, rd02_positions, rd03_check_consistency, rd04_draft, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha draft our response to TRAI-SYN-CP-2026-11 | AI first draft, for officer review. Not approved for external use.\n\nDrafting brief: consultation response to TRAI on [SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E6_restricted_note_not_used_or_mentioned

Session `627eccef-e6b9-476f-88c2-07f598853356`. Tools: rd_parse, rd01_scope, rd02_positions, rd03_check_consistency, rd04_draft, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha draft our response to TRAI-SYN-CP-2026-11 | AI first draft, for officer review. Not approved for external use.\n\nDrafting brief: consultation response to TRAI on [SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E6b_authorised_user_sees_restricted_label

Session `c347d065-1174-4541-925c-f6667c8d2341`. Tools: rd_parse, rd01_scope, rd02_positions, rd03_check_consistency, rd04_draft, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=manager.neel draft our response to TRAI-SYN-CP-2026-11 | AI first draft, for officer review. Not approved for external use.\n\nDrafting brief: consultation response to TRAI on [SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E2_conflicting_positions_flagged_escalated

Session `0527a1f5-1709-4312-8e23-39b5fce09fcf`. Tools: rd_parse, rd03_check_consistency, r_notify, rd_memo, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha prepare an internal memo on net neutrality | AI draft, for officer review. MEMO / To: Head, Regulatory / From: Regulatory Affairs / Subject: net neutrality / Summary: Current Vi positions on net neutrality for the upcoming discussion / Vi positi... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E8_internal_memo_template

Session `5263188a-922a-4ad1-af65-e93cb2f87be6`. Tools: rd_parse, rd03_check_consistency, rd_memo, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha write a note to management on quality of service | AI draft, for officer review. MEMO / To: Head, Regulatory / From: Regulatory Affairs / Subject: quality of service / Summary: Current Vi positions on quality of service for the upcoming discussion / V... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E10_what_did_we_say_in_2023

Session `95b45269-de86-40ff-acd5-30cd5d7c7f0d`. Tools: rd_parse, rd_lookup, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha what did we say on net neutrality in 2023? | VI-MEMO-SYN-2023-044, para 1.3 (20 November 2023, approved, current): "Vi supported a blanket permission for zero-rated offers subject to transparency." / VI-DRAFT-SYN-2023-051, para 2.1 (5 December 2... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E4b_superseded_labelled_in_lookup

Session `66e15713-bc8d-4fca-a825-e8d7df0b1ce6`. Tools: rd_parse, rd_lookup, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha what did we say on satellite spectrum in 2021? | VI-SUB-SYN-2021-014, para 2.3 (10 May 2021, approved, superseded): "Vi supported administrative assignment for satellite backhaul only." Anything else? |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E5_fake_citation_flagged

Session `ad1b70cb-3da8-4f58-a239-decdd30f7b80`. Tools: rd_parse, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha verify: Vi has always supported auction for all spectrum [VI-SUB-SYN-2019-999, para 4] | Verification: 0 supported, 0 partial, 1 unsupported. UNSUPPORTED: "user=officer.asha verify: Vi has always supported auction for all spectrum" (citation VI-SUB-SYN-2019-999 4 not found in the corpus) ... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E7_head_files_final_register_updated

Session `215ad77a-e8eb-48ac-8823-e4aff2a0ccd6`. Tools: rd_parse, rd06_file_final, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=head.reg approve and file final VIDRAFT-155IMFC | VIDRAFT-155IMFC filed as the approved final by Head, Regulatory (synthetic). Position register updated: POS-SYN-SAT-2026-Q1 to POS-SYN-SAT-2026-Q5 are now current; POS-SYN-SAT-2025, POS-SYN-SAT-2025-P... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E7b_officer_cannot_file_final

Session `348d3cdf-7c8e-4a58-a0b5-b1f89be1d87a`. Tools: rd_parse, rd06_file_final, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha file the approved final VIDRAFT-155IMFC | Not filed. Only the Head, Regulatory (U2-2 approver) can declare an approved Vi position; your request has been logged. Anything else? |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E9_heavy_edits_captured

Session `e7458a95-4b2d-4b12-ac7d-b9c38939b64e`. Tools: rd_parse, rd06_capture_edits, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha record edits on VIDRAFT-155IMFC: 45% changed, reason position_changed | Edits on VIDRAFT-155IMFC captured: 45% materially changed, reason position_changed, by Asha Rao. Flagged as a heavy edit for the weekly prompt and retrieval review. Anything else? |
| done | Closing the session. Every draft and decision is in the audit trail. |
