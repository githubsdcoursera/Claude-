// @description A03 Customer Context: 360 view at S3 - plan, balance, validity, data left, open tickets, active VAS count and the last three contacts.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out found first_name plan circle balance validity data_left open_ticket_ref open_ticket_issue vas_count last_contact_1 last_contact_2 last_contact_3 strong_auth
const c = customer(input.msisdn);
if (!c) return { found: false };
const t = (c.tickets || [])[0] || {};
const lc = c.last_contacts || [];
return { found: true, first_name: c.first, plan: c.plan, circle: c.circle, balance: c.balance || "", validity: c.validity || "",
  data_left: c.data_left || "", open_ticket_ref: t.ref || "", open_ticket_issue: t.issue || "", vas_count: (c.vas || []).length,
  last_contact_1: lc[0] || "", last_contact_2: lc[1] || "", last_contact_3: lc[2] || "", strong_auth: !!c.strong_auth };
