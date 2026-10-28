# Vi agentic operations agents on the Kore.ai Agent Platform

Agents for the Vi Agentic Operations v0.9 use cases, built as ABL projects for the Kore.ai Agent
Platform ("Artemis") at `https://ind-agents.kore.ai` and deployed through the Arch MCP server.

| Folder | Platform project | Use case | Channel | Entry agent |
|---|---|---|---|---|
| `uc1-prepaid-inbound-voice` | Vi UC1 Prepaid Inbound Care Voice | UC1 inbound care (prepaid) | Voice (Sarvam) | `UC1_Care_Supervisor` |
| `uc2-customer-service-chat` | Vi UC2 Customer Service Chat | UC2 care chat | Vi App, WhatsApp, web | `UC2_Chat_Supervisor` |
| `uc3-enterprise-collections` | Vi UC3 Enterprise Collections | UC3 collections (enterprise) | IVR, WhatsApp, web | `UC3_Collections_Supervisor` |
| `uc4-vsd-outcall-intelligence` | Vi UC4 VSD Outcall Intelligence | UC4 VSD agent assist | Agent desktop (human speaks) | `UC4_VSD_Assist` |
| `uc5-international-roaming` | Vi UC5 International Roaming | UC5 IR (postpaid) | Voice | `UC5_IR_Supervisor` |
| `uc7-prepaid-to-postpaid-upgrade` | Vi UC7 Prepaid to Postpaid Upgrade | UC7 upgrade | Voice (outbound) | `UC7_Upgrade_Supervisor` |
| `uc9-prepaid-network-call-assistant` | Vi UC9 Prepaid Network Call Assistant | UC9 call assistant | Voice (forwarded calls) | `UC9_Call_Assistant` |
| `prepaid-retention` | Vi Prepaid Retention Outcall | Prepaid extension of UC8 | Voice (outbound) | `Prepaid_Retention_Supervisor` |
| `prepaid-dropped-leads` | Vi Prepaid Dropped Leads Outcall | Prepaid extension of UC6 | Voice (outbound) | `Prepaid_Dropped_Leads_Supervisor` |
| `business-postpaid-sales` | Vi Business Postpaid Sales Outcall | BPS01-BPS06 (needs a UC ID) | Voice (outbound) | `Business_Sales_Supervisor` |
| `uc6-postpaid-dropped-lead-nurturing` | Vi UC6 Postpaid Dropped-Lead Nurturing | UC6 (DL01-DL03) | Voice (outbound) | `UC6_Dropped_Lead_Supervisor` |
| `uc8-postpaid-retention` | Vi UC8 Postpaid Retention | UC8 (RT01-RT04) | Voice (outbound) | `UC8_Retention_Supervisor` |
| `towerco-management` | Vi TowerCo Management | Tower Co agent mesh (A00-A53) | Finance/Network chat and events | `TowerCo_Supervisor` |
| `reg-uc1-research-policy-intelligence` | Vi RA-UC1 Research and Policy Intelligence | Regulatory RA-UC1 (RP01-RP05) | Officer chat | `RA_UC1_Research_Supervisor` |
| `reg-uc2-drafting-knowledge` | Vi RA-UC2 Drafting and Institutional Knowledge | Regulatory RA-UC2 (RD01-RD06) | Officer chat | `RA_UC2_Drafting_Supervisor` |
| `reg-uc3-comms-compliance` | Vi RA-UC3 Communications Compliance Manager | Regulatory RA-UC3 (RC01-RC06) | Inbox events, officer chat | `RA_UC3_Compliance_Supervisor` |
| `vi-legal-workflow` | Vi Legal End-to-End Workflow | Legal W0-W9 (LG00-LG07) | Lawyer chat | `Legal_Supervisor` |

Each project folder has `agents/` (ABL source), `mocks/` (mock backend systems), `tests/scenarios.json`
(one scenario per outcome path), `tests/results.md` (latest run), `arch.json` (build config) and
`.arch-state.json` (platform IDs written by the build).

