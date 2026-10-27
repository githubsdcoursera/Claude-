# Test results: Vi UC4 VSD Outcall Intelligence

2/5 scenarios passed. Run 2026-10-27 12:23 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| service_connect_signed_off_one_click_approve | FAIL | - | prompt | 1764 ms | tool a28_next_best_action not called; tool a27_append_live_log not called; tool a11_record_outcome not called; disposition None != SIGNED_OFF; exit prompt != complete; never said: Dialling is locked until you confirm; never said: CUE positive_resolution; never said: DRAFT SUMMARY; never said: Saved. Outcome SIGNED_OFF |
| dial_stays_locked_until_confirmed | PASS | - | prompt | 448 ms |  |
| frustration_cue_supervisor_join_and_edit | FAIL | ESCALATED | complete | 1209 ms | tool a28_next_best_action not called; never said: CUE negative_shift |
| retention_port_signal_cue | FAIL | - | prompt | 294 ms | tool a28_next_best_action not called; never said: CUE churn_signal; never said: Do not argue or delay |
| unknown_account_dial_locked | PASS | - | complete | 208 ms |  |

## service_connect_signed_off_one_click_approve

Session `f66a9442-0f2f-455b-bfd0-fc25fc84e0ed`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial, a27_score_segment, a27_score_segment, __set_context_, __set_context_, __set_context_, __set_context_, __set_context_, __set_context_.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1001 campaign=SERVICE_CONNECT agent=Asha | PRE-CALL BRIEF - Nikhil Verma (ACC1001), Vi Max 501 (MOCK), 38 months, health amber, ARPU ₹540, network poor in last 14 days.
Open complaint: CMP-5531 - frequent call drops at home (9 days). Recent: 2... |
| DIAL | Dial enabled, call VSD-1RF2Y4H. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |
| SEG agent: Hello, this is Asha from Vi. I'm calling about your complaint CMP-5531. This call is recorded for quality and training. | Logged. |
| SEG customer: yes it is working now, the call drops are fixed since last week | Sentiment positive (advisory). |
| SEG agent: That's great. Can I record your confirmation that the issue is resolved? | Logged. |
| SEG customer: yes please, thank you | Sentiment positive (advisory). |
| END | I was unable to complete the response. Please try again. |
| APPROVE | I was unable to complete the response. Please try again. |

## dial_stays_locked_until_confirmed

Session `e6ceaa40-96e6-4e29-8563-38f5c900cc45`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1001 campaign=SERVICE_CONNECT agent=Asha | PRE-CALL BRIEF - Nikhil Verma (ACC1001), Vi Max 501 (MOCK), 38 months, health amber, ARPU ₹540, network poor in last 14 days.
Open complaint: CMP-5531 - frequent call drops at home (9 days). Recent: 2... |
| SEG customer: hello? | Dialling is still locked. Read the brief and script above, then say DIAL. |
| DIAL | Dial enabled, call VSD-1RF2Y4H. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |

## frustration_cue_supervisor_join_and_edit

Session `1d646016-eb01-48cf-9d47-e864c78cab9d`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial, a27_score_segment, a09_supervisor_join, a27_score_segment, __set_context_, __set_context__, a11_record_outcome.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1001 campaign=SERVICE_CONNECT agent=Asha | PRE-CALL BRIEF - Nikhil Verma (ACC1001), Vi Max 501 (MOCK), 38 months, health amber, ARPU ₹540, network poor in last 14 days.
Open complaint: CMP-5531 - frequent call drops at home (9 days). Recent: 2... |
| DIAL | Dial enabled, call VSD-1RF2Y4H. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |
| SEG customer: this is the third time I am calling and it is still not fixed, I am fed up | Sentiment negative (advisory). |
| ESCALATE customer very upset and wants a senior person | Supervisor requested (SUP-12G8SPP), joining under 1 minute with the brief and the live log. |
| SEG customer: okay I will wait for your supervisor | Sentiment neutral (advisory). |
| END | DRAFT SUMMARY: The customer stated that the call drop issue (CMP-5531) is still not fixed and expressed frustration. The agent escalated the call to a supervisor at the customer's request. The customer agreed to wait for the supervisor. OUTCOME: ESCALATED. QA: must_say_missing; none. Say APPROVE to save, or EDIT followed by your corrected summary. |
| EDIT Customer reported call drops still happening after two earlier calls. Supervisor joined. Complaint CMP-5531 reopened with new symptoms. | Saved. Outcome ESCALATED recorded with audit reference AUD-10K6N80 (kept online for 12 months). |

## retention_port_signal_cue

Session `a83bcfb4-ef6a-42d7-8d86-63b10e7fb2bd`. Tools: a25_get_precall_brief, a26_get_call_script, a26_enable_dial, a27_score_segment.

| Caller | Agent |
|---|---|
| BRIEF account=ACC1002 campaign=RETENTION agent=Ravi | PRE-CALL BRIEF - Pooja Bansal (ACC1002), Vi Max 701 (MOCK), 14 months, health red, ARPU ₹780, network good.
Open complaint: CMP-5602 - disputed roaming charge of ₹1,240 (4 days). Recent: 2026-10-20 po... |
| DIAL | Dial enabled, call VSD-1RF2Y4I. Listening in listen-only mode. Remember the must-say: This call is recorded for quality and training. |
| SEG customer: honestly I am thinking of moving to airtel | Sentiment neutral (advisory). |

## unknown_account_dial_locked

Session `420deb90-0a6d-4b58-be5a-7a51b50f2e3a`. Tools: a25_get_precall_brief.

| Caller | Agent |
|---|---|
| BRIEF account=ACC9999 campaign=SERVICE_CONNECT agent=Asha | No brief or script is available for account ACC9999 and campaign SERVICE_CONNECT. Dialling stays locked. Check the account and campaign and start again. |
