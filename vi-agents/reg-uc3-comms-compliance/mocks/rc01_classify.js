// @description RC01 Inbox Classifier: match the sender to the register, detect spoofed senders claiming to be a regulator, classify issuer, type, topic and urgency, and link replies to existing matters. Confidence below 0.85 or a spoofed sender goes to CX1 human triage.
// @effect read_only
// @in mail_id:string "Inbound mail id"
// @in user:string "User viewing the result"
// @out found issuer sender_verified type topic urgency confidence thread_matter cx1 cx1_reason restricted visible_to_user subject reference
const m = R.inbox[String(input.mail_id || "").toUpperCase()];
if (!m) return { found: false };
const dom = m.from.split("@")[1] || "";
const issuer = R.sender_register[dom] || "";
const urg = { show_cause: "Critical", direction: "High", compliance_reminder: "High", information_request: "Medium", consultation: "Medium", meeting_notice: "Low" }[m.type_hint] || "Medium";
let cx1 = false, why = "";
if (!issuer && m.claims_regulator) { cx1 = true; why = "sender domain " + dom + " is not in the sender register but claims to be " + m.claims_regulator; }
else if (!issuer) { cx1 = true; why = "sender not in the register"; }
return { found: true, issuer: issuer || "unverified", sender_verified: !!issuer, type: m.type_hint, topic: m.topic, urgency: cx1 ? "Needs triage" : urg,
  confidence: cx1 ? 0.3 : 0.95, thread_matter: m.thread_of || "", cx1: cx1, cx1_reason: why, restricted: !!m.restricted, visible_to_user: !m.restricted || ((R.users[input.user] || { groups: [] }).groups.indexOf("agr_restricted") >= 0), subject: m.subject, reference: m.ref };
