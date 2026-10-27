# Test results: Vi Prepaid Dropped Leads Outcall

9/10 scenarios passed. Run 2026-10-27 12:21 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| kyc_drop_resume_link_sent | PASS | RESUME_LINK_SENT | complete | 478 ms |  |
| busy_callback_scheduled | PASS | CALLBACK_SCHEDULED | complete | 465 ms |  |
| coverage_question_then_link | FAIL | RESUME_LINK_SENT | complete | 364 ms | tool a10_check_coverage not called; never said: 4G coverage at your registered address |
| attempt_cap_no_call | PASS | MAX_ATTEMPTS_REACHED | complete | 446 ms |  |
| already_converted_duplicate_no_call | PASS | LEAD_ALREADY_CONVERTED | complete | 459 ms |  |
| not_interested | PASS | NOT_INTERESTED | complete | 267 ms |  |
| question_answered_by_llm_then_link | PASS | RESUME_LINK_SENT | complete | 463 ms |  |
| wrong_party | PASS | WRONG_PARTY | complete | 296 ms |  |
| opt_out | PASS | OPT_OUT | complete | 319 ms |  |
| payment_failed_hot_transfer | PASS | HOT_TRANSFERRED | escalate | 303 ms |  |

## kyc_drop_resume_link_sent

Session `55ed9831-6e3e-4037-80a9-9f57e0b24aa2`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, pdl01_send_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes speaking | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| yes please send it | Done. I've sent the link to this number by SMS and WhatsApp. It opens the Aadhaar verification step with your details already filled in. Is there anything else I can help you with? |
| no thanks | Thank you for choosing Vi. Have a good day. |

## busy_callback_scheduled

Session `88447840-f466-43f1-9e36-405b4402cfc2`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a07_schedule_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| I'm busy right now, call back later | Of course. When would be a good time to call you back? For example, this evening or tomorrow morning. |
| tomorrow morning | Done. We'll call you back tomorrow between 10 and 11 am. Thank you, and have a good day. |

## coverage_question_then_link

Session `683d5278-10fd-42e9-a6a6-45acfa3a1909`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, pdl01_send_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000005 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Imran? |
| yes | Thanks, Imran. You started your new Vi prepaid SIM order in the Vi app and it stopped at the plan selection step. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| is the network coverage good in my area? | I couldn't confirm coverage for your pincode on this call, and an advisor can check it for you. Shall I send you the link to finish your new Vi prepaid SIM order? |
| yes send the link | Done. I've sent the link to this number by SMS and WhatsApp. It opens the plan selection step with your details already filled in. Is there anything else I can help you with? |
| no | Thank you for choosing Vi. Have a good day. |

## attempt_cap_no_call

Session `a597051a-83cc-49da-9d3c-5fecd43315c3`. Tools: a07_get_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000003 direction=outbound campaign=PREPAID_DROPPED_LEAD |  |

## already_converted_duplicate_no_call

Session `014f31f8-c753-4b8b-a46d-d52f9418a29d`. Tools: a07_get_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000004 direction=outbound campaign=PREPAID_DROPPED_LEAD |  |

## not_interested

Session `b4e2889b-f5a8-4516-9b1c-07b5236f1ce9`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| no, I changed my mind | No problem, thank you for letting me know. If you change your mind, you can pick up where you left off in the Vi app at any time. Have a good day. |

## question_answered_by_llm_then_link

Session `4542d73c-3d69-4b4f-b75f-268810ace546`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, pdl01_send_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| what plan was I buying? | You were buying the ₹299 Unlimited 28 days plan.

Would you like the link to finish, to speak to an advisor, or a callback later? |
| ok send me the link | Done. I've sent the link to this number by SMS and WhatsApp. It opens the Aadhaar verification step with your details already filled in. Is there anything else I can help you with? |
| no | Thank you for choosing Vi. Have a good day. |

## wrong_party

Session `41bbf68c-bc7e-498d-bbb5-f25c01a9178d`. Tools: a07_get_lead, a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| no, wrong number | Sorry for the trouble. Thank you for your time. Goodbye. |

## opt_out

Session `1e995e64-32f5-428b-8aa6-d9e4df8ac374`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a06_record_opt_out, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| stop calling me | Understood. I've recorded that you don't want these calls, and we won't call you about this again. Goodbye. |

## payment_failed_hot_transfer

Session `9eaa1a84-c42d-489f-86ed-9755b457df2a`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000002 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Fatima? |
| yes | Thanks, Fatima. You started your ₹349 recharge in the Vi app and it stopped at the payment step. Your payment of ₹349 didn't go through, and no money was deducted from your account. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| can I talk to an advisor to do it now | I'm connecting you to a Vi advisor now, who will have the details of your order. Please stay on the line. |
