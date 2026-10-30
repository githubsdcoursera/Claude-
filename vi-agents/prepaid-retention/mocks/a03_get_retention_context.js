// @description A03 Customer Context: current prepaid plan, recharge pattern, days to expiry, open tickets and lapse-risk band (validated 30-day model).
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out found first_name plan days_to_expiry last_recharge avg_recharge risk_band open_ticket_ref open_ticket_issue
const c = customer(input.msisdn);
if (!c) return { found: false };
return { found: true, first_name: c.first, plan: c.plan, days_to_expiry: c.days_to_expiry, last_recharge: c.last_recharge,
  avg_recharge: "₹" + c.avg_recharge, risk_band: c.lapse_risk, open_ticket_ref: c.open_ticket ? c.open_ticket.ref : "",
  open_ticket_issue: c.open_ticket ? c.open_ticket.issue : "" };
