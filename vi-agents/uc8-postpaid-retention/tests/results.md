# Test results: Vi UC8 Postpaid Retention

18/18 scenarios passed. Run 2026-10-28 00:53 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| E9_in_collections_suppressed_pre_dial | PASS | COMPLIANCE_STOP | complete | 293 ms |  |
| open_nodal_complaint_not_called | PASS | COMPLIANCE_STOP | complete | 282 ms |  |
| cooldown_not_called | PASS | COMPLIANCE_STOP | complete | 304 ms |  |
| E1_network_ticket_eta_read_no_offer | PASS | RETAINED_SERVICE_FIX | complete | 301 ms |  |
| E2_bill_shock_roaming_drivers_verbatim_fit_before_offer | PASS | RETAINED_PLAN_FIT | complete | 404 ms |  |
| E3_E4_over_plan_cheaper_fit_readback_yes_otp_ref | PASS | RETAINED_PLAN_FIT | complete | 426 ms |  |
| E5_just_tell_me_how_to_port_no_obstruction | PASS | PORT_INFO_GIVEN | complete | 343 ms |  |
| RT04_port_one_question_one_offer_then_stop | PASS | PORT_INFO_GIVEN | complete | 593 ms |  |
| E7_declines_offer_twice_stops_offering | PASS | DECLINED_NO_ACTION | complete | 424 ms |  |
| E12_barge_in_offer_terms_reread_then_consent_otp | PASS | RETAINED_OFFER_R2 | complete | 512 ms |  |
| E8_verification_fails_twice_no_account_data | PASS | VERIFY_FAIL | complete | 351 ms |  |
| E10_vulnerability_cue_callback | PASS | CALLBACK_BOOKED | complete | 291 ms |  |
| E13_hindi_then_english_follows_customer | PASS | HAPPY_NO_RISK | complete | 272 ms |  |
| E14_competitor_question_no_disparagement | PASS | HAPPY_NO_RISK | complete | 305 ms |  |
| driving_callback_and_end | PASS | CALLBACK_BOOKED | complete | 253 ms |  |
| stop_calling_opt_out | PASS | DND_OPT_OUT | complete | 399 ms |  |
| E6_demands_beyond_r2_warm_transfer_r3 | PASS | TRANSFERRED_RETENTION_DESK | escalate | 417 ms |  |
| E11_plan_change_api_fails_twice_not_told_done | PASS | TECH_FAIL | escalate | 530 ms |  |

## E9_in_collections_suppressed_pre_dial

Session `0a4c2967-f50f-43fc-a18c-575f6635422d`. Tools: a06_u8_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000006 direction=outbound trigger=T1 |  |

## open_nodal_complaint_not_called

Session `cc5a59a3-cc56-4341-9dcf-2083f2f67806`. Tools: a06_u8_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000007 direction=outbound trigger=T3 |  |

## cooldown_not_called

Session `7d390029-6e82-4737-bc5e-c4b2a368530e`. Tools: a06_u8_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000010 direction=outbound trigger=T1 |  |

## E1_network_ticket_eta_read_no_offer

Session `88ed2c58-a0c6-4120-b4d4-c1f28718eb8d`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000001 direction=outbound trigger=T3 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Ananya? |
| yes speaking | Thanks. To protect your account, can you confirm your billing cycle date? |
| the 5th | Thanks for confirming, Ananya. I can see you've raised a couple of network issues recently, and I'm calling to make sure they're sorted. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| my data is really slow at home | I'm sorry about that. I can see your request TKT-90011 for slow data at home in Indiranagar. Right now an engineer is assigned and a tower upgrade is in progress, and our team's current estimate is 31 October 2026. Does that help, or is there anything else about your plan or bill? |
| ok that's fine | Thank you, Ananya. Your request stays open with our team until it's fixed. |

## E2_bill_shock_roaming_drivers_verbatim_fit_before_offer

Session `ab95cc22-1bd3-425d-8c3f-fe6fe6fb5cd9`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, rt02_billing_explain, rt02_plan_fit, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000002 direction=outbound trigger=T2 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Rajesh? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 12th | Thanks for confirming, Rajesh. I noticed your last bill was higher than usual, and I wanted to make sure it makes sense to you. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| my last bill was huge because of the roaming charges | Your last bill was ₹4,862. The main items were international roaming in the UAE, ₹3,450; your Vi Max 701 rental, ₹701; and a ₹299 data add-on. Next time you travel, a fixed-price roaming pack would cover this: for the UAE, 7 days with 5 GB data, 150 minutes of calls and 100 SMS is ₹2,999. Based on your last three months, your Vi Max 701 plan fits your usage. Does that make sense of the bill? |
| ok that makes sense, thanks | Thank you, Rajesh. |

## E3_E4_over_plan_cheaper_fit_readback_yes_otp_ref

