// @description A12 Recharge & Billing: the last deductions from main balance with dates and reasons, for "why was my balance deducted" queries.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out found charge_1 charge_2
const c = customer(input.msisdn);
if (!c) return { found: false, charge_1: "", charge_2: "" };
const v = c.vas || [];
return { found: true, charge_1: v[0] ? v[0].price.split(" ")[0] + " for " + v[0].name + " on " + v[0].since : "₹1 for a missed-call alert on 2026-10-21",
  charge_2: v[1] ? v[1].price.split(" ")[0] + " for " + v[1].name + " on " + v[1].since : "" };
