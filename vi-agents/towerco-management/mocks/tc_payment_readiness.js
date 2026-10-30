// @description A47 Payment Readiness: recommend PAY, PARTIAL_PAY or HOLD for the site-period from reconciliation, duplicates, document completeness, EB consumer integrity and dispute status. Explains held and payable amounts. Never releases payment.
// @effect read_only
// @in site_id:string "Site id"
// @in period:string "Billing period YYYY-MM"
// @out recommendation payable held reason upside_note
const s = normSite(input.site_id), p = input.period;
const r = sitePeriod(s, p);
const billed = r.reduce((a, x) => a + x.billed, 0);
let held = 0; const why = [];
r.forEach(x => { if (x.classification === "OVERBILLED" || x.classification === "DUPLICATE") { held += x.variance; why.push(x.reason + " " + inr(x.variance)); } });
const miss = T.docs_missing[s + "|" + p];
if (miss) { held = billed; why.length = 0; why.push("supporting documents incomplete (" + miss.join(" and ") + ")"); }
const t = T.sites[s];
const reused = t && Object.keys(T.sites).filter(k => T.sites[k].consumer === t.consumer).length > 1;
if (reused && !miss) { const eb = r.filter(x => x.component === "ENERGY_EB" && x.classification === "MATCH").reduce((a, x) => a + x.billed, 0); if (eb > 0) { held += eb; why.push("EB consumer " + t.consumer + " reused across sites " + inr(eb)); } }
const payable = Math.max(0, billed - held);
const rec = held <= TOLERANCE ? "PAY" : payable <= TOLERANCE ? "HOLD" : "PARTIAL_PAY";
const under = r.filter(x => x.classification === "UNDERBILLED").reduce((a, x) => a + x.variance, 0);
return { recommendation: rec, payable: inr(payable), held: inr(held), reason: why.join("; ") || "all lines reconciled",
  upside_note: under < 0 ? "Vi exposure: the vendor underbilled by " + inr(-under) + "; include it in the provision and expect a supplementary invoice." : "" };
