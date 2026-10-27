// @description A53 Agent Evaluation: recompute every synthetic invoice line with the shadow-bill engine and compare amount, classification and reason with the labelled expected values. Release gate is 99.5% line-level accuracy.
// @effect read_only
// @in scope:string "all"
// @out lines correct accuracy_pct gate_passed mismatches
const r = allResults();
const bad = r.filter(x => !(Math.abs(x.expected - x.golden_expected) <= TOLERANCE && x.classification === x.golden_class && x.reason === x.label));
const acc = Math.round((r.length - bad.length) / r.length * 10000) / 100;
return { lines: r.length, correct: r.length - bad.length, accuracy_pct: acc, gate_passed: acc >= 99.5, mismatches: bad.slice(0, 5).map(x => x.line_id).join(", ") || "none" };
