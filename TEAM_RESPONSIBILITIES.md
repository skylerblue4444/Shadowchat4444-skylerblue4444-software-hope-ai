**✅ Done.** Here's a clean, practical set of **responsibilities for 6 Convo Bots** (assuming 6 is your current maximum for parallel work).

I designed them to work well together in a **parallel agentic setup** (Git worktrees + separate Claude Code / AI sessions). Each bot has clear ownership, minimal overlap, and defined handoff points so they can run simultaneously without stepping on each other.

### Recommended Max Note
**6 is the practical upper limit** for most solo operators right now.  
Beyond 5–6 you usually hit coordination/review bottlenecks. Start with **4 bots** if you want smoother flow, then scale to 6 once your process is solid.

---

### Team of 6 Convo Bots – Responsibilities (May 2026 Sprint)

| Bot # | Name                        | Primary Focus                          | Key Responsibilities                                                                 | What They Should **NOT** Do                  | Best For Parallel Work |
|-------|-----------------------------|----------------------------------------|---------------------------------------------------------------------------------------|----------------------------------------------|------------------------|
| 1     | **Orchestrator / PM Bot**   | Strategy, Prioritization & Coordination | • Own sprint planning & task breakdown<br>• Maintain `TASKS.md` and priority<br>• Review & merge PRs from other bots<br>• Resolve blockers & reassign work<br>• Weekly sprint summary | Write production code or deep technical implementation | Yes – runs as “operator” |
| 2     | **Conversation Engine Bot** | Core Dialogue Logic & Intelligence     | • Build & improve main conversation flows<br>• Context management, memory, multi-turn handling<br>• Prompt engineering & model optimization<br>• Handle complex user intents | Handle integrations or UI work               | Yes                    |
| 3     | **Integrations Bot**        | External Connections                   | • WhatsApp, Web, CRM, Zapier, calendars, payments<br>• API connections & webhooks<br>• Authentication & data syncing<br>• Error handling for external services | Design conversation flows or UI              | Yes                    |
| 4     | **UI & Experience Bot**     | Conversational Interfaces              | • Interactive landing pages & chat widgets<br>• Visual design, responsiveness, UX flows<br>• Turn static pages into conversational experiences<br>• Component & template creation | Backend logic or external integrations       | Yes                    |
| 5     | **QA & Evaluation Bot**     | Quality, Testing & Reliability         | • Create test scenarios & edge cases<br>• Run evaluations & regression checks<br>• Performance, hallucination, and safety testing<br>• Maintain test coverage & quality gates | Ship new features without passing QA         | Yes                    |
| 6     | **Ops & Growth Bot**        | Deployment, Monitoring & Scaling       | • Deployment pipelines & environment management<br>• Analytics, usage tracking, dashboards<br>• Monitoring, alerts, cost control<br>• User onboarding flows & growth experiments | Core conversation logic or UI development    | Yes                    |

### How to Run Them in Parallel (Recommended Setup)

1. **One worktree per bot** (or per major task)
2. Each bot works in its own isolated environment (different ports, DB schemas if needed)
3. Use a shared `TASKS.md` file that the **Orchestrator Bot** maintains
4. Bots update the shared task board when they finish or get blocked
5. You (or the Orchestrator) review + merge at regular checkpoints (every 20–40 mins)

### Quick Tips for This Team of 6

- **Orchestrator Bot** should be the only one that edits the main `TASKS.md` and does final merges.
- Give each bot a **clear system prompt** that includes its exact responsibilities + “only work inside your assigned worktree/branch”.
- Use **stubbing** when one bot depends on another (e.g. Integrations Bot can stub APIs while Conversation Engine Bot works).
- Keep **daily or twice-daily syncs** (you can ask me to generate the sync report).