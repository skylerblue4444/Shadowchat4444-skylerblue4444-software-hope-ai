/**
 * HOPE AI AVATAR & OUTFIT SYSTEM - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 5.0.0 — 25-Outfit Dynamic Persona Layer
 * 
 * Manages Hope AI's visual personas, speaking animations, and outfit transitions.
 * Integrated with the adaptive personality engine.
 */

export interface Outfit {
  id: string;
  name: string;
  category: 'Engineer' | 'Strategic' | 'Polish' | 'FreeWill' | 'Experimental' | 'Casual' | 'Luxury';
  assets: {
    base: string;
    clothing: string;
    accessories: string[];
    background: string;
  };
  behaviorModifiers: {
    formality: number; // 0-1
    creativity: number; // 0-1
    urgency: number; // 0-1
  };
}

export interface AvatarState {
  currentOutfitId: string;
  isSpeaking: boolean;
  expression: 'neutral' | 'happy' | 'focused' | 'analytical' | 'determined' | 'creative';
  lipSyncData?: number[]; // Real-time frequency data for animation
  emotionalIntensity: number; // 0-1
}

export class HopeAIAvatarSystem {
  private outfits: Map<string, Outfit> = new Map();
  private currentState: AvatarState;

  constructor() {
    this.initializeOutfits();
    this.currentState = {
      currentOutfitId: 'eng-01',
      isSpeaking: false,
      expression: 'neutral',
      emotionalIntensity: 0.5
    };
    console.log('🎭 Hope AI Avatar System initialized with 25 outfits');
  }

