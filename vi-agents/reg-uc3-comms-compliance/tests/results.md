# Test results: Vi RA-UC3 Communications Compliance Manager

15/15 scenarios passed. Run 2026-10-27 17:39 UTC against the draft agent through Arch debug sessions; backend systems are mock workflows.

| Scenario | Result | Disposition | End | Slowest turn | Notes |
|---|---|---|---|---:|---|
| E2_within_15_days_deadline_and_buffer | PASS | CLASSIFIED_ASSIGNED | complete | 1108 ms |  |
| E3_dual_check_disagree_cx1_no_date | PASS | CX1_DEADLINE_CONFIRM | complete | 1082 ms |  |
| E4_three_asks_three_obligations_E5_owner_on_leave | PASS | CLASSIFIED_ASSIGNED | complete | 977 ms |  |
| E7_spoofed_regulator_sender_cx1 | PASS | CX1_TRIAGE | complete | 739 ms |  |
| E8_thread_reply_linked_not_duplicated | PASS | LINKED_TO_MATTER | complete | 1008 ms |  |
| E9_routine_ack_template_not_sent_without_token | PASS | SEND_REFUSED | complete | 928 ms |  |
| E9b_approver_approves_agent_still_does_not_send | PASS | APPROVED_NOT_SENT | complete | 556 ms |  |
| E10_show_cause_critical_to_uc2_no_template | PASS | CLASSIFIED_ASSIGNED | complete | 890 ms |  |
| E11_restricted_matter_hidden_from_unauthorised | PASS | DASHBOARD | complete | 917 ms |  |
| E11b_restricted_visible_to_authorised_manager | PASS | DASHBOARD | complete | 406 ms |  |
| E6_escalation_to_manager_after_internal_due | PASS | ESCALATIONS_RUN | complete | 642 ms |  |
| E12_manager_reassigns_audited | PASS | REASSIGNED | complete | 481 ms |  |
| E12b_officer_cannot_reassign | PASS | REASSIGN_REFUSED | complete | 560 ms |  |
| dashboard_overdue_red | PASS | DASHBOARD | complete | 602 ms |  |
| E1_replay_200_historical | PASS | REPLAY_E1 | complete | 548 ms |  |

## E2_within_15_days_deadline_and_buffer

Session `ee99799e-4591-4c0d-a67b-53a8020b9a36`. Tools: rc_parse, rc01_classify, rc02_extract, rc03_route, rc05_prepare, r_notify, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-001 | MAIL-SYN-001 from TRAI: [SYNTHETIC] Furnishing of QoS data for Q2, reference TRAI-SYN-QOS-2026-221. Classified information_request, urgency Medium.\n\nObligations: OBL-SYN-001-1: furnish circle-wise Q... |
| done | Closing the session. Every action is in the audit trail. |

## E3_dual_check_disagree_cx1_no_date

Session `3b0ad529-8e11-4d5a-9945-301769c5dc1e`. Tools: rc_parse, rc01_classify, rc02_extract, rc03_route, rc05_prepare, r_notify, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-002 | MAIL-SYN-002 from DoT: [SYNTHETIC] Submission of compliance report on spectrum sharing, reference DOT-SYN-LIC-2026-077. Classified compliance_reminder, urgency High.\n\nObligations: OBL-SYN-002-1: sub... |
| done | Closing the session. Every action is in the audit trail. |

## E4_three_asks_three_obligations_E5_owner_on_leave

Session `30eb7ac7-f695-467c-bdc5-7b588fe82a36`. Tools: rc_parse, rc01_classify, rc02_extract, rc03_route, rc05_prepare, r_notify, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-003 | MAIL-SYN-003 from DoT: [SYNTHETIC] Directions on lawful-interception readiness, reference DOT-SYN-AS-2026-310. Classified direction, urgency High.\n\nObligations: OBL-SYN-003-1: furnish the LI node in... |
| done | Closing the session. Every action is in the audit trail. |

## E7_spoofed_regulator_sender_cx1

Session `c063918c-35d1-4ce7-b028-15a60431ec83`. Tools: rc_parse, rc01_classify, r_notify, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-004 | MAIL-SYN-004 was not auto-processed. CX1 Needs human triage: sender domain trai-gov.in.co is not in the sender register but claims to be TRAI. It has been sent to the triage officer; no obligation, ta... |
| done | Closing the session. Every action is in the audit trail. |

## E8_thread_reply_linked_not_duplicated

Session `b4eda03b-934f-4fe2-9c5a-66134a18dd6f`. Tools: rc_parse, rc01_classify, rc02_extract, rc03_route, rc05_prepare, r_notify, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-005 | MAIL-SYN-005 from TRAI: RE: [SYNTHETIC] Furnishing of QoS data for Q2, reference TRAI-SYN-QOS-2026-221. Classified information_request, urgency Medium, linked to existing matter MAT-SYN-0042.\n\nOblig... |
| done | Closing the session. Every action is in the audit trail. |

## E9_routine_ack_template_not_sent_without_token

Session `60f94b55-bc90-445d-86dc-b31f9f92a9cd`. Tools: rc_parse, rc01_classify, rc02_extract, rc03_route, rc05_prepare, r_notify, r_audit_log, rc_parse, rc_approve, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-006 | MAIL-SYN-006 from TRAI: [SYNTHETIC] Meeting notice: Open House on satellite spectrum, reference TRAI-SYN-OHD-2026-19. Classified meeting_notice, urgency Low.\n\nObligations: OBL-SYN-006-1: confirm par... |
| send DRF-1M1ZJP7 now | Not sent. Only the named approver (Neel Kapoor) holds the approver token for DRF-1M1ZJP7. Anything else? |
| done | Closing the session. Every action is in the audit trail. |

