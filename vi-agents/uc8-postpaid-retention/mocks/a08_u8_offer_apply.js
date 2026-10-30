// @description A08 Transaction (offer.apply): apply one retention offer from the signed matrix after read-back, explicit yes and a verified OTP. Idempotent; returns the system reference.
// @effect side_effect
// @in msisdn:string "10-digit Vi postpaid number"
// @in offer_id:string "Offer id from rt03_offer_eligible"
// @in consent_ref:string "Reference from a08_record_consent"
// @in otp_ref:string "Verified OTP reference"
// @in idempotency_key:string "Unique key for this change"
// @out success offer_ref error_code
/* @abl
process:
  before:
    require:
      - params.consent_ref != ""
      - params.otp_ref != ""
      - params.idempotency_key != ""
    on_fail: block("An offer needs recorded consent, a verified OTP and an idempotency key.")
*/
const c = customer(input.msisdn);
if (!c || !P.uc8_offers.find(o => o.id === input.offer_id)) return { success: false, offer_ref: "", error_code: "OFFER_NOT_ELIGIBLE" };
return { success: true, offer_ref: ref("OFR", input.idempotency_key), error_code: "" };
