# Test results: Vi UC3 Enterprise Collections

8/9 scenarios passed. Run 2026-10-27 20:26 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| verified_contact_pays_now | PASS | PAYMENT_LINK_SENT | complete | 518 ms |  |
| promise_to_pay_within_policy | PASS | PTP_RECORDED | complete | 507 ms |  |
| dispute_sr_token_and_dunning_paused | FAIL | DISPUTE_RAISED | complete | 556 ms | never said: dispute reference number is SR- |
| callback_scheduled | PASS | CALLBACK_SCHEDULED | complete | 279 ms |  |
| paid_invoice_auto_closed_no_contact | PASS | PAID_AUTO_CLOSED | complete | 365 ms |  |
| reminder_run_schedules_and_sends_link | PASS | REMINDERS_SCHEDULED | complete | 547 ms |  |
| wrong_person_no_amount_disclosed | PASS | WRONG_PARTY | complete | 460 ms |  |
| promise_beyond_policy_goes_to_desk | PASS | HANDOFF_PTP_BEYOND_POLICY | escalate | 458 ms |  |
| waiver_request_to_collections_desk | PASS | HANDOFF_WAIVER_REQUEST | escalate | 299 ms |  |

## verified_contact_pays_now

Session `1e6ba724-f3be-4d8d-8d4b-678abb51172b`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_send_payment_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes speaking | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| please send me the payment link now | I've sent a secure payment link for ₹48,600 to this number on WhatsApp, reference PAYL-03TP3UV. Once the payment goes through, the follow-up closes automatically. Thank you. |

## promise_to_pay_within_policy

Session `7f5d9126-492d-48a8-ab34-4aa27718596f`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_record_ptp, a23_send_message, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| we can pay in 3 days | Thank you. I've recorded your commitment to pay ₹48,600 by 2026-10-30, reference PTP-0NSQ1LQ, and sent a confirmation on WhatsApp with the payment link. |

## dispute_sr_token_and_dunning_paused

Session `601b7547-8eb9-4e14-86a3-efdafaee963f`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a24_create_dispute_sr, a24_pause_dunning, a23_send_message, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=whatsapp mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| this bill is wrong, we were overcharged | I'm sorry to hear that. Is this a billing error, a service that wasn't delivered, a plan mismatch, or something else? |
| it is a billing error | What amount are you disputing? |
| 12,000 | Briefly, what is wrong with the charge? |
| the data add-on was charged twice in September | I've raised your dispute of ₹12,000. Your dispute reference number is [REDACTED], and we'll resolve it within 5 working days. Payment reminders for invoice INV-2026-09-5001 are paused until then, and I've sent the details on WhatsApp. Thank you. |

## callback_scheduled

Session `8cf22317-6f7f-4769-92c1-855ce7068605`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_schedule_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5002 msisdn=9870000002 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Neha Kapoor, the billing contact for Greenleaf Foods LLP? |
| yes | Thank you. The September 2026 invoice INV-2026-09-5002 for ₹1,12,300 was due on 25 October 2026 and is now 2 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| I'm in a meeting, call back later | Of course. When would be a good time to call you back? |
| tomorrow morning | Done. We'll call you back tomorrow between 10 and 11 am. Thank you. |

## paid_invoice_auto_closed_no_contact

Session `7b0eeb45-9428-4aa5-b102-c57ca71a1879`. Tools: a03_get_billing_status, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5003 msisdn=9870000003 channel=ivr mode=followup |  |

## reminder_run_schedules_and_sends_link

Session `1412b5f0-0906-4911-8e58-b8b656d01ce9`. Tools: a03_get_billing_status, a22_schedule_reminders, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5002 msisdn=9870000002 channel=whatsapp mode=reminder |  |

## wrong_person_no_amount_disclosed

Session `c450f139-90cc-4054-baea-6e4caa1a613a`. Tools: a03_get_billing_status, a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| no, he left the company | Sorry for the trouble. We'll reach the right contact another way. Goodbye. |

## promise_beyond_policy_goes_to_desk

Session `21e15e25-4a70-4052-aa18-155dd6bf3555`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a23_record_ptp, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5002 msisdn=9870000002 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Neha Kapoor, the billing contact for Greenleaf Foods LLP? |
| yes | Thank you. The September 2026 invoice INV-2026-09-5002 for ₹1,12,300 was due on 25 October 2026 and is now 2 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| we can pay in 20 days | I can only record a payment date within 7 days. Could you pay within 7 days, or would you like the collections team to call you? |
| please have the team call me | I'm connecting you to our collections team, who will have the details of this conversation. Please hold. |

## waiver_request_to_collections_desk

Session `dd50bc06-12ae-4123-a1c0-fe8f060d8e49`. Tools: a03_get_billing_status, a06_compliance_gate, a04_verify_billing_contact, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START account=ENT5001 msisdn=9870000001 channel=ivr mode=followup | Hello, this is Vi Business's virtual assistant. I am an AI, and this conversation is recorded for quality and training. Am I speaking with Rakesh Sharma, the billing contact for Sharma Logistics Pvt L... |
| yes | Thank you. The September 2026 invoice INV-2026-09-5001 for ₹48,600 was due on 20 October 2026 and is now 7 days overdue. Would you like to pay now, tell me when you can pay, get a callback, or raise a dispute? |
| can you waive the late fee and give us a settlement? | I'm connecting you to our collections team, who will have the details of this conversation. Please hold. |
