// @description BPS06 Human Sales Handoff: hot-transfer packet to a Vi Business sales advisor with requirement, plan discussed, objections and document status.
// @effect side_effect
// @in lead_id:string "Business lead id"
// @in reason:string "Why the customer is being transferred"
// @in requirement:string "Connections, new or port, entity type"
// @in plan_discussed:string "Plan ids discussed"
// @in objections:string "Objections raised, in the customer's words"
// @out transfer_ref queue wait_estimate
return { transfer_ref: ref("XFR", input.lead_id, input.reason), queue: "BUSINESS_SALES_DESK", wait_estimate: "under 2 minutes" };
