// @description A24 Dispute Resolution: pause dunning for the disputed invoice until the SR closes.
// @effect side_effect
// @in account_id:string "Enterprise account id"
// @in invoice:string "Disputed invoice number"
// @in sr_token:string "Dispute SR token"
// @out paused
return { paused: true };
