// @description BPS04 Document Checklist: send the entity-specific document checklist from the approved KYC repository and a secure intake link. Documents are never collected in the conversation.
// @effect side_effect
// @in lead_id:string "Business lead id"
// @in entity:string "pvt_ltd, llp, partnership or proprietorship"
// @out sent checklist link_ref
const rule = P.kyc_rules[String(input.entity || "")];
if (!rule) return { sent: false, checklist: "", link_ref: "" };
return { sent: true, checklist: rule, link_ref: ref("DOC", input.lead_id) };
