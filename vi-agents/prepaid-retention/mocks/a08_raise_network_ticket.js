// @description A08 Transaction Workflow: raise (or attach to) a network complaint ticket so the service issue is fixed first. Idempotent per customer and issue.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in issue:string "Short description of the service problem in the customer's words"
// @out ticket_ref status sla
const c = customer(input.msisdn);
if (c && c.open_ticket) return { ticket_ref: c.open_ticket.ref, status: "existing_ticket_updated", sla: "within 48 hours" };
return { ticket_ref: ref("TKT", input.msisdn, input.issue), status: "raised", sla: "within 48 hours" };
