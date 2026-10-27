// @description LG06 Obligations & Renewal Tracker (extract mode): obligations, key dates, auto-renewal and notice deadlines from the signed text with clause refs and owners; dates depending on unknown events are recorded as triggers for the owner to confirm. Creates register entries and owner confirmation requests.
// @effect side_effect
// @in doc_id:string "Signed document id"
// @out found count entries auto_renewal notice_deadline
const r = obligations(String(input.doc_id || "").toUpperCase()); if (!r || !r.entries.length) return { found: false, count: 0, entries: "", auto_renewal: false, notice_deadline: "" };
return { found: true, count: r.entries.length, entries: r.entries.map(e => e.item + " · " + e.ref + " · " + (e.due ? longD(e.due) : "trigger: " + e.trigger) + " · owner " + e.owner + (e.alert ? " · alert from " + longD(e.alert) : "")).join(" || "),
  auto_renewal: r.auto_renewal, notice_deadline: r.notice_deadline ? longD(r.notice_deadline) : "" };
