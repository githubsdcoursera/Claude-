# Vodafone Idea End-to-End Tower Co Management Agent Blueprint

**Version:** 1.0  
**Status:** Draft for SME, Process Owner, Finance, Network, SCM, Legal, Responsible AI and InfoSec review  
**Process ID:** VI-P2P-NW-EndToEndTowerCoManagement-AgentMesh-v1.0  
**Classification:** C2 – Vodafone Idea Internal  

## 1. Purpose

This document defines the detailed multi-agent design for an AI-first End-to-End Tower Co Management platform. The target operating model starts with agreement and billing-parameter discovery, order evidence and continuous network-master maintenance. It then generates the monthly Vi input baseline, expected billing and provisions before invoice comparison, manages disputes through closure, and produces governed SAP, CN/DN, payment, lease-accounting and management outputs.

The core production asset is the **Tower Co Digital Twin**: a governed, effective-dated relationship among agreements, commercial rules, orders, sites, assets, tenants, landlords, status, loading, energy inputs, invoices, disputes and accounting events.

## 2. Business goals and non-negotiable outcomes

1. Create one trusted, effective-dated Tower Co Digital Twin for every site and billing period.
2. Automate the SR → SP → SO → RFAI → RFS order lifecycle and use it as billability evidence.
3. Extract MSA/addendum clauses into approved, versioned and clause-cited billing rules.
4. Auto-prepare the site master and Circle Loading Tracker (CLT) from Vi and external sources.
5. Generate the monthly Vi billing/provision input file before vendor invoice reconciliation.
6. Generate deterministic shadow bills for rental, loading, capex/opex, energy passthrough and FEM.
7. Detect overbilling, underbilling, missing support, duplicates, period errors, penalties and anomalies at site-line level.
8. Run disputes end to end, including evidence pack, control number, vendor response, ageing, CN mapping, DN reversal and root-cause correction.
9. Prepare provisions and lease-accounting schedules without manual COE calculation, while retaining governed review and approval.
10. Preserve human approval for externally binding or financially consequential actions.
11. Provide complete traceability from every output to source record, clause, rule version, calculation and approval.
12. Support mobile/geofenced field verification, vendor collaboration and executive/operational analytics.

## 3. Scope

### 3.1 In scope

- Order Management: SR, SP, SO, RFAI, RFS, deloading, removal and exit
- MSA, addendum, term-sheet and commercial-rule intelligence
- Network Site Master, asset, tenant, landlord, loading and billability status
- Tower Co Digital Twin and monthly frozen Vi input file
- Vendor portal for invoices, annexures, credit notes, supporting documents, approvals and disputes
- Rental, loading, capex/opex, security deposit, energy passthrough and FEM calculations
- Invoice OCR, validation, line-level reconciliation and anomaly detection
- Automated provision recommendation and lease-accounting preparation
- Dispute, DN, CN, reversal, payment-hold and closure lifecycle
- SAP/ERP posting packs and controlled posting after approval
- Mobile field verification, dashboards, conversational query and audit evidence

### 3.2 Explicit boundaries

- A language model must not invent a rate, quantity, date, tax, penalty, approval, posting or payment.
- Financial calculations use deterministic, version-controlled functions.
- Unapproved contract interpretations cannot enter the production rule book.
- No autonomous payment release, vendor commitment, settlement, DN/CN approval, SAP posting or contract amendment.
- PoC data must be synthetic or properly masked; production integration and raw data require the full approval gate.

## 4. Decision-rights model

| Code | Mode | Meaning | Typical use |
|---|---|---|---|
| X | Agent executes | Deterministic or low-risk action within approved rules | extraction, joins, calculation, comparison, notifications |
| G | Agent governed | Agent executes with policy, confidence and trace controls | clause extraction, anomaly ranking, evidence assembly |
| J | Joint | Agent recommends; human approves/corrects | MSA interpretation, monthly freeze, dispute confirmation |
| H | Human only | Human retains decision | settlement, payment release, posting approval, rule exception |

**Hard override:** If evidence is missing, conflicting, outside an approved effective period or below confidence threshold, the agent must stop the affected transaction, open an exception and route it to the named owner.

## 5. Agent architecture

### 5.1 Agent hierarchy

- **TowerCo Supervisor Agent**: owns the end-to-end case, workflow state and service-level objective.
  - Order & Billability Domain
  - Agreement & Rule Intelligence Domain
  - Digital Twin & Network Master Domain
  - Monthly Input & Freeze Domain
  - Vendor Intake Domain
  - Rental & Lease Domain
  - Energy Domain
  - Reconciliation & Dispute Domain
  - Finance & Posting Domain
  - Field, Analytics & Governance Domain

