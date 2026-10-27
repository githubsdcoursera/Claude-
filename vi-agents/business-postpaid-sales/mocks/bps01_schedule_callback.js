// @description BPS01 Lead and Compliance: schedule a callback within the calling window at the customer's preferred time.
// @effect side_effect
// @in lead_id:string "Business lead id"
// @in preference:string "Preferred time in the customer's words"
// @out scheduled slot callback_ref
const p = String(input.preference || "").toLowerCase();
const slot = p.includes("morning") ? "tomorrow between 10 and 11 am" : p.includes("evening") ? "today between 5 and 6 pm" : "tomorrow between 3 and 4 pm";
return { scheduled: true, slot, callback_ref: ref("CBK", input.lead_id, slot) };