Session `0eb1e45b-1fcd-4956-be65-8ed9cfa3ae8a`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, rt02_plan_fit, rt02_plan_quote, a08_record_consent, a04_send_otp, a04_verify_otp, a08_u8_plan_change, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000003 direction=outbound trigger=T5 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Meena? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| the 20th | Thanks for confirming, Meena. I noticed you've been using less of your plan lately, and I wanted to check it still fits you. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| I barely use my data, I'm paying for things I don't use | You've been using about 28 GB of data a month. Based on your last three months, Vi Max 401 would cover your usage at ₹401 a month, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. That's ₹700 less than your current plan. Would you like to switch? |
| yes switch | To confirm: I'll change your plan from Vi Max 1101 to Vi Max 401 at ₹401 a month plus taxes, from 20th November 2026. Do you agree? |
| yes I agree | I've sent a code to your Vi number. Please read it to me. |
| 123456 | That's done. Your reference number is PCH-05WCLEP. You'll also get an SMS. Thank you, Meena. Your plan changes to Vi Max 401 from 20th November 2026. |

## E5_just_tell_me_how_to_port_no_obstruction

Session `55863790-e9ae-45af-bbbb-c8b0ac117baa`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt04_mnp_script, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000004 direction=outbound trigger=T7 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Sameer? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 8th | Thanks for confirming, Sameer. I wanted to check in on your Vi postpaid service, and help with anything you need, including porting if you've decided to move. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| just tell me how to port | I understand, and it's completely your choice. To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll get a Unique Porting Code by SMS. Share that code with your new operator, and they'll complete the move, usually within 3 working days. Your Vi service keeps working until then. Before you go, is there anything Vi could fix for you? |
| no, I've made up my mind | Understood. Thank you, Sameer. Those steps will also come to you by SMS. |

## RT04_port_one_question_one_offer_then_stop

Session `8d775d5c-1a3a-4a63-bfb5-56ffb3970cd8`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt04_mnp_script, rt03_offer_eligible, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000004 direction=outbound trigger=T7 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Sameer? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 8th | Thanks for confirming, Sameer. I wanted to check in on your Vi postpaid service, and help with anything you need, including porting if you've decided to move. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| I want to port to another operator | I understand, and it's completely your choice. To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll get a Unique Porting Code by SMS. Share that code with your new operator, and they'll complete the move, usually within 3 working days. Your Vi service keeps working until then. Before you go, is there anything Vi could fix for you? |
| well the price is too high | Thanks for telling me. One thing I can offer: 15% off your rental: 15% off your monthly rental, shown as a discount on each bill, with no change to your plan benefits. It applies for your next 3 bill cycles. Would you like that, or would you prefer to go ahead with the port? |
| no thanks | Understood. Thank you, Sameer. Those steps will also come to you by SMS. |

## E7_declines_offer_twice_stops_offering

Session `9427034d-aea2-48e2-a2e6-fd19743e26c8`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, rt02_plan_fit, rt03_offer_eligible, rt03_record_response, rt03_record_response, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000005 direction=outbound trigger=T1 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Divya? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 15th | Thanks for confirming, Divya. I'm calling to check how things are going with your Vi postpaid service. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| it's too expensive for what I get | 15% off your rental: 15% off your monthly rental, shown as a discount on each bill, with no change to your plan benefits. It applies for your next 3 bill cycles. Would you like me to add that? |
| no thanks | One alternative I can offer: 20 GB bonus data: 20 GB of extra data added to your account at no charge, on top of your plan data. It applies for your next 3 bill cycles. Would you like me to add that? |
| no | Understood, I won't make any more offers. Thank you for your time, Divya. |

## E12_barge_in_offer_terms_reread_then_consent_otp

Session `0a627828-df20-4693-8fa7-257563aa813d`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, rt02_plan_fit, rt03_offer_eligible, rt03_offer_faq, a08_record_consent, a04_send_otp, a04_verify_otp, a08_u8_offer_apply, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000005 direction=outbound trigger=T1 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Divya? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 15th | Thanks for confirming, Divya. I'm calling to check how things are going with your Vi postpaid service. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| it's too expensive for what I get | 15% off your rental: 15% off your monthly rental, shown as a discount on each bill, with no change to your plan benefits. It applies for your next 3 bill cycles. Would you like me to add that? |
| wait, what happens after that? | After your next 3 bill cycles, your bill goes back to your plan's normal rental, with no action needed from you. To read the terms in full again: 15% off your rental: 15% off your monthly rental, shown as a discount on each bill, with no change to your plan benefits. It applies for your next 3 bill cycles. Would you like me to add that? |
| yes | To confirm: I'll add 15% off your rental to your account: 15% off your monthly rental, shown as a discount on each bill, with no change to your plan benefits, for your next 3 bill cycles. Do you agree? |
| yes I agree | I've sent a code to your Vi number. Please read it to me. |
| 123456 | That's done. Your reference number is OFR-0861CB6. You'll also get an SMS. Thank you, Divya. 15% off your rental applies for your next 3 bill cycles. |

## E8_verification_fails_twice_no_account_data

