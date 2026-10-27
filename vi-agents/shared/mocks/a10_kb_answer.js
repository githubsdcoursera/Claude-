// @description A10 Knowledge/Search AI: the approved answer for a topic (sim_replacement, porting, vas_refund, international_calling, bill_shock, rollover, easy_plus, competitor, mobile_protection, cloud_storage, workspace, single_bill). Spoken verbatim.
// @effect read_only
// @in topic:string "Topic id"
// @out found answer
const a = P.kb[String(input.topic || "").trim()];
return a ? { found: true, answer: a } : { found: false, answer: "" };
