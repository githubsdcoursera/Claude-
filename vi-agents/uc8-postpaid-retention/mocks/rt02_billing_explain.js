// @description UC8-RT02 Bill & Plan Fit (billing.explain): last bill amount and its main line-item drivers to read verbatim (MS-04), plus a grounded fit hint.
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @out found amount line_items fit_hint
const c = customer(input.msisdn);
const b = c && c.uc8 && c.uc8.bill;
if (!b) return { found: false, amount: "", line_items: "", fit_hint: "" };
return { found: true, amount: b.amount, line_items: b.items, fit_hint: b.fit_hint || "" };
