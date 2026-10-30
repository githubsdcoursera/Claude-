// ---- Deterministic Tower Co calculation engine (rule book TCRB-SYN-1.0, calc TCCALC-1.0) ----
// Rates, escalation and dates come only from the agreement and the Digital Twin; nothing is estimated.
const RULE_VERSION = "TCRB-SYN-1.0", CALC_VERSION = "TCCALC-1.0", TOLERANCE = 1;
const COMP = ["RENT", "LOADING", "ENERGY_EB"];
const CITE = {
  RENT: "Schedule B cl. 4.1 base infrastructure fee", ESC: "Schedule B cl. 4.3 annual escalation", LOADING: "Schedule C cl. 2.2 loading rate per unit",
  ENERGY_EB: "Schedule D cl. 3.1 EB passthrough at actuals", BILLABLE: "cl. 5.2 billable from RFS", EXIT: "cl. 9.4 no charges after exit", NON_BTS: "Schedule D cl. 3.6 non-BTS sites not billable",
};
function cite(k) { return T.agreement.id + " " + T.agreement.version + ", " + CITE[k] + " (synthetic clause reference)"; }
function siteId(n) { return "MHGOA-SYN-" + String(n).padStart(4, "0"); }
function normSite(s) { const m = String(s || "").toUpperCase().match(/(\d{1,4})\s*$/); return m ? siteId(Number(m[1])) : ""; }
function inr(x) {
  const neg = x < 0; const s = String(Math.round(Math.abs(x)));
  let last = s.slice(-3); let rest = s.slice(0, -3);
  if (rest) last = "," + last;
  rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return (neg ? "-" : "") + "₹" + rest + last;
}
function day(d) { const [y, m, dd] = d.split("-").map(Number); return Date.UTC(y, m - 1, dd) / 86400000; }
function daysIn(p) { const [y, m] = p.split("-").map(Number); return new Date(Date.UTC(y, m, 0)).getUTCDate(); }
function periodStart(p) { return p + "-01"; }
function periodEnd(p) { return p + "-" + String(daysIn(p)).padStart(2, "0"); }
function siteStatus(s, p) {
  const t = T.sites[s];
  if (!t) return "unknown";
  if (t.rfs > periodEnd(p)) return "pre_rfs";
  if (t.exit && t.exit < periodStart(p)) return "exited";
  if (t.non_bts_from && t.non_bts_from <= periodStart(p)) return "non_bts";
  return "active";
}
function activeFraction(s, p) {
  const t = T.sites[s]; let from = day(periodStart(p)), to = day(periodEnd(p));
  from = Math.max(from, day(t.rfs));
  if (t.exit) to = Math.min(to, day(t.exit));
  if (t.non_bts_from) to = Math.min(to, day(t.non_bts_from) - 1);
  return to < from ? 0 : (to - from + 1) / daysIn(p);
}
function escalations(p) {
  const a = T.agreement; let n = 0;
  for (let y = Number(a.effective_from.slice(0, 4)) + 1; y <= Number(p.slice(0, 4)); y++) {
    const d = y + "-" + a.anniversary;
    if (d > a.effective_from && d <= periodStart(p)) n++;
  }
  return n;
}
function expectedLine(s, comp, p) {
  const t = T.sites[s], a = T.agreement, f = activeFraction(s, p), pi = T.periods.indexOf(p);
  if (comp === "RENT") {
    const n = escalations(p), factor = Math.pow(1 + a.escalation_pct / 100, n), amt = Math.round(a.base_rent * factor * f * 100) / 100;
    return { amount: amt, math: inr(a.base_rent) + " × " + factor.toFixed(4).replace(/0+$/, "").replace(/\.$/, "") + " (" + n + " escalation" + (n === 1 ? "" : "s") + " at " + a.escalation_pct + "%) × " + f.toFixed(2) + " active = " + inr(amt), cite: cite("RENT") + "; " + cite("ESC") };
  }
  if (comp === "LOADING") {
    const amt = Math.round(t.clt_qty * a.loading_rate * f * 100) / 100;
    return { amount: amt, math: t.clt_qty + " units (frozen CLT) × " + inr(a.loading_rate) + " × " + f.toFixed(2) + " active = " + inr(amt), cite: cite("LOADING") };
  }
  const eb = pi >= 0 ? t.eb[pi] : 0, amt = f > 0 ? eb : 0;
  return { amount: amt, math: f > 0 ? "validated EB bill " + t.consumer + " = " + inr(amt) : "site not billable this period = " + inr(0), cite: cite("ENERGY_EB") };
}
function lineObj(L) {
  return { line_id: "LINE-SYN-" + L[0], invoice_id: "INV-SYN-" + L[1], site: siteId(L[2]), component: COMP[L[3]], period: T.periods[L[4]],
    quantity: L[5], rate: L[6], billed: L[7], label: L[8], golden_expected: L[9], golden_class: L[10] };
}
function reconcileLine(L, idx) {
  const o = lineObj(L), a = T.agreement;
  const dup = T.lines.slice(0, idx).some(M => M[2] === L[2] && M[3] === L[3] && M[4] === L[4] && M[1] !== L[1]);
  const e = expectedLine(o.site, o.component, o.period);
  const v = Math.round((o.billed - e.amount) * 100) / 100;
  let cls = "MATCH", reason = "MATCH";
  const st = siteStatus(o.site, o.period);
  if (dup) { cls = "DUPLICATE"; reason = "DUPLICATE_LINE"; }
  else if (Math.abs(v) > TOLERANCE) {
    cls = v > 0 ? "OVERBILLED" : "UNDERBILLED";
    if (o.billed > 0 && e.amount === 0 && st === "pre_rfs") reason = "PREMATURE_BILLING";
    else if (o.billed > 0 && e.amount === 0 && st === "exited") reason = "POST_EXIT_BILLING";
    else if (o.billed > 0 && e.amount === 0 && st === "non_bts") reason = "NON_BTS_BILLING";
    else if (v < 0) reason = "UNDERBILLING";
    else if (o.component === "RENT" && Math.abs(o.billed - e.amount * (1 + a.escalation_pct / 100)) <= TOLERANCE) reason = "DOUBLE_ESCALATION";
    else if (o.component === "LOADING") reason = "LOADING_QTY_VARIANCE";
    else if (o.component === "ENERGY_EB") reason = "EB_AMOUNT_MISMATCH";
    else reason = "RATE_VARIANCE";
  }
  return Object.assign(o, { expected: dup ? 0 : e.amount, variance: dup ? o.billed : v, classification: cls, reason: reason, math: e.math, cite: e.cite });
}
const REASON_TEXT = {
  PREMATURE_BILLING: "billed before RFS", POST_EXIT_BILLING: "billed after site exit", NON_BTS_BILLING: "billed for a non-BTS site",
  DOUBLE_ESCALATION: "escalation applied twice; only one approved escalation applies", LOADING_QTY_VARIANCE: "loading billed above the frozen CLT quantity",
  EB_AMOUNT_MISMATCH: "EB amount differs from the electricity bill", UNDERBILLING: "billed below the expected amount (vendor-favourable variance for Vi)",
  DUPLICATE_LINE: "duplicate site-period line, excluded from the payable baseline", RATE_VARIANCE: "rate differs from the rule book",
};
function sitePeriod(s, p) {
  const out = [];
  T.lines.forEach((L, i) => { if (siteId(L[2]) === s && T.periods[L[4]] === p) out.push(reconcileLine(L, i)); });
  return out;
}
function allResults() { return T.lines.map((L, i) => reconcileLine(L, i)); }
function refOf(prefix, ...parts) {
  let h = 0; for (const ch of parts.join("|")) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return prefix + "-" + h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}
