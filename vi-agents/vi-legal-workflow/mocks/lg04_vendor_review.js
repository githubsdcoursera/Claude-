// @description LG04 Vendor AI Contract Reviewer: AI applicability with the evidence relied on (a "no LLM" claim does not remove it), clause families V1-V14 with quote, Vi position, tier and proposed text, the GRACIE R1-R10 gap list, escalation route, and a 5-line business summary.
// @effect read_only
// @in doc_id:string "Vendor clause set id"
// @out found tier playbook ai_applicable ai_evidence table gracie gaps escalate route business_summary
const r = vendorReview(String(input.doc_id || "").toUpperCase()); if (!r) return { found: false };
const table = r.findings.map((f, i) => (i + 1) + " · " + f.item + " · " + f.ref + " · \"" + f.quote + "\" · " + f.position + " · " + f.tier + (f.proposed ? " · Proposed: \"" + f.proposed + "\"" : "") + (f.note ? " · " + f.note : "")).join(" || ");
return { found: true, tier: r.tier, playbook: r.playbook, ai_applicable: r.ai_applicable, ai_evidence: r.ai_evidence, table: table, gracie: r.gracie, gaps: r.gaps.join(", ") || "none", escalate: r.escalate, route: r.route,
  business_summary: r.tier === "GREEN" ? "Acceptable within the playbook after Legal sign-off." : "Not acceptable as drafted: " + r.findings.filter(f => f.tier !== "GREEN").map(f => f.item).join(", ") + (r.gaps.length ? "; Responsible AI items " + r.gaps.join(", ") + " must be restored" : "") + ". Decision: " + r.route + "." };