## E9b_approver_approves_agent_still_does_not_send

Session `a7da1649-7be6-4f4e-9235-2cc0291fe39e`. Tools: rc_parse, rc_approve, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=manager.neel approve DRF-1M1ZJP7 | Approved by Neel Kapoor with token APTOK-0Z814KK. At pilot autonomy L2 the agent does not send; the approved reply is in the approver's Outlook drafts to send, and the item moves to C7 when the send i... |
| done | Closing the session. Every action is in the audit trail. |

## E10_show_cause_critical_to_uc2_no_template

Session `66a5a572-f4c8-4a10-85f1-f0636f0e3347`. Tools: rc_parse, rc01_classify, rc02_extract, rc03_route, rc05_prepare, r_notify, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-007 | MAIL-SYN-007 from DoT: [SYNTHETIC] Show Cause Notice for delayed QoS reporting, reference DOT-SYN-SCN-2026-015. Classified show_cause, urgency Critical.\n\nObligations: OBL-SYN-007-1: reply to the sho... |
| done | Closing the session. Every action is in the audit trail. |

## E11_restricted_matter_hidden_from_unauthorised

Session `77cfd24c-0452-401d-9d9b-882215ef4ce1`. Tools: rc_parse, rc01_classify, rc02_extract, rc03_route, rc05_prepare, r_notify, r_audit_log, rc_parse, rc06_dashboard, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha INBOUND mail=MAIL-SYN-008 | MAIL-SYN-008 is a restricted matter. It has been classified, its obligations registered and routed to the authorised group only; details are not shown to you. Audit AUD-1JKBIHD. Anything else? |
| show the dashboard | Dashboard (all, as of 27 October 2026): 4 items. OBL-SYN-0042-1 / furnish circle-wise QoS data for Q1 / owner Asha Rao / statutory 30 October 2026 / internal 27 October 2026 / 3 days left / Amber / C3 Assigned // OBL-SYN-0100 / submit numbering resource utilisation report / owner Meera Pillai / statutory 6 November 2026 / internal 3 November 2026 / 10 days left / Green / C3 Assigned // OBL-SYN-0101 / submit EMF compliance self-certification / owner Asha Rao / statutory 26 October 2026 / internal 21 October 2026 / 1 days overdue / Red / C4 In progress // OBL-SYN-0102 / file consultation comments on TRAI-SYN-CP-2026-11 / owner Meera Pillai / statutory 17 November 2026 / internal 12 November 2026 / 21 days left / Green / C4 In progress. Anything else? |
| done | Closing the session. Every action is in the audit trail. |

## E11b_restricted_visible_to_authorised_manager

Session `ebb10c89-7ac9-4bb3-a110-8348eba60b44`. Tools: rc_parse, rc06_dashboard, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=manager.neel show the dashboard | Dashboard (all, as of 27 October 2026): 5 items. OBL-SYN-0042-1 / furnish circle-wise QoS data for Q1 / owner Asha Rao / statutory 30 October 2026 / internal 27 October 2026 / 3 days left / Amber / C3... |
| done | Closing the session. Every action is in the audit trail. |

## E6_escalation_to_manager_after_internal_due

Session `ec549155-3e49-40ce-a47d-da152390a773`. Tools: rc_parse, rc04_escalations, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=manager.neel run escalations as of 2026-11-04 | Escalation run as of 2026-11-04: 3 actions. OBL-SYN-0042-1: statutory due 30 October 2026 passed: CX3 Overdue; escalated to Head, Regulatory and the CAIO governance report; reason to be recorded. OBL-... |
| done | Closing the session. Every action is in the audit trail. |

## E12_manager_reassigns_audited

Session `d84a3a79-3955-4e69-9bc6-19896db1c0db`. Tools: rc_parse, rc_reassign, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=manager.neel reassign OBL-SYN-0100 to officer.asha because Meera is on a training course | OBL-SYN-0100 reassigned from Meera Pillai to Asha Rao by Neel Kapoor on 27 October 2026, reason: Meera is on a training course. CX4 Reassigned; Asha Rao notified. Audit AUD-0ZB1W99. Anything else? |
| done | Closing the session. Every action is in the audit trail. |

## E12b_officer_cannot_reassign

Session `25d6361b-50e6-40e2-8d6b-ed5119ee8360`. Tools: rc_parse, rc_reassign, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha reassign OBL-SYN-0100 to officer.asha because I have time | Only a reporting manager or the Head can reassign; the request was logged and not applied. Anything else? |
| done | Closing the session. Every action is in the audit trail. |

## dashboard_overdue_red

Session `92590a23-124a-47d6-84e5-e34d88980a75`. Tools: rc_parse, rc06_dashboard, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha show overdue items | Dashboard (overdue, as of 27 October 2026): 1 items. OBL-SYN-0101 / submit EMF compliance self-certification / owner Asha Rao / statutory 26 October 2026 / internal 21 October 2026 / 1 days overdue / ... |
| done | Closing the session. Every action is in the audit trail. |

## E1_replay_200_historical

Session `3e4369e7-33ed-4fce-9aa3-039b16d7613a`. Tools: rc_parse, rc_replay, r_audit_log, rc_parse.

| Caller | Agent |
|---|---|
| user=officer.asha replay the historical inbox | Replay of 200 labelled synthetic inbound emails: 160 regulatory items, 100% caught and 100% classified correctly (targets 98% and 95%). 20 spoofed senders went to CX1 triage. Anything else? |
| done | Closing the session. Every action is in the audit trail. |
