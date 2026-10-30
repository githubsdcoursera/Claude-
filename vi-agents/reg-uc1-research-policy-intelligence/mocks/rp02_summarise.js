// @description RP02 Document Summariser: faithful issue-by-issue summary preserving the regulator's question numbering, with what is proposed, impact on telecom service providers and an "impact on Vi" note marked as AI analysis, all deadlines, definitions and cross-references, each with page citations. Low-confidence OCR fields are flagged, never guessed. Superseded documents are labelled with their successor.
// @effect read_only
// @in user:string "Officer user id"
// @in doc_id:string "Document id"
// @out found topic title executive issues deadlines definitions cross_refs flags status_note question_count
const id = String(input.doc_id || "").toUpperCase(), r = docFor(input.user, id);
if (r.state !== "ok") return { found: false };
const d = r.doc;
const issues = (d.questions || []).map(q => q.q + " (p. " + q.page + "): " + q.text + " Proposed: " + q.proposed + ". Impact on TSPs: " + q.impact + ". [AI analysis, for officer review] Impact on Vi: compare with Vi's current position before responding.").join(" ");
const exec = d.questions ? d.title + " issued by " + d.issuer + " on " + longDate(d.issue_date) + " (" + d.pages + " pages) seeks comments on " + d.questions.length + " questions." : d.title + ": " + d.summary;
return { found: true, topic: d.topic, title: d.title, executive: exec, issues: issues || "No consultation questions.", deadlines: d.comments_due ? "Comments due " + longDate(d.comments_due) + "; counter-comments due " + longDate(d.counter_due) + " [cover page]" : (d.ocr_low_confidence ? "Deadline not legible: flagged for the officer" : "No deadline stated"),
  definitions: d.definitions || "none", cross_refs: d.cross_refs || "none", flags: d.ocr_low_confidence ? "Low-confidence OCR, returned as null: " + d.ocr_low_confidence.join("; ") : "", status_note: successorNote(id), question_count: (d.questions || []).length };
