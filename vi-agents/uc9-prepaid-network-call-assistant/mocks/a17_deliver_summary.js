// @description A17 Message & Summary: classify the message and deliver the summary, classification and transcript to the subscriber's Vi App and by SMS, within 30 seconds of call end.
// @effect side_effect
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @in caller:string "Caller's number"
// @in caller_name:string "Name the caller gave"
// @in summary:string "Read-back message summary"
// @in callback_requested:boolean "True if the caller asked for a call back"
// @out delivered delivery_ref latency_seconds category
const s = String(input.summary || "").toLowerCase();
const rules = [["appointment", /meeting|appointment|schedule|moved to|reschedul/], ["delivery", /deliver|parcel|courier|package/],
  ["work", /office|client|project|work|boss/], ["sales", /offer|loan|discount|insurance|credit card/], ["personal", /dinner|home|family|mom|dad|neighbour|alarm/]];
const hit = rules.find(r => r[1].test(s));
return { delivered: true, delivery_ref: ref("MSG", input.subscriber, input.caller, input.summary), latency_seconds: 6, category: hit ? hit[0] : "other" };
