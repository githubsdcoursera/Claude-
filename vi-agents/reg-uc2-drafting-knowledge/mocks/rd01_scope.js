// @description RD01 Request Scoper: turn the request into a drafting brief: document, draft type, audience, deadline, every consultation question in regulator numbering, and at most 3 clarifying questions where the answer changes the draft.
// @effect read_only
// @in user:string "Officer user id"
// @in doc_id:string "Document being responded to"
// @out found topic title audience deadline draft_type questions clarifying
const r = docFor(input.user, String(input.doc_id || "").toUpperCase());
if (r.state !== "ok" || !r.doc.questions) return { found: false, topic: "", title: "", audience: "", deadline: "", draft_type: "", questions: "", clarifying: "" };
const d = r.doc;
const gaps = d.questions.filter(q => !R.positions.some(p => p.topic === d.topic && p.issue === q.q && p.approved && p.status === "current"));
const clar = gaps.slice(0, 3).map(q => q.q + ": Vi has no prior position on '" + q.text + "'. Take a new position, or reserve comments?");
return { found: true, topic: d.topic, title: d.title, audience: d.issuer, deadline: longDate(d.comments_due) + " (counter-comments " + longDate(d.counter_due) + ")", draft_type: "consultation response",
  questions: d.questions.map(q => q.q).join(", "), clarifying: clar.join(" ") };
