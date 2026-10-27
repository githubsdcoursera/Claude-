// MOCK DATA ONLY. Synthetic test personas used by every mock backend workflow.
// Numbers, names, prices and packs are invented for testing; they are NOT Vi catalogue values.
// Replace each mock workflow with the real Vi system integration before any live traffic.
const P = {
  customers: {
    // ---- UC5 International Roaming (postpaid) ----
    "9800000001": { name: "Rahul Mehta", first: "Rahul", segment: "postpaid", plan: "Vi Max 701 (MOCK)", circle: "KA",
      credit_limit: 5000, unbilled: 820, ir_barred: false, ir_active: false, corporate: false, dnd: false,
      consent: { ir_outreach: true, travel_dates_set: true }, attempts: 0, opted_out: false, language: "en",
      travel: { country: "United Arab Emirates", start: "2026-11-03", days: 7 }, prior_enquiry: "IR page visit 2026-10-25" },
    "9800000002": { name: "Sneha Iyer", first: "Sneha", segment: "postpaid", plan: "Vi Max 401 (MOCK)", circle: "TN",
      credit_limit: 1000, unbilled: 940, ir_barred: true, ir_active: false, corporate: false, dnd: false,
      consent: { ir_outreach: true }, attempts: 0, opted_out: false, language: "en",
      travel: { country: "Singapore", start: "2026-11-10", days: 5 }, prior_enquiry: "IR enquiry via app" },
    "9800000003": { name: "Amit Shah", first: "Amit", segment: "postpaid", plan: "Vi Max 501 (MOCK)", circle: "GJ",
      credit_limit: 4000, unbilled: 300, ir_barred: false, ir_active: false, corporate: false, dnd: true,
      consent: { ir_outreach: false }, attempts: 0, opted_out: false, language: "hi",
      travel: null, prior_enquiry: null },
    "9800000004": { name: "Priya Nair", first: "Priya", segment: "postpaid", plan: "Vi Business Corporate (MOCK)", circle: "KL",
      credit_limit: 20000, unbilled: 2100, ir_barred: false, ir_active: false, corporate: true, dnd: false,
      consent: { ir_outreach: true, travel_dates_set: true }, attempts: 0, opted_out: false, language: "en",
      travel: { country: "United Kingdom", start: "2026-11-15", days: 10 }, prior_enquiry: "IR enquiry" },
    "9800000005": { name: "Vikram Rao", first: "Vikram", segment: "postpaid", plan: "Vi Max 701 (MOCK)", circle: "AP",
      credit_limit: 6000, unbilled: 400, ir_barred: false, ir_active: false, corporate: false, dnd: false,
      consent: { ir_outreach: true, travel_dates_set: true }, attempts: 0, opted_out: false, language: "en",
      travel: { country: "United States", start: "2026-11-20", days: 14 }, prior_enquiry: "IR page visit",
      fail_provisioning: true },
    // ---- Prepaid Retention ----
    "9810000001": { name: "Kavya Reddy", first: "Kavya", segment: "prepaid", plan: "₹299 Unlimited 28 days (MOCK)", circle: "AP",
      dnd: false, consent: { retention: true }, attempts: 0, opted_out: false, lapse_risk: "high", days_to_expiry: 2,
      avg_recharge: 299, last_recharge: "2026-09-30", open_ticket: null, network_issue: { area: "Kukatpally", status: "known_outage", eta: "within 48 hours" } },
    "9810000002": { name: "Arjun Singh", first: "Arjun", segment: "prepaid", plan: "₹349 Unlimited 28 days (MOCK)", circle: "DL",
      dnd: false, consent: { retention: true }, attempts: 1, opted_out: false, lapse_risk: "high", days_to_expiry: 0,
      avg_recharge: 349, last_recharge: "2026-09-27", open_ticket: null, network_issue: null },
    "9810000003": { name: "Meera Joshi", first: "Meera", segment: "prepaid", plan: "₹199 Value 28 days (MOCK)", circle: "MH",
      dnd: false, consent: { retention: true }, attempts: 0, opted_out: false, lapse_risk: "medium", days_to_expiry: 5,
      avg_recharge: 199, last_recharge: "2026-10-04", open_ticket: null, network_issue: null },
    "9810000004": { name: "Rohit Das", first: "Rohit", segment: "prepaid", plan: "₹299 Unlimited 28 days (MOCK)", circle: "WB",
      dnd: true, consent: { retention: false }, attempts: 0, opted_out: false, lapse_risk: "high", days_to_expiry: 1,
      avg_recharge: 299, last_recharge: "2026-09-29", open_ticket: null, network_issue: null },
    "9810000005": { name: "Anjali Gupta", first: "Anjali", segment: "prepaid", plan: "₹479 Unlimited 56 days (MOCK)", circle: "UP",
      dnd: false, consent: { retention: true }, attempts: 3, opted_out: false, lapse_risk: "high", days_to_expiry: 3,
      avg_recharge: 479, last_recharge: "2026-09-05", open_ticket: { ref: "TKT-88812", issue: "call drops", status: "open" }, network_issue: null },
    // ---- Prepaid Dropped Leads ----
    "9820000001": { name: "Sanjay Kumar", first: "Sanjay", segment: "prospect", dnd: false, consent: { lead_followup: true }, attempts: 0, opted_out: false,
      lead: { id: "LD-71001", status: "dropped", duplicate: false, created: "2026-10-25",
        journey: "new_prepaid_sim", journey_label: "your new Vi prepaid SIM order", drop_step: "kyc", drop_label: "the Aadhaar verification step",
        kyc_status: "aadhaar_otp_not_completed", plan: "₹299 Unlimited 28 days (MOCK)", amount: "₹299", pincode: "560037", payment_status: "not_started" } },
    "9820000002": { name: "Fatima Sheikh", first: "Fatima", segment: "prepaid", dnd: false, consent: { lead_followup: true }, attempts: 1, opted_out: false,
      lead: { id: "LD-71002", status: "dropped", duplicate: false, created: "2026-10-26",
        journey: "recharge", journey_label: "your ₹349 recharge", drop_step: "payment", drop_label: "the payment step",
        kyc_status: "verified", plan: "₹349 Unlimited 28 days (MOCK)", amount: "₹349", pincode: "400050", payment_status: "failed_no_debit" } },
    "9820000003": { name: "George Thomas", first: "George", segment: "prospect", dnd: false, consent: { lead_followup: true }, attempts: 3, opted_out: false,
      lead: { id: "LD-71003", status: "dropped", duplicate: false, created: "2026-10-20",
        journey: "new_prepaid_sim", journey_label: "your new Vi prepaid SIM order", drop_step: "address", drop_label: "the delivery address step",
        kyc_status: "verified", plan: "₹199 Value 28 days (MOCK)", amount: "₹199", pincode: "682001", payment_status: "not_started" } },
    "9820000004": { name: "Lakshmi Pillai", first: "Lakshmi", segment: "prospect", dnd: false, consent: { lead_followup: true }, attempts: 0, opted_out: false,
      lead: { id: "LD-71004", status: "converted", duplicate: true, created: "2026-10-24",
        journey: "new_prepaid_sim", journey_label: "your new Vi prepaid SIM order", drop_step: "payment", drop_label: "the payment step",
        kyc_status: "verified", plan: "₹299 Unlimited 28 days (MOCK)", amount: "₹299", pincode: "600017", payment_status: "paid" } },
    "9820000005": { name: "Imran Khan", first: "Imran", segment: "prospect", dnd: false, consent: { lead_followup: true }, attempts: 0, opted_out: false,
      lead: { id: "LD-71005", status: "dropped", duplicate: false, created: "2026-10-26",
        journey: "new_prepaid_sim", journey_label: "your new Vi prepaid SIM order", drop_step: "plan_selection", drop_label: "the plan selection step",
        kyc_status: "not_started", plan: "", amount: "", pincode: "110092", payment_status: "not_started" } },
    // ---- UC1 / UC2 Prepaid inbound customer service (voice and chat share these) ----
    "9830000001": { name: "Deepa Menon", first: "Deepa", segment: "prepaid", plan: "₹299 Unlimited 28 days (MOCK)", circle: "KL",
      balance: "₹12.50", validity: "4 November 2026", data_left: "0.4 GB of today's 1.5 GB", tickets: [], dnd: false, consent: {}, attempts: 0, opted_out: false,
      vas: [{ id: "VAS-HT", name: "Hello Tunes", price: "₹49 per month", since: "2026-08-02" }, { id: "VAS-MOV", name: "Vi Movies and TV Pro", price: "₹99 per month", since: "2026-10-01" }],
      last_contacts: ["2026-10-20 IVR: balance check", "2026-10-02 app: recharge ₹299", "2026-09-15 care: VAS query"], strong_auth: false },
    "9830000002": { name: "Harish Patel", first: "Harish", segment: "prepaid", plan: "₹479 Unlimited 56 days (MOCK)", circle: "GJ",
      balance: "₹3.00", validity: "18 December 2026", data_left: "0 GB of today's 1.5 GB", tickets: [{ ref: "TKT-90211", issue: "no 4G at home", status: "open" }],
      dnd: false, consent: {}, attempts: 0, opted_out: false, vas: [], last_contacts: ["2026-10-24 care: network complaint", "2026-10-23 IVR: data balance", "2026-09-30 app: recharge ₹479"],
      network_issue: { area: "Navrangpura", status: "maintenance", eta: "by 6 pm today" }, strong_auth: true },
    // ---- UC7 Prepaid to postpaid upgrade ----
    "9840000001": { name: "Aditi Rao", first: "Aditi", segment: "prepaid", plan: "₹479 Unlimited 56 days (MOCK)", circle: "KA", dnd: false,
      consent: { upgrade_outreach: true }, attempts: 0, opted_out: false, monthly_spend: 640, propensity: "high", credit_ok: true, ekyc_ok: true },
    "9840000002": { name: "Manoj Tiwari", first: "Manoj", segment: "prepaid", plan: "₹299 Unlimited 28 days (MOCK)", circle: "UE", dnd: false,
      consent: { upgrade_outreach: true }, attempts: 0, opted_out: false, monthly_spend: 420, propensity: "high", credit_ok: true, ekyc_ok: true },
    "9840000003": { name: "Ritu Saxena", first: "Ritu", segment: "prepaid", plan: "₹349 Unlimited 28 days (MOCK)", circle: "TN", dnd: false,
      consent: { upgrade_outreach: true }, attempts: 0, opted_out: false, monthly_spend: 380, propensity: "medium", credit_ok: false, ekyc_ok: true },
    // ---- UC9 Prepaid network call assistant: subscribers and inbound callers ----
    "9850000001": { name: "Sunil Chandra", first: "Sunil", segment: "prepaid", plan: "₹479 Unlimited 56 days (MOCK)", circle: "MH", dnd: false, consent: {}, attempts: 0, opted_out: false,
      assistant: { opted_in: true, language: "en", greeting: "Sunil can't take your call right now.", vip: ["9851111111"], block_unknown_spam: true, urgent_keywords: ["urgent", "emergency", "hospital"] } },
  },
  // UC9 caller reputation (spam/fraud score from the network reputation service). MOCK values.
  caller_reputation: { "9851111111": { label: "VIP contact", spam: false, name: "Mom" }, "9852222222": { label: "reported spam (loan offers)", spam: true, name: "" },
    "9853333333": { label: "no reputation data", spam: false, name: "" } },
  // UC3 enterprise collections accounts (postpaid business billing). MOCK values.
  enterprise_accounts: {
    "ENT5001": { company: "Sharma Logistics Pvt Ltd", billing_contact: "9870000001", contact_name: "Rakesh Sharma", amount_due: "₹48,600", due_date: "20 October 2026",
      cycle: "September 2026", status: "overdue", days_overdue: 7, invoice: "INV-2026-09-5001", ptp_max_days: 7, dunning: "active" },
    "ENT5002": { company: "Greenleaf Foods LLP", billing_contact: "9870000002", contact_name: "Neha Kapoor", amount_due: "₹1,12,300", due_date: "25 October 2026",
      cycle: "September 2026", status: "overdue", days_overdue: 2, invoice: "INV-2026-09-5002", ptp_max_days: 7, dunning: "active" },
    "ENT5003": { company: "Orbit Software Pvt Ltd", billing_contact: "9870000003", contact_name: "Kiran Desai", amount_due: "₹0", due_date: "22 October 2026",
      cycle: "September 2026", status: "paid", days_overdue: 0, invoice: "INV-2026-09-5003", ptp_max_days: 7, dunning: "closed" },
  },
  // Postpaid catalogue used for UC7 upgrades and Vi Business sales. MOCK values; never hard-code these in agents.
  postpaid_plans: [
    { id: "PP-401", name: "Vi Max 401", price: "₹401 per month", benefit: "unlimited calls, 50 GB data with 200 GB rollover and 3,000 SMS", for_spend: [0, 450] },
    { id: "PP-501", name: "Vi Max 501", price: "₹501 per month", benefit: "unlimited calls, 90 GB data with 200 GB rollover, 3,000 SMS and Vi Movies and TV", for_spend: [450, 700] },
    { id: "PP-701", name: "Vi Max 701", price: "₹701 per month", benefit: "unlimited calls, unlimited data, 3,000 SMS and OTT subscriptions", for_spend: [700, 99999] },
  ],
  business_plans: [
    { id: "BIZ-A", name: "Vi Business Plan A", price: "₹399 per connection per month", benefit: "unlimited calls, 40 GB data with rollover, 3,000 SMS and mobile security", min_lines: 1 },
    { id: "BIZ-B", name: "Vi Business Plan B", price: "₹499 per connection per month", benefit: "unlimited calls, 75 GB data with rollover, 3,000 SMS, mobile security and cloud storage", min_lines: 5 },
    { id: "BIZ-C", name: "Vi Business Plan C", price: "₹649 per connection per month", benefit: "unlimited calls, unlimited data, 3,000 SMS, mobile security, cloud storage and Google Workspace for eligible volumes", min_lines: 20 },
  ],
  business_leads: {
    "9880000001": { lead_id: "BL-3001", contact: "Vivek Malhotra", company: "Malhotra Exports", entity: "pvt_ltd", requested_lines: 25, city: "Noida", dnd: false, dlt_ok: true, opted_out: false, attempts: 0 },
    "9880000002": { lead_id: "BL-3002", contact: "Shreya Iyer", company: "Iyer and Sons", entity: "proprietorship", requested_lines: 4, city: "Chennai", dnd: false, dlt_ok: true, opted_out: false, attempts: 0 },
    "9880000003": { lead_id: "BL-3003", contact: "Gaurav Jain", company: "Jain Traders", entity: "partnership", requested_lines: 8, city: "Jaipur", dnd: true, dlt_ok: true, opted_out: false, attempts: 0 },
  },
  // Entity-specific document rules from the approved KYC repository. MOCK values.
  kyc_rules: {
    pvt_ltd: "company PAN, GST certificate, certificate of incorporation, memorandum of association with list of directors, authorised signatory's Aadhaar and company address proof",
    llp: "company PAN, GST certificate, certificate of incorporation, LLP agreement with list of partners, authorised signatory's Aadhaar and company address proof",
    partnership: "firm PAN, GST certificate, partnership deed, authorised signatory's Aadhaar and firm address proof",
    proprietorship: "proprietor's PAN, GST certificate, proprietor's Aadhaar and business address proof",
  },
  // Approved knowledge answers (A10). MOCK values.
  kb: {
    sim_replacement: "You can get a replacement SIM at any Vi store with an original photo ID. It's free for the first replacement and the new SIM works within 4 hours.",
    porting: "To port your number, send an SMS with the word PORT, a space and your 10-digit mobile number to 1900. You'll receive a Unique Porting Code to give to your new operator.",
    vas_refund: "Charges for a value-added service stop from the date it is deactivated. Charges already applied for the current period are not refunded.",
    international_calling: "International calling is available on all prepaid plans. Rates depend on the country and are charged from your main balance.",
    bill_shock: "Bill shock protection caps your monthly bill at the plan amount for calls and SMS within plan terms.",
    rollover: "Unused data rolls over up to 200 GB on eligible postpaid plans, subject to plan terms.",
    easy_plus: "Easy+ lets employees buy eligible personal services on their corporate number without the charges going on the company bill.",
    competitor: "I can only compare against approved, current information. An advisor can share an approved comparison with you.",
    mobile_security: "Eligible Vi Business plans include a licensed mobile security suite at no extra charge, which goes beyond basic spam blocking.",
    cloud_storage: "Eligible plans include secure cloud storage with time-limited link sharing for files across phones and laptops.",
    workspace: "Google Workspace with business email, Meet and Drive is included on eligible plans and connection volumes. An advisor can confirm eligibility for your volume.",
    single_bill: "All your company connections come on one consolidated, GST-compliant bill, managed through the digital self-care portal.",
  },
  // ---- UC4 VSD Outcall Intelligence: accounts a human VSD agent calls ----
  accounts: {
    "ACC1001": { customer: "Nikhil Verma", msisdn: "9860000001", segment: "postpaid", plan: "Vi Max 501 (MOCK)", tenure_months: 38,
      health: "amber", arpu: "₹540", network_score: "poor in last 14 days", open_complaints: [{ ref: "CMP-5531", issue: "frequent call drops at home", age_days: 9 }],
      prior: ["2026-10-12 inbound care: call drops, ticket raised", "2026-09-28 bill query resolved"], sign_off_pending: "Service Connect follow-up on CMP-5531" },
    "ACC1002": { customer: "Pooja Bansal", msisdn: "9860000002", segment: "postpaid", plan: "Vi Max 701 (MOCK)", tenure_months: 14,
      health: "red", arpu: "₹780", network_score: "good", open_complaints: [{ ref: "CMP-5602", issue: "disputed roaming charge of ₹1,240", age_days: 4 }],
      prior: ["2026-10-20 port-out enquiry", "2026-10-19 bill dispute raised"], sign_off_pending: "Retention outreach" },
  },
  scripts: {
    SERVICE_CONNECT: { opening: "Hello, this is {agent} from Vi. I'm calling about your complaint {complaint} to make sure it has been resolved.",
      purpose: "Confirm the fix, record sign-off, and log any remaining issue.", must_say: "This call is recorded for quality and training.",
      close: "Thank you. I've recorded your confirmation against complaint {complaint}." },
    RETENTION: { opening: "Hello, this is {agent} from Vi. I'm calling to check how your Vi experience has been.",
      purpose: "Understand concerns, resolve service issues first, and offer only approved retention options.", must_say: "This call is recorded for quality and training.",
      close: "Thank you for your time. I've noted everything we discussed." },
  },
  nba_library: [
    { cue: "frustrat|angry|fed up|waste|useless|third time|again and again", trigger: "negative_shift", suggestion: "Acknowledge the repeated effort first, for example: I understand this has taken too many calls, and I am sorry. Then confirm the one thing you will do today." },
    { cue: "port|switch|leave|other operator|jio|airtel", trigger: "churn_signal", suggestion: "Do not argue or delay. Acknowledge, ask what would change their mind, and if they still want to port, give the approved UPC steps." },
    { cue: "charge|bill|refund|dispute|overcharged", trigger: "billing_dispute", suggestion: "Read the disputed amount from the account panel, confirm the dispute reference, and explain the next update date. Do not promise a refund." },
    { cue: "still|not fixed|same problem|drop|no signal", trigger: "unresolved_issue", suggestion: "Do not record sign-off. Re-open the complaint with the latest symptoms and give the customer the new reference." },
    { cue: "fixed|working now|resolved|better now|no issue", trigger: "positive_resolution", suggestion: "Ask for explicit confirmation that the issue is resolved, then record sign-off." },
  ],
  coverage: { "560037": "4G and 5G", "400050": "4G and 5G", "682001": "4G", "600017": "4G and 5G", "110092": "4G" },
  // Prepaid recharge plans (plan fit) and the signed offer-authority matrix. MOCK values.
  prepaid_plans: [
    { id: "RC-299", price: "₹299", benefit: "unlimited calls, 1.5 GB data per day and 100 SMS per day", validity: "28 days", data_per_day: 1.5 },
    { id: "RC-349", price: "₹349", benefit: "unlimited calls, 2 GB data per day and 100 SMS per day", validity: "28 days", data_per_day: 2 },
    { id: "RC-479", price: "₹479", benefit: "unlimited calls, 1.5 GB data per day and 100 SMS per day", validity: "56 days", data_per_day: 1.5 },
    { id: "RC-199", price: "₹199", benefit: "unlimited calls, 1 GB data per day and 100 SMS per day", validity: "28 days", data_per_day: 1 },
  ],
  offer_matrix: [
    // risk band x reason -> the strongest offer the agent is authorised to make. chargeable offers need consent + OTP.
    { risk: "high", reason: "network", offer_id: "OF-NW-10GB", chargeable: false, must_say: "10 GB of bonus data free for 7 days, as an apology for the network issue" },
    { risk: "high", reason: "price", offer_id: "OF-PR-RC299-50", chargeable: true, price: "₹249", must_say: "the ₹299 plan for ₹249 on your next recharge, with the same unlimited calls, 1.5 GB data per day and 100 SMS per day, valid 28 days" },
    { risk: "high", reason: "data", offer_id: "OF-DT-RC349", chargeable: true, price: "₹349", must_say: "the ₹349 plan with 2 GB data per day, unlimited calls and 100 SMS per day, valid 28 days" },
    { risk: "medium", reason: "price", offer_id: "OF-PR-5GB", chargeable: false, must_say: "5 GB of bonus data free with your next recharge" },
    { risk: "medium", reason: "network", offer_id: "OF-NW-5GB", chargeable: false, must_say: "5 GB of bonus data free for 7 days" },
  ],
  // IR packs: must-say fields are spoken verbatim. MOCK values.
  ir_packs: [
    { id: "IR-GCC-7", countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain"], days: 7,
      price: "₹2,999", inclusion: "5 GB data, 150 minutes of calls and 100 SMS", overage: "₹5 per MB after the pack data is used",
      validity: "7 days from activation", data_gb: 5 },
    { id: "IR-GCC-10", countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain"], days: 10,
      price: "₹3,999", inclusion: "8 GB data, 200 minutes of calls and 100 SMS", overage: "₹5 per MB after the pack data is used",
      validity: "10 days from activation", data_gb: 8 },
    { id: "IR-ASIA-7", countries: ["Singapore", "Thailand", "Malaysia", "Indonesia"], days: 7,
      price: "₹2,499", inclusion: "4 GB data, 100 minutes of calls and 100 SMS", overage: "₹5 per MB after the pack data is used",
      validity: "7 days from activation", data_gb: 4 },
    { id: "IR-WORLD-14", countries: ["United States", "United Kingdom", "Canada", "Germany", "France", "Australia"], days: 14,
      price: "₹5,999", inclusion: "12 GB data, 300 minutes of calls and 100 SMS", overage: "₹5 per MB after the pack data is used",
      validity: "14 days from activation", data_gb: 12 },
    { id: "IR-WORLD-30", countries: ["United States", "United Kingdom", "Canada", "Germany", "France", "Australia"], days: 30,
      price: "₹8,999", inclusion: "25 GB data, 500 minutes of calls and 100 SMS", overage: "₹5 per MB after the pack data is used",
      validity: "30 days from activation", data_gb: 25 },
  ],
  otp_ok: "123456", // MOCK: the only OTP the mock verifier accepts
};

function customer(msisdn) {
  const k = String(msisdn || "").replace(/\D/g, "").slice(-10);
  return P.customers[k] ? Object.assign({ msisdn: k }, P.customers[k]) : null;
}

// Stable short reference derived from inputs (stands in for system-generated IDs).
function ref(prefix, ...parts) {
  let h = 0;
  for (const ch of parts.join("|")) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return prefix + "-" + h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}
