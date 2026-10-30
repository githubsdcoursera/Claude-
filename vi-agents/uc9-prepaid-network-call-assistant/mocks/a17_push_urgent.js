// @description A17 Message & Summary: send an urgent or VIP push to the subscriber's Vi App with a tap-to-take bridge, and report whether they took the call.
// @effect side_effect
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @in caller:string "Caller's number"
// @in purpose:string "Why the caller is calling"
// @out pushed taken push_ref
return { pushed: true, taken: false, push_ref: ref("PSH", input.subscriber, input.caller) };
