// @description A23 Payment Follow-up: send a validated payment-gateway link for the invoice amount on the chosen channel. Payment confirmation arrives by gateway webhook, which auto-closes the follow-up SR.
// @effect side_effect
// @in account_id:string "Enterprise account id"
// @in channel:string "whatsapp, sms or email"
// @out sent link_ref
return { sent: true, link_ref: ref("PAYL", input.account_id, input.channel) };
