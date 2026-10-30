// @description A08 Transaction Workflow: record the customer's explicit spoken consent for a chargeable action, with the exact price read back.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in action:string "Action consented to, e.g. activate IR-GCC-7 or apply OF-PR-RC299-50"
// @in price:string "Price exactly as read back"
// @out consent_ref
return { consent_ref: ref("CNS", input.msisdn, input.action, input.price) };
