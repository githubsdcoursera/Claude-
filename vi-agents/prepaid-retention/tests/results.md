# Test results: Vi Prepaid Retention Outcall

1/2 scenarios passed. Run 2026-10-27 11:38 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| network_issue_fixed_first_then_free_offer | PASS | OFFER_APPLIED | complete | 405 ms |  |
| free_text_reason_classified_by_llm | FAIL | - | - | 0 ms | session load failed: {'success': False, 'error': 'Concurrent session limit exceeded'} |

## network_issue_fixed_first_then_free_offer

Session `04892e54-9c3c-4f93-999f-45abe2a54efc`. Tools: a06_compliance_gate, a03_get_retention_context, prt01_check_network, a08_raise_network_ticket, prt03_get_offer_authority, a08_record_consent, a08_apply_offer, a08_send_sms, a11_schedule_outcome_tracking, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9810000001 direction=outbound campaign=PREPAID_LAPSE_RISK_30D | Namaste, this is Vi's virtual assistant. I am an AI, and this call is recorded for quality and training. Would you like to continue in English or Hindi? |
| English | Am I speaking with Kavya? |
| yes speaking | Thanks, Kavya. Your ₹299 Unlimited 28 days (MOCK) plan is due for recharge in 2 days, and we want to make sure Vi is working well for you. Is anything about your network, price or data not working for you? |
| my network keeps dropping calls | I'm sorry about the network trouble. There is a known issue in Kukatpally and our engineers expect it to be fixed within 48 hours. I've logged your complaint under reference TKT-0KMN235 so you'll get an update. As a valued Vi customer, I can also offer you 10 GB of bonus data free for 7 days, as an apology for the network issue. Would you like that? |
| yes | To confirm, I'll add 10 GB of bonus data free for 7 days, as an apology for the network issue to your number at no extra charge. Shall I go ahead? |
| yes go ahead | Done. Your offer has been applied, reference OFA-151PU24, and I've sent you a confirmation SMS. Is there anything else I can help you with? |
| no thanks | Thank you for your time, and for being with Vi. Goodbye. |

## free_text_reason_classified_by_llm

Session `None`. Tools: none.

| Caller | Agent |
|---|---|
