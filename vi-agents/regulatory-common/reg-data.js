// SYNTHETIC REGULATORY CORPUS: every document, reference, date, position and stakeholder below is invented for
// development and testing. Identifiers carry "SYN"; competitors are anonymised (Operator-A, Operator-B,
// Industry Body-X). Nothing here is a real regulator publication, Vi submission or competitor statement.
const R = {
  today: "2026-10-27",
  autonomy_level: "L2", // pilot: L0-L2; L3 after HITL exit (D8); L4 only if D6 approves
  internal_buffer_working_days: 3, // U3-7 draft rule: internal due = statutory due - 3 working days
  users: {
    "officer.asha": { name: "Asha Rao", role: "officer", groups: ["general"], manager: "manager.neel" },
    "officer.vikram": { name: "Vikram Sethi", role: "officer", groups: ["general", "agr_restricted"], manager: "manager.neel", on_leave: true },
    "officer.meera": { name: "Meera Pillai", role: "officer", groups: ["general"], manager: "manager.neel" },
    "manager.neel": { name: "Neel Kapoor", role: "manager", groups: ["general", "agr_restricted"], manager: "head.reg" },
    "head.reg": { name: "Head, Regulatory (synthetic)", role: "head", groups: ["general", "agr_restricted"], approver: true },
    "triage.officer": { name: "Triage Officer (synthetic)", role: "officer", groups: ["general"], manager: "manager.neel" },
  },
  docs: {
    "TRAI-SYN-CP-2026-11": { title: "[SYNTHETIC] Consultation Paper on Assignment of Satellite Spectrum for Commercial Services", issuer: "TRAI", type: "consultation",
      issue_date: "2026-10-20", comments_due: "2026-11-17", counter_due: "2026-12-01", pages: 124, classification: "internal", status: "current", topic: "satellite_spectrum",
      definitions: "\"Satellite earth station gateway\" (para 1.4, new) and \"shared spectrum band\" (para 1.6, changed)",
      cross_refs: "TRAI-SYN-REC-2023-04 and DOT-SYN-LIC-2026-01",
      questions: [
        { q: "Q1", page: 38, text: "Should satellite spectrum for commercial services be assigned administratively or through auction?", proposed: "administrative assignment for gateway-linked services", impact: "affects cost of spectrum for terrestrial operators competing with satellite services" },
        { q: "Q2", page: 41, text: "What pricing methodology should apply if spectrum is assigned administratively?", proposed: "a formula-based annual charge of a percentage of adjusted gross revenue", impact: "level-playing-field question for licence fees" },
        { q: "Q3", page: 47, text: "Should the assignment period be 5, 10 or 20 years?", proposed: "a period of 5 years, subject to review", impact: "short tenure may limit investment certainty" },
        { q: "Q4", page: 52, text: "Should satellite operators be subject to the same security and lawful-interception conditions as terrestrial licensees?", proposed: "equivalent conditions, subject to technical feasibility", impact: "security parity for all access providers" },
        { q: "Q5", page: 58, text: "Should a roll-out obligation apply to satellite service providers?", proposed: "no roll-out obligation", impact: "asymmetric obligations versus terrestrial operators" },
        { q: "Q6", page: 63, text: "How should direct satellite-to-device connectivity be licensed?", proposed: "a separate authorisation under the unified licence", impact: "new competitive segment for mobile services" },
      ] },
    "DOT-SYN-LIC-2025-03": { title: "[SYNTHETIC] Licence Amendment No. 3 on Spectrum Sharing", issuer: "DoT", type: "notification", issue_date: "2025-03-14", status: "superseded",
      superseded_by: "DOT-SYN-LIC-2026-01", classification: "internal", topic: "spectrum_sharing", summary: "Permitted spectrum sharing within the same band with prior intimation of 30 days (clause 4.2)." },
    "DOT-SYN-LIC-2026-01": { title: "[SYNTHETIC] Licence Amendment No. 1 of 2026 on Spectrum Sharing", issuer: "DoT", type: "notification", issue_date: "2026-01-09", status: "current",
      classification: "internal", topic: "spectrum_sharing", summary: "Permits spectrum sharing within the same band with prior intimation of 15 days (clause 4.2) and adds a reporting format (Annex B)." },
    "TRAI-SYN-REC-2023-04": { title: "[SYNTHETIC] Recommendations on Licensing Framework for Satellite Gateways", issuer: "TRAI", type: "recommendation", issue_date: "2023-06-02", status: "current",
      classification: "internal", topic: "satellite_spectrum", summary: "Recommended a light-touch gateway authorisation (para 3.7) and left spectrum assignment for later consultation (para 3.9)." },
    "TDSAT-SYN-2024-118": { title: "[SYNTHETIC] Judgment in Petition No. 118 of 2024 on Spectrum Charges", issuer: "TDSAT", type: "judgment", issue_date: "2024-09-18", status: "current",
      classification: "internal", topic: "satellite_spectrum", summary: "Held that spectrum charges must follow the methodology notified at the time of assignment (para 41).", citation: "TDSAT-SYN-2024-118, para 41" },
    "VI-SYN-INWARD-0912": { title: "[SYNTHETIC] Scanned letter on QoS audit (poor scan)", issuer: "DoT LSA office", type: "information_request", issue_date: null, status: "current",
      classification: "internal", topic: "quality_of_service", ocr_low_confidence: ["issue date (page 1, top right)", "response deadline (page 2, para 3)"], summary: "Requests QoS audit data for two circles; the date and deadline are illegible." },
    "VI-SYN-AGR-NOTE-07": { title: "[SYNTHETIC] Litigation strategy note on licence fee and AGR", issuer: "Vi Legal", type: "internal_note", issue_date: "2026-08-11", status: "current",
      classification: "restricted", group: "agr_restricted", topic: "satellite_spectrum", summary: "Restricted litigation strategy on licence-fee treatment." },
  },
  international: {
    satellite_spectrum: [
      { jurisdiction: "United Kingdom", regulator: "Ofcom", instrument: "[SYNTHETIC] OFCOM-SYN-2025-07 statement on satellite gateway licensing", approach: "administrative assignment with cost-based fees", date: "2025-07-15", status: "in force" },
      { jurisdiction: "United States", regulator: "FCC", instrument: "[SYNTHETIC] FCC-SYN-2024-112 report and order", approach: "shared licensing with coordination; auctions for exclusive terrestrial use", date: "2024-11-20", status: "in force" },
      { jurisdiction: "Singapore", regulator: "IMDA", instrument: "[SYNTHETIC] IMDA-SYN-2025-02 decision", approach: "administrative assignment with annual fees", date: "2025-02-28", status: "in force" },
      { jurisdiction: "Australia", regulator: "ACMA", instrument: "[SYNTHETIC] ACMA-SYN-2023-09 class licence", approach: "class licensing for user terminals; apparatus licences for gateways", date: "2023-09-05", status: "under review" },
    ],
  },
  // Public submissions only (anonymised). Stance per question: support / oppose / conditional / silent / unclear.
  stakeholders: {
    "TRAI-SYN-CP-2026-11": [
      { name: "Operator-A (SYNTHETIC)", source: "OPA-SYN-RESP-2026-11 (published response)", stances: { Q1: ["oppose", "auction ensures level playing field"], Q2: ["conditional", "only if parity with terrestrial charges"], Q3: ["support", "20 years for certainty"], Q4: ["support", "security parity"], Q5: ["oppose", "roll-out obligation should apply"], Q6: ["unclear", "response does not state a stance"] } },
      { name: "Operator-B (SYNTHETIC)", source: "OPB-SYN-RESP-2026-11 (published response)", stances: { Q1: ["support", "administrative assignment speeds deployment"], Q2: ["support", "formula-based charge"], Q3: ["conditional", "10 years minimum"], Q4: ["support", "equivalent conditions"], Q5: ["silent", "not addressed"], Q6: ["support", "separate authorisation"] } },
      { name: "Industry Body-X (SYNTHETIC)", source: "IBX-SYN-RESP-2026-11 (published response)", stances: { Q1: ["oppose", "auction for access services"], Q2: ["oppose", "administrative pricing undervalues spectrum"], Q3: ["support", "20 years"], Q4: ["support", "security parity"], Q5: ["oppose", "obligations should be symmetric"], Q6: ["conditional", "only under the unified licence with same obligations"] } },
    ],
  },
  // Vi position register. status: current / superseded. approved: recorded approver decision (U2-2).
  positions: [
    { id: "POS-SYN-SAT-2021", topic: "satellite_spectrum", issue: "Q1", stance: "Vi supported administrative assignment for satellite backhaul only.", source: "VI-SUB-SYN-2021-014", para: "2.3", date: "2021-05-10", approved: true, status: "superseded", superseded_by: "POS-SYN-SAT-2025" },
    { id: "POS-SYN-SAT-2025", topic: "satellite_spectrum", issue: "Q1", stance: "Vi's position is that spectrum used to provide access services to retail customers must be assigned through auction, so that satellite and terrestrial providers compete on equal terms.", source: "VI-SUB-SYN-2025-031", para: "3.2", date: "2025-02-12", approved: true, status: "current" },
    { id: "POS-SYN-SAT-2025-P", topic: "satellite_spectrum", issue: "Q2", stance: "Vi's position is that any administratively assigned spectrum must be priced at market-discovered value, not a revenue-share formula.", source: "VI-SUB-SYN-2025-031", para: "3.5", date: "2025-02-12", approved: true, status: "current" },
    { id: "POS-SYN-SAT-2025-T", topic: "satellite_spectrum", issue: "Q3", stance: "Vi's position is that the assignment period should be 20 years, aligned with terrestrial access spectrum.", source: "VI-SUB-SYN-2025-031", para: "3.8", date: "2025-02-12", approved: true, status: "current" },
    { id: "POS-SYN-SEC-2023", topic: "satellite_spectrum", issue: "Q4", stance: "Vi's position is that all access providers, including satellite operators, must meet identical security and lawful-interception conditions.", source: "VI-SUB-SYN-2023-022", para: "4.1", date: "2023-03-02", approved: true, status: "current" },
    { id: "POS-SYN-ROL-2022", topic: "satellite_spectrum", issue: "Q5", stance: "Vi's position is that roll-out obligations should apply symmetrically to all providers of access services.", source: "VI-SUB-SYN-2022-009", para: "5.4", date: "2022-02-18", approved: true, status: "current" },
    { id: "POS-SYN-NN-2022", topic: "net_neutrality", issue: "zero_rating", stance: "Vi supported a case-by-case review of zero-rated offers.", source: "VI-SUB-SYN-2022-017", para: "2.6", date: "2022-07-01", approved: true, status: "current" },
    { id: "POS-SYN-NN-2023", topic: "net_neutrality", issue: "zero_rating", stance: "Vi supported a blanket permission for zero-rated offers subject to transparency.", source: "VI-MEMO-SYN-2023-044", para: "1.3", date: "2023-11-20", approved: true, status: "current" },
    { id: "POS-SYN-QOS-2023", topic: "quality_of_service", issue: "benchmarks", stance: "Vi supported circle-level QoS benchmarks measured quarterly.", source: "VI-SUB-SYN-2023-030", para: "3.1", date: "2023-04-11", approved: true, status: "current" },
    { id: "POS-SYN-NN-2023-DRAFT", topic: "net_neutrality", issue: "traffic_management", stance: "Draft note suggesting looser traffic-management rules.", source: "VI-DRAFT-SYN-2023-051", para: "2.1", date: "2023-12-05", approved: false, status: "draft" },
  ],
  // Known source passages for citation verification (doc -> para -> text).
  passages: {
    "VI-SUB-SYN-2025-031": { "3.2": "spectrum used to provide access services to retail customers must be assigned through auction", "3.5": "priced at market-discovered value", "3.8": "assignment period should be 20 years" },
    "VI-SUB-SYN-2023-022": { "4.1": "identical security and lawful-interception conditions" },
    "VI-SUB-SYN-2022-009": { "5.4": "roll-out obligations should apply symmetrically" },
    "VI-SUB-SYN-2022-017": { "2.6": "case-by-case review of zero-rated offers" },
    "VI-MEMO-SYN-2023-044": { "1.3": "blanket permission for zero-rated offers subject to transparency" },
    "VI-SUB-SYN-2023-030": { "3.1": "circle-level QoS benchmarks measured quarterly" },
    "TRAI-SYN-CP-2026-11": { "p38": "assigned administratively or through auction", "p47": "a period of 5 years", "deadline": "comments by 17 November 2026; counter-comments by 1 December 2026" },
    "TDSAT-SYN-2024-118": { "41": "methodology notified at the time of assignment" },
  },
  // RA-UC3 sender register (U3-2) and ownership matrix (U3-3).
  sender_register: { "trai.gov.in": "TRAI", "dot.gov.in": "DoT", "meity.gov.in": "MeitY", "coai.com": "Industry body" },
  ownership: {
    information_request: { owner: "officer.asha", deputy: "officer.meera", approver: "manager.neel" },
    consultation: { owner: "officer.meera", deputy: "officer.asha", approver: "head.reg" },
    direction: { owner: "officer.vikram", deputy: "officer.asha", approver: "head.reg" },
    show_cause: { owner: "officer.vikram", deputy: "officer.meera", approver: "head.reg" },
    meeting_notice: { owner: "officer.asha", deputy: "officer.meera", approver: "manager.neel" },
    restricted: { owner: "officer.vikram", deputy: "manager.neel", approver: "head.reg" },
  },
  holidays: ["2026-11-08", "2026-11-09"],
  inbox: {
    "MAIL-SYN-001": { from: "advisor.qos@trai.gov.in", subject: "[SYNTHETIC] Furnishing of QoS data for Q2", received: "2026-10-27", type_hint: "information_request",
      body: "You are requested to furnish circle-wise QoS data for Q2 within 15 days of receipt of this letter.", asks: [{ action: "furnish circle-wise QoS data for Q2", para: "para 2", basis: "within 15 days of receipt", days: 15, convention: "calendar" }], ref: "TRAI-SYN-QOS-2026-221", topic: "quality_of_service" },
    "MAIL-SYN-002": { from: "director.lic@dot.gov.in", subject: "[SYNTHETIC] Submission of compliance report on spectrum sharing", received: "2026-10-27", type_hint: "compliance_reminder",
      body: "The compliance report shall be submitted by 10 November 2026.", attachment_text: "Annex: compliance report due by 12 November 2026.",
      asks: [{ action: "submit compliance report on spectrum sharing", para: "para 1", basis: "explicit date", body_date: "2026-11-10", attachment_date: "2026-11-12" }], ref: "DOT-SYN-LIC-2026-077", topic: "spectrum_sharing" },
    "MAIL-SYN-003": { from: "ddg.as@dot.gov.in", subject: "[SYNTHETIC] Directions on lawful-interception readiness", received: "2026-10-27", type_hint: "direction",
      body: "Vi is directed to (i) furnish the LI node inventory, (ii) submit a compliance report on LI readiness and (iii) attend a review meeting.",
      asks: [{ action: "furnish the LI node inventory", para: "para 3(i)", basis: "explicit date", date: "2026-11-06" }, { action: "submit a compliance report on LI readiness", para: "para 3(ii)", basis: "explicit date", date: "2026-11-13" },
        { action: "attend the review meeting", para: "para 3(iii)", basis: "explicit date", date: "2026-11-04" }], ref: "DOT-SYN-AS-2026-310", topic: "security" },
    "MAIL-SYN-004": { from: "chairman-office@trai-gov.in.co", subject: "[SYNTHETIC] URGENT: Pay penalty today", received: "2026-10-27", type_hint: "direction", body: "Pay the penalty today via the attached link.", asks: [], ref: "", topic: "unknown", claims_regulator: "TRAI" },
    "MAIL-SYN-005": { from: "advisor.qos@trai.gov.in", subject: "RE: [SYNTHETIC] Furnishing of QoS data for Q2", received: "2026-10-28", type_hint: "information_request", thread_of: "MAT-SYN-0042",
      body: "Further to our letter, please also include call-drop rates in the data.", asks: [{ action: "include call-drop rates in the Q2 QoS data", para: "para 1", basis: "same deadline as the original letter", linked_obligation: "OBL-SYN-0042-1" }], ref: "TRAI-SYN-QOS-2026-221", topic: "quality_of_service" },
    "MAIL-SYN-006": { from: "secretary@trai.gov.in", subject: "[SYNTHETIC] Meeting notice: Open House on satellite spectrum", received: "2026-10-27", type_hint: "meeting_notice",
      body: "Vi is invited to an Open House Discussion on 20 November 2026 at 11:00. Please confirm participation.", asks: [{ action: "confirm participation in the Open House", para: "para 2", basis: "explicit date", date: "2026-11-13" }], ref: "TRAI-SYN-OHD-2026-19", topic: "satellite_spectrum" },
    "MAIL-SYN-007": { from: "ddg.lf@dot.gov.in", subject: "[SYNTHETIC] Show Cause Notice for delayed QoS reporting", received: "2026-10-27", type_hint: "show_cause",
      body: "Vi is called upon to show cause within 21 days of receipt why a penalty should not be imposed.", asks: [{ action: "reply to the show cause notice", para: "para 4", basis: "within 21 days of receipt", days: 21, convention: "calendar" }], ref: "DOT-SYN-SCN-2026-015", topic: "quality_of_service" },
    "MAIL-SYN-008": { from: "ddg.lf@dot.gov.in", subject: "[SYNTHETIC] Licence fee assessment: AGR reconciliation", received: "2026-10-27", type_hint: "information_request", restricted: true,
      body: "Furnish the AGR reconciliation for FY 2025-26 by 14 November 2026.", asks: [{ action: "furnish the AGR reconciliation for FY 2025-26", para: "para 2", basis: "explicit date", date: "2026-11-14" }], ref: "DOT-SYN-LF-2026-044", topic: "licence_fee" },
  },
  // Existing obligations register (RA-UC3).
  obligations: [
    { id: "OBL-SYN-0042-1", matter: "MAT-SYN-0042", action: "furnish circle-wise QoS data for Q1", source: "TRAI-SYN-QOS-2026-180 para 2", due: "2026-10-30", internal_due: "2026-10-27", owner: "officer.asha", deputy: "officer.meera", approver: "manager.neel", status: "C3 Assigned", last_update: "2026-10-16", assigned: "2026-10-15" },
    { id: "OBL-SYN-0100", matter: "MAT-SYN-0100", action: "submit numbering resource utilisation report", source: "DOT-SYN-NUM-2026-090 para 3", due: "2026-11-06", internal_due: "2026-11-03", owner: "officer.meera", deputy: "officer.asha", approver: "manager.neel", status: "C3 Assigned", last_update: "2026-10-20", assigned: "2026-10-20" },
    { id: "OBL-SYN-0101", matter: "MAT-SYN-0101", action: "submit EMF compliance self-certification", source: "DOT-SYN-EMF-2026-012 para 1", due: "2026-10-26", internal_due: "2026-10-21", owner: "officer.asha", deputy: "officer.meera", approver: "manager.neel", status: "C4 In progress", last_update: "2026-10-20", assigned: "2026-10-05" },
    { id: "OBL-SYN-0103", matter: "MAT-SYN-0103", action: "furnish licence-fee working papers for FY 2024-25", source: "DOT-SYN-LF-2026-031 para 2", due: "2026-11-20", internal_due: "2026-11-17", owner: "officer.vikram", deputy: "manager.neel", approver: "head.reg", status: "C4 In progress", last_update: "2026-10-24", assigned: "2026-10-10", restricted: true, group: "agr_restricted" },
    { id: "OBL-SYN-0102", matter: "MAT-SYN-0102", action: "file consultation comments on TRAI-SYN-CP-2026-11", source: "TRAI-SYN-CP-2026-11 cover page", due: "2026-11-17", internal_due: "2026-11-12", owner: "officer.meera", deputy: "officer.asha", approver: "head.reg", status: "C4 In progress", last_update: "2026-10-26", assigned: "2026-10-21" },
  ],
  templates: {
    meeting_ack: "Sir/Madam, With reference to your letter {{ref}} dated {{date}}, Vodafone Idea Limited confirms its participation in the {{event}}. The nominated representative's details will be shared separately. Yours faithfully, for Vodafone Idea Limited ({{approver_title}})",
    memo: "MEMO | To: {{to}} | From: Regulatory Affairs | Subject: {{subject}} | Summary: {{summary}} | Vi position: {{position}} | Sources: {{sources}} | AI draft for officer review.",
  },
  monitor_new: { id: "DOT-SYN-NOTIF-2026-10-27", title: "[SYNTHETIC] Notification on revised EMF self-certification format", issuer: "DoT", published: "2026-10-27", topic: "emf", relevance: 0.86,
    abstract: "Revises the EMF self-certification format (Annex A). Comments invited by 10 November 2026. Applies to all access service licensees.", deadline: "2026-11-10", source: "Approved source register: DoT notifications page" },
};

