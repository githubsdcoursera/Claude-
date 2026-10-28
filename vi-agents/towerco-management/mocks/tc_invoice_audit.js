// @description A39/A40 Invoice Audit for uploaded vendor invoices: line arithmetic (qty x rate), invoice totals and tax, contract-rule flags (penalties and late-payment surcharges, rent after exit, arrears and retrospective escalation, pro-rata, rebilled or duplicate periods across invoices), rate-card comparison when the MSA rate card is supplied, and Vi register shadow-bill check for known sites. Returns line results, the recommended hold or DN amount including tax, and the payable amount. Numbers come only from this calculation, never from the model.
// @effect read_only
// @in invoices:string "JSON array of invoices {invoice_no, period, lines:[{site_id, description, qty, rate, amount}], taxable, tax_pct, tax_amount, total}"
// @in rate_card?:string "JSON array of {item, rate} from the MSA rate card, or none"
// @in vendor?:string "Vendor name"
// @out found invoices_count lines exceptions claimed_total hold_total payable_total table findings totals_check report_md dispute_needed
const none = v => { const s = String(v == null ? "" : v).trim(); return !s || s.toLowerCase() === "none" ? "" : s; };
const parse = v => { try { const j = JSON.parse(none(v).replace(/^```(json)?|```$/g, "").trim()); return j; } catch (e) { return null; } };
const num = a => { if (typeof a === "number") return a; const v = Number(String(a == null ? "" : a).replace(/[^0-9.\-]/g, "")); return isFinite(v) && String(a).replace(/[^0-9]/g, "") !== "" ? v : NaN; };
const r2 = x => Math.round(x * 100) / 100;
const money = x => (x < 0 ? "-" : "") + "₹" + Math.abs(r2(x)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
let invs = parse(input.invoices); invs = Array.isArray(invs) ? invs : (invs && invs.invoices) || [];
let rc = parse(input.rate_card); rc = Array.isArray(rc) ? rc : (rc && rc.rate_card) || [];
if (!invs.length) return { found: false, invoices_count: 0, lines: 0, exceptions: 0, claimed_total: "", hold_total: "", payable_total: "", table: "", findings: "No invoices could be read.", totals_check: "", report_md: "", dispute_needed: false };

const comp = d => /(eb|electric|energy passthrough|consumer)/.test(d) ? "EB" : /(diesel|dg fuel)/.test(d) ? "DG_DIESEL" : /(dg o&m|o&m|run hour|hmr)/.test(d) ? "DG_OM" :
  /(load)/.test(d) ? "LOADING" : /(shar)/.test(d) ? "SHARING" : /(rent|ip fee|infra|base)/.test(d) ? "RENT" : "OTHER";
const kw = s => String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2 && !/^(the|and|per|for|with|charge|charges|fee|rate)$/.test(w));
const rateFor = d => { const w = kw(d); let best = null, score = 0;
  rc.forEach(r => { const k = kw(r.item); const s = k.filter(x => w.indexOf(x) >= 0).length; if (s > score && s >= Math.min(2, k.length)) { score = s; best = r; } }); return best; };

