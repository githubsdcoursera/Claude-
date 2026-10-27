// @description A11 Post-Call Intelligence: write summary, disposition and outcome events to CRM and the Intelligence Warehouse (12-month audit).
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in disposition:string "Final disposition code"
// @in summary:string "Call summary"
// @in outcome:string "Business outcome, e.g. pack_activated, offer_applied, declined_sms_sent"
// @out written crm_ref
return { written: true, crm_ref: ref("CRM", input.msisdn, input.disposition, input.outcome) };
