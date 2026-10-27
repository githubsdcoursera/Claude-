// @description A16 Call Screening: network reputation and VIP check for the caller against the subscriber's rules. Returns vip, spam or unknown.
// @effect read_only
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @in caller:string "Caller's number as presented by the network"
// @out category label caller_name
const c = customer(input.subscriber);
const vip = c && c.assistant && c.assistant.vip.includes(String(input.caller));
const rep = P.caller_reputation[String(input.caller)] || { label: "no reputation data", spam: false, name: "" };
if (vip) return { category: "vip", label: "VIP contact", caller_name: rep.name || "" };
if (rep.spam) return { category: "spam", label: rep.label, caller_name: "" };
return { category: "unknown", label: rep.label, caller_name: "" };
