// @description RD06 Knowledge Curator: when the U2-2 approver files an approved final, update the position register (new current position, old one superseded, source linked). Anyone else is refused; positions are never marked approved without the approver's recorded decision.
// @effect side_effect
// @in user:string "User filing the final"
// @in draft_id:string "Draft id"
// @out filed message
const u = R.users[input.user];
if (!u || !u.approver) return { filed: false, message: "Not filed. Only the Head, Regulatory (U2-2 approver) can declare an approved Vi position; your request has been logged." };
return { filed: true, message: input.draft_id + " filed as the approved final by " + u.name + ". Position register updated: POS-SYN-SAT-2026-Q1 to POS-SYN-SAT-2026-Q5 are now current; POS-SYN-SAT-2025, POS-SYN-SAT-2025-P, POS-SYN-SAT-2025-T, POS-SYN-SEC-2023 and POS-SYN-ROL-2022 are marked superseded and linked to " + input.draft_id + ". The final is indexed in the knowledge layer." };
