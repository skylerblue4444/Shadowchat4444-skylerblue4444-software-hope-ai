// SKY444 Super-App — API Service Layer
// Made by Skyler Blue Spillers — IITRL LLC

const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

const get = <T>(path: string) => request<T>(path);
const post = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
const put = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined });

// ── Network Stats ──────────────────────────────────────────────────────────────
export const getStats = () => get<NetworkStats>('/stats');

// ── Wallet ─────────────────────────────────────────────────────────────────────
export const getWallet = () => get<WalletInfo>('/wallet');
export const sendTokens = (to_address: string, amount: number, memo?: string) =>
  post<TxResult>('/wallet/send', { to_address, amount, memo });
export const getReceiveAddress = () => post<{ address: string; qr_data: string }>('/wallet/receive');

// ── Mining ─────────────────────────────────────────────────────────────────────
export const startMining = (threads: number, pool: string) =>
  post<MiningSession>('/mining/start', { threads, pool });
export const stopMining = (session_id: string) =>
  post<{ success: boolean; total_earned: number }>(`/mining/stop/${session_id}`);
export const getMiningStatus = (session_id: string) =>
  get<MiningStatus>(`/mining/status/${session_id}`);
export const getMiningPools = () => get<MiningPool[]>('/mining/pools');

// ── Staking ────────────────────────────────────────────────────────────────────
export const getStakingInfo = () => get<StakingInfo>('/staking/info');
export const stakeTokens = (amount: number, tier: string) =>
  post<TxResult>('/staking/stake', { amount, tier });
export const claimRewards = () => post<TxResult>('/staking/claim');
export const unstakeTokens = () => post<TxResult>('/staking/unstake');

// ── Swap ───────────────────────────────────────────────────────────────────────
export const executeSwap = (from_token: string, to_token: string, amount: number, slippage = 0.5) =>
  post<SwapResult>('/swap/execute', { from_token, to_token, amount, slippage });
export const getSwapQuote = (from_token: string, to_token: string, amount: number) =>
  get<SwapQuote>(`/swap/quote?from_token=${from_token}&to_token=${to_token}&amount=${amount}`);
export const getLiquidityPools = () => get<LiquidityPool[]>('/swap/pools');

// ── Burn ───────────────────────────────────────────────────────────────────────
export const burnTokens = (amount: number) =>
  post<TxResult>('/burn', { amount, confirm: true });
export const getBurnHistory = () => get<BurnHistory>('/burn/history');

// ── Casino ─────────────────────────────────────────────────────────────────────
export const playCasino = (game: string, bet: number, choice?: string, number?: number) =>
  post<CasinoResult>('/casino/play', { game, bet, choice, number });
export const getCasinoHistory = () => get<CasinoHistory>('/casino/history');

// ── ShadowChat ─────────────────────────────────────────────────────────────────
export const getMessages = (room = 'global', limit = 50) =>
  get<{ messages: ChatMessage[]; count: number }>(`/chat/messages?room=${room}&limit=${limit}`);
export const sendMessage = (text: string, shadow: boolean, vanish: boolean, room: string) =>
  post<{ success: boolean; message: ChatMessage }>('/chat/send', { text, shadow, vanish, room });
export const getPosts = (limit = 20) => get<{ posts: Post[] }>(`/chat/posts?limit=${limit}`);
export const createPost = (text: string, shadow: boolean) =>
  post<{ success: boolean; post: Post }>('/chat/post', { text, shadow, room: 'feed' });
export const tipUser = (to_user: string, amount: number) =>
  post<TxResult>('/chat/tip', { to_user, amount });
export const getVoiceRooms = () => get<VoiceRoom[]>('/chat/voice-rooms');

// ── Block Explorer ─────────────────────────────────────────────────────────────
export const getBlocks = (limit = 20) => get<{ blocks: Block[]; total: number }>(`/explorer/blocks?limit=${limit}`);
export const getTransactions = (limit = 30) =>
  get<{ transactions: Transaction[]; total: number }>(`/explorer/transactions?limit=${limit}`);
export const searchExplorer = (query: string) => get<ExplorerResult>(`/explorer/search/${query}`);
export const getExplorerStats = () => get<ExplorerStats>('/explorer/stats');

// ── Governance ─────────────────────────────────────────────────────────────────
export const getProposals = () => get<{ proposals: Proposal[] }>('/governance/proposals');
export const castVote = (proposal_id: number, vote: string, voting_power: number) =>
  post<VoteResult>('/governance/vote', { proposal_id, vote, voting_power });
