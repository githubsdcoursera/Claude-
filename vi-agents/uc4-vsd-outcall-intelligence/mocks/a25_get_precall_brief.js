// @description A25 Pre-call Brief: account health, open complaints and prior interactions for the account the VSD agent selected.
// @effect read_only
// @in account_id:string "Account id selected by the VSD agent, e.g. ACC1001"
// @out found customer plan tenure_months health arpu network_score complaint_ref complaint_issue complaint_age_days prior_1 prior_2 pending
const a = P.accounts[String(input.account_id || "").toUpperCase()];
if (!a) return { found: false };
const c = a.open_complaints[0] || {};
return { found: true, customer: a.customer, plan: a.plan, tenure_months: a.tenure_months, health: a.health, arpu: a.arpu,
  network_score: a.network_score, complaint_ref: c.ref || "", complaint_issue: c.issue || "", complaint_age_days: c.age_days || 0,
  prior_1: a.prior[0] || "", prior_2: a.prior[1] || "", pending: a.sign_off_pending };
