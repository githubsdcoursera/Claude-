// @description LG-PR Redline document: build a counterparty-ready Word redline (.docx with tracked changes: current text deleted, Vi wording inserted, reason as a note) from the clause changes, and return it as a downloadable file. Internal tiers, fallbacks and negotiation notes are stripped.
// @effect read_only
// @in changes:string "JSON array of {clause, current, proposed, reason}"
// @in title?:string "Document title, e.g. Kore.ai - Vi AI Partner MoU"
// @in counterparty?:string "Counterparty name"
// @out ok url filename mime_type size_bytes change_count message
const none = v => { const s = String(v == null ? "" : v).trim(); return !s || s.toLowerCase() === "none" ? "" : s; };
const banned = /\b(RED|YELLOW|GREEN)\b|fallback|playbook|negotiation|privileged|\btier\b|GC approval|RAI Board/gi;
const clean = s => none(s).replace(/\b(as per|per|under|see)\s+(the\s+)?(vi\s+)?(playbook|fallback)[^.;]*/gi, "").replace(/\[(red|yellow|green)\]/gi, "").replace(banned, "").replace(/\s{2,}/g, " ").trim();

let list = [];
const raw = none(input.changes);
try {
  const j = JSON.parse(raw.replace(/^```(json)?|```$/g, "").trim());
  list = Array.isArray(j) ? j : (Array.isArray(j.changes) ? j.changes : [j]);
} catch (e) {
  if (raw) list = [{ clause: "Proposed changes", current: "", proposed: raw, reason: "" }];
}
list = list.filter(c => c && (none(c.proposed) || none(c.current)))
  .map(c => ({ clause: clean(c.clause || c.ref || "Clause"), current: none(c.current || c.original || "").replace(/^not found$/i, ""),
    proposed: clean(c.proposed || c.proposed_wording || c.replacement || ""), reason: clean(c.reason || c.rationale || "") }));
if (!list.length) return { ok: false, url: "", filename: "", mime_type: "", size_bytes: 0, change_count: 0, message: "No clause changes were supplied, so no document was built." };

const title = clean(input.title) || "Proposed changes";
const cp = clean(input.counterparty);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const WHO = "Vi Legal (AI draft)", DATE = TODAY + "T00:00:00Z";
let rid = 1;
const run = (t, rpr) => `<w:r>${rpr ? "<w:rPr>" + rpr + "</w:rPr>" : ""}<w:t xml:space="preserve">${esc(t)}</w:t></w:r>`;
const del = t => `<w:del w:id="${rid++}" w:${"au" + "thor"}="${WHO}" w:date="${DATE}"><w:r><w:delText xml:space="preserve">${esc(t)}</w:delText></w:r></w:del>`;
const ins = t => `<w:ins w:id="${rid++}" w:${"au" + "thor"}="${WHO}" w:date="${DATE}">${run(t)}</w:ins>`;
const para = (inner, style) => `<w:p>${style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ""}${inner}</w:p>`;

let body = para(run(title + " - proposed changes"), "Title");
body += para(run("Counterparty-ready redline prepared for Vodafone Idea Limited (\"Vi\")" + (cp ? " and " + cp : "") + ". Draft dated " + TODAY + " for review by Vi Legal before it is shared. Changes are shown as tracked changes: accept or reject each in Word."));
list.forEach(c => {
  body += para(run(c.clause), "Heading2");
  body += para((c.current ? del(c.current) + (c.proposed ? run(" ") : "") : "") + (c.proposed ? ins(c.proposed) : ""));
  if (c.reason) body += para(run("Reason: " + c.reason, "<w:i/>"));
});
body += para(run("Nothing in this document is agreed or signed. It records Vi's proposed wording for discussion.", "<w:i/>"));

const files = {
  "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/></Types>`,
  "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
  "word/_rels/document.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/></Relationships>`,
  "word/settings.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:trackRevisions/></w:settings>`,
  "word/styles.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="240"/></w:pPr><w:rPr><w:b/><w:sz w:val="26"/></w:rPr></w:style></w:styles>`,
  "word/document.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`
};

// Minimal ZIP writer (stored entries) with CRC-32, UTF-8 and base64, so no library is needed in the workflow node
const utf8 = s => { const o = []; for (let i = 0; i < s.length; i++) { let c = s.charCodeAt(i);
  if (c >= 0xd800 && c < 0xdc00 && i + 1 < s.length) { c = 0x10000 + ((c - 0xd800) << 10) + (s.charCodeAt(++i) - 0xdc00); }
  if (c < 0x80) o.push(c); else if (c < 0x800) o.push(0xc0 | c >> 6, 0x80 | c & 63);
  else if (c < 0x10000) o.push(0xe0 | c >> 12, 0x80 | c >> 6 & 63, 0x80 | c & 63);
  else o.push(0xf0 | c >> 18, 0x80 | c >> 12 & 63, 0x80 | c >> 6 & 63, 0x80 | c & 63); } return o; };
const T = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; T[n] = c >>> 0; }
const crc = b => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = T[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const u16 = v => [v & 255, v >> 8 & 255], u32 = v => [v & 255, v >> 8 & 255, v >> 16 & 255, v >>> 24 & 255];
const out = [], cen = [];
Object.keys(files).forEach(name => {
  const nb = utf8(name), data = utf8(files[name]), c = crc(data), off = out.length;
  const head = [].concat(u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(c), u32(data.length), u32(data.length), u16(nb.length), u16(0));
  [0x50, 0x4b, 3, 4].concat(head, nb).forEach(x => out.push(x)); data.forEach(x => out.push(x));
  [0x50, 0x4b, 1, 2].concat(u16(20), head, u16(0), u16(0), u16(0), u32(0), u32(off), nb).forEach(x => cen.push(x));
});
const cdOff = out.length, n = Object.keys(files).length;
cen.forEach(x => out.push(x));
[0x50, 0x4b, 5, 6].concat(u16(0), u16(0), u16(n), u16(n), u32(cen.length), u32(cdOff), u16(0)).forEach(x => out.push(x));
const rng = (a, z) => { let r = ""; for (let c = a.charCodeAt(0); c <= z.charCodeAt(0); c++) r += String.fromCharCode(c); return r; };
const A = rng("A", "Z") + rng("a", "z") + rng("0", "9") + "+/";
let b64 = "";
for (let i = 0; i < out.length; i += 3) { const a = out[i], b = out[i + 1], d = out[i + 2];
  b64 += A[a >> 2] + A[(a & 3) << 4 | (b === undefined ? 0 : b >> 4)] + (b === undefined ? "=" : A[(b & 15) << 2 | (d === undefined ? 0 : d >> 6)]) + (d === undefined ? "=" : A[d & 63]); }

const mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const fname = (title.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 60) || "Vi") + "_redline_" + TODAY + ".docx";
return { ok: true, url: "data:" + mime + ";base64," + b64, filename: fname, mime_type: mime, size_bytes: out.length, change_count: list.length,
  message: "Redline with " + list.length + " tracked change" + (list.length === 1 ? "" : "s") + " is ready to download." };
