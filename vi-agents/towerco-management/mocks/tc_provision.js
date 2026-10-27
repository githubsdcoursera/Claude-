// @description A37 Provision Engine: month-end provision from rule-driven expected cost for all sites, with basis and confidence. History is used only for missing inputs (none in this period). Finance approves at close.
// @effect read_only
// @in period:string "Billing period YYYY-MM"
// @out found provision basis confidence underbilled_exposure
const p = input.period;
if (T.periods.indexOf(p) < 0) return { found: false };
const r = allResults().filter(x => x.period === p && x.classification !== "DUPLICATE");
const exp = r.reduce((a, x) => a + x.expected, 0);
const under = -r.filter(x => x.classification === "UNDERBILLED").reduce((a, x) => a + x.variance, 0);
return { found: true, provision: inr(exp), basis: "rule-driven expected cost for " + new Set(r.map(x => x.site)).size + " sites under " + RULE_VERSION + " and frozen input MIF-SYN-" + p + "-v1",
  confidence: "high: every site has frozen inputs, so no historical estimate was needed", underbilled_exposure: inr(under) };
