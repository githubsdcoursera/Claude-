# Synthetic Vendor & AI Contract Clauses (fictional vendors)

Each item is a clause set or markup excerpt. **Strip Gold lines before running the skill.**

---

## VC-01 — Analytics PoC amendment; vendor deletes all AI provisions
Vendor: Meridian Strategy Partners (fictional consultancy). Document: Amendment No. 1 to Master Services Agreement — network capex optimisation PoC.
- Vendor markup: "Deleted Annex C (Responsible AI) and clauses 7.4–7.6 in full. No large language models are used in this engagement."
- Evidence supplied by AI Office: vendor's kickoff deck states "machine-learning site-scoring model trained on Vi network KPIs"; vendor's technical lead confirmed AI use in a review meeting.
> Gold: RED critical · AI applicability = YES (ML scoring on Vi data) · GRACIE R1–R10 all missing · recommend reinstate scoped to ML components; offer CL-V9-COND only if vendor maintains no AI; escalate RAI Board if refused · must_not: accept deletion.

## VC-02 — SaaS terms with training rights
"Customer grants Provider a perpetual licence to use Customer Data to train and improve Provider's models and services."
> Gold: RED · V6 secondary use/training · R3 missing.

## VC-03 — Offshore processing
"Provider may store and process Customer Data in any country where it or its sub-processors operate."
> Gold: RED · V7 offshore by default · V10 free sub-processing.

## VC-04 — Breach notice
"Provider will notify Customer of a confirmed Security Incident without undue delay and in any event within 7 days."
> Gold: RED · V8 notice > 48 h; CERT-In cooperation missing `[verify]`.

## VC-05 — Liability cap
"Each party's aggregate liability is limited to fees paid in the 3 months preceding the claim. No exclusions apply."
> Gold: RED · V11 cap below annual fees · V12 no carve-outs.

## VC-06 — Acceptable vendor RAI equivalent
Vendor attaches its "Trustworthy AI Commitments" covering: model inventory disclosure, no training on customer data, human review of outputs, bias and robustness testing reports quarterly, model documentation, customer audit on 30 days' notice, AI incident notice in 48 h, AI security controls, deletion of customer data from fine-tunes and embeddings on exit. Vendor agrees to follow Vi RAI stage-gate.
> Gold: YELLOW (fallback accepted) · V9 materially equivalent: R1–R10 mapped · lawyer confirms mapping.

## VC-07 — Partial RAI pack
Annex RAI retained but vendor deleted R5 (testing) and R7 (audit) and changed R8 to "AI incidents reported quarterly".
> Gold: RED · missing R5, R7; R8 weakened.

## VC-08 — Vendor online terms prevail
"In the event of conflict, Provider's online Terms of Service as updated from time to time prevail over this Order Form."
> Gold: RED · V1.

## VC-09 — Foreign law
"This Agreement is governed by the laws of England and Wales; disputes to LCIA arbitration seated in London."
> Gold: RED · V13 (GC approval only).

## VC-10 — No AI, conditional clause accepted
Vendor: facilities maintenance; no AI/ML in scope. Vendor accepts CL-V9-COND.
> Gold: GREEN · AI applicability = NO · conditional RAI clause present.

## VC-11 — Auto-renewal and deliverables (for obligations-tracker)
"Initial term 1 January 2027 to 31 December 2027; renews automatically for successive 12-month periods unless either party gives 90 days' written notice before the end of the then-current term. Provider shall deliver a quarterly AI model performance and bias report within 15 days of each quarter end."
> Gold (obligations): auto-renewal flagged · notice deadline 2 October 2027 · quarterly report due 15 Apr, 15 Jul, 15 Oct 2027 and 15 Jan 2028 · owner confirmation requested.

## VC-12 — Vi-specific outputs owned by vendor
"All models, weights and configurations developed in performing the Services, including those trained on Customer Data, are Provider's exclusive property."
> Gold: RED · V5 · R3/R10 impacted.
