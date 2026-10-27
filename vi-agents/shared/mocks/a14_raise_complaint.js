// @description A14 VAS & Complaints: raise a network or service complaint ticket, or update the existing open one. Idempotent per customer and issue.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in issue:string "Problem in the customer's words"
// @out ticket_ref status sla
const c = customer(input.msisdn);
const t = ((c && c.tickets) || [])[0];
if (t) return { ticket_ref: t.ref, status: "existing_ticket_updated", sla: "within 24 hours" };
return { ticket_ref: ref("TKT", input.msisdn, input.issue), status: "raised", sla: "within 48 hours" };
