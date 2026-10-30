// @description RD06 Knowledge Curator: capture the officer's edits on an AI draft (share of text materially changed and reason code) as a learning signal; heavy edits (over 30%) are flagged for weekly tuning.
// @effect side_effect
// @in draft_id?:string "Draft id"
// @in depth?:string "Percent of text materially changed"
// @in reason?:string "Reason code, e.g. position_changed, tone, missing_evidence"
// @in user:string "Officer user id"
// @out captured heavy message
const n = parseInt(input.depth || "0", 10) || 0;
return { captured: true, heavy: n > 30, message: "Edits on " + (input.draft_id || "the draft") + " captured: " + n + "% materially changed, reason " + (input.reason || "not given") + ", by " + ((R.users[input.user] || {}).name || input.user) + "." + (n > 30 ? " Flagged as a heavy edit for the weekly prompt and retrieval review." : "") };
