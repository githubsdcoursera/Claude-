// @description A19/A39/A49 Monthly reconciliation summary: for one billing period across all sites, billed vs expected totals, overbilled and underbilled value, every exception with site, component, reason and INR, and document gaps.
// @effect read_only
// @in period:string "Billing period YYYY-MM"
// @out found sites lines billed_total expected_total overbilled_total underbilled_total exception_count exceptions docs_incomplete freeze_version
const p = input.period;
if (T.periods.indexOf(p) < 0) return { found: false };
const r = allResults().filter(x => x.period === p);
const ex = r.filter(x => x.classification !== "MATCH");
const sum = f => r.reduce((a, x) => a + f(x), 0);
const docs = Object.keys(T.docs_missing).filter(k => k.endsWith("|" + p)).map(k => k.split("|")[0]);
return { found: true, sites: new Set(r.map(x => x.site)).size, lines: r.length, billed_total: inr(sum(x => x.billed)), expected_total: inr(sum(x => x.expected)),
  overbilled_total: inr(sum(x => (x.classification === "OVERBILLED" || x.classification === "DUPLICATE") ? x.variance : 0)),
  underbilled_total: inr(-sum(x => x.classification === "UNDERBILLED" ? x.variance : 0)), exception_count: ex.length,
  exceptions: ex.map(x => x.site + " " + x.component + " " + x.reason + " " + inr(x.variance)).join("; ") || "none",
  docs_incomplete: docs.join(", ") || "none", freeze_version: "MIF-SYN-" + p + "-v1 (frozen)" };
