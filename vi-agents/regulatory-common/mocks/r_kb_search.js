// @description R-KB Knowledge Retriever: permission-trimmed hybrid search over the regulatory corpus and Vi position register. Restricted content is never returned to an unauthorised user, not even as a summary; superseded documents are labelled with their successor.
// @effect read_only
// @in user:string "Requesting user id, e.g. officer.asha"
// @in query:string "Search text or topic"
// @out count results
const q = String(input.query || "").toLowerCase();
const terms = q.split(/\W+/).filter(w => w.length > 3);
const hits = Object.keys(R.docs).filter(id => {
  const d = R.docs[id]; if (!canSee(input.user, d)) return false;
  const hay = (id + " " + d.title + " " + d.topic + " " + (d.summary || "")).toLowerCase();
  return terms.some(t => hay.indexOf(t) >= 0) || hay.indexOf(q) >= 0;
}).map(id => { const d = R.docs[id]; return id + " | " + d.title + " | " + d.issuer + " | " + (d.issue_date || "date not legible") + " | " + (successorNote(id) || d.status); });
return { count: hits.length, results: hits.join(" || ") || "No documents you are authorised to see match this search." };
