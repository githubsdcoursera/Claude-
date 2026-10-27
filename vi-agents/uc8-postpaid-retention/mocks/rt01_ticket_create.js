// @description UC8-RT01 / A08 (ticket.create): raise a network or service ticket with the customer's consent, returning the reference and the ticket system's current ETA.
// @effect side_effect
// @in msisdn:string "10-digit Vi postpaid number"
// @in issue:string "Problem in the customer's words"
// @out created ticket_ref eta
return { created: true, ticket_ref: ref("TKT", input.msisdn, input.issue), eta: "within 72 hours" };
