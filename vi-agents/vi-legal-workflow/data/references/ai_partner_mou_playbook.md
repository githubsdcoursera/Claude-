# Vi AI Partner MoU Playbook — Agent Encoding (v1.0 DRAFT)

> **L3 — reconcile before go-live.** This file encodes the Vi AI Partner MoU Playbook & Template (C3, baselined on the Vi x AWS "Vi AI Lab Co-Innovation Programme" MoU) from AI Office working knowledge and the partner MoUs built from it (Kore.ai, Sarvam AI, Wonderful AI Systems, Creatio / ai4process, Bhashini, OpenAI, PwC AI Lab). Vi Legal (Radhika) and the AI Office must confirm every position against the signed-off C3 document.

## 1. Purpose of the MoU
A non-binding strategic framework that: states the shared vision; scopes named use cases; routes all delivery through the Vi AI Lab; protects Vi's data, IP and Responsible AI position; and leaves binding commercial terms to definitive agreements or existing instruments.

## 2. Section structure (draft mode builds in this order)

| # | Section | Nature | Notes |
|---|---|---|---|
| S1 | Parties & recitals | Partner-specific | Correct legal entities; Vi entity per CLAUDE.md |
| S2 | Vision & strategic intent | Partner-specific | Why this partnership, why now — written as a strategic narrative |
| S3 | What makes the partnership distinctive | Partner-specific | Optional, for strategic partners (e.g., global-first, sovereign AI, India scale) |
| S4 | Scope — pillars & named use cases | Partner-specific | Named use cases from brief/RFP; no open-ended scope |
| S5 | Delivery model — Vi AI Lab | Template | All PoCs and builds run through the Vi AI Lab architecture; AI Office governs |
| S6 | Phasing | Partner-specific | e.g., PoC (4–6 weeks) → production (8–12 weeks) → scale |
| S7 | Commercial principles | Principles only | No binding price, volume or credit commitments; reference existing instruments |
| S8 | Governance | Template | Joint steering (AI Office chairs for Vi); cadence; named leads |
| S9 | Data protection & residency | **Template — non-negotiable** | Vi data in India; Vi owns Vi data; no training of partner/third-party models on Vi data; DPDP compliance; sub-processors with consent |
| S10 | Responsible AI (GRACIE) | **Template — non-negotiable** | Partner adheres to Vi RAI principles and stage-gate; transparency, human oversight, bias testing, audit cooperation |
| S11 | Intellectual property | Template with fallback | Each party keeps background IP; Vi owns Vi-specific outputs and configurations; joint IP only by definitive agreement |
| S12 | Confidentiality | **Template — binding** | Reference existing NDA if one exists, else full clause |
| S13 | Publicity | **Template — binding** | No announcement, press release or logo use without both parties' prior written consent; joint press release text approved by both |
| S14 | Exclusivity | **Template — non-negotiable** | Non-exclusive; Vi free to work with other partners (supports competitive partner evaluation) |
| S15 | Term & termination | Template with fallback | `{{12–24}}` months; either party may terminate on `{{30–60}}` days' notice |
| S16 | Legal provisions | **Template — binding** | Non-binding except S12, S13, S14, S16 (and S9 obligations as to data actually shared); Indian law; India-seated arbitration; no agency/partnership; costs borne by each party |

## 3. Binding clauses list (must match exactly)
Confidentiality · Publicity · Non-exclusivity · Governing law & dispute resolution · Data protection obligations for data actually exchanged · Costs · Termination · No partnership/agency.

## 4. Positions on recurring negotiation points

| Point | Vi position | Acceptable fallback | Red line |
|---|---|---|---|
| Commercials in MoU | Principles only | Move credits, pricing, services, skilling detail into existing partner instruments (enterprise agreement, credits letter, SOW) **while keeping the commercial principles statement in the MoU** | Any binding price/volume/minimum commitment in the MoU |
| Affiliate addendum / extending existing agreement to VIL | Keep in MoU where AI Office requires | Reference a separate addendum signed alongside | — (AI Office decision; flag) |
| RAI / GRACIE clause | Mandatory | Map to partner's own RAI framework if materially equivalent (R1–R10) | Deletion — RED; RAI Board only |
| "No LLM is used" claim to drop RAI | Clause applies to AI/ML broadly | Scope RAI obligations to the AI components actually used | Deletion on that basis |
| Governing law (foreign partner entity) | Indian law, Mumbai seat | SIAC rules with Indian seat; English law only with GC approval | Foreign courts |
| IP in improvements | Background stays; Vi-specific outputs Vi's | Partner keeps generic platform improvements not containing Vi data/Confidential Information | Partner ownership of Vi data, prompts, fine-tunes on Vi data, or Vi-specific outputs |
| Data use for training | Prohibited | Aggregated, anonymised operational telemetry for service health only, with Vi approval | Any training on Vi data |
| Exclusivity / MFN / first right | None | — | Any |
| Publicity on signing | Joint release with mutual approval | Partner may name Vi as a customer after a joint announcement, with consent | Unilateral announcement |
| Team / capacity commitments (e.g., delivery centre, pod) | Stated as intent | — | — |
| Term | 12–24 months | Auto-renew with notice | Lock-in without termination right |

## 5. Partner markup patterns to recognise (from Vi experience)
1. **Hyperscaler pattern:** partner Legal asks to move credits, pricing, professional services, skilling and services terms out of the MoU into its existing agreements and side letters, and to drop the affiliate addendum. → Accept the move of detail (keep principles); flag the affiliate addendum for AI Office decision.
2. **Consultancy pattern:** partner narrows the MoU to a sandbox PoC engagement and limits liability broadly. → Scope narrowing may be acceptable; protect S9, S10, S14.
3. **Professional-services amendment pattern:** partner Legal deletes all AI/RAI provisions claiming no LLMs are used, despite AI use stated by the partner's own technical leads. → RED; reinstate with evidence; see `vendor_ai_contract_playbook.md` V9.
4. **Foreign start-up pattern:** partner redlines Vi's trial/MoU template toward its home law and broad IP in improvements. → Indian law fallback ladder; IP fallback per §4.
5. **Government / public-sector partner pattern:** partner returns its own MoU format. → Map to S1–S16; protect S9, S10, S13.

## 6. Cover note to Vi Legal (template)
From: AI Office (CAIO) · To: Vi Legal · Re: `{{Partner}}` MoU — AI Office position
1. Purpose and strategic rationale (2 lines)
2. Changes accepted (list)
3. Counter-proposals (list with proposed text)
4. Items for Legal judgement
5. Items requiring AI Office / CAIO decision
6. Target signing / announcement date and any dependency (e.g., joint press release)
