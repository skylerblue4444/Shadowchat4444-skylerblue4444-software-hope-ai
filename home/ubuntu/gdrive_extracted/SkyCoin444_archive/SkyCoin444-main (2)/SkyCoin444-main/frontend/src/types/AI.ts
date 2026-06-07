export interface AIRankingScore {
  tipsWeight: number;
  engagementWeight: number;
  stakingBoost: number;
  timeDecay: number;
}

export interface AIChatResponse {
  message: string;
  confidence: number;
}