// @description RP04 Competitor Position Mapper: per consultation question, each competitor's and industry body's public stance (support, oppose, conditional, silent, unclear) with the key argument and published source, and Vi's current position for alignment. Public sources only; unclear stances are never guessed.
// @effect read_only
// @in doc_id:string "Consultation document id"
// @out found rows stakeholders
const id = String(input.doc_id || "").toUpperCase();
if (!R.stakeholders[id]) return { found: false, rows: "", stakeholders: 0 };
return { found: true, rows: stanceRows(id).join(" "), stakeholders: R.stakeholders[id].length };
