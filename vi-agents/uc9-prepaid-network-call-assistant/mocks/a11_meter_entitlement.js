// @description A11 Post-Call: meter the handled call against the subscriber's call-assistant entitlement and write the eval record.
// @effect side_effect
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @in outcome:string "message_delivered, spam_blocked, urgent_push or no_message"
// @out metered remaining_this_month
return { metered: true, remaining_this_month: 87 };
