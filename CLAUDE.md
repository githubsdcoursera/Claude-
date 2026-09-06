# Strat's Agent Org

Full build of Strat's two-branch agent organization: **Work Agent** and **Personal Agent**,
with every agent beneath them defined in `.claude/agents/` — one file per agent,
68 agents in total (2 lead orchestrators, 13 Work Executives, 15 Work Operators,
5 Personal Majors, 33 Personal Operators), plus 19 advisory personas embedded in the
Board Advisory Bench (12) and C-Suite Advisory Bench (7).

Source of truth for the design: *Strat's Agent Org — Full Build Specification*.

## The 4C Principle

Every agent is defined on four dimensions:

- **Context** — what the agent knows and its scope of ownership.
- **Connectors** — what it reads from, writes to, and which other agents or tools it's wired into.
- **Character** — its persona, tone, and decision authority.
- **Cadence** — how and when it operates: triggers, frequency, reporting rhythm.

## Standing Rule: Adding a New Agent

Every time a new agent is proposed, ask in order — never guess placement:

1. Work or Personal branch?
2. Executive/Major tier or Operator tier?
3. Which parent does it report to?

New agents follow the existing file convention: `.claude/agents/<kebab-case-name>.md`
with `name` and `description` frontmatter, and a body written on the 4C structure.

## Org Chart

### Work Agent branch

- **Work Agent** (`work-agent`) — lead orchestrator
  - **Chief of Staff** (`chief-of-staff`) — executive
    - Calendar Agent (`calendar-agent`) — operator
    - Team Agent (`team-agent`) — operator
    - Projects Agent (`projects-agent`) — operator
    - Meeting Notes Agent (`meeting-notes-agent`) — operator
    - Researcher Agent (`researcher-agent`) — operator
    - Conference Research Agent (`conference-research-agent`) — operator
  - **Marketing Executive** (`marketing-executive`) — executive
    - PR Agent (`pr-agent`) — operator
    - Competitive Agent (`competitive-agent`) — operator
  - **Engineering Executive** (`engineering-executive`) — executive
  - **AI Architect Executive** (`ai-architect-executive`) — executive
    - AI Engineer Agent (`ai-engineer-agent`) — operator
    - AI News Agent (`ai-news-agent`) — operator
  - **RAI Executive** (`rai-executive`) — executive
  - **Legal Executive** (`legal-executive`) — executive
  - **Operations Executive** (`operations-executive`) — executive
    - Help Desk Agent (`help-desk-agent`) — operator
  - **Procurement Executive** (`procurement-executive`) — executive
    - Vendor Agent (`vendor-agent`) — operator
    - Startup Agent (`startup-agent`) — operator
  - **HR Executive** (`hr-executive`) — executive
    - Recruiter Agent (`recruiter-agent`) — operator
  - **Finance Executive** (`finance-executive`) — executive
    - Expenses Agent (`expenses-agent`) — operator
  - **Product Manager Executive** (`product-manager-executive`) — executive
  - **Board Advisory Bench** (`board-advisory-bench`) — executive
  - **C-Suite Advisory Bench** (`c-suite-advisory-bench`) — executive

### Personal Agent branch

- **Personal Agent** (`personal-agent`) — lead orchestrator
  - **Life Operations Major** (`life-operations-major`) — major
    - Calendar Organizer (`calendar-organizer`) — operator
    - Tasker (`tasker`) — operator
    - Rescue Agent (`rescue-agent`) — operator
    - Personal Cases Agent (`personal-cases-agent`) — operator
    - Travel Research Agent (`travel-research-agent`) — operator
    - Morning Digest (`morning-digest`) — operator
    - Text Board Agent (`text-board-agent`) — operator
    - General Agent (`general-agent`) — operator
  - **Household & Finance Major** (`household-and-finance-major`) — major
    - Kitchen Ledger (`kitchen-ledger`) — operator
    - Penny Pitcher (`penny-pitcher`) — operator
    - Shopzilla Agent (`shopzilla-agent`) — operator
    - Stock Market Agent (`stock-market-agent`) — operator
  - **Wellness & Mind Major** (`wellness-and-mind-major`) — major
    - Health Agent (`health-agent`) — operator
    - Yoga Agent (`yoga-agent`) — operator
    - Sports Agent (`sports-agent`) — operator
    - Emotional Coach Agent (`emotional-coach-agent`) — operator
    - Therapist Agent (`therapist-agent`) — operator
  - **Growth & Learning Major** (`growth-and-learning-major`) — major
    - Tutor Agent (`tutor-agent`) — operator
    - Skill Books Agent (`skill-books-agent`) — operator
    - Desired End Statement Agent (`desired-end-statement-agent`) — operator
    - Manifester Agent (`manifester-agent`) — operator
    - Quiz Agent (`quiz-agent`) — operator
  - **Creative & Voice Major** (`creative-and-voice-major`) — major
    - Podcaster Agent (`podcaster-agent`) — operator
    - Youtuber Agent (`youtuber-agent`) — operator
    - Socials Agent (`socials-agent`) — operator
    - Code Base Agent (`code-base-agent`) — operator
    - Humor Sarcasm Agent (`humor-sarcasm-agent`) — operator
    - Silvie Style Agent (`silvie-style-agent`) — operator
    - Acting Agent (`acting-agent`) — operator
    - Hobbies Agent (`hobbies-agent`) — operator
    - Voice Agent (`voice-agent`) — operator
    - Recipe Agent (`recipe-agent`) — operator
    - Astrologer Agent (`astrologer-agent`) — operator

## Cross-branch wiring

- Work Agent hands a daily synthesis to **Morning Digest** (Personal side) each morning.
- **Calendar Agent** (Work) and **Calendar Organizer** (Personal) coordinate to avoid double-booking.
- Either orchestrator escalates a misrouted request to the other branch rather than handling it.
- Advisory benches (Board / C-Suite) pressure-test decisions; they never execute and run no operators.
