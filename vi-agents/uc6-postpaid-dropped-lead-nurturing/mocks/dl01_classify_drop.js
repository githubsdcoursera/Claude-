// @description UC6-DL01 Journey Diagnoser: classify the customer's own words into a drop reason code (PRICE, PLAN_CONFUSION, KYC_ISSUE, ADDRESS_COVERAGE, UPC_MNP, PAYMENT_FAIL, DELIVERY_SLOT, CHANGED_MIND, COMPETITOR, NEEDS_FAMILY_APPROVAL, READY_TO_BUY, OTHER) with a confidence score.
// @effect read_only
// @in text:string "What the customer said stopped them, verbatim"
// @in journey:string "Journey code J1-J5"
// @out reason_code confidence verbatim
const t = " " + String(input.text || "").toLowerCase() + " ";
const rules = [
  ["READY_TO_BUY", /(no one followed|nobody followed|no one called|nobody called|want to buy|ready to buy|sign up now|take it now|buy it now)/],
  ["UPC_MNP", /( port|upc|porting code|mnp|my current operator|bring my number|keep my number)/],
  ["KYC_ISSUE", /(kyc|aadhaar|aadhar|verification|verify|document|otp (didn|did not|never|wasn)|otp timed)/],
  ["PAYMENT_FAIL", /(payment|card|upi|debited|deducted|transaction|pay )/],
  ["DELIVERY_SLOT", /(deliver|visit|executive|slot|nobody came|no one came|didn't come|did not come|didn't turn up|missed the)/],
  ["ADDRESS_COVERAGE", /(coverage|signal|serviceable|my area|pincode|pin code|address|network in)/],
  ["NEEDS_FAMILY_APPROVAL", /(family|wife|husband|father|mother|parents|papa|mummy|ask my|consult|discuss with)/],
  ["PLAN_CONFUSION", /(confus|which plan|not sure which|too many plans|difference between|didn't understand|did not understand|samajh nahi|kaun sa)/],
  ["PRICE", /(expensive|costly|price|too much|afford|mehenga|budget|rental is high)/],
  ["COMPETITOR", /(jio|airtel|bsnl|another operator|other operator|another network|went with)/],
  ["CHANGED_MIND", /(changed my mind|don't need|do not need|dont need|not interested|no longer|not anymore|nahi chahiye)/],
];
for (const [code, re] of rules) if (re.test(t)) return { reason_code: code, confidence: 0.9, verbatim: input.text };
return { reason_code: "OTHER", confidence: 0.4, verbatim: input.text };
