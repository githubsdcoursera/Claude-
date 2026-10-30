// @description P-RT04 MNP Safety: the approved, verbatim porting guidance (UPC request). Port requests are never delayed or discouraged.
// @effect read_only
// @in msisdn:string "10-digit Vi mobile number"
// @out must_say
return { must_say: "To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll receive a Unique Porting Code to give to your new operator." };
