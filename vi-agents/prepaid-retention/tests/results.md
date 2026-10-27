# Test results: Vi Prepaid Retention Outcall

12/12 scenarios passed. Run 2026-10-27 15:29 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| network_issue_fixed_first_then_free_offer | PASS | OFFER_APPLIED | complete | 401 ms |  |
| price_reason_chargeable_offer_with_otp | PASS | OFFER_APPLIED | complete | 379 ms |  |
| port_request_answered_immediately_no_pitch | PASS | PORT_GUIDANCE_GIVEN | complete | 338 ms |  |
| port_request_mid_offer_still_answered | PASS | PORT_GUIDANCE_GIVEN | complete | 368 ms |  |
| dnd_compliance_stop_no_call | PASS | COMPLIANCE_STOP | complete | 301 ms |  |
| attempt_cap_reached_no_call | PASS | COMPLIANCE_STOP | complete | 323 ms |  |
| offer_declined_sms_and_tracking | PASS | OFFER_DECLINED | complete | 274 ms |  |
| no_issue_recharge_reminder | PASS | NO_ISSUE_REMINDED | complete | 284 ms |  |
| unclear_reason_clarified_then_service_fixed | PASS | SERVICE_FIXED_OFFER_DECLINED | complete | 405 ms |  |
| wrong_party | PASS | WRONG_PARTY | complete | 395 ms |  |
| opt_out | PASS | OPT_OUT | complete | 334 ms |  |
| asks_for_human | PASS | HANDOFF_CUSTOMER_REQUEST | escalate | 308 ms |  |

## network_issue_fixed_first_then_free_offer

Session `c224bfe7-1557-481b-be3c-b1c6aba345c6`. Tools: a06_compliance_gate, a03_get_retention_context, prt01_check_network, a08_raise_network_ticket, prt03_get_offer_authority, a08_record_consent, a08_apply_offer, a08_send_sms, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000001 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Kavya? |
| yes speaking | Thanks, Kavya. Your ₹299 Unlimited 28 days (MOCK) plan is due for recharge in 2 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| my network keeps dropping calls | I'm sorry about the network trouble. There is a known issue in Kukatpally and our engineers expect it to be fixed within 48 hours. I've logged your complaint under reference TKT-0KMN235 so you'll get an update. As a valued Vi customer, I can also offer you 10 GB of bonus data free for 7 days, as an apology for the network issue. Would you like that? |
| yes | To confirm, I'll add 10 GB of bonus data free for 7 days, as an apology for the network issue to your number at no extra charge. Shall I go ahead? |
| yes go ahead | Done. Your offer has been applied, reference OFA-1C0SRPX, and I've sent you a confirmation SMS. Is there anything else I can help you with? |
| no thanks | Thank you for your time, and for being with Vi. Goodbye. |

## price_reason_chargeable_offer_with_otp

Session `9ab156eb-a75e-4d4a-a416-74253572cc91`. Tools: a06_compliance_gate, a03_get_retention_context, prt02_get_plan_fit, prt03_get_offer_authority, a08_record_consent, a04_send_otp, a04_verify_otp, a08_apply_offer, a08_send_sms, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000002 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Arjun? |
| yes | Thanks, Arjun. Your ₹349 Unlimited 28 days (MOCK) plan is due for recharge in 0 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| honestly it is too expensive | As a valued Vi customer, I can offer you the ₹299 plan for ₹249 on your next recharge, with the same unlimited calls, 1.5 GB data per day and 100 SMS per day, valid 28 days. Would you like that? |
| yes | To confirm: the ₹299 plan for ₹249 on your next recharge, with the same unlimited calls, 1.5 GB data per day and 100 SMS per day, valid 28 days, for ₹249, charged to your Vi balance on your next recharge. Do you agree? |
| yes I agree | I've sent a six-digit OTP to your Vi number. Please read it out. |
| 123456 | Done. Your offer has been applied, reference OFA-05MFJ8C, and I've sent you a confirmation SMS. Is there anything else I can help you with? |
| no | Thank you for your time, and for being with Vi. Goodbye. |

## port_request_answered_immediately_no_pitch

Session `4925f913-ad24-41b7-82d6-ffc25def404a`. Tools: a06_compliance_gate, a03_get_retention_context, prt04_mnp_guidance, a08_send_sms, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000003 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Meera? |
| yes | Thanks, Meera. Your ₹199 Value 28 days (MOCK) plan is due for recharge in 5 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| I want to port my number to Jio | Of course. To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll receive a Unique Porting Code to give to your new operator. I've also sent these steps to you by SMS. Is there anything else I can help you with? |
| no that's all | Thank you for your time, and for being with Vi. Goodbye. |

