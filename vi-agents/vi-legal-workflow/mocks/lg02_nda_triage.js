// @description LG02 NDA Triager: check every Vi NDA playbook item (N1-N16) with clause ref and exact quote, tier GREEN/YELLOW/RED (overall = worst item), hidden-term sweep, Vi fallback text from the clause library, a 5-line business summary without internal fallbacks, and a privileged lawyer note.
// @effect read_only
// @in doc_id:string "NDA id"
// @out found tier playbook table hidden business_summary lawyer_note escalate ai_flag
const r = ndaTriage(String(input.doc_id || "").toUpperCase()); if (!r) return { found: false };
const nonG = r.findings.filter(f => f.tier !== "GREEN");
const table = r.findings.map((f, i) => (i + 1) + " · " + f.item + " · " + f.ref + " · \"" + f.quote + "\" · " + f.position + " · " + f.tier + (f.proposed ? " · Proposed: \"" + f.proposed + "\"" : "")).join(" || ");
return { found: true, tier: r.tier, playbook: r.playbook, table: table, hidden: r.hidden,
  business_summary: r.tier === "GREEN" ? "Can sign as is after Legal sign-off" + (r.vi_paper ? " (Vi mutual template unchanged)" : "") + ". No changes needed." : "Do not sign as is. Changes needed on " + nonG.map(f => f.item).join(", ") + ". Decision: " + (r.tier === "RED" ? "senior counsel / GC" : "Legal counsel with the business owner") + ".",
  lawyer_note: PRIV + " Priorities: " + (nonG.filter(f => f.tier === "RED").map(f => f.item).join(", ") || "none RED") + "; concede first: " + (nonG.filter(f => f.tier === "YELLOW").map(f => f.item).join(", ") || "nothing") + ".", escalate: r.escalate, ai_flag: r.ai_flag };
