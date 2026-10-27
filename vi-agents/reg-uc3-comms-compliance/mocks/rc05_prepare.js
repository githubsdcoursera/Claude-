// @description RC05 Response Preparer: decide routine vs substantive. Routine items (acknowledgement, meeting confirmation, cover letter) get the approved template filled with grounded facts and wait for the named approver; substantive items (show-cause, directions, compliance reports, data requests) become an RA-UC2 drafting request with no templated reply. Never sends.
// @effect side_effect
// @in mail_id:string "Inbound mail id"
// @in approver:string "Approver user id from rc03_route"
// @out reply_class draft_id draft_text uc2_request status
const id = String(input.mail_id || "").toUpperCase(), m = R.inbox[id];
if (!m) return { reply_class: "none", draft_id: "", draft_text: "", uc2_request: "", status: "" };
if (m.type_hint === "meeting_notice") {
  const txt = R.templates.meeting_ack.replace("{{ref}}", m.ref).replace("{{date}}", longDate(m.received)).replace("{{event}}", "Open House Discussion on 20 November 2026 at 11:00").replace("{{approver_title}}", (R.users[input.approver] || {}).name || "approver");
  return { reply_class: "routine", draft_id: rRef("DRF", id), draft_text: txt, uc2_request: "", status: "C5 Draft ready: awaiting approver token" };
}
return { reply_class: "substantive", draft_id: "", draft_text: "", uc2_request: rRef("UC2REQ", id), status: "Drafting request sent to RA-UC2; no templated reply" };
