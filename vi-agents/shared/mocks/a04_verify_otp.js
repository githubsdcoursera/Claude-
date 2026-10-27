// @description A04 Identity & Verification: verify the OTP the customer read out. MOCK accepts 123456 only.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @in otp_ref:string "Reference returned by a04_send_otp"
// @in otp:string "Digits the customer said"
// @out verified
const digits = String(input.otp || "").replace(/\D/g, "");
return { verified: digits === P.otp_ok && String(input.otp_ref || "").startsWith("OTP-") };
