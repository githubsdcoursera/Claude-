// @description A14 VAS & Complaints: deactivate a value-added service. Needs explicit consent and a verified OTP (unless strongly authenticated). Idempotent.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in vas_id:string "VAS id from a14_list_vas"
// @in consent_ref:string "Reference from a08_record_consent"
// @in otp_ref:string "Verified OTP reference, or STRONG_AUTH"
// @in idempotency_key:string "Unique key for this change"
// @out success deact_ref effective error_code
/* @abl
process:
  before:
    require:
      - params.consent_ref != ""
      - params.otp_ref != ""
    on_fail: block("Deactivation needs recorded consent and a verified OTP.")
*/
const c = customer(input.msisdn);
const ok = c && (c.vas || []).some(v => v.id === input.vas_id);
return ok ? { success: true, deact_ref: ref("VDX", input.idempotency_key), effective: "immediately", error_code: "" }
          : { success: false, deact_ref: "", effective: "", error_code: "VAS_NOT_ACTIVE" };
