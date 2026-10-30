// @description A09 Handoff (callback.book): book a callback at the customer's preferred time, or the next suitable time band when they are busy, driving or unwell.
// @effect side_effect
// @in msisdn:string "10-digit Vi postpaid number"
// @in preference:string "Preferred time in the customer's words, or next_band"
// @in reason:string "busy, vulnerability, desk_queue"
// @out booked slot callback_ref
const t = String(input.preference || "").toLowerCase();
let slot = "this evening between 6 and 7 pm";
if (/morning|subah/.test(t)) slot = "tomorrow between 10 and 11 am";
else if (/(tomorrow|kal).*(evening|shaam)/.test(t)) slot = "tomorrow between 6 and 7 pm";
else if (/(tomorrow|kal)/.test(t)) slot = "tomorrow between 11 am and 12 pm";
else if (/(next week|few days|weekend|saturday|sunday)/.test(t)) slot = "Saturday between 11 am and 12 pm";
return { booked: true, slot: slot, callback_ref: ref("CBK", input.msisdn, slot, input.reason) };
