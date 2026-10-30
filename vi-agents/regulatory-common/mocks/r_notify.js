// @description R-NT Notifier: send an internal alert, reminder, digest or escalation to a user in Outlook or Teams (internal only; never to an external body).
// @effect side_effect
// @in to:string "Internal user id"
// @in message:string "Message text"
// @out sent notification_id
return { sent: !!rUser(input.to), notification_id: rRef("NTF", input.to || "", input.message || "") };
