# Vi Legal — Practice Profile

> Every `vi-legal` skill reads this file before doing anything. If a field a skill needs is marked `{{TBC}}`, the skill must stop and say which field is missing — never guess.

## 1. Who we are
- **Organisation:** Vodafone Idea Limited ("Vi" / "VIL"), Indian telecom operator (listed company)
- **Legal function:** Vi Legal (General Counsel office); partner MoU reviewer: VIL Legal (Radhika)
- **AI governance:** Vi Responsible AI framework **GRACIE**; RAI Board; AI Office (Chief AI Officer) is the business owner for AI partner MoUs and the AI Lab
- **Signing entities:** Vodafone Idea Limited; Vi subsidiaries `{{TBC — L6}}` (e.g., Vi Business Services entity referenced in cloud agreements)
- **Authority matrix:** `{{TBC — L6}}`

## 2. Jurisdiction defaults
- **Governing law (Vi preference):** Laws of India
- **Disputes (Vi preference):** Arbitration under the Arbitration and Conciliation Act, 1996; seat and venue **Mumbai** `{{confirm: Mumbai / New Delhi}}`; sole arbitrator for low-value matters, three for high-value; English language
- **Acceptable fallback:** SIAC rules with seat in India; foreign seat (e.g., Singapore) only with GC approval → YELLOW at best
- **Stamp duty:** documents executed in India must be adequately stamped (e-stamp) per the applicable State Stamp Act — flag on every execution check
- **Key statutes to surface (not interpret):** Indian Contract Act 1872; Telecommunications Act 2023 and licence conditions; IT Act 2000; Digital Personal Data Protection Act 2023 and DPDP Rules `[verify current phase-in]`; CERT-In directions (incident reporting) `[verify]`; Competition Act 2002; Companies Act 2013 (authority)

## 3. Risk posture
- **Data:** Vi customer and network data stays in India; no training of third-party models on Vi data; sub-processors need Vi consent
- **AI:** GRACIE clauses mandatory where a counterparty uses AI/ML on Vi data or delivers AI outputs Vi relies on — including when the counterparty says "no LLM used" but AI/ML is used (see `references/vendor_ai_contract_playbook.md`)
- **Exclusivity:** Vi does not grant exclusivity in partner MoUs
- **Publicity:** no announcement or logo use without prior written consent of both parties
- **Commercials in MoUs:** MoUs are non-binding on commercials; binding commitments go into definitive agreements / existing instruments
- **Liability (vendor contracts):** cap = `{{TBC — L4}}` × fees; uncapped for confidentiality, data protection breach, IP infringement indemnity, wilful misconduct

## 4. Triage tiers (all skills)
- **GREEN** — within playbook; lawyer spot-check; business can proceed after Legal sign-off
- **YELLOW** — deviation with an approved fallback available; lawyer review required
- **RED** — outside playbook, non-negotiable item affected, or missing information; senior counsel / GC

## 5. House style
- Formal Indian-English; defined terms capitalised and used consistently
- Outputs: review table (Clause · Tier · Issue · Playbook position · Proposed text · Source line/para), then a 5-line business summary
- Redlines as tracked changes in Word when run in Claude for Word; never silent edits
- Every finding cites the exact clause number and quoted text (≤ 25 words) from the source document
- Citations to law come from a connected research source; otherwise mark `[verify]`

## 6. Escalation
| Tier | Route | SLA |
|---|---|---|
| GREEN | Assigned Legal counsel | `{{TBC}}` |
| YELLOW | Legal counsel + business owner | `{{TBC}}` |
| RED | Senior counsel / GC; RAI Board if GRACIE affected | `{{TBC}}` |

## 7. Systems
- Documents: SharePoint / OneDrive (M365) `{{confirm DMS — L8}}`
- E-sign: `{{TBC — L8}}`
- Contract register: `{{TBC — L8}}` (interim: SharePoint list `Vi Contract Register`)
- Mail: Outlook
