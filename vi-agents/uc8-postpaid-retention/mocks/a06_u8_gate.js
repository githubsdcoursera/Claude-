// @description A06 Compliance (UC8 pre-dial gate): consent/DND for the service category, calling window 10:00-20:00 IST, UC8 cooldown, suppression (open Nodal complaint, in collections, deceased or legal flag) and at most 2 attempts per trigger. Fail closed.
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @in trigger_code?:string "Trigger code T1-T7 from the event, or empty"
// @out allowed stop_reason first_name trigger_code rule_version
const tcIn = /^none$/i.test(String(input.trigger_code || "")) ? "" : input.trigger_code;
const c = customer(input.msisdn);
const rv = "UC8-GATE-v1-MOCK";
if (!c || !c.uc8) return { allowed: false, stop_reason: "not_in_scope", first_name: "", trigger_code: "", rule_version: rv };
let stop = "";
if (!c.consent || !c.consent.service_calls) stop = "no_consent";
else if (c.dnd) stop = "dnd";
else if (c.out_of_window) stop = "outside_calling_window";
else if (c.in_collections) stop = "in_collections";
else if (c.nodal_complaint) stop = "open_nodal_complaint";
else if (c.legal_flag || c.deceased) stop = "legal_or_deceased_flag";
else if (c.last_uc8_call_days !== undefined && c.last_uc8_call_days < 30) stop = "cooldown";
else if ((c.attempts || 0) >= 2) stop = "attempt_cap";
else if (c.opted_out) stop = "opted_out";
return { allowed: stop === "", stop_reason: stop, first_name: c.first, trigger_code: tcIn || c.uc8.trigger_code, rule_version: rv };
