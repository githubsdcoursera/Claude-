# Test results: Vi Prepaid Dropped Leads Outcall

9/10 scenarios passed. Run 2026-10-27 11:50 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| kyc_drop_resume_link_sent | PASS | RESUME_LINK_SENT | complete | 355 ms |  |
| payment_failed_hot_transfer | PASS | HOT_TRANSFERRED | escalate | 462 ms |  |
| busy_callback_scheduled | PASS | CALLBACK_SCHEDULED | complete | 461 ms |  |
| coverage_question_then_link | FAIL | RESUME_LINK_SENT | complete | 904 ms | never said: 4G coverage at your pincode 110092 |
| attempt_cap_no_call | PASS | MAX_ATTEMPTS_REACHED | complete | 600 ms |  |
| already_converted_duplicate_no_call | PASS | LEAD_ALREADY_CONVERTED | complete | 706 ms |  |
| not_interested | PASS | NOT_INTERESTED | complete | 487 ms |  |
| question_answered_by_llm_then_link | PASS | RESUME_LINK_SENT | complete | 432 ms |  |
| wrong_party | PASS | WRONG_PARTY | complete | 678 ms |  |
| opt_out | PASS | OPT_OUT | complete | 504 ms |  |

## kyc_drop_resume_link_sent

Session `eb30a322-da77-4e9b-86c9-38ddf3a9e54c`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, pdl01_send_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes speaking | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| yes please send it | Done. I've sent the link to this number by SMS and WhatsApp. It opens the Aadhaar verification step with your details already filled in. Is there anything else I can help you with? |
| no thanks | Thank you for choosing Vi. Have a good day. |

## payment_failed_hot_transfer

Session `da6b42b7-7f79-4779-8b72-9cddf022aa9c`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000002 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Fatima? |
| yes | Thanks, Fatima. You started your ₹349 recharge in the Vi app and it stopped at the payment step. Your payment of ₹349 didn't go through, and no money was deducted from your account. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| can I talk to an advisor to do it now | I'm connecting you to a Vi advisor now, who will have the details of your order. Please stay on the line. |

## busy_callback_scheduled

Session `fde3b3c4-167f-4cc1-a23f-b5301395298c`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a07_schedule_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| I'm busy right now, call back later | Of course. When would be a good time to call you back? For example, this evening or tomorrow morning. |
| tomorrow morning | Done. We'll call you back tomorrow between 10 and 11 am. Thank you, and have a good day. |

## coverage_question_then_link

Session `9d4a4f85-156a-4946-9e94-f62aca777270`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a10_check_coverage, pdl01_send_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000005 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Imran? |
| yes | Thanks, Imran. You started your new Vi prepaid SIM order in the Vi app and it stopped at the plan selection step. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| is the network coverage good in my area? | I couldn't confirm coverage for your pincode on this call, and an advisor can check it for you. Shall I send you the link to finish your new Vi prepaid SIM order? |
| yes send the link | Done. I've sent the link to this number by SMS and WhatsApp. It opens the plan selection step with your details already filled in. Is there anything else I can help you with? |
| no | Thank you for choosing Vi. Have a good day. |

## attempt_cap_no_call

Session `ed55221e-9488-4bf1-9bce-11f3fc0fba48`. Tools: a07_get_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000003 direction=outbound campaign=PREPAID_DROPPED_LEAD |  |

## already_converted_duplicate_no_call

Session `16b69cb2-6a68-4f53-a4f5-236a7920d0b0`. Tools: a07_get_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000004 direction=outbound campaign=PREPAID_DROPPED_LEAD |  |

## not_interested

Session `a81f8d42-52b3-46ac-a5e3-ea68bc2af628`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| no, I changed my mind | No problem, thank you for letting me know. If you change your mind, you can pick up where you left off in the Vi app at any time. Have a good day. |

## question_answered_by_llm_then_link

Session `c4b21bd7-c86e-4769-9656-b9df952fc4d2`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, pdl01_send_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| what plan was I buying? | You were buying the ₹299 Unlimited 28 days plan. Would you like the link to finish, to speak to an advisor, or a callback later? |
| ok send me the link | Done. I've sent the link to this number by SMS and WhatsApp. It opens the Aadhaar verification step with your details already filled in. Is there anything else I can help you with? |
| no | Thank you for choosing Vi. Have a good day. |

## wrong_party

Session `d3e4cce8-cb22-44bb-985f-d19c7dbefc6a`. Tools: a07_get_lead, a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| no, wrong number | Sorry for the trouble. Thank you for your time. Goodbye. |

## opt_out

Session `145ebab5-a4e5-47cb-9bd0-1e3692a1c3d2`. Tools: a07_get_lead, a06_compliance_gate, a03_get_journey_context, pdl02_get_resolution, a06_record_opt_out, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9820000001 direction=outbound campaign=PREPAID_DROPPED_LEAD | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Sanjay? |
| yes | Thanks, Sanjay. You started your new Vi prepaid SIM order in the Vi app and it stopped at the Aadhaar verification step. Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete. Would you like me to send you a link that takes you straight back to that step, with your details already filled in? |
| stop calling me | Understood. I've recorded that you don't want these calls, and we won't call you about this again. Goodbye. |
