// @description R-DI Document Intelligence: structured extraction of a document: title, issuer, type, reference, issue date, deadlines, consultation questions with page numbers, definitions and cross-references. Low-confidence OCR fields return null with a flag; never guessed.
// @effect read_only
// @in user:string "Requesting user id"
// @in doc_id:string "Document id"
// @out found doc_id title issuer type issue_date comments_due counter_due question_count questions definitions cross_refs low_confidence status_note
const r = docFor(input.user, String(input.doc_id || "").toUpperCase());
if (r.state !== "ok") return { found: false, doc_id: "", title: "", issuer: "", type: "", issue_date: "", comments_due: "", counter_due: "", question_count: 0, questions: "", definitions: "", cross_refs: "", low_confidence: "", status_note: "" };
const d = r.doc, id = String(input.doc_id).toUpperCase();
return { found: true, doc_id: id, title: d.title, issuer: d.issuer, type: d.type, issue_date: d.issue_date ? longDate(d.issue_date) : "null (flagged: not legible)",
  comments_due: d.comments_due ? longDate(d.comments_due) : "", counter_due: d.counter_due ? longDate(d.counter_due) : "", question_count: (d.questions || []).length,
  questions: questionList(d), definitions: d.definitions || "", cross_refs: d.cross_refs || "", low_confidence: (d.ocr_low_confidence || []).join("; "), status_note: successorNote(id) };
