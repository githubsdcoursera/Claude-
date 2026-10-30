// @description A04 Identity & Verification: confirm the called number is the registered billing or authorised contact for the account before any amount is stated.
// @effect read_only
// @in account_id:string "Enterprise account id"
// @in msisdn:string "Number the call connected to"
// @out authorised role
const a = P.enterprise_accounts[String(input.account_id || "").toUpperCase()];
return a && a.billing_contact === String(input.msisdn) ? { authorised: true, role: "registered billing contact" } : { authorised: false, role: "" };