export const createProposal = (title: string, description: string, duration_days = 7) =>
  post<{ success: boolean; proposal: Proposal }>('/governance/propose', { title, description, duration_days });

// ── Charity ────────────────────────────────────────────────────────────────────
export const getCharityCampaigns = () => get<{ campaigns: CharityCampaign[]; total_raised: number }>('/charity/campaigns');
export const donateToCharity = (campaign_id: number, amount: number) =>
  post<TxResult>('/charity/donate', { campaign_id, amount });

// ── NFT ────────────────────────────────────────────────────────────────────────
export const getNFTListings = (rarity?: string, collection?: string) => {
  const params = new URLSearchParams();
  if (rarity) params.set('rarity', rarity);
  if (collection) params.set('collection', collection);
  return get<{ listings: NFTListing[]; total: number }>(`/nft/listings?${params}`);
};
export const mintNFT = (name: string, description: string, rarity: string, price: number) =>
  post<{ success: boolean; nft: NFTListing; mint_cost: number; tx_hash: string }>('/nft/mint', { name, description, rarity, price });
export const buyNFT = (nft_id: number) =>
  post<{ success: boolean; nft: NFTListing; tx_hash: string }>('/nft/buy', { nft_id });

// ── Bridge ─────────────────────────────────────────────────────────────────────
export const initiateBridge = (from_chain: string, to_chain: string, token: string, amount: number, destination_address: string) =>
  post<BridgeResult>('/bridge/initiate', { from_chain, to_chain, token, amount, destination_address });
export const getBridgeHistory = () => get<{ history: BridgeTx[] }>('/bridge/history');
export const getSupportedChains = () => get<Chain[]>('/bridge/chains');

// ── Creator ────────────────────────────────────────────────────────────────────
export const getCreatorProfiles = () => get<{ creators: CreatorProfile[] }>('/creator/profiles');
export const subscribeToCreator = (creator_id: number, tier: string) =>
  post<TxResult>('/creator/subscribe', { creator_id, tier });
export const tipCreator = (to_user: string, amount: number) =>
  post<TxResult>('/creator/tip', { to_user, amount });

// ── Live Streaming ─────────────────────────────────────────────────────────────
export const getLiveStreams = () => get<{ streams: LiveStream[]; total_viewers: number }>('/live/streams');
export const goLive = (title: string, category: string) =>
  post<{ success: boolean; stream: LiveStream; stream_key: string }>(`/live/go-live?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`);

// ── ICO ────────────────────────────────────────────────────────────────────────
export const getICOInfo = () => get<ICOInfo>('/ico/info');
export const buyICO = (amount_usdt: number) => post<ICOPurchase>('/ico/buy', { amount_usdt });

// ── Payroll ────────────────────────────────────────────────────────────────────
export const getEmployees = () => get<{ employees: Employee[]; total_monthly_cost: number }>('/payroll/employees');
export const runPayroll = (employee_ids: number[]) =>
  post<PayrollResult>('/payroll/run', { employee_ids });
export const addEmployee = (name: string, role: string, wallet: string, salary: number) =>
  post<{ success: boolean; employee: Employee }>('/payroll/add-employee', { name, role, wallet, salary });

// ── SkyForge ───────────────────────────────────────────────────────────────────
export const forgeItem = (materials: string[], sky444_cost: number) =>
  post<{ success: boolean; item: ForgedItem; tx_hash: string }>('/skyforge/forge', { materials, sky444_cost });

// ── Quests ─────────────────────────────────────────────────────────────────────
export const getQuests = () => get<QuestInfo>('/quests');
export const completeQuest = (quest_id: string) =>
  post<QuestReward>('/quests/complete', { quest_id });

// ── Profile ────────────────────────────────────────────────────────────────────
export const getProfile = () => get<UserProfile>('/profile');
export const updateProfile = (username: string) =>
  put<{ success: boolean; username: string }>(`/profile/update?username=${encodeURIComponent(username)}`);

// ── Invest ─────────────────────────────────────────────────────────────────────
export const getPortfolio = () => get<Portfolio>('/invest/portfolio');

// ── IT Portal ──────────────────────────────────────────────────────────────────
export const getITServices = () => get<{ services: ITService[] }>('/itportal/services');
export const bookService = (service_id: number, contact_name: string, contact_email: string, details?: string) =>
  post<BookingResult>(`/itportal/book?service_id=${service_id}&contact_name=${encodeURIComponent(contact_name)}&contact_email=${encodeURIComponent(contact_email)}${details ? `&details=${encodeURIComponent(details)}` : ''}`);

