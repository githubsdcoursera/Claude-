// @description P-RT03 Prepaid Offer Authority: the single strongest retention offer the signed authority matrix allows for this risk band and reason. Returns verbatim must-say text and whether it is chargeable.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in risk_band:string "Lapse-risk band from context: high, medium or low"
// @in reason:string "Churn reason category: network, price, data, service or other"
// @out authorised offer_id must_say chargeable price
const o = P.offer_matrix.find(x => x.risk === input.risk_band && x.reason === input.reason)
  || P.offer_matrix.find(x => x.risk === input.risk_band && x.reason === "price");
if (!o) return { authorised: false, offer_id: "", must_say: "", chargeable: false, price: "" };
return { authorised: true, offer_id: o.offer_id, must_say: o.must_say, chargeable: o.chargeable, price: o.price || "" };
