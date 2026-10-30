// @description Document Generator: build a downloadable Word document (.docx) from a title and simple markdown (# and ## headings, paragraphs, - bullets, | tables |, **bold**). Used for reports, briefs, draft responses and contracts; the file is a draft for human review and is not sent anywhere.
// @effect read_only
// @in title:string "Document title"
// @in markdown:string "Body in simple markdown"
// @in footer_note?:string "Closing note, e.g. AI draft for review; nothing has been sent"
// @out ok b64 filename mime_type size_bytes message
const none = v => { const s = String(v == null ? "" : v).trim(); return !s || s.toLowerCase() === "none" ? "" : s; };
const title = none(input.title) || "Document";
const md = none(input.markdown).replace(/\r/g, "").replace(/\\n/g, "\n").replace(/ \|\| /g, "\n");
if (!md) return { ok: false, b64: "", filename: "", mime_type: "", size_bytes: 0, message: "There was no content to put in the document." };
const today = new Date().toISOString().slice(0, 10);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// inline **bold** runs
const runs = (t, extra) => String(t).split(/(\*\*[^*]+\*\*)/).filter(x => x !== "").map(x => {
  const b = /^\*\*[^*]+\*\*$/.test(x), txt = b ? x.slice(2, -2) : x;
  const rpr = (b ? "<w:b/>" : "") + (extra || "");
  return `<w:r>${rpr ? "<w:rPr>" + rpr + "</w:rPr>" : ""}<w:t xml:space="preserve">${esc(txt)}</w:t></w:r>`;
}).join("");
const para = (t, style, extra) => `<w:p>${style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ""}${runs(t, extra)}</w:p>`;
const cell = (t, head) => `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/>${head ? '<w:shd w:val="clear" w:color="auto" w:fill="E7E6E6"/>' : ""}</w:tcPr><w:p>${runs(t, head ? "<w:b/>" : "")}</w:p></w:tc>`;
const table = rows => {
  const bd = ["top", "left", "bottom", "right", "insideH", "insideV"].map(k => `<w:${k} w:val="single" w:sz="4" w:space="0" w:color="999999"/>`).join("");
  return `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${bd}</w:tblBorders></w:tblPr>` +
    rows.map((r, i) => `<w:tr>${r.map(c => cell(c, i === 0)).join("")}</w:tr>`).join("") + `</w:tbl><w:p/>`;
};
let body = para(title, "Title") + para("Prepared " + today + " by the Vi AI assistant (draft for human review).", null, "<w:i/>");
const L = md.split("\n");
for (let i = 0; i < L.length; i++) {
  const ln = L[i].trim();
  if (!ln) continue;
  if (/^\|/.test(ln)) {
    const rows = [];
    while (i < L.length && /^\|/.test(L[i].trim())) {
      const r = L[i].trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());
      if (!r.every(c => /^:?-{2,}:?$/.test(c))) rows.push(r);
      i++;
    }
    i--;
    const w = Math.max.apply(null, rows.map(r => r.length));
    body += table(rows.map(r => r.concat(Array(w - r.length).fill(""))));
  } else if (/^#{1}\s/.test(ln)) body += para(ln.replace(/^#\s+/, ""), "Heading1");
  else if (/^#{2,}\s/.test(ln)) body += para(ln.replace(/^#+\s+/, ""), "Heading2");
  else if (/^[-*•]\s+/.test(ln)) body += para("• " + ln.replace(/^[-*•]\s+/, ""), "ListPara");
  else body += para(ln);
}
body += para(none(input.footer_note) || "AI draft for review. Nothing in this document has been approved, signed or sent.", null, "<w:i/>");

const files = {
  "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
  "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
  "word/_rels/document.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
  "word/styles.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="280"/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="200"/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="ListPara"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="360"/></w:pPr></w:style></w:styles>`,
  "word/document.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1200" w:bottom="1440" w:left="1200" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`
};

// Minimal ZIP writer (stored entries) with CRC-32, UTF-8 and base64, so no library is needed in the workflow node
const utf8 = s => { const o = []; for (let i = 0; i < s.length; i++) { let c = s.charCodeAt(i);
  if (c >= 0xd800 && c < 0xdc00 && i + 1 < s.length) { c = 0x10000 + ((c - 0xd800) << 10) + (s.charCodeAt(++i) - 0xdc00); }
  if (c < 0x80) o.push(c); else if (c < 0x800) o.push(0xc0 | c >> 6, 0x80 | c & 63);
  else if (c < 0x10000) o.push(0xe0 | c >> 12, 0x80 | c >> 6 & 63, 0x80 | c & 63);
  else o.push(0xf0 | c >> 18, 0x80 | c >> 12 & 63, 0x80 | c >> 6 & 63, 0x80 | c & 63); } return o; };
const CT = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; CT[n] = c >>> 0; }
const crc = b => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CT[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
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
const fname = (title.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 60) || "Vi_document") + "_" + today + ".docx";
return { ok: true, b64: b64, filename: fname, mime_type: mime, size_bytes: out.length, message: fname + " is ready to download." };
