// @description A08 Transaction Workflow: create the same-SIM, same-number prepaid-to-postpaid migration order and the e-KYC link. Idempotent; needs recorded consent and a verified OTP.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in plan_id:string "Postpaid plan id from a15_get_upgrade_offer"
// @in consent_ref:string "Reference from a08_record_consent"
// @in otp_ref:string "Verified OTP reference"
// @in idempotency_key:string "Unique key for this order"
// @out success order_ref ekyc_link migration_window error_code
/* @abl
process:
  before:
    require:
      - params.consent_ref != ""
      - params.otp_ref != ""
      - params.idempotency_key != ""
    on_fail: block("The migration order needs recorded consent, a verified OTP and an idempotency key.")
*/
const c = customer(input.msisdn);
if (!c || !c.ekyc_ok) return { success: false, order_ref: "", ekyc_link: "", migration_window: "", error_code: "EKYC_UNAVAILABLE" };
return { success: true, order_ref: ref("MIG", input.idempotency_key), ekyc_link: ref("EKYC", input.msisdn), migration_window: "within 24 hours of completing e-KYC", error_code: "" };
