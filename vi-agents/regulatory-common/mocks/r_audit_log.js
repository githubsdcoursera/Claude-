// @description R-GOV Governance & Audit: log the action, user, sources, outcome code and approvals to the 12-month online audit trail.
// @effect side_effect
// @in user:string "User id"
// @in disposition:string "Outcome code"
// @in object:string "Object id (document, draft, obligation, mail)"
// @in detail:string "What happened"
// @out written audit_id
return { written: true, audit_id: rRef("AUD", input.user || "", input.disposition || "", input.object || "", R.today) };
