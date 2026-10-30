// @description A07 Outreach Planner: fetch the dropped-lead record after ingest and de-duplication; reports whether the lead already converted and the attempt count (max three).
// @effect read_only
// @in msisdn:string "10-digit mobile number on the lead"
// @out found lead_id status duplicate attempts callable
const c = customer(input.msisdn);
if (!c || !c.lead) return { found: false, lead_id: "", status: "", duplicate: false, attempts: 0, callable: false };
const l = c.lead;
return { found: true, lead_id: l.id, status: l.status, duplicate: l.duplicate, attempts: c.attempts,
  callable: l.status === "dropped" && !l.duplicate && c.attempts < 3 };
