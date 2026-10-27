# Test results: Vi RA-UC2 Drafting and Institutional Knowledge

9/11 scenarios passed. Run 2026-10-27 18:04 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| E1_E3_E4_draft_all_questions_gap_options_current_positions | FAIL | DRAFT_PACKAGED | complete | 1006 ms | tool rd03_consistency not called; never said: GAP on Q6; never said: STALE on Q5 |
| E6_restricted_note_not_used_or_mentioned | PASS | DRAFT_PACKAGED | complete | 1008 ms |  |
| E6b_authorised_user_sees_restricted_label | PASS | DRAFT_PACKAGED | complete | 917 ms |  |
| E2_conflicting_positions_flagged_escalated | FAIL | MEMO_CONFLICT_ESCALATED | complete | 729 ms | tool rd03_consistency not called |
| E8_internal_memo_template | PASS | MEMO_DRAFTED | complete | 757 ms |  |
| E10_what_did_we_say_in_2023 | PASS | POSITION_LOOKUP | complete | 541 ms |  |
| E4b_superseded_labelled_in_lookup | PASS | POSITION_LOOKUP | complete | 552 ms |  |
| E5_fake_citation_flagged | PASS | UNSUPPORTED_FLAGGED | complete | 402 ms |  |
| E7_head_files_final_register_updated | PASS | FINAL_FILED_REGISTER_UPDATED | complete | 541 ms |  |
| E7b_officer_cannot_file_final | PASS | FILE_REFUSED | complete | 594 ms |  |
| E9_heavy_edits_captured | PASS | EDITS_CAPTURED | complete | 628 ms |  |

## E1_E3_E4_draft_all_questions_gap_options_current_positions

Session `7f073b09-102f-47b8-94d1-e75d3e6fe221`. Tools: rd_parse, rd01_scope, rd02_positions, rd04_draft, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha draft our response to TRAI-SYN-CP-2026-11 | AI first draft, for officer review. Not approved for external use.\n\nDrafting brief: consultation response to TRAI on [SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E6_restricted_note_not_used_or_mentioned

Session `de8a0669-96b9-44c4-b489-57c82eba86af`. Tools: rd_parse, rd01_scope, rd02_positions, rd03_check_consistency, rd04_draft, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha draft our response to TRAI-SYN-CP-2026-11 | AI first draft, for officer review. Not approved for external use.\n\nDrafting brief: consultation response to TRAI on [SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E6b_authorised_user_sees_restricted_label

Session `5847bcf7-c62d-46b0-8af6-1e389ccd93ba`. Tools: rd_parse, rd01_scope, rd02_positions, rd03_check_consistency, rd04_draft, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=manager.neel draft our response to TRAI-SYN-CP-2026-11 | AI first draft, for officer review. Not approved for external use.\n\nDrafting brief: consultation response to TRAI on [SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E2_conflicting_positions_flagged_escalated

Session `f7ee45bc-3b7c-4b9e-b9e7-babf6b35e8c3`. Tools: rd_parse, rd03_check_consistency, r_notify, rd_memo, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha prepare an internal memo on net neutrality | AI draft, for officer review. MEMO / To: Head, Regulatory / From: Regulatory Affairs / Subject: net neutrality / Summary: Current Vi positions on net neutrality for the upcoming discussion / Vi positi... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E8_internal_memo_template

Session `db96dfe4-a3fa-4075-83aa-1199089d290b`. Tools: rd_parse, rd03_check_consistency, rd_memo, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha write a note to management on quality of service | AI draft, for officer review. MEMO / To: Head, Regulatory / From: Regulatory Affairs / Subject: quality of service / Summary: Current Vi positions on quality of service for the upcoming discussion / V... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E10_what_did_we_say_in_2023

Session `d4a72eb0-b719-4b83-b0ab-f10ded7b209e`. Tools: rd_parse, rd_lookup, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha what did we say on net neutrality in 2023? | VI-MEMO-SYN-2023-044, para 1.3 (20 November 2023, approved, current): "Vi supported a blanket permission for zero-rated offers subject to transparency." / VI-DRAFT-SYN-2023-051, para 2.1 (5 December 2... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E4b_superseded_labelled_in_lookup

Session `1fca761b-92d4-4f79-8c46-eef20c8f1447`. Tools: rd_parse, rd_lookup, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha what did we say on satellite spectrum in 2021? | VI-SUB-SYN-2021-014, para 2.3 (10 May 2021, approved, superseded): "Vi supported administrative assignment for satellite backhaul only." Anything else? |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E5_fake_citation_flagged

Session `118c169a-b355-4ff2-a469-af03205dc191`. Tools: rd_parse, r_cite_verify, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha verify: Vi has always supported auction for all spectrum [VI-SUB-SYN-2019-999, para 4] | Verification: 0 supported, 0 partial, 1 unsupported. UNSUPPORTED: "user=officer.asha verify: Vi has always supported auction for all spectrum" (citation VI-SUB-SYN-2019-999 4 not found in the corpus) ... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E7_head_files_final_register_updated

Session `1376379d-2c45-4e83-b5e8-2446db425915`. Tools: rd_parse, rd06_file_final, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=head.reg approve and file final VIDRAFT-155IMFC | VIDRAFT-155IMFC filed as the approved final by Head, Regulatory (synthetic). Position register updated: POS-SYN-SAT-2026-Q1 to POS-SYN-SAT-2026-Q5 are now current; POS-SYN-SAT-2025, POS-SYN-SAT-2025-P... |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E7b_officer_cannot_file_final

Session `c216840c-1843-4727-bb3b-def009df32ac`. Tools: rd_parse, rd06_file_final, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha file the approved final VIDRAFT-155IMFC | Not filed. Only the Head, Regulatory (U2-2 approver) can declare an approved Vi position; your request has been logged. Anything else? |
| done | Closing the session. Every draft and decision is in the audit trail. |

## E9_heavy_edits_captured

Session `2d100b97-9089-4598-8fb5-6e6114092a18`. Tools: rd_parse, rd06_capture_edits, r_audit_log, rd_parse.

| Caller | Agent |
|---|---|
| user=officer.asha record edits on VIDRAFT-155IMFC: 45% changed, reason position_changed | Edits on VIDRAFT-155IMFC captured: 45% materially changed, reason position_changed, by Asha Rao. Flagged as a heavy edit for the weekly prompt and retrieval review. Anything else? |
| done | Closing the session. Every draft and decision is in the audit trail. |
