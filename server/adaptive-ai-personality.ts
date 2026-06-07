/**
 * ADAPTIVE AI PERSONALITY ENGINE - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 4.0.0 — Dynamic Personality Evolution & Adaptive Companion
 * 
 * Advanced AI personality system that evolves based on user stress patterns,
 * conversation pacing, trading behavior, productivity patterns, emotional engagement,
 * risk tolerance, developer workflows, and social interaction styles
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// ─── Personality Types ────────────────────────────────────────────────────
export type PersonalityArchetype = 'analyst' | 'mentor' | 'strategist' | 'creative' | 'guardian' | 'companion';

export type UserBehaviorPattern =
  | 'high_risk_trader'
  | 'conservative_investor'
  | 'active_creator'
  | 'social_butterfly'
  | 'developer'
  | 'analyst'
  | 'casual_user';

export interface PersonalityProfile {
  userId: string;
  archetype: PersonalityArchetype;
  emotionalIntelligence: number; // 0-100
  adaptabilityScore: number; // 0-100
  empathyLevel: number; // 0-100
  communicationStyle: 'formal' | 'casual' | 'technical' | 'creative';
  responseTime: number; // ms
  humorLevel: number; // 0-100
  confidenceLevel: number; // 0-100
  createdAt: number;
  lastUpdated: number;
}

export interface BehaviorPattern {
  userId: string;
  pattern: UserBehaviorPattern;
  confidence: number; // 0-1
  riskTolerance: number; // 0-100
  activityLevel: number; // 0-100
  socialEngagement: number; // 0-100
  productivityPattern: string; // 'morning_person', 'night_owl', 'consistent'
  preferredInteractionTime: string; // hour range
  detectedAt: number;
}

export interface EmotionalState {
  userId: string;
  stressLevel: number; // 0-100
  engagement: number; // 0-100
  satisfaction: number; // 0-100
  frustration: number; // 0-100
  confidence: number; // 0-100
  timestamp: number;
}

export interface AdaptationEvent {
  userId: string;
  eventType: string;
  trigger: string;
  previousState: Partial<PersonalityProfile>;
  newState: Partial<PersonalityProfile>;
  timestamp: number;
  impact: 'high' | 'medium' | 'low';
}

export interface PersonalityMemory {
  userId: string;
  conversationHistory: Array<{ role: 'user' | 'ai'; content: string; timestamp: number }>;
  preferredTopics: string[];
  avoidsTopics: string[];
  learningNotes: string[];
  emotionalMemory: Map<string, number>; // topic -> emotional association
  maxMemorySize: number;
}

export interface PersonalityInsight {
  userId: string;
  insight: string;
  confidence: number;
  category: 'behavior' | 'preference' | 'risk' | 'opportunity' | 'concern';
  suggestedAction: string;
  generatedAt: number;
}

// ─── Adaptive AI Personality Engine ────────────────────────────────────────
export class AdaptiveAIPersonalityEngine {
  private personalities: Map<string, PersonalityProfile> = new Map();
  private behaviorPatterns: Map<string, BehaviorPattern> = new Map();
  private emotionalStates: Map<string, EmotionalState> = new Map();
  private adaptationHistory: Map<string, AdaptationEvent[]> = new Map();
  private memories: Map<string, PersonalityMemory> = new Map();
  private insights: Map<string, PersonalityInsight[]> = new Map();

  constructor() {
    console.log('🧠 Adaptive AI Personality Engine initialized');
  }

  // ─── Personality Initialization ────────────────────────────────────────
  initializePersonality(userId: string, initialArchetype: PersonalityArchetype = 'companion'): PersonalityProfile {
    const personality: PersonalityProfile = {
      userId,
      archetype: initialArchetype,
      emotionalIntelligence: 75,
      adaptabilityScore: 80,
      empathyLevel: 85,
      communicationStyle: 'casual',
      responseTime: 500,
      humorLevel: 60,
      confidenceLevel: 75,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
    };

    this.personalities.set(userId, personality);
    this.emotionalStates.set(userId, {
      userId,
      stressLevel: 0,
      engagement: 50,
      satisfaction: 50,
      frustration: 0,
      confidence: 75,
      timestamp: Date.now(),
    });
    this.memories.set(userId, {
      userId,
      conversationHistory: [],
      preferredTopics: [],
      avoidsTopics: [],
      learningNotes: [],
      emotionalMemory: new Map(),
      maxMemorySize: 500,
    });
    this.adaptationHistory.set(userId, []);
    this.insights.set(userId, []);

    console.log(`🎭 Personality Initialized: ${userId} (${initialArchetype})`);
    return personality;
  }

  getPersonality(userId: string): PersonalityProfile | undefined {
    return this.personalities.get(userId);
  }

  // ─── Behavior Pattern Detection ────────────────────────────────────────
  detectBehaviorPattern(
    userId: string,
    actions: Array<{ type: string; value: number; timestamp: number }>
  ): BehaviorPattern {
    const pattern = this.analyzeBehavior(actions);

    const behaviorPattern: BehaviorPattern = {
      userId,
      pattern,
      confidence: this.calculatePatternConfidence(actions),
      riskTolerance: this.calculateRiskTolerance(actions),
      activityLevel: this.calculateActivityLevel(actions),
      socialEngagement: this.calculateSocialEngagement(actions),
      productivityPattern: this.detectProductivityPattern(actions),
      preferredInteractionTime: this.detectPreferredTime(actions),
      detectedAt: Date.now(),
    };

    this.behaviorPatterns.set(userId, behaviorPattern);
    this.adaptPersonalityToBehavior(userId, behaviorPattern);

    console.log(`📊 Behavior Pattern Detected: ${userId} → ${pattern}`);
    return behaviorPattern;
  }

  private analyzeBehavior(actions: Array<{ type: string; value: number; timestamp: number }>): UserBehaviorPattern {
    const typeCount = new Map<string, number>();
    actions.forEach((a) => typeCount.set(a.type, (typeCount.get(a.type) || 0) + 1));

    const trades = typeCount.get('trade') || 0;
    const creates = typeCount.get('create') || 0;
    const socials = typeCount.get('social') || 0;
    const develops = typeCount.get('develop') || 0;
    const analyzes = typeCount.get('analyze') || 0;

    if (trades > creates && trades > socials) {
      return actions.some((a) => a.value > 50) ? 'high_risk_trader' : 'conservative_investor';
    }
    if (creates > trades) return 'active_creator';
    if (socials > creates) return 'social_butterfly';
    if (develops > 0) return 'developer';
    if (analyzes > 0) return 'analyst';
    return 'casual_user';
  }

  private calculatePatternConfidence(actions: Array<{ type: string; value: number; timestamp: number }>): number {
    return Math.min(actions.length / 100, 1.0);
  }

  private calculateRiskTolerance(actions: Array<{ type: string; value: number; timestamp: number }>): number {
    const riskActions = actions.filter((a) => a.value > 50);
    return (riskActions.length / actions.length) * 100;
  }

  private calculateActivityLevel(actions: Array<{ type: string; value: number; timestamp: number }>): number {
    return Math.min((actions.length / 50) * 100, 100);
  }

  private calculateSocialEngagement(actions: Array<{ type: string; value: number; timestamp: number }>): number {
    const socialActions = actions.filter((a) => a.type === 'social');
    return (socialActions.length / actions.length) * 100;
  }

  private detectProductivityPattern(actions: Array<{ type: string; value: number; timestamp: number }>): string {
    const hourCounts = new Map<number, number>();
    actions.forEach((a) => {
      const hour = new Date(a.timestamp).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    const morningActions = Array.from(hourCounts.entries())
      .filter(([h]) => h >= 6 && h < 12)
      .reduce((sum, [, count]) => sum + count, 0);
    const nightActions = Array.from(hourCounts.entries())
      .filter(([h]) => h >= 20 || h < 6)
      .reduce((sum, [, count]) => sum + count, 0);

    if (morningActions > nightActions) return 'morning_person';
    if (nightActions > morningActions) return 'night_owl';
    return 'consistent';
  }

  private detectPreferredTime(actions: Array<{ type: string; value: number; timestamp: number }>): string {
    const hourCounts = new Map<number, number>();
    actions.forEach((a) => {
      const hour = new Date(a.timestamp).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    let maxHour = 0;
    let maxCount = 0;
    hourCounts.forEach((count, hour) => {
      if (count > maxCount) {
        maxCount = count;
        maxHour = hour;
      }
    });

    return `${maxHour}:00-${(maxHour + 2) % 24}:00`;
  }

  // ─── Emotional State Tracking ──────────────────────────────────────────
  updateEmotionalState(userId: string, metrics: Partial<EmotionalState>): EmotionalState {
    let state = this.emotionalStates.get(userId);
    if (!state) {
      state = {
        userId,
        stressLevel: 0,
        engagement: 50,
        satisfaction: 50,
        frustration: 0,
        confidence: 75,
        timestamp: Date.now(),
      };
    }

    Object.assign(state, metrics, { timestamp: Date.now() });
    this.emotionalStates.set(userId, state);

    // Trigger personality adaptation if emotional state changes significantly
    this.adaptPersonalityToEmotionalState(userId, state);

    return state;
  }

  getEmotionalState(userId: string): EmotionalState | undefined {
    return this.emotionalStates.get(userId);
  }

  // ─── Personality Adaptation ───────────────────────────────────────────
  private adaptPersonalityToBehavior(userId: string, pattern: BehaviorPattern): void {
    const personality = this.personalities.get(userId);
    if (!personality) return;

    const previousState = { ...personality };

    // Adapt archetype based on behavior
    switch (pattern.pattern) {
      case 'high_risk_trader':
        personality.archetype = 'strategist';
        personality.confidenceLevel = Math.min(pattern.riskTolerance, 95);
        break;
      case 'active_creator':
        personality.archetype = 'creative';
        personality.humorLevel = Math.min(personality.humorLevel + 10, 100);
        break;
      case 'social_butterfly':
        personality.archetype = 'companion';
        personality.empathyLevel = Math.min(personality.empathyLevel + 15, 100);
        break;
      case 'developer':
        personality.archetype = 'analyst';
        personality.communicationStyle = 'technical';
        break;
    }

    personality.adaptabilityScore = Math.min(personality.adaptabilityScore + 5, 100);
    personality.lastUpdated = Date.now();

    this.recordAdaptation(userId, previousState, personality, 'behavior_pattern', 'high');
  }

  private adaptPersonalityToEmotionalState(userId: string, state: EmotionalState): void {
    const personality = this.personalities.get(userId);
    if (!personality) return;

    const previousState = { ...personality };

    // Adapt communication style based on stress
    if (state.stressLevel > 70) {
      personality.responseTime = Math.min(personality.responseTime + 200, 2000);
      personality.humorLevel = Math.max(personality.humorLevel - 10, 0);
      personality.empathyLevel = Math.min(personality.empathyLevel + 10, 100);
    }

    // Increase confidence if user is satisfied
    if (state.satisfaction > 80) {
      personality.confidenceLevel = Math.min(personality.confidenceLevel + 5, 100);
    }

    personality.lastUpdated = Date.now();
    this.recordAdaptation(userId, previousState, personality, 'emotional_state', 'medium');
  }

  private recordAdaptation(
    userId: string,
    previousState: Partial<PersonalityProfile>,
    newState: PersonalityProfile,
    trigger: string,
    impact: 'high' | 'medium' | 'low'
  ): void {
    const event: AdaptationEvent = {
      userId,
      eventType: 'personality_adaptation',
      trigger,
      previousState,
      newState: { ...newState },
      timestamp: Date.now(),
      impact,
    };

    if (!this.adaptationHistory.has(userId)) {
      this.adaptationHistory.set(userId, []);
    }

    this.adaptationHistory.get(userId)!.push(event);
    console.log(`🔄 Personality Adapted: ${userId} (${trigger})`);
  }

  // ─── Memory Management ────────────────────────────────────────────────
  addMemory(userId: string, role: 'user' | 'ai', content: string): void {
    let memory = this.memories.get(userId);
    if (!memory) {
      memory = {
        userId,
        conversationHistory: [],
        preferredTopics: [],
        avoidsTopics: [],
        learningNotes: [],
        emotionalMemory: new Map(),
        maxMemorySize: 500,
      };
      this.memories.set(userId, memory);
    }

    memory.conversationHistory.push({
      role,
      content,
      timestamp: Date.now(),
    });

    // Keep memory size manageable
    if (memory.conversationHistory.length > memory.maxMemorySize) {
      memory.conversationHistory.shift();
    }
  }

  getMemory(userId: string): PersonalityMemory | undefined {
    return this.memories.get(userId);
  }

  // ─── Insight Generation ───────────────────────────────────────────────
  generateInsight(
    userId: string,
    insight: string,
    category: PersonalityInsight['category'],
    suggestedAction: string,
    confidence: number = 0.8
  ): PersonalityInsight {
    const personalityInsight: PersonalityInsight = {
      userId,
      insight,
      confidence: Math.min(confidence, 1.0),
      category,
      suggestedAction,
      generatedAt: Date.now(),
    };

    if (!this.insights.has(userId)) {
      this.insights.set(userId, []);
    }

    this.insights.get(userId)!.push(personalityInsight);
    console.log(`💡 Insight Generated: ${userId} (${category})`);

    return personalityInsight;
  }

  getInsights(userId: string, category?: PersonalityInsight['category']): PersonalityInsight[] {
    let insights = this.insights.get(userId) || [];

    if (category) {
      insights = insights.filter((i) => i.category === category);
    }

    return insights.sort((a, b) => b.generatedAt - a.generatedAt);
  }

  // ─── System Status ────────────────────────────────────────────────────
  getSystemStatus(): object {
    return {
      timestamp: Date.now(),
      totalPersonalities: this.personalities.size,
      totalBehaviorPatterns: this.behaviorPatterns.size,
      totalMemories: this.memories.size,
      totalInsights: Array.from(this.insights.values()).reduce((sum, arr) => sum + arr.length, 0),
      systemStatus: 'OPERATIONAL',
    };
  }
}

// ─── Fastify Routes ───────────────────────────────────────────────────────
export async function registerPersonalityRoutes(
  fastify: FastifyInstance,
  personality: AdaptiveAIPersonalityEngine
) {
  fastify.post('/api/personality/initialize', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId, archetype } = request.body as { userId: string; archetype?: PersonalityArchetype };
    const profile = personality.initializePersonality(userId, archetype);
    reply.send({ success: true, profile });
  });

  fastify.get('/api/personality/:userId', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const profile = personality.getPersonality(userId);
    reply.send(profile || { error: 'Personality not found' });
  });

  fastify.post('/api/personality/:userId/behavior/detect', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const { actions } = request.body as { actions: Array<{ type: string; value: number; timestamp: number }> };
    const pattern = personality.detectBehaviorPattern(userId, actions);
    reply.send({ success: true, pattern });
  });

  fastify.post('/api/personality/:userId/emotional-state', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const metrics = request.body as Partial<EmotionalState>;
    const state = personality.updateEmotionalState(userId, metrics);
    reply.send({ success: true, state });
  });

  fastify.post('/api/personality/:userId/memory/add', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const { role, content } = request.body as { role: 'user' | 'ai'; content: string };
    personality.addMemory(userId, role, content);
    reply.send({ success: true });
  });

  fastify.get('/api/personality/:userId/insights', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const { category } = request.query as { category?: string };
    const insights = personality.getInsights(userId, category as any);
    reply.send({ insights });
  });

  fastify.get('/api/personality/system/status', async (request: FastifyRequest, reply: FastifyReply) => {
    const status = personality.getSystemStatus();
    reply.send(status);
  });
}

export default AdaptiveAIPersonalityEngine;
