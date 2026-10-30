// @description A08 Transaction Workflow: send an approved SMS template (upgrade_details, order_confirmation) to the customer.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in template:string "upgrade_details or order_confirmation"
// @in ref_id?:string "Plan or order id"
// @out sent sms_ref
const ok = ["upgrade_details", "order_confirmation"].includes(input.template);
return { sent: ok, sms_ref: ok ? ref("SMS", input.msisdn, input.template, input.ref_id || "") : "" };