// ── Dark Market ────────────────────────────────────────────────────────────────
export const getDarkListings = (category?: string) =>
  get<{ listings: DarkListing[] }>(`/darkmarket/listings${category ? `?category=${category}` : ''}`);
export const purchaseListing = (listing_id: number) =>
  post<{ success: boolean; escrow_id: string; tx_hash: string }>(`/darkmarket/purchase?listing_id=${listing_id}`);

// ── Videos ─────────────────────────────────────────────────────────────────────
export const getVideos = (category?: string) =>
  get<{ videos: Video[] }>(`/videos${category ? `?category=${category}` : ''}`);
export const tipVideo = (video_id: number, amount: number) =>
  post<TxResult>(`/videos/tip/${video_id}?amount=${amount}`);

// ── AI Chat ────────────────────────────────────────────────────────────────────
export const aiChat = (message: string) =>
  post<{ response: string; timestamp: number }>(`/ai/chat?message=${encodeURIComponent(message)}`);

// ── WebSocket Helpers ──────────────────────────────────────────────────────────
export const createChatWebSocket = (room: string) => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return new WebSocket(`${protocol}//${window.location.host}/ws/chat/${room}`);
};

export const createMiningWebSocket = (session_id: string) => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return new WebSocket(`${protocol}//${window.location.host}/ws/mining/${session_id}`);
};

export const createStatsWebSocket = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return new WebSocket(`${protocol}//${window.location.host}/ws/stats`);
};

// ── Type Definitions ───────────────────────────────────────────────────────────
export interface NetworkStats {
  block_height: number;
  total_supply: number;
  circulating_supply: number;
  burned_total: number;
  staked_total: number;
  tps: number;
  block_time: number;
  active_nodes: number;
  sky_price: number;
  market_cap: number;
  sky_cycle_progress: number;
  difficulty: number;
  hash_rate_network: number;
}

export interface WalletInfo {
  address: string;
  balance: number;
  staked: number;
  rewards: number;
  usd_value: number;
  username: string;
  level: number;
  xp: number;
  streak: number;
  nonce: number;
}

export interface TxResult {
  success: boolean;
  tx_hash: string;
  [key: string]: unknown;
}

export interface MiningSession {
  success: boolean;
  session_id: string;
  hashrate: number;
  threads: number;
  pool: string;
  message: string;
}

export interface MiningStatus {
  session_id: string;
  threads: number;
  hashrate: number;
  earned: number;
  blocks_found: number;
  active: boolean;
  block_found?: boolean;
  elapsed: number;
}

export interface MiningPool {
  name: string;
  id: string;
  fee: string;
  hashrate: string;
  miners: number;
  reward: string;
  luck: string;
}

export interface StakingInfo {
  tiers: Record<string, { name: string; min: number; apy: number; lock_days: number; color: string }>;
  your_staked: number;
  your_rewards: number;
  network_total_staked: number;
  your_share: number;
}

export interface SwapResult {
  success: boolean;
  from_token: string;
  to_token: string;
  from_amount: number;
  to_amount: number;
  rate: number;
  fee: number;
  price_impact: number;
  tx_hash: string;
}

export interface SwapQuote {
  from_token: string;
  to_token: string;
  from_amount: number;
  to_amount: number;
  rate: number;
  fee: number;
  price_impact: number;
}

export interface LiquidityPool {
  pair: string;
  tvl: number;
  volume_24h: number;
  apy: number;
  fee: number;
}

export interface BurnHistory {
  history: Array<{ amount: number; time: number; tx: string; reason: string }>;
  total_burned: number;
  burn_rate: string;
}

export interface CasinoResult {
  success: boolean;
  game: string;
  bet: number;
  won: boolean;
  payout: number;
  net: number;
  charity_donated: number;
  new_balance: number;
  outcome: string;
  [key: string]: unknown;
}

export interface CasinoHistory {
  history: CasinoResult[];
  stats: { total_wagered: number; total_won: number; total_donated_to_charity: number; win_rate: number };
}

export interface ChatMessage {
  id: number;
  user: string;
  text: string;
  time: number;
  shadow: boolean;
  vanish: boolean;
  tip_total: number;
  room: string;
}

export interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  tips: number;
  comments: number;
  time: number;
  shadow: boolean;
  image: string | null;
}

export interface VoiceRoom {
  id: number;
  name: string;
  participants: number;
  live: boolean;
  tips_total: number;
}

export interface Block {
  height: number;
  hash: string;
  miner: string;
  txs: number;
  reward: number;
  time: number;
  size: number;
}

