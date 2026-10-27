# Test results: Vi Business Postpaid Sales Outcall

6/7 scenarios passed. Run 2026-10-27 14:35 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| qualified_document_link_sent | FAIL | DOCUMENT_LINK_SENT | complete | 279 ms | never said: Is this a good time |
| objection_answered_from_approved_knowledge_then_visit | PASS | APPOINTMENT_BOOKED | complete | 531 ms |  |
| not_a_good_time_callback | PASS | CALLBACK | complete | 491 ms |  |
| dnd_lead_not_called | PASS | OPT_OUT | complete | 448 ms |  |
| individual_not_eligible | PASS | NOT_ELIGIBLE | complete | 538 ms |  |
| not_interested | PASS | NOT_INTERESTED | complete | 337 ms |  |
| discount_request_goes_to_sales_advisor | PASS | HOT_TRANSFERRED | escalate | 512 ms |  |

## qualified_document_link_sent

Session `13f0116e-78c8-4859-a0ce-c594312ba43e`. Tools: bps01_get_lead, bps01_compliance_gate, bps03_get_plan_options, bps04_send_document_link, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9880000001 | Good day, this is Vi Business's virtual assistant. I am an AI, and this call is recorded for quality and training. I'm calling about your request for Vi Business Postpaid connections. Is this a good t... |
| yes, go ahead | Thank you. Am I speaking with Vivek Malhotra, and are you authorised to decide on connections for Malhotra Exports? |
| yes I'm the director | As per our records, you've asked for 25 Vi Business Postpaid connections. Is that still right, or would you like a different number? |
| yes 25 is right | Will these be new numbers, or would you like to port existing numbers to Vi? |
| all new numbers | And is Malhotra Exports a private limited company, an LLP, a partnership or a proprietorship? |
| private limited | For 25 connections, I'd recommend Vi Business Plan C at ₹649 per connection per month, with unlimited calls, unlimited data, 3,000 SMS, mobile security, cloud storage and Google Workspace for eligible volumes. Another option is Vi Business Plan B at ₹499 per connection per month, with unlimited calls, 75 GB data with rollover, 3,000 SMS, mobile security and cloud storage. All connections come on a single GST-compliant bill. Would you like to go ahead? |
| yes let's go ahead | Great. To activate, we'll need your company documents. Shall I send you a secure link with the checklist for a private limited company, or would you prefer our field team to visit your office? |
| send the link | Done. I've sent a secure link to this number. For a private limited company, please upload: company PAN, GST certificate, certificate of incorporation, memorandum of association with list of directors, authorised signatory's Aadhaar and company address proof. Please don't share these documents on a call or in chat. A Vi Business advisor will confirm once they're verified. Thank you. |

## objection_answered_from_approved_knowledge_then_visit

Session `ea0478ab-7cbb-4bc5-a7cc-84cf956e4144`. Tools: bps01_get_lead, bps01_compliance_gate, bps03_get_plan_options, a10_kb_answer, bps05_book_appointment, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9880000002 | Good day, this is Vi Business's virtual assistant. I am an AI, and this call is recorded for quality and training. I'm calling about your request for Vi Business Postpaid connections. Is this a good t... |
| yes | Thank you. Am I speaking with Shreya Iyer, and are you authorised to decide on connections for Iyer and Sons? |
| yes | As per our records, you've asked for 4 Vi Business Postpaid connections. Is that still right, or would you like a different number? |
| 4 connections | Will these be new numbers, or would you like to port existing numbers to Vi? |
| we'll port our existing numbers | And is Iyer and Sons a private limited company, an LLP, a partnership or a proprietorship? |
| it's a proprietorship | For 4 connections, I'd recommend Vi Business Plan A at ₹399 per connection per month, with unlimited calls, 40 GB data with rollover, 3,000 SMS and mobile security. Another option is Vi Business Plan B at ₹499 per connection per month, with unlimited calls, 75 GB data with rollover, 3,000 SMS, mobile security and cloud storage. All connections come on a single GST-compliant bill. Would you like to go ahead? |
| but Airtel is cheaper for us | I can only compare against approved, current information. An advisor can share an approved comparison with you. Would you like to go ahead with Vi Business Plan A? |
| okay yes | Great. To activate, we'll need your company documents. Shall I send you a secure link with the checklist for a proprietorship, or would you prefer our field team to visit your office? |
| a field visit please | Sure. Which works better for the visit, a morning or an afternoon? |
| morning | Done. Our field team will visit Thursday 30 October between 10 am and 12 noon, reference APT-173AN84. Please keep the documents for a proprietorship ready. Thank you. |

## not_a_good_time_callback

