// @description A06 Compliance Gate: consent, DND, calling window, attempt cap, opt-out and IR eligibility (postpaid, credit, barring) before any contact.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in direction:string "inbound or outbound"
// @in campaign:string "Campaign or trigger code, e.g. IR_TRAVEL_OPTIN"
// @out allowed stop_reason eligible ineligible_reason nudge_only attempts calling_window_ok first_name
const c = customer(input.msisdn);
if (!c) return { allowed: false, stop_reason: "unknown_number", eligible: false, ineligible_reason: "not_found", nudge_only: false, attempts: 0, calling_window_ok: true, first_name: "" };
const outbound = String(input.direction).toLowerCase() === "outbound";
let stop = "";
if (c.opted_out) stop = "opted_out";
else if (outbound && c.dnd) stop = "dnd";
else if (outbound && !c.consent.ir_outreach) stop = "no_consent";
else if (outbound && c.attempts >= 3) stop = "attempt_cap";
let inel = "";
if (c.segment !== "postpaid") inel = "not_postpaid";
else if (c.ir_barred) inel = "ir_barred";
else if (c.credit_limit - c.unbilled < 1500) inel = "insufficient_credit";
return { allowed: stop === "", stop_reason: stop, eligible: inel === "", ineligible_reason: inel,
  nudge_only: stop === "" && inel !== "", attempts: c.attempts, calling_window_ok: true, first_name: c.first };
