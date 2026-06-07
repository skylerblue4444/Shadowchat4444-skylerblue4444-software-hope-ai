/**
 * Live API Routes - Profile, Feed, Mining, Staking, Trading, Seeds
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Always-on live endpoints
 */

import { Router, Request, Response } from 'express';
import {
  profileEngine, feedEngine, liveMiningEngine, liveStakingEngine,
  liveTradingEngine, liveAnalyticsEngine, seedDatabaseEngine, startLiveEngines
} from '../services/profile-feed-engine';

const router = Router();

// Start live engines on import
startLiveEngines();

// =============================================================================
// PROFILE
// =============================================================================

router.post('/profile/create', (req: Request, res: Response) => {
  try {
    const { userId, username, email, referralCode } = req.body;
    const profile = profileEngine.createProfile(userId, username, email, referralCode);
    res.json({ success: true, profile });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/profile/:userId', (req: Request, res: Response) => {
  const profile = profileEngine.getProfile(req.params.userId);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json({ profile });
});

router.put('/profile/:userId', (req: Request, res: Response) => {
  try {
    const profile = profileEngine.updateProfile(req.params.userId, req.body);
    res.json({ success: true, profile });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/profile/:userId/balance', (req: Request, res: Response) => {
  const profile = profileEngine.getProfile(req.params.userId);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json({ balances: profile.balances });
});

router.post('/profile/:userId/balance', (req: Request, res: Response) => {
  try {
    const { coin, amount } = req.body;
    const newBalance = profileEngine.updateBalance(req.params.userId, coin, amount);
    res.json({ success: true, coin, newBalance });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/profile/:userId/follow/:targetId', (req: Request, res: Response) => {
  profileEngine.follow(req.params.userId, req.params.targetId);
  res.json({ success: true });
});

router.get('/profile/leaderboard/:sortBy', (req: Request, res: Response) => {
  const leaderboard = profileEngine.getLeaderboard(req.params.sortBy as any);
  res.json({ leaderboard });
});

router.get('/profile/search/:query', (req: Request, res: Response) => {
  const users = profileEngine.searchUsers(req.params.query);
  res.json({ users });
});

// =============================================================================
// FEED
// =============================================================================

router.post('/feed/post', (req: Request, res: Response) => {
  const { userId, username, avatar, content, type, mediaUrls, coinMention, isNSFW, isPremium, price, tags, visibility } = req.body;
  const post = feedEngine.createPost(userId, username, avatar || '/avatars/default.png', { content, type, mediaUrls, coinMention, isNSFW, isPremium, price, tags, visibility });
  res.json({ success: true, post });
});

router.get('/feed', (req: Request, res: Response) => {
  const { userId, includeNSFW, premiumOnly, type, page, limit } = req.query;
  const feed = feedEngine.getFeed({
    userId: userId as string,
    includeNSFW: includeNSFW === 'true',
    premiumOnly: premiumOnly === 'true',
    type: type as string,
    page: parseInt(page as string) || 1,
    limit: parseInt(limit as string) || 25,
  });
  res.json({ feed });
});

router.get('/feed/trending', (_req: Request, res: Response) => {
  res.json({ trending: feedEngine.getTrending() });
});

router.post('/feed/:postId/like', (req: Request, res: Response) => {
  const likes = feedEngine.likePost(req.params.postId);
  res.json({ success: true, likes });
});

router.post('/feed/:postId/tip', (req: Request, res: Response) => {
  const { amount, coin } = req.body;
  feedEngine.tipPost(req.params.postId, amount, coin || 'SKY4444');
  res.json({ success: true });
});

router.post('/feed/:postId/comment', (req: Request, res: Response) => {
  const { userId, username, content } = req.body;
  const comment = feedEngine.addComment(req.params.postId, userId, username, content);
  res.json({ success: true, comment });
});

router.get('/feed/:postId/comments', (req: Request, res: Response) => {
  const comments = feedEngine.getComments(req.params.postId);
  res.json({ comments });
});

// =============================================================================
// MINING (LIVE)
// =============================================================================

router.post('/mining/start', (req: Request, res: Response) => {
  try {
    const { userId, coin } = req.body;
    const session = liveMiningEngine.startMining(userId, coin || 'SKY4444');
    res.json({ success: true, session });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/mining/stop', (req: Request, res: Response) => {
  try {
    const { userId, coin } = req.body;
    const session = liveMiningEngine.stopMining(userId, coin || 'SKY4444');
    res.json({ success: true, session });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/mining/:userId', (req: Request, res: Response) => {
  const sessions = liveMiningEngine.getUserSessions(req.params.userId);
  res.json({ sessions });
});

router.get('/mining/network/stats', (_req: Request, res: Response) => {
  const stats = liveMiningEngine.getNetworkStats();
  res.json({ stats });
});

// =============================================================================
// STAKING (LIVE)
// =============================================================================

router.post('/staking/stake', (req: Request, res: Response) => {
  try {
    const { userId, coin, amount, poolId, autoCompound } = req.body;
    const position = liveStakingEngine.stake(userId, coin || 'SKY4444', amount, poolId, autoCompound);
    res.json({ success: true, position });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/staking/unstake', (req: Request, res: Response) => {
  try {
    const { positionId } = req.body;
    const position = liveStakingEngine.unstake(positionId);
    res.json({ success: true, position });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/staking/:userId', (req: Request, res: Response) => {
  const positions = liveStakingEngine.getUserPositions(req.params.userId);
  res.json({ positions });
});

router.get('/staking/pools/all', (_req: Request, res: Response) => {
  const pools = liveStakingEngine.getPools();
  const totalStaked = liveStakingEngine.getTotalStaked();
  res.json({ pools, totalStaked });
});

// =============================================================================
// TRADING (LIVE)
// =============================================================================

router.post('/trade/order', (req: Request, res: Response) => {
  try {
    const { userId, pair, side, type, amount, price } = req.body;
    const order = liveTradingEngine.placeOrder(userId, pair, side, type || 'market', amount, price);
    res.json({ success: true, order });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/trade/cancel', (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const order = liveTradingEngine.cancelOrder(orderId);
    res.json({ success: true, order });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/trade/prices', (_req: Request, res: Response) => {
  const prices = liveTradingEngine.getAllPrices();
  res.json({ prices });
});

router.get('/trade/price/:pair', (req: Request, res: Response) => {
  const price = liveTradingEngine.getPrice(req.params.pair.replace('-', '/'));
  res.json({ pair: req.params.pair, price });
});

router.get('/trade/orderbook/:pair', (req: Request, res: Response) => {
  const orderBook = liveTradingEngine.getOrderBook(req.params.pair.replace('-', '/'));
  res.json(orderBook);
});

router.get('/trade/history/:pair?', (req: Request, res: Response) => {
  const pair = req.params.pair?.replace('-', '/');
  const history = liveTradingEngine.getTradeHistory(pair);
  res.json({ history });
});

router.get('/trade/orders/:userId', (req: Request, res: Response) => {
  const orders = liveTradingEngine.getUserOrders(req.params.userId);
  res.json({ orders });
});

// =============================================================================
// SEEDS
// =============================================================================

router.get('/seeds', (req: Request, res: Response) => {
  const { type } = req.query;
  const seeds = seedDatabaseEngine.getAll(type as string);
  res.json({ seeds });
});

router.get('/seeds/search/:query', (req: Request, res: Response) => {
  const seeds = seedDatabaseEngine.search(req.params.query);
  res.json({ seeds });
});

router.get('/seeds/top-rated', (_req: Request, res: Response) => {
  const seeds = seedDatabaseEngine.getTopRated();
  res.json({ seeds });
});

router.get('/seeds/:id', (req: Request, res: Response) => {
  const seed = seedDatabaseEngine.getById(req.params.id);
  if (!seed) return res.status(404).json({ error: 'Seed not found' });
  res.json({ seed });
});

router.get('/seeds/difficulty/:level', (req: Request, res: Response) => {
  const seeds = seedDatabaseEngine.getByDifficulty(req.params.level);
  res.json({ seeds });
});

// =============================================================================
// ANALYTICS
// =============================================================================

router.get('/analytics/latest', (_req: Request, res: Response) => {
  const latest = liveAnalyticsEngine.getLatest();
  res.json({ analytics: latest });
});

router.get('/analytics/history', (req: Request, res: Response) => {
  const { hours } = req.query;
  const history = liveAnalyticsEngine.getHistory(parseInt(hours as string) || 24);
  res.json({ history });
});

// =============================================================================
// HEALTH CHECK
// =============================================================================

router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'live',
    engines: {
      mining: liveMiningEngine.getActiveSessions().length + ' active sessions',
      staking: Object.keys(liveStakingEngine.getTotalStaked()).length + ' coins staked',
      trading: Object.keys(liveTradingEngine.getAllPrices()).length + ' pairs live',
      seeds: seedDatabaseEngine.getAll().length + ' seeds in database',
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
