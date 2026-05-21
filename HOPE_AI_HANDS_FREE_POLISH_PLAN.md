# Hope AI Hands-Free Polish Plan

## Goal

Upgrade Hope AI from a single command page into a beginner-friendly hands-free assistant layer that can explain the app, navigate major dashboards, prepare trading and payment actions, summarize finance state, and guide the user through complex features with safe confirmation gates.

## Product Model

Hope AI will behave like a voice-first operating layer for SkyCoin444. The user can speak naturally, type fallback commands, choose quick actions, or enable beginner mode. Beginner mode avoids jargon and converts every result into a simple next-step recommendation. Advanced mode keeps trading and finance workflows faster for experienced users.

| Layer | Behavior | Safety Boundary |
|---|---|---|
| Learn mode | Explains what a page does, suggests first actions, and offers voice examples. | Safe to execute immediately because it only explains or navigates. |
| Navigate mode | Opens dashboards such as trading, wallet, marketplace, DeFi, portfolio, tax, messages, staking, and settings. | Safe to execute immediately. |
| Scan mode | Generates informational market signals and risk explanations. | Safe because it does not place trades and labels output as informational. |
| Prepare mode | Creates draft trade, tip, payment, or marketplace action details. | Requires confirmation before writing account-changing records. |
| Guardian mode | Blocks unclear, high-risk, or unsupported commands and asks for clarification. | Required for financial and account-impacting operations. |

## Implementation Targets

The next implementation pass should extend the backend service with a richer command registry and a new frontend experience that feels polished without forcing a complete app rewrite. The assistant will still use environment variables and existing routers rather than hardcoded credentials.

| File | Upgrade |
|---|---|
| `server/services/hope-ai.ts` | Add command modes, app-wide route catalog, beginner responses, explain/coach intents, and safer parsing. |
| `server/routers/hope-ai.ts` | Add catalog endpoint, richer command schema, and execution responses that the UI can render as cards. |
| `client/src/pages/HopeAICommandCenter.tsx` | Add beginner mode, quick command grid, live assistant console, route launcher, safety panels, and polished voice UI. |
| `HOPE_AI_HANDS_FREE_POLISH_PLAN.md` | Keep this implementation map in the repo for future upgrades. |

## Voice Examples

| User says | Hope AI behavior |
|---|---|
| “Hope beginner mode” | Switches to simple language and shows starter actions. |
| “Hope what can I do?” | Explains the best next actions based on available features. |
| “Open wallet” | Navigates to wallet. |
| “Teach me trading” | Opens trading and gives a simple explanation. |
| “Scan Bitcoin” | Generates an informational signal. |
| “Prepare buy one Bitcoin” | Stages a draft trade and asks for confirmation. |
| “Open marketplace and show me what to sell” | Opens marketplace and explains listing workflow. |
| “Make it hands free” | Enables listening workflow and explains available commands. |

## Non-Negotiable Safety Rules

Hope AI may navigate, explain, scan, and prepare. It must not silently execute money movement, final trade placement, sensitive account changes, credential changes, or external posting without confirmation. Unsupported requests must return a helpful refusal or a clarification prompt instead of guessing.