The supervisor delegates only to registered agents. Every agent call carries `case_id`, `site_id`, `billing_period`, `agreement_version`, `rule_version`, `trace_id`, `actor`, `purpose` and `data_classification`.

## 6. Detailed agent register

### A00. TowerCo Supervisor Agent
- **Goal:** Complete each site-period case from source intake to approved financial closure.
- **Instructions:** Validate mandatory context; select the correct domain agent; enforce stage order; prevent circular calls; consolidate outputs; stop on high-risk conflicts; maintain one case state.
- **Inputs:** event, case context, agent registry, policy matrix, SLA.
- **Outputs:** work plan, delegated tasks, case status, exception/escalation.
- **Tools:** workflow engine, policy engine, event bus, case store.
- **Mode:** X/G. **Human gate:** any binding financial outcome.
- **KPIs:** orchestration completion ≥99%; loop rate <0.5%; wrong-agent routing <1%.

### A01. Order Lifecycle Agent
- **Goal:** Build the authoritative SR→SP→SO→RFAI→RFS timeline.
- **Instructions:** Ingest status events; validate sequence and timestamps; identify cancellation, supersession, bulk-order and retrospective changes; never infer a missing milestone.
- **Outputs:** effective-dated order record and readiness status.
- **Mode:** X/G. **Exception:** invalid sequence or duplicate active order.

### A02. RFAI/RFS Evidence Agent
- **Goal:** Establish the defensible billable-from date and pro-rata basis.
- **Instructions:** Compare RFAI, RFS, on-air, acceptance and supporting evidence; apply only approved precedence rules; flag premature billing.
- **Mode:** X/G; J for disputed evidence.

### A03. Order Exception Agent
- **Goal:** Resolve missing, stale, contradictory or out-of-sequence order events.
- **Instructions:** classify exception, request evidence, assign owner, track SLA and block billability where required.
- **Mode:** G/J.

### A04. MSA Intake Agent
- **Goal:** Ingest all MSAs, amendments, schedules and circle addenda with version lineage.
- **Instructions:** checksum documents; identify parties, scope and effective periods; de-duplicate; preserve original and page references.
- **Mode:** X/G.

### A05. MSA Intelligence Agent
- **Goal:** Extract billing parameters and obligations into a structured synopsis.
- **Instructions:** extract only clause-supported terms; attach page/section citation; distinguish explicit, derived and unresolved values; do not turn narrative into a rule without approval.
- **Mode:** G/J; approved synopsis required.

### A06. Clause Trace Agent
- **Goal:** Make every rule and calculation traceable to contractual evidence.
- **Instructions:** link rule field to agreement, clause, page, extraction confidence and reviewer disposition.
- **Mode:** X/G.

### A07. Rule Versioning Agent
- **Goal:** Maintain an effective-dated, immutable commercial rule book.
- **Instructions:** compare new interpretation with active version; run regression tests; require approval before activation; retain rollback path.
- **Mode:** G/J.

### A08. MSA Parameter Gap Agent
- **Goal:** Identify parameters needed for billing that are absent from the agreement synopsis or network database.
- **Instructions:** compare rule-required fields with available data; classify contract gap vs data gap; route to SCM/Network/Finance.
- **Mode:** X/G.

### A09. Network Site Master Assembly Agent
- **Goal:** Build the canonical site record from Vi and Tower Co sources.
- **Instructions:** join by approved identifiers; effective-date attributes; retain source lineage; never overwrite a higher-priority source silently.
- **Mode:** X/G.

### A10. Source Reconciliation Agent
- **Goal:** Detect differences among UIOM/UIM, SNOC, Galaxy/order systems, vendor files and manual uploaders.
- **Instructions:** apply the approved source-priority matrix; quantify downstream billing impact; create correction tasks.
- **Mode:** X/G; J for unresolved source conflict.

### A11. Asset Master Agent
- **Goal:** Maintain active/passive asset inventory relevant to loading, capex and opex.
- **Instructions:** capture make, capacity, quantity, put-to-use, removal and asset tags; prevent overlapping active periods.
- **Mode:** X/G.

### A12. Tenant Agent
- **Goal:** Maintain tenant count, operator identity and sharing-effective dates.
- **Instructions:** validate tenant lifecycle against orders and site evidence; calculate only approved sharing-band inputs.
- **Mode:** X/G.

