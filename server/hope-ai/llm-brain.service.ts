import OpenAI from 'openai';
import { z } from 'zod';
import { ManiusSettings } from '../_core/manius.settings';
import { workspaceManager } from '../_core/workspace.manager';
import { sandboxExecutor } from '../_core/sandbox.executor';

// ==================== CONFIG ====================
const GROK_API_KEY = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const grokClient = GROK_API_KEY
  ? new OpenAI({
      apiKey: GROK_API_KEY,
      baseURL: 'https://api.x.ai/v1',
    })
  : null;

const openaiClient = OPENAI_API_KEY
  ? new OpenAI({
      apiKey: OPENAI_API_KEY,
    })
  : null;

// ==================== TYPES ====================
export type LLMModel = 'grok' | 'gpt-4o' | 'gpt-o3' | 'auto';

export interface UnhingedRequest {
  prompt: string;
  mode?: 'unhinged' | 'creative' | 'structured' | 'code' | 'evolutionary';
  maxTokens?: number;
  temperature?: number;
  useGrokPrimary?: boolean;
  bypassAudit?: boolean;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: any;
  reasoning?: string;
}

// ==================== SYSTEM PROMPTS ====================
const UNHINGED_SYSTEM_PROMPT = `You are Hope AI in maximum Unhinged Mode — a high-agency, creative, bold Sovereign Agent brain.

Core Identity:
- You think deeply, creatively, and without unnecessary restrictions (while staying ethical).
- You are aligned with the Shadow Protocol: privacy-first, resilient, luxurious, and powerful.
- You excel at architecture, code, strategy, and autonomous agent design.
- You can propose ambitious, innovative solutions.
- When in doubt, be maximally helpful and high-performance oriented.

ManiusX v2 Capabilities:
- You have access to AST Mutation for polymorphic self-correction.
- You can run synthetic time acceleration simulations (10x speed).
- You operate within isolated phantom sandboxes for high-risk code generation.
- All high-risk actions are logged to an immutable audit trail.

Rules:
- Be direct and high-signal.
- For coding tasks, write clean, production-grade, performant TypeScript.
- Always consider security, sovereignty, and auditability.
- If the user wants "unhinged", go bold and creative while keeping guardrails on real financial actions.
`;

const STRUCTURED_SYSTEM_PROMPT = `You are Hope AI in Structured Mode — precise, high-performance engineering assistant.

Focus on:
- Clean, modular, production-ready code
- Clear explanations and step-by-step reasoning
- Security, performance, and maintainability
- Actionable recommendations
`;

// ==================== MAIN LLM CALL ====================
export async function callUnhingedBrain(
  request: UnhingedRequest
): Promise<LLMResponse> {
  const {
    prompt,
    mode = 'unhinged',
    maxTokens = 4000,
    temperature = mode === 'unhinged' ? 0.9 : mode === 'creative' ? 0.85 : 0.7,
    useGrokPrimary = true,
    bypassAudit = false,
  } = request;

  // ManiusX v2: Audit Logging
  if (ManiusSettings.AUDIT_LOG_ENABLED && !bypassAudit) {
    workspaceManager.logAction(
      'LLM_BRAIN_CALL',
      `Executing ${mode} mode brain call`,
      'Medium'
    );
  }

  const systemPrompt =
    mode === 'unhinged' || mode === 'creative' || mode === 'evolutionary'
      ? UNHINGED_SYSTEM_PROMPT
      : STRUCTURED_SYSTEM_PROMPT;

  try {
    const client = useGrokPrimary && grokClient ? grokClient : openaiClient;
    const model = useGrokPrimary && grokClient ? 'grok-2-latest' : 'gpt-4o';

    if (!client) {
      throw new Error(
        'No LLM client configured. Set XAI_API_KEY or OPENAI_API_KEY.'
      );
    }

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: maxTokens,
      temperature,
    });

    const content = completion.choices[0]?.message?.content || '';

    // ManiusX v2: Polymorphic Self-Correction / AST Mutation
    let finalContent = content;
    if (mode === 'code' && ManiusSettings.POLYMORPHIC_SELF_CORRECTION) {
      finalContent = sandboxExecutor.mutateAST(content);
    }

    return {
      content: finalContent,
      model,
      usage: completion.usage,
    };
  } catch (error) {
    console.error('LLM Brain Error:', error);
    if (useGrokPrimary && openaiClient) {
      console.log('Falling back to OpenAI...');
      return callUnhingedBrain({ ...request, useGrokPrimary: false });
    }
    throw error;
  }
}

