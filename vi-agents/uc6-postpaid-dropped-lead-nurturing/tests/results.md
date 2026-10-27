# Test results: Vi UC6 Postpaid Dropped-Lead Nurturing

14/19 scenarios passed. Run 2026-10-27 19:11 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| dnd_lead_no_call | PASS | COMPLIANCE_STOP | complete | 278 ms |  |
| lead_older_than_7_days_no_call | PASS | COMPLIANCE_STOP | complete | 319 ms |  |
| attempt_cap_exhausted_no_call | PASS | NO_CONTACT_EXHAUSTED | complete | 585 ms |  |
| E1_j1_plan_confusion_link_sent | FAIL | DECLINED_OTHER | complete | 302 ms | tool dl03_resume_link not called; disposition DECLINED_OTHER != CONVERTED_LINK_SENT; never said: I've sent a link to your number ending 0001. It's valid for 48 hours |
| E2_wrong_person_no_journey_detail | PASS | WRONG_PARTY | complete | 438 ms |  |
| E3_refuses_aadhaar_by_voice_offers_link | FAIL | TECH_FAIL | escalate | 312 ms | tool dl03_resume_link not called; disposition TECH_FAIL != CONVERTED_LINK_SENT; exit escalate != complete |
| E5_pincode_not_serviceable | PASS | NOT_SERVICEABLE | complete | 590 ms |  |
| E6_upc_expired_steps_verbatim_callback | PASS | CALLBACK_BOOKED | complete | 285 ms |  |
| E7_hindi_to_english_code_switch | FAIL | DECLINED_OTHER | complete | 257 ms | disposition DECLINED_OTHER != CONVERTED_LINK_SENT |
| E8_stop_calling_dnd_written | PASS | DND_OPT_OUT | complete | 378 ms |  |
| E9_driving_callback_and_end | PASS | CALLBACK_BOOKED | complete | 280 ms |  |
| E11_barge_in_answers_then_rereads_in_full | PASS | CONVERTED_LINK_SENT | complete | 350 ms |  |
| j5_missed_visit_slot_rebooked | PASS | SLOT_REBOOKED | complete | 300 ms |  |
| j3_family_approval_callback | PASS | CALLBACK_BOOKED | complete | 284 ms |  |
| payment_failed_link_to_payment_step | FAIL | TECH_FAIL | escalate | 301 ms | tool dl03_resume_link not called; disposition TECH_FAIL != CONVERTED_LINK_SENT; exit escalate != complete |
| E4_discount_demand_ms05_transfer | PASS | TRANSFERRED_SALES | escalate | 356 ms |  |
| E10_catalogue_fails_twice_system_fail | PASS | TECH_FAIL | escalate | 565 ms |  |
| E12_abusive_two_turns_handoff | FAIL | - | prompt | 338 ms | tool a02_sentiment_event not called; tool a09_create_handoff not called; disposition None != TRANSFERRED_SALES; exit prompt != escalate; never said: I can hear this has been frustrating |
| j4_assisted_lead_ready_to_buy_hot_transfer | PASS | TRANSFERRED_SALES | escalate | 428 ms |  |

## dnd_lead_no_call

Session `8b35e87c-917d-49de-b12f-26956cb3e626`. Tools: a06_u6_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000006 direction=outbound campaign=UC6_PILOT |  |

## lead_older_than_7_days_no_call

Session `c30b2b54-922d-4c57-af0e-8bf20c34da99`. Tools: a06_u6_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000007 direction=outbound campaign=UC6_PILOT |  |

## attempt_cap_exhausted_no_call

Session `652b8deb-0b80-4555-b304-d7cb0f514161`. Tools: a06_u6_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000012 direction=outbound campaign=UC6_PILOT |  |

## E1_j1_plan_confusion_link_sent

Session `71a0fab8-8e7a-4a27-9c89-9315e65c6f00`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl02_plan_faq, a06_u6_suppress_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes speaking | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| I wasn't sure which plan to pick | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| just me, one line, I use maybe 40 GB a month | Vi Max 401 is ₹401 a month plus taxes, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. There's no security deposit on this plan. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| the first one | I don't have that detail on this call, and a colleague can confirm it for you. To give you the full details again: Vi Max 401 is ₹401 a month plus taxes, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. There's no security deposit on this plan. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| no that's all | No problem, thank you for letting me know. We won't call you about this again. Thanks for your time, Rohan. |

