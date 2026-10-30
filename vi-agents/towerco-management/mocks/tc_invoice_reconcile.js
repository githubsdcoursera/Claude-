// @description A39 Invoice Reconciliation for an uploaded invoice: compare each line read from the vendor invoice with Vi's deterministic expected amount (shadow bill) for that site, component and period; classify MATCH, OVERBILLED, UNDERBILLED, DUPLICATE or NOT_IN_REGISTER with the reason and clause. Numbers come only from the rule book, never from the model.
// @effect read_only
// @in lines:string "JSON array of invoice lines {site_id, period YYYY-MM, component (rent, loading or energy), amount, line_ref}"
// @in invoice_no?:string "Vendor invoice number"
// @in vendor?:string "Vendor name"
// @out found lines matched exceptions billed_total expected_total overbilled underbilled table findings dispute_needed not_in_register sites periods report_md
const none = v => { const s = String(v == null ? "" : v).trim(); return !s || s.toLowerCase() === "none" ? "" : s; };
let rows = [];
try { const j = JSON.parse(none(input.lines).replace(/^```(json)?|```$/g, "").trim()); rows = Array.isArray(j) ? j : (j.lines || []); } catch (e) { rows = []; }
const months = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
const normPeriod = p => { const s = String(p || "").toLowerCase(); const m = s.match(/20\d\d-(0[1-9]|1[0-2])/); if (m) return m[0];
  const n = s.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s,'-]*(20\d\d|\d\d)/); return n ? (n[2].length === 2 ? "20" + n[2] : n[2]) + "-" + months[n[1]] : ""; };
const normComp = c => { const s = String(c || "").toLowerCase();
  return /(energy|eb|electric|power|diesel|fuel)/.test(s) ? "ENERGY_EB" : /(load|additional|tenan|equipment)/.test(s) ? "LOADING" : /(rent|infra|ip fee|site fee|base|tower)/.test(s) ? "RENT" : ""; };
const num = a => { const v = Number(String(a == null ? "" : a).replace(/[^0-9.\-]/g, "")); return isFinite(v) ? v : NaN; };
if (!rows.length) return { found: false, lines: 0, matched: 0, exceptions: 0, billed_total: "", expected_total: "", overbilled: "", underbilled: "", table: "", findings: "No invoice lines could be read.", dispute_needed: false, not_in_register: "", sites: "", periods: "" };

const seen = {}, out = [];
rows.forEach((r, i) => {
  const s = normSite(r.site_id || r.site || ""), p = normPeriod(r.period || r.billing_period || ""), c = normComp(r.component || r.description || r.charge);
  const billed = num(r.amount != null ? r.amount : r.billed);
  const ref = none(r.line_ref || r.line || "") || "line " + (i + 1);
  const o = { ref: ref, site: s || String(r.site_id || r.site || "?"), period: p || String(r.period || "?"), component: c || String(r.component || "?"), billed: billed };
  if (!s || !T.sites[s] || T.periods.indexOf(p) < 0 || !c || isNaN(billed)) {
    o.classification = "NOT_IN_REGISTER"; o.reason = !s || !T.sites[s] ? "site not in Vi's tower register" : T.periods.indexOf(p) < 0 ? "period not in the frozen billing input" : !c ? "charge type not recognised" : "amount not readable";
    o.expected = null; o.variance = null; out.push(o); return;
  }
  const key = s + "|" + c + "|" + p, e = expectedLine(s, c, p), st = siteStatus(s, p), a = T.agreement;
  const v = Math.round((billed - e.amount) * 100) / 100;
  let cls = "MATCH", reason = "MATCH";
  if (seen[key]) { cls = "DUPLICATE"; reason = "DUPLICATE_LINE"; }
  else if (Math.abs(v) > TOLERANCE) {
    cls = v > 0 ? "OVERBILLED" : "UNDERBILLED";
    if (billed > 0 && e.amount === 0 && st === "pre_rfs") reason = "PREMATURE_BILLING";
    else if (billed > 0 && e.amount === 0 && st === "exited") reason = "POST_EXIT_BILLING";
    else if (billed > 0 && e.amount === 0 && st === "non_bts") reason = "NON_BTS_BILLING";
    else if (v < 0) reason = "UNDERBILLING";
    else if (c === "RENT" && Math.abs(billed - e.amount * (1 + a.escalation_pct / 100)) <= TOLERANCE) reason = "DOUBLE_ESCALATION";
    else if (c === "LOADING") reason = "LOADING_QTY_VARIANCE";
    else if (c === "ENERGY_EB") reason = "EB_AMOUNT_MISMATCH";
    else reason = "RATE_VARIANCE";
  }
  seen[key] = true;
  Object.assign(o, { expected: cls === "DUPLICATE" ? 0 : e.amount, variance: cls === "DUPLICATE" ? billed : v, classification: cls, reason: reason, math: e.math, cite: e.cite });
  out.push(o);
});
const known = out.filter(o => o.classification !== "NOT_IN_REGISTER");
const ex = out.filter(o => o.classification !== "MATCH");
const over = known.filter(o => o.classification === "OVERBILLED" || o.classification === "DUPLICATE").reduce((x, o) => x + o.variance, 0);
const under = known.filter(o => o.classification === "UNDERBILLED").reduce((x, o) => x + o.variance, 0);
const table = out.map(o => o.ref + " · " + o.site + " · " + o.period + " · " + o.component + " · billed " + (isNaN(o.billed) ? "?" : inr(o.billed)) + " · expected " + (o.expected == null ? "-" : inr(o.expected)) + " · " + o.classification + (o.reason && o.reason !== "MATCH" ? " (" + (REASON_TEXT[o.reason] || o.reason) + ")" : "")).join(" || ");
const findings = ex.filter(o => o.classification !== "NOT_IN_REGISTER").map(o => o.ref + " " + o.site + " " + o.component + " " + o.period + ": billed " + inr(o.billed) + ", expected " + inr(o.expected) + " [" + o.math + "; " + o.cite + "], " + o.classification + " by " + inr(Math.abs(o.variance)) + " (" + REASON_TEXT[o.reason] + ")").join(". ");
const bt = inr(known.reduce((x, o) => x + o.billed, 0)), et = inr(known.reduce((x, o) => x + o.expected, 0));
const md = ["# Summary",
  "Invoice " + (none(input.invoice_no) || "(number not read)") + (none(input.vendor) ? " from " + none(input.vendor) : "") + ": " + out.length + " lines, " + (out.length - ex.length) + " matched, " + ex.length + " exceptions.",
  "Billed **" + bt + "** against Vi's expected **" + et + "**. Overbilled (incl. duplicates) **" + inr(over) + "**; underbilled **" + inr(Math.abs(under)) + "**.",
  "Rule book " + RULE_VERSION + ", calculator " + CALC_VERSION + ", agreement " + T.agreement.id + " " + T.agreement.version + ".",
  "## Line results", "| Ref | Site | Period | Charge | Billed | Expected | Result | Reason |", "|---|---|---|---|---|---|---|---|"]
  .concat(out.map(o => "| " + [o.ref, o.site, o.period, o.component, isNaN(o.billed) ? "?" : inr(o.billed), o.expected == null ? "-" : inr(o.expected), o.classification, o.reason === "MATCH" ? "" : (REASON_TEXT[o.reason] || o.reason)].join(" | ") + " |"))
  .concat(["## Calculation and clause for each exception"], ex.filter(o => o.classification !== "NOT_IN_REGISTER").map(o => "- " + o.ref + " " + o.component + ": " + (o.classification === "DUPLICATE" ? "same site, charge and period already billed on this invoice" : o.math) + " (" + (o.cite || "") + ")"),
    ["## Recommended next steps", over > TOLERANCE ? "- Hold the disputed amount and prepare a dispute evidence pack; the dispute goes to the vendor only after a Vi approver confirms it." : "- No overbilling found on lines in the register.",
     "- Lines not in Vi's register (" + (out.filter(o => o.classification === "NOT_IN_REGISTER").length) + ") need a manual check.", "- Payment release and any debit note are human decisions."]).join("\n");
return { found: true, report_md: md, lines: out.length, matched: out.length - ex.length, exceptions: ex.length,
  billed_total: inr(known.reduce((x, o) => x + o.billed, 0)), expected_total: inr(known.reduce((x, o) => x + o.expected, 0)),
  overbilled: inr(over), underbilled: inr(Math.abs(under)), table: table, findings: findings || "No variances on the lines found in the register.",
  dispute_needed: over > TOLERANCE, not_in_register: out.filter(o => o.classification === "NOT_IN_REGISTER").map(o => o.ref + " (" + o.reason + ")").join(", ") || "none",
  sites: Array.from(new Set(known.map(o => o.site))).join(", "), periods: Array.from(new Set(known.map(o => o.period))).join(", ") };
