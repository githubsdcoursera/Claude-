// @description A08 Transaction Workflow: apply the authorised retention offer. Idempotent on idempotency_key. Chargeable offers require a verified OTP.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in offer_id:string "Offer id from prt03_get_offer_authority"
// @in consent_ref:string "Reference from a08_record_consent"
// @in otp_ref?:string "Reference of the verified OTP (required for chargeable offers)"
// @in idempotency_key:string "Unique key for this attempt"
// @out success apply_ref status error_code
/* @abl
process:
  before:
    require:
      - params.consent_ref != ""
      - params.idempotency_key != ""
    on_fail: block("Applying an offer needs recorded consent and an idempotency key.")
*/
const o = P.offer_matrix.find(x => x.offer_id === input.offer_id);
if (!o) return { success: false, apply_ref: "", status: "rejected", error_code: "UNKNOWN_OFFER" };
if (o.chargeable && !String(input.otp_ref || "").startsWith("OTP-")) return { success: false, apply_ref: "", status: "rejected", error_code: "OTP_REQUIRED" };
return { success: true, apply_ref: ref("OFA", input.idempotency_key), status: "applied", error_code: "" };
