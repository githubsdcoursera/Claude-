// @description A23 Payment Follow-up: schedule a callback in SCRM at the contact's preferred time within the calling window.
// @effect side_effect
// @in account_id:string "Enterprise account id"
// @in preference:string "Preferred time in the contact's words"
// @out scheduled callback_ref slot
const p = String(input.preference || "").toLowerCase();
const slot = p.includes("morning") ? "tomorrow between 10 and 11 am" : p.includes("evening") ? "today between 5 and 6 pm" : "tomorrow between 3 and 4 pm";
return { scheduled: true, callback_ref: ref("CBK", input.account_id, slot), slot };