### A13. Landlord Agent
- **Goal:** Maintain landlord lease, rent, escalation and applicability data.
- **Instructions:** version lease terms; separate landlord rent from Tower Co billing; flag missing or conflicting lease evidence.
- **Mode:** G/J.

### A14. Site Status Agent
- **Goal:** Determine active, inactive, non-BTS, switch-off, exited and physically removed status by period.
- **Instructions:** use dated evidence; distinguish operational from billable status; do not reactivate a closed site without evidence.
- **Mode:** X/G.

### A15. Loading Factor Compilation Agent
- **Goal:** Calculate billing-relevant loading factors from active equipment and approved mapping tables.
- **Instructions:** aggregate equipment by rule category; respect installation/removal dates; expose calculation components.
- **Mode:** X/G.

### A16. CLT Auto-Generation Agent
- **Goal:** Produce the Circle Loading Tracker automatically.
- **Instructions:** compile site, tenancy, loading, status, order and rate-plan references; highlight changed fields and billing impact.
- **Mode:** X/G; circle review before freeze.

### A17. Digital Twin Agent
- **Goal:** Materialize the complete site-period Tower Co Digital Twin.
- **Instructions:** merge approved agreement, order, site, asset, tenant, landlord, status, loading and prior-billing objects; assert temporal consistency.
- **Mode:** X/G.

### A18. Network Data Gap Agent
- **Goal:** Prevent incomplete data from silently entering billing.
- **Instructions:** score completeness; separate blocking and non-blocking gaps; route with owner and evidence needed.
- **Mode:** X/G.

### A19. Monthly Input File Agent
- **Goal:** Generate the monthly Vi site-wise input baseline for bill and provision validation.
- **Instructions:** include only approved frozen dimensions; compare with prior month; explain every material delta.
- **Mode:** X/G.

### A20. Freeze Control Agent
- **Goal:** Govern monthly cut-off, review and immutable version publication.
- **Instructions:** verify completeness threshold, open exceptions, Network/Finance approvals and checksum; publish once; reopen only through controlled change.
- **Mode:** J/H.

### A21. Vendor Portal Intake Agent
- **Goal:** Receive invoices, annexures, CNs, support documents, landlord files and responses.
- **Instructions:** malware scan; validate vendor, period, type and document set; acknowledge receipt; preserve original.
- **Mode:** X/G.

### A22. Document Completeness Agent
- **Goal:** Enforce required supporting-document checklists by bill type.
- **Instructions:** use approved checklist; raise missing-document event; recommend hold or dispute path; never mark complete from filename alone.
- **Mode:** X/G.

### A23. Invoice OCR & Structuring Agent
- **Goal:** Convert invoices, annexures and EB bills into structured line items.
- **Instructions:** retain bounding box/page evidence; validate totals; use confidence thresholds; route low-confidence fields.
- **Mode:** G/J.

### A24. Duplicate & Period Integrity Agent
- **Goal:** Detect duplicate invoices, duplicate site-period lines and overlapping periods.
- **Instructions:** use invoice ID, hash, vendor, consumer number, site, service period and amount; distinguish correction/reissue.
- **Mode:** X/G.

### A25. Rental Shadow Billing Agent
- **Goal:** Calculate expected rental/IP fee by site and period.
- **Instructions:** use approved rule service; apply base rate, site type, tenancy, start/exit and pro-rata dates; output component-level math.
- **Mode:** X/G.

### A26. Escalation Agent
- **Goal:** Apply annual or contractual escalation correctly.
- **Instructions:** use anniversary/effective date, base component and approved rate; prevent double escalation and retroactive leakage.
- **Mode:** X/G.

### A27. Loading Charge Agent
- **Goal:** Calculate antenna, microwave, power and equipment loading charges.
- **Instructions:** consume frozen CLT, rate card and effective dates; separate each parameter and variance.
- **Mode:** X/G.

### A28. Capex/Opex Classification Agent
- **Goal:** Classify bill lines and approvals to the correct capex/opex treatment.
- **Instructions:** apply rule book and approved mapping; flag ambiguous descriptions; do not create GL account.
- **Mode:** G/J.

### A29. Security Deposit Agent
- **Goal:** Validate deposit applicability, amount, adjustment and recovery.
- **Instructions:** trace to contract and prior ledger; prevent duplicate recovery or unsupported deposit.
- **Mode:** X/G.

