// @description A40/A41/A44 Dispute Identification, Evidence Pack and DN Recommendation: de-duplicate against open and closed disputes, then prepare a draft dispute with a clause-cited, checksummed evidence pack and a pre-tax DN recommendation. Never raised with the vendor or posted without human approval.
// @effect side_effect
// @in site_id:string "Site id"
// @in period:string "Billing period YYYY-MM"
// @out created existing dispute_id control_no status evidence_pack dn_amount lines_disputed
const s = normSite(input.site_id), p = input.period;
const r = sitePeriod(s, p).filter(x => x.classification === "OVERBILLED" || x.classification === "DUPLICATE");
const amt = r.reduce((a, x) => a + x.variance, 0);
const prior = T.disputes.find(d => d.site === s && d.period === p);
if (prior) return { created: false, existing: true, dispute_id: prior.id, control_no: prior.control_no, status: prior.status, evidence_pack: "", dn_amount: inr(prior.amount), lines_disputed: r.map(x => x.line_id).join(", ") };
if (amt <= TOLERANCE) return { created: false, existing: false, dispute_id: "", control_no: "", status: "NOT_REQUIRED", evidence_pack: "", dn_amount: inr(0), lines_disputed: "" };
const id = refOf("DRAFT-DSP", s, p, String(amt));
return { created: true, existing: false, dispute_id: id, control_no: "", status: "PENDING_APPROVAL", evidence_pack: refOf("EVP", id) + " (sha256 " + refOf("H", id, "pack").slice(2).toLowerCase() + ")",
  dn_amount: inr(amt), lines_disputed: r.map(x => x.line_id).join(", ") };