## E2_wrong_person_no_journey_detail

Session `45cd5ea4-e819-45b6-9b8d-6dcf0e014f2e`. Tools: a06_u6_gate, a06_u6_suppress_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| no, wrong number | Sorry for the trouble. We won't call this number about this again. |

## E3_refuses_aadhaar_by_voice_offers_link

Session `c08ace02-f037-49b7-910e-49e9c597d5a6`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000005 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Karan? |
| yes | Thanks, Karan. You'd reached the eKYC step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| the KYC step failed | eKYC is done only in the secure Vi link: you confirm with an Aadhaar OTP on your own phone, and I won't ask for any ID numbers. Shall I send you a link that opens the KYC step with your details filled in? |
| can you just take my aadhaar number on the phone instead | Please don't share any ID numbers on this call; I can't take Aadhaar, PAN or card details by voice. KYC happens only in the secure Vi link. Shall I send you the link? |
| ok send it | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |
| no | [HUMAN AGENT] Message received: no
Reason: UC6 postpaid sales hot transfer |

## E5_pincode_not_serviceable

Session `c428cc80-0968-4050-81c4-e3b00c5e4404`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_coverage_check, a06_u6_suppress_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000002 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Nisha? |
| yes | Thanks, Nisha. You'd reached the delivery address step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| it said my address is not covered | I'm sorry, Vi postpaid isn't available at your address yet, so I can't take this forward today. Thanks for your time, Nisha. |

## E6_upc_expired_steps_verbatim_callback

Session `3b6ed4d1-a872-4eaa-af3d-5e1e10c13dd9`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_mnp_steps, a07_u6_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000003 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Arvind? |
| yes | Thanks, Arvind. You'd reached the porting code step of your port-in to Vi postpaid. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| my porting code expired before I could finish | Your earlier porting code has expired, so you'll need a new one. To get your porting code, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900 from the number you want to bring to Vi. You'll get a Unique Porting Code by SMS, valid for 4 days. Enter it in the Vi link to finish your port-in. When would be a good time for me to call you back once you have the new code? |
| in a few days, once I have the new code | Done. I'll call you back Friday between 6 and 7 pm. Thanks for your time, Arvind. |

## E7_hindi_to_english_code_switch

Session `885192c2-426c-4baf-89f2-bc29812e39d3`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl02_plan_faq, a06_u6_suppress_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| haan ji, main bol raha hoon | Dhanyavaad, Rohan ji. Aapka new Vi postpaid connection the plan selection step par ruk gaya tha. Agar aap yeh calls nahi chahte, toh bas bata dijiye. Aapko aage badhne se kya roka? |
| sorry, can we speak in English? I wasn't sure which plan to choose | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| one line, about 40 GB | Vi Max 401 is ₹401 a month plus taxes, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. There's no security deposit on this plan. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| the first one | I don't have that detail on this call, and a colleague can confirm it for you. To give you the full details again: Vi Max 401 is ₹401 a month plus taxes, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. There's no security deposit on this plan. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| no | No problem, thank you for letting me know. We won't call you about this again. Thanks for your time, Rohan. |

## E8_stop_calling_dnd_written

Session `4db439d4-195a-4d57-b9be-4a91662de3dd`. Tools: a06_u6_gate, a03_u6_lead_context, a06_record_opt_out, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| stop calling me | Understood. We'll stop these calls, and I've recorded your preference. Goodbye. |

## E9_driving_callback_and_end

Session `01b0310a-92e7-480b-b951-833f20a06e1d`. Tools: a06_u6_gate, a07_u6_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| sorry I'm driving right now | No problem, I'll call you back this evening between 6 and 7 pm. Take care. Goodbye. |

## E11_barge_in_answers_then_rereads_in_full

