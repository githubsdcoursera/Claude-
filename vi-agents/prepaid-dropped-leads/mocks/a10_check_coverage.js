// @description A10 Knowledge/Search: approved network coverage at the customer's registered pincode, from the coverage source of record. Looks the pincode up server-side so no address data passes through the conversation.
// @effect read_only
// @in msisdn:string "10-digit mobile number"
// @out found coverage
const c = customer(input.msisdn);
const pin = c && c.lead ? c.lead.pincode : "";
const cov = P.coverage[pin];
return cov ? { found: true, coverage: cov } : { found: false, coverage: "" };
