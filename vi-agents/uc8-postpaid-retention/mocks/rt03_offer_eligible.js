// @description UC8-RT03 Offer Authority (offer.eligible): ranked offers strictly from the signed authority matrix for this customer and root cause, with verbatim terms. Returns at most one top offer and one alternative; R3 (beyond R2, bill credit) is never returned and goes to the retention desk.
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @in root_cause:string "Root cause code from rt01_classify_cause"
// @out found offer_1_id offer_1_tier offer_1_name offer_1_terms offer_1_duration offer_2_id offer_2_tier offer_2_name offer_2_terms offer_2_duration stackable
const c = customer(input.msisdn);
const u = c && c.uc8;
const none = { found: false, offer_1_id: "", offer_1_tier: "", offer_1_name: "", offer_1_terms: "", offer_1_duration: "", offer_2_id: "", offer_2_tier: "", offer_2_name: "", offer_2_terms: "", offer_2_duration: "", stackable: false };
if (!u) return none;
const ok = P.uc8_offers.filter(o => o.band.includes(u.churn_band) && u.tenure_months >= o.min_tenure && o.causes.includes(String(input.root_cause || "")));
if (!ok.length) return none;
const out = Object.assign({}, none, { found: true });
ok.slice(0, 2).forEach((o, i) => { const k = "offer_" + (i + 1) + "_";
  out[k + "id"] = o.id; out[k + "tier"] = o.tier; out[k + "name"] = o.name; out[k + "terms"] = o.terms; out[k + "duration"] = o.duration; });
return out;
