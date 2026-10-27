// @description A02 Supervisor: log a negative-sentiment turn and return the running count. Two negative turns in a call trigger the universal handoff rule.
// @effect side_effect
// @in msisdn:string "10-digit mobile number"
// @in count:string "Negative-sentiment turns so far in this call"
// @in phrase:string "What the customer said, verbatim"
// @out count escalate
const n = (parseInt(String(input.count || "0"), 10) || 0) + 1;
return { count: n, escalate: n >= 2 };
