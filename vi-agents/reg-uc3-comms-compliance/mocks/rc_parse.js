// @description R00 Supervisor (RA-UC3): read the request or event and return the intent (intake, dashboard, escalations, reassign, approve, replay, done, help) with the mail id, obligation id, target user, view, as-of date and reason.
// @effect read_only
// @in text:string "Request or event, verbatim, e.g. INBOUND mail=MAIL-SYN-001"
// @out intent mail_id obligation_id draft_id target_user view as_of reason
const t = String(input.text || ""), l = t.toLowerCase();
const g = re => ((t.match(re) || [])[1] || "");
const mail = g(/(MAIL-SYN-\d{3})/i).toUpperCase(), obl = g(/(OBL-SYN-[\d-]+)/i).toUpperCase(), draft = g(/(DRF-[A-Z0-9]{7})/i).toUpperCase();
const target = g(/\bto\s+([a-z]+\.[a-z]+)/i).toLowerCase();
const asof = g(/(20\d\d-\d\d-\d\d)/) || R.today;
const reason = g(/(?:because|reason[:=]?)\s+(.+)$/i);
let intent = "help", view = "all";
if (/^\s*(done|exit|thanks|thank you|that's all|thats all)\b/.test(l)) intent = "done";
else if (/replay/.test(l)) intent = "replay";
else if (/reassign/.test(l) && obl) intent = "reassign";
else if (/(approve|send)/.test(l) && draft) intent = "approve";
else if (/escalat/.test(l)) intent = "escalations";
else if (mail) intent = "intake";
else if (/(dashboard|overdue|due this week|my items|awaiting approval|my team|open items)/.test(l)) {
  intent = "dashboard";
  view = /overdue/.test(l) ? "overdue" : /due this week/.test(l) ? "due_this_week" : /awaiting approval/.test(l) ? "awaiting_approval" : /my items/.test(l) ? "my_items" : "all";
}
// Uploaded or pasted document with no corpus id: reviewed by the model step
if (((!mail && !obl && !draft) || (t.length > 400 || t.split("\n").length > 4)) && ["help","dashboard"].indexOf(intent) >= 0 && (t.length > 400 || t.split("\n").length > 4 || /(upload|attach|pasted|(this|attached|uploaded) ([a-z]+ ){0,3}(paper|document|consultation|notification|direction|order|letter|notice|circular|report|file|pdf)|the (attached|uploaded))/.test(l))) intent = "uploaded";
return { intent: intent, mail_id: mail, obligation_id: obl, draft_id: draft, target_user: target, view: view, as_of: asof, reason: reason };
