# Test results: Vi UC3 Enterprise Collections

6/9 scenarios passed. Run 2026-10-27 14:24 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| verified_contact_pays_now | FAIL | PAYMENT_LINK_SENT | complete | 339 ms | never said: billing contact for Sharma Logistics Pvt Ltd |
| promise_to_pay_within_policy | PASS | PTP_RECORDED | complete | 487 ms |  |
| dispute_sr_token_and_dunning_paused | FAIL | DISPUTE_RAISED | complete | 605 ms | never said: reference token is SR- |
| callback_scheduled | PASS | CALLBACK_SCHEDULED | complete | 286 ms |  |
| paid_invoice_auto_closed_no_contact | PASS | PAID_AUTO_CLOSED | complete | 857 ms |  |
| reminder_run_schedules_and_sends_link | PASS | REMINDERS_SCHEDULED | complete | 670 ms |  |
| wrong_person_no_amount_disclosed | PASS | WRONG_PARTY | complete | 487 ms |  |
| promise_beyond_policy_goes_to_desk | PASS | HANDOFF_PTP_BEYOND_POLICY | escalate | 941 ms |  |
| waiver_request_to_collections_desk | FAIL | HANDOFF_WAIVER_REQUEST | escalate | 1694 ms | slowest turn 1694 ms > 1200 ms |

## verified_contact_pays_now

Session `1e42bd33-417a-48f0-b0e5-aac2c024ac5a`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_send_payment_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes speaking | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| please send me the payment link now | I've sent a secure payment link for ₹48,600 to this number on WhatsApp, reference PAYL-03TP3UV. Once the payment goes through, the follow-up closes automatically. Thank you. |

## promise_to_pay_within_policy

Session `d6e51eab-30ff-473b-a89c-d352dda0f362`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_record_ptp, a23_send_message, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| we can pay in 3 days | Thank you. I've recorded your commitment to pay ₹48,600 by 2026-10-30, reference PTP-0NSQ1LQ, and sent a confirmation on WhatsApp with the payment link. |

## dispute_sr_token_and_dunning_paused

Session `d31e1724-9b18-4ab0-87a8-2798c905d0a2`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a24_create_dispute_sr, a24_pause_dunning, a23_send_message, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=whatsapp mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| this bill is wrong, we were overcharged | I'm sorry to hear that. Is this a billing error, a service that wasn't delivered, a plan mismatch, or something else? |
| it is a billing error | What amount are you disputing? |
| 12,000 | Briefly, what is wrong with the charge? |
| the data add-on was charged twice in September | I've raised your dispute of ₹12,000. Your reference token is [REDACTED], and we'll resolve it within 5 working days. Payment reminders for invoice INV-2026-09-5001 are paused until then, and I've sent the details on WhatsApp. Thank you. |

## callback_scheduled

Session `353774c8-ade5-46ee-be86-f351ecb1ff8a`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_schedule_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5002 msisdn=9870000002 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Neha Kapoor, the billing contact for Greenleaf Foods LLP? |
| yes | Thank you. The September 2026 invoice INV-2026-09-5002 for ₹1,12,300 was due on 25 October 2026 and is now 2 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| I'm in a meeting, call back later | Of course. When would be a good time to call you back? |
| tomorrow morning | Done. We'll call you back tomorrow between 10 and 11 am. Thank you. |

## paid_invoice_auto_closed_no_contact

Session `306599a1-f6ac-4608-85af-2e66e0019f88`. Tools: a03_get_billing_status, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5003 msisdn=9870000003 channel=ivr mode=followup |  |

## reminder_run_schedules_and_sends_link

Session `3ca0be36-6211-47b2-abbc-98091d876f01`. Tools: a03_get_billing_status, a22_schedule_reminders, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5002 msisdn=9870000002 channel=whatsapp mode=reminder |  |

## wrong_person_no_amount_disclosed

Session `10292333-3fed-416c-a772-0c559096ffba`. Tools: a03_get_billing_status, a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| no, he left the company | Sorry for the trouble. We'll reach the right contact another way. Goodbye. |

## promise_beyond_policy_goes_to_desk

Session `a3db6237-bded-4cd6-adf5-ddc28f1c2eb3`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_record_ptp, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5002 msisdn=9870000002 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Neha Kapoor, the billing contact for Greenleaf Foods LLP? |
| yes | Thank you. The September 2026 invoice INV-2026-09-5002 for ₹1,12,300 was due on 25 October 2026 and is now 2 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| we can pay in 20 days | I can only record a payment date within 7 days. Could you pay within 7 days, or would you like the collections team to call you? |
| please have the team call me | I'm connecting you to our collections team, who will have the details of this conversation. Please hold. |

## waiver_request_to_collections_desk

Session `a217108a-fd67-4b3d-8e54-f8f0beee3a38`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| can you waive the late fee and give us a settlement? | I'm connecting you to our collections team, who will have the details of this conversation. Please hold. |
