// @description R-CV Citation Verifier: check each claim ("claim [DOC, para X]; claim [DOC, p. N]") against the source passage. Tags SUPPORTED, PARTIAL or UNSUPPORTED; fake citations and numbers not in the source are UNSUPPORTED and must be shown as [unverified].
// @effect read_only
// @in claims:string "Semicolon-separated claims, each with a [DOC, para] citation"
// @out supported partial unsupported table
return verifyClaims(input.claims);
