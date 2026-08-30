# Trellis — Agentic Harness

A full-stack, low-code/no-code agentic harness for telco, shipped as a single
self-contained web app (`index.html`). It covers the whole agent lifecycle:
**build → orchestrate → observe → govern spend**.

## Modules

| Module | What it does |
|---|---|
| **Overview** | Fleet dashboard: live agents, runs/day, spend/day, open-source traffic share. |
| **Agent Studio** | Two ways to build the same agent. **Canvas** (n8n-style): drag/connect components — Trigger, Goal & Instructions, Model, Skills, Tools, MCP servers, Memory, Knowledge Graph/RAG, Guardrails, Human Handoff, Sub-agent Router — with zoom/fit controls, and test runs that light the executing nodes up live on the canvas. **Prompt Builder**: build the agent through prompt engineering (persona, goal, instructions, constraints, few-shot examples, output format, {{variables}}) with attachable skills/tools, a live compiled system prompt with token count, one-click prompt tests, save-to-library, and *compile to canvas* to turn the prompt spec into a node graph. |
| **Idea to App** | Kiro-style spec-driven flow: raw idea (or a generated one) → requirements with EARS acceptance criteria (WHEN … THE SYSTEM SHALL …) → design with components/stack/architecture → sequenced task list with live execution → generated code scaffold with tests → build & deploy pipeline for web or mobile (PWA + store bundle, QR to open). Ships 7 templates — 4 telecom (Recharge Rescue, Outage Companion, SIM-Swap Sentinel, Partner Recharge Hub) and 3 MSME/other (KiranaBooks retail, CashFlow Lens fintech/analytics, SecOps Triage Desk) — and every deployed app can spawn a backing agent in the Studio. |
| **Agent Library** | Prebuilt telco agents, each a full working blueprint you can open in the Studio: **Churn Shield** (Vi consumer churn reduction), **Procure Pilot** (negotiation/commercial savings), **VoiceCare** (call-centre voice agent), **CampaignCraft** (marketing), **SalesEdge** (sales), **Network Sentinel** (NOC co-pilot). |
| **Orchestration** | Multi-agent patterns — Supervisor, Pipeline, Council/Debate — composed over deployed agents, with an animated inter-agent event stream. |
| **Knowledge** | Context layer for agents: upload data (CSV/JSON/TXT/PDF are profiled client-side and mapped to entity types), a telco Subscriber-360 ontology editor (entity types, relations), an ontology **decision log** with rationale and metrics, KG health metrics (entities, edges, coverage, freshness), an interactive ontology graph, and attach-to-agent context serving with a test-retrieval panel showing the injected subgraph facts. |
| **Prompts & Scenarios** | Shareable telco prompt library (win-back, MNP saves, counter-offers, bill-shock calls, upsell copy, proposals) plus replayable scenario packs (churn wave, AMC renegotiation, bill-shock spike…). |
| **Observability** | Traces with span waterfalls, token usage by agent, latency/error SLOs, LLM-as-judge eval scores, guardrail triggers. |
| **FinOps** | Spend MTD/forecast, budgets with alert/throttle policies, cost by model and by agent, open-source routing simulator showing savings vs all-closed routing. |
| **Model Gateway** | One gateway over open-source backends (Ollama, vLLM, Hugging Face TGI — Llama, Qwen, Mixtral) and closed providers (Anthropic, OpenAI, Google) with per-task-class routing rules and fallbacks. API keys stay in the browser in this demo. |
| **Learn** | Agent fundamentals, workflow design best practices, do's & don'ts, and how to pick the right (hackathon) problem. |

## Architecture

- Single-file app: vanilla JS, hash router, token-based theming (light/dark,
  honoring both OS preference and an explicit `data-theme` stamp).
- Hand-rolled SVG chart engine (line, bar, stacked bar) with crosshair/hover
  tooltips, direct labels, legends and a data-table view per chart, using a
  CVD-validated categorical palette in both themes.
- Demo runtime: seeded fleet telemetry; user actions (deploys, test runs,
  scenario replays) feed the same state that Observability and FinOps read.
- Persistence: prompts, providers, routing, budgets and settings in
  `localStorage` (guarded; the app works with storage unavailable).

## Run it

Open `index.html` in any modern browser — no build step, no server. In
production the same UI would sit on an agent runtime (e.g. an LLM gateway +
orchestrator + trace store); every screen maps 1:1 onto those services.
