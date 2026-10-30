# Test results: Vi UC7 Prepaid to Postpaid Upgrade

6/6 scenarios passed. Run 2026-10-27 13:54 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| accept_upgrade_same_sim_order_ekyc | PASS | ORDER_CREATED | complete | 698 ms |  |
| decline_gets_sms | PASS | DECLINED_SMS_SENT | complete | 464 ms |  |
| pilot_circle_excluded_no_call | PASS | COMPLIANCE_STOP | complete | 541 ms |  |
| credit_check_not_passed | PASS | NOT_ELIGIBLE_CREDIT | complete | 347 ms |  |
| wrong_party | PASS | WRONG_PARTY | complete | 1036 ms |  |
| wants_human_hot_transfer | PASS | HOT_TRANSFERRED | escalate | 465 ms |  |

## accept_upgrade_same_sim_order_ekyc

Session `35ee2e98-b864-450e-8599-bab209cc2e58`. Tools: a07_get_upgrade_lead, a06_compliance_gate, a15_get_upgrade_offer, a08_record_consent, a04_send_otp, a04_verify_otp, a08_create_migration_order, a08_send_sms, a11_schedule_activation_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9840000001 campaign=UPGRADE_PREPAID_TO_POSTPAID | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Aditi? |
| yes speaking | Thanks, Aditi. You're on ₹479 Unlimited 56 days (MOCK) and spend about ₹640 a month. On postpaid, Vi Max 501 is ₹501 per month with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. You keep the same SIM and the same number. Would you like to switch? |
| yes, let's switch | To confirm: move your number to Vi Max 501 postpaid at ₹501 per month, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. Your SIM and number stay the same, and your first bill will come on 28 November 2026, covering usage from the day of activation. Do you agree? |
| yes I agree | I've sent a six-digit OTP to your Vi number. Please read it out. |
| 123456 | Done. Your order reference is MIG-1BWV2TU. I've sent you an SMS with a secure e-KYC link; once you complete it, your number moves to postpaid within 24 hours of completing e-KYC, and your first bill will come on 28 November 2026, covering usage from the day of activation. Thank you for choosing Vi postpaid. |

## decline_gets_sms

Session `8c8c7245-f628-40ad-96ab-b05a4b42e45b`. Tools: a07_get_upgrade_lead, a06_compliance_gate, a15_get_upgrade_offer, a08_send_sms, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9840000001 campaign=UPGRADE_PREPAID_TO_POSTPAID | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Aditi? |
| yes | Thanks, Aditi. You're on ₹479 Unlimited 56 days (MOCK) and spend about ₹640 a month. On postpaid, Vi Max 501 is ₹501 per month with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. You keep the same SIM and the same number. Would you like to switch? |
| no, not now | No problem. I've sent the details of Vi Max 501 to you by SMS in case you'd like to switch later. Thank you for your time. |

## pilot_circle_excluded_no_call

Session `a4ad06a9-f9c8-469e-aebd-fb95fe258fb4`. Tools: a07_get_upgrade_lead, a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9840000002 campaign=UPGRADE_PREPAID_TO_POSTPAID |  |

## credit_check_not_passed

Session `cedecfc7-3728-4e83-8c8e-ebd34f3f966d`. Tools: a07_get_upgrade_lead, a06_compliance_gate, a15_get_upgrade_offer, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9840000003 campaign=UPGRADE_PREPAID_TO_POSTPAID | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Ritu? |
| yes | Thanks, Ritu. Right now I'm not able to offer a postpaid plan on this number, so there's nothing for you to do. Thank you for your time and for being with Vi. |

## wrong_party

Session `b9c5776a-6873-4208-a92a-c227558093f2`. Tools: a07_get_upgrade_lead, a06_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9840000001 campaign=UPGRADE_PREPAID_TO_POSTPAID | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Aditi? |
| no, wrong number | Sorry for the trouble. Thank you for your time. Goodbye. |

## wants_human_hot_transfer

Session `1bc4af26-1cd3-4d99-acb8-2ad0d6265f76`. Tools: a07_get_upgrade_lead, a06_compliance_gate, a15_get_upgrade_offer, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9840000001 campaign=UPGRADE_PREPAID_TO_POSTPAID | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Aditi? |
| yes | Thanks, Aditi. You're on ₹479 Unlimited 56 days (MOCK) and spend about ₹640 a month. On postpaid, Vi Max 501 is ₹501 per month with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. You keep the same SIM and the same number. Would you like to switch? |
| can I talk to an advisor about this? | I'm connecting you to a Vi postpaid advisor now, who will have the details of this call. Please stay on the line. |
