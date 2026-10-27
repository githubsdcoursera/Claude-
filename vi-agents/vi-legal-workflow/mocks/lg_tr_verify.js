// @description LG-TR Traceability Checker: confirm every finding's quote matches the source text exactly; mismatches are UNVERIFIED and listed under "Check manually".
// @effect read_only
// @in doc_id:string "Document id"
// @out verified unverified check_manually
const id = String(input.doc_id || "").toUpperCase();
const r = ndaTriage(id) || vendorReview(id) || mouReview(id);
return r ? traceCheck(id, r.findings) : { verified: 0, unverified: 0, check_manually: "none" };
