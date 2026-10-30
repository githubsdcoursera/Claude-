// @description A01/A02 Order Lifecycle and RFAI/RFS Evidence: billable-from date, exit and non-BTS dates from the order record. Milestones not in the record are reported as missing, never inferred.
// @effect read_only
// @in site_id:string "Site id"
// @in period:string "Billing period YYYY-MM"
// @out found rfs_date billable_from exit_date non_bts_from active_fraction evidence_note
const s = normSite(input.site_id), t = T.sites[s];
if (!t) return { found: false, rfs_date: "", billable_from: "", exit_date: "", non_bts_from: "", active_fraction: 0, evidence_note: "" };
return { found: true, rfs_date: t.rfs, billable_from: t.rfs, exit_date: t.exit || "", non_bts_from: t.non_bts_from || "",
  active_fraction: T.periods.indexOf(input.period) >= 0 ? activeFraction(s, input.period) : 0,
  evidence_note: "Billable from RFS per " + cite("BILLABLE") + ". SR, SP, SO and RFAI milestones are not in the synthetic package and were not inferred." };