## Design

**One scripted orchestrator per call.** Each use case has a single FLOW agent playing A02 Supervisor that
owns the whole call through the common state model `S0 Trigger -> S1 Connect & disclose -> S2 Identify &
verify -> S3 Load context -> S4 Discover intent -> S5 Resolve -> S6 Confirm & act -> S7 Wrap-up -> S8 End ->
S9 Post-call`, with the exception states `X1 Human handoff`, `X2 Clarify/fallback`, `X3 No contact/retry` and
`X4 Compliance stop`. Step names carry the state (`s5_rank_packs`, `x1_handoff`).

Why one orchestrator rather than a handoff per register agent:

- **Latency.** Scripted steps (`REASONING: false`) don't call the LLM. Measured turns are 20-600 ms against
  the 0.8 s P50 / 1.2 s P95 target; the LLM is used only where reasoning helps (classifying a free-form
  reason, answering a grounded question, drafting a summary).
- **Must-say integrity.** Prices, dues, disclosures and consent wording are rendered from tool output into
  fixed templates, so they are never paraphrased.
- **No dropped turns.** A pilot showed that when a specialist agent hands control back, its spoken reply can be
  lost, which on a phone call is dead air. Keeping the conversation in one agent avoids it.

**Register agents map to tools.** The deterministic agents in the Master Agent Register are tools named after
their ID, so traces read like the register: `a03_*` Customer Context, `a04_*` Identity & Verification,
`a06_*` Compliance Gate, `a07_*` Outreach Planner, `a08_*` Transaction Workflow, `a09_*` Handoff,
`a10_*` Knowledge, `a11_*` Post-Call Intelligence, and the specialists (`a12`-`a28`, `prt01`-`prt04`,
`pdl01`-`pdl02`, `bps01`-`bps06`). A01 Voice Front-Door is Sarvam, outside the platform.

**Controls built into every flow.**

- The compliance gate fails closed: only an explicit `allowed == true` proceeds; a failed or missing check stops contact.
- AI and recording disclosure is the first thing said.
- No protected data before the right party is confirmed (wrong-party tests assert this).
- Money, plan, order, SIM and VAS changes need recorded consent and a verified OTP, enforced twice: by the flow,
  and by a `process.before.require` guard on the tool itself. Writes carry an idempotency key.
- Results are confirmed only after the system returns success.
- Universal handoff rule: a request for a person, two failed clarifications, persistent negative sentiment,
  a vulnerability cue, an out-of-authority request or a repeated system failure leads to `X1`. A handoff
  packet (`a09_create_handoff`) is written before the transfer.
- Opt-out works from any step (global digression) and is recorded.
- Prepaid retention: a port request is answered at once from any step with the approved UPC steps and no pitch.

**Call-start data.** In production the dialler or Sarvam front door passes `msisdn`, `direction`, `campaign`
(and `account_id`, `subscriber`, `caller` where relevant) as Conversation API message metadata
(`session.messageMetadata`). For testing, the first message can carry the same fields, for example
`CALL_START msisdn=9800000001 direction=outbound campaign=IR_TRAVEL_OPTIN`.

**Model.** Projects run on `gemma4`, the only model in the workspace that currently works with tool calls at
voice latency. Gemini 3 Flash and DeepSeek V3.2 returned "out of credit or billing issue", OpenRouter rejected
requests, and `sarvam-105b` works but took about 6 s per turn. Switch `model` in each `arch.json` once a
production model is funded.

## Connecting the Sarvam front door (A01)

