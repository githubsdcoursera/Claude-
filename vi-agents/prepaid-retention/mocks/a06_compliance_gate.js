// @description A06 Compliance Gate: risk-cohort membership, consent, DND, calling window, attempt cap (max 3) and opt-out before a retention outcall.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in direction:string "inbound or outbound"
// @in campaign:string "Campaign code, e.g. PREPAID_LAPSE_RISK_30D"
// @out allowed stop_reason first_name in_risk_cohort attempts
const c = customer(input.msisdn);
if (!c || c.segment !== "prepaid") return { allowed: false, stop_reason: c ? "not_prepaid" : "unknown_number", first_name: "", in_risk_cohort: false, attempts: 0 };
const outbound = String(input.direction).toLowerCase() === "outbound";
let stop = "";
if (c.opted_out) stop = "opted_out";
else if (outbound && c.dnd) stop = "dnd";
else if (outbound && !c.consent.retention) stop = "no_consent";
else if (outbound && c.attempts >= 3) stop = "attempt_cap";
else if (outbound && !c.lapse_risk) stop = "not_in_risk_cohort";
return { allowed: stop === "", stop_reason: stop, first_name: c.first, in_risk_cohort: !!c.lapse_risk, attempts: c.attempts };