const seen = {}, rows = [], findings = [], totals = [];
let claimed = 0, holdTotal = 0, lineCount = 0;
invs.forEach(inv => {
  const ino = none(inv.invoice_no) || "invoice " + (rows.length + 1);
  const per = none(inv.period) || "";
  const pct = num(inv.tax_pct);
  let sum = 0, holdBase = 0;
  (inv.lines || []).forEach((L, i) => {
    lineCount++;
    const d = String(L.description || L.component || "").toLowerCase();
    const site = none(L.site_id || L.site) || "?";
    const q = num(L.qty), rate = num(L.rate), amt = num(L.amount);
    const c = comp(d);
    let status = "OK", reason = "";
    if (!isNaN(q) && !isNaN(rate) && !isNaN(amt) && Math.abs(q * rate - amt) > 1) { status = "AMOUNT_MISMATCH"; reason = "qty " + q + " x rate " + money(rate) + " = " + money(q * rate) + ", billed " + money(amt); }
    else if (/(late payment|surcharge|penalt|interest)/.test(d)) { status = "HOLD"; reason = "late-payment surcharge or penalty: not payable unless an MSA clause provides for it"; }
    else if (/(after (the )?(recorded )?exit|post.exit|after exit)/.test(d)) { status = "HOLD"; reason = "rental after the recorded exit date: hold if the exit evidence is valid (MSA rental principle: exit / deloading)"; }
    else if (/(rebill|re-bill|duplicate|already billed)/.test(d)) { status = "REJECT"; reason = "period rebilled: reject if it was previously billed and paid (MSA energy principle: duplicate / overlap)"; }
    else if (/(arrear|retrospective|back.?dated)/.test(d)) { status = "VERIFY"; reason = "arrear or retrospective escalation: payable only with clause support and the escalation effective date"; }
    else if (/(pro.?rata)/.test(d)) { status = "VERIFY"; reason = "pro-rata correction: confirm the billable days against RFS or exit evidence"; }
    const key = site + "|" + c + "|" + (amt || 0);
    if (status === "OK" && c !== "OTHER" && c !== "SHARING" && seen[key] && seen[key] !== ino) { status = "REJECT"; reason = "same site, charge and amount already billed on " + seen[key]; }
    if (!seen[key]) seen[key] = ino;
    const r = status === "OK" ? rateFor(d) : null;
    if (r && !isNaN(rate) && Math.abs(num(r.rate) - rate) > 0.01) { status = "RATE_MISMATCH"; reason = "rate " + money(rate) + " vs MSA rate card " + money(num(r.rate)) + " (" + r.item + ")"; }
    // Vi register shadow-bill check for known sites
    if (status === "OK" && /^MHGOA-SYN-\d{4}$/i.test(site) && /^20\d\d-\d\d$/.test(per) && T.sites[site.toUpperCase()] && (c === "RENT" || c === "LOADING" || c === "EB")) {
      const e = expectedLine(site.toUpperCase(), c === "EB" ? "ENERGY_EB" : c, per);
      if (Math.abs(e.amount - amt) > TOLERANCE) { status = amt > e.amount ? "OVERBILLED" : "UNDERBILLED"; reason = "Vi shadow bill " + money(e.amount) + " [" + e.math + "]"; }
    }
    if (!isNaN(amt)) sum += amt;
    if ((status === "HOLD" || status === "REJECT" || status === "OVERBILLED") && !isNaN(amt)) holdBase += status === "OVERBILLED" ? amt - expectedLine(site.toUpperCase(), c === "EB" ? "ENERGY_EB" : c, per).amount : amt;
    if (status === "AMOUNT_MISMATCH" && !isNaN(amt)) holdBase += Math.max(0, amt - q * rate);
    rows.push({ inv: ino, site: site, desc: L.description || "", qty: L.qty, rate: rate, amt: amt, status: status, reason: reason });
    if (status !== "OK") findings.push(ino + " " + site + " " + (L.description || c) + ": " + status + " " + money(amt) + " (" + reason + ")");
  });
  sum = r2(sum);
  const tx = num(inv.taxable), ta = num(inv.tax_amount), tot = num(inv.total);
  const chk = [];
  if (!isNaN(tx) && Math.abs(tx - sum) > 0.5) chk.push("lines add up to " + money(sum) + " but taxable value is " + money(tx));
  const base = isNaN(tx) ? sum : tx;
  if (!isNaN(pct) && !isNaN(ta) && Math.abs(r2(base * pct / 100) - ta) > 0.5) chk.push("tax at " + pct + "% should be " + money(base * pct / 100) + ", invoice shows " + money(ta));
  if (!isNaN(tot) && !isNaN(ta) && Math.abs(base + ta - tot) > 0.5) chk.push("taxable + tax = " + money(base + ta) + ", invoice total " + money(tot));
  totals.push(ino + ": " + (chk.length ? chk.join("; ") : "lines, tax and total add up"));
  const invTotal = !isNaN(tot) ? tot : base + (!isNaN(ta) ? ta : (isNaN(pct) ? 0 : r2(base * pct / 100)));
  const hold = r2(holdBase * (1 + (isNaN(pct) ? 0 : pct) / 100));
  claimed += invTotal; holdTotal += hold;
  inv._hold = hold; inv._total = invTotal; inv._no = ino;
});
const ex = rows.filter(r => r.status !== "OK");
const table = rows.map(r => r.inv + " · " + r.site + " · " + r.desc + " · " + money(r.amt) + " · " + r.status).join(" || ");
const md = ["# Summary",
  invs.length + " invoice(s)" + (none(input.vendor) ? " from " + none(input.vendor) : "") + ", " + lineCount + " lines, " + ex.length + " need attention.",
  "Claimed **" + money(claimed) + "**; recommended hold / DN **" + money(holdTotal) + "** (including tax); payable after holds **" + money(claimed - holdTotal) + "**.",
  "## Invoice-level result", "| Invoice | Claimed | Hold / DN | Payable | Totals check |", "|---|---|---|---|---|"]
  .concat(invs.map((v, i) => "| " + [v._no, money(v._total), money(v._hold), money(v._total - v._hold), totals[i].replace(/^[^:]+: /, "")].join(" | ") + " |"))
  .concat(["## Line results", "| Invoice | Site | Description | Amount | Result | Reason |", "|---|---|---|---|---|---|"])
  .concat(rows.map(r => "| " + [r.inv, r.site, r.desc, money(r.amt), r.status, r.reason].join(" | ") + " |"))
  .concat(["## Next steps", "- Lines marked HOLD or REJECT go into a dispute evidence pack and DN proposal; nothing goes to the vendor until a Vi approver confirms it.",
    "- VERIFY lines need the clause and effective-date evidence before payment.", "- Payment release, SAP posting, DN/CN and settlement are human decisions under the Vi DOA."]).join("\n");
return { found: true, invoices_count: invs.length, lines: lineCount, exceptions: ex.length, claimed_total: money(claimed), hold_total: money(holdTotal), payable_total: money(claimed - holdTotal),
  table: table, findings: findings.join(". ") || "No exceptions found.", totals_check: totals.join(". "), report_md: md, dispute_needed: holdTotal > 0 };
