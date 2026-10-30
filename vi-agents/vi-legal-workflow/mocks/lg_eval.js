// @description Evaluation: run every skill on the synthetic fixtures and score against gold_labels.jsonl (tier, must_find, must_not, escalation, dates); any miss on a critical item is a stop-ship.
// @effect read_only
// @in scope:string "all"
// @out total passed critical_misses failures by_skill
const r = evalAll(), by = {};
r.forEach(x => { by[x.skill] = by[x.skill] || [0, 0]; by[x.skill][1]++; if (x.ok) by[x.skill][0]++; });
return { total: r.length, passed: r.filter(x => x.ok).length, critical_misses: r.filter(x => !x.ok && x.critical).length, failures: r.filter(x => !x.ok).map(x => x.id + " (" + x.why + ")").join("; ") || "none",
  by_skill: Object.keys(by).map(k => k + " " + by[k][0] + "/" + by[k][1]).join(", ") };
