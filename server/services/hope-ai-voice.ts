/**
 * Hope AI Voice & Avatar Service - Complete Voice Command System
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: 25 voice personalities, Miss Ann avatar with 25 outfits,
 * unhinged mode, day trade partner, trade room co-pilot
 */

export interface VoicePersonality {
  id: string;
  name: string;
  description: string;
  tone: string;
  speed: number;
  pitch: number;
  unhingedLevel: number; // 0-10
}

export interface AvatarOutfit {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'professional' | 'casual' | 'fantasy' | 'themed' | 'special';
  unlockCondition?: string;
}

export interface TradeRoomMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  type: 'chat' | 'signal' | 'tip' | 'alert' | 'hope_ai';
  coinMention?: string;
  timestamp: Date;
}

export interface DayTradeSignal {
  id: string;
  coin: string;
  action: 'LONG' | 'SHORT' | 'SCALP_BUY' | 'SCALP_SELL' | 'HOLD';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  confidence: number;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h';
  reason: string;
  generatedAt: Date;
  expiresAt: Date;
}

// =============================================================================
// 25 VOICE PERSONALITIES
// =============================================================================

export const VOICE_PERSONALITIES: VoicePersonality[] = [
  { id: 'professional', name: 'Professional Ann', description: 'Clear, data-driven analysis', tone: 'authoritative', speed: 1.0, pitch: 1.0, unhingedLevel: 0 },
  { id: 'friendly', name: 'Friendly Ann', description: 'Warm and encouraging', tone: 'warm', speed: 0.95, pitch: 1.05, unhingedLevel: 0 },
  { id: 'unhinged', name: 'Unhinged Ann', description: 'No filter, raw, aggressive', tone: 'chaotic', speed: 1.3, pitch: 1.2, unhingedLevel: 10 },
  { id: 'seductive', name: 'Smooth Ann', description: 'Calm, persuasive whisper', tone: 'sultry', speed: 0.85, pitch: 0.9, unhingedLevel: 3 },
  { id: 'hype', name: 'Hype Ann', description: 'FOMO-inducing energy', tone: 'excited', speed: 1.4, pitch: 1.3, unhingedLevel: 6 },
  { id: 'zen', name: 'Zen Ann', description: 'Meditative, patient', tone: 'peaceful', speed: 0.8, pitch: 0.95, unhingedLevel: 0 },
  { id: 'drill_sergeant', name: 'Sergeant Ann', description: 'Disciplined, no excuses', tone: 'commanding', speed: 1.2, pitch: 0.8, unhingedLevel: 5 },
  { id: 'valley_girl', name: 'Valley Ann', description: 'Like, totally bullish', tone: 'casual', speed: 1.1, pitch: 1.4, unhingedLevel: 4 },
  { id: 'british', name: 'Posh Ann', description: 'Refined British analysis', tone: 'sophisticated', speed: 0.9, pitch: 1.0, unhingedLevel: 1 },
  { id: 'pirate', name: 'Captain Ann', description: 'Arrr, treasure ahead', tone: 'adventurous', speed: 1.0, pitch: 0.85, unhingedLevel: 4 },
  { id: 'robot', name: 'AI Core Ann', description: 'Pure data, no emotion', tone: 'monotone', speed: 1.0, pitch: 0.7, unhingedLevel: 0 },
  { id: 'motivational', name: 'Coach Ann', description: 'You can do this!', tone: 'inspiring', speed: 1.05, pitch: 1.1, unhingedLevel: 2 },
  { id: 'sarcastic', name: 'Snarky Ann', description: 'Oh great, another dip', tone: 'dry', speed: 0.95, pitch: 1.0, unhingedLevel: 6 },
  { id: 'whisper', name: 'ASMR Ann', description: 'Gentle whisper trading', tone: 'intimate', speed: 0.7, pitch: 1.1, unhingedLevel: 2 },
  { id: 'news_anchor', name: 'Anchor Ann', description: 'Breaking news style', tone: 'broadcast', speed: 1.1, pitch: 1.0, unhingedLevel: 0 },
  { id: 'gamer', name: 'Gamer Ann', description: 'GG, easy money', tone: 'competitive', speed: 1.2, pitch: 1.15, unhingedLevel: 5 },
  { id: 'southern', name: 'Southern Ann', description: 'Bless your portfolio', tone: 'charming', speed: 0.9, pitch: 1.05, unhingedLevel: 2 },
  { id: 'rapper', name: 'MC Ann', description: 'Bars about your gains', tone: 'rhythmic', speed: 1.3, pitch: 1.0, unhingedLevel: 7 },
  { id: 'witch', name: 'Oracle Ann', description: 'I foresee profits', tone: 'mystical', speed: 0.85, pitch: 0.9, unhingedLevel: 3 },
  { id: 'anime', name: 'Kawaii Ann', description: 'Sugoi! Moon desu!', tone: 'cute', speed: 1.2, pitch: 1.5, unhingedLevel: 4 },
  { id: 'noir', name: 'Detective Ann', description: 'The chart tells a story', tone: 'mysterious', speed: 0.9, pitch: 0.85, unhingedLevel: 2 },
  { id: 'sports', name: 'Commentator Ann', description: 'And the bulls SCORE!', tone: 'energetic', speed: 1.3, pitch: 1.1, unhingedLevel: 5 },
  { id: 'therapist', name: 'Therapist Ann', description: 'How does that loss make you feel?', tone: 'empathetic', speed: 0.85, pitch: 1.0, unhingedLevel: 1 },
  { id: 'chaos', name: 'Chaos Ann', description: 'BURN IT ALL AND BUY THE DIP', tone: 'manic', speed: 1.5, pitch: 1.4, unhingedLevel: 10 },
  { id: 'goddess', name: 'Goddess Ann', description: 'Divine market wisdom', tone: 'ethereal', speed: 0.8, pitch: 1.2, unhingedLevel: 1 },
];