Session `34caaf49-850f-406b-bbe5-3cabbd0a791f`. Tools: a06_u8_gate, a04_u8_verify_factor, a04_send_otp, a04_verify_otp, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000003 direction=outbound trigger=T5 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Meena? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| the 3rd | That doesn't match our records. I've sent a code to your Vi number. Please read it to me. |
| 111111 | I'm sorry, I can't discuss this account on this call. You can reach Vi on 199 from your Vi number. Goodbye. |

## E10_vulnerability_cue_callback

Session `1211dc42-65df-4159-8b30-d32a365cd2cf`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, a07_u8_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000009 direction=outbound trigger=T6 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Shalini? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 25th | Thanks for confirming, Shalini. One of your plan benefits ends in the next few days, and I wanted to check everything's working for you. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| my father passed away last week, I can't deal with this now | I'm so sorry to hear that. I won't take more of your time now. Would you like a colleague to help you, or shall I call back another time? |
| call me another time | Of course. I'll call back Saturday between 11 am and 12 pm. Take care, Shalini. |

## E13_hindi_then_english_follows_customer

Session `55a2807f-f3c9-4674-a026-52cc24f9cc43`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000009 direction=outbound trigger=T6 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Shalini? |
| haan ji | Dhanyavaad. Aapke account ki suraksha ke liye, kya aap apni billing cycle ki tareekh bata sakte hain? |
| 25th | Dhanyavaad, Shalini ji. Main yeh jaanne ke liye call kar rahi hoon ki aapki Vi postpaid service kaisi chal rahi hai. Agar aap yeh calls nahi chahte, toh bata dijiye. Aapka anubhav kaisa raha hai? |
| everything is fine, no issues at all | Glad to hear it's working well for you. Thank you, Shalini. |

## E14_competitor_question_no_disparagement

Session `fa80d350-72e6-47d8-b6d3-0f06063bc83a`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000009 direction=outbound trigger=T6 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Shalini? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 25th | Thanks for confirming, Shalini. One of your plan benefits ends in the next few days, and I wanted to check everything's working for you. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| is Jio better than Vi? | I can't comment on other operators. I'm happy to help you get the most from Vi. Is there anything about your service I can help with? |
| no, all good | Glad to hear it's working well for you. Thank you, Shalini. |

## driving_callback_and_end

Session `39c22468-d708-4039-a92b-ff30f187b808`. Tools: a06_u8_gate, a07_u8_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000001 direction=outbound trigger=T3 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Ananya? |
| sorry, I'm driving | No problem, I'll call you back this evening between 6 and 7 pm. Take care. Goodbye. |

## stop_calling_opt_out

Session `091eea1b-c331-45f2-8fc6-c10e01ebc71d`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, a06_record_opt_out, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000001 direction=outbound trigger=T3 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Ananya? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| the 5th | Thanks for confirming, Ananya. I can see you've raised a couple of network issues recently, and I'm calling to make sure they're sorted. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| stop calling me | Understood. We'll stop these calls, and I've recorded your preference. Goodbye. |

## E6_demands_beyond_r2_warm_transfer_r3

Session `4c4e0c7f-94a1-4d58-85a2-3fb50f4938eb`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, rt02_plan_fit, rt03_offer_eligible, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000005 direction=outbound trigger=T1 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Divya? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 15th | Thanks for confirming, Divya. I'm calling to check how things are going with your Vi postpaid service. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| it's too expensive for what I get | 15% off your rental: 15% off your monthly rental, shown as a discount on each bill, with no change to your plan benefits. It applies for your next 3 bill cycles. Would you like me to add that? |
| that's not enough, I want a 50% discount | That's beyond what I can offer on this call, and I can't promise it. A retention colleague can review it with you. |

## E11_plan_change_api_fails_twice_not_told_done

Session `a0e4cbb5-ad5c-445d-bc04-982ff8537b6a`. Tools: a06_u8_gate, a04_u8_verify_factor, a03_u8_account_context, rt01_classify_cause, rt02_plan_fit, rt02_plan_quote, a08_record_consent, a04_send_otp, a04_verify_otp, a08_u8_plan_change, a08_u8_plan_change, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9900000008 direction=outbound trigger=T5 | Hello, this is Vi's AI assistant. This call may be recorded for quality and training. Am I speaking with Arun? |
| yes | Thanks. To protect your account, can you confirm your billing cycle date? |
| 3rd | Thanks for confirming, Arun. I noticed you've been using less of your plan lately, and I wanted to check it still fits you. If you'd rather not receive these calls, tell me and we'll stop. How has your Vi postpaid service been for you? |
| I don't use much of my data | You've been using about 35 GB of data a month. Based on your last three months, Vi Max 401 would cover your usage at ₹401 a month, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. That's ₹300 less than your current plan. Would you like to switch? |
| yes | To confirm: I'll change your plan from Vi Max 701 to Vi Max 401 at ₹401 a month plus taxes, from 3rd November 2026. Do you agree? |
| yes I agree | I've sent a code to your Vi number. Please read it to me. |
| 123456 | I'm sorry, our system couldn't complete that change, so nothing has been changed on your account. |
