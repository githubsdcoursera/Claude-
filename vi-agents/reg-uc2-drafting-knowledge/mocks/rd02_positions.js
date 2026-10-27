// @description RD02 Position Retriever: Vi's approved positions per issue from the position register, ranked by authority and recency, with earlier and superseded positions labelled and drafts marked as not a Vi position. Permission-trimmed: restricted notes appear only for authorised users.
// @effect read_only
// @in user:string "Officer user id"
// @in topic:string "Topic, e.g. satellite_spectrum"
// @out count positions related_notes
const ps = R.positions.filter(p => p.topic === input.topic).sort((a, b) => b.date.localeCompare(a.date));
const rows = ps.map(p => p.issue + ": " + (p.status === "draft" ? "[DRAFT, not a Vi position] " : p.status === "superseded" ? "[SUPERSEDED by " + p.superseded_by + "] " : "[CURRENT, approved " + longDate(p.date) + "] ") + p.stance + " [" + p.source + ", para " + p.para + "]");
const notes = Object.keys(R.docs).filter(id => R.docs[id].type === "internal_note" && R.docs[id].topic === input.topic && canSee(input.user, R.docs[id])).map(id => id + " [" + R.docs[id].classification.toUpperCase() + "]");
return { count: ps.length, positions: rows.join(" | "), related_notes: notes.join(", ") };
