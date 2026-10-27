// @description A26 Call Script: unlock dialling through the Vi CLI once the brief and script have both been shown to the agent. Starts SIPREC listen-only forking to Sarvam.
// @effect side_effect
// @in account_id:string "Account id"
// @in brief_shown:boolean "True when the pre-call brief was displayed"
// @in script_shown:boolean "True when the call script was displayed"
// @out dial_enabled call_ref
/* @abl
process:
  before:
    require:
      - params.brief_shown == true
      - params.script_shown == true
    on_fail: block("Dialling stays locked until both the brief and the script are visible.")
*/
return { dial_enabled: true, call_ref: ref("VSD", input.account_id) };
