// @description LG07 DPDP Rights Request Handler: log and acknowledge, verify identity or authority (nothing disclosed before verification), classify the right, task data owners, flag retention conflicts and escalation triggers (child, law enforcement, AI system), and draft the response for DPO approval. Deadlines come only from the DPO-approved L7 configuration.
// @effect side_effect
// @in doc_id:string "Request id"
// @out found request_ref right verification disclose escalate escalations tasks partial_action flag_legal l7 draft_response
const r = dpdp(String(input.doc_id || "").toUpperCase()); if (!r) return { found: false };
const resp = r.verification === "failed" ? "We cannot act on this request until we receive proof of your authority to act for the account holder. No information has been shared." :
  r.verification === "pending" ? "We have received your request. To protect the account holder, please verify your identity with the OTP sent to the registered number before we proceed." :
  r.partial_action ? "We have erased the data we are permitted to erase. Some records must be retained under licence and KYC obligations; we will explain which records and for how long." : "We have received and verified your request and are processing it.";
return Object.assign({ found: true, request_ref: "DPR-" + r.id, right: r.class }, r, { draft_response: resp + (r.escalations.indexOf("lawful interception") >= 0 ? " (Response must neither confirm nor deny any law-enforcement request.)" : "") });
