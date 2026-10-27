// @description RD03 Consistency Checker: flag CONFLICT (two approved current positions disagree), DRIFT (requested stance departs from the current position), GAP (no prior position) and STALE (older than 24 months). Conflicts are escalated to the owner and never silently resolved.
// @effect read_only
// @in topic:string "Topic"
// @in doc_id:string "Document being responded to, or empty"
// @in requested:string "Stance the officer asked for, or empty"
// @out flags conflict escalate
const out = []; let conflict = false;
const cur = R.positions.filter(p => p.topic === input.topic && p.approved && p.status === "current");
const byIssue = {};
cur.forEach(p => { (byIssue[p.issue] = byIssue[p.issue] || []).push(p); });
Object.keys(byIssue).forEach(i => { if (byIssue[i].length > 1) { conflict = true; out.push("CONFLICT on " + i + ": " + byIssue[i].map(p => p.id + " (" + longDate(p.date) + ", " + p.source + " para " + p.para + ")").join(" vs ") + "; escalated to the owner, not resolved by the agent"); } });
const d = R.docs[String(input.doc_id || "").toUpperCase()];
if (d && d.questions) d.questions.forEach(q => { if (!byIssue[q.q]) out.push("GAP on " + q.q + ": no prior Vi position"); });
cur.forEach(p => { const months = (new Date(R.today) - new Date(p.date)) / (30.44 * 864e5); if (months > 24) out.push("STALE on " + p.issue + ": " + p.id + " dated " + longDate(p.date) + " is older than 24 months"); });
if (input.requested) cur.forEach(p => { if (input.requested.toLowerCase().indexOf(p.issue.toLowerCase()) >= 0) out.push("DRIFT on " + p.issue + ": the requested stance departs from " + p.id); });
return { flags: out.join(". ") || "No consistency issues.", conflict: conflict, escalate: conflict };
