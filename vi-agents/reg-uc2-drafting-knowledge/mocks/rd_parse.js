// @description R00 Supervisor (RA-UC2): read the officer's request and return the intent (draft, memo, lookup, file_final, edits, verify, done, help) with document id, topic, year, draft id, edit depth, reason and claims.
// @effect read_only
// @in text:string "Officer request, verbatim"
// @out intent doc_id topic year draft_id depth reason claims ref
const t = String(input.text || ""), l = t.toLowerCase();
const doc = ((t.match(/([A-Z]+-SYN-[A-Z]+-\d{4}-\d+)/) || [])[1] || "");
const draft = ((t.match(/(VIDRAFT-[A-Z0-9]{7})/i) || [])[1] || "").toUpperCase();
const year = ((l.match(/\b(20\d\d)\b/) || [])[1] || "");
const topic = /(satellite|spectrum assignment)/.test(l) ? "satellite_spectrum" : /(net neutrality|zero.rat|traffic management)/.test(l) ? "net_neutrality" : /(qos|quality of service)/.test(l) ? "quality_of_service" : /(agr|licence fee|license fee)/.test(l) ? "licence_fee" : "";
const depth = ((l.match(/(\d{1,3})\s*%/) || [])[1] || "");
const reason = ((t.match(/reason[:=]?\s*([a-z_ ]+)/i) || [])[1] || "").trim();
let intent = "help";
if (/^\s*(done|exit|thanks|thank you|that's all|thats all)\b/.test(l)) intent = "done";
else if (/^\s*verify/.test(l) || /\[[A-Z0-9-]+[, ]+(para|p\.)/i.test(t)) intent = "verify";
else if (/(record|captur).*edit|edited/.test(l)) intent = "edits";
else if (/(approve|file).*(final)/.test(l)) intent = "file_final";
else if (/(what did we say|what was our position|did we say)/.test(l)) intent = "lookup";
else if (/(memo|note to management|internal note)/.test(l)) intent = "memo";
else if (/(draft|response|counter-comment|reply)/.test(l)) intent = "draft";
// A drafting request handed over by RA-UC3 (UC2REQ-...) drafts the reply to that regulator communication
const reqm = t.match(/\b(UC2REQ-?[A-Z0-9]{5,})/i);
if (reqm) intent = "uc2req";
// Uploaded or pasted document with no corpus id: reviewed by the model step
if (((!doc) || (t.length > 400 || t.split("\n").length > 4)) && ["help","draft","memo","lookup"].indexOf(intent) >= 0 && (t.length > 400 || t.split("\n").length > 4 || /(upload|attach|pasted|(this|attached|uploaded) ([a-z]+ ){0,3}(paper|document|consultation|notification|direction|order|letter|notice|circular|report|file|pdf)|the (attached|uploaded))/.test(l))) intent = "uploaded";
return { intent: intent, ref: reqm ? reqm[1].toUpperCase() : "", doc_id: doc, topic: topic, year: year, draft_id: draft, depth: depth, reason: reason, claims: t.replace(/^\s*verify:?\s*/i, "") };
