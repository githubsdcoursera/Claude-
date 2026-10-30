// @description A07 Outreach Planner: schedule a callback within the calling window at the customer's preferred time; counts as the next attempt.
// @effect side_effect
// @in msisdn:string "10-digit mobile number"
// @in lead_id:string "Lead id"
// @in preference:string "When the customer asked to be called, in their words"
// @out scheduled callback_ref slot
const p = String(input.preference || "").toLowerCase();
const slot = p.includes("morning") ? "tomorrow between 10 and 11 am" : p.includes("evening") ? "today between 6 and 7 pm" : "tomorrow between 4 and 5 pm";
return { scheduled: true, callback_ref: ref("CBK", input.lead_id, slot), slot };
