// @description A06 Compliance Gate: consent for lead follow-up, DND, calling window and opt-out before a dropped-lead outcall.
// @effect read_only
// @in msisdn:string "10-digit mobile number"
// @in direction:string "inbound or outbound"
// @in campaign:string "Campaign code, e.g. PREPAID_DROPPED_LEAD"
// @out allowed stop_reason first_name
const c = customer(input.msisdn);
if (!c) return { allowed: false, stop_reason: "unknown_number", first_name: "" };
let stop = "";
if (c.opted_out) stop = "opted_out";
else if (c.dnd) stop = "dnd";
else if (!c.consent.lead_followup) stop = "no_consent";
return { allowed: stop === "", stop_reason: stop, first_name: c.first };
