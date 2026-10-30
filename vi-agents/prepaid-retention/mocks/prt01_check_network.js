// @description P-RT01 Prepaid Root Cause: check network and service health for the customer's area (outages, known issues, open tickets).
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out known_issue area status eta
const c = customer(input.msisdn);
const n = c && c.network_issue;
return n ? { known_issue: true, area: n.area, status: n.status, eta: n.eta } : { known_issue: false, area: "", status: "normal", eta: "" };
