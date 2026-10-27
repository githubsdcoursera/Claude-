// @description A18 International Roaming: rank eligible IR packs for the country, trip length and usage. Returns verbatim must-say price, inclusion, overage and validity.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in country:string "Destination country name"
// @in days:number "Trip length in days"
// @in usage:string "Declared usage: light, moderate or heavy"
// @out found multi_country top_id top_price top_inclusion top_overage top_validity alt_id alt_price alt_inclusion alt_overage alt_validity
const country = String(input.country || "").toLowerCase();
const many = /,| and |multiple|several/.test(country);
const days = Number(input.days) || 7;
const need = { light: 0.3, moderate: 0.7, heavy: 1.2 }[String(input.usage || "moderate").toLowerCase()] || 0.7;
const fit = P.ir_packs.filter(p => p.countries.some(x => country.includes(x.toLowerCase())))
  .map(p => ({ p, score: (p.days >= days ? 0 : 100) + Math.abs(p.days - days) + Math.max(0, need * days - p.data_gb) * 3 }))
  .sort((a, b) => a.score - b.score).map(x => x.p);
if (!fit.length) return { found: false, multi_country: many };
const t = fit[0], a = fit[1] || {};
return { found: true, multi_country: many, top_id: t.id, top_price: t.price, top_inclusion: t.inclusion, top_overage: t.overage,
  top_validity: t.validity, alt_id: a.id || "", alt_price: a.price || "", alt_inclusion: a.inclusion || "",
  alt_overage: a.overage || "", alt_validity: a.validity || "" };
