// @description A27 Live Sentiment: rolling text sentiment and confidence for the latest diarised segment. Advisory only, never a fact.
// @effect read_only
// @in call_ref:string "Call reference from a26_enable_dial"
// @in speaker:string "customer or agent"
// @in text:string "Transcribed segment text"
// @out label score confidence shift
const t = String(input.text || "").toLowerCase();
const neg = (t.match(/frustrat|angry|fed up|waste|useless|third time|again and again|not fixed|still|worst|cancel|port|leave/g) || []).length;
const pos = (t.match(/thank|great|fixed|working now|resolved|better|happy|good/g) || []).length;
const score = Math.max(-1, Math.min(1, (pos - neg) / 3));
const label = score <= -0.3 ? "negative" : score >= 0.3 ? "positive" : "neutral";
return { label, score: Math.round(score * 100) / 100, confidence: neg + pos ? 0.75 : 0.5,
  shift: input.speaker === "customer" && (label !== "neutral") };
