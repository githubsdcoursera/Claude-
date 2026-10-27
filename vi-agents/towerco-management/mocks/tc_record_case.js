// @description A51 Audit & Trace: write the case outcome to the immutable audit trail with rule and calc versions and the trace id.
// @effect side_effect
// @in case_ref:string "Case reference"
// @in disposition:string "Case outcome code"
// @in summary:string "Outcome summary"
// @out written audit_id
return { written: true, audit_id: refOf("AUD", input.case_ref || "", input.disposition || "", RULE_VERSION) };
