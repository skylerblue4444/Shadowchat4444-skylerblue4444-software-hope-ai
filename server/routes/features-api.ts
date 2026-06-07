/**
 * Features API Routes - Wires up all new services
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Endpoints for: Hope AI Voice, Casino, Social, Marketplace, Premium, ICO
 */

import { Router, Request, Response } from 'express';
import { voiceCommandParser } from '../services/hope-voice-commands';
import { dayTradingEngine, tradeRoomEngine, VOICE_PERSONALITIES, AVATAR_OUTFITS } from '../services/hope-ai-voice';
import { blackjackEngine, rouletteEngine, slotsEngine, crashEngine, CASINO_GAMES, casinoStats } from '../services/casino-service';
import { tippingEngine, contentEngine, messagingEngine } from '../services/social-service';
import { shopEngine, hackerPuzzleEngine, seedInfoEngine, PLATFORM_FEES } from '../services/marketplace-advanced';
import { premiumEngine, PREMIUM_TIERS, STARTING_BALANCES, MINI_APPS, ALGORITHM_ENGINES } from '../services/premium-system';
import { whitepaperEngine } from '../services/ico-whitepaper';

const router = Router();

// =============================================================================
// HOPE AI VOICE COMMANDS
// =============================================================================

router.post('/hope-ai/voice-command', (req: Request, res: Response) => {
  try {
    const { transcript, userId, isUnhinged } = req.body;
    const { intent, entities, confidence } = voiceCommandParser.parseIntent(transcript);
    const action = voiceCommandParser.buildAction(intent, entities, userId);
    const response = voiceCommandParser.generateResponse(intent, entities, true, isUnhinged || false);
    res.json({ success: true, intent, entities, confidence, action, response });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/hope-ai/voices', (_req: Request, res: Response) => {
  res.json({ voices: VOICE_PERSONALITIES });
});

router.get('/hope-ai/outfits', (_req: Request, res: Response) => {
  res.json({ outfits: AVATAR_OUTFITS });
});

// =============================================================================
// DAY TRADING
// =============================================================================

router.post('/trading/signals', (req: Request, res: Response) => {
  const { coins } = req.body;
  const signals = dayTradingEngine.generateSignals(coins || ['SKY4444', 'BTC', 'DOGE', 'TRUMP', 'SHADOW']);
  res.json({ signals });
});

router.get('/trading/signals/active', (_req: Request, res: Response) => {
  res.json({ signals: dayTradingEngine.getActiveSignals() });
});

// =============================================================================
// TRADE ROOMS
// =============================================================================

router.get('/trade-room/rooms', (_req: Request, res: Response) => {
  const rooms = tradeRoomEngine.getRooms().map(id => ({
    id,
    activeUsers: tradeRoomEngine.getActiveUserCount(id),
  }));
  res.json({ rooms });
});

router.post('/trade-room/join', (req: Request, res: Response) => {
  const { roomId, userId } = req.body;
  tradeRoomEngine.joinRoom(roomId, userId);
  res.json({ success: true, messages: tradeRoomEngine.getMessages(roomId) });
});

router.post('/trade-room/message', (req: Request, res: Response) => {
  const { roomId, userId, username, content, type, coinMention } = req.body;
  const msg = tradeRoomEngine.sendMessage(roomId, { userId, username, content, type: type || 'chat', coinMention });
  res.json({ success: true, message: msg });
});

// =============================================================================
// CASINO
// =============================================================================

router.get('/casino/games', (_req: Request, res: Response) => {
  res.json({ games: CASINO_GAMES, stats: casinoStats });
});

router.post('/casino/blackjack/start', (req: Request, res: Response) => {
  try {
    const { userId, bet, coinSymbol } = req.body;
    const game = blackjackEngine.startGame(userId, bet, coinSymbol || 'SKY4444');
    casinoStats.totalGamesPlayed++;
    res.json({ success: true, game });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/casino/blackjack/hit', (req: Request, res: Response) => {
  try {
    const { gameId } = req.body;
    const game = blackjackEngine.hit(gameId);
    res.json({ success: true, game });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/casino/blackjack/stand', (req: Request, res: Response) => {
  try {
    const { gameId } = req.body;
    const game = blackjackEngine.stand(gameId);
    res.json({ success: true, game });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/casino/roulette/spin', (req: Request, res: Response) => {
  const result = rouletteEngine.spin();
  casinoStats.totalGamesPlayed++;
  res.json({ success: true, result });
});

router.post('/casino/slots/spin', (req: Request, res: Response) => {
  const { userId, bet, coinSymbol } = req.body;
  const result = slotsEngine.spin(bet || 1, userId, coinSymbol || 'SKY4444');
  casinoStats.totalGamesPlayed++;
  res.json({ success: true, result });
});

router.post('/casino/crash/start', (_req: Request, res: Response) => {
  const game = crashEngine.startRound();
  res.json({ success: true, game: { id: game.id, status: game.status } });
});

router.post('/casino/crash/bet', (req: Request, res: Response) => {
  try {
    const { userId, amount, coinSymbol } = req.body;
    const bet = crashEngine.placeBet(userId, amount, coinSymbol || 'SKY4444');
    res.json({ success: true, bet });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/casino/crash/cashout', (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const bet = crashEngine.cashOut(userId);
    res.json({ success: true, bet });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// =============================================================================
// SOCIAL - TIPPING
// =============================================================================

router.post('/social/tip', (req: Request, res: Response) => {
  const { fromUserId, toUserId, coinSymbol, amount, platform, message, toRedditUsername } = req.body;
  const tip = tippingEngine.sendTip(fromUserId, toUserId, coinSymbol || 'SKY4444', amount, platform || 'internal', message || '', toRedditUsername);
  res.json({ success: true, tip });
});

router.post('/social/tip/claim', (req: Request, res: Response) => {
  try {
    const { tipId, userId } = req.body;
    const tip = tippingEngine.claimTip(tipId, userId);
    res.json({ success: true, tip });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/social/tips/:userId', (req: Request, res: Response) => {
  const sent = tippingEngine.getUserTipsSent(req.params.userId);
  const received = tippingEngine.getUserTipsReceived(req.params.userId);
  res.json({ sent, received });
});

// =============================================================================
// SOCIAL - CONTENT & NSFW
// =============================================================================

router.post('/social/post', (req: Request, res: Response) => {
  const { userId, content, mediaUrls, isNSFW, isPremium, price, coinSymbol, visibility, tags, type } = req.body;
  const post = contentEngine.createPost(userId, content, mediaUrls || [], { isNSFW, isPremium, price, coinSymbol, visibility, tags, type });
  res.json({ success: true, post });
});

router.get('/social/feed', (req: Request, res: Response) => {
  const { userId, includeNSFW, premiumOnly } = req.query;
  const feed = contentEngine.getFeed(userId as string, includeNSFW === 'true', premiumOnly === 'true');
  res.json({ feed });
});

router.post('/social/post/tip', (req: Request, res: Response) => {
  const { postId, fromUserId, amount, coinSymbol } = req.body;
  contentEngine.tipPost(postId, fromUserId, amount, coinSymbol || 'SKY4444');
  res.json({ success: true });
});

// =============================================================================
// SOCIAL - MESSAGING (Call, Text, Snap)
// =============================================================================

router.post('/social/message', (req: Request, res: Response) => {
  const { fromUserId, toUserId, content, type, mediaUrl, selfDestruct, selfDestructSeconds } = req.body;
  const msg = messagingEngine.sendMessage(fromUserId, toUserId, content, { type, mediaUrl, selfDestruct, selfDestructSeconds });
  res.json({ success: true, message: msg });
});

router.post('/social/snap', (req: Request, res: Response) => {
  const { fromUserId, toUserId, mediaUrl, seconds } = req.body;
  const msg = messagingEngine.sendSnap(fromUserId, toUserId, mediaUrl, seconds);
  res.json({ success: true, message: msg });
});

router.post('/social/call', (req: Request, res: Response) => {
  const { callerId, receiverId, type, isPaid, pricePerMinute, coinSymbol } = req.body;
  const call = messagingEngine.initiateCall(callerId, receiverId, type || 'voice', isPaid, pricePerMinute, coinSymbol);
  res.json({ success: true, call });
});

router.post('/social/call/answer', (req: Request, res: Response) => {
  try {
    const { callId } = req.body;
    const call = messagingEngine.answerCall(callId);
    res.json({ success: true, call });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/social/call/end', (req: Request, res: Response) => {
  try {
    const { callId } = req.body;
    const call = messagingEngine.endCall(callId);
    res.json({ success: true, call });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/social/messages/:userId1/:userId2', (req: Request, res: Response) => {
  const messages = messagingEngine.getConversation(req.params.userId1, req.params.userId2);
  res.json({ messages });
});

router.get('/social/unread/:userId', (req: Request, res: Response) => {
  const count = messagingEngine.getUnreadCount(req.params.userId);
  res.json({ unreadCount: count });
});

// =============================================================================
// MARKETPLACE - SHOP
// =============================================================================

router.get('/shop/listings', (req: Request, res: Response) => {
  const { category, page } = req.query;
  const listings = shopEngine.getListings(category as any, parseInt(page as string) || 1);
  res.json({ listings, fees: PLATFORM_FEES });
});

router.post('/shop/listing', (req: Request, res: Response) => {
  const listing = shopEngine.createListing(req.body.sellerId, req.body);
  res.json({ success: true, listing });
});

router.post('/shop/purchase', (req: Request, res: Response) => {
  try {
    const { buyerId, listingId, quantity } = req.body;
    const order = shopEngine.purchaseItem(buyerId, listingId, quantity || 1);
    res.json({ success: true, order });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/shop/orders/:userId', (req: Request, res: Response) => {
  const orders = shopEngine.getUserOrders(req.params.userId);
  res.json({ orders });
});

router.get('/shop/search', (req: Request, res: Response) => {
  const { q } = req.query;
  const results = shopEngine.searchListings(q as string || '');
  res.json({ results });
});

// =============================================================================
// ADMIN - ORDER FEED
// =============================================================================

router.get('/admin/orders', (_req: Request, res: Response) => {
  const feed = shopEngine.getAdminOrderFeed();
  res.json(feed);
});

router.post('/admin/orders/:orderId/status', (req: Request, res: Response) => {
  try {
    const { status, adminNote } = req.body;
    const order = shopEngine.updateOrderStatus(req.params.orderId, status, adminNote);
    res.json({ success: true, order });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// =============================================================================
// SUPPLIER INTEGRATION (DHGate/Alibaba)
// =============================================================================

router.post('/shop/supplier/import', (req: Request, res: Response) => {
  const product = shopEngine.importSupplierProduct(req.body);
  res.json({ success: true, product });
});

router.get('/shop/suppliers', (req: Request, res: Response) => {
  const { source } = req.query;
  const products = shopEngine.getSupplierProducts(source as any);
  res.json({ products });
});

// =============================================================================
// HACKER PUZZLES
// =============================================================================

router.get('/puzzles', (_req: Request, res: Response) => {
  const puzzles = hackerPuzzleEngine.getActivePuzzles();
  res.json({ puzzles });
});

router.get('/puzzles/leaderboard', (_req: Request, res: Response) => {
  const leaderboard = hackerPuzzleEngine.getLeaderboard();
  res.json({ leaderboard });
});

router.post('/puzzles/submit', (req: Request, res: Response) => {
  try {
    const { puzzleId, userId, solution } = req.body;
    const result = hackerPuzzleEngine.submitSolution(puzzleId, userId, solution);
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// =============================================================================
// SEED INFO
// =============================================================================

router.get('/seeds', (req: Request, res: Response) => {
  const { type } = req.query;
  const seeds = seedInfoEngine.getSeeds(type as string);
  res.json({ seeds });
});

router.get('/seeds/search', (req: Request, res: Response) => {
  const { q } = req.query;
  const seeds = seedInfoEngine.searchSeeds(q as string || '');
  res.json({ seeds });
});

// =============================================================================
// PREMIUM SYSTEM
// =============================================================================

router.get('/premium/tiers', (_req: Request, res: Response) => {
  res.json({ tiers: PREMIUM_TIERS, startingBalances: STARTING_BALANCES });
});

router.post('/premium/onboard', (req: Request, res: Response) => {
  const { userId, referralCode } = req.body;
  const onboarding = premiumEngine.onboardUser(userId, referralCode);
  res.json({ success: true, onboarding });
});

router.post('/premium/upgrade', (req: Request, res: Response) => {
  try {
    const { userId, tierId } = req.body;
    const result = premiumEngine.upgradeTier(userId, tierId);
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/premium/user/:userId', (req: Request, res: Response) => {
  const tier = premiumEngine.getUserTier(req.params.userId);
  const apps = premiumEngine.getAvailableApps(req.params.userId);
  res.json({ tier, apps });
});

// =============================================================================
// MINI APPS
// =============================================================================

router.get('/apps', (_req: Request, res: Response) => {
  res.json({ apps: MINI_APPS });
});

// =============================================================================
// ALGORITHMS
// =============================================================================

router.get('/algorithms', (_req: Request, res: Response) => {
  res.json({ engines: ALGORITHM_ENGINES });
});

// =============================================================================
// ICO & WHITEPAPER
// =============================================================================

router.get('/ico/phases', (req: Request, res: Response) => {
  const { token } = req.query;
  const phases = whitepaperEngine.getICOPhases(token as string);
  const active = whitepaperEngine.getActivePhases();
  const raised = whitepaperEngine.getTotalRaised();
  res.json({ phases, active, raised });
});

router.post('/ico/calculate', (req: Request, res: Response) => {
  try {
    const { phaseId, investmentUSD } = req.body;
    const result = whitepaperEngine.calculateTokenAmount(phaseId, investmentUSD);
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/whitepaper/:token', (req: Request, res: Response) => {
  const sections = whitepaperEngine.getWhitepaper(req.params.token.toUpperCase());
  const tokenomics = whitepaperEngine.getTokenomics(req.params.token.toUpperCase());
  res.json({ sections, tokenomics });
});

router.get('/tokenomics/:token', (req: Request, res: Response) => {
  const tokenomics = whitepaperEngine.getTokenomics(req.params.token.toUpperCase());
  res.json({ tokenomics });
});

export default router;
