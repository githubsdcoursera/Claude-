// @description A03 Customer Context: billing amount, due date, cycle, invoice and payment status for the enterprise account (from billing; payment-gateway webhooks update status).
// @effect read_only
// @in account_id:string "Enterprise account id, e.g. ENT5001"
// @out found company contact_name billing_contact amount_due due_date cycle invoice status days_overdue ptp_max_days
const a = P.enterprise_accounts[String(input.account_id || "").toUpperCase()];
if (!a) return { found: false };
return { found: true, company: a.company, contact_name: a.contact_name, billing_contact: a.billing_contact, amount_due: a.amount_due,
  due_date: a.due_date, cycle: a.cycle, invoice: a.invoice, status: a.status, days_overdue: a.days_overdue, ptp_max_days: a.ptp_max_days };
