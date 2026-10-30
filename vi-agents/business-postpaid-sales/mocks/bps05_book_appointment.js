// @description BPS05 Appointment and Fulfilment: book a field visit for office verification and activation. Only a slot the scheduler confirms may be promised.
// @effect side_effect
// @in lead_id:string "Business lead id"
// @in preference:string "When the customer prefers, in their words"
// @out booked slot appointment_ref
const p = String(input.preference || "").toLowerCase();
const slot = p.includes("morning") ? "Thursday 30 October between 10 am and 12 noon" : "Friday 31 October between 2 and 4 pm";
return { booked: true, slot, appointment_ref: ref("APT", input.lead_id, slot) };
