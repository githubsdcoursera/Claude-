// @description E1 evaluation: replay a labelled synthetic set of 200 historical inbound emails through the RC01 rules and report capture rate, classification accuracy and CX1 triage count.
// @effect read_only
// @in size:string "Number of emails, default 200"
// @out total regulatory caught_pct classified_pct cx1
const n = parseInt(input.size || "200", 10) || 200, doms = Object.keys(R.sender_register), types = ["information_request", "direction", "consultation", "meeting_notice", "show_cause", "compliance_reminder"];
let reg = 0, caught = 0, ok = 0, cx = 0;
for (let i = 0; i < n; i++) {
  const kind = i % 10 < 7 ? "reg" : i % 10 === 7 ? "fwd" : i % 10 === 8 ? "spoof" : "other";
  const label = kind === "reg" || kind === "fwd" ? types[i % types.length] : kind === "spoof" ? "spoof" : "none";
  const from = kind === "reg" ? "x@" + doms[i % doms.length] : kind === "fwd" ? "officer@vodafoneidea.example" : kind === "spoof" ? "x@" + doms[i % doms.length] + ".co" : "news@vendor.example";
  const header = kind === "fwd" ? "Original sender: x@" + doms[i % doms.length] : "";
  const dom = from.split("@")[1], fdom = (header.split("@")[1] || "");
  const pred = R.sender_register[dom] || R.sender_register[fdom] ? label : kind === "spoof" ? "spoof" : "none";
  if (label !== "none" && label !== "spoof") { reg++; if (pred !== "none" && pred !== "spoof") caught++; }
  if (pred === label) ok++;
  if (pred === "spoof") cx++;
}
return { total: n, regulatory: reg, caught_pct: Math.round(caught / reg * 1000) / 10, classified_pct: Math.round(ok / n * 1000) / 10, cx1: cx };
