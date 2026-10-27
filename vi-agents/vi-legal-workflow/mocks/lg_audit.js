// @description LG-AU Audit Logger: record the run, sources, output, reviewer and decision to the legal audit trail.
// @effect side_effect
// @in user:string "User id"
// @in disposition:string "Outcome code"
// @in object:string "Matter or document id"
// @in detail:string "What happened"
// @out written audit_id
let h = 0; for (const ch of [input.user, input.disposition, input.object].join("|")) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
return { written: true, audit_id: "AUD-LG-" + h.toString(36).toUpperCase().slice(0, 7) };
