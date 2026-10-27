// @description RP01 -> RA-UC3 hand-off (obligation.propose): send a Vi-relevant comment deadline from a monitored document to RA-UC3 as a candidate obligation for routing and tracking.
// @effect side_effect
// @in doc_id:string "Document id"
// @in deadline:string "Deadline as extracted"
// @out proposed candidate_id
return { proposed: true, candidate_id: rRef("CAND", input.doc_id || "", input.deadline || "") };
