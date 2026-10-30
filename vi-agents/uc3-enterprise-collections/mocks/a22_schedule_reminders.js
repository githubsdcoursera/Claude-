// @description A22 Reminder: schedule configurable reminders before and after the due date and send the validated payment link on WhatsApp, SMS and email.
// @effect side_effect
// @in account_id:string "Enterprise account id"
// @out scheduled reminders link_ref
return { scheduled: true, reminders: "3 days before, on the due date, and 2 days after", link_ref: ref("PAYL", input.account_id) };
