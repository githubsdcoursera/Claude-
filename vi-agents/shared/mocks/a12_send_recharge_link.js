// @description A12 Recharge & Billing: send a secure recharge payment link (SMS and WhatsApp) pre-filled with the chosen plan. The customer pays in the link; no card or UPI details are taken on the call.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in plan_id:string "Plan id from a13_get_plans"
// @out sent link_ref
return { sent: !!customer(input.msisdn), link_ref: ref("PAY", input.msisdn, input.plan_id) };
