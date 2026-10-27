// @description A23 Payment Follow-up: send an approved message template (ptp_confirmation, dispute_acknowledgement, callback_confirmation) on the contact's preferred channel.
// @effect side_effect
// @in account_id:string "Enterprise account id"
// @in template:string "ptp_confirmation, dispute_acknowledgement or callback_confirmation"
// @in channel:string "whatsapp, sms or email"
// @out sent message_ref
return { sent: true, message_ref: ref("MSG", input.account_id, input.template) };