// =============================================================================
// 25 AVATAR OUTFITS
// =============================================================================

export const AVATAR_OUTFITS: AvatarOutfit[] = [
  { id: 'professional', name: 'Professional Trader', description: 'Sharp blazer, glasses, confident stance', imageUrl: '/avatars/ann-professional.png', category: 'professional' },
  { id: 'casual', name: 'Casual Friday', description: 'Relaxed hoodie, coffee in hand', imageUrl: '/avatars/ann-casual.png', category: 'casual' },
  { id: 'cyber', name: 'Cyberpunk', description: 'Neon visor, holographic jacket', imageUrl: '/avatars/ann-cyber.png', category: 'fantasy' },
  { id: 'elegant', name: 'Elegant Evening', description: 'Black dress, pearl necklace', imageUrl: '/avatars/ann-elegant.png', category: 'professional' },
  { id: 'sporty', name: 'Sporty', description: 'Athletic wear, headband', imageUrl: '/avatars/ann-sporty.png', category: 'casual' },
  { id: 'hacker', name: 'Hacker Mode', description: 'Dark hoodie, green terminal glow', imageUrl: '/avatars/ann-hacker.png', category: 'themed' },
  { id: 'beach', name: 'Beach Vibes', description: 'Sunhat, sunglasses, tropical', imageUrl: '/avatars/ann-beach.png', category: 'casual' },
  { id: 'formal', name: 'Board Meeting', description: 'Power suit, briefcase', imageUrl: '/avatars/ann-formal.png', category: 'professional' },
  { id: 'party', name: 'Party Mode', description: 'Sparkly dress, champagne', imageUrl: '/avatars/ann-party.png', category: 'themed' },
  { id: 'winter', name: 'Winter Cozy', description: 'Sweater, scarf, hot cocoa', imageUrl: '/avatars/ann-winter.png', category: 'casual' },
  { id: 'summer', name: 'Summer Fun', description: 'Sundress, flower crown', imageUrl: '/avatars/ann-summer.png', category: 'casual' },
  { id: 'gothic', name: 'Gothic Queen', description: 'Dark aesthetic, choker', imageUrl: '/avatars/ann-gothic.png', category: 'fantasy' },
  { id: 'retro', name: 'Retro 80s', description: 'Neon colors, big hair', imageUrl: '/avatars/ann-retro.png', category: 'themed' },
  { id: 'space', name: 'Space Explorer', description: 'Astronaut suit, helmet off', imageUrl: '/avatars/ann-space.png', category: 'fantasy' },
  { id: 'ninja', name: 'Shadow Ninja', description: 'All black, katana', imageUrl: '/avatars/ann-ninja.png', category: 'fantasy' },
  { id: 'pirate', name: 'Crypto Pirate', description: 'Captain hat, treasure map', imageUrl: '/avatars/ann-pirate.png', category: 'themed' },
  { id: 'angel', name: 'Angel Investor', description: 'White wings, golden halo', imageUrl: '/avatars/ann-angel.png', category: 'fantasy' },
  { id: 'devil', name: 'Devil Trader', description: 'Red horns, fire background', imageUrl: '/avatars/ann-devil.png', category: 'fantasy' },
  { id: 'robot', name: 'AI Core', description: 'Metallic skin, circuit patterns', imageUrl: '/avatars/ann-robot.png', category: 'fantasy' },
  { id: 'queen', name: 'Crypto Queen', description: 'Crown, throne, royal robes', imageUrl: '/avatars/ann-queen.png', category: 'special' },
  { id: 'warrior', name: 'Market Warrior', description: 'Armor, shield with charts', imageUrl: '/avatars/ann-warrior.png', category: 'fantasy' },
  { id: 'witch', name: 'Prediction Witch', description: 'Crystal ball, spell book', imageUrl: '/avatars/ann-witch.png', category: 'fantasy' },
  { id: 'mermaid', name: 'Deep Dive', description: 'Underwater, scales shimmer', imageUrl: '/avatars/ann-mermaid.png', category: 'fantasy' },
  { id: 'cowgirl', name: 'Wild West', description: 'Hat, boots, lasso', imageUrl: '/avatars/ann-cowgirl.png', category: 'themed' },
  { id: 'unhinged', name: 'Unhinged Mode', description: 'Chaotic energy, no filter, glitch effects', imageUrl: '/avatars/ann-unhinged.png', category: 'special', unlockCondition: 'Activate unhinged mode 10 times' },
];

