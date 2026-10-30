// @description P-RT02 Recharge Plan Fit: best-fit current prepaid plan for the customer's usage and reason. Returns verbatim must-say price, benefit and validity.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in reason:string "Churn reason category: network, price, data, service or other"
// @out found plan_id price benefit validity
const c = customer(input.msisdn);
if (!c) return { found: false };
let pick = P.prepaid_plans.find(p => "₹" + c.avg_recharge === p.price) || P.prepaid_plans[0];
if (input.reason === "data") pick = P.prepaid_plans.find(p => p.data_per_day >= 2) || pick;
if (input.reason === "price") pick = P.prepaid_plans.find(p => p.id === "RC-479") && c.avg_recharge >= 299 ? P.prepaid_plans.find(p => p.id === "RC-479") : pick;
return { found: true, plan_id: pick.id, price: pick.price, benefit: pick.benefit, validity: pick.validity };
