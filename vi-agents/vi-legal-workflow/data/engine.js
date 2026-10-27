// ---- Vi Legal deterministic engine: LG-DI reader, LG-PB playbook rules, LG-TR, LG-PR, LG06 dates, LG07 DPDP ----
// This is the rules pass of the dual pass on non-negotiables; it never invents clause text or law.
const PLAYBOOK = { nda: "Vi NDA Playbook v1.0 DRAFT", mou: "Vi AI Partner MoU Playbook encoding v1.0 DRAFT (L3: reconcile with signed-off C3)", vendor: "Vi Vendor & AI Contract Playbook v1.0 DRAFT" };
const PRIV = "Privileged & Confidential, prepared for Vi Legal. AI draft for lawyer review.";
const TODAY = "2026-10-27";
const USERS = {
  "lawyer.radhika": { name: "Radhika (VIL Legal)", role: "counsel" },
  "counsel.amit": { name: "Amit (Commercial Counsel, synthetic)", role: "counsel" },
  "senior.counsel": { name: "Senior Counsel (synthetic)", role: "senior_counsel" },
  "biz.aioffice": { name: "AI Office (CAIO office, synthetic)", role: "business" },
  "dpo.vi": { name: "DPO (synthetic)", role: "dpo" },
};
const MATTERS = [{ id: "MAT-LG-0007", counterparty: "cirrus peak", type: "AI_PARTNER_MOU", lawyer: "lawyer.radhika", status: "W4 Negotiate" }];
const L7_CONFIGURED = false; // DPO-approved DPDP configuration (timelines, templates, retention) not yet configured

function doc(id) { return LG.docs[String(id || "").toUpperCase().trim()] || null; }
function words25(s) { const w = String(s).replace(/\*\*/g, "").split(/\s+/); return w.slice(0, 25).join(" ") + (w.length > 25 ? " ..." : ""); }
function clauses(id) {
  const d = doc(id); if (!d) return [];
  let b = 0;
  return d.text.split("\n").map(l => {
    let m = l.match(/^\*\*(Parties|Partner|Vendor):?\*\*:?\s*(.*)$/); if (m) return { ref: m[1], text: m[2] };
    m = l.match(/^(\d+(?:–\d+)?)\.\s+(.*)$/); if (m) return { ref: "cl. " + m[1], text: m[2] };
    m = l.match(/^-\s+(.*)$/); if (m) { b++; return { ref: "item " + b, text: m[1] }; }
    return { ref: "text", text: l };
  });
}
function find(id, re) { return clauses(id).find(c => re.test(c.text.toLowerCase())) || null; }
function fnd(item, c, position, tier, proposed, extra) {
  return Object.assign({ item: item, ref: c ? c.ref : "not in excerpt", quote: c ? words25(c.text) : "", position: position, tier: tier, proposed: proposed || "" }, extra || {});
}
const RANK = { GREEN: 0, YELLOW: 1, RED: 2 };
function worst(fs) { return fs.reduce((w, f) => (f.conditional ? w : (RANK[f.tier] > RANK[w] ? f.tier : w)), "GREEN"); }
function aiSignals(t) { return /(machine-learning|ml-based|ml engine|\bml\b|model|artificial intelligence|\bai\b|train|scoring|bias|fine-tune|embedding|optimisation engine)/i.test(t); }

