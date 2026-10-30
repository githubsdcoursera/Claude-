// @description P-DL01 Prepaid Journey Resume: send a pre-filled link (SMS and WhatsApp) that reopens the journey at the step where it stopped. Carries an attribution id for conversion tracking.
// @effect side_effect
// @in msisdn:string "10-digit mobile number"
// @in lead_id:string "Lead id from a07_get_lead"
// @in resume_step:string "Journey step to reopen, e.g. kyc, payment, address, plan_selection"
// @out sent link_ref attribution_id
return { sent: !!customer(input.msisdn), link_ref: ref("LNK", input.lead_id, input.resume_step), attribution_id: ref("ATR", input.lead_id) };
