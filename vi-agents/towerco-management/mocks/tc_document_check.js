// @description A22 Document Completeness: check the approved supporting-document checklist for the site-period invoice. Never marks complete from a filename; opens a vendor request for missing items.
// @effect side_effect
// @in site_id:string "Site id"
// @in period:string "Billing period YYYY-MM"
// @out complete missing vendor_request_ref
const s = normSite(input.site_id), miss = T.docs_missing[s + "|" + input.period] || [];
return { complete: miss.length === 0, missing: miss.join(" and "), vendor_request_ref: miss.length ? refOf("VRQ", s, input.period) : "" };
