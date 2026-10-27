// @description LG03 AI Partner MoU Drafter & Reviewer: draft mode builds S1-S16 in playbook order with template text for the protective core and [AI Office decision] markers; review mode lists every partner change with quote, Vi playbook position, tier, recommendation (accept/counter/reject/reinstate) and proposed text, recognises partner markup patterns and AI-use evidence, and drafts the note to Vi Legal.
// @effect read_only
// @in doc_id:string "MoU id"
// @out found mode tier playbook table note_to_legal escalate route conditional_note draft binding
const id = String(input.doc_id || "").toUpperCase();
const dr = mouDraft(id);
if (dr) return { found: true, mode: "draft", tier: "N/A", playbook: dr.playbook, table: "", note_to_legal: "Standard: S5, S8-S16 use template text. Partner-specific: S1-S4, S6, S7. Open: S2 narrative, S3 optional section and S8 named leads ([AI Office decision]).", escalate: false, route: "Assigned Legal counsel (Radhika) + AI Office", conditional_note: "",
  draft: dr.sections.map(s => s[0] + ": " + s[1]).join(" || "), binding: dr.binding };
const r = mouReview(id); if (!r) return { found: false };
const table = r.findings.map(f => f.item.replace("change ", "#") + " · " + f.section + " · \"" + f.quote + "\" · " + f.position + " · " + f.tier + (f.conditional ? " (conditional: " + f.condition + ")" : "") + " · " + f.recommend + (f.proposed ? " · Proposed: \"" + f.proposed + "\"" : "") + (f.evidence ? " · Evidence: " + f.evidence : "")).join(" || ");
const acc = r.findings.filter(f => /accept/.test(f.recommend)).map(f => f.item), ctr = r.findings.filter(f => /counter|reject|reinstate/.test(f.recommend)).map(f => f.item + " (" + f.recommend + ")"), ai = r.findings.filter(f => /ai_office/.test(f.recommend)).map(f => f.item);
return { found: true, mode: "review", tier: r.tier, playbook: r.playbook, table: table, escalate: r.escalate, route: r.route, conditional_note: r.conditional_note, draft: "", binding: "",
  note_to_legal: "From AI Office to Vi Legal. Accepted: " + (acc.join(", ") || "none") + ". Counter-proposals: " + (ctr.join(", ") || "none") + ". For Legal judgement: " + (r.findings.filter(f => f.tier === "RED").map(f => f.item).join(", ") || "none") + ". For AI Office / CAIO decision: " + (ai.join(", ") || "none") + "." };
