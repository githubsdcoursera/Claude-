// @description A14 VAS & Complaints: network status for the customer's area and any open complaint ticket.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out known_issue area status eta open_ticket_ref
const c = customer(input.msisdn);
const n = c && c.network_issue;
const t = ((c && c.tickets) || [])[0] || {};
return { known_issue: !!n, area: n ? n.area : "", status: n ? n.status : "normal", eta: n ? n.eta : "", open_ticket_ref: t.ref || "" };
