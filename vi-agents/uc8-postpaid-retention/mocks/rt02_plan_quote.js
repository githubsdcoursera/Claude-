// @description UC8-RT02 (plan.change.quote): the exact read-back for a plan change: old plan, new plan, monthly rental and effective date (start of the next bill cycle, no pro-rata charge).
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @in plan_id:string "Target plan id from rt02_plan_fit"
// @out found old_plan new_plan rental effective_date
const c = customer(input.msisdn);
const u = c && c.uc8;
const C = P.postpaid_catalogue;
const np = C.plans.find(p => p.id === input.plan_id);
if (!u || !np) return { found: false };
const cur = C.plans.find(p => p.id === u.plan_id);
const eff = u.billing_cycle_day + (u.billing_cycle_day % 10 === 1 && u.billing_cycle_day !== 11 ? "st" : u.billing_cycle_day % 10 === 2 && u.billing_cycle_day !== 12 ? "nd" : u.billing_cycle_day % 10 === 3 && u.billing_cycle_day !== 13 ? "rd" : "th") + " November 2026";
return { found: true, old_plan: cur.name, new_plan: np.name, rental: np.rental, effective_date: eff };
