// @description LG01 Legal Intake: turn a request into one complete, deduplicated Matter record (type incl. AI-vendor detection, counterparty, Vi entity, paper, data involved, route to the right skill, assigned lawyer, missing information asked once). Does not form a view on the merits.
// @effect side_effect
// @in doc_id:string "Fixture or document id, e.g. NDA-02"
// @out found matter_id duplicate_of type counterparty vi_entity ai_flag route lawyer missing authority_note
const r = intake(input.doc_id); if (!r) return { found: false };
return Object.assign({ found: true }, r, { lawyer: USERS[r.lawyer].name });
