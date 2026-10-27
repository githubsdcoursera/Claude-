// @description RP05 Research Brief Writer: compose the brief in the approved template (why it matters, key findings, issue summary, precedents, stakeholder map, Vi's past positions and gaps, open questions) and return the factual claims with citations for R-CV verification.
// @effect side_effect
// @in user:string "Officer user id"
// @in doc_id:string "Consultation document id"
// @out found brief_id why findings vi_positions open_questions claims
const id = String(input.doc_id || "").toUpperCase(), r = docFor(input.user, id);
if (r.state !== "ok" || !r.doc.questions) return { found: false };
const d = r.doc;
const vi = d.questions.map(q => { const p = R.positions.find(x => x.topic === d.topic && x.issue === q.q && x.approved && x.status === "current"); return q.q + ": " + (p ? p.id + " [" + p.source + ", para " + p.para + "]" : "GAP, no prior position"); }).join("; ");
const claims = ["the paper asks whether spectrum should be assigned administratively or through auction [" + id + ", p. 38]", "the paper proposes a period of 5 years [" + id + ", p. 47]",
  "comments are due by 17 November 2026 and counter-comments by 1 December 2026 [" + id + ", p. deadline]", "charges must follow the methodology notified at the time of assignment [TDSAT-SYN-2024-118, para 41]"];
return { found: true, brief_id: rRef("BRIEF", id, input.user),
  why: "The paper decides how satellite operators get spectrum for retail services, which sets the cost and obligations of a direct competitor segment to Vi's mobile business.",
  findings: "1. Administrative assignment is proposed for gateway-linked services (p. 38). 2. A revenue-share charge is proposed (p. 41). 3. A 5-year term is proposed (p. 47). 4. Security parity is proposed subject to feasibility (p. 52). 5. No roll-out obligation is proposed (p. 58). 6. A new satellite-to-device authorisation is proposed (p. 63). 7. Comments are due 17 November 2026.",
  vi_positions: vi, open_questions: "Q6 has no Vi position: take one or reserve? Q4 and Q5 rest on positions older than 24 months: reconfirm? Engage Industry Body-X on Q1, where its published stance matches Vi's?",
  claims: claims.join("; ") };
