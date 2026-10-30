// @description A25-A27, A30-A33 Shadow Billing: deterministic expected rental (with escalation), loading and energy passthrough for the site-period, with component math and clause citations. No estimation.
// @effect read_only
// @in site_id:string "Site id"
// @in period:string "Billing period YYYY-MM"
// @out found rent_expected rent_math loading_expected loading_math energy_expected energy_math total_expected citations rule_version calc_version
const s = normSite(input.site_id), p = input.period;
if (!T.sites[s] || T.periods.indexOf(p) < 0) return { found: false };
const r = expectedLine(s, "RENT", p), l = expectedLine(s, "LOADING", p), e = expectedLine(s, "ENERGY_EB", p);
return { found: true, rent_expected: inr(r.amount), rent_math: r.math, loading_expected: inr(l.amount), loading_math: l.math, energy_expected: inr(e.amount), energy_math: e.math,
  total_expected: inr(r.amount + l.amount + e.amount), citations: r.cite + "; " + l.cite + "; " + e.cite, rule_version: RULE_VERSION, calc_version: CALC_VERSION };
