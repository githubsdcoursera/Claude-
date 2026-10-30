// @description BPS01 Lead and Compliance: DND, DLT template registration, calling window and opt-out before a business sales outcall.
// @effect read_only
// @in msisdn:string "Lead contact mobile number"
// @out allowed stop_reason
const l = P.business_leads[String(input.msisdn || "")];
if (!l) return { allowed: false, stop_reason: "unknown_lead" };
const stop = l.opted_out ? "opted_out" : l.dnd ? "dnd" : !l.dlt_ok ? "dlt_not_registered" : "";
return { allowed: stop === "", stop_reason: stop };
