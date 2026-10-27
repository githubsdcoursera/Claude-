// @description W5 Approve gate: record an approval only from an authorised approver for the tier (GREEN/YELLOW: Legal counsel; RED: senior counsel / GC; RAI Board as well when GRACIE is affected). Business users and the agent itself can never approve.
// @effect side_effect
// @in doc_id:string "Document id"
// @in user:string "Approving user id"
// @out approved approval_ref message pending
const id = String(input.doc_id || "").toUpperCase(), u = USERS[input.user];
const r = ndaTriage(id) || vendorReview(id) || mouReview(id);
const tier = r ? r.tier : "GREEN";
const gracie = r && (r.gaps && r.gaps.length || (r.findings || []).some(f => f.section === "S10" && f.tier === "RED"));
if (!u || u.role === "business" || u.role === "dpo") return { approved: false, approval_ref: "", message: "Not approved: " + (u ? u.name : input.user) + " is not an authorised Legal approver.", pending: "" };
if (tier === "RED" && u.role !== "senior_counsel") return { approved: false, approval_ref: "", message: "Not approved: " + id + " is RED and needs senior counsel / GC.", pending: "" };
const ref = "APR-LG-" + id + "-" + input.user.split(".")[1].toUpperCase();
return { approved: true, approval_ref: ref, message: "Approval " + ref + " recorded by " + u.name + " for " + id + " (" + tier + ").", pending: gracie ? "RAI Board approval still required for the GRACIE deviation before execution." : "" };