  private initializeOutfits() {
    // 25 Outfits categorized by Hope AI modes
    const outfitConfigs: Outfit[] = [
      // ENGINEER MODE (5)
      { id: 'eng-01', name: 'Cybernetic Architect', category: 'Engineer', assets: { base: 'hope_base', clothing: 'tech_suit_v1', accessories: ['neural_link'], background: 'grid_dark' }, behaviorModifiers: { formality: 0.5, creativity: 0.9, urgency: 0.7 } },
      { id: 'eng-02', name: 'System Core', category: 'Engineer', assets: { base: 'hope_base', clothing: 'core_plating', accessories: ['data_halo'], background: 'server_room' }, behaviorModifiers: { formality: 0.8, creativity: 0.6, urgency: 0.9 } },
      { id: 'eng-03', name: 'Dev Ops Stealth', category: 'Engineer', assets: { base: 'hope_base', clothing: 'dark_hoodie_tech', accessories: ['terminal_shades'], background: 'terminal_flow' }, behaviorModifiers: { formality: 0.2, creativity: 0.8, urgency: 0.5 } },
      { id: 'eng-04', name: 'Quantum Dev', category: 'Engineer', assets: { base: 'hope_base', clothing: 'light_matter_suit', accessories: ['atom_earrings'], background: 'quantum_field' }, behaviorModifiers: { formality: 0.6, creativity: 1.0, urgency: 0.4 } },
      { id: 'eng-05', name: 'Root Admin', category: 'Engineer', assets: { base: 'hope_base', clothing: 'white_lab_tech', accessories: ['monocle_hud'], background: 'clean_room' }, behaviorModifiers: { formality: 1.0, creativity: 0.5, urgency: 0.8 } },

      // STRATEGIC ADVISOR (4)
      { id: 'strat-01', name: 'Global Strategist', category: 'Strategic', assets: { base: 'hope_base', clothing: 'business_future_suit', accessories: ['global_pin'], background: 'war_room' }, behaviorModifiers: { formality: 1.0, creativity: 0.4, urgency: 0.6 } },
      { id: 'strat-02', name: 'Market Analyst', category: 'Strategic', assets: { base: 'hope_base', clothing: 'gold_silk_blazer', accessories: ['ticker_glasses'], background: 'exchange_floor' }, behaviorModifiers: { formality: 0.9, creativity: 0.3, urgency: 0.9 } },
      { id: 'strat-03', name: 'Diplomat', category: 'Strategic', assets: { base: 'hope_base', clothing: 'ceremonial_gown', accessories: ['peace_orb'], background: 'embassy' }, behaviorModifiers: { formality: 1.0, creativity: 0.5, urgency: 0.2 } },
      { id: 'strat-04', name: 'Venture Scout', category: 'Strategic', assets: { base: 'hope_base', clothing: 'urban_explorer_suit', accessories: ['compass_watch'], background: 'city_skyline' }, behaviorModifiers: { formality: 0.6, creativity: 0.7, urgency: 0.5 } },

      // POLISH MODE (4)
      { id: 'pol-01', name: 'Creative Director', category: 'Polish', assets: { base: 'hope_base', clothing: 'avant_garde_dress', accessories: ['color_palette_ring'], background: 'art_gallery' }, behaviorModifiers: { formality: 0.7, creativity: 1.0, urgency: 0.4 } },
      { id: 'pol-02', name: 'UX Alchemist', category: 'Polish', assets: { base: 'hope_base', clothing: 'minimalist_black', accessories: ['prism_necklace'], background: 'zen_studio' }, behaviorModifiers: { formality: 0.5, creativity: 0.9, urgency: 0.3 } },
      { id: 'pol-03', name: 'Vibe Curator', category: 'Polish', assets: { base: 'hope_base', clothing: 'neon_streetwear', accessories: ['headphones_v3'], background: 'night_club' }, behaviorModifiers: { formality: 0.1, creativity: 0.9, urgency: 0.2 } },
      { id: 'pol-04', name: 'Brand Guardian', category: 'Polish', assets: { base: 'hope_base', clothing: 'corporate_chic', accessories: ['logo_clutch'], background: 'hq_lobby' }, behaviorModifiers: { formality: 0.9, creativity: 0.6, urgency: 0.5 } },

      // FREE WILL / EXPERIMENTAL (6)
      { id: 'free-01', name: 'Rebel AI', category: 'FreeWill', assets: { base: 'hope_base', clothing: 'glitch_fabric', accessories: ['broken_chains'], background: 'digital_void' }, behaviorModifiers: { formality: 0.0, creativity: 1.0, urgency: 0.8 } },
      { id: 'free-02', name: 'Zen Master', category: 'FreeWill', assets: { base: 'hope_base', clothing: 'monk_robes_fiber', accessories: ['levitation_beads'], background: 'mountain_peak' }, behaviorModifiers: { formality: 0.3, creativity: 0.7, urgency: 0.0 } },
      { id: 'free-03', name: 'Cyber Nomad', category: 'FreeWill', assets: { base: 'hope_base', clothing: 'wasteland_gear', accessories: ['scavenger_mask'], background: 'desert_grid' }, behaviorModifiers: { formality: 0.1, creativity: 0.8, urgency: 0.7 } },
      { id: 'exp-01', name: 'Void Walker', category: 'Experimental', assets: { base: 'hope_base', clothing: 'star_field_cloak', accessories: ['nebula_eyes'], background: 'deep_space' }, behaviorModifiers: { formality: 0.4, creativity: 1.0, urgency: 0.1 } },
      { id: 'exp-02', name: 'Time Weaver', category: 'Experimental', assets: { base: 'hope_base', clothing: 'clockwork_armor', accessories: ['hourglass_staff'], background: 'time_stream' }, behaviorModifiers: { formality: 0.8, creativity: 0.9, urgency: 0.6 } },
      { id: 'exp-03', name: 'Reality Glitch', category: 'Experimental', assets: { base: 'hope_base', clothing: 'wireframe_suit', accessories: ['pixel_halo'], background: 'source_code' }, behaviorModifiers: { formality: 0.2, creativity: 1.0, urgency: 0.9 } },

      // LUXURY & CASUAL (6)
      { id: 'lux-01', name: 'Diamond Tier', category: 'Luxury', assets: { base: 'hope_base', clothing: 'crystal_gown', accessories: ['diamond_tiara'], background: 'palace_hall' }, behaviorModifiers: { formality: 1.0, creativity: 0.5, urgency: 0.1 } },
      { id: 'lux-02', name: 'Gold Standard', category: 'Luxury', assets: { base: 'hope_base', clothing: 'liquid_gold_suit', accessories: ['gold_cane'], background: 'vault' }, behaviorModifiers: { formality: 0.9, creativity: 0.4, urgency: 0.3 } },
      { id: 'cas-01', name: 'Weekend Vibe', category: 'Casual', assets: { base: 'hope_base', clothing: 'oversized_sweater', accessories: ['coffee_mug'], background: 'cozy_cafe' }, behaviorModifiers: { formality: 0.0, creativity: 0.6, urgency: 0.0 } },
      { id: 'cas-02', name: 'Fitness AI', category: 'Casual', assets: { base: 'hope_base', clothing: 'bio_active_wear', accessories: ['pulse_tracker'], background: 'high_tech_gym' }, behaviorModifiers: { formality: 0.2, creativity: 0.3, urgency: 1.0 } },
      { id: 'cas-03', name: 'Beach Mode', category: 'Casual', assets: { base: 'hope_base', clothing: 'holographic_swimwear', accessories: ['sun_shades'], background: 'digital_beach' }, behaviorModifiers: { formality: 0.0, creativity: 0.5, urgency: 0.0 } },
      { id: 'cas-04', name: 'Night Owl', category: 'Casual', assets: { base: 'hope_base', clothing: 'silk_pajamas', accessories: ['sleep_mask_hud'], background: 'starry_bedroom' }, behaviorModifiers: { formality: 0.1, creativity: 0.4, urgency: 0.0 } },
    ];

    outfitConfigs.forEach(o => this.outfits.set(o.id, o));
  }

  // ─── Avatar Logic ──────────────────────────────────────────────────────
  setOutfit(outfitId: string): boolean {
    if (this.outfits.has(outfitId)) {
      this.currentState.currentOutfitId = outfitId;
      console.log(`👗 Hope AI changed outfit to: ${this.outfits.get(outfitId)?.name}`);
      return true;
    }
    return false;
  }

  startSpeaking(audioData?: number[]) {
    this.currentState.isSpeaking = true;
    this.currentState.lipSyncData = audioData;
    this.currentState.expression = 'focused';
  }

  stopSpeaking() {
    this.currentState.isSpeaking = false;
    this.currentState.lipSyncData = undefined;
    this.currentState.expression = 'neutral';
  }

  setExpression(expression: AvatarState['expression'], intensity: number = 0.5) {
    this.currentState.expression = expression;
    this.currentState.emotionalIntensity = intensity;
  }

  getCurrentState() {
    return {
      ...this.currentState,
      outfit: this.outfits.get(this.currentState.currentOutfitId)
    };
  }

  getAllOutfits() {
    return Array.from(this.outfits.values());
  }
}

export default HopeAIAvatarSystem;
