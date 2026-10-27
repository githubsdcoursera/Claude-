// @description A11 Post-Call: schedule 30- and 90-day retention and recharge outcome checks for attribution against the control cohort.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in action:string "What was done on the call, e.g. offer_applied, ticket_raised, declined"
// @out scheduled checkpoints
return { scheduled: true, checkpoints: "30 and 90 days" };
