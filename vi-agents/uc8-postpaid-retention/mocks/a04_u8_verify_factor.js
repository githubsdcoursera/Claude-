// @description A04 Identity (UC8): check one approved knowledge factor, the billing cycle date, against the account. No account data is returned.
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @in answer:string "What the customer said, verbatim"
// @out verified
const c = customer(input.msisdn);
if (!c || !c.uc8) return { verified: false };
const words = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10, eleventh: 11, twelfth: 12, fifteenth: 15, twentieth: 20, "twenty fifth": 25 };
const t = String(input.answer || "").toLowerCase();
let n = parseInt((t.match(/\d{1,2}/) || [""])[0], 10);
if (isNaN(n)) for (const w of Object.keys(words).sort((a, b) => b.length - a.length)) if (t.includes(w)) { n = words[w]; break; }
return { verified: n === c.uc8.billing_cycle_day };
