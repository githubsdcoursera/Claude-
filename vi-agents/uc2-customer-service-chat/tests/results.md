# Test results: Vi UC2 Customer Service Chat

4/5 scenarios passed. Run 2026-10-27 20:42 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| app_logged_in_strong_auth_addon_no_otp | FAIL | - | complete | 296 ms | disposition None != RESOLVED |
| whatsapp_number_capture_and_otp_then_balance | PASS | RESOLVED | complete | 294 ms |  |
| web_vas_stop_requires_otp | PASS | RESOLVED | complete | 294 ms |  |
| recharge_link_in_chat | PASS | RESOLVED | complete | 307 ms |  |
| full_thread_handoff_to_live_chat | PASS | HANDOFF_CUSTOMER_REQUEST | escalate | 286 ms |  |

## app_logged_in_strong_auth_addon_no_otp

Session `83e5beba-c068-489c-b769-e42fc0569dbf`. Tools: a03_get_customer_360, a13_get_plans, a08_record_consent, a13_buy_data_pack, a11_record_csat.

| Caller | Agent |
|---|---|
| CHAT_START msisdn=9830000002 channel=vi_app | Hi, I'm Vi's virtual assistant, an AI. This chat is recorded for quality and training. Would you like to chat in English or Hindi? |
| English | Thanks, Harish. I can see your last contact with us: 2026-10-24 care: network complaint. How can I help you today? |
| I need more data | You have 0 GB of today's 1.5 GB left. I can add 1 GB extra data valid for today for ₹19 from your main balance, or send you a link for the ₹349 plan with unlimited calls, 2 GB data per day and 100 SMS per day. Which would you like? |
| add the extra 1 GB | To confirm: add 1 GB extra data valid for today for ₹19, deducted from your main balance. Do you agree? |
| yes | Your main balance of ₹3.00 isn't enough for the ₹19 add-on, so nothing was charged. Shall I send you a secure link to recharge instead? |
| no | Is there anything else I can help you with? |
| no | Before you go, how would you rate this chat from 1 to 5? |
| 5 | Thanks for chatting with Vi. Have a good day! |

## whatsapp_number_capture_and_otp_then_balance

Session `e405903a-8cd5-4307-9c87-f71ce0d1d3f3`. Tools: a04_send_otp, a04_verify_otp, a03_get_customer_360, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CHAT_START channel=whatsapp | Hi, I'm Vi's virtual assistant, an AI. This chat is recorded for quality and training. Would you like to chat in English or Hindi? |
| English | Please type your 10-digit Vi mobile number so I can help with your account. |
| my number is 9830000001 | I've sent a six-digit OTP to that number. Please type it here. |
| 123456 | Thanks, Deepa. I can see your last contact with us: 2026-10-20 IVR: balance check. How can I help you today? |
| balance | Your main balance is ₹12.50, and your ₹299 Unlimited 28 days (MOCK) plan is valid until 4 November 2026. You have 0.4 GB of today's 1.5 GB left. Is there anything else I can help you with? |
| no | Before you go, how would you rate this chat from 1 to 5? |
| 4 | Thanks for chatting with Vi. Have a good day! |

## web_vas_stop_requires_otp

Session `839991bc-77ec-4bba-8350-466dd6217d5b`. Tools: a03_get_customer_360, a14_list_vas, a10_kb_answer, a08_record_consent, a04_send_otp, a04_verify_otp, a14_deactivate_vas, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CHAT_START msisdn=9830000001 channel=web | Hi, I'm Vi's virtual assistant, an AI. This chat is recorded for quality and training. Would you like to chat in English or Hindi? |
| English | Thanks, Deepa. I can see your last contact with us: 2026-10-20 IVR: balance check. How can I help you today? |
| stop subscription | You have two subscriptions: one, Hello Tunes at ₹49 per month, and two, Vi Movies and TV Pro at ₹99 per month. Which one would you like to stop? Reply 1 or 2. |
| 1 | To confirm: stop Hello Tunes at ₹49 per month. Charges for a value-added service stop from the date it is deactivated. Charges already applied for the current period are not refunded. Do you agree? |
| yes | I've sent a six-digit OTP to your Vi number. Please type it here. |
| 123456 | Done. Hello Tunes has been stopped, reference VDX-1HBJ3KY, effective immediately. Is there anything else I can help you with? |
| no | Before you go, how would you rate this chat from 1 to 5? |
| 5 | Thanks for chatting with Vi. Have a good day! |

## recharge_link_in_chat

Session `c9c881fa-6d92-49a6-9c7d-3173ca80ba0b`. Tools: a03_get_customer_360, a13_get_plans, a12_send_recharge_link, a11_record_csat, a11_write_post_call.

| Caller | Agent |
|---|---|
| CHAT_START msisdn=9830000001 channel=vi_app | Hi, I'm Vi's virtual assistant, an AI. This chat is recorded for quality and training. Would you like to chat in English or Hindi? |
| English | Thanks, Deepa. I can see your last contact with us: 2026-10-20 IVR: balance check. How can I help you today? |
| recharge | The ₹299 plan gives you unlimited calls, 1.5 GB data per day and 100 SMS per day, valid for 28 days. Shall I send you a secure link to recharge with it? |
| yes | Done. Here's your secure recharge link for the ₹299 plan: PAY-0LU4TAT. I've also sent it by SMS. Is there anything else I can help you with? |
| no | Before you go, how would you rate this chat from 1 to 5? |
| 5 | Thanks for chatting with Vi. Have a good day! |

## full_thread_handoff_to_live_chat

Session `1928c57e-6e62-4474-8ba9-daf075e3070d`. Tools: a03_get_customer_360, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CHAT_START msisdn=9830000001 channel=whatsapp | Hi, I'm Vi's virtual assistant, an AI. This chat is recorded for quality and training. Would you like to chat in English or Hindi? |
| English | Thanks, Deepa. I can see your last contact with us: 2026-10-20 IVR: balance check. How can I help you today? |
| I want to talk to an agent | I'm connecting you to a Vi chat advisor now. They'll see this whole conversation, so you won't need to repeat anything. |
