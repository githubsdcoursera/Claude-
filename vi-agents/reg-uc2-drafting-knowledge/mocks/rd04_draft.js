// @description RD04 Drafter + RD05 Review Packager: first draft of a consultation response in regulator numbering (position, rationale, evidence, recommendation) reusing approved Vi language with inline [Doc, para] citations; GAP issues written as options marked [Officer decision required]; STALE positions marked for confirmation. Returns the package label, decision list, closest past submission and the claims for R-CV.
// @effect side_effect
// @in user:string "Officer user id"
// @in doc_id:string "Document being responded to"
// @out found draft_id label draft decisions closest claims
const r = docFor(input.user, String(input.doc_id || "").toUpperCase());
if (r.state !== "ok" || !r.doc.questions) return { found: false };
const d = r.doc, dec = [], claims = [];
const parts = d.questions.map(q => {
  const p = R.positions.find(x => x.topic === d.topic && x.issue === q.q && x.approved && x.status === "current");
  if (!p) { dec.push(q.q); return q.q + ". [Officer decision required] Vi has no prior position. Options: (a) support " + q.proposed + "; (b) oppose it and seek parity with terrestrial access licensing; (c) reserve comments for the counter-comment stage."; }
  const stale = (new Date(R.today) - new Date(p.date)) / (30.44 * 864e5) > 24;
  if (stale) dec.push(q.q + " (confirm stale position)");
  claims.push(p.stance + " [" + p.source + ", para " + p.para + "]");
  return q.q + ". " + p.stance + " [" + p.source + ", para " + p.para + "] The consultation paper proposes " + q.proposed + " (p. " + q.page + "). Recommendation: Vi requests that the Authority align the framework with this position." + (stale ? " [Officer to confirm: position dated " + longDate(p.date) + " is older than 24 months.]" : "");
});
claims.push("comments by 17 November 2026 [" + String(input.doc_id).toUpperCase() + ", p. deadline]");
return { found: true, draft_id: rRef("VIDRAFT", input.doc_id, input.user), label: "AI first draft, for officer review. Not approved for external use.", draft: parts.join(" "),
  decisions: dec.join(", ") || "none", closest: "VI-SUB-SYN-2025-031 (Vi's 2025 submission on satellite gateway licensing): reused positions for Q1 to Q3; Q4 and Q5 come from older submissions; Q6 is new.", claims: claims.join("; ") };
