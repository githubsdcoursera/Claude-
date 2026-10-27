// @description A26 Call Script: the approved, grounded campaign script (opening, purpose, must-say, close) filled with account facts.
// @effect read_only
// @in account_id:string "Account id"
// @in campaign:string "Campaign code: SERVICE_CONNECT or RETENTION"
// @in agent_name:string "VSD agent's first name"
// @out found opening purpose must_say close
const s = P.scripts[String(input.campaign || "").toUpperCase()];
const a = P.accounts[String(input.account_id || "").toUpperCase()];
if (!s || !a) return { found: false };
const comp = (a.open_complaints[0] || {}).ref || "";
const fill = t => t.replace("{agent}", input.agent_name || "your advisor").replace("{complaint}", comp);
return { found: true, opening: fill(s.opening), purpose: s.purpose, must_say: s.must_say, close: fill(s.close) };
