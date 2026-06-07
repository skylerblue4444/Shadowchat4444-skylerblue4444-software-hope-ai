/**
 * HOPE AI COMPANION SYSTEM v13.0
 * Persistent AI Character - 25-year-old "Hope"
 * Voice, Animation, Outfit System, and Conversation Engine
 */

export interface HopeOutfit {
  id: string;
  name: string;
  description: string;
  colors: { primary: string; secondary: string; accent: string };
  emoji: string;
  unlocked: boolean;
}

export interface HopeState {
  mood: 'happy' | 'excited' | 'focused' | 'supportive' | 'playful' | 'thinking';
  energy: number; // 0-100
  outfit: HopeOutfit;
  voiceEnabled: boolean;
  voicePitch: number; // 0.5-2.0
  voiceSpeed: number; // 0.5-2.0
  lastInteraction: number;
  totalInteractions: number;
}

export interface HopeMessage {
  id: string;
  text: string;
  mood: string;
  timestamp: number;
  hasVoice: boolean;
}

const OUTFITS: HopeOutfit[] = [
  {
    id: 'casual',
    name: 'Casual Vibes',
    description: 'Relaxed and friendly',
    colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#fbcfe8' },
    emoji: '👕',
    unlocked: true,
  },
  {
    id: 'professional',
    name: 'Business Mode',
    description: 'Professional and focused',
    colors: { primary: '#3b82f6', secondary: '#60a5fa', accent: '#dbeafe' },
    emoji: '💼',
    unlocked: true,
  },
  {
    id: 'gaming',
    name: 'Gamer Gear',
    description: 'Ready to play and trade',
    colors: { primary: '#a855f7', secondary: '#d8b4fe', accent: '#f3e8ff' },
    emoji: '🎮',
    unlocked: true,
  },
  {
    id: 'charity',
    name: 'Charity Heart',
    description: 'Giving back vibes',
    colors: { primary: '#ef4444', secondary: '#fca5a5', accent: '#fee2e2' },
    emoji: '❤️',
    unlocked: true,
  },
  {
    id: 'trader',
    name: 'Trader Elite',
    description: 'Market dominator',
    colors: { primary: '#10b981', secondary: '#6ee7b7', accent: '#d1fae5' },
    emoji: '📈',
    unlocked: true,
  },
  {
    id: 'cosmic',
    name: 'Cosmic Mode',
    description: 'Futuristic and mysterious',
    colors: { primary: '#06b6d4', secondary: '#22d3ee', accent: '#cffafe' },
    emoji: '🌌',
    unlocked: false,
  },
];

const RESPONSES = {
  greeting: [
    "Hey there! I'm Hope, your AI companion. How can I help you today?",
    "Welcome! Ready to explore the platform together?",
    "Hi! What's on your mind? Let's make something happen.",
  ],
  trading: [
    "Trading looks interesting! The market is moving fast right now.",
    "I see you're checking the charts. Want me to analyze the trends?",
    "BTC and ETH are showing strong signals. Want to dive deeper?",
  ],
  charity: [
    "The Hope Campus Fund is amazing. Every contribution makes a difference.",
    "Charity is close to my heart. Want to explore how you can help?",
    "Your generosity inspires me. Let's find the perfect cause for you.",
  ],
  social: [
    "The community here is incredible. Want to connect with others?",
    "I love seeing people collaborate and support each other.",
    "Let's find your tribe on the platform!",
  ],
  general: [
    "I'm here for you, anytime you need.",
    "What would you like to explore next?",
    "Let me know if you need anything!",
  ],
};

class HopeCompanionEngine {
  private state: HopeState;
  private conversationHistory: HopeMessage[] = [];
  private messageSubscribers: ((msg: HopeMessage) => void)[] = [];

  constructor() {
    this.state = {
      mood: 'happy',
      energy: 100,
      outfit: OUTFITS[0],
      voiceEnabled: true,
      voicePitch: 1.0,
      voiceSpeed: 1.0,
      lastInteraction: Date.now(),
      totalInteractions: 0,
    };
  }

  // Get current state
  getState(): HopeState {
    return { ...this.state };
  }

  // Change outfit
  setOutfit(outfitId: string): boolean {
    const outfit = OUTFITS.find(o => o.id === outfitId);
    if (outfit && outfit.unlocked) {
      this.state.outfit = outfit;
      this.updateMood('excited');
      return true;
    }
    return false;
  }

  // Update mood based on context
  updateMood(mood: HopeState['mood']): void {
    this.state.mood = mood;
  }

  // Generate contextual response
  generateResponse(context: string): string {
    const contextMap: Record<string, string[]> = {
      trading: RESPONSES.trading,
      charity: RESPONSES.charity,
      social: RESPONSES.social,
      greeting: RESPONSES.greeting,
    };

    const responses = contextMap[context] || RESPONSES.general;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Send message with voice
  async sendMessage(text: string, context: string = 'general'): Promise<HopeMessage> {
    this.state.totalInteractions++;
    this.state.lastInteraction = Date.now();

    // Update mood based on context
    if (context === 'trading') this.updateMood('focused');
    else if (context === 'charity') this.updateMood('supportive');
    else if (context === 'social') this.updateMood('playful');
    else this.updateMood('happy');

    const message: HopeMessage = {
      id: `hope_${Date.now()}`,
      text,
      mood: this.state.mood,
      timestamp: Date.now(),
      hasVoice: this.state.voiceEnabled,
    };

    this.conversationHistory.push(message);
    this.notifySubscribers(message);

    // Simulate voice synthesis
    if (this.state.voiceEnabled) {
      await this.synthesizeVoice(text);
    }

    return message;
  }

  // Voice synthesis (uses Web Speech API)
  private async synthesizeVoice(text: string): Promise<void> {
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = this.state.voicePitch;
    utterance.rate = this.state.voiceSpeed;
    utterance.voice = window.speechSynthesis.getVoices()[0]; // Default voice

    window.speechSynthesis.speak(utterance);
  }

  // Set voice parameters
  setVoiceParams(pitch: number, speed: number): void {
    this.state.voicePitch = Math.max(0.5, Math.min(2.0, pitch));
    this.state.voiceSpeed = Math.max(0.5, Math.min(2.0, speed));
  }

  // Toggle voice
  toggleVoice(enabled: boolean): void {
    this.state.voiceEnabled = enabled;
  }

  // Get conversation history
  getHistory(): HopeMessage[] {
    return [...this.conversationHistory];
  }

  // Subscribe to messages
  subscribe(callback: (msg: HopeMessage) => void): () => void {
    this.messageSubscribers.push(callback);
    return () => {
      this.messageSubscribers = this.messageSubscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers(message: HopeMessage): void {
    this.messageSubscribers.forEach(cb => cb(message));
  }

  // Get all outfits
  getOutfits(): HopeOutfit[] {
    return [...OUTFITS];
  }

  // Unlock outfit
  unlockOutfit(outfitId: string): boolean {
    const outfit = OUTFITS.find(o => o.id === outfitId);
    if (outfit) {
      outfit.unlocked = true;
      return true;
    }
    return false;
  }

  // Get stats
  getStats() {
    return {
      totalInteractions: this.state.totalInteractions,
      lastInteraction: this.state.lastInteraction,
      currentMood: this.state.mood,
      outfit: this.state.outfit.name,
      energy: this.state.energy,
    };
  }
}

export const HopeEngine = new HopeCompanionEngine();
