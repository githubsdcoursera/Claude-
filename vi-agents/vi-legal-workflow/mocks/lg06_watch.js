// @description LG06 watch mode (weekly, Monday 09:00 IST): items due in 90/60/30/7 days, overdue items and auto-renewal decision alerts (notice window minus 30 days) across the contract register, as of a date. Never sends notices to counterparties.
// @effect read_only
// @in as_of:string "Date YYYY-MM-DD"
// @out count digest
const rows = watch(input.as_of || TODAY);
return { count: rows.length, digest: rows.join(" || ") || "Nothing due in the next 90 days." };
