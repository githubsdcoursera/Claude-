// @description A09 Handoff: create the warm-transfer packet and reserve an advisor on the target desk. The packet reaches the human before connection.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in queue:string "Target desk, e.g. IR_DESK, RETENTION_DESK, COLLECTIONS_DESK"
// @in reason:string "Why the call is being handed off"
// @in summary:string "One-paragraph summary of the call so far"
// @in recommended_next_step:string "What the human should do next"
// @out transfer_ref queue wait_estimate
return { transfer_ref: ref("XFR", input.msisdn, input.reason), queue: input.queue, wait_estimate: "under 2 minutes" };
