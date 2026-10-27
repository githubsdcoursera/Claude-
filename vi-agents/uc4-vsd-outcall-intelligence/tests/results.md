# Test results: Vi UC4 VSD Outcall Intelligence

3/5 scenarios passed. Run 2026-10-27 12:53 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| service_connect_signed_off_one_click_approve | FAIL | ISSUE_REOPENED | complete | 499 ms | disposition ISSUE_REOPENED != SIGNED_OFF; never said: CUE positive_resolution; never said: Saved. Outcome SIGNED_OFF |
| dial_stays_locked_until_confirmed | PASS | FOLLOW_UP | complete | 396 ms |  |
| frustration_cue_supervisor_join_and_edit | PASS | ESCALATED | complete | 486 ms |  |
| retention_port_signal_cue | FAIL | FOLLOW_UP | complete | 276 ms | tool a28_next_best_action not called; never said: CUE churn_signal; never said: Do not argue or delay |
| unknown_account_dial_locked | PASS | - | complete | 215 ms |  |

## service_connect_signed_off_one_click_approve

Session `5e9328c4-4c5c-443e-9584-8547565f683b`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial, a27_score_segment, a28_next_best_action, a27_append_live_log, a27_score_segment, a28_next_best_action, a11_record_outcome.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1001 campaign=SERVICE_CONNECT agent=Asha | PRE-CALL BRIEF - Nikhil Verma (ACC1001), Vi Max 501 (MOCK), 38 months, health amber, ARPU ₹540, network poor in last 14 days.
Open complaint: CMP-5531 - frequent call drops at home (9 days). Recent: 2... |
| DIAL | Dial enabled, call VSD-1RF2Y4H. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |
| SEG agent: Hello, this is Asha from Vi. I'm calling about your complaint CMP-5531. This call is recorded for quality and training. | Logged. |
| SEG customer: yes it is working now, the call drops are fixed since last week | Sentiment positive (advisory, confidence 0.75). CUE unresolved_issue: Do not record sign-off. Re-open the complaint with the latest symptoms and give the customer the new reference. |
| SEG agent: That's great. Can I record your confirmation that the issue is resolved? | Logged. |
| SEG customer: yes please, thank you | Sentiment positive (advisory). |
| END | DRAFT SUMMARY: Outcall to Nikhil Verma (SERVICE_CONNECT) about CMP-5531, frequent call drops at home. Last customer statement: yes please, thank you. Last cue: unresolved_issue. OUTCOME: ISSUE_REOPENED. Say APPROVE to save, or EDIT followed by your corrected summary. |
| APPROVE | Saved. Outcome ISSUE_REOPENED recorded with audit reference AUD-03FZODG (kept online for 12 months). |

## dial_stays_locked_until_confirmed

Session `9463bc11-7a37-446c-8e5e-afb33fff03d7`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial, a11_record_outcome.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1001 campaign=SERVICE_CONNECT agent=Asha | PRE-CALL BRIEF - Nikhil Verma (ACC1001), Vi Max 501 (MOCK), 38 months, health amber, ARPU ₹540, network poor in last 14 days.
Open complaint: CMP-5531 - frequent call drops at home (9 days). Recent: 2... |
| SEG customer: hello? | Dialling is still locked. Read the brief and script above, then say DIAL. |
| DIAL | Dial enabled, call VSD-1RF2Y4H. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |
| END | DRAFT SUMMARY: Outcall to Nikhil Verma (SERVICE_CONNECT) about CMP-5531, frequent call drops at home. Last customer statement: none. Last cue: none. OUTCOME: FOLLOW_UP. Say APPROVE to save, or EDIT followed by your corrected summary. |
| APPROVE | Saved. Outcome FOLLOW_UP recorded with audit reference AUD-0SQOSKN (kept online for 12 months). |

## frustration_cue_supervisor_join_and_edit

Session `6d76f71b-66db-4f37-ba07-746177c207bb`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial, a27_score_segment, a28_next_best_action, a27_append_live_log, a09_supervisor_join, a27_score_segment, a11_record_outcome.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1001 campaign=SERVICE_CONNECT agent=Asha | PRE-CALL BRIEF - Nikhil Verma (ACC1001), Vi Max 501 (MOCK), 38 months, health amber, ARPU ₹540, network poor in last 14 days.
Open complaint: CMP-5531 - frequent call drops at home (9 days). Recent: 2... |
| DIAL | Dial enabled, call VSD-1RF2Y4H. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |
| SEG customer: this is the third time I am calling and it is still not fixed, I am fed up | Sentiment negative (advisory, confidence 0.75). CUE negative_shift: Acknowledge the repeated effort first, for example: I understand this has taken too many calls, and I am sorry. Then confirm the one thing you will do today. |
| ESCALATE customer very upset and wants a senior person | Supervisor requested (SUP-12G8SPP), joining under 1 minute with the brief and the live log. |
| SEG customer: okay I will wait for your supervisor | Sentiment neutral (advisory). |
| END | DRAFT SUMMARY: Outcall to Nikhil Verma (SERVICE_CONNECT) about CMP-5531, frequent call drops at home. Last customer statement: okay I will wait for your supervisor. Last cue: negative_shift. OUTCOME: ESCALATED. Say APPROVE to save, or EDIT followed by your corrected summary. |
| EDIT Customer reported call drops still happening after two earlier calls. Supervisor joined. Complaint CMP-5531 reopened with new symptoms. | Saved. Outcome ESCALATED recorded with audit reference AUD-10K6N80 (kept online for 12 months). |

## retention_port_signal_cue

Session `6e1c2431-bafc-4573-a55c-f700bba10ee3`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial, a27_score_segment, a11_record_outcome.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1002 campaign=RETENTION agent=Ravi | PRE-CALL BRIEF - Pooja Bansal (ACC1002), Vi Max 701 (MOCK), 14 months, health red, ARPU ₹780, network good.
Open complaint: CMP-5602 - disputed roaming charge of ₹1,240 (4 days). Recent: 2026-10-20 po... |
| DIAL | Dial enabled, call VSD-1RF2Y4I. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |
| SEG customer: honestly I am thinking of moving to airtel | Sentiment neutral (advisory). |
| END | DRAFT SUMMARY: Outcall to Pooja Bansal (RETENTION) about CMP-5602, disputed roaming charge of ₹1,240. Last customer statement: honestly I am thinking of moving to airtel. Last cue: none. OUTCOME: FOLLOW_UP. Say APPROVE to save, or EDIT followed by your corrected summary. |
| APPROVE | Saved. Outcome FOLLOW_UP recorded with audit reference AUD-1Y1XY08 (kept online for 12 months). |

## unknown_account_dial_locked

Session `2420befc-e39d-472a-828e-a632fe499d87`. Tools: a25_get_precall_brief.

| Caller | Agent |
|---|---|
| BRIEF account=ACC9999 campaign=SERVICE_CONNECT agent=Asha | No brief or script is available for account ACC9999 and campaign SERVICE_CONNECT. Dialling stays locked. Check the account and campaign and start again. |
