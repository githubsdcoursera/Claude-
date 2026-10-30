// @description A03 Context (UC8, load only after verification): plan and rental, tenure band, trigger code with a neutral opening line, open ticket with status and ETA, last bill id, churn band (never spoken) and offer cooldown.
// @effect read_only
// @in msisdn:string "10-digit Vi postpaid number"
// @out found plan_id plan_name rental tenure_band trigger_code trigger_line has_ticket ticket_ref ticket_issue ticket_status ticket_eta bill_id churn_band
const c = customer(input.msisdn);
const u = c && c.uc8;
if (!u) return { found: false };
const plan = P.postpaid_catalogue.plans.find(p => p.id === u.plan_id) || {};
const lines = {
  T1: "I'm calling to check how things are going with your Vi postpaid service.",
  T2: "I noticed your last bill was higher than usual, and I wanted to make sure it makes sense to you.",
  T3: "I can see you've raised a couple of network issues recently, and I'm calling to make sure they're sorted.",
  T4: "I can see you asked about changing your connection, and I wanted to see if I can help first.",
  T5: "I noticed you've been using less of your plan lately, and I wanted to check it still fits you.",
  T6: "One of your plan benefits ends in the next few days, and I wanted to check everything's working for you.",
  T7: "I wanted to check in on your Vi postpaid service, and help with anything you need, including porting if you've decided to move.",
};
const t = u.ticket || {};
return { found: true, plan_id: u.plan_id, plan_name: plan.name || "", rental: plan.rental || "", tenure_band: u.tenure_months >= 24 ? "24m_plus" : "under_24m",
  trigger_code: u.trigger_code, trigger_line: lines[u.trigger_code] || lines.T1, has_ticket: !!t.ref, ticket_ref: t.ref || "", ticket_issue: t.issue || "",
  ticket_status: t.status || "", ticket_eta: t.eta || "", bill_id: (u.bill && u.bill.id) || "", churn_band: u.churn_band };
