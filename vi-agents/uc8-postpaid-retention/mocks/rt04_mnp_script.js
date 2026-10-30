// @description UC8-RT04 MNP Safety (mnp.script, D4): the approved porting steps to read verbatim (MS-06), the script version, and whether one retention question and one offer are allowed.
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @out porting_steps script_version offer_allowed
return { porting_steps: "To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll get a Unique Porting Code by SMS. Share that code with your new operator, and they'll complete the move, usually within 3 working days. Your Vi service keeps working until then.",
  script_version: "MNP-SCRIPT-2026.10-MOCK", offer_allowed: true };