function rUser(u) { return R.users[String(u || "").trim()] || null; }
function canSee(u, doc) { const usr = rUser(u); return !!usr && (doc.classification !== "restricted" || usr.groups.indexOf(doc.group) >= 0); }
function addDays(d, n) { const t = new Date(d + "T00:00:00Z"); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); }
function isWorking(d) { const w = new Date(d + "T00:00:00Z").getUTCDay(); return w !== 0 && w !== 6 && R.holidays.indexOf(d) < 0; }
function minusWorking(d, n) { let x = d; let k = 0; while (k < n) { x = addDays(x, -1); if (isWorking(x)) k++; } return x; }
function workingBetween(a, b) { let n = 0, x = a; while (x < b) { x = addDays(x, 1); if (isWorking(x)) n++; } return n; }
function longDate(d) { if (!d) return ""; const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; const [y, mo, da] = d.split("-").map(Number); return da + " " + m[mo - 1] + " " + y; }
function rRef(prefix, ...parts) { let h = 0; for (const ch of parts.join("|")) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return prefix + "-" + h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7); }
function positionsFor(topic, issue, u) {
  return R.positions.filter(p => p.topic === topic && (!issue || p.issue === issue));
}

// ---- Shared deterministic helpers used by the R-agents ----
function docFor(u, id) { const d = R.docs[id]; if (!d) return { state: "not_found" }; if (!canSee(u, d)) return { state: "not_found" }; return { state: "ok", doc: d }; }
function successorNote(id) { const d = R.docs[id]; return d && d.status === "superseded" ? "SUPERSEDED by " + d.superseded_by + " (" + R.docs[d.superseded_by].title + ")" : ""; }
function questionList(d) { return (d.questions || []).map(q => q.q + " (p. " + q.page + "): " + q.text).join(" "); }
function stanceRows(id) {
  const st = R.stakeholders[id] || [], d = R.docs[id];
  return (d.questions || []).map(q => {
    const vi = R.positions.find(p => p.topic === d.topic && p.issue === q.q && p.status === "current" && p.approved);
    const others = st.map(s => s.name + ": " + s.stances[q.q][0] + " (" + s.stances[q.q][1] + ") [" + s.source + "]").join("; ");
    const align = vi ? "Vi current position " + vi.id + " [" + vi.source + ", para " + vi.para + "]" : "Vi has no prior position (GAP)";
    return q.q + ": " + others + ". " + align + ".";
  });
}
function verifyClaims(text) {
  const rows = []; let sup = 0, par = 0, uns = 0;
  String(text || "").split(/\s*;\s*/).filter(Boolean).forEach(c => {
    const m = c.match(/\[([A-Z0-9-]+)[, ]+(?:para |p\.? ?)?([\w.]+)\]/i);
    let tag = "UNSUPPORTED", why = "no citation";
    if (m) {
      const doc = m[1].toUpperCase(), key = m[2].replace(/^p\.?/i, "");
      const src = R.passages[doc] || {};
      const pas = src[key] || src["p" + key];
      if (!pas) why = "citation " + doc + " " + m[2] + " not found in the corpus";
      else {
        const claim = c.toLowerCase().replace(/\[.*?\]/g, "");
        const nums = (claim.match(/\d+/g) || []).filter(n => pas.indexOf(n) < 0);
        const words = pas.toLowerCase().split(/\W+/).filter(w => w.length > 3);
        const hit = words.filter(w => claim.indexOf(w) >= 0).length / Math.max(1, words.length);
        if (nums.length) { why = "number " + nums.join(", ") + " is not in the source passage"; }
        else if (hit >= 0.6) { tag = "SUPPORTED"; why = "matches " + doc + " " + m[2]; }
        else if (hit >= 0.3) { tag = "PARTIAL"; why = "partly matches " + doc + " " + m[2]; }
        else why = "source passage does not say this";
      }
    }
    if (tag === "SUPPORTED") sup++; else if (tag === "PARTIAL") par++; else uns++;
    rows.push(tag + ": \"" + c.replace(/\s*\[.*?\]/g, "").trim() + "\" (" + why + ")");
  });
  return { supported: sup, partial: par, unsupported: uns, table: rows.join(" | ") };
}
