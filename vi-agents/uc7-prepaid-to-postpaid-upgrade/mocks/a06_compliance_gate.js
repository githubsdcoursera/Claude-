// @description A06 Compliance Gate: consent, DND, calling window, attempt cap and the pilot circle exclusion (Mumbai, Delhi, Maharashtra and Goa, UP East, UP West) before an upgrade outcall.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in campaign:string "Campaign code, e.g. UPGRADE_PREPAID_TO_POSTPAID"
// @out allowed stop_reason first_name circle
const excluded = ["MU", "DL", "MH", "UE", "UW"];
const c = customer(input.msisdn);
if (!c) return { allowed: false, stop_reason: "unknown_number", first_name: "", circle: "" };
let stop = "";
if (c.opted_out) stop = "opted_out";
else if (c.dnd) stop = "dnd";
else if (!c.consent.upgrade_outreach) stop = "no_consent";
else if (excluded.includes(c.circle)) stop = "circle_excluded_from_pilot";
return { allowed: stop === "", stop_reason: stop, first_name: c.first, circle: c.circle };
