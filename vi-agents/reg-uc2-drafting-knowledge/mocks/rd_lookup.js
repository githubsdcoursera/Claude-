// @description R-KB / RD02 lookup: "what did we say on X in YEAR": the exact Vi document, paragraph, date and approval status, with any conflicting or later positions noted.
// @effect read_only
// @in user:string "Officer user id"
// @in topic:string "Topic"
// @in year?:string "Year, or empty"
// @out count answer
const ps = R.positions.filter(p => p.topic === input.topic && (!input.year || p.date.startsWith(input.year)));
if (!ps.length) return { count: 0, answer: "I found no Vi document on that topic" + (input.year ? " in " + input.year : "") + " that you are authorised to see." };
return { count: ps.length, answer: ps.map(p => p.source + ", para " + p.para + " (" + longDate(p.date) + ", " + (p.status === "draft" ? "draft, not a Vi position" : p.approved ? "approved, " + p.status : "unapproved") + "): \"" + p.stance + "\"").join(" | ") };
