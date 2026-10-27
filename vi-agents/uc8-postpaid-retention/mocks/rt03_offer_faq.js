// @description UC8-RT03 Offer Authority: grounded answer to a question about an offer's terms (plan change, stacking, after the period, cancellation, cost). Anything else goes to a colleague.
// @effect read_only
// @in offer_id:string "Offer id from rt03_offer_eligible"
// @in question:string "Customer's question, verbatim"
// @out answered answer
const o = P.uc8_offers.find(x => x.id === input.offer_id);
const q = String(input.question || "").toLowerCase();
if (!o) return { answered: false, answer: "I don't have that detail on this call, and a colleague can confirm it." };
if (/(after|end|then what|expire|later)/.test(q)) return { answered: true, answer: "After " + o.duration + ", your bill goes back to your plan's normal rental, with no action needed from you." };
if (/(plan change|change my plan|same plan|benefits)/.test(q)) return { answered: true, answer: "Your plan and its benefits stay exactly the same." };
if (/(combine|both|stack|together|with the other)/.test(q)) return { answered: true, answer: "This offer can't be combined with another retention offer." };
if (/(cancel|stop|leave|lock)/.test(q)) return { answered: true, answer: "There's no lock-in with this offer; you can change or cancel your plan as usual." };
if (/(cost|charge|pay|free)/.test(q)) return { answered: true, answer: o.tier === "R1" ? "There's no charge for this offer." : "It's a discount on your rental, so there's nothing extra to pay." };
return { answered: false, answer: "I don't have that detail on this call, and a colleague can confirm it." };