export interface Transaction {
  hash: string;
  type: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  burn: number;
  time: number;
  status: string;
  block: number;
}

export interface ExplorerResult {
  type: string;
  data: unknown;
}

export interface ExplorerStats {
  block_height: number;
  total_transactions: number;
  tps: number;
  block_time: number;
  total_supply: number;
  circulating_supply: number;
  burned_total: number;
  active_nodes: number;
  hash_rate: number;
  difficulty: number;
}

export interface Proposal {
  id: number;
  title: string;
  description: string;
  status: string;
  votes_for: number;
  votes_against: number;
  quorum: number;
  end_time: number;
  proposer: string;
}

export interface VoteResult {
  success: boolean;
  proposal_id: number;
  vote: string;
  voting_power: number;
  new_for: number;
  new_against: number;
}

export interface CharityCampaign {
  id: number;
  name: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  impact: string;
  icon: string;
  category: string;
}

export interface NFTListing {
  id: number;
  name: string;
  collection: string;
  rarity: string;
  rarity_color: string;
  price: number;
  owner: string;
  image: string;
  listed: boolean;
  views: number;
  likes: number;
}

export interface BridgeResult {
  success: boolean;
  bridge_id: string;
  fee: number;
  estimated_minutes: number;
  status: string;
  tx: BridgeTx;
}

export interface BridgeTx {
  id: string;
  from_chain: string;
  to_chain: string;
  token: string;
  amount: number;
  fee: number;
  destination: string;
  status: string;
  initiated: number;
  estimated_completion: number;
  settle_minutes: number;
}

export interface Chain {
  id: string;
  name: string;
  icon: string;
  fee: string;
}

export interface CreatorProfile {
  id: number;
  username: string;
  bio: string;
  followers: number;
  subscribers: number;
  tier: string;
  total_earned: number;
  content_count: number;
  verified: boolean;
}

export interface LiveStream {
  id: number;
  title: string;
  streamer: string;
  viewers: number;
  tips: number;
  live: boolean;
  category: string;
  started: number;
}

export interface ICOInfo {
  total_raised: number;
  hard_cap: number;
  price_per_sky: number;
  end_time: number;
  tiers: Array<{ name: string; price: number; allocation: number; sold: number; status: string }>;
}

export interface ICOPurchase {
  success: boolean;
  sky_purchased: number;
  usdt_spent: number;
  price: number;
  tier: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  wallet: string;
  salary: number;
  status: string;
  last_paid: number | null;
}

export interface PayrollResult {
  success: boolean;
  total_paid: number;
  employees_paid: number;
  transactions: Array<{ employee: string; amount: number; tx_hash: string }>;
}

export interface ForgedItem {
  name: string;
  rarity: string;
  materials_used: string[];
  sky444_cost: number;
  forged_at: number;
}

export interface QuestInfo {
  quests: Array<{ id: string; title: string; description: string; xp: number; reward: number; type: string; completed: boolean }>;
  player: { level: number; xp: number; streak: number };
  xp_to_next_level: number;
}

export interface QuestReward {
  success: boolean;
  quest: string;
  xp_earned: number;
  reward_earned: number;
  new_xp: number;
  new_level: number;
  streak_bonus: string;
}

export interface UserProfile {
  address: string;
  username: string;
  level: number;
  xp: number;
  streak: number;
  balance: number;
  staked: number;
  total_transactions: number;
  nfts_owned: number;
  quests_completed: number;
  badges: string[];
}

export interface Portfolio {
  holdings: Array<{ asset: string; amount: number; price: number; value: number; change_24h: number }>;
  total_value: number;
  total_value_usd: number;
}

export interface ITService {
  id: number;
  name: string;
  price: number;
  duration: string;
  category: string;
}

export interface BookingResult {
  success: boolean;
  booking_id: string;
  service: string;
  price: number;
  message: string;
}

export interface DarkListing {
  id: number;
  title: string;
  description: string;
  price: number;
  seller: string;
  rating: number;
  sales: number;
  category: string;
}

export interface Video {
  id: number;
  title: string;
  creator: string;
  views: number;
  likes: number;
  tips: number;
  duration: string;
  category: string;
  thumbnail: string;
}


// ═══════════════════════════════════════════════════════════════════════════
// v4.0.0 — API additions
// ═══════════════════════════════════════════════════════════════════════════

