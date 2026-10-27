// @description A11 Post-Call: arm IR usage alerts at 50%, 80% and 100% of pack data for the activated pack.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in pack_id:string "Activated IR pack id"
// @out armed thresholds
return { armed: true, thresholds: "50%, 80%, 100%" };
