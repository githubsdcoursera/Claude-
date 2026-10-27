// @description UC8-RT01 Root Cause: classify what the customer said into NETWORK, BILL_SHOCK, PRICE_VALUE, PLAN_MISFIT, SERVICE_EXPERIENCE, OTT_BENEFIT, RELOCATION, COMPETITOR_OFFER, LIFE_CHANGE, PORT_INTENT, HAPPY or OTHER, with a confidence score.
// @effect read_only
// @in text:string "Customer's words, verbatim"
// @in trigger_code:string "Trigger code T1-T7"
// @out root_cause confidence verbatim
const t = " " + String(input.text || "").toLowerCase() + " ";
const rules = [
  ["PORT_INTENT", /( port|porting|upc|mnp|switch operator|leaving vi|leave vi)/],
  ["BILL_SHOCK", /(bill|charged|charges|roaming|deducted|unexpected)/],
  ["NETWORK", /(network|signal|call drop|calls drop|no coverage|slow|speed|buffer|internet|tower|net nahi|not working|no data)/],
  ["SERVICE_EXPERIENCE", /(customer care|store|no response|not resolved|complaint|service was bad|nobody helped)/],
  ["PLAN_MISFIT", /(don't use|dont use|do not use|not using|more than i need|too much data|plan is too big|wrong plan|barely use|hardly use|paying for things i don't)/],
  ["PRICE_VALUE", /(expensive|costly|too much|price|cheaper|value for money|mehenga|paying a lot)/],
  ["OTT_BENEFIT", /(netflix|prime|hotstar|ott|subscription|benefit)/],
  ["COMPETITOR_OFFER", /(jio|airtel|bsnl|better offer|other operator|another operator)/],
  ["RELOCATION", /(moving|relocat|shifting|new city|transfer)/],
  ["LIFE_CHANGE", /(lost my job|retir|going abroad|income)/],
  ["HAPPY", /(fine|good|happy|all good|no issues|no problem|working well|great|theek|badhiya|sab sahi)/],
];
for (const [code, re] of rules) if (re.test(t)) return { root_cause: code, confidence: 0.9, verbatim: input.text };
return { root_cause: "OTHER", confidence: 0.4, verbatim: input.text };
