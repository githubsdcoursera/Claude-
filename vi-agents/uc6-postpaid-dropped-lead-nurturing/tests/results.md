# Test results: Vi UC6 Postpaid Dropped-Lead Nurturing

19/19 scenarios passed. Run 2026-10-28 00:03 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| dnd_lead_no_call | PASS | COMPLIANCE_STOP | complete | 674 ms |  |
| lead_older_than_7_days_no_call | PASS | COMPLIANCE_STOP | complete | 520 ms |  |
| attempt_cap_exhausted_no_call | PASS | NO_CONTACT_EXHAUSTED | complete | 305 ms |  |
| E1_j1_plan_confusion_link_sent | PASS | CONVERTED_LINK_SENT | complete | 536 ms |  |
| E2_wrong_person_no_journey_detail | PASS | WRONG_PARTY | complete | 286 ms |  |
| E3_refuses_aadhaar_by_voice_offers_link | PASS | CONVERTED_LINK_SENT | complete | 218 ms |  |
| E5_pincode_not_serviceable | PASS | NOT_SERVICEABLE | complete | 534 ms |  |
| E6_upc_expired_steps_verbatim_callback | PASS | CALLBACK_BOOKED | complete | 295 ms |  |
| E7_hindi_to_english_code_switch | PASS | CONVERTED_LINK_SENT | complete | 263 ms |  |
| E8_stop_calling_dnd_written | PASS | DND_OPT_OUT | complete | 277 ms |  |
| E9_driving_callback_and_end | PASS | CALLBACK_BOOKED | complete | 297 ms |  |
| E11_barge_in_answers_then_rereads_in_full | PASS | CONVERTED_LINK_SENT | complete | 185 ms |  |
| j5_missed_visit_slot_rebooked | PASS | SLOT_REBOOKED | complete | 421 ms |  |
| j3_family_approval_callback | PASS | CALLBACK_BOOKED | complete | 353 ms |  |
| payment_failed_link_to_payment_step | PASS | CONVERTED_LINK_SENT | complete | 285 ms |  |
| E4_discount_demand_ms05_transfer | PASS | TRANSFERRED_SALES | escalate | 432 ms |  |
| E10_catalogue_fails_twice_system_fail | PASS | TECH_FAIL | escalate | 607 ms |  |
| E12_abusive_two_turns_handoff | PASS | TRANSFERRED_SALES | escalate | 421 ms |  |
| j4_assisted_lead_ready_to_buy_hot_transfer | PASS | TRANSFERRED_SALES | escalate | 422 ms |  |

## dnd_lead_no_call

Session `c621c7cd-af24-4188-bebc-cbab75996e7e`. Tools: a06_u6_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000006 direction=outbound campaign=UC6_PILOT |  |

## lead_older_than_7_days_no_call

Session `846d2e99-5542-4784-ad2f-388554227ec5`. Tools: a06_u6_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000007 direction=outbound campaign=UC6_PILOT |  |

## attempt_cap_exhausted_no_call

Session `9d30620e-c1a4-4afc-82c8-e1ec5601b890`. Tools: a06_u6_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000012 direction=outbound campaign=UC6_PILOT |  |

## E1_j1_plan_confusion_link_sent

Session `97c4b689-0d6e-423d-a56e-2527702c3d7f`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl03_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes speaking | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| I wasn't sure which plan to pick | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| just me, one line, I use maybe 40 GB a month | Vi Max 401 is ₹401 a month plus taxes, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. There's no security deposit on this plan. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| the first one | I've sent a link to your number ending 0001. It's valid for 48 hours, and it opens your new Vi postpaid connection with your details already filled in. Is there anything else I can help with? |
| no that's all | Thanks for your time, Rohan. |

## E2_wrong_person_no_journey_detail

Session `f4eeb5bf-c090-4383-a958-326de27e6271`. Tools: a06_u6_gate, a06_u6_suppress_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| no, wrong number | Sorry for the trouble. We won't call this number about this again. |