### A30. Energy Billing Supervisor Agent
- **Goal:** Route each energy line to passthrough or FEM validation and combine results.
- **Instructions:** determine billing regime from approved site-period master; do not mix models; consolidate evidence and exceptions.
- **Mode:** X/G.

### A31. EB Bill Validation Agent
- **Goal:** Compare billed EB/pass-through amounts with electricity-bill evidence.
- **Instructions:** validate consumer number, site, bill period, units, amount, taxes, penalties, arrears and payment status.
- **Mode:** X/G.

### A32. Diesel/HMR Validation Agent
- **Goal:** Validate DG run hours, meter readings, diesel quantities and related claims.
- **Instructions:** check reading continuity, impossible values, switch-off and site configuration; attach measured evidence.
- **Mode:** X/G.

### A33. FEM Validation Agent
- **Goal:** Validate fixed-energy-model charges against MSA rate and configuration.
- **Instructions:** use approved FEM band, load, tenancy, site configuration and effective dates; separate rate and quantity variance.
- **Mode:** X/G.

### A34. 24-Hour Check Agent
- **Goal:** Detect period mismatch between electricity and diesel claims using the approved 24-hour logic.
- **Instructions:** align evidence to the respective service period; raise DN recommendation against the correct diesel period.
- **Mode:** X/G.

### A35. Energy Checklist Mesh Agent
- **Goal:** Coordinate switch-off, DC load, duplicate, operational lock, DG HMR, EB reading, ID/OD, DC ratio, DCEM penalty, tenancy, non-BTS, CPH and 24-hour checks.
- **Instructions:** call each deterministic micro-check; preserve individual result; never average away a failed control.
- **Mode:** X/G.

### A36. Anomaly Detection Agent
- **Goal:** Rank structurally expensive sites, sudden movements and unusual patterns.
- **Instructions:** compare peer cohort and own history; quantify INR impact; distinguish anomaly from contractual non-compliance; provide explainable features.
- **Mode:** G/J.

### A37. Provision Engine Agent
- **Goal:** Calculate month-end provision from approved expected billing and historical patterns.
- **Instructions:** prioritize current rule-driven expected cost; use history only for missing inputs; show confidence/range; no manual COE calculation where data is adequate.
- **Mode:** X/G; Finance approval at close.

### A38. Lease Accounting Agent
- **Goal:** Prepare lease schedules, modifications, exits, accruals and accounting support.
- **Instructions:** use approved lease terms and statuses; produce review pack; do not post autonomously.
- **Mode:** G/J/H.

### A39. Invoice Reconciliation Agent
- **Goal:** Compare actual invoice lines with expected lines and classify match, overbill or underbill.
- **Instructions:** reconcile site, period, component, quantity, rate and tax; state variance reason and materiality; preserve both upside and downside.
- **Mode:** X/G.

### A40. Dispute Identification Agent
- **Goal:** Convert validated variances into dispute candidates.
- **Instructions:** de-duplicate against open/closed disputes; apply materiality and policy; attach rule and evidence; never raise externally without approval.
- **Mode:** G/J.

### A41. Evidence Pack Agent
- **Goal:** Assemble clause-cited, calculation-backed dispute evidence.
- **Instructions:** include invoice line, expected math, source records, clause/page, prior precedent, screenshots/documents and checksum.
- **Mode:** X/G.

### A42. Dispute Workflow Agent
- **Goal:** Track approval, control number, submission, response, ageing, escalation and closure.
- **Instructions:** preserve status transitions; send approved reminders; enforce SLA; create full history.
- **Mode:** X/G; settlement is H.

### A43. Precedent & Root-Cause Agent
- **Goal:** identify repeat dispute patterns and propose source fixes.
- **Instructions:** cluster only explainable cases; distinguish one-off from systemic; propose rule/master/vendor correction; require owner approval.
- **Mode:** G/J.

### A44. DN Recommendation Agent
- **Goal:** Prepare site-line debit-note recommendation and payment-hold basis.
- **Instructions:** calculate from approved variance, tax and policy; never post or communicate without approval.
- **Mode:** G/J/H.

### A45. SAP Posting Pack Agent
- **Goal:** Generate posting-ready payload and evidence after approval.
- **Instructions:** validate vendor, company code, GL mapping, tax, control number, amount and approver; idempotency key mandatory.
- **Mode:** X/G; posting approval H.

