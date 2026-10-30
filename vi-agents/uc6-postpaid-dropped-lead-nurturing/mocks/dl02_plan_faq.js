// @description UC6-DL02 Plan & Eligibility: grounded answer to a question about a catalogue plan (deposit, OTT, roaming, rollover, lock-in, family add-on, 5G). Spoken verbatim; anything not in the catalogue is routed to a colleague.
// @effect read_only
// @in plan_id:string "Plan id from dl02_plan_search"
// @in question:string "Customer's question, verbatim"
// @out answered answer
const C = P.postpaid_catalogue;
const p = C.plans.concat([C.family]).find(x => x.id === input.plan_id);
const q = String(input.question || "").toLowerCase();
if (!p) return { answered: false, answer: "I don't have that detail on this call, and a colleague can confirm it for you." };
if (/(deposit|advance|upfront)/.test(q)) return { answered: true, answer: p.deposit_line };
if (/(netflix|prime|hotstar|ott|movies|subscription)/.test(q)) return { answered: true, answer: p.ott };
if (/(roaming|abroad|international|travel)/.test(q)) return { answered: true, answer: p.roaming };
if (/(rollover|carry forward|unused)/.test(q)) return { answered: true, answer: p.data_gb >= 999 ? "Data is unlimited on this plan, so there's nothing to roll over." : "Unused data rolls over up to 200 GB." };
if (/(lock|contract|cancel|commitment)/.test(q)) return { answered: true, answer: C.lock_in };
if (/(family|add a member|add-on|another line|second line)/.test(q)) return { answered: true, answer: "You can add a family member to this plan later from the Vi app." };
if (/(5g)/.test(q)) return { answered: true, answer: "Vi 5G works on this plan where 5G is available and your phone supports it." };
return { answered: false, answer: "I don't have that detail on this call, and a colleague can confirm it for you." };
