// @description R-REF Reference lookup: explain any reference an RA agent returned. A drafting request (UC2REQ-...) resolves to its regulator communication with the full text, obligations and status; an obligation id (OBL-...) to its register entry; an audit, task, notification or draft reference to what that record is and where it is kept. Permission-trimmed.
// @effect read_only
// @in ref:string "Reference as typed, e.g. UC2REQ-1M1ZJP2, AUD-003Z1EB or OBL-SYN-0103"
// @in user:string "Requesting user id"
// @out found kind ref summary text mail_id subject
const raw = String(input.ref || "").toUpperCase().replace(/\s+/g, "");
const m = raw.match(/^([A-Z0-9]+?)-?([A-Z0-9][A-Z0-9-]*)$/);
const u = R.users[input.user] || { groups: [] };
if (!m) return { found: false, kind: "unknown", ref: raw, summary: "I don't recognise that reference.", text: "", mail_id: "", subject: "" };
const prefix = /^UC2REQ/.test(raw) ? "UC2REQ" : (raw.match(/^(AUD|TSK|NTF|DRF|OBL|MAIL)/) || [])[1] || "";
const rest = raw.slice(prefix.length).replace(/^-/, "");
const ref = prefix + "-" + rest;
const days = d => Math.round((new Date(d) - new Date(R.today)) / 864e5);
if (prefix === "UC2REQ") {
  const id = Object.keys(R.inbox).find(k => rRef("UC2REQ", k) === ref);
  if (!id) return { found: false, kind: "drafting_request", ref: ref, summary: "No drafting request " + ref + " exists.", text: "", mail_id: "", subject: "" };
  const x = R.inbox[id];
  const obls = R.obligations.filter(o => o.source === id || (o.mail || "") === id);
  const asks = (x.asks || []).map(a => a.action + " (" + a.para + ", " + (a.date ? "due " + longDate(a.date) : a.body_date ? "due " + longDate(a.body_date) : a.basis) + ")").join("; ");
  const txt = "From: " + x.from + "\nSubject: " + x.subject + "\nReference: " + x.ref + "\nReceived: " + longDate(x.received) + "\n\n" + x.body + (x.attachment_text ? "\n\n" + x.attachment_text : "") + "\n\nObligations registered by RA-UC3: " + (asks || "none");
  return { found: true, kind: "drafting_request", ref: ref, mail_id: id, subject: x.subject,
    summary: "Drafting request " + ref + " covers " + id + " from " + x.from + ": " + x.subject + " (reference " + x.ref + ", received " + longDate(x.received) + "). What it asks: " + (asks || "see the mail") + ". Status: open, waiting for RA-UC2 to prepare the first draft" + (obls.length ? "; obligation " + obls.map(o => o.id + " due " + longDate(o.due)).join(", ") : "") + ". To draft the reply, open RA-UC2 Drafting and type " + ref + ".",
    text: txt };
}
if (prefix === "OBL") {
  const o = R.obligations.find(z => z.id.toUpperCase() === ref || z.id.toUpperCase().replace(/-/g, "") === raw.replace(/-/g, ""));
  if (!o || (o.restricted && u.groups.indexOf(o.group) < 0)) return { found: false, kind: "obligation", ref: ref, summary: "No obligation " + ref + " that you are authorised to see.", text: "", mail_id: "", subject: "" };
  const d = days(o.due);
  return { found: true, kind: "obligation", ref: o.id, mail_id: o.source || "", subject: o.action,
    summary: o.id + ": " + o.action + ". Owner " + R.users[o.owner].name + "; statutory due " + longDate(o.due) + ", internal due " + longDate(o.internal_due) + " (" + (d < 0 ? Math.abs(d) + " days overdue" : d + " days left") + "); status " + o.status + ".", text: "" };
}
const what = { AUD: "an audit-trail record written when that action was logged (who, what, when, outcome)", TSK: "the owner's task created when the obligation was routed",
  NTF: "a notification sent to the named people", DRF: "a reply draft waiting for the named approver's decision", MAIL: "an inbound communication" }[prefix];
if (!what) return { found: false, kind: "unknown", ref: raw, summary: "I don't recognise the reference " + raw + ". References I can explain start with UC2REQ, OBL, AUD, TSK, NTF or DRF.", text: "", mail_id: "", subject: "" };
const tip = prefix === "MAIL" ? " To process it, type INBOUND mail=" + ref + "." : prefix === "DRF" ? " To record the approver's decision, type: approve " + ref + " (approvers only)." :
  " It is kept in the regulatory governance log (R-GOV), not shown entry by entry in this chat; nothing more needs to be done with it here.";
return { found: true, kind: prefix.toLowerCase(), ref: ref, mail_id: "", subject: "", summary: ref + " is " + what + "." + tip, text: "" };
