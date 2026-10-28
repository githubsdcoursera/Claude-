// @description LG00 Legal Supervisor: read the request and return the intent (intake, triage, review, draft, execution, obligations, watch, dpdp, e2e, approve, eval, policy_block, done, help) with the document or matter id and an as-of date.
// @effect read_only
// @in text:string "Request, verbatim"
// @out intent doc_id as_of action doc_kind
const t = String(input.text || ""), l = t.toLowerCase();
const id = ((t.match(/\b(NDA|MOU|VC|DP)-\d{2}\b/i) || [])[0] || "").toUpperCase();
const asof = ((t.match(/(20\d\d-\d\d-\d\d)/) || [])[1]) || TODAY;
const pol = l.match(/(sign (it|this|the)|send (it|this|the) to the (counterparty|vendor|partner)|accept (their|the) terms|send the envelope|agree on vi's behalf)/);
// Pasted document text (long or multi-line, no fixture id) is never read as a command
const pasted = !id && (t.length > 400 || t.split("\n").length > 4);
let intent = "help";
if (/^\s*(done|exit|thanks|thank you|that's all|thats all)\b/.test(l)) intent = "done";
else if (!id && /(draft|generate|create|prepare|write|make)\s+(me\s+)?([a-z.-]+\s+){0,4}?(nda|non.disclosure|contract|agreement|mou|memorandum|msa|sow|statement of work|addendum|amendment)/.test(l)) intent = "new_contract";
else if (pasted) intent = "uploaded";
else if (pol) intent = "policy_block";
else if (/(run (the )?eval|evaluation|gold.label|golden|run the fixtures)/.test(l)) intent = "eval";
else if (/(what is due|due in|watch|digest|renewal watcher)/.test(l)) intent = "watch";
else if (/approve/.test(l) && id) intent = "approve";
else if (/(end.to.end|e2e|full workflow)/.test(l) && id) intent = "e2e";
else if (/execution/.test(l) && id) intent = "execution";
else if (/(obligation|register|renewal)/.test(l) && id) intent = "obligations";
else if (/(intake|new request|log this)/.test(l) && id) intent = "intake";
else if (id && /^DP/.test(id)) intent = "dpdp";
else if (id && /draft/.test(l)) intent = "draft";
else if (id) intent = "review";
// No fixture id: a request about a document the user uploaded or pasted is reviewed by the model step
const kind = /(\bnda\b|non.disclosure|confidentiality agreement)/.test(l) ? "nda" : /(\bmou\b|memorandum|partner)/.test(l) ? "mou" : /(vendor|supplier|msa|master services|ai agreement|saas|licen[cs]e agreement)/.test(l) ? "vendor" : "";
if (intent === "help" && (kind || /(upload|attach|analy[sz]e|triage|review|contract|agreement|document|this (doc|file|draft))/.test(l))) intent = "uploaded";
return { intent: intent, doc_id: id, as_of: asof, action: pol ? pol[0] : "", doc_kind: kind || "unknown" };
