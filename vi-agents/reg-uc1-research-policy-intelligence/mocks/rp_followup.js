// @description RP05 follow-up: answer the officer's follow-up question about a document strictly from its extracted content (a question number, the deadlines or the definitions), with the page citation.
// @effect read_only
// @in user:string "Officer user id"
// @in doc_id:string "Document id the conversation is about"
// @in question:string "Q1-Q6, deadline or definitions"
// @out answered answer
const id = String(input.doc_id || "").toUpperCase(), r = docFor(input.user, id);
if (r.state !== "ok") return { answered: false, answer: "Please name the document first." };
const d = r.doc, k = String(input.question || "");
const q = (d.questions || []).find(x => x.q === k.toUpperCase());
if (q) return { answered: true, answer: q.q + " (" + id + ", p. " + q.page + ") asks: " + q.text + " The paper proposes " + q.proposed + "." };
if (k === "deadline") return { answered: true, answer: d.comments_due ? "Comments are due " + longDate(d.comments_due) + " and counter-comments " + longDate(d.counter_due) + " [" + id + ", cover page]." : "No legible deadline in " + id + "; flagged for the officer." };
if (k === "definitions") return { answered: true, answer: (d.definitions || "No new definitions") + " [" + id + "]." };
return { answered: false, answer: "That isn't covered by the extracted content of " + id + "; I can't answer it from the sources." };
