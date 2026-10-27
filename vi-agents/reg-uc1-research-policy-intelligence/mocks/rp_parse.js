// @description R00 Supervisor (RA-UC1): read the officer's request and return the intent (brief, summary, precedent, competitor_map, monitor, verify, followup, search, done, help) with document id, topic and question.
// @effect read_only
// @in text:string "Officer request, verbatim"
// @out intent doc_id topic question claims
const t = String(input.text || ""), l = t.toLowerCase();
const doc = ((t.match(/([A-Z]+-SYN-[A-Z]+-[\d-]+)/) || [])[1] || "").replace(/-$/, "");
const topic = /(satellite|spectrum assignment)/.test(l) ? "satellite_spectrum" : /(spectrum sharing)/.test(l) ? "spectrum_sharing" : /(qos|quality of service)/.test(l) ? "quality_of_service" : /(agr|licence fee|license fee)/.test(l) ? "licence_fee" : "";
const q = ((t.match(/\b(Q\d)\b/i) || [])[1] || "").toUpperCase();
let intent = "help";
if (/^\s*(done|exit|thanks|thank you|that's all|thats all)\b/.test(l)) intent = "done";
else if (/^\s*verify/.test(l) || /\[[A-Z0-9-]+[, ]+(para|p\.)/i.test(t)) intent = "verify";
else if (/(new document|new notification|check (the )?sources|monitor|anything new)/.test(l)) intent = "monitor";
else if (/(competitor|stakeholder|industry position|position map)/.test(l)) intent = "competitor_map";
else if (/(precedent|international|comparison|compare|other regulators|jurisdiction)/.test(l)) intent = "precedent";
else if (/(brief|research)/.test(l) && doc) intent = "brief";
else if (/(summar|summary|read)/.test(l) && doc) intent = "summary";
else if (q || /(deadline|definition|due date|cross.ref)/.test(l)) intent = "followup";
else if (/(search|find|look for)/.test(l) || doc) intent = doc ? "summary" : "search";
return { intent: intent, doc_id: doc, topic: topic, question: q || (/(deadline|due date)/.test(l) ? "deadline" : /definition/.test(l) ? "definitions" : ""), claims: t.replace(/^\s*verify:?\s*/i, "") };
