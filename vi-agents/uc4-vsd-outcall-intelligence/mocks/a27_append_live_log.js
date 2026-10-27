// @description A27 Live Sentiment: append the segment, sentiment and any cue to the live discussion log and sentiment trend (visible to authorised agent and supervisor personas only).
// @effect side_effect
// @in call_ref:string "Call reference"
// @in speaker:string "customer or agent"
// @in text:string "Segment text"
// @in sentiment:string "Sentiment label"
// @in cue:string "NBA trigger shown, or empty"
// @out logged
return { logged: true };