## port_request_mid_offer_still_answered

Session `c34dcd54-53a5-4bba-a724-cb5a2bf37302`. Tools: a06_compliance_gate, a03_get_retention_context, prt02_get_plan_fit, prt03_get_offer_authority, prt04_mnp_guidance, a08_send_sms, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000002 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Arjun? |
| yes | Thanks, Arjun. Your ₹349 Unlimited 28 days (MOCK) plan is due for recharge in 0 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| it's costly | As a valued Vi customer, I can offer you the ₹299 plan for ₹249 on your next recharge, with the same unlimited calls, 1.5 GB data per day and 100 SMS per day, valid 28 days. Would you like that? |
| no, I'd rather port out to airtel | Of course. To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll receive a Unique Porting Code to give to your new operator. I've also sent these steps to you by SMS. Is there anything else I can help you with? |
| no | Thank you for your time, and for being with Vi. Goodbye. |

## dnd_compliance_stop_no_call

Session `d92dc2ad-245a-4f31-b10f-eecdb6919058`. Tools: a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000004 direction=outbound campaign=PREPAID_LAPSE_RISK_30D |  |

## attempt_cap_reached_no_call

Session `95ce2ea3-42d2-4cd6-abc8-e3b0b1e03cd5`. Tools: a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000005 direction=outbound campaign=PREPAID_LAPSE_RISK_30D |  |

## offer_declined_sms_and_tracking

Session `f2af4774-8f45-4ba6-a231-216b66251bac`. Tools: a06_compliance_gate, a03_get_retention_context, prt02_get_plan_fit, prt03_get_offer_authority, a08_send_sms, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000003 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Meera? |
| yes | Thanks, Meera. Your ₹199 Value 28 days (MOCK) plan is due for recharge in 5 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| my data runs out too quickly | As a valued Vi customer, I can offer you 5 GB of bonus data free with your next recharge. Would you like that? |
| no thanks | No problem at all. I've sent your recharge options to you by SMS. Is there anything else I can help you with? |
| no | Thank you for your time, and for being with Vi. Goodbye. |

## no_issue_recharge_reminder

Session `b4cedbee-2fa8-4a43-bfdc-aa1a352d1d4a`. Tools: a06_compliance_gate, a03_get_retention_context, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000001 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Kavya? |
| yes | Thanks, Kavya. Your ₹299 Unlimited 28 days (MOCK) plan is due for recharge in 2 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| no everything is fine, I will recharge | That's good to hear. A quick reminder that your plan is due in 2 days. You can recharge any time in the Vi app. Thank you for being with Vi. |

## unclear_reason_clarified_then_service_fixed

Session `173794d8-b5fa-43f3-af05-90bb8ebb9e02`. Tools: a06_compliance_gate, a03_get_retention_context, prt01_check_network, a08_raise_network_ticket, prt03_get_offer_authority, a08_send_sms, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000002 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Arjun? |
| yes | Thanks, Arjun. Your ₹349 Unlimited 28 days (MOCK) plan is due for recharge in 0 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| my sim got blocked last week for no reason and it took days to fix | Thanks for telling me. Is it mainly about the network, the price, or your data? |
| it's the service | I'm sorry about the network trouble. I've logged your complaint under reference TKT-0538SOT so you'll get an update. As a valued Vi customer, I can also offer you 10 GB of bonus data free for 7 days, as an apology for the network issue. Would you like that? |
| no thanks | No problem at all. I've sent your recharge options to you by SMS. Is there anything else I can help you with? |
| no | Thank you for your time, and for being with Vi. Goodbye. |

## wrong_party

Session `ba135fb8-6154-4e95-b630-4bd97fb1ea40`. Tools: a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000001 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Kavya? |
| no wrong number | Sorry for the trouble. Thank you for your time. Goodbye. |

## opt_out

Session `801c7904-14d9-415f-949f-31d4b0cd18e9`. Tools: a06_compliance_gate, a03_get_retention_context, a06_record_opt_out, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000001 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Kavya? |
| yes | Thanks, Kavya. Your ₹299 Unlimited 28 days (MOCK) plan is due for recharge in 2 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| please don't call me again | Understood. I've recorded that you don't want these calls, and we won't call you about this again. Goodbye. |

## asks_for_human

Session `359ef16e-eae5-4986-a381-b4f6f1bd8bbd`. Tools: a06_compliance_gate, a03_get_retention_context, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000001 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Kavya? |
| yes | Thanks, Kavya. Your ₹299 Unlimited 28 days (MOCK) plan is due for recharge in 2 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| can I talk to a real person | I'm connecting you to a Vi advisor who will have the details of this call. Please stay on the line. |
