// @description BPS03 Plan and Value: best-fit and alternative Vi Business plans from the approved catalogue for the number of connections, with verbatim must-say price and benefits.
// @effect read_only
// @in lines:number "Number of connections required"
// @out found best_id best_name best_price best_benefit alt_id alt_name alt_price alt_benefit
const n = Number(input.lines) || 1;
const ok = P.business_plans.filter(p => n >= p.min_lines);
const best = ok[ok.length - 1] || P.business_plans[0];
const alt = ok.length > 1 ? ok[ok.length - 2] : (P.business_plans.find(p => p.id !== best.id) || best);
return { found: true, best_id: best.id, best_name: best.name, best_price: best.price, best_benefit: best.benefit,
  alt_id: alt.id, alt_name: alt.name, alt_price: alt.price, alt_benefit: alt.benefit };
