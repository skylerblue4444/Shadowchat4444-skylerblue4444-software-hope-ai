import { router, protectedProcedure } from '../_core/trpc';
import { z } from 'zod';
import {
  callUnhingedBrain,
  generateCodeInUnhingedMode,
  reasonStrategically,
  processVoiceCommandWithAI,
  getAvailableModels,
} from './llm-brain.service';

/**
 * Hope AI Unhinged Mode Router
 * Integrates Grok + GPT-4o hybrid brain for maximum creative, strategic, and code-generation capabilities
 */
export const hopeAiUnhingedRouter = router({
  // ─── Core Unhinged Brain Calls ───────────────────────────────────────────
  callBrain: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(1).max(10000),
        mode: z
          .enum(['unhinged', 'creative', 'structured', 'code'])
          .default('unhinged'),
        maxTokens: z.number().min(100).max(8000).default(4000),
        temperature: z.number().min(0).max(2).default(0.9),
        useGrokPrimary: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return await callUnhingedBrain(input);
    }),

  // ─── Strategic Reasoning ──────────────────────────────────────────────────
  reason: protectedProcedure
    .input(
      z.object({
        challenge: z.string().min(1).max(5000),
        constraints: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const reasoning = await reasonStrategically(
        input.challenge,
        input.constraints
      );
      return { reasoning };
    }),

  // ─── Code Generation ─────────────────────────────────────────────────────
  generateCode: protectedProcedure
    .input(
      z.object({
        task: z.string().min(1).max(5000),
        context: z.string().max(3000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const code = await generateCodeInUnhingedMode(input.task, input.context);
      return { code };
    }),

  // ─── Voice Command Processing ────────────────────────────────────────────
  processVoiceCommand: protectedProcedure
    .input(
      z.object({
        voiceText: z.string().min(1).max(1000),
        userContext: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await processVoiceCommandWithAI(
        input.voiceText,
        input.userContext
      );
      return result;
    }),

  // ─── Model Status ────────────────────────────────────────────────────────
  getAvailableModels: protectedProcedure.query(async () => {
    return {
      models: getAvailableModels(),
      grokEnabled: !!process.env.XAI_API_KEY || !!process.env.GROK_API_KEY,
      openaiEnabled: !!process.env.OPENAI_API_KEY,
    };
  }),

  // ─── Batch Processing ────────────────────────────────────────────────────
  batchProcess: protectedProcedure
    .input(
      z.object({
        prompts: z.array(z.string()).min(1).max(10),
        mode: z
          .enum(['unhinged', 'creative', 'structured', 'code'])
          .default('structured'),
      })
    )
    .mutation(async ({ input }) => {
      const results = await Promise.all(
        input.prompts.map(prompt =>
          callUnhingedBrain({
            prompt,
            mode: input.mode,
          })
        )
      );
      return { results };
    }),

  // ─── Streaming Placeholder (for future WebSocket integration) ────────────
  streamBrain: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(1).max(10000),
        mode: z
          .enum(['unhinged', 'creative', 'structured', 'code'])
          .default('unhinged'),
      })
    )
    .query(async ({ input }) => {
      // This is a placeholder for streaming support via WebSocket
      // For now, return full response
      const response = await callUnhingedBrain(input);
      return response;
    }),
});
