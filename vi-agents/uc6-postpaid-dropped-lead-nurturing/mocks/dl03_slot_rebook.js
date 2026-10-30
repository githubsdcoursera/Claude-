// @description UC6-DL03 Blocker Resolver (slot.rebook): book the customer-chosen doorstep KYC visit slot and send the confirmation by SMS.
// @effect side_effect
// @in lead_id:string "Lead id from a03_u6_lead_context"
// @in slot:string "Chosen slot exactly as offered"
// @out booked booking_ref slot
return { booked: !!input.slot, booking_ref: ref("VIS", input.lead_id, input.slot), slot: input.slot };
