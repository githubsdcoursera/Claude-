// @description RC03 Ownership Router: apply the ownership matrix by type (restricted matters to the authorised group only), check owner availability, assign the deputy and notify the reporting manager if the owner is on leave, create the owner's task and forward the summary card internally.
// @effect side_effect
// @in mail_id:string "Inbound mail id"
// @in type:string "Type from rc01_classify"
// @out owner owner_name deputy approver on_leave manager_notified task_id forwarded_to
const m = R.inbox[String(input.mail_id || "").toUpperCase()] || {};
const row = R.ownership[m.restricted ? "restricted" : input.type] || R.ownership.information_request;
const own = R.users[row.owner];
const leave = !!(own && own.on_leave);
const assignee = leave ? row.deputy : row.owner;
const mgr = (own && own.manager) || "manager.neel";
return { owner: assignee, owner_name: R.users[assignee].name, deputy: leave ? row.owner + " (on leave)" : row.deputy, approver: row.approver, on_leave: leave,
  manager_notified: leave ? mgr : "", task_id: rRef("TSK", input.mail_id || "", assignee), forwarded_to: m.restricted ? "authorised group agr_restricted only" : assignee + ", " + (leave ? mgr : row.deputy) };
