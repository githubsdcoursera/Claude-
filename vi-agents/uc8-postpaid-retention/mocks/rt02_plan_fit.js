// @description UC8-RT02 Bill & Plan Fit (usage.summary + kb.plan_search): compare 3-month usage to the current plan and return the best-fit plan from the catalogue, even if cheaper. Downgrade-to-fit is allowed.
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @out found current_plan current_rental usage_summary better_fit fit_plan_id fit_plan_name fit_rental fit_benefits saving catalogue_version
const c = customer(input.msisdn);
const u = c && c.uc8;
const C = P.postpaid_catalogue;
if (!u) return { found: false };
const cur = C.plans.find(p => p.id === u.plan_id);
const fit = C.plans.filter(p => p.data_gb >= u.usage_gb * 1.25 || p.data_gb >= 999).sort((a, b) => Number(a.rental) - Number(b.rental))[0] || cur;
const better = Number(fit.rental) < Number(cur.rental);
return { found: true, current_plan: cur.name, current_rental: cur.rental, usage_summary: "about " + u.usage_gb + " GB of data a month",
  better_fit: better, fit_plan_id: fit.id, fit_plan_name: fit.name, fit_rental: fit.rental, fit_benefits: fit.benefits,
  saving: better ? String(Number(cur.rental) - Number(fit.rental)) : "0", catalogue_version: C.version };
