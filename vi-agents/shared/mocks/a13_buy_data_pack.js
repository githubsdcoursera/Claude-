// @description A13 Plans & Data: buy a data add-on from main balance. Money change, so it needs explicit consent and a verified OTP (unless strongly authenticated). Idempotent.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in addon_id:string "Add-on id from a13_get_plans"
// @in consent_ref:string "Reference from a08_record_consent"
// @in otp_ref:string "Verified OTP reference, or STRONG_AUTH for a strongly authenticated session"
// @in idempotency_key:string "Unique key for this purchase"
// @out success order_ref error_code
/* @abl
process:
  before:
    require:
      - params.consent_ref != ""
      - params.otp_ref != ""
      - params.idempotency_key != ""
    on_fail: block("A purchase needs recorded consent, a verified OTP and an idempotency key.")
*/
const c = customer(input.msisdn);
if (!c) return { success: false, order_ref: "", error_code: "NOT_FOUND" };
const bal = parseFloat(String(c.balance || "0").replace(/[^0-9.]/g, ""));
if (bal < 19) return { success: false, order_ref: "", error_code: "INSUFFICIENT_BALANCE" };
return { success: true, order_ref: ref("DPO", input.idempotency_key), error_code: "" };
