// @description A08 Transaction (plan.change.execute): change the postpaid plan after read-back, explicit yes and a verified OTP. Idempotent on the key; returns the system reference.
// @effect side_effect
// @in msisdn:string "10-digit Vi postpaid number"
// @in plan_id:string "Target plan id"
// @in consent_ref:string "Reference from a08_record_consent"
// @in otp_ref:string "Verified OTP reference"
// @in idempotency_key:string "Unique key for this change"
// @out success change_ref error_code
/* @abl
process:
  before:
    require:
      - params.consent_ref != ""
      - params.otp_ref != ""
      - params.idempotency_key != ""
    on_fail: block("A plan change needs recorded consent, a verified OTP and an idempotency key.")
*/
const c = customer(input.msisdn);
if (!c || c.fail_plan_change) return { success: false, change_ref: "", error_code: "BILLING_TIMEOUT" };
return { success: true, change_ref: ref("PCH", input.idempotency_key), error_code: "" };
