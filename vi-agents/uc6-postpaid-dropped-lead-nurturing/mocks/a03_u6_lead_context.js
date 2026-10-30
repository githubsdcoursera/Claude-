// @description A03 Context (UC6, load only after right-party confirmation): lead id, journey code J1-J5, drop step, selected plan, address serviceability, eKYC status, UPC status, lines and prior contacts.
// @effect read_only
// @in msisdn:string "10-digit mobile number of the lead"
// @out found lead_id journey journey_label drop_step drop_label selected_plan ekyc_status upc_status lines prior_contacts
const c = customer(input.msisdn);
const l = c && c.uc6;
if (!l) return { found: false, lead_id: "", journey: "", journey_label: "", drop_step: "", drop_label: "", selected_plan: "", ekyc_status: "", upc_status: "", lines: 0, prior_contacts: "" };
return { found: true, lead_id: l.lead_id, journey: l.journey, journey_label: l.journey_label, drop_step: l.drop_step, drop_label: l.drop_label,
  selected_plan: l.selected_plan, ekyc_status: l.ekyc_status, upc_status: l.upc_status, lines: l.lines, prior_contacts: l.prior_contacts };
