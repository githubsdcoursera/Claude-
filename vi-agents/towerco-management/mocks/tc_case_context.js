// @description A00/A17 Digital Twin: site-period case context from the frozen monthly input: billability status, agreement and rule version, tower company, invoices and freeze version.
// @effect read_only
// @in site_id:string "Site id, e.g. MHGOA-SYN-0003"
// @in period:string "Billing period YYYY-MM"
// @out found case_ref status status_label agreement tower_company rule_version invoices freeze_version line_count
const s = normSite(input.site_id), p = String(input.period || "");
const t = T.sites[s];
if (!t || T.periods.indexOf(p) < 0) return { found: false, case_ref: "", status: "", status_label: "", agreement: "", tower_company: "", rule_version: RULE_VERSION, invoices: "", freeze_version: "", line_count: 0 };
const st = siteStatus(s, p);
const label = { active: "active and billable", pre_rfs: "not yet ready for service (RFS " + t.rfs + ")", exited: "exited on " + t.exit, non_bts: "non-BTS from " + t.non_bts_from }[st];
const lines = sitePeriod(s, p);
return { found: true, case_ref: "CASE-" + s + "-" + p, status: st, status_label: label, agreement: T.agreement.id + " " + T.agreement.version, tower_company: T.agreement.tower_company,
  rule_version: RULE_VERSION, invoices: Array.from(new Set(lines.map(x => x.invoice_id))).join(", "), freeze_version: "MIF-SYN-" + p + "-v1 (frozen)", line_count: lines.length };
