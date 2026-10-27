// @description RC04 Reassignment: a reporting manager or the Head reassigns an obligation to another officer with a reason; recorded in the audit trail with who, when and why. Officers cannot reassign.
// @effect side_effect
// @in obligation_id:string "Obligation id"
// @in new_owner:string "Target user id"
// @in reason:string "Reason for reassignment"
// @in user:string "User requesting the reassignment"
// @out done message audit_id
const o = R.obligations.find(x => x.id === String(input.obligation_id || "").toUpperCase()), by = R.users[input.user], to = R.users[input.new_owner];
if (!o) return { done: false, message: "No obligation " + input.obligation_id + ".", audit_id: "" };
if (!by || (by.role !== "manager" && by.role !== "head")) return { done: false, message: "Only a reporting manager or the Head can reassign; the request was logged and not applied.", audit_id: rRef("AUD", "reassign-refused", input.user || "") };
if (!to) return { done: false, message: "Unknown target user " + input.new_owner + ".", audit_id: "" };
if (!input.reason) return { done: false, message: "Please give a reason; reassignments are audited with who, when and why.", audit_id: "" };
const aid = rRef("AUD", o.id, input.new_owner, input.user, input.reason);
return { done: true, message: o.id + " reassigned from " + R.users[o.owner].name + " to " + to.name + " by " + by.name + " on " + longDate(R.today) + ", reason: " + input.reason + ". CX4 Reassigned; " + to.name + " notified. Audit " + aid + ".", audit_id: aid };
