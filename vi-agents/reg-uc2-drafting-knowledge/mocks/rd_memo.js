// @description RD04 Drafter (internal memo template): concise cited note to management on a topic from Vi's current approved positions; conflicts are flagged, restricted content is excluded for unauthorised users.
// @effect side_effect
// @in user:string "Officer user id"
// @in topic:string "Topic"
// @out found memo
const ps = R.positions.filter(p => p.topic === input.topic && p.approved && p.status === "current");
if (!ps.length) return { found: false, memo: "" };
const issues = {}; ps.forEach(p => (issues[p.issue] = issues[p.issue] || []).push(p));
const pos = Object.keys(issues).map(i => issues[i].length > 1 ? i + ": CONFLICT between " + issues[i].map(p => p.id).join(" and ") + " (owner to resolve)" : i + ": " + issues[i][0].stance).join("; ");
const memo = R.templates.memo.replace("{{to}}", "Head, Regulatory").replace("{{subject}}", input.topic.replace(/_/g, " ")).replace("{{summary}}", "Current Vi positions on " + input.topic.replace(/_/g, " ") + " for the upcoming discussion")
  .replace("{{position}}", pos).replace("{{sources}}", ps.map(p => p.source + " para " + p.para).join(", "));
return { found: true, memo: memo };
