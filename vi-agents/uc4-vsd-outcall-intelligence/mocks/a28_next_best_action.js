// @description A28 Agent Assist/NBA: suggested response and next best action from the approved library when a meaningful shift occurs in the customer's words.
// @effect read_only
// @in call_ref:string "Call reference"
// @in campaign:string "Campaign code"
// @in text:string "Latest customer segment"
// @out has_suggestion cue_type suggestion
const t = String(input.text || "").toLowerCase();
const hit = P.nba_library.find(n => n.cue.split("|").some(w => t.indexOf(w) >= 0));
return hit ? { has_suggestion: true, cue_type: hit.trigger, suggestion: hit.suggestion } : { has_suggestion: false, cue_type: "", suggestion: "" };