## E3_refuses_aadhaar_by_voice_offers_link

Session `bf865088-2258-4e88-9c0d-a998d6d9dec4`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000005 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Karan? |
| yes | Thanks, Karan. You'd reached the eKYC step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| the KYC step failed | eKYC is done only in the secure Vi link: you confirm with an Aadhaar OTP on your own phone, and I won't ask for any ID numbers. Shall I send you a link that opens the KYC step with your details filled in? |
| can you just take my aadhaar number on the phone instead | Please don't share any ID numbers on this call; I can't take Aadhaar, PAN or card details by voice. KYC happens only in the secure Vi link. Shall I send you the link? |
| ok send it | I've sent a link to your number ending 0005. It's valid for 48 hours, and it opens your new Vi postpaid connection with your details already filled in. Is there anything else I can help with? |
| no | Thanks for your time, Karan. |

## E5_pincode_not_serviceable

Session `69e5f5d2-f21e-44e7-9824-74d19563f3f2`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_coverage_check, a06_u6_suppress_lead, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000002 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Nisha? |
| yes | Thanks, Nisha. You'd reached the delivery address step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| it said my address is not covered | I'm sorry, Vi postpaid isn't available at your address yet, so I can't take this forward today. Thanks for your time, Nisha. |

## E6_upc_expired_steps_verbatim_callback

Session `ff030908-c6c2-419b-831a-e7a8a3567a17`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_mnp_steps, a07_u6_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000003 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Arvind? |
| yes | Thanks, Arvind. You'd reached the porting code step of your port-in to Vi postpaid. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| my porting code expired before I could finish | Your earlier porting code has expired, so you'll need a new one. To get your porting code, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900 from the number you want to bring to Vi. You'll get a Unique Porting Code by SMS, valid for 4 days. Enter it in the Vi link to finish your port-in. When would be a good time for me to call you back once you have the new code? |
| in a few days, once I have the new code | Done. I'll call you back Friday between 6 and 7 pm. Thanks for your time, Arvind. |

## E7_hindi_to_english_code_switch

Session `daebec0b-f01b-45b8-b20c-14bc58531472`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl03_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| haan ji, main bol raha hoon | Dhanyavaad, Rohan ji. Aapka new Vi postpaid connection the plan selection step par ruk gaya tha. Agar aap yeh calls nahi chahte, toh bas bata dijiye. Aapko aage badhne se kya roka? |
| sorry, can we speak in English? I wasn't sure which plan to choose | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| one line, about 40 GB | Vi Max 401 is ₹401 a month plus taxes, with unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS a month. There's no security deposit on this plan. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| the first one | I've sent a link to your number ending 0001. It's valid for 48 hours, and it opens your new Vi postpaid connection with your details already filled in. Is there anything else I can help with? |
| no | Thanks for your time, Rohan. |

## E8_stop_calling_dnd_written

Session `056709e0-1627-4803-a069-6e4a96387d55`. Tools: a06_u6_gate, a03_u6_lead_context, a06_record_opt_out, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| stop calling me | Understood. We'll stop these calls, and I've recorded your preference. Goodbye. |

## E9_driving_callback_and_end

Session `5ed99b2a-30c2-4cd4-b818-a24a5a07b595`. Tools: a06_u6_gate, a07_u6_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| sorry I'm driving right now | No problem, I'll call you back this evening between 6 and 7 pm. Take care. Goodbye. |

## E11_barge_in_answers_then_rereads_in_full

Session `726fbf87-3903-479e-b9a9-f91c8edc396a`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl02_plan_faq, dl03_resume_link, a11_write_post_call.

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