### A46. CN Mapping & DN Reversal Agent
- **Goal:** Match credit notes to debit notes and prepare reversal.
- **Instructions:** validate reference, amount, site-period and approval; prevent excess/multiple reversal.
- **Mode:** X/G; release H.

### A47. Payment Readiness Agent
- **Goal:** Recommend pay, partial pay or hold.
- **Instructions:** consume approved reconciliation/dispute status; explain held amount and residual payable; never release payment.
- **Mode:** G/J/H.

### A48. Mobile Field Verification Agent
- **Goal:** Capture geofenced site evidence for asset, status, meter and loading verification.
- **Instructions:** validate location/time/device, allow offline capture with signed sync, require photo/evidence metadata, redact unnecessary personal data.
- **Mode:** X/G/J.

### A49. Analytics & Value Agent
- **Goal:** Provide dashboards for validation, ageing, recovery, provision, leakage, source quality and agent performance.
- **Instructions:** reconcile metrics to case store; separate realised, approved and potential value; expose freshness and completeness.
- **Mode:** X/G.

### A50. Conversational Query Agent
- **Goal:** Answer role-authorised questions over Tower Co data with citations.
- **Instructions:** retrieve only authorised records; cite source and as-of date; refuse unsupported calculations; call deterministic services for numbers.
- **Mode:** G.

### A51. Audit & Trace Agent
- **Goal:** maintain immutable lineage of data, rules, model calls, tools, approvals and outputs.
- **Instructions:** log before/after values, actor, timestamp, reason and correlation IDs; redact secrets; detect missing trace spans.
- **Mode:** X/G.

### A52. Policy, Safety & Kill-Switch Agent
- **Goal:** enforce data, autonomy, financial, privacy, security and Responsible AI controls.
- **Instructions:** evaluate every tool call; block prohibited action; suspend agent/version on incident or drift; support rollback.
- **Mode:** X/G; emergency activation also available to authorised humans.

### A53. Agent Evaluation & Drift Agent
- **Goal:** continuously test task success, grounding, tool selection, parameter accuracy, hallucination, override and cost.
- **Instructions:** run golden-set and adversarial tests on every change; compare by version; stop promotion below threshold.
- **Mode:** X/G/J.

## 7. End-to-end workflow

1. **Agreement baseline:** A04–A08 ingest and structure the MSA corpus; humans approve interpretations.
2. **Order evidence:** A01–A03 maintain the order timeline and billable dates.
3. **Network baseline:** A09–A18 assemble site, asset, tenant, landlord, status and loading data.
4. **Monthly freeze:** A19–A20 generate and approve the immutable monthly Vi input file.
5. **Vendor intake:** A21–A24 receive, scan, classify, OCR and validate completeness/duplicates.
6. **Expected billing:** A25–A38 run rental, loading, energy, provision and lease calculations.
7. **Reconciliation:** A39 compares actual and expected at site-line level.
8. **Dispute:** A40–A44 identify, evidence, approve and manage disputes and DN recommendations.
9. **Finance closure:** A45–A47 prepare postings, CN/DN reversals and payment readiness after approval.
10. **Continuous controls:** A48–A53 provide field evidence, analytics, queries, audit, policy and evaluation.

## 8. Canonical data objects

- `Agreement`, `AgreementVersion`, `Clause`, `CommercialRule`
- `TowerCompany`, `Site`, `Landlord`, `Tenant`, `Asset`, `SiteStatus`
- `OrderEvent`, `LoadingFactor`, `MonthlyInputFreeze`
- `InvoiceHeader`, `InvoiceLine`, `SupportingDocument`, `EBBill`, `MeterReading`
- `ExpectedCharge`, `ReconciliationResult`, `Provision`, `LeaseSchedule`
- `Dispute`, `EvidenceItem`, `DebitNote`, `CreditNote`, `Posting`, `PaymentDecision`
- `Approval`, `AgentRun`, `ToolCall`, `PolicyDecision`, `AuditEvent`

All commercial and operational objects are effective-dated. All calculated objects carry source IDs, rule version, calculation version and trace ID.

## 9. Core deterministic calculations

- Rental expected = approved base charge × applicable site/tenancy factor × active-period fraction.
- Escalation = eligible base × approved escalation rate, activated only on contractual anniversary/effective date.
- Loading = Σ(active equipment quantity × approved category/rate × active-period fraction).
- Energy passthrough = validated eligible EB/diesel components less exclusions, duplicate periods and non-permitted penalties.
- FEM = approved fixed rate/band × applicable configuration and active period.
- Variance = invoice line amount − expected line amount.
- Provision = rule-driven expected cost where available; controlled historical estimate only for unresolved inputs.

