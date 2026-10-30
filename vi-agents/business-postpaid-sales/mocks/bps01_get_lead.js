// @description BPS01 Lead and Compliance: de-duplicated business lead with contact, company, entity type, requested connections and city from CRM.
// @effect read_only
// @in msisdn:string "Lead contact mobile number"
// @out found lead_id contact company entity requested_lines city callable
const l = P.business_leads[String(input.msisdn || "")];
if (!l) return { found: false, callable: false };
return { found: true, lead_id: l.lead_id, contact: l.contact, company: l.company, entity: l.entity, requested_lines: l.requested_lines, city: l.city, callable: l.attempts < 3 };
