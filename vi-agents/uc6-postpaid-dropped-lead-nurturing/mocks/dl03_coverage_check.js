// @description UC6-DL03 Blocker Resolver (coverage.check): is Vi postpaid serviceable at the pincode on the lead record. The pincode is read server-side, never spoken.
// @effect read_only
// @in msisdn:string "10-digit mobile number of the lead"
// @out checked serviceable network
const c = customer(input.msisdn);
const l = c && c.uc6;
if (!l) return { checked: false, serviceable: false, network: "" };
return { checked: true, serviceable: !!l.serviceable, network: l.serviceable ? (P.coverage[l.pincode] || "4G") : "" };
