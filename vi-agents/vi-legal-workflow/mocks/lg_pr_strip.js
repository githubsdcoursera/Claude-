// @description LG-PR Privilege & Confidentiality Guard: build the counterparty-facing response from proposed wording only, stripping internal tiers, fallback ladders, negotiation notes and approval routes; returns the clean text and the count of items stripped.
// @effect read_only
// @in doc_id:string "Document id"
// @out text stripped
const id = String(input.doc_id || "").toUpperCase();
const r = ndaTriage(id) || vendorReview(id) || mouReview(id);
return r ? privilegeStrip(r.findings) : { text: "", stripped: 0 };
