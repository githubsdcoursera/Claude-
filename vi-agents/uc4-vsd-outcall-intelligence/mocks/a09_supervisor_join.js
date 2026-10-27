// @description A09 Handoff: request a supervisor to join the live call with full context and the live log. Only authorised agent or supervisor personas can open it.
// @effect side_effect
// @in call_ref:string "Call reference"
// @in account_id:string "Account id"
// @in reason:string "Why the VSD agent escalated"
// @in requester_role:string "Role of the requester: vsd_agent or supervisor"
// @out authorised join_ref supervisor eta
if (!["vsd_agent", "supervisor"].includes(input.requester_role)) return { authorised: false, join_ref: "", supervisor: "", eta: "" };
return { authorised: true, join_ref: ref("SUP", input.call_ref, input.reason), supervisor: "Shift supervisor (MOCK)", eta: "under 1 minute" };
