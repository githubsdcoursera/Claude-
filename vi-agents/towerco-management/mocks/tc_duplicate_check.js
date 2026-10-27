// @description A24 Duplicate & Period Integrity: detect duplicate invoices and duplicate site-period lines across invoices; duplicates are excluded from the payable baseline.
// @effect read_only
// @in site_id:string "Site id"
// @in period:string "Billing period YYYY-MM"
// @out duplicates duplicate_lines excluded_amount finding
const d = sitePeriod(normSite(input.site_id), input.period).filter(x => x.classification === "DUPLICATE");
const amt = d.reduce((a, x) => a + x.billed, 0);
return { duplicates: d.length, duplicate_lines: d.map(x => x.line_id + " on " + x.invoice_id).join(", "), excluded_amount: inr(amt),
  finding: d.length ? "Duplicate " + d.map(x => x.component + " line " + x.line_id + " on " + x.invoice_id).join(", ") + " for the same site and period: " + inr(amt) + " excluded from the payable baseline." : "" };
