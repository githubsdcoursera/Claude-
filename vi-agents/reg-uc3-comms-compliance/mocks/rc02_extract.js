// @description RC02 Obligation Extractor: create one obligation per action with source para, statutory due date and basis, then apply the internal buffer. Deadlines are extracted twice (body rules and attachment/model pass); if the passes disagree, or no deadline or convention is stated, it goes to CX1 and no date is auto-set.
// @effect side_effect
// @in mail_id:string "Inbound mail id"
// @out count created linked dual_check cx1 cx1_reason obligations first_statutory_due first_internal_due
const id = String(input.mail_id || "").toUpperCase(), m = R.inbox[id];
if (!m || !m.asks.length) return { count: 0, created: 0, linked: 0, dual_check: "not_applicable", cx1: false, cx1_reason: "", obligations: "", first_statutory_due: "", first_internal_due: "" };
const out = []; let cx1 = false, why = "", created = 0, linked = 0, first = "", firstInt = "";
m.asks.forEach((a, i) => {
  if (a.linked_obligation) { linked++; out.push(a.action + " (" + a.para + "): linked to existing " + a.linked_obligation + " on matter " + m.thread_of + "; no duplicate created"); return; }
  let due = "", basis = a.basis;
  if (a.days && a.convention === "calendar") due = addDays(m.received, a.days);
  else if (a.days) { cx1 = true; why = "day convention not stated"; }
  else if (a.body_date && a.attachment_date && a.body_date !== a.attachment_date) { cx1 = true; why = "deadline passes disagree: body says " + longDate(a.body_date) + ", attachment says " + longDate(a.attachment_date); }
  else due = a.date || a.body_date || "";
  const oid = "OBL-SYN-" + id.slice(-3) + "-" + (i + 1);
  if (!due) { out.push(oid + ": " + a.action + " (" + a.para + "); deadline: officer to confirm (High priority); no date auto-set"); created++; return; }
  const internal = minusWorking(due, R.internal_buffer_working_days);
  if (!first) { first = longDate(due); firstInt = longDate(internal); }
  out.push(oid + ": " + a.action + " (" + a.para + "); statutory due " + longDate(due) + " (" + basis + (a.days ? ", received " + longDate(m.received) : "") + "); internal due " + longDate(internal));
  created++;
});
return { count: m.asks.length, created: created, linked: linked, dual_check: cx1 ? "disagree" : "agree", cx1: cx1, cx1_reason: why, obligations: out.join(". "), first_statutory_due: first, first_internal_due: firstInt };
