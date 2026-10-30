// @description A06 Compliance (UC6 pre-dial gate): consent basis for a postpaid lead, NCPR/DND, calling window 09:00-21:00 IST, attempt count below 3, suppression and lead age up to 7 days. Fail closed.
// @effect read_only
// @in msisdn:string "10-digit mobile number of the lead"
// @in campaign:string "Campaign id, e.g. UC6_PILOT"
// @out allowed stop_reason first_name rule_version
const c = customer(input.msisdn);
const rv = "UC6-GATE-v1-MOCK";
if (!c || !c.uc6) return { allowed: false, stop_reason: "unknown_lead", first_name: "", rule_version: rv };
let stop = "";
if (!c.consent || !c.consent.postpaid_lead) stop = "no_consent_basis";
else if (c.dnd) stop = "ncpr_dnd";
else if (c.out_of_window) stop = "outside_calling_window";
else if ((c.attempts || 0) >= 3) stop = "attempt_cap";
else if (c.opted_out || c.suppressed) stop = "suppressed";
else if ((c.lead_age_days || 0) > 7) stop = "lead_older_than_window";
return { allowed: stop === "", stop_reason: stop, first_name: c.first, rule_version: rv };
