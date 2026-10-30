// @description A39 Invoice Reconciliation: compare each invoice line with the expected line; classify MATCH, OVERBILLED, UNDERBILLED or DUPLICATE with the variance reason. Reports vendor-favourable and Vi-favourable variances alike.
// @effect read_only
// @in site_id:string "Site id"
// @in period:string "Billing period YYYY-MM"
// @out found lines matched exceptions billed_total expected_total overbilled underbilled findings dispute_needed classification
const r = sitePeriod(normSite(input.site_id), input.period);
if (!r.length) return { found: false, lines: 0, matched: 0, exceptions: 0, billed_total: "", expected_total: "", overbilled: "", underbilled: "", findings: "", dispute_needed: false, classification: "" };
const ex = r.filter(x => x.classification !== "MATCH");
const over = r.filter(x => x.classification === "OVERBILLED" || x.classification === "DUPLICATE").reduce((a, x) => a + x.variance, 0);
const under = r.filter(x => x.classification === "UNDERBILLED").reduce((a, x) => a + x.variance, 0);
const f = ex.map(x => x.component + " " + x.line_id + ": billed " + inr(x.billed) + ", expected " + inr(x.expected) + ", " + x.classification + " by " + inr(Math.abs(x.variance)) + ", " + x.reason + " (" + REASON_TEXT[x.reason] + ")").join(". ");
const cls = ex.length === 0 ? "MATCH" : Array.from(new Set(ex.map(x => x.classification))).join("+");
return { found: true, lines: r.length, matched: r.length - ex.length, exceptions: ex.length, billed_total: inr(r.reduce((a, x) => a + x.billed, 0)),
  expected_total: inr(r.reduce((a, x) => a + x.expected, 0)), overbilled: inr(over), underbilled: inr(Math.abs(under)),
  findings: f ? f + "." : "All " + r.length + " lines match the shadow bill.", dispute_needed: over > TOLERANCE, classification: cls };
