// @description P-DL02 Recharge/KYC Resolution: diagnose why the journey stopped (KYC or payment) and return the verbatim must-say explanation and fix.
// @effect read_only
// @in msisdn:string "10-digit mobile number"
// @out cause must_say fixable_by_link
const c = customer(input.msisdn);
if (!c || !c.lead) return { cause: "unknown", must_say: "", fixable_by_link: false };
const l = c.lead;
if (l.drop_step === "kyc") return { cause: "kyc_incomplete", fixable_by_link: true,
  must_say: "Your Aadhaar verification didn't complete because the OTP step wasn't finished. It takes about two minutes to complete." };
if (l.drop_step === "payment" && l.payment_status === "failed_no_debit") return { cause: "payment_failed", fixable_by_link: true,
  must_say: "Your payment of " + l.amount + " didn't go through, and no money was deducted from your account." };
return { cause: l.drop_step, fixable_by_link: true, must_say: "" };
