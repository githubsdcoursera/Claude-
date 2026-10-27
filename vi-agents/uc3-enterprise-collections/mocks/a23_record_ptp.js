// @description A23 Payment Follow-up: record a promise-to-pay in SCRM. Rejects dates beyond the account's PTP policy window.
// @effect side_effect
// @in account_id:string "Enterprise account id"
// @in days:number "Days from today the customer promised to pay"
// @out accepted ptp_ref pay_by reason
const a = P.enterprise_accounts[String(input.account_id || "").toUpperCase()];
const d = Number(input.days);
if (!a || !(d >= 0)) return { accepted: false, ptp_ref: "", pay_by: "", reason: "invalid" };
if (d > a.ptp_max_days) return { accepted: false, ptp_ref: "", pay_by: "", reason: "beyond_policy" };
const day = new Date(Date.UTC(2026, 9, 27 + d)).toISOString().slice(0, 10);
return { accepted: true, ptp_ref: ref("PTP", input.account_id, String(d)), pay_by: day, reason: "" };
