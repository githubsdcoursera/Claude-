// @description A08 Transaction Workflow: send an approved SMS template (plan_details, offer_confirmation, ticket_update, mnp_steps) to the customer.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in template:string "Template id: plan_details, offer_confirmation, ticket_update or mnp_steps"
// @in ref_id?:string "Plan, offer or ticket id when the template needs it"
// @out sent sms_ref
const ok = ["plan_details", "offer_confirmation", "ticket_update", "mnp_steps"].includes(input.template);
return { sent: ok && !!customer(input.msisdn), sms_ref: ok ? ref("SMS", input.msisdn, input.template, input.ref_id || "") : "" };