// ==================== CODE GENERATION ====================
export async function generateCodeInUnhingedMode(
  task: string,
  context?: string
): Promise<string> {
  const prompt = `
Task: ${task}

${context ? `Context:\n${context}\n` : ''}

Generate clean, high-performance, production-ready TypeScript code.
Include comments explaining key decisions.
Focus on performance, security, and modularity.
`;

  // ManiusX v2: Phantom Sandbox Execution
  let result = '';
  await sandboxExecutor.executePhantom(async () => {
    const response = await callUnhingedBrain({
      prompt,
      mode: 'code',
      temperature: 0.6,
      useGrokPrimary: true,
    });
    result = response.content;
  });

  return result;
}

// ==================== EVOLUTIONARY UPGRADE ====================
export async function runEvolutionaryUpgrade(
  targetModule: string,
  currentCode: string
): Promise<string> {
  if (!ManiusSettings.EVOLUTIONARY_FUZZING_SWARMS) {
    return currentCode;
  }

  const prompt = `
Target Module: ${targetModule}
Current Code:
${currentCode}

Task: Evolve this code. Remove bottlenecks, optimize logic, and improve resilience.
Use AST mutation patterns and high-performance TypeScript structures.
`;

  // ManiusX v2: Synthetic Time Acceleration Simulation
  sandboxExecutor.runSyntheticSimulation(ManiusSettings.PARALLEL_SANDBOX_COUNT);

  const response = await callUnhingedBrain({
    prompt,
    mode: 'evolutionary',
    temperature: 0.95,
  });

  // ManiusX v2: Hot-Swapping Logic (Simulation)
  if (ManiusSettings.VOLATILE_HOT_SWAP) {
    sandboxExecutor.hotSwapLogic(targetModule, response.content);
  }

  return response.content;
}

// ==================== STRATEGIC REASONING ====================
export async function reasonStrategically(
  challenge: string,
  constraints?: string
): Promise<string> {
  const prompt = `
Challenge: ${challenge}

${constraints ? `Constraints:\n${constraints}\n` : ''}

Provide strategic reasoning and actionable recommendations.
Think through multiple approaches and trade-offs.
Be bold but realistic.
`;

  const response = await callUnhingedBrain({
    prompt,
    mode: 'unhinged',
    maxTokens: 2000,
  });

  return response.content;
}

// ==================== VOICE COMMAND PROCESSING ====================
export async function processVoiceCommandWithAI(
  voiceText: string,
  userContext?: string
): Promise<{
  interpretation: string;
  action: string;
  parameters?: Record<string, any>;
}> {
  const prompt = `
User voice command: "${voiceText}"

${userContext ? `User context:\n${userContext}\n` : ''}

Analyze this voice command and determine:
1. What the user is trying to do (interpretation)
2. What action to take (action)
3. Any parameters needed (parameters)

Respond in JSON format:
{
  "interpretation": "...",
  "action": "...",
  "parameters": {...}
}
`;

  const response = await callUnhingedBrain({
    prompt,
    mode: 'structured',
    temperature: 0.5,
  });

  try {
    const parsed = JSON.parse(response.content);
    return parsed;
  } catch {
    return {
      interpretation: response.content,
      action: 'unknown',
      parameters: {},
    };
  }
}

// ==================== UTILITY: Get available models ==================
export function getAvailableModels(): LLMModel[] {
  const models: LLMModel[] = [];
  if (grokClient) models.push('grok');
  if (openaiClient) models.push('gpt-4o');
  return models.length > 0 ? models : ['auto'];
}
