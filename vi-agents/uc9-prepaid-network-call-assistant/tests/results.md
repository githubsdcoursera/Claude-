# Test results: Vi UC9 Prepaid Network Call Assistant

6/6 scenarios passed. Run 2026-10-27 15:34 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| unknown_caller_message_delivered | PASS | MESSAGE_DELIVERED | complete | 457 ms |  |
| spam_caller_blocked_no_message | PASS | SPAM_BLOCKED | complete | 862 ms |  |
| vip_caller_urgent_push_then_message | PASS | MESSAGE_DELIVERED | complete | 456 ms |  |
| urgent_unknown_caller_push | PASS | MESSAGE_DELIVERED | complete | 349 ms |  |
| opt_in_provisions_forwarding | PASS | FORWARDING_PROVISIONED | complete | 410 ms |  |
| not_opted_in_no_handling | PASS | NOT_OPTED_IN | complete | 468 ms |  |

## unknown_caller_message_delivered

Session `26ca6cab-df82-4d32-be02-05848e4d13d8`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation, a17_deliver_summary, a11_meter_entitlement, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9853333333 reason=no_answer | Hello, you've reached Sunil's Vi call assistant. I'm an AI, and this call is transcribed and recorded. Sunil can't take your call right now. May I have your name, and what the call is about? |
| Hi, this is Priya from the school, it's about Aarav's parent-teacher meeting | Thank you. Is it urgent? |
| no | What message would you like me to pass on? |
| the meeting has moved to Friday at 4 pm | Should Sunil call you back on the number you're calling from? |
| yes please | I'll pass this on: Priya called about: Hi, this is Priya from the school, it's about Aarav's parent-teacher meeting. The message is: the meeting has moved to Friday at 4 pm. You'd like a call back on this number. Is that right? |
| yes that's right | Thank you. I've passed your message to Sunil. Goodbye. |

## spam_caller_blocked_no_message

Session `2e4e443a-4159-45d6-ae96-12f1dfd70828`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation, a16_block_call, a11_meter_entitlement, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9852222222 reason=busy | This number has been reported for unwanted calls, so I'm unable to take a message. Goodbye. |

## vip_caller_urgent_push_then_message

Session `af7816a4-e670-4c83-9367-76804523ed2c`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation, a17_push_urgent, a17_deliver_summary, a11_meter_entitlement, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9851111111 reason=unreachable | Hello, you've reached Sunil's Vi call assistant. I'm an AI, and this call is transcribed and recorded. I'm letting Sunil know you're calling right now. What would you like me to tell them? |
| tell him to call me, it's about dinner tonight | I've sent Sunil an urgent alert, but they can't take the call right now. What message would you like me to pass on? |
| please call back when free | Should Sunil call you back on the number you're calling from? |
| yes | I'll pass this on: Mom called about: tell him to call me, it's about dinner tonight. The message is: please call back when free. You'd like a call back on this number. Is that right? |
| yes | Thank you. I've passed your message to Sunil. Goodbye. |

## urgent_unknown_caller_push

Session `ee843449-84ff-468b-a484-4ce37b1a2dca`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation, a17_push_urgent, a17_deliver_summary, a11_meter_entitlement, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9853333333 reason=no_answer | Hello, you've reached Sunil's Vi call assistant. I'm an AI, and this call is transcribed and recorded. Sunil can't take your call right now. May I have your name, and what the call is about? |
| my name is Ravi, I'm his neighbour | Thank you. Is it urgent? |
| yes it's an emergency | I've sent Sunil an urgent alert, but they can't take the call right now. What message would you like me to pass on? |
| his car alarm is going off | Should Sunil call you back on the number you're calling from? |
| yes | I'll pass this on: Ravi called about: my name is Ravi, I'm his neighbour. The message is: his car alarm is going off. You'd like a call back on this number. Is that right? |
| yes | Thank you. I've passed your message to Sunil. Goodbye. |

## opt_in_provisions_forwarding

Session `654413c3-487b-448b-8bae-49ed6d27687d`. Tools: a16_get_subscriber_rules, a16_provision_call_forwarding, a11_write_post_call.

| Caller | Agent |
|---|---|
| OPT_IN subscriber=9850000001 mode=opt_in | Your Vi call assistant is now on. Calls will come to the assistant when you're busy, no answer and unreachable, reference CFW-159STBV. Message summaries will appear in the Vi App. |

## not_opted_in_no_handling

Session `9ed2f53c-e471-4b6b-b0f0-b1b6b770a1cf`. Tools: a16_get_subscriber_rules, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9830000001 caller=9853333333 reason=no_answer |  |
