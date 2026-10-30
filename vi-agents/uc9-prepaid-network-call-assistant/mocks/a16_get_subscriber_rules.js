// @description A16 Call Screening: the subscriber's opt-in status, greeting, language, VIP list, spam-blocking and urgent-keyword rules, set in the Vi App.
// @effect read_only
// @in subscriber:string "Subscriber's 10-digit Vi number"
// @out opted_in first_name greeting language block_spam urgent_words
const c = customer(input.subscriber);
const a = c && c.assistant;
if (!a) return { opted_in: false, first_name: "", greeting: "", language: "en", block_spam: true, urgent_words: "" };
return { opted_in: a.opted_in, first_name: c.first, greeting: a.greeting, language: a.language, block_spam: a.block_unknown_spam !== false, urgent_words: a.urgent_keywords.join(", ") };
