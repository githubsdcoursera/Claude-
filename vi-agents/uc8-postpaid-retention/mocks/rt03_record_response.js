// @description UC8-RT03 Offer Authority: log the customer's response to an offer (accepted or declined) against the offer id, for the one-alternative limit and cooldowns.
// @effect side_effect
// @in msisdn:string "10-digit Vi postpaid number"
// @in offer_id:string "Offer id presented"
// @in response:string "accepted or declined"
// @out logged
return { logged: true };
