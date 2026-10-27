# Test results: Vi UC5 International Roaming

3/3 scenarios passed. Run 2026-10-27 11:07 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| outbound_activate_happy_path | PASS | IR_ACTIVATED | complete | 561 ms |  |
| corporate_plan_to_ir_desk | PASS | HANDOFF_CORPORATE_PLAN | escalate | 405 ms |  |
| otp_fails_three_times_to_ir_desk | PASS | HANDOFF_OTP_FAILED | escalate | 413 ms |  |

## outbound_activate_happy_path

Session `870144d2-0f4d-4ff1-ab8f-e6e20711d4fc`. Tools: a06_compliance_gate, a03_get_ir_context, a18_rank_ir_packs, a08_record_consent, a04_send_otp, a04_verify_otp, a08_activate_ir_pack, a11_arm_usage_alerts, a08_send_sms, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9800000001 direction=outbound campaign=IR_TRAVEL_OPTIN | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Rahul? |
| Yes speaking | Thanks, Rahul. I see you're travelling to United Arab Emirates from 2026-11-03 for 7 days. Is that right? |
| yes | Will you mostly use WhatsApp and maps, or also video calls and streaming? |
| mostly whatsapp and maps | The best fit for your trip is pack IR-GCC-7 at ₹2,999. It includes 5 GB data, 150 minutes of calls and 100 SMS, valid for 7 days from activation. After that, ₹5 per MB after the pack data is used. Would you like me to activate it? |
| yes please | To confirm: activate pack IR-GCC-7 for ₹2,999, with 5 GB data, 150 minutes of calls and 100 SMS, valid for 7 days from activation. After that, ₹5 per MB after the pack data is used. The charge will appear on your postpaid bill. Do you agree? |
| yes I agree | I've sent a six-digit OTP to your Vi number. Please read it out. |
| 1 2 3 4 5 6 | Done. Pack IR-GCC-7 is now active on your number, order reference IRO-05KLUL2. I've sent you an SMS with the tariff and travel tips, and you'll get alerts at 50, 80 and 100 percent of your data. Is there anything else I can help you with? |
| no thanks | Thank you for choosing Vi. Have a safe trip! |

## corporate_plan_to_ir_desk

Session `c3f966a3-56d3-463d-82b0-4d4a1a215c06`. Tools: a06_compliance_gate, a03_get_ir_context, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9800000004 direction=outbound campaign=IR_TRAVEL_OPTIN | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Priya? |
| yes | I'm connecting you to our international roaming specialist, who will have the details of this call. Please stay on the line. |

## otp_fails_three_times_to_ir_desk

Session `0e99bc32-b6b1-444c-b6c4-68559577159d`. Tools: a06_compliance_gate, a03_get_ir_context, a18_rank_ir_packs, a08_record_consent, a04_send_otp, a04_verify_otp, a04_verify_otp, a04_verify_otp, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9800000001 direction=outbound campaign=IR_TRAVEL_OPTIN | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Rahul? |
| yes | Thanks, Rahul. I see you're travelling to United Arab Emirates from 2026-11-03 for 7 days. Is that right? |
| yes | Will you mostly use WhatsApp and maps, or also video calls and streaming? |
| whatsapp | The best fit for your trip is pack IR-GCC-7 at ₹2,999. It includes 5 GB data, 150 minutes of calls and 100 SMS, valid for 7 days from activation. After that, ₹5 per MB after the pack data is used. Would you like me to activate it? |
| yes | To confirm: activate pack IR-GCC-7 for ₹2,999, with 5 GB data, 150 minutes of calls and 100 SMS, valid for 7 days from activation. After that, ₹5 per MB after the pack data is used. The charge will appear on your postpaid bill. Do you agree? |
| yes | I've sent a six-digit OTP to your Vi number. Please read it out. |
| 111111 | That OTP didn't match. Please read out the six digits again. |
| 222222 | That OTP didn't match. Please read out the six digits again. |
| 333333 | I'm connecting you to our international roaming specialist, who will have the details of this call. Please stay on the line. |
