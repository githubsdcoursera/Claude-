// @description LG05 Execution Checker: run X1-X11 on the execution copy (version, parties, signatory authority, approvals, annexures, defined terms, dates and placeholders, internal material, stamp duty, counterparts, binding clauses) with evidence; a clean copy only if X1, X2, X7 and X8 pass; the e-sign envelope is drafted, never sent.
// @effect read_only
// @in doc_id:string "Document id"
// @in approval_ref?:string "Approval record reference, or empty"
// @out found result checks exceptions clean_copy envelope
const r = executionCheck(String(input.doc_id || "").toUpperCase(), (/^none$/i.test(String(input.approval_ref || "")) ? "" : input.approval_ref || "")); if (!r) return { found: false };
return { found: true, result: r.result, checks: r.checks.join(" | "), exceptions: r.exceptions, clean_copy: r.clean_copy,
  envelope: r.result === "FAIL" || r.result === "NOT_READY" ? "Not prepared until the exceptions are cleared." : "Envelope drafted (signers and order per approval record); not sent. The lawyer or signatory sends it." };
