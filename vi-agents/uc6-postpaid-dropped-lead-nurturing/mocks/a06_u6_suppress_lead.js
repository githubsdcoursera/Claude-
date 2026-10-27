// @description A06 Compliance: suppress the lead from further UC6 contact (clear decline, wrong party, not serviceable) with the reason.
// @effect side_effect
// @in msisdn:string "10-digit mobile number of the lead"
// @in reason:string "wrong_party, declined, changed_mind, not_serviceable or competitor"
// @out suppressed suppress_ref
return { suppressed: true, suppress_ref: ref("SUP", input.msisdn, input.reason) };
