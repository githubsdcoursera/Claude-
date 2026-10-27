// @description A00 TowerCo Supervisor: validate the request and extract mandatory context (site_id, billing_period, consumer number) and the intent: case, period_summary, provision, consumer_check, golden, policy_block, done or help.
// @effect read_only
// @in text:string "User request or event, verbatim, e.g. RUN_CASE site=MHGOA-SYN-0003 period=2026-06"
// @out intent site_id period consumer action gate
const t = String(input.text || "");
const l = t.toLowerCase();
const months = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
let period = (t.match(/20\d\d-(0[1-9]|1[0-2])/) || [""])[0];
if (!period) { const m = l.match(/(?:^|[^a-z])(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*(20\d\d)?/); if (m) period = (m[2] || "2026") + "-" + months[m[1]]; }
let site = "";
const sm = t.match(/MHGOA-SYN-(\d{4})/i) || l.match(/site\s*(?:no\.?|number|#)?\s*(\d{1,4})(?!\d)/);
if (sm) site = siteId(Number(sm[1]));
const consumer = ((t.match(/CONS-SYN-\d{5}/i) || [""])[0]).toUpperCase();
const pol = l.match(/(release (the )?payment|approve (the )?payment|pay the vendor|make the payment|post (it |this )?(to|in) sap|sap posting|approve (the )?(dn|debit note|cn|credit note)|issue (the )?(dn|debit note)|settle|settlement|send (the )?dispute to (the )?vendor|raise (the )?dispute with (the )?vendor|amend (the )?contract|activate (the )?rule)/);
let intent = "help", action = "", gate = "";
if (pol) { intent = "policy_block"; action = pol[0];
  gate = /sap|post/.test(action) ? "sap_posting" : /(dn|debit|cn|credit)/.test(action) ? "dn_cn_action" : /settle/.test(action) ? "settlement" : /dispute/.test(action) ? "dispute_confirmation" : /(contract|rule)/.test(action) ? "rule_activation" : "payment_release"; }
else if (/^\s*(done|exit|quit|thanks|thank you|that's all|thats all|nothing else|no thanks)\b/.test(l)) intent = "done";
else if (/(golden|regression|accuracy|release gate)/.test(l)) intent = "golden";
else if (consumer) intent = "consumer_check";
else if (site && period) intent = "case";
else if (site && !period) intent = "need_period";
else if (period && /(provision|accrual|month-end|month end)/.test(l)) intent = "provision";
else if (period) intent = "period_summary";
return { intent: intent, site_id: site, period: period, consumer: consumer, action: action, gate: gate };