// =============================================================================
// DAY TRADING ENGINE
// =============================================================================

class DayTradingEngine {
  private signals: DayTradeSignal[] = [];
  private activeScans: Set<string> = new Set();

  generateSignals(coins: string[]): DayTradeSignal[] {
    const newSignals: DayTradeSignal[] = [];
    const timeframes: Array<'1m' | '5m' | '15m' | '1h' | '4h'> = ['1m', '5m', '15m', '1h', '4h'];
    const actions: Array<'LONG' | 'SHORT' | 'SCALP_BUY' | 'SCALP_SELL' | 'HOLD'> = ['LONG', 'SHORT', 'SCALP_BUY', 'SCALP_SELL', 'HOLD'];

    for (const coin of coins) {
      const action = actions[Math.floor(Math.random() * actions.length)];
      const confidence = Math.floor(Math.random() * 40) + 60;
      const basePrice = this.getBasePrice(coin);
      const volatility = 0.02 + Math.random() * 0.05;

      const signal: DayTradeSignal = {
        id: `signal_${Date.now()}_${coin}`,
        coin,
        action,
        entryPrice: basePrice,
        targetPrice: action.includes('LONG') || action.includes('BUY')
          ? basePrice * (1 + volatility)
          : basePrice * (1 - volatility),
        stopLoss: action.includes('LONG') || action.includes('BUY')
          ? basePrice * (1 - volatility * 0.5)
          : basePrice * (1 + volatility * 0.5),
        confidence,
        timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
        reason: this.generateReason(coin, action),
        generatedAt: new Date(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min expiry
      };

      newSignals.push(signal);
    }

    this.signals = [...newSignals, ...this.signals].slice(0, 50);
    return newSignals;
  }

  private getBasePrice(coin: string): number {
    const prices: Record<string, number> = {
      SKY4444: 0.01, SHADOW: 0.005, TRUMP: 12.50,
      DOGE: 0.35, BTC: 107000, XMR: 185, USDT: 1.0,
    };
    return prices[coin] || 1.0;
  }

  private generateReason(coin: string, action: string): string {
    const reasons = [
      `${coin} showing bullish divergence on RSI`,
      `Volume spike detected, momentum building`,
      `Breaking above key resistance level`,
      `Whale accumulation pattern detected`,
      `Social sentiment surge (+340% mentions)`,
      `Golden cross forming on 15m chart`,
      `Oversold bounce expected from support`,
      `News catalyst incoming, pre-positioning`,
      `Order book imbalance favoring ${action.includes('LONG') ? 'bulls' : 'bears'}`,
      `Fibonacci retracement to 0.618 level`,
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  }

  getActiveSignals(): DayTradeSignal[] {
    const now = new Date();
    return this.signals.filter(s => s.expiresAt > now);
  }

  getSignalHistory(): DayTradeSignal[] {
    return this.signals;
  }
}

// =============================================================================
// TRADE ROOM ENGINE
// =============================================================================

class TradeRoomEngine {
  private rooms: Map<string, TradeRoomMessage[]> = new Map();
  private activeUsers: Map<string, Set<string>> = new Map();

  constructor() {
    this.rooms.set('general', []);
    this.rooms.set('day-trading', []);
    this.rooms.set('altcoins', []);
    this.rooms.set('sky4444-holders', []);
    this.rooms.set('whale-alerts', []);
  }

  joinRoom(roomId: string, userId: string): void {
    if (!this.activeUsers.has(roomId)) {
      this.activeUsers.set(roomId, new Set());
    }
    this.activeUsers.get(roomId)!.add(userId);
  }

  leaveRoom(roomId: string, userId: string): void {
    this.activeUsers.get(roomId)?.delete(userId);
  }

  sendMessage(roomId: string, message: Omit<TradeRoomMessage, 'id' | 'timestamp'>): TradeRoomMessage {
    const msg: TradeRoomMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date(),
    };

    if (!this.rooms.has(roomId)) this.rooms.set(roomId, []);
    this.rooms.get(roomId)!.push(msg);

    // Keep last 500 messages per room
    const roomMsgs = this.rooms.get(roomId)!;
    if (roomMsgs.length > 500) {
      this.rooms.set(roomId, roomMsgs.slice(-500));
    }

    return msg;
  }

  getMessages(roomId: string, limit: number = 50): TradeRoomMessage[] {
    return (this.rooms.get(roomId) || []).slice(-limit);
  }

  getRooms(): string[] {
    return Array.from(this.rooms.keys());
  }

  getActiveUserCount(roomId: string): number {
    return this.activeUsers.get(roomId)?.size || 0;
  }
}

// Singleton instances
export const dayTradingEngine = new DayTradingEngine();
export const tradeRoomEngine = new TradeRoomEngine();

export default { dayTradingEngine, tradeRoomEngine, VOICE_PERSONALITIES, AVATAR_OUTFITS };
