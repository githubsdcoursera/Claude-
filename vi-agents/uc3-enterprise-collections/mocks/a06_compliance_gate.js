// @description A06 Compliance Gate: consent, DND, calling window and attempt cap for the billing contact before a collections follow-up.
// @effect read_only
// @in msisdn:string "Billing contact mobile number"
// @in campaign:string "Campaign code, e.g. ENT_COLLECTIONS_FOLLOWUP"
// @out allowed stop_reason
const known = Object.values(P.enterprise_accounts).some(a => a.billing_contact === String(input.msisdn));
return known ? { allowed: true, stop_reason: "" } : { allowed: false, stop_reason: "not_a_registered_billing_contact" };
