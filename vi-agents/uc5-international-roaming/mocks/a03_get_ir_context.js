// @description A03 Customer Context: plan, IR status, credit limit, prior enquiry and declared travel for the verified customer.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out found first_name plan ir_status available_credit corporate prior_enquiry travel_country travel_start travel_days preferred_language
const c = customer(input.msisdn);
if (!c) return { found: false };
const t = c.travel || {};
return { found: true, first_name: c.first, plan: c.plan, ir_status: c.ir_barred ? "barred" : (c.ir_active ? "active" : "not_active"),
  available_credit: "₹" + (c.credit_limit - c.unbilled).toLocaleString("en-IN"), corporate: c.corporate,
  prior_enquiry: c.prior_enquiry || "none", travel_country: t.country || "", travel_start: t.start || "", travel_days: t.days || 0,
  preferred_language: c.language };
