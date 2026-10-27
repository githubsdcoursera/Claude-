// @description A13 Plans & Data: current prepaid plans and data add-ons from the approved catalogue for the customer's need. Returns verbatim must-say price, benefit and validity.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in need:string "What the customer wants: recharge, more_data or cheaper"
// @out found plan_id price benefit validity addon_id addon_price addon_benefit
const c = customer(input.msisdn);
if (!c) return { found: false };
let p = P.prepaid_plans.find(x => c.plan && c.plan.startsWith(x.price)) || P.prepaid_plans[0];
if (input.need === "more_data") p = P.prepaid_plans.find(x => x.data_per_day >= 2) || p;
if (input.need === "cheaper") p = P.prepaid_plans.find(x => x.id === "RC-199") || p;
return { found: true, plan_id: p.id, price: p.price, benefit: p.benefit, validity: p.validity,
  addon_id: "DP-19", addon_price: "₹19", addon_benefit: "1 GB extra data valid for today" };
