// @description RP03 Precedent & Comparative Analyst: prior Indian instruments and judgments on the topic (superseded ones labelled with successors), and a comparison table of at least 3 international regulators (jurisdiction, instrument, approach, date, status, source). Binding vs persuasive notes are AI analysis for officer review.
// @effect read_only
// @in user:string "Officer user id"
// @in topic:string "Topic, e.g. satellite_spectrum"
// @out indian international jurisdictions analysis
const ind = Object.keys(R.docs).filter(id => R.docs[id].topic === input.topic && R.docs[id].type !== "consultation" && R.docs[id].type !== "internal_note" && canSee(input.user, R.docs[id]))
  .map(id => { const d = R.docs[id]; return id + " (" + d.issuer + ", " + longDate(d.issue_date) + (d.status === "superseded" ? ", SUPERSEDED by " + d.superseded_by : "") + "): " + d.summary; });
const intl = (R.international[input.topic] || []).map(x => x.jurisdiction + " | " + x.regulator + " | " + x.instrument + " | " + x.approach + " | " + longDate(x.date) + " | " + x.status);
const tdsat = ind.some(x => x.indexOf("TDSAT") === 0);
return { indian: ind.join(" ") || "No Indian instruments found that you are authorised to see.", international: intl.join(" || ") || "No international comparators in the corpus.", jurisdictions: intl.length,
  analysis: "[AI analysis, for officer review] " + (tdsat ? "The TDSAT judgment is binding on the parties to it and persuasive more generally; " : "") + "international approaches are persuasive only." };
