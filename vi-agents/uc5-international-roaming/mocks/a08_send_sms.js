// @description A08 Transaction Workflow: send an approved SMS template (ir_pack_details, ir_confirmation_tips, ir_app_nudge) to the customer.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in template:string "Template id: ir_pack_details, ir_confirmation_tips or ir_app_nudge"
// @in pack_id?:string "IR pack id when the template needs it"
// @out sent sms_ref
const ok = ["ir_pack_details", "ir_confirmation_tips", "ir_app_nudge"].includes(input.template);
return { sent: ok && !!customer(input.msisdn), sms_ref: ok ? ref("SMS", input.msisdn, input.template, input.pack_id || "") : "" };
