// @description A03 Customer Context: the dropped digital journey - type, step where it stopped, selected plan, recharge, KYC, pincode and payment status.
// @effect read_only
// @in msisdn:string "10-digit mobile number"
// @out found journey journey_label drop_step drop_label plan amount kyc_status payment_status pincode lead_date
const c = customer(input.msisdn);
if (!c || !c.lead) return { found: false };
const l = c.lead;
return { found: true, journey: l.journey, journey_label: l.journey_label, drop_step: l.drop_step, drop_label: l.drop_label,
  plan: l.plan, amount: l.amount, kyc_status: l.kyc_status, payment_status: l.payment_status, pincode: l.pincode, lead_date: l.created };
