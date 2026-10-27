// @description A08 Transaction Workflow: provision the IR pack. Idempotent on idempotency_key. Requires consent_ref and a verified OTP.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in pack_id:string "IR pack id from a18_rank_ir_packs"
// @in consent_ref:string "Reference from a08_record_consent"
// @in otp_ref:string "Reference of the verified OTP"
// @in idempotency_key:string "Unique key for this activation attempt"
// @out success order_ref status error_code
/* @abl
process:
  before:
    require:
      - params.consent_ref != ""
      - params.otp_ref != ""
      - params.idempotency_key != ""
    on_fail: block("Activation needs recorded consent, a verified OTP and an idempotency key.")
*/
const c = customer(input.msisdn);
if (!c) return { success: false, order_ref: "", status: "rejected", error_code: "NOT_FOUND" };
if (c.fail_provisioning) return { success: false, order_ref: "", status: "failed", error_code: "PROVISIONING_TIMEOUT" };
return { success: true, order_ref: ref("IRO", input.idempotency_key), status: "active", error_code: "" };
