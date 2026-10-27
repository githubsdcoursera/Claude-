// @description A17 Message & Summary: deliver the call summary, classification and transcript to the subscriber's Vi App and by SMS, within 30 seconds of call end.
// @effect side_effect
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @in caller:string "Caller's number"
// @in caller_name:string "Name the caller gave"
// @in summary:string "Read-back message summary"
// @in category:string "Classification: personal, work, delivery, appointment, sales, other"
// @in callback_requested:boolean "True if the caller asked for a call back"
// @out delivered delivery_ref latency_seconds
return { delivered: true, delivery_ref: ref("MSG", input.subscriber, input.caller, input.summary), latency_seconds: 6 };
