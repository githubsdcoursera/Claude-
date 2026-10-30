// @description A06 Compliance Gate: record a customer opt-out so no further outreach is made on this campaign.
// @effect side_effect
// @in msisdn:string "10-digit Vi mobile number"
// @in campaign:string "Campaign or trigger code"
// @out recorded opt_out_ref
return { recorded: true, opt_out_ref: ref("OPT", input.msisdn, input.campaign) };