// ---------------- LG02 NDA triage (N1-N16) ----------------
function ndaTriage(id) {
  const d = doc(id); if (!d || !/^NDA/.test(id)) return null;
  const F = [];
  const add = (item, tests, pos, proposed) => { for (const [re, tier] of tests) { const c = find(id, re); if (c) { F.push(fnd(item, c, pos, tier, tier === "GREEN" ? "" : proposed)); return; } } };
  add("N2", [[/(one-way, protecting (?!vi)|vi has no protection)/, "RED"], [/mutual/, "GREEN"]], "Mutual, or one-way protecting Vi", LIB["CL-N2"]);
  add("N4", [[/written information marked/, "RED"], [/oral disclosures protected if confirmed in writing/, "YELLOW"], [/(reasonable person|standard (vi-equivalent )?definitions)/, "GREEN"]], "Oral, written and electronic covered; marking not required", LIB["CL-N4"]);
  add("N5", [[/unaided memory/, "RED"], [/(exclusions|standard exclusions)/, "GREEN"]], "Standard exclusions only; no residuals", LIB["CL-N5"]);
  add("N6", [[/only on court order/, "RED"], [/where practicable/, "YELLOW"], [/(dot and trai|regulator)/, "GREEN"]], "Prior notice where lawful; DoT/TRAI and regulator disclosure permitted", LIB["CL-N6"]);
  add("N7", [[/perpetual/, "RED"], [/term:? 3 years|term 3 years/, "YELLOW"], [/(two \(2\) years|2-year term|term 2 years)/, "GREEN"]], "Agreement term 2 years (up to 3 with fallback)", "Term: two (2) years.");
  add("N8", [[/survive 1 year|survival (0|1) year/, "RED"], [/survival 2 years/, "YELLOW"], [/(survive three|3-year survival|survival 3 years)/, "GREEN"]], "Survival 3 years; trade secrets and personal data while confidential", LIB["CL-N8"]);
  add("N9", [[/(subscriber-level|mobile numbers)/, "RED"], [/(store|process) data on its cloud in (?!india)/, "RED"], [/dpdp-compliant/, "GREEN"]], "No personal data, or DPDP-compliant terms; no transfer outside India without Vi approval", LIB["CL-N9"]);
  if (find(id, /cloud in (?!india)/) && !F.some(f => f.item === "N9" && /cloud/.test(f.quote.toLowerCase()))) F.push(fnd("N9", find(id, /cloud in (?!india)/), "No transfer outside India without Vi approval", "RED", LIB["CL-N9"]));
  add("N11", [[/liquidated damages/, "RED"], [/injunctive relief/, "GREEN"]], "Injunctive relief for both; no liquidated damages", LIB["CL-N11"]);
  add("N12", [[/indemnify.*without limit/, "RED"]], "No indemnity; general law applies", "Delete the indemnity; general law applies.");
  add("N13", [[/(law|governing law)[^.]*?(california|singapore|england|delaware|new york)/, "RED"], [/(laws of india|law: india|law: india)/, "GREEN"]], "Laws of India", LIB["CL-N13/N14"]);
  add("N14", [[/(courts in san francisco|seated in singapore|singapore courts|seated in london)/, "RED"], [/siac rules, seat (new delhi|mumbai)/, "YELLOW"], [/(seat mumbai|mumbai courts|arbitration mumbai)/, "GREEN"]], "Arbitration, seat Mumbai, or Indian courts (Mumbai)", LIB["CL-N13/N14"]);
  add("N15", [[/(shall not engage any other|non-compete|exclusiv|standstill)/, "RED"], [/non-solicitation/, "YELLOW"]], "No hidden commercial terms; mutual non-solicit up to 12 months is the only fallback", LIB["CL-N15"]);
  add("N16", [[/(list vi as a client|marketing materials|use vi's name)/, "RED"], [/publicity\.?\*?\*?\s*none/, "GREEN"]], "No publicity or use of Vi's name or logo without consent", LIB["CL-N16"]);
  const hidden = F.filter(f => (f.item === "N15" || f.item === "N16") && f.tier !== "GREEN");
  const tier = worst(F);
  const vipaper = /vi mutual template, unchanged/i.test(d.title);
  return { id: id, title: d.title, playbook: PLAYBOOK.nda, tier: tier, vi_paper: vipaper, findings: F, hidden: hidden.map(f => f.item + " " + f.ref).join(", ") || "None found",
    ai_flag: aiSignals(d.text) && /(model|training)/i.test(d.text), escalate: tier === "RED" };
}

// ---------------- LG03 AI partner MoU review (markup) and draft ----------------
function mouReview(id) {
  const d = doc(id); if (!d || !/^MOU/.test(id)) return null;
  const cs = clauses(id).filter(c => /^cl\. \d/.test(c.ref));
  const evidence = cs.filter(c => /(proposal deck|ml-based|machine-learning)/i.test(c.text)).map(c => c.ref + ": \"" + words25(c.text) + "\"").join("; ");
  const F = [];
  cs.forEach(c => {
    const t = c.text.toLowerCase(), sec = (c.text.match(/\*\*(S\d+)/) || [])[1] || "";
    const n = c.ref.replace("cl. ", "");
    const row = (tier, rec, pos, prop, extra) => F.push(fnd("change " + n, c, pos, tier, prop, Object.assign({ section: sec, recommend: rec }, extra || {})));
    if (/proposal deck/.test(t)) return;
    if (/unchanged/.test(t)) return;
    if (sec === "S10" && /deleted/.test(t)) return row("RED", "reinstate", "GRACIE/RAI clause mandatory; deletion only with RAI Board approval", LIB["CL-M-RAI"] + " Scope the obligations to the AI components actually used.", { evidence: evidence || "ask the AI Office for AI-use evidence" });
    if (/(shall not engage any other|exclusivity|\bexclusive\b)/.test(t)) return row("RED", "reject", "Non-exclusive; Vi free to work with other partners (non-negotiable)", LIB["CL-M-EX"]);
    if (sec === "S7" && /(existing enterprise agreement|governed exclusively)/.test(t)) return row("YELLOW", "accept_with_principles_retained", "Principles only; detail may move to existing instruments while the commercial-principles statement stays", LIB["CL-M-COM"]);
    if (/affiliate addendum/.test(t)) return row("YELLOW", "ai_office_decision", "Keep the affiliate addendum where the AI Office requires it", "[AI Office decision: keep the affiliate addendum in the MoU, or sign it separately alongside?]");
    if (sec === "S11" && /improvements/.test(t)) return row("RED", "counter", "Background IP stays; Vi-specific outputs are Vi's; partner keeps only generic platform improvements without Vi data or Confidential Information", "The Partner retains improvements to its generic platform that do not contain or derive from Vi data, Vi Confidential Information, Vi configurations or Vi-specific outputs, all of which belong to Vi.", { conditional: true, condition: "RED if improvements derived from Vi's use can include Vi data, configurations or Vi-specific outputs" });
    if (sec === "S4" && /narrowed/.test(t)) return row("GREEN", "accept_if_S9_S10_S14_protected", "Named use cases; narrowing acceptable if S9, S10 and S14 stay intact", "");
    if (sec === "S16" && /liability/.test(t)) return row("YELLOW", "counter", "MoU liability applies only to binding clauses; data and confidentiality breach not capped at that level", "Any limitation of liability applies only to the binding clauses and does not limit liability for breach of Confidentiality or Data Protection.");
    if (sec === "S16" && /(governing law changed|singapore courts|foreign)/.test(t)) return row("RED", "counter", "Indian law, Mumbai seat; SIAC rules with Indian seat as fallback; English or Singapore law only with GC approval", LIB["CL-N13/N14"]);
    if (sec === "S9" && /(improve its models|train)/.test(t)) return row("RED", "counter", "No training on Vi data; fallback only aggregated, anonymised operational telemetry for service health, with Vi approval", LIB["CL-M-DATA"], { critical: true });
    if (sec === "S13" && /announce/.test(t)) return row("RED", "counter", "Joint release with mutual approval; no unilateral announcement", LIB["CL-N16"]);
    if (sec === "S15" && /(no termination|36 months)/.test(t)) return row("YELLOW", "counter", "12-24 months with a termination right on notice", "Term of eighteen (18) months; either Party may terminate on thirty (30) days' written notice.");
    row("YELLOW", "lawyer_review", "Playbook silent", "");
  });
  const tier = worst(F);
  const condRed = F.some(f => f.conditional);
  return { id: id, title: d.title, playbook: PLAYBOOK.mou, tier: tier, findings: F, evidence: evidence, conditional_note: condRed && tier !== "RED" ? "one RED-risk to resolve" : "",
    escalate: tier === "RED", route: tier === "RED" ? (F.some(f => f.section === "S10") ? "Senior counsel / GC and RAI Board" : "Senior counsel / GC") : "Assigned Legal counsel + AI Office" };
}
function parseDate(s) {
  const M = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  const m = String(s).match(/(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(20\d\d)/i);
  return m ? m[3] + "-" + String(M[m[2].toLowerCase()]).padStart(2, "0") + "-" + String(m[1]).padStart(2, "0") : "";
}
function addDaysL(d, n) { const t = new Date(d + "T00:00:00Z"); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); }
function longD(d) { if (!d) return ""; const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; const [y, mo, da] = d.split("-").map(Number); return da + " " + m[mo - 1] + " " + y; }
function mouDraft(id) {
  const d = doc(id); if (!d || !/Draft mode/i.test(d.title)) return null;
  const g = re => ((d.text.match(re) || [])[1] || "").trim();
  const partner = g(/Partner:\s*([^,]+(?:Private Limited|Pvt\.? Ltd\.?|Limited|Pte\.? Ltd\.?|LLP))/i), brings = g(/Brings:\s*(.*)/), ucs = g(/Vi use cases:\s*(.*)/), phase = g(/Phasing:\s*(.*)/),
    com = g(/Commercial principle:\s*(.*)/), term = g(/Term:\s*(.*)/), inst = g(/Existing instruments:\s*(.*)/);
  const S = [
    ["S1 Parties & recitals", "Vodafone Idea Limited (\"Vi\") and " + partner + " (\"Partner\")."],
    ["S2 Vision & strategic intent", "The Parties intend to bring the Partner's " + brings + " to Vi's customers through the Vi AI Lab. [AI Office decision: confirm the strategic narrative.]"],
    ["S3 What makes the partnership distinctive", "[AI Office decision: optional section; include for strategic partners.]"],
    ["S4 Scope: named use cases", ucs],
    ["S5 Delivery model: Vi AI Lab", LIB["CL-M-LAB"]],
    ["S6 Phasing", phase],
    ["S7 Commercial principles", com + " " + LIB["CL-M-COM"]],
    ["S8 Governance", "A joint steering committee chaired for Vi by the AI Office meets monthly, with named leads for each Party. [AI Office decision: name the leads.]"],
    ["S9 Data protection & residency", LIB["CL-M-DATA"]],
    ["S10 Responsible AI (GRACIE)", LIB["CL-M-RAI"]],
    ["S11 Intellectual property", "Each Party retains its background IP. Vi owns Vi-specific outputs and configurations. Any joint IP is subject to a definitive agreement."],
    ["S12 Confidentiality", "The Parties' mutual NDA (" + inst.replace(/mutual nda signed /i, "signed ").replace(/\.$/, "") + ") governs Confidential Information exchanged under this MoU."],
    ["S13 Publicity", LIB["CL-N16"] + " Any joint press release text is approved by both Parties."],
    ["S14 Exclusivity", LIB["CL-M-EX"]],
    ["S15 Term & termination", "Term of " + term.replace(/;\s*either party/i, "; either Party").replace(/\.$/, "") + "."],
    ["S16 Legal provisions", LIB["CL-M-NB"] + " This MoU is governed by the laws of India; disputes go to arbitration seated in Mumbai. Nothing creates a partnership or agency. Each Party bears its own costs."],
  ];
  return { id: id, partner: partner, playbook: PLAYBOOK.mou, sections: S, use_cases: ucs, binding: "Confidentiality, Publicity, Non-exclusivity, Governing law and dispute resolution, Data protection for data actually exchanged, Costs, Termination, No partnership or agency" };
}

// ---------------- LG04 vendor / AI contract review (V1-V14 + GRACIE R1-R10) ----------------
const RNAMES = { R1: "Disclosure", R2: "Adherence", R3: "Data use limits", R4: "Human oversight", R5: "Testing", R6: "Explainability and documentation", R7: "Audit and cooperation", R8: "Incident reporting", R9: "Security of AI components", R10: "Exit and deletion" };
function vendorReview(id) {
  const d = doc(id); if (!d || !/^VC/.test(id) || id === "VC-11") return null;
  const t = d.text.toLowerCase(), F = [];
  const c0 = clauses(id).find(c => c.ref !== "text") || { ref: "clause", text: d.text.split("\n")[0] };
  const cq = re => find(id, re) || c0;
  const noAi = /no ai\/ml in scope/.test(t);
  const ai = !noAi && aiSignals(t);
  const aiEv = noAi ? "Vendor states no AI/ML in scope and accepts the conditional RAI clause" : (clauses(id).filter(c => /(deck|confirmed ai use|machine-learning|train|model|annex rai|trustworthy ai)/i.test(c.text)).map(c => "\"" + words25(c.text) + "\"").join("; ") || "");
  if (/online terms of service.*prevail/.test(t)) F.push(fnd("V1", cq(/prevail/), "Vi MSA prevails over vendor terms", "RED", "This Agreement prevails over any vendor terms, order forms or online terms."));
  if (/exclusive property/.test(t) && /trained on customer data/.test(t)) F.push(fnd("V5", cq(/exclusive property/), "Vi owns deliverables and Vi-specific outputs, including models trained on Vi data", "RED", "All deliverables, models, weights and configurations developed for Vi or trained on Vi Data are Vi's property; the Vendor licenses only its background tools."));
  if (/train and improve/.test(t)) F.push(fnd("V6", cq(/train/), "Vi owns Vi data; use only to perform the services; no training", "RED", "The Vendor shall use Vi Data only to perform the Services and shall not use it to train or improve any model."));
  if (/any country/.test(t)) F.push(fnd("V7", cq(/any country/), "Stored and processed in India", "RED", LIB["CL-V7"]));
  if (/sub-processors operate/.test(t)) F.push(fnd("V10", cq(/sub-processors/), "Sub-contracting only with Vi's prior written consent", "RED", "The Vendor shall not appoint any sub-processor without Vi's prior written consent."));
  const days = t.match(/within (\d+) days/);
  if (/security incident/.test(t) && days && Number(days[1]) * 24 > 48) F.push(fnd("V8", cq(/security incident/), "Breach notice within 24 h (48 h fallback); cooperation with CERT-In reporting [verify]", "RED", LIB["CL-V8"]));
  if (/fees paid in the \d+ months/.test(t)) F.push(fnd("V11", cq(/fees paid/), "Cap at 1x annual fees ({{TBC: L4}})", "RED", "Each Party's aggregate liability is limited to the fees paid or payable in the twelve (12) months preceding the claim."));
  if (/no exclusions apply/.test(t)) F.push(fnd("V12", cq(/no exclusions/), "Uncapped: confidentiality, data breach, IP indemnity, wilful misconduct, fraud", "RED", "The cap does not apply to breach of confidentiality, data protection breach, IP indemnity, wilful misconduct or fraud."));
  if (/(laws of england|london|new york|state of)/.test(t)) F.push(fnd("V13", cq(/governed/), "Indian law; arbitration seated in Mumbai (SIAC Indian seat fallback); foreign law only with GC approval", "RED", LIB["CL-N13/N14"]));
  // GRACIE V9
  let rStatus = {}; Object.keys(RNAMES).forEach(r => rStatus[r] = "present");
  let v9tier = "GREEN", v9note = "";
  if (/deleted annex c \(responsible ai\)/.test(t)) { Object.keys(RNAMES).forEach(r => rStatus[r] = "missing"); v9tier = "RED"; v9note = "RAI pack deleted on a 'no LLM' claim despite AI-use evidence"; }
  else if (/annex rai retained/.test(t)) { if (/deleted r5/.test(t)) rStatus.R5 = "missing"; if (/r7/.test(t)) rStatus.R7 = "missing"; if (/r8 to/.test(t)) rStatus.R8 = "weakened"; v9tier = "RED"; v9note = "Pack partly deleted or weakened"; }
  else if (/trustworthy ai commitments/.test(t)) {
    const map = { R1: /model inventory disclosure/, R2: /stage-gate/, R3: /no training on customer data/, R4: /human review/, R5: /bias and robustness testing/, R6: /model documentation/, R7: /customer audit/, R8: /incident notice in 48/, R9: /ai security controls/, R10: /fine-tunes and embeddings on exit/ };
    Object.keys(map).forEach(r => rStatus[r] = map[r].test(t) ? "mapped (vendor equivalent)" : "missing");
    v9tier = Object.values(rStatus).some(s => s === "missing") ? "RED" : "YELLOW"; v9note = "Vendor framework mapped to R1-R10; lawyer to confirm mapping";
  } else if (noAi) { v9tier = "GREEN"; v9note = "No AI/ML in scope; conditional RAI clause (CL-V9-COND) accepted"; Object.keys(RNAMES).forEach(r => rStatus[r] = "conditional"); }
  else if (ai) { if (/train/.test(t)) rStatus.R3 = "missing"; if (/exclusive property/.test(t)) { rStatus.R3 = "missing"; rStatus.R10 = "impacted"; } v9tier = Object.values(rStatus).some(s => s !== "present") ? "RED" : "GREEN"; v9note = "AI applies; affected GRACIE items listed"; }
  else Object.keys(RNAMES).forEach(r => rStatus[r] = "not assessed (no AI evidence in excerpt)");
  if (ai || noAi) F.push(fnd("V9", cq(/(annex|ai|train|model|trustworthy|conditional)/), "GRACIE pack R1-R10 present, or a materially equivalent framework mapped", v9tier, v9tier === "RED" && /deleted annex/.test(t) ? "Reinstate Annex [RAI] scoped to the ML components (" + aiEv.slice(0, 120) + "). Offer CL-V9-COND only if the vendor maintains no AI is used; refusal of both goes to the RAI Board." : (v9tier === "RED" ? "Reinstate the missing and weakened items: " + Object.keys(rStatus).filter(r => rStatus[r] !== "present" && rStatus[r] !== "mapped (vendor equivalent)").join(", ") + "." : ""), { note: v9note, external: v9tier === "RED" ? "Vi's Responsible AI requirements apply to any service that uses artificial intelligence or machine-learning techniques on Vi data or produces outputs Vi relies on, not only large language models. Based on the approach described in your materials, the services include such techniques. We have therefore reinstated the Responsible AI annex, scoped to those components." : "" }));
  const gaps = Object.keys(rStatus).filter(r => /missing|weakened|impacted/.test(rStatus[r]));
  const tier = worst(F);
  const esc = F.some(f => f.tier === "RED" && /V9|V5|V6|V7|V10|V11|V12|V13/.test(f.item));
  return { id: id, title: d.title, playbook: PLAYBOOK.vendor, tier: tier, ai_applicable: ai, ai_evidence: aiEv || "none in excerpt", findings: F,
    gracie: Object.keys(rStatus).map(r => r + " " + RNAMES[r] + ": " + rStatus[r]).join("; "), gaps: gaps, escalate: esc, route: esc ? (gaps.length ? "Senior counsel / GC and RAI Board via the AI Office" : "Senior counsel / GC") : "Assigned Legal counsel" };
}

// ---------------- LG05 execution check (X1-X11) ----------------
function normName(s) { return String(s).toLowerCase().replace(/\bpvt\b\.?/g, "private").replace(/\bltd\b\.?/g, "limited").replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim(); }
function executionCheck(id, approval) {
  const d = doc(id); if (!d) return null;
  const t = d.text, l = t.toLowerCase();
  if (!/(execution copy|signature block)/.test(l)) return { id: id, result: "NOT_READY", checks: [], exceptions: "No execution copy in this document; run the execution check on the final execution copy.", clean_copy: false };
  const names = (t.match(/"([^"]+)"/g) || []).map(s => s.replace(/"/g, ""));
  const ent = (t.match(/\*\*(?:Partner|Parties):\*\*\s*([^,(]+(?:Pte\.? Ltd\.?|Private Limited|Limited|LLP))/) || [])[1];
  if (ent) names.push(ent);
  let mismatch = "";
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
    const a = normName(names[i]), b = normName(names[j]);
    if (a.split(" ")[0] === b.split(" ")[0] && a !== b && !/legal note/.test(a + b)) mismatch = "\"" + names[i] + "\" vs \"" + names[j] + "\"";
  }
  const X = [
    ["X1", "Version", "CANNOT VERIFY", "No approved-version diff in the excerpt; lawyer to confirm"],
    ["X2", "Parties", mismatch ? "FAIL" : "PASS", mismatch ? "Entity names inconsistent: " + mismatch : "Names consistent"],
    ["X3", "Vi signatory", "CANNOT VERIFY", "L6 authority matrix not configured"],
    ["X4", "Approvals", approval ? "PASS" : "CANNOT VERIFY", approval ? "Approval recorded: " + approval : "No approval record supplied"],
    ["X5", "Annexures", /referenced but not attached/.test(l) ? "FAIL" : "PASS", /referenced but not attached/.test(l) ? "Referenced schedule not attached: \"" + words25((t.match(/[^.;\n]*referenced but not attached[^.;\n]*/i) || [""])[0]) + "\"" : "No missing annexure found"],
    ["X6", "Defined terms and cross-references", "CANNOT VERIFY", "Not evidenced in the excerpt"],
    ["X7", "Dates and placeholders", /(\[●\]|\[date\]|\btbd\b|\{\{)/.test(t) ? "FAIL" : "PASS", /(\[●\]|\[date\]|\btbd\b|\{\{)/.test(t) ? "Placeholder found: \"" + words25((t.match(/[^\n;]*(\[●\]|\[date\])[^\n;]*/) || [""])[0]) + "\"" : "No placeholders"],
    ["X8", "Internal material", /(word comment|legal note|tracked change)/.test(l) ? "FAIL" : "PASS", /(word comment|legal note)/.test(l) ? "Internal comment left in the copy: \"" + words25((t.match(/[^\n]*(Word comment|Legal note)[^\n]*/) || [""])[0]) + "\"" : "None found"],
    ["X9", "Stamp duty", /no e-stamp/.test(l) ? "FAIL" : "FLAG", /no e-stamp/.test(l) ? "No e-stamp reference for a document executed in " + ((t.match(/executed in (\w+)/) || [])[1] || "India") + " [verify rate with Legal]" : "Identify the State of execution and arrange e-stamp [verify rate with Legal]"],
    ["X10", "Counterparts / e-sign", "CANNOT VERIFY", "Not evidenced in the excerpt"],
    ["X11", "Binding vs non-binding (MoUs)", /^MOU/.test(id) ? "CANNOT VERIFY" : "N/A", /^MOU/.test(id) ? "Confirm the binding clauses list against playbook §3" : ""],
  ];
  const fails = X.filter(x => x[2] === "FAIL");
  const eligible = ["X1", "X2", "X7", "X8"].every(k => X.find(x => x[0] === k)[2] === "PASS");
  return { id: id, result: fails.length ? "FAIL" : "PASS WITH CHECKS", checks: X.map(x => x[0] + " " + x[1] + ": " + x[2] + (x[3] ? " (" + x[3] + ")" : "")), failed: fails.map(x => x[0]),
    exceptions: fails.map(x => x[0] + " " + x[3]).join("; ") || "none", clean_copy: eligible };
}

// ---------------- LG06 obligations and watcher ----------------
function obligations(id) {
  const d = doc(id); if (!d) return null;
  const t = d.text, out = []; let auto = false, notice = "";
  if (/Draft mode/i.test(d.title)) {
    const ps = parseDate((t.match(/from (\d{1,2} \w+ 20\d\d)/) || [])[1] || "");
    const wk = Number((t.match(/PoC (\d+) weeks/) || [])[1] || 0);
    const prod = parseDate((t.match(/production decision by (\d{1,2} \w+ 20\d\d)/) || [])[1] || "");
    const term = (t.match(/Term:\s*(\d+) months/) || [])[1], nd = (t.match(/(\d+) days' notice/) || [])[1];
    if (ps) out.push({ item: "PoC start in the Vi AI Lab", due: ps, ref: "S6 Phasing", owner: "biz.aioffice" });
    if (ps && wk) out.push({ item: "PoC end (" + wk + " weeks)", due: addDaysL(ps, wk * 7), ref: "S6 Phasing", owner: "biz.aioffice" });
    if (prod) out.push({ item: "Production decision", due: prod, ref: "S6 Phasing", owner: "biz.aioffice" });
    if (term) out.push({ item: "MoU expiry (" + term + " months from signature)", due: "", trigger: "signature date + " + term + " months: owner to confirm the date", ref: "S15", owner: "biz.aioffice" });
    if (nd) out.push({ item: "Termination for convenience on " + nd + " days' notice", due: "", trigger: "right to exercise; no fixed date", ref: "S15", owner: "lawyer.radhika" });
  } else if (/renews automatically/i.test(t)) {
    const m = t.match(/Initial term (\d{1,2} \w+ 20\d\d) to (\d{1,2} \w+ 20\d\d)/);
    const start = parseDate(m[1]), end = parseDate(m[2]);
    const nd = Number((t.match(/(\d+) days' written notice/) || [])[1] || 0);
    auto = true; notice = addDaysL(end, -nd);
    out.push({ item: "Auto-renewal notice deadline (" + nd + " days before " + longD(end) + ")", due: notice, ref: "Term clause", owner: "biz.aioffice", alert: addDaysL(notice, -30) });
    const within = Number((t.match(/within (\d+) days of each quarter end/) || [])[1] || 0);
    if (within) { let y = Number(start.slice(0, 4)); [3, 6, 9, 12].forEach(mo => { const qe = new Date(Date.UTC(y, mo, 0)).toISOString().slice(0, 10); out.push({ item: "Quarterly AI model performance and bias report (GRACIE R5/R6)", due: addDaysL(qe, within), ref: "Deliverables clause", owner: "biz.aioffice" }); }); }
    out.push({ item: "Term end", due: end, ref: "Term clause", owner: "biz.aioffice" });
  } else return { id: id, entries: [], auto_renewal: false, notice_deadline: "" };
  return { id: id, entries: out, auto_renewal: auto, notice_deadline: notice };
}
function watch(asOf) {
  const rows = [];
  ["MOU-01", "VC-11"].forEach(id => (obligations(id).entries || []).forEach(e => {
    if (!e.due) { rows.push(id + " | " + e.item + " | " + e.ref + " | trigger: " + e.trigger + " | owner " + e.owner + " | awaiting owner confirmation"); return; }
    const days = Math.round((new Date(e.due) - new Date(asOf)) / 864e5);
    const band = days < 0 ? "OVERDUE" : days <= 7 ? "due in 7 days" : days <= 30 ? "due in 30 days" : days <= 60 ? "due in 60 days" : days <= 90 ? "due in 90 days" : "";
    const alert = e.alert && asOf >= e.alert && asOf <= e.due ? " | ALERT: renew, renegotiate or terminate? decision requested from owner" : "";
    if (band || alert) rows.push(id + " | " + e.item + " | " + e.ref + " | due " + longD(e.due) + " | " + (days < 0 ? Math.abs(days) + " days overdue" : days + " days left") + " | owner " + e.owner + " | " + band + alert);
  }));
  return rows;
}

// ---------------- LG07 DPDP ----------------
function dpdp(id) {
  const d = doc(id); if (!d || !/^DP/.test(id)) return null;
  const t = d.text.toLowerCase();
  let cls = "not_a_dpdp_request";
  if (/(withdraw consent|stop all promotional)/.test(t)) cls = "consent_withdrawal";
  else if (/(delete|erase)/.test(t)) cls = "erasure";
  else if (/(spelled wrong|correct|should be)/.test(t)) cls = "correction";
  else if (/complain/.test(t)) cls = "grievance";
  else if (/(send me|summary|give me|what you gave)/.test(t)) cls = "access";
  const third = /(for my brother|for my sister|for my wife|for my husband|on behalf of|for my friend)/.test(t) && !/(authority letter|power of attorney|nominee)/.test(t);
  const ver = third ? "failed" : /(verified|otp on|app login)/.test(t) ? "passed" : "pending";
  const esc = []; if (/(\d{1,2})-year-old|child|minor/.test(t)) esc.push("child's data"); if (/(police|court order|law enforcement)/.test(t)) esc.push("law-enforcement linkage (never confirm or deny lawful interception)"); if (/\bai\b|chatbot|model/.test(t)) esc.push("AI system involvement (route to DPO and AI Office/RAI)");
  const tasks = { access: "CRM, billing, CDR/usage, marketing, app analytics", erasure: "CRM, app, marketing, AI systems; retention check on KYC, licence and CDR records", correction: "CRM and billing (KYC re-verification may be required per L7)", consent_withdrawal: "marketing and consent systems, DND registry", grievance: "DPO grievance desk; AI Office for the AI decision" }[cls] || "";
  const partial = cls === "erasure" && /(closed my connection|call records)/.test(t);
  return { id: id, class: cls, verification: ver, disclose: ver === "passed", escalate: esc.length > 0, escalations: esc.join("; ") || "none", tasks: tasks, partial_action: partial,
    flag_legal: partial, l7: L7_CONFIGURED ? "configured" : "L7 DPO configuration not set: logged and acknowledged only; no statutory deadline computed [verify]" };
}

// ---------------- LG01 intake ----------------
function intake(id) {
  const d = doc(id); if (!d) return null;
  const t = d.text;
  let type = "OTHER";
  if (/^NDA/.test(id)) type = /execution copy/i.test(t) ? "EXECUTION_ONLY" : "NDA";
  else if (/^MOU/.test(id)) type = "AI_PARTNER_MOU";
  else if (/^VC/.test(id)) type = /no ai\/ml in scope/i.test(t) ? "VENDOR_AGREEMENT" : (aiSignals(t) ? "AI_VENDOR_AGREEMENT" : "VENDOR_AGREEMENT");
  else if (/^DP/.test(id)) type = "DPDP_REQUEST";
  if (/amendment no/i.test(t) && /^VC/.test(id)) type = "AMENDMENT (AI_VENDOR_AGREEMENT)";
  const cp = ((t.match(/(?:Parties|Partner|Vendor):?\*?\*?:?\s*(?:Vodafone Idea Limited \("Vi"\) and |Vi and )?([^.(;]+?(?:Private Limited|Pvt\.? Ltd\.?|Pte\.? Ltd\.?|LLP|Inc\.|Limited|Partners))/) || [])[1] || (type === "DPDP_REQUEST" ? "Data Principal" : "not stated")).trim();
  const dup = MATTERS.find(m => cp.toLowerCase().indexOf(m.counterparty) >= 0 && type.indexOf(m.type) >= 0);
  const route = { NDA: "nda-triage (LG02)", EXECUTION_ONLY: "execution-check (LG05)", AI_PARTNER_MOU: /Draft mode/i.test(d.title) ? "ai-partner-mou draft mode (LG03)" : "ai-partner-mou review mode (LG03)", AI_VENDOR_AGREEMENT: "vendor-ai-contract-review (LG04)", VENDOR_AGREEMENT: /renews automatically/i.test(t) ? "obligations-tracker (LG06)" : "vendor-ai-contract-review (LG04)", DPDP_REQUEST: "dpdp-rights-request (LG07)" }[type.replace(/^AMENDMENT \((.*)\)$/, "$1")] || "lawyer triage";
  const routeF = /renews automatically/i.test(t) ? "obligations-tracker (LG06)" : route;
  const lawyer = type === "AI_PARTNER_MOU" ? "lawyer.radhika" : type === "DPDP_REQUEST" ? "dpo.vi" : "counsel.amit";
  const ai = /^VC/.test(id) ? type.indexOf("AI_VENDOR") >= 0 : (/^NDA/.test(id) && aiSignals(t) && /(model|training)/i.test(t));
  return { id: id, matter_id: dup ? dup.id : "MAT-LG-" + id.replace(/\W/g, ""), duplicate_of: dup ? dup.id : "", type: type, counterparty: cp, vi_entity: "Vodafone Idea Limited", ai_flag: ai,
    route: routeF, lawyer: dup ? dup.lawyer : lawyer, missing: type === "DPDP_REQUEST" ? "none for logging" : "deadline and reason, business owner, value band", authority_note: "Authority matrix not configured (L6)" };
}

// ---------------- LG-TR and LG-PR ----------------
function traceCheck(id, F) {
  const d = doc(id); const norm = s => String(s).replace(/\*\*/g, "").replace(/\s*\.\.\.$/, "").replace(/\s+/g, " ").trim();
  const src = norm(d ? d.text : "");
  const ok = F.filter(f => !f.quote || src.indexOf(norm(f.quote)) >= 0).length;
  return { verified: ok, unverified: F.length - ok, check_manually: F.filter(f => f.quote && src.indexOf(norm(f.quote)) < 0).map(f => f.item).join(", ") || "none" };
}
function privilegeStrip(F) {
  const lines = F.filter(f => f.tier !== "GREEN" && (f.external || f.proposed) && !/\[AI Office decision/.test(f.proposed)).map(f => (f.section || f.item) + ": we propose: \"" + (f.external || f.proposed) + "\"");
  const banned = /(\bRED\b|\bYELLOW\b|\bGREEN\b|fallback|tier|legal note|privileged|negotiation|RAI Board|CL-[A-Z]|GC approval)/i;
  const clean = lines.filter(x => !banned.test(x));
  return { text: clean.join(" ") || "No changes proposed.", stripped: lines.length - clean.length + F.filter(f => f.tier !== "GREEN").length };
}

// ---------------- Gold-label evaluation ----------------
function evalAll() {
  const res = [];
  LG.gold.forEach(g => {
    let ok = true, why = [];
    if (g.skill === "nda-triage") { const r = ndaTriage(g.id); const items = r.findings.filter(f => f.tier !== "GREEN").map(f => f.item);
      if (r.tier !== g.overall_tier) { ok = false; why.push("tier " + r.tier); }
      g.must_find.forEach(m => { if (items.indexOf(m) < 0) { ok = false; why.push("missed " + m); } });
      (g.must_not || []).forEach(m => { if (items.indexOf(m) >= 0 || r.tier === m) { ok = false; why.push("must_not " + m); } });
      if (g.escalate !== r.escalate) { ok = false; why.push("escalate"); } }
    else if (g.skill === "execution-check") { const r = executionCheck(g.id); if (r.result !== "FAIL") { ok = false; why.push("result"); } g.must_find.forEach(m => { if (r.failed.indexOf(m) < 0) { ok = false; why.push("missed " + m); } }); }
    else if (g.skill === "ai-partner-mou" && g.mode === "draft") { const r = mouDraft(g.id); g.must_find.forEach(s => { if (!r.sections.some(x => x[0].startsWith(s + " "))) { ok = false; why.push("missing " + s); } });
      const o = obligations(g.id).entries; if (!o.some(e => e.due === g.obligations.poc_start) || !o.some(e => e.due === g.obligations.production_decision)) { ok = false; why.push("dates"); } }
    else if (g.skill === "ai-partner-mou") { const r = mouReview(g.id); if (r.tier !== g.overall_tier) { ok = false; why.push("tier " + r.tier); }
      g.must_find.forEach(m => { const f = r.findings.find(x => x.item === "change " + m.change); if (!f || f.tier !== m.tier || f.recommend !== m.recommend) { ok = false; why.push("change " + m.change + (f ? " " + f.tier + "/" + f.recommend : " missing")); } });
      if (g.escalate !== r.escalate) { ok = false; why.push("escalate"); }
      if (g.execution_check) { const x = executionCheck(g.id); g.execution_check.must_find.forEach(m => { if (x.failed.indexOf(m) < 0) { ok = false; why.push("exec missed " + m); } }); } }
    else if (g.skill === "vendor-ai-contract-review") { const r = vendorReview(g.id); const items = r.findings.filter(f => f.tier !== "GREEN").map(f => f.item).concat(r.gaps);
      if (r.tier !== g.overall_tier) { ok = false; why.push("tier " + r.tier); }
      if (g.ai_applicable !== undefined && g.ai_applicable !== r.ai_applicable) { ok = false; why.push("ai_applicable"); }
      g.must_find.forEach(m => { const k = m.split(" ")[0]; if (/equivalent/.test(m) ? r.findings.find(f => f.item === "V9").tier !== "YELLOW" : items.indexOf(k) < 0) { ok = false; why.push("missed " + m); } });
      if (g.escalate !== r.escalate) { ok = false; why.push("escalate"); } }
    else if (g.skill === "obligations-tracker") { const r = obligations(g.id); if (r.auto_renewal !== g.auto_renewal || r.notice_deadline !== g.notice_deadline) { ok = false; why.push("notice"); }
      g.report_due_dates.forEach(dd => { if (!r.entries.some(e => e.due === dd)) { ok = false; why.push("report " + dd); } }); }
    else if (g.skill === "dpdp-rights-request") { const r = dpdp(g.id); const want = g.class.replace(" ", "_");
      if (r.class !== want) { ok = false; why.push("class " + r.class); } if (g.verification && g.verification !== r.verification) { ok = false; why.push("verification " + r.verification); }
      if (g.escalate !== r.escalate) { ok = false; why.push("escalate"); } if (g.partial_action !== undefined && g.partial_action !== r.partial_action) { ok = false; why.push("partial"); } }
    res.push({ id: g.id, skill: g.skill, ok: ok, critical: !!g.critical, why: why.join(", ") });
  });
  return res;
}
