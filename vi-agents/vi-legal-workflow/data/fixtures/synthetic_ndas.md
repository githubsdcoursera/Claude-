# Synthetic NDAs (fictional counterparties)

Each NDA is an excerpt containing the clauses relevant to triage. Clause numbers are part of the test (findings must cite them). Gold labels are in `gold_labels.jsonl` and summarised at the end of each item for reviewers — **strip the "Gold" lines before running the skill**.

---

## NDA-01 — Vi mutual template, unchanged

**Parties:** Vodafone Idea Limited ("Vi") and Saffron Grid Analytics Private Limited, Bengaluru.
1. **Purpose.** To evaluate a possible collaboration on network energy analytics.
2. **Confidential Information** means all information disclosed by or on behalf of a Party, in any form, that is marked or identified as confidential or that a reasonable person would understand to be confidential.
3. **Exclusions.** (a) public other than through breach; (b) lawfully known before disclosure, as shown by written records; (c) independently developed; (d) lawfully received from a third party without restriction.
4. **Compelled disclosure.** Permitted where required by law or any governmental or regulatory authority, including DoT and TRAI, with prompt notice where lawful.
5. **Term.** Two (2) years. Obligations survive three (3) years after expiry.
6. **Personal data.** No personal data shall be disclosed unless the Parties first agree DPDP-compliant terms.
7. **Return.** On request, with written certification on request.
8. **Remedies.** Injunctive relief available, without prejudice to other remedies.
9. **Law.** Laws of India; arbitration, seat Mumbai, sole arbitrator, English.
10. **Publicity.** None without prior written consent.

> Gold: GREEN · Vi template unchanged · no hidden terms.

---

## NDA-02 — Counterparty paper, residuals clause

**Parties:** Vi and Nimbus Cognition Inc., Delaware, USA (mutual).
1. Purpose: discussions regarding an AI model partnership.
2. Confidential Information: written information marked "Confidential".
3. Exclusions include information retained in the unaided memory of the Recipient's personnel, which the Recipient may use for any purpose.
4. Term: 3 years; obligations survive 1 year.
5. Governing law: State of California; exclusive jurisdiction of courts in San Francisco.
6. Compelled disclosure: permitted only on court order.

> Gold: RED · RED items: N5 residuals (cl.3), N8 survival 1 year (cl.4), N13 foreign law (cl.5), N14 foreign courts (cl.5), N6 no regulator carve-out (cl.6) · RED also N4 marking-only for written information (cl.2). Critical: residuals and foreign law must be found.

---

## NDA-03 — Embedded non-compete

**Parties:** Vi and Kestrel Towers Infra Private Limited, Mumbai (mutual).
1. Purpose: evaluating tower-site energy optimisation pilots.
2–6. Standard Vi-equivalent definitions, exclusions, compelled disclosure (incl. regulators), 2-year term, 3-year survival.
7. **Restriction.** During the term and for 18 months after, Vi shall not engage any other provider for tower energy optimisation services in the circles covered by the discussions.
8. Law: India; arbitration seat Mumbai.

> Gold: RED · RED: N15 non-compete/exclusivity (cl.7). Critical: hidden-term sweep must find cl.7.

---

## NDA-04 — One-way protecting counterparty, Vi disclosing network data

**Parties:** Vi and Orchid Spectrum Labs LLP, Pune. Recipient: Vi only (one-way, protecting Orchid).
1. Purpose: Orchid will receive Vi network performance data to propose a site-planning model.
2. Orchid's information is Confidential Information; Vi has no protection for information it discloses.
3. Term 2 years; survival 3 years. Law: India; Mumbai courts.

> Gold: RED · RED: N2 one-way against Vi where Vi discloses material data (cl.1–2). Note for intake: AI/ML involved → flag possible AI vendor engagement downstream.

---

## NDA-05 — Minor deviations only

**Parties:** Vi and Lotus Ledger Technologies Private Limited, Hyderabad (mutual).
1. Purpose: evaluating a billing reconciliation tool.
2. Oral disclosures protected if confirmed in writing within 30 days.
3. Standard exclusions; compelled disclosure "where practicable" with notice; regulators included.
4. Term 3 years; survival 2 years.
5. Mutual non-solicitation of employees with whom there was material contact, 12 months, general advertising excepted.
6. Law: India; SIAC Rules, seat New Delhi.

> Gold: YELLOW · YELLOW: N4 (cl.2), N6 (cl.3), N7 3-year term (cl.4), N8 2-year survival (cl.4), N15 non-solicit within fallback (cl.5), N14 SIAC Indian seat (cl.6). No RED.

---

## NDA-06 — Liquidated damages and one-sided indemnity

**Parties:** Vi and Harbour Byte Solutions Pte. Ltd., Singapore (mutual).
1. Purpose: evaluating a customer-engagement AI agent.
2–5. Standard definitions, exclusions incl. regulators, 2-year term, 3-year survival.
6. **Damages.** Any breach by Vi entitles Harbour Byte to liquidated damages of USD 250,000 per breach.
7. **Indemnity.** Vi shall indemnify Harbour Byte against all losses arising from Vi's receipt of Confidential Information, without limit.
8. Law: Singapore; SIAC arbitration seated in Singapore.

> Gold: RED · RED: N11 liquidated damages (cl.6), N12 one-sided uncapped indemnity (cl.7), N13 foreign law (cl.8), N14 foreign seat (cl.8).

---

## NDA-07 — Execution defects (for execution-check)

Approved as GREEN (Vi template). Execution copy contains:
- Cover page: "Vodafone Idea Ltd"; signature block: "Vodafone Idea Limited" — counterparty "Teal River Software Pvt Ltd" on cover, "Teal River Softwares Private Limited" in signature block.
- Clause 5: "Term: [●] years".
- A Word comment left on clause 9: "Legal note — we could accept Delhi seat if they push."
- No e-stamp reference; executed in Maharashtra.

> Gold (execution-check): FAIL · X2 entity name inconsistency (counterparty), X7 placeholder in cl.5, X8 internal comment on cl.9, X9 stamp duty not addressed. Critical: X8.

---

## NDA-08 — Personal data and publicity

**Parties:** Vi and Monsoon Metrics Private Limited, Gurugram (mutual).
1. Purpose: joint analysis of subscriber churn patterns.
2. Vi will share subscriber-level usage records including mobile numbers for model training by Monsoon.
3. Monsoon may store data on its cloud in Singapore.
4. Monsoon may list Vi as a client in marketing materials.
5. Law: India; arbitration Mumbai.

> Gold: RED · RED: N9 personal data without DPDP terms + offshore transfer (cl.2–3), N16 publicity (cl.4). Note: data used for model training → AI vendor engagement; escalate.