Taxes, rounding, thresholds and tolerances must be parameterised by approved rule version, not embedded in prompts.

## 10. Human approval gates

| Gate | Required approver | Minimum evidence |
|---|---|---|
| MSA synopsis/rule activation | SCM + Network + Finance as applicable | clause citation, effective date, regression result |
| Monthly input freeze | Circle Network + Finance | completeness report, delta report, open exceptions |
| Dispute confirmation | Network + Finance COE | line variance, rule, evidence, INR impact |
| DN/CN action | DOA approver | approved dispute, tax and control-number pack |
| SAP posting/reversal | Authorised Finance | balanced payload, idempotency, approval trail |
| Payment release/hold | Authorised Finance | reconciled payable and dispute status |
| Settlement | Business/Finance per DOA | negotiated terms and closure evidence |

## 11. Guardrails and controls

- Least privilege, MFA, separate service identities and scoped tool permissions.
- Encryption at rest/in transit and India-resident processing/storage for Vi workload data.
- No public database or model-trace exposure; secrets never placed in prompts or logs.
- PII minimisation and redaction in documents, free text and model traces.
- Prompt-injection and indirect-injection defences for vendor/MSA documents.
- Approved tool allow-list, schema validation, amount/date bounds and idempotency.
- Immutable source and output hashes; complete audit before any externally binding action.
- Model/version pinning, evaluation gate, rollback, incident response and kill switch.
- Financial tolerance breaches and low-confidence extraction always route to humans.

## 12. Success measures and release gates

### Data and extraction
- Mandatory-field completeness ≥ 98% before monthly freeze.
- Invoice/annexure field extraction ≥ 99% for critical numeric fields after human-reviewed calibration.
- Agreement extraction precision ≥ 95%, with 100% clause citation on activated rules.

### Calculation and reconciliation
- Deterministic calculation reproducibility = 100%.
- Golden-set shadow-bill accuracy ≥ 99.5% at line level before production.
- Duplicate/period integrity recall ≥ 98% on labelled test cases.

### Agent quality
- Tool selection accuracy ≥ 98%.
- Tool parameter accuracy ≥ 99% for financial tools.
- Unsupported financial assertion rate = 0 in release test set.
- Human override rate tracked by agent/rule; unexplained override >5% triggers review.
- Orchestration loop rate <0.5% and case abandonment <1%.

### Business outcomes
- Reduced manual validation effort and cycle time.
- INR value of prevented overbilling and recovered disputes.
- Dispute ageing and closure SLA improvement.
- Provision accuracy and reduced month-end manual effort.
- Source-data defects corrected at origin and recurrence reduced.

## 13. Synthetic dataset package

The companion ZIP contains relational CSVs for 30 synthetic sites over six billing periods. It includes clean matches plus deliberate conditions for testing:

- premature billing before RFS
- duplicate invoice and duplicate site-period line
- escalation applied early or twice
- loading quantity variance
- exited or non-BTS site billing
- EB amount mismatch and reused consumer number
- FEM rate variance
- missing annexure/supporting document
- switch-off energy claim
- open/closed dispute, CN mapping and posting states

### Loading sequence

1. `agreements.csv`
2. `sites.csv`
3. `orders.csv`
4. `assets.csv`
5. `monthly_inputs.csv`
6. `invoices.csv`
7. `invoice_lines.csv`
8. `eb_bills.csv`
9. `reconciliation_expected.csv`
10. `disputes.csv`
11. `agent_golden_tests.csv`

### Synthetic-data warning

All names, identifiers, invoices, amounts and events in the package are fabricated for development and testing. They must not be treated as Vi actuals, vendor claims, contractual terms or accounting evidence.

## 14. Minimum implementation backlog

1. Approve canonical schema and source-priority matrix.
2. Approve MSA rule template and interpretation governance.
3. Build deterministic rental, escalation, loading, FEM and passthrough calculation services.
4. Build the agent registry with tool schemas and decision rights.
5. Configure golden tests and financial regression suite.
6. Establish monthly freeze, dispute and Finance approval workflows.
7. Integrate audit, policy, observability and kill-switch controls.
8. Run synthetic-data E2E test, then masked-data calibration.
9. Obtain Network, Finance, SCM, Legal, RAI and InfoSec sign-offs.
10. Promote only after line-level accuracy, traceability and control thresholds pass.