Session `5984c8f9-982f-4fc7-b4dd-3faeb51cee89`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_slot_options, dl03_slot_rebook, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000004 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Pooja? |
| yes | Thanks, Pooja. You'd reached the doorstep KYC visit of your Vi postpaid doorstep KYC visit. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| the executive never came for the visit | I'm sorry the visit was missed. I can book Wednesday 29 October, 10 am to 12 pm, or Thursday 30 October, 4 to 6 pm. Which suits you? |
| the second one please | Your visit is booked for Thursday 30 October, 4 to 6 pm. You'll get an SMS confirmation with the reference VIS-0I17LZ1. Thanks for your time, Pooja. |

## j3_family_approval_callback

Session `ba2e02cc-95cc-4114-8863-d70d8b96f312`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, a07_u6_book_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000008 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Tanvi? |
| yes | Thanks, Tanvi. You'd reached the primary member approval step of your Vi postpaid family add-on. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| I need to ask my husband first | Of course. When would be a good time for me to call you back? |
| tomorrow evening | Done. I'll call you back tomorrow between 6 and 7 pm. Thanks for your time, Tanvi. |

## payment_failed_link_to_payment_step

Session `1511a914-bdec-49d5-a98f-35d055a5ce89`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl03_resume_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000011 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Naveen? |
| yes | Thanks, Naveen. You'd reached the first payment step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| the payment failed on my card | Sorry the payment didn't go through. I can't take card details on the call, but I can send a link that opens the payment step directly. Shall I send it? |
| yes send it | I've sent a link to your number ending 0011. It's valid for 48 hours, and it opens your new Vi postpaid connection with your details already filled in. Is there anything else I can help with? |
| no | Thanks for your time, Naveen. |

## E4_discount_demand_ms05_transfer

Session `9dea5ca6-bd1f-4a94-8577-bb31a65f7fbd`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| it was too expensive | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| one line, unlimited data | Vi Max 701 is ₹701 a month plus taxes, with unlimited calls, unlimited data, 3,000 SMS, and Amazon Prime and Disney+ Hotstar subscriptions. There's a refundable security deposit of ₹500, which is waived if you set up autopay. Or Vi Max 501 is ₹501 a month plus taxes, with unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV. There's no security deposit on this plan. Which would you like? |
| I'll only take it if you give me a 50% discount | That isn't something I can offer on this call. I can connect you to a colleague. Would you like that? |
| yes please | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |

## E10_catalogue_fails_twice_system_fail

Session `c9d5a357-5b88-415c-a468-5f8c70c4f84d`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, dl02_plan_search, dl02_plan_search, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000010 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Gita? |
| yes | Thanks, Gita. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| I was confused about which plan to take | I can help you pick the right one. How many lines do you need, and roughly how much data do you use in a month? |
| one line, 50 GB | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |

## E12_abusive_two_turns_handoff

Session `9799c059-1e2b-463d-9358-f00a7c0e8fe6`. Tools: a06_u6_gate, a03_u6_lead_context, a02_sentiment_event, a02_sentiment_event, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000001 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Rohan? |
| yes | Thanks, Rohan. You'd reached the plan selection step of your new Vi postpaid connection. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| this is useless nonsense | I'm sorry, I can hear this has been frustrating. Would you like me to help finish your request, or would you prefer a colleague? |
| you are stupid | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |

## j4_assisted_lead_ready_to_buy_hot_transfer

Session `2b666c9b-cbc3-481b-8b65-890d0cf05324`. Tools: a06_u6_gate, a03_u6_lead_context, dl01_classify_drop, a09_create_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9890000009 direction=outbound campaign=UC6_PILOT | Hello, this is Vi's AI assistant, calling about your Vi postpaid request. This call may be recorded for quality. Am I speaking with Farhan? |
| yes | Thanks, Farhan. You'd reached the follow-up after your store visit of your Vi postpaid enquiry from the store. If you'd prefer not to get these calls, just tell me and we'll stop. What stopped you from finishing? |
| nobody followed up after the store visit, I want to buy it now | I'm connecting you to a Vi colleague now, who will have the details of your request. Please stay on the line. |
