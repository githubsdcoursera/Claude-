# Test results: Vi UC1 Prepaid Inbound Care Voice

10/11 scenarios passed. Run 2026-10-27 13:31 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| balance_then_csat | PASS | RESOLVED | complete | 330 ms |  |
| vas_deactivation_with_consent_and_otp | PASS | RESOLVED | complete | 504 ms |  |
| unexpected_deduction_explained | PASS | RESOLVED | complete | 289 ms |  |
| recharge_link_sent | PASS | RESOLVED | complete | 296 ms |  |
| data_addon_insufficient_balance_offers_link | FAIL | - | complete | 725 ms | disposition None != RESOLVED |
| network_complaint_logged | PASS | RESOLVED | complete | 332 ms |  |
| porting_knowledge_answer | PASS | RESOLVED | complete | 312 ms |  |
| multi_request_in_one_call | PASS | RESOLVED | complete | 579 ms |  |
| unclear_request_classified_and_confirmed | PASS | RESOLVED | complete | 289 ms |  |
| vulnerability_cue_warm_transfer | PASS | HANDOFF_VULNERABILITY | escalate | 323 ms |  |
| asks_for_human | PASS | HANDOFF_CUSTOMER_REQUEST | escalate | 332 ms |  |

## balance_then_csat

Session `d6269e67-c855-492e-b250-80830319a80b`. Tools: a03_get_customer_360, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| what is my balance and validity? | Your main balance is ₹12.50, and your ₹299 Unlimited 28 days (MOCK) plan is valid until 4 November 2026. You have 0.4 GB of today's 1.5 GB left. Is there anything else I can help you with? |
| no that's all | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 5 | Thank you for calling Vi. Have a good day. |

## vas_deactivation_with_consent_and_otp

Session `12246115-167c-4a9c-9277-435f089ed47a`. Tools: a03_get_customer_360, a14_list_vas, a10_kb_answer, a08_record_consent, a04_send_otp, a04_verify_otp, a14_deactivate_vas, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| please stop my caller tune subscription | You have two subscriptions: one, Hello Tunes at ₹49 per month, and two, Vi Movies and TV Pro at ₹99 per month. Which one would you like to stop? Say one or two. |
| two | To confirm: stop Vi Movies and TV Pro at ₹99 per month. Charges for a value-added service stop from the date it is deactivated. Charges already applied for the current period are not refunded. Do you agree? |
| yes I agree | I've sent a six-digit OTP to your Vi number. Please read it out. |
| 123456 | Done. Vi Movies and TV Pro has been stopped, reference VDX-1RCXRE2, effective immediately. Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 4 | Thank you for calling Vi. Have a good day. |

## unexpected_deduction_explained

Session `ac096ed8-30c1-4a09-b7fa-c7242cb79b3f`. Tools: a03_get_customer_360, a12_get_recent_charges, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| why was money deducted from my balance? | Your recent deductions were ₹49 for Hello Tunes on 2026-08-02, and ₹99 for Vi Movies and TV Pro on 2026-10-01. Would you like to stop any of these subscriptions? |
| no | Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 3 | Thank you for calling Vi. Have a good day. |

## recharge_link_sent

Session `95a23588-9005-4762-ac54-b89292bb9eaa`. Tools: a03_get_customer_360, a13_get_plans, a12_send_recharge_link, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| I want to recharge | The ₹299 plan gives you unlimited calls, 1.5 GB data per day and 100 SMS per day, valid for 28 days. Shall I send you a secure link to recharge with it? |
| yes send it | Done. I've sent a secure recharge link for the ₹299 plan to your number by SMS and WhatsApp. Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 5 | Thank you for calling Vi. Have a good day. |

## data_addon_insufficient_balance_offers_link

Session `963de389-3246-4230-b5a6-351bddbb396b`. Tools: a03_get_customer_360, a13_get_plans, a08_record_consent, a13_buy_data_pack, a11_record_csat.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000002 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Harish. How can I help you today? |
| my data is finished | You have 0 GB of today's 1.5 GB left. I can add 1 GB extra data valid for today for ₹19 from your main balance, or send you a link for the ₹349 plan with unlimited calls, 2 GB data per day and 100 SMS per day. Which would you like? |
| add the extra 1 GB | To confirm: add 1 GB extra data valid for today for ₹19, deducted from your main balance. Do you agree? |
| yes | Your main balance of ₹3.00 isn't enough for the ₹19 add-on, so nothing was charged. Shall I send you a secure link to recharge instead? |
| no | Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 5 | Thank you for calling Vi. Have a good day. |

## network_complaint_logged

Session `1498e3fa-6422-4a0b-ac3b-849f58f2672b`. Tools: a03_get_customer_360, a14_network_status, a14_raise_complaint, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000002 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Harish. How can I help you today? |
| there is no 4G signal at my home | I'm sorry about the network trouble. There is maintenance in Navrangpura, and it should be fixed by 6 pm today. Your complaint reference is TKT-90211, and we'll update you within 24 hours. Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 2 | Thank you for calling Vi. Have a good day. |

## porting_knowledge_answer

Session `0e2ff0fc-0317-4e4e-b204-0a301e6d7be2`. Tools: a03_get_customer_360, a10_kb_answer, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| how do I port my sim | Is this about a replacement SIM, or about porting your number to another operator? |
| porting to another operator | To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll receive a Unique Porting Code to give to your new operator. Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 5 | Thank you for calling Vi. Have a good day. |

## multi_request_in_one_call

Session `7509d6e6-bffd-4f3a-a824-0d1c7f5bc7b5`. Tools: a03_get_customer_360, a14_network_status, a14_raise_complaint, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| what's my balance | Your main balance is ₹12.50, and your ₹299 Unlimited 28 days (MOCK) plan is valid until 4 November 2026. You have 0.4 GB of today's 1.5 GB left. Is there anything else I can help you with? |
| yes, and is there a network problem in my area? | I'm sorry about the network trouble. Your complaint reference is TKT-0ON9CBE, and we'll update you within 48 hours. Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| 5 | Thank you for calling Vi. Have a good day. |

## unclear_request_classified_and_confirmed

Session `63782418-3be1-4cac-b225-7bb21981b25e`. Tools: a03_get_customer_360, a13_get_plans, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| my internet stopped working on my phone today | You have 0.4 GB of today's 1.5 GB left. I can add 1 GB extra data valid for today for ₹19 from your main balance, or send you a link for the ₹349 plan with unlimited calls, 2 GB data per day and 100 SMS per day. Which would you like? |
| yes | Is there anything else I can help you with? |
| no | Before you go, on a scale of 1 to 5, how satisfied are you with this call? |
| no | Thank you for calling Vi. Have a good day. |
| 5 | This conversation has been completed. |

## vulnerability_cue_warm_transfer

Session `06947539-b3ea-49c3-8968-09f944907eb0`. Tools: a03_get_customer_360, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| my father is in hospital and I need my number working, it's an emergency | I'm connecting you to a Vi care advisor, who will have the details of this call. Please stay on the line. |

## asks_for_human

Session `b4abbf7a-de8a-4e48-a157-3bb5410f9aad`. Tools: a03_get_customer_360, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9830000001 | Namaste, welcome to Vi. I'm Vi's virtual assistant, an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Thanks, Deepa. How can I help you today? |
| I want to talk to an agent | I'm connecting you to a Vi care advisor, who will have the details of this call. Please stay on the line. |
