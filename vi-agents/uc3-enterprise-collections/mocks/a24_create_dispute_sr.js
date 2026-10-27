// @description A24 Dispute Resolution: create the SCRM dispute SR with all mandatory fields (account, MSISDN, dispute type, amount, details) and return the token in-session.
// @effect side_effect
// @in account_id:string "Enterprise account id"
// @in msisdn:string "Contact number"
// @in dispute_type:string "billing_error, service_not_delivered, plan_mismatch or other"
// @in amount:string "Disputed amount as stated"
// @in details:string "What the customer says is wrong"
// @out created sr_number tat
/* @abl
process:
  before:
    require:
      - params.account_id != ""
      - params.dispute_type != ""
      - params.amount != ""
      - params.details != ""
    on_fail: block("A dispute needs the account, dispute type, amount and details.")
*/
return { created: true, sr_number: "SR" + String(parseInt(ref("X", input.account_id, input.dispute_type, input.amount).slice(2), 36) % 100000000).padStart(8, "0"), tat: "5 working days" };
