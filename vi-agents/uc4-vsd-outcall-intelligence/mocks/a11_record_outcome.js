// @description A11 Post-Call Intelligence: record the approved summary, outcome, sign-off/AS update, follow-up and QA flags; writes the 12-month audit record.
// @effect side_effect
// @in call_ref:string "Call reference"
// @in account_id:string "Account id"
// @in outcome:string "Outcome code, e.g. SIGNED_OFF, ISSUE_REOPENED, FOLLOW_UP, ESCALATED"
// @in summary:string "Agent-approved summary"
// @in edited:boolean "True if the agent edited the draft before approving"
// @out written audit_ref
return { written: true, audit_ref: ref("AUD", input.call_ref, input.outcome) };
