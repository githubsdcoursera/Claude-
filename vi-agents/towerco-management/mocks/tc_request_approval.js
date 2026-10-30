// @description Human approval gate: create an approval task for the named approver (dispute confirmation, DN/CN action, SAP posting, payment release or hold, settlement, monthly freeze, rule activation) with the evidence summary. The agent never approves.
// @effect side_effect
// @in gate:string "dispute_confirmation, dn_cn_action, sap_posting, payment_release, settlement, monthly_freeze or rule_activation"
// @in subject:string "Case or invoice reference"
// @in summary:string "Evidence summary for the approver"
// @out approval_id approver status
const roles = { dispute_confirmation: "Network + Finance COE", dn_cn_action: "DOA approver", sap_posting: "Authorised Finance", payment_release: "Authorised Finance",
  settlement: "Business/Finance per DOA", monthly_freeze: "Circle Network + Finance", rule_activation: "SCM + Network + Finance" };
const g = String(input.gate || "payment_release");
return { approval_id: refOf("APR", g, input.subject || ""), approver: roles[g] || "Authorised Finance", status: "PENDING" };
