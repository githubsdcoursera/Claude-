# Test results: Vi UC9 Prepaid Network Call Assistant

5/6 scenarios passed. Run 2026-10-27 13:01 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| unknown_caller_message_delivered | PASS | MESSAGE_DELIVERED | complete | 421 ms |  |
| spam_caller_blocked_no_message | FAIL | - | prompt | 1546 ms | tool a16_block_call not called; tool a11_meter_entitlement not called; disposition None != SPAM_BLOCKED; exit prompt != complete; never said: reported for unwanted calls; slowest turn 1546 ms > 1200 ms |
| vip_caller_urgent_push_then_message | PASS | MESSAGE_DELIVERED | complete | 388 ms |  |
| urgent_unknown_caller_push | PASS | MESSAGE_DELIVERED | complete | 539 ms |  |
| opt_in_provisions_forwarding | PASS | FORWARDING_PROVISIONED | complete | 600 ms |  |
| not_opted_in_no_handling | PASS | NOT_OPTED_IN | complete | 491 ms |  |

## unknown_caller_message_delivered

Session `0f99ab44-33a4-4106-9b5b-45e114359665`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation, a17_deliver_summary, a11_meter_entitlement, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9853333333 reason=no_answer | Hello, you've reached Sunil's Vi call assistant. I'm an AI, and this call is transcribed and recorded. Sunil can't take your call right now. May I have your name, and what the call is about? |
| Hi, this is Priya from the school, it's about Aarav's parent-teacher meeting | Thank you. Is it urgent? |
| no | What message would you like me to pass on? |
| the meeting has moved to Friday at 4 pm | Should Sunil call you back on the number you're calling from? |
| yes please | I'll pass this on: Priya called about: Hi, this is Priya from the school, it's about Aarav's parent-teacher meeting. The message is: the meeting has moved to Friday at 4 pm. You'd like a call back on this number. Is that right? |
| yes that's right | Thank you. I've passed your message to Sunil. Goodbye. |

## spam_caller_blocked_no_message

Session `f24830ca-7612-42b5-8fb4-8e96b1f383fa`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9852222222 reason=busy | Hello, you've reached Sunil's Vi call assistant. I'm an AI, and this call is transcribed and recorded. Sunil can't take your call right now. May I have your name, and what the call is about? |

## vip_caller_urgent_push_then_message

Session `0dc577c7-59e2-4e28-8d5c-553d486a17ca`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation, a17_push_urgent, a17_deliver_summary, a11_meter_entitlement, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9851111111 reason=unreachable | Hello, you've reached Sunil's Vi call assistant. I'm an AI, and this call is transcribed and recorded. I'm letting Sunil know you're calling right now. What would you like me to tell them? |
| tell him to call me, it's about dinner tonight | I've sent Sunil an urgent alert, but they can't take the call right now. What message would you like me to pass on? |
| please call back when free | Should Sunil call you back on the number you're calling from? |
| yes | I'll pass this on: Mom called about: tell him to call me, it's about dinner tonight. The message is: please call back when free. You'd like a call back on this number. Is that right? |
| yes | Thank you. I've passed your message to Sunil. Goodbye. |

## urgent_unknown_caller_push

Session `49780dec-2e99-4e32-8dc0-32a2dee6e72b`. Tools: a16_get_subscriber_rules, a16_check_caller_reputation, a17_push_urgent, a17_deliver_summary, a11_meter_entitlement, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9850000001 caller=9853333333 reason=no_answer | Hello, you've reached Sunil's Vi call assistant. I'm an AI, and this call is transcribed and recorded. Sunil can't take your call right now. May I have your name, and what the call is about? |
| my name is Ravi, I'm his neighbour | Thank you. Is it urgent? |
| yes it's an emergency | I've sent Sunil an urgent alert, but they can't take the call right now. What message would you like me to pass on? |
| his car alarm is going off | Should Sunil call you back on the number you're calling from? |
| yes | I'll pass this on: Ravi called about: my name is Ravi, I'm his neighbour. The message is: his car alarm is going off. You'd like a call back on this number. Is that right? |
| yes | Thank you. I've passed your message to Sunil. Goodbye. |

## opt_in_provisions_forwarding

Session `fa68ed21-4f43-4073-9f36-bf659f83d2f3`. Tools: a16_get_subscriber_rules, a16_provision_call_forwarding, a11_write_post_call.

| Caller | Agent |
|---|---|
| OPT_IN subscriber=9850000001 mode=opt_in | Your Vi call assistant is now on. Calls will come to the assistant when you're busy, no answer and unreachable, reference CFW-159STBV. Message summaries will appear in the Vi App. |

## not_opted_in_no_handling

Session `b7cdc61e-5768-4c71-972e-35b751a3ee65`. Tools: a16_get_subscriber_rules, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_FORWARDED subscriber=9830000001 caller=9853333333 reason=no_answer |  |