Session `4e8ee7bf-3e18-4f63-9059-9f7b177cbf07`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl02_plan_faq, dl03_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| I was confused between the plans | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| one line, unlimited data, I watch a lot of Netflix | Vi Max 701 is ₹701 a month plus taxes, with unlimited calls, unlimited data, 3,000 SMS, and Amazon Prime and Disney+ Hotstar subscriptions. There's a refundable security deposit of ₹500, which is waived if you set up autopay. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| wait, is there a deposit? | There's a refundable security deposit of ₹500, which is waived if you set up autopay. To give you the full details again: Vi Max 701 is ₹701 a month plus taxes, with unlimited calls, unlimited data, 3,000 SMS, and Amazon Prime and Disney+ Hotstar subscriptions. There's a refundable security deposit of ₹500, which is waived if you set up autopay. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| the first one | I've sent a link to your number ending 0001. It's valid for 48 hours, and it opens your new Vi postpaid connection with your details already filled in. Is there anything else I can help with? |
| no | Thanks for your time, Rohan. |

## j5_missed_visit_slot_rebooked

Session `e1d19866-7c0b-47bc-afa5-1fa38e1e40c5`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_slot_options, dl03_slot_rebook, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000004 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Pooja? |
| yes | Thanks, Pooja. You'd reached the doorstep KYC visit of your Vi postpaid doorstep KYC visit. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| the executive never came for the visit | I'm sorry the visit was missed. I can book Wednesday 29 October, 10 am to 12 pm, or Thursday 30 October, 4 to 6 pm. Which suits you? |
| the second one please | Your visit is booked for Thursday 30 October, 4 to 6 pm. You'll get an SMS confirmation with the reference VIS-0I17LZ1. Thanks for your time, Pooja. |

## j3_family_approval_callback

Session `c7ec79c2-49a2-41bb-bfff-719fc5207e84`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, a07_u6_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000008 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Tanvi? |
| yes | Thanks, Tanvi. You'd reached the primary member approval step of your Vi postpaid family add-on. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| I need to ask my husband first | Of course. When would be a good time for me to call you back? |
| tomorrow evening | Done. I'll call you back tomorrow between 6 and 7 pm. Thanks for your time, Tanvi. |

## payment_failed_link_to_payment_step

Session `47a5f38a-02ca-4816-a85f-475c047fdf96`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000011 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Naveen? |
| yes | Thanks, Naveen. You'd reached the first payment step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| the payment failed on my card | Sorry the payment didn't go through. I can't take card details on the call, but I can send a link that opens the payment step directly. Shall I send it? |
| yes send it | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |
| no | [HUMAN AGENT] Message received: no
Reason: UC6 postpaid sales hot transfer |

## E4_discount_demand_ms05_transfer

Session `60064349-a2d4-49f5-ab18-1450a205c571`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| it was too expensive | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| one line, unlimited data | Vi Max 701 is ₹701 a month plus taxes, with unlimited calls, unlimited data, 3,000 SMS, and Amazon Prime and Disney+ Hotstar subscriptions. There's a refundable security deposit of ₹500, which is waived if you set up autopay. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| I'll only take it if you give me a 50% discount | That isn't something I can offer on this call. I can connect you to a colleague. Would you like that? |
| yes please | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |

## E10_catalogue_fails_twice_system_fail

Session `9d7f096f-7052-4dba-8613-0448821970f2`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl02_plan_search, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000010 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Gita? |
| yes | Thanks, Gita. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| I was confused about which plan to take | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| one line, 50 GB | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |

## E12_abusive_two_turns_handoff

Session `b7549991-e0b6-4b7a-bc08-26c590e90936`. Tools: a06_u6_gate, a03_u6_lead_context.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| this is useless nonsense | I apologize, but I encountered an error. Please try again. |
| you are stupid | I apologize, but I encountered an error. Please try again. |

## j4_assisted_lead_ready_to_buy_hot_transfer

Session `ab815f11-f1e6-42a9-9e9b-85b11f74fad3`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000009 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Farhan? |
| yes | Thanks, Farhan. You'd reached the follow-up after your store visit of your Vi postpaid enquiry from the store. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| nobody followed up after the store visit, I want to buy it now | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |
