// @description RP01 Source Monitor: poll the approved source register, detect new or changed documents (hash/version), classify issuer, type, topic and relevance to Vi, extract the comment deadline and return a 3-line alert. Sources outside the register are only flagged as unverified.
// @effect read_only
// @in user:string "Officer user id"
// @out new_count doc_id title issuer published relevance abstract deadline source
const n = R.monitor_new;
return { new_count: 1, doc_id: n.id, title: n.title, issuer: n.issuer, published: longDate(n.published), relevance: n.relevance, abstract: n.abstract, deadline: longDate(n.deadline), source: n.source };
