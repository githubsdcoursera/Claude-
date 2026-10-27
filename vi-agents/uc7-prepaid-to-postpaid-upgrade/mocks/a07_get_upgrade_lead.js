// @description A07 Outreach Planner: eligible-base record with upgrade propensity and attempt count for the outbound 140-series campaign.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out found propensity attempts callable
const c = customer(input.msisdn);
if (!c || c.segment !== "prepaid" || !c.propensity) return { found: false, propensity: "", attempts: 0, callable: false };
return { found: true, propensity: c.propensity, attempts: c.attempts, callable: c.attempts < 3 };
