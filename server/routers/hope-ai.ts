import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { router, protectedProcedure, TRPCError } from "../_core/trpc";
import { getDb, createTrade, sendMessage } from "../db";
import { hopeVoiceCommands } from "../../drizzle/schema";
import { getProactiveSuggestions, generateTradingSignal, HOPE_ACTION_CATALOG, parseHopeCommand, planCommandChain, planMission } from "../services/hope-ai";

const intentSchema = z.enum([
  "navigate",
  "trade_prepare",
  "tip_prepare",
  "market_scan",
  "portfolio_summary",
  "payment_prepare",
  "explain",
  "beginner_mode",
  "hands_free_mode",
  "workflow_guide",
  "mission_plan",
  "command_chain",
  "proactive_suggest",
  "unknown",
]);

const displayCardSchema = z.object({
  title: z.string(),
  body: z.string(),
  action: z.string().optional(),
  path: z.string().optional(),
});

const commandPayloadSchema = z.object({
  raw: z.string(),
  path: z.string().optional(),
  symbol: z.string().optional(),
  side: z.enum(["buy", "sell"]).optional(),
  amount: z.string().optional(),
  price: z.string().optional(),
  recipientId: z.number().optional(),
  tipAmount: z.number().optional(),
  message: z.string().optional(),
  currency: z.string().optional(),
  confidence: z.number().optional(),
  topic: z.string().optional(),
  mode: z.enum(["beginner", "pro", "guardian"]).optional(),
  actionLabel: z.string().optional(),
  safetyLevel: z.enum(["safe", "confirm", "blocked"]).optional(),
  goal: z.string().optional(),
  missionId: z.string().optional(),
  chainCommands: z.array(z.string()).optional(),
  plannedStepCount: z.number().optional(),
});

