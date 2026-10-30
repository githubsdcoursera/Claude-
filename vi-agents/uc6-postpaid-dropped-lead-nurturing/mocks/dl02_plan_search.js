// @description UC6-DL02 Plan & Eligibility (kb.plan_search + kb.eligibility_check): up to two plans from the live postpaid catalogue that fit the stated need, with monthly rental, benefits and deposit line to read verbatim, and the catalogue version.
// @effect read_only
// @in msisdn:string "10-digit mobile number of the lead"
// @in needs:string "Customer's usage needs in their words: lines, data, OTT, roaming"
// @out found error_code catalogue_version eligible plan_1_id plan_1_name plan_1_rental plan_1_benefits plan_1_deposit_line plan_2_id plan_2_name plan_2_rental plan_2_benefits plan_2_deposit_line family_note
const c = customer(input.msisdn);
const C = P.postpaid_catalogue;
const empty = { plan_1_id: "", plan_1_name: "", plan_1_rental: "", plan_1_benefits: "", plan_1_deposit_line: "", plan_2_id: "", plan_2_name: "", plan_2_rental: "", plan_2_benefits: "", plan_2_deposit_line: "", family_note: "" };
if (!c || c.catalogue_fail) return Object.assign({ found: false, error_code: "CATALOGUE_UNAVAILABLE", catalogue_version: "", eligible: false }, empty);
const t = String(input.needs || "").toLowerCase();
const byId = id => C.plans.find(p => p.id === id);
let picks;
const multi = /(two lines|2 lines|three lines|3 lines|family|wife|husband|me and|both of us|two connections|2 connections)/.test(t) || (c.uc6 && c.uc6.lines > 1);
if (multi) picks = [C.family, byId("PP-501")];
else if (/(unlimited|heavy|a lot|lots|100|stream|work from home|hotspot|netflix|prime|hotstar|ott|roaming|travel)/.test(t)) picks = [byId("PP-701"), byId("PP-501")];
else if (/(light|little|not much|mostly calls|only calls|whatsapp|20 ?gb|30 ?gb|40 ?gb|50 ?gb|cheap|low)/.test(t)) picks = [byId("PP-401"), byId("PP-501")];
else picks = [byId("PP-501"), byId("PP-401")];
const out = { found: true, error_code: "", catalogue_version: C.version, eligible: true };
picks.forEach((p, i) => { const k = "plan_" + (i + 1) + "_";
  out[k + "id"] = p.id; out[k + "name"] = p.name; out[k + "rental"] = p.rental; out[k + "benefits"] = p.benefits; out[k + "deposit_line"] = p.deposit_line; });
out.family_note = multi ? "Because you mentioned more than one line, the family plan shares data across both connections on one bill." : "";
return out;
