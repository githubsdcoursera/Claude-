// @description A15 Upgrade Plan: catalogue, eligibility and credit check, and the exact comparison of the best-fit postpaid plan against the customer's current monthly prepaid spend. Verbatim must-say fields.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out eligible reason current_plan current_spend plan_id plan_name price benefit first_bill
const c = customer(input.msisdn);
if (!c) return { eligible: false, reason: "not_found" };
if (!c.credit_ok) return { eligible: false, reason: "credit_check_not_passed", current_plan: c.plan, current_spend: "₹" + c.monthly_spend };
const p = P.postpaid_plans.find(x => c.monthly_spend >= x.for_spend[0] && c.monthly_spend < x.for_spend[1]) || P.postpaid_plans[0];
return { eligible: true, reason: "", current_plan: c.plan, current_spend: "₹" + c.monthly_spend + " a month", plan_id: p.id, plan_name: p.name,
  price: p.price, benefit: p.benefit, first_bill: "on 28 November 2026, covering usage from the day of activation" };
