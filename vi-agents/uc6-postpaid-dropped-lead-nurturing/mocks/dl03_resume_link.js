// @description UC6-DL03 Blocker Resolver (journey.resume_link.create + sms.send): create a signed, single-use, pre-filled resume link at the given journey step, tagged UC6-<campaign> for activation matching, and send it by DLT SMS.
// @effect side_effect
// @in msisdn:string "10-digit mobile number of the lead"
// @in lead_id:string "Lead id from a03_u6_lead_context"
// @in step:string "Journey step to reopen, e.g. plan_selection, kyc, payment, address, upc"
// @in plan_id:string "Plan id the customer chose, or empty"
// @in campaign:string "Campaign id for the attribution tag"
// @out sent link_ref masked_msisdn expiry attribution_tag
const c = customer(input.msisdn);
if (!c) return { sent: false, link_ref: "", masked_msisdn: "", expiry: "", attribution_tag: "" };
return { sent: true, link_ref: ref("RSM", input.lead_id, input.step, input.plan_id || ""), masked_msisdn: "your number ending " + c.msisdn.slice(-4),
  expiry: "48 hours", attribution_tag: "UC6-" + (input.campaign || "UNSET") };
