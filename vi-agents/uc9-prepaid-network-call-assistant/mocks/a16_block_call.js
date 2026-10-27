// @description A16 Call Screening: block and log a spam or fraud call for the subscriber's report. No message is taken.
// @effect side_effect
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @in caller:string "Caller's number"
// @in reason:string "Why it was blocked"
// @out blocked block_ref
return { blocked: true, block_ref: ref("BLK", input.subscriber, input.caller) };