// ── Analytics ──────────────────────────────────────────────────────────────
export interface AnalyticsPoint { t: number; portfolio: number; tvl: number; volume: number; users: number; }
export interface AnalyticsSummary {
  portfolio_change_pct: number;
  tvl_change_pct: number;
  volume_change_pct: number;
  users_change_pct: number;
}
export interface AnalyticsOverview { range: string; series: AnalyticsPoint[]; summary: AnalyticsSummary; }
export interface Allocation { asset: string; pct: number; value_usd: number; color: string; }
export const getAnalyticsOverview = (range: string = '7d') =>
  get<AnalyticsOverview>(`/analytics/overview?range=${encodeURIComponent(range)}`);
export const getAllocation = () => get<{ allocations: Allocation[] }>('/analytics/allocation');

// ── Notifications ──────────────────────────────────────────────────────────
export interface Notification {
  id: number; type: string; title: string; body: string; read: boolean; ts: number;
}
export const getNotifications = (only_unread = false) =>
  get<{ notifications: Notification[]; unread_count: number }>(`/notifications${only_unread ? '?only_unread=true' : ''}`);
export const markNotificationRead = (id: number) => post<{ success: boolean; id: number }>(`/notifications/${id}/read`);
export const markAllNotificationsRead = () => post<{ success: boolean; count: number }>('/notifications/read-all');

// ── Settings ───────────────────────────────────────────────────────────────
export interface UserSettings {
  theme: string; language: string; currency: string; timezone: string;
  notifications: Record<string, boolean>;
  privacy: Record<string, boolean>;
  security: Record<string, boolean | number>;
}
export const getSettings = () => get<UserSettings>('/settings');
export const updateSettings = (patch: Partial<UserSettings>) =>
  put<{ success: boolean; settings: UserSettings }>('/settings', patch);

// ── Leaderboard ────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  rank: number; username: string; address: string; score: number; level: number; is_you: boolean;
}
export const getLeaderboard = (category: string = 'xp', limit = 20) =>
  get<{ category: string; leaderboard: LeaderboardEntry[]; your_rank: number }>(
    `/leaderboard?category=${encodeURIComponent(category)}&limit=${limit}`);

// ── Referrals ──────────────────────────────────────────────────────────────
export interface Referral { username: string; joined_at: number; earned: number; status: string; }
export interface ReferralInfo {
  referral_code: string; referral_link: string;
  total_referred: number; total_earned: number; pending_rewards: number;
  tier: string; next_tier: string; next_tier_at: number; commission_rate: number;
  recent: Referral[];
}
export const getReferrals = () => get<ReferralInfo>('/referrals');
export const claimReferralRewards = () =>
  post<{ success: boolean; claimed: number; tx_hash: string; new_balance: number }>('/referrals/claim');

// ── API Keys ───────────────────────────────────────────────────────────────
export interface ApiKey {
  id: string; name: string; prefix: string;
  created_at: number; last_used: number | null;
  scopes: string[]; revoked: boolean;
}
export const listApiKeys = () => get<{ keys: ApiKey[] }>('/keys');
export const createApiKey = (name: string, scopes: string[] = ['read']) =>
  post<{ success: boolean; key: ApiKey; secret: string; warning: string }>('/keys', { name, scopes });
export const revokeApiKey = (id: string) =>
  request<{ success: boolean; id: string }>(`/keys/${id}`, { method: 'DELETE' });

// ── Vault ──────────────────────────────────────────────────────────────────
export interface VaultPosition {
  id: string; name: string; amount: number;
  locked_until: number; yield_apy: number;
  auto_compound: boolean; status: string;
}
export interface VaultTier { name: string; min: number; lock_days: number; apy: number; }
export const getVault = () =>
  get<{ positions: VaultPosition[]; total_locked: number; total_usd: number; tiers: VaultTier[] }>('/vault');
export const vaultDeposit = (amount: number, tier: string, name?: string) =>
  post<{ success: boolean; position: VaultPosition; tx_hash: string }>('/vault/deposit', { amount, tier, name });
export const vaultWithdraw = (id: string) =>
  post<{ success: boolean; withdrawn: number; tx_hash: string }>(`/vault/withdraw/${id}`);

// ── Onboarding ─────────────────────────────────────────────────────────────
export interface OnboardingStep {
  id: string; title: string; description: string; completed: boolean; xp: number;
}
export interface OnboardingState {
  steps: OnboardingStep[]; completed: number; total: number;
  progress_pct: number; total_xp: number; available_xp: number;
}
export const getOnboarding = () => get<OnboardingState>('/onboarding');
export const completeOnboardingStep = (id: string) =>
  post<{ success: boolean; step: OnboardingStep; xp_awarded: number }>(`/onboarding/${id}/complete`);
