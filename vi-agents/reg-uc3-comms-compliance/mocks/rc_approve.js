// @description RC05 approval gate: record the named approver's decision on a prepared reply. Only the item's approver holds the approver token; anyone else is refused. At pilot autonomy (L2) the agent never sends: the approved draft is placed for the approver to send.
// @effect side_effect
// @in draft_id:string "Draft id from rc05_prepare"
// @in user:string "User asking to approve or send"
// @out approved sent approver_token status message
const did = String(input.draft_id || "").toUpperCase();
const mid = Object.keys(R.inbox).find(k => rRef("DRF", k) === did);
if (!mid) return { approved: false, sent: false, approver_token: "", status: "not_found", message: "No prepared draft " + did + "." };
const appr = (R.ownership[R.inbox[mid].type_hint] || {}).approver;
if (input.user !== appr) return { approved: false, sent: false, approver_token: "", status: "refused", message: "Not sent. Only the named approver (" + R.users[appr].name + ") holds the approver token for " + did + "." };
const tok = rRef("APTOK", did, input.user);
return { approved: true, sent: false, approver_token: tok, status: "C6 Approved",
  message: "Approved by " + R.users[appr].name + " with token " + tok + ". At pilot autonomy " + R.autonomy_level + " the agent does not send; the approved reply is in the approver's Outlook drafts to send, and the item moves to C7 when the send is recorded." };
