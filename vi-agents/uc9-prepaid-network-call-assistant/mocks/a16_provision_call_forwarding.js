// @description A16 Call Screening: provision conditional call forwarding (busy CFB, no-reply CFNRy, unreachable CFNRc) from the subscriber's number to the assistant after Vi App opt-in.
// @effect side_effect
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @out provisioned forwarding_types provisioning_ref
const c = customer(input.subscriber);
return c ? { provisioned: true, forwarding_types: "busy, no answer and unreachable", provisioning_ref: ref("CFW", input.subscriber) }
         : { provisioned: false, forwarding_types: "", provisioning_ref: "" };
