// @description A04 Identity & Verification: send a one-time password to the registered number for a money or plan change.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in purpose:string "What the OTP authorises, e.g. IR pack activation or offer activation"
// @out sent otp_ref
return { sent: !!customer(input.msisdn), otp_ref: ref("OTP", input.msisdn, input.purpose) };