export const hopeAiRouter = router({
  actionCatalog: protectedProcedure.query(async () => {
    return HOPE_ACTION_CATALOG;
  }),

  parseVoice: protectedProcedure
    .input(z.object({ transcript: z.string().min(1).max(1000) }))
    .mutation(async ({ ctx, input }) => {
      const parsed = parseHopeCommand(input.transcript);
      const db = await getDb();

      if (db) {
        await db.insert(hopeVoiceCommands).values({
          userId: ctx.user.id,
          transcript: input.transcript,
          intent: parsed.intent,
          payload: JSON.stringify(parsed.payload),
          status: "parsed",
          response: parsed.spokenResponse,
        });
      }

      return parsed;
    }),

  executeCommand: protectedProcedure
    .input(z.object({
      intent: intentSchema,
      payload: commandPayloadSchema,
      confirmed: z.boolean().default(false),
      displayCards: z.array(displayCardSchema).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { intent, payload, confirmed } = input;
      const db = await getDb();

      if (intent === "mission_plan") {
        const mission = planMission(payload.goal ?? payload.raw, payload.mode ?? "guardian");
        return {
          status: "executed" as const,
          action: "mission_plan" as const,
          mission,
          path: "/dashboard/hope-ai",
          spokenResponse: `${mission.summary} Mission board is ready with ${mission.steps.length} steps. I will pause at every confirmation gate.`,
          displayCards: input.displayCards ?? mission.steps.map((missionStep) => ({
            title: missionStep.title,
            body: missionStep.description,
            action: missionStep.voicePrompt,
            path: missionStep.path,
          })),
        };
      }

      if (intent === "command_chain") {
        const chain = planCommandChain(payload.raw);
        return {
          status: "executed" as const,
          action: "command_chain_staged" as const,
          mission: chain,
          path: "/dashboard/hope-ai",
          spokenResponse: `Command chain staged with ${chain.steps.length} steps. Safe steps can continue hands-free; risky steps remain locked behind confirmation.`,
          displayCards: input.displayCards ?? chain.steps.map((chainStep) => ({
            title: chainStep.title,
            body: chainStep.description,
            action: chainStep.voicePrompt,
            path: chainStep.path,
          })),
        };
      }

      if (intent === "proactive_suggest") {
        const suggestions = getProactiveSuggestions({ currentPath: payload.path, mode: payload.mode });
        return {
          status: "executed" as const,
          action: "proactive_suggestions" as const,
          suggestions,
          path: payload.path ?? "/dashboard/hope-ai",
          spokenResponse: "I found safe next-step suggestions. Choose one and I can turn it into a mission.",
          displayCards: input.displayCards ?? suggestions.map((suggestion) => ({
            title: suggestion.title,
            body: suggestion.body,
            action: `Say: ${suggestion.command}`,
            path: suggestion.path,
          })),
        };
      }

      if (["beginner_mode", "hands_free_mode", "workflow_guide", "explain"].includes(intent)) {
        return {
          status: "executed" as const,
          action: intent as "beginner_mode" | "hands_free_mode" | "workflow_guide" | "explain",
          path: payload.path,
          mode: payload.mode ?? "guardian",
          spokenResponse:
            intent === "beginner_mode"
              ? "Beginner mode is active. I will guide you in plain English and protect risky actions with confirmations."
              : intent === "hands_free_mode"
                ? "Hands-free mode is active. Say open wallet, scan Bitcoin, teach me trading, or summarize my money."
                : payload.path
                  ? `I can guide that workflow and open ${payload.actionLabel ?? "the requested page"}.`
                  : "I can guide that workflow step by step.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "navigate") {
        return {
          status: "executed" as const,
          action: "navigate" as const,
          path: payload.path ?? "/dashboard/hub",
          spokenResponse: payload.actionLabel ? `Opening ${payload.actionLabel}.` : "Navigation complete.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "portfolio_summary") {
        return {
          status: "executed" as const,
          action: "navigate" as const,
          path: "/dashboard/portfolio",
          spokenResponse: "Opening your portfolio and money management view.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "payment_prepare") {
        if (!confirmed) {
          return {
            status: "needs_confirmation" as const,
            action: "confirm_payment" as const,
            path: "/dashboard/pay",
            spokenResponse: "Payment workflows can affect money. Say confirm payment to open checkout preparation.",
            displayCards: input.displayCards ?? [],
          };
        }

        return {
          status: "executed" as const,
          action: "payment_prepared" as const,
          path: "/dashboard/pay",
          spokenResponse: "Opening payments. Review all details manually before completing any charge.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "market_scan") {
        const signal = generateTradingSignal(payload.symbol ?? "SKY4444");
        return {
          status: "executed" as const,
          action: "signal" as const,
          signal,
          path: "/dashboard/market",
          spokenResponse: `${signal.symbol} is ${signal.action} with ${signal.confidence}% confidence and ${signal.riskLevel} risk. This is informational only.`,
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "trade_prepare") {
        if (!confirmed) {
          return {
            status: "needs_confirmation" as const,
            action: "confirm_trade" as const,
            path: "/dashboard/trading",
            spokenResponse: "This trade changes account records. Say confirm trade before Hope AI records it.",
            displayCards: input.displayCards ?? [],
          };
        }

        const amount = payload.amount ?? "1";
        const price = payload.price && payload.price !== "market" ? payload.price : "1";
        const pair = `${payload.symbol ?? "SKY4444"}/USD`;
        await createTrade(ctx.user.id, {
          pair,
          type: payload.side ?? "buy",
          amount,
          price,
          total: (Number(amount) * Number(price || 1)).toString(),
          status: "filled",
        });

        if (db) {
          await db.insert(hopeVoiceCommands).values({
            userId: ctx.user.id,
            transcript: payload.raw,
            intent,
            payload: JSON.stringify(payload),
            status: "executed",
            response: `Recorded beta ${payload.side ?? "buy"} trade for ${amount} ${payload.symbol ?? "SKY4444"}.`,
          });
        }

        return {
          status: "executed" as const,
          action: "trade_recorded" as const,
          path: "/dashboard/trading",
          spokenResponse: `Recorded beta ${payload.side ?? "buy"} trade for ${amount} ${payload.symbol ?? "SKY4444"}.`,
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "tip_prepare") {
        if (!payload.recipientId || !payload.tipAmount || payload.tipAmount <= 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Recipient user id and positive tip amount are required." });
        }

        if (!confirmed) {
          return {
            status: "needs_confirmation" as const,
            action: "confirm_tip" as const,
            path: "/dashboard/messages",
            spokenResponse: "This sends a tip. Say confirm tip before Hope AI records it.",
            displayCards: input.displayCards ?? [],
          };
        }

        await sendMessage(ctx.user.id, payload.recipientId, payload.message ?? "Hope AI voice tip", payload.tipAmount);
        if (db) {
          await db.insert(hopeVoiceCommands).values({
            userId: ctx.user.id,
            transcript: payload.raw,
            intent,
            payload: JSON.stringify(payload),
            status: "executed",
            response: `Sent ${payload.tipAmount} SKY4444 tip to user ${payload.recipientId}.`,
          });
        }

        return {
          status: "executed" as const,
          action: "tip_sent" as const,
          path: "/dashboard/messages",
          spokenResponse: `Sent ${payload.tipAmount} SKY4444 tip to user ${payload.recipientId}.`,
          displayCards: input.displayCards ?? [],
        };
      }

      return {
        status: "rejected" as const,
        action: "unknown" as const,
        spokenResponse: "I could not execute that command yet. Try beginner mode for guided examples.",
        displayCards: input.displayCards ?? [],
      };
    }),


  planMission: protectedProcedure
    .input(z.object({
      goal: z.string().min(1).max(1200),
      mode: z.enum(["beginner", "pro", "guardian"]).default("guardian"),
    }))
    .mutation(async ({ ctx, input }) => {
      const mission = planMission(input.goal, input.mode);
      const db = await getDb();

      if (db) {
        await db.insert(hopeVoiceCommands).values({
          userId: ctx.user.id,
          transcript: input.goal,
          intent: "mission_plan",
          payload: JSON.stringify({ missionId: mission.id, goal: mission.goal, plannedStepCount: mission.steps.length }),
          status: "parsed",
          response: mission.summary,
        });
      }

      return mission;
    }),

  planCommandChain: protectedProcedure
    .input(z.object({ transcript: z.string().min(1).max(1200) }))
    .mutation(async ({ ctx, input }) => {
      const chain = planCommandChain(input.transcript);
      const db = await getDb();

      if (db) {
        await db.insert(hopeVoiceCommands).values({
          userId: ctx.user.id,
          transcript: input.transcript,
          intent: "command_chain",
          payload: JSON.stringify({ missionId: chain.id, goal: chain.goal, plannedStepCount: chain.steps.length }),
          status: "parsed",
          response: chain.summary,
        });
      }

      return chain;
    }),

  getProactiveSuggestions: protectedProcedure
    .input(z.object({
      currentPath: z.string().optional(),
      mode: z.enum(["beginner", "pro", "guardian"]).optional(),
      recentIntent: intentSchema.optional(),
    }).optional())
    .query(({ input }) => {
      return getProactiveSuggestions(input ?? {});
    }),

  recentCommands: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(hopeVoiceCommands)
        .where(eq(hopeVoiceCommands.userId, ctx.user.id))
        .orderBy(desc(hopeVoiceCommands.createdAt))
        .limit(input.limit);
    }),
});