Session `4e9d1556-1708-4777-bd36-50c6ed9548a7`. Tools: bps01_get_lead, bps01_compliance_gate, bps01_schedule_callback, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9880000001 | Good day, this is Vi Business's virtual assistant. I am an AI, and this call is recorded for quality and training. I'm calling about your request for Vi Business Postpaid connections. Is this a good t... |
| no I'm in a meeting | No problem. When would be a good time to call you back? |
| tomorrow morning | Done. We'll call you back tomorrow between 10 and 11 am. Thank you. |

## dnd_lead_not_called

Session `377b98a2-4422-4b6e-8237-ae08f6f9e408`. Tools: bps01_get_lead, bps01_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9880000003 |  |

## individual_not_eligible

Session `5a6ca864-2176-4f02-bd1f-301a4935bfa6`. Tools: bps01_get_lead, bps01_compliance_gate, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9880000002 | Good day, this is Vi Business's virtual assistant. I am an AI, and this call is recorded for quality and training. I'm calling about your request for Vi Business Postpaid connections. Is this a good t... |
| yes | Thank you. Am I speaking with Shreya Iyer, and are you authorised to decide on connections for Iyer and Sons? |
| yes | As per our records, you've asked for 4 Vi Business Postpaid connections. Is that still right, or would you like a different number? |
| yes | Will these be new numbers, or would you like to port existing numbers to Vi? |
| new | And is Iyer and Sons a private limited company, an LLP, a partnership or a proprietorship? |
| actually I'm an individual freelancer, not registered | Thank you. Vi Business Postpaid is for registered businesses, so I'm not able to set this up for an individual. Our retail postpaid plans are available in the Vi app. Thank you for your time. |

## not_interested

Session `362d8821-58e9-4c96-ade1-cd1ee85e08e7`. Tools: bps01_get_lead, bps01_compliance_gate, bps03_get_plan_options, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9880000001 | Good day, this is Vi Business's virtual assistant. I am an AI, and this call is recorded for quality and training. I'm calling about your request for Vi Business Postpaid connections. Is this a good t... |
| yes | Thank you. Am I speaking with Vivek Malhotra, and are you authorised to decide on connections for Malhotra Exports? |
| yes | As per our records, you've asked for 25 Vi Business Postpaid connections. Is that still right, or would you like a different number? |
| yes | Will these be new numbers, or would you like to port existing numbers to Vi? |
| new | And is Malhotra Exports a private limited company, an LLP, a partnership or a proprietorship? |
| pvt ltd | For 25 connections, I'd recommend Vi Business Plan C at ₹649 per connection per month, with unlimited calls, unlimited data, 3,000 SMS, mobile security, cloud storage and Google Workspace for eligible volumes. Another option is Vi Business Plan B at ₹499 per connection per month, with unlimited calls, 75 GB data with rollover, 3,000 SMS, mobile security and cloud storage. All connections come on a single GST-compliant bill. Would you like to go ahead? |
| no, not interested | Understood, thank you for your time. If you'd like to revisit it, just reply to our SMS and a Vi Business advisor will call you. |

## discount_request_goes_to_sales_advisor

Session `13b5fe0b-0124-4e22-a905-a757e744e60f`. Tools: bps01_get_lead, bps01_compliance_gate, bps03_get_plan_options, bps06_create_sales_handoff, a11_write_post_call.

| Caller | Agent |
|---|---|
| CALL_START msisdn=9880000001 | Good day, this is Vi Business's virtual assistant. I am an AI, and this call is recorded for quality and training. I'm calling about your request for Vi Business Postpaid connections. Is this a good t... |
| yes | Thank you. Am I speaking with Vivek Malhotra, and are you authorised to decide on connections for Malhotra Exports? |
| yes | As per our records, you've asked for 25 Vi Business Postpaid connections. Is that still right, or would you like a different number? |
| yes | Will these be new numbers, or would you like to port existing numbers to Vi? |
| new | And is Malhotra Exports a private limited company, an LLP, a partnership or a proprietorship? |
| pvt ltd | For 25 connections, I'd recommend Vi Business Plan C at ₹649 per connection per month, with unlimited calls, unlimited data, 3,000 SMS, mobile security, cloud storage and Google Workspace for eligible volumes. Another option is Vi Business Plan B at ₹499 per connection per month, with unlimited calls, 75 GB data with rollover, 3,000 SMS, mobile security and cloud storage. All connections come on a single GST-compliant bill. Would you like to go ahead? |
| can you give us a discount? | I'm connecting you to a Vi Business sales advisor now, who will have your requirement and the plans we discussed. Please stay on the line. |