The runtime contract in the source documents maps onto the platform's Conversation API
(`POST /api/v1/chat/agent` against the project's deployment, authenticated with an SDK channel key):

| Contract | Platform |
|---|---|
| Call connects (S0) | First request with no `sessionId`; `metadata` carries `msisdn`, `direction`, `campaign` (UC3 adds `account_id`, `mode`; UC9 adds `subscriber`, `caller`, `forward_reason`) |
| `turn.final` from Sarvam | `message` = final transcript, with the returned `sessionId` |
| `response.frame` to Sarvam | `response` (text to speak, already containing the verbatim must-say wording), `action` (continue, complete, escalate), `state` (current step = S-state) and `voiceConfig` |
| Holding phrase at 1.5 s | The runtime emits a status update ("Just a moment.") while a tool runs; Sarvam can speak it |
| Handoff after 4 s / X1 | The agent writes the A09 packet (`a09_create_handoff`) and ends with `action: escalate`; Vi Network performs the warm transfer to the queue named in the packet |
| Language | S1 captures `spoken_language` (`en`/`hi`); Sarvam selects ASR/TTS accordingly |

## Mock backends

Code tools are disabled in this workspace and Agent Tables are not available, so every backend system is a
**mock workflow** (one workflow per tool, a JavaScript function node) exposed as a workflow-backed tool. Data
comes from `shared/personas.js`: invented customers, prices, packs and plans, marked MOCK. **None of the
prices or plans are real Vi catalogue values.** Before live traffic, replace each mock workflow with the real
integration (Vi BSS/OSS, SCRM, catalogue, payment gateway, SMSC, unfyd handoff); the agent DSL does not change
as long as the tool contract (name, inputs, outputs) is kept.

Test personas by phone number:

| Range | Use case | Personas |
|---|---|---|
| 98000000xx | UC5 | 01 happy path (UAE trip), 02 IR barred, 03 DND, 04 corporate, 05 provisioning fails |
| 98100000xx | Prepaid retention | 01 network outage, 02 price, 03 port/data, 04 DND, 05 attempt cap |
| 98200000xx | Prepaid dropped leads | 01 KYC drop, 02 payment failed, 03 attempt cap, 04 converted duplicate, 05 plan selection |
| 98300000xx | UC1 / UC2 | 01 low balance with two VAS, 02 network issue and strong auth |
| 98400000xx | UC7 | 01 eligible, 02 pilot-excluded circle, 03 credit not passed |
| 98500000xx | UC9 | 01 opted-in subscriber; callers 9851111111 VIP, 9852222222 spam, 9853333333 unknown |
| 98700000xx | UC3 | billing contacts for ENT5001-ENT5003 (ENT5003 paid) |
| 98800000xx | Business sales | 01 25-line Pvt Ltd, 02 proprietorship, 03 DND |
| ACC1001-2 | UC4 | accounts the VSD agent calls |

The mock OTP verifier accepts `123456` only.

## Build, deploy and test

The build drives the Arch MCP server (`@koreai/arch-mcp-tools`) through `build/bridge.mjs`, which keeps one
authenticated MCP server running and exposes it on `127.0.0.1:7777`. In a cloud container it needs the
`build/proxy-preload.cjs` helper to route the server's WebSocket through the egress proxy.

```bash
node build/bridge.mjs &                                    # once per session; log in when prompted
python3 build/deploy.py uc5-international-roaming          # mocks -> tools -> validate -> import -> publish -> dev deployment
python3 build/deploy.py uc5-international-roaming --no-publish --skip-mocks   # fast agent-only iteration
python3 build/run_tests.py uc5-international-roaming       # all scenarios; writes tests/results.md
```

`deploy.py` expands `#include-tools:` (tool signatures generated from the mock headers, so the agent and the
tool never drift) and `#include-snippet:` (shared routing blocks) before validating with the platform compiler.
The tenant allows 60 API requests a minute (the client waits out HTTP 429) and a small number of concurrent
sessions (the test runner waits for a free slot).


## Back-office projects: Tower Co, Regulatory AI and Legal

These use the same pattern as the voice agents (one scripted supervisor, deterministic tools, must-say from
tool output) but run as chat or event-driven case agents. Each project's data module replaces the shared
personas (`arch.json` `mock_prelude`); the three Regulatory projects also share `regulatory-common/`
(`extra_mock_dirs`).

- **Tower Co (`towerco-management`).** `data/build_data.py` turns the supplied synthetic reconciliation file and
  agreement into `towerco-data.js`. The package listed sites, orders, EB bills and disputes files that were not
  supplied, so the minimum Digital Twin (RFS, exit and non-BTS dates, frozen CLT quantity, EB amounts) is derived
  from the labelled expected values, and three fixtures are added for golden tests GOLD-002 (duplicate line),
  GOLD-004 (reused consumer number) and GOLD-005 (missing documents), plus one open dispute for de-duplication.
  The shadow-bill engine reproduces all 541 labelled lines (amount, classification and reason), and the
  `tc_golden_regression` tool runs that check on the platform as the A53 release gate. Payment release, SAP
  posting, DN/CN approval, settlement and contract changes are blocked and turned into approval tasks.
- **Regulatory AI (`reg-uc1..3`, `regulatory-common`).** A synthetic corpus (documents marked `[SYNTHETIC]`,
  anonymised stakeholders Operator-A/B and Industry Body-X, a position register, sender register, ownership
  matrix and obligations register) with shared R-KB (permission-trimmed retrieval), R-DI, R-CV (citation
  verifier: fake citations and numbers not in the source are UNSUPPORTED), R-NT and R-GOV tools. RA-UC3 runs at
  pilot autonomy L2: it never sends to a Government body, and an approved reply waits in the approver's drafts.
- **Legal (`vi-legal-workflow`).** Built from the `vi-legal` package (playbooks, clause library, skills and
  fixtures copied under `data/`). `data/build_data.py` strips the Gold lines from the fixtures the agent reads.
  The rules pass reproduces all 32 gold labels (`lg_eval`); the W5 gate records approvals only from an
  authorised approver (RED needs senior counsel / GC), and nothing is signed or sent.

### Uploaded documents and Word downloads (Legal, Tower Co, Regulatory)

The platform passes an uploaded file only to the model, not to scripted (`REASONING: false`) steps, which see just the
typed text. Upload the file with the request in the same message (for example "triage this NDA"); a message sent after the
upload may not carry the file. Each back-office agent routes an upload (or long pasted text) with no test ID to a model step:

| Agent | Upload | What it does | Word download |
|---|---|---|---|
| Legal | NDA, MoU, vendor or AI agreement | Playbook review item by item with quotes, tiers, business summary, privileged lawyer note; follow-ups stay on the document | "Word redline": `.docx` with tracked changes (`lg_redline_docx`) |
| Legal | Term sheet or none ("draft a new mutual NDA ...") | New agreement on Vi paper from the GREEN playbook positions | "Word": full agreement (`doc_docx`) |
| Tower Co | Vendor invoice | The model only copies the lines; `tc_invoice_reconcile` checks every line against the rule book (MATCH, OVERBILLED, UNDERBILLED, DUPLICATE, NOT_IN_REGISTER) | "Word report": reconciliation report built from the tool output |
| RA-UC1 | TRAI or DoT paper | Research brief: identity and deadlines, issue-by-issue summary with question numbers, impact on Vi | "Word": research brief |
| RA-UC2 | Consultation paper | First-draft response in the regulator's numbering, with [Officer to confirm Vi position] markers | "Word": draft response |
| RA-UC3 | Letter, direction, notice | Compliance intake note: classification, obligations table with quoted deadlines, penalties, next steps | "Word": intake note |

`build/add_upload_path.py <agent.abl> <spec.json>` generates the model-review, follow-up and Word-download steps from a
spec (`upload_path.json`, `new_contract_path.json`). Word files are built inside the workflow (`shared/mocks/doc_docx.js`,
no library) and returned as a `FILE` response. The file is currently embedded as a `data:` URL; the platform documents
`FILE` as needing a reachable URL, so production should store the file in Vi document storage (SharePoint, Azure Blob or
S3 through a platform integration) and return that link.

## Platform behaviours found while building

| Behaviour | How the agents handle it |
|---|---|
| `CHECK` with `ON_SUCCESS`/`ON_FAIL` does not route; the flow parks | Route with `ON_RESULT` or `ON_INPUT` branches instead |
| A `CALL` in a step that also waits for input never runs | Tool calls go in their own step before the prompting step |
| Two steps that both `RESPOND` in one turn: only the last reaches the caller | Merge into one prompt (`{{#if}}` templates are supported) |
| `matches` uses JavaScript regex: no inline `(?i)`, and `\b` does not match | Input is already lower-cased; boundaries are written `(^|[^a-z])` and `([^a-z]|$)` |
| A string literal equal to a session variable name resolves to the variable | Variable names never collide with literal values |
| Keyword digressions match substrings anywhere | Human-request keywords are explicit phrases ("talk to an agent"), not "customer care" |
| PII redaction can replace tool inputs such as a pincode with `[REDACTED]` | Address-type lookups take the phone number and resolve server-side |
| Workflow function outputs cannot use the key `trigger` | Renamed (`cue_type`) |
| Specialist handoff with return can drop the specialist's reply | Single orchestrator per call |
| A workflow function node's output key `steps` (or a variable named `steps`) fails with "Cannot overwrite immutable context property" | Mocks use `porting_steps` |
| Re-importing a package never updates an existing tool record (`toolsUpdated` stays 0), so a changed tool contract is ignored | `deploy.py --recreate-tools a,b` deletes and re-creates the named tools, or the tool is renamed |
| A tool call is silently skipped (no tool event, `ON_RESULT` sees undefined) when a required argument is empty or references a variable that was never set | Variables are initialised in the first step with sentinels such as `"none"`, which mocks treat as empty |
| In ABL regex the string `"\\?"` becomes an optional backslash and matches every input | A literal question mark is written `[?]` |
| Passing a number to a string parameter errors | Numbers are passed as templates, for example `"{{neg_count}}"` |
| Output fields whose names contain "token" are shown as `[REDACTED]` in replies | Renamed, for example `sr_number` |
| Deployment preflight reports `UNBOUND_TOOL ... check could not be completed` for some projects (UC3, UC4, UC5, UC7, UC8, Prepaid Retention) | No tool is missing and the tests pass; worth confirming with Kore.ai |
| `\n` inside a quoted `RESPOND: "..."` is shown literally | Multi-line replies use `RESPOND: |` blocks |
| The MCP client refuses workflow code that looks like a credential (for example `const AUTH = "..."`) | Renamed |
| A reasoning step with `EXIT_WHEN: flag == true` never exits if the model writes the flag as the string "true" | Steps that write data use `EXIT_WHEN: always`; the next tool validates the data |
| Live traces cut long replies at about 200 characters | The test runner reads full replies from `debug_session_history` |

## Not done yet / decisions for Vi

- **Real integrations**: all backends are mocks (see above).
- **Production model**: needs a funded, tool-capable model; currently `gemma4`.
- **Hindi and Hinglish**: language is captured at S1 and passed to Sarvam, but responses are authored in English.
  Hindi response text needs `locales/` bundles or a translation step before live Hindi traffic.
- **Voice channel binding**: provider-specific channel provisioning (Sarvam SIP, SIPREC for UC4) is outside the
  Arch MCP surface; the deployments are reachable through the Conversation API and SDK channels.
- **Use-case IDs and owners**: prepaid retention and dropped leads are extensions, not UC8/UC6;
  Vi Business sales needs a UC ID, owner, CLI decision and G0 scorecard (per the source documents).
- **Deployments are `dev`** only, as expected for mock-backed agents; promotion to staging and production
  should follow the RAI gate, real integrations and evals.
