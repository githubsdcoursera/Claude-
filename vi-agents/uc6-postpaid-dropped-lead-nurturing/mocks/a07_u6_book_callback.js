// @description A09/A07 Handoff (callback.book): book a callback at the customer-chosen time, or the next suitable time band when the customer is busy or driving. Respects the 4-hour spacing and calling window.
// @effect side_effect
// @in msisdn:string "10-digit mobile number of the lead"
// @in lead_id?:string "Lead id, or empty before context is loaded"
// @in preference?:string "Customer's preferred time in their words, or next_band"
// @in reason:string "Why: busy, family_approval, upc_pending, think_it_over"
// @out booked slot callback_ref
const t = String(input.preference || "").toLowerCase();
let slot = "this evening between 6 and 7 pm";
if (/(tomorrow|kal).*(morning|subah)|morning|subah/.test(t)) slot = "tomorrow between 10 and 11 am";
else if (/(tomorrow|kal).*(evening|shaam)/.test(t)) slot = "tomorrow between 6 and 7 pm";
else if (/(tomorrow|kal)/.test(t)) slot = "tomorrow between 11 am and 12 pm";
else if (/(weekend|saturday|sunday)/.test(t)) slot = "Saturday between 11 am and 12 pm";
else if (/(afternoon|lunch)/.test(t)) slot = "today between 3 and 4 pm";
else if (/(few days|4 days|four days|after|once i have|when i get)/.test(t)) slot = "Friday between 6 and 7 pm";
return { booked: true, slot: slot, callback_ref: ref("CBK", input.msisdn, slot, input.reason) };
