/**
 * Dating + Advanced Charity + Live Section API Routes
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 */

import { Router, Request, Response } from 'express';
import { datingEngine } from '../services/dating-service';
import { charityEngine } from '../services/charity-advanced';
import { liveSectionEngine } from '../services/live-section';

const router = Router();

// =============================================================================
// DATING
// =============================================================================

router.post('/dating/profile', (req: Request, res: Response) => {
  const { userId, ...data } = req.body;
  const profile = datingEngine.createProfile(userId, data);
  res.json({ success: true, profile });
});

router.get('/dating/profile/:userId', (req: Request, res: Response) => {
  const profile = datingEngine.getProfile(req.params.userId);
  if (!profile) return res.status(404).json({ error: 'Dating profile not found' });
  res.json({ profile });
});

router.put('/dating/profile/:userId', (req: Request, res: Response) => {
  try {
    const profile = datingEngine.updateProfile(req.params.userId, req.body);
    res.json({ success: true, profile });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/dating/discover/:userId', (req: Request, res: Response) => {
  const { limit } = req.query;
  const profiles = datingEngine.discover(req.params.userId, parseInt(limit as string) || 20);
  res.json({ profiles });
});

router.post('/dating/like', (req: Request, res: Response) => {
  const { fromUserId, toUserId, isSuperLike } = req.body;
  const result = datingEngine.like(fromUserId, toUserId, isSuperLike);
  res.json({ success: true, ...result });
});

router.get('/dating/matches/:userId', (req: Request, res: Response) => {
  const matches = datingEngine.getMatches(req.params.userId);
  res.json({ matches });
});

router.post('/dating/message', (req: Request, res: Response) => {
  try {
    const { matchId, fromUserId, content, type, mediaUrl, giftAmount, giftCoin } = req.body;
    const msg = datingEngine.sendMessage(matchId, fromUserId, content, type || 'text', { mediaUrl, giftAmount, giftCoin });
    res.json({ success: true, message: msg });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/dating/messages/:matchId', (req: Request, res: Response) => {
  const messages = datingEngine.getMessages(req.params.matchId);
  res.json({ messages });
});

router.post('/dating/gift', (req: Request, res: Response) => {
  const { fromUserId, toUserId, coinSymbol, amount, message, animation } = req.body;
  const gift = datingEngine.sendGift(fromUserId, toUserId, coinSymbol || 'SKY4444', amount, message || '', animation);
  res.json({ success: true, gift });
});

router.post('/dating/video-date', (req: Request, res: Response) => {
  try {
    const { matchId, initiatorId } = req.body;
    const videoDate = datingEngine.startVideoDate(matchId, initiatorId);
    res.json({ success: true, videoDate });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/dating/unmatch', (req: Request, res: Response) => {
  const { matchId, userId } = req.body;
  datingEngine.unmatch(matchId, userId);
  res.json({ success: true });
});

// =============================================================================
// CHARITY
// =============================================================================

router.get('/charity/all', (req: Request, res: Response) => {
  const { category } = req.query;
  const charities = charityEngine.getCharities(category as string);
  res.json({ charities });
});

router.get('/charity/:id', (req: Request, res: Response) => {
  const charity = charityEngine.getCharity(req.params.id);
  if (!charity) return res.status(404).json({ error: 'Charity not found' });
  res.json({ charity });
});

router.post('/charity/donate', (req: Request, res: Response) => {
  try {
    const { donorId, charityId, amount, coinSymbol, type, message, isAnonymous } = req.body;
    const donation = charityEngine.donate(donorId, charityId, amount, coinSymbol || 'SKY4444', type || 'one_time', { message, isAnonymous });
    res.json({ success: true, donation });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/charity/roundup/enable', (req: Request, res: Response) => {
  const { userId, charityId, coinSymbol } = req.body;
  charityEngine.enableRoundUp(userId, charityId, coinSymbol || 'SKY4444');
  res.json({ success: true });
});

router.post('/charity/recurring', (req: Request, res: Response) => {
  const { userId, charityId, amount, coinSymbol, frequency } = req.body;
  const id = charityEngine.setupRecurring(userId, charityId, amount, coinSymbol || 'SKY4444', frequency || 'monthly');
  res.json({ success: true, recurringId: id });
});

router.post('/charity/campaign', (req: Request, res: Response) => {
  const { creatorId, ...data } = req.body;
  const campaign = charityEngine.createCampaign(creatorId, data);
  res.json({ success: true, campaign });
});

router.post('/charity/campaign/donate', (req: Request, res: Response) => {
  try {
    const { campaignId, donorId, amount } = req.body;
    const campaign = charityEngine.donateToCampaign(campaignId, donorId, amount);
    res.json({ success: true, campaign });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/charity/campaigns', (req: Request, res: Response) => {
  const { status } = req.query;
  const campaigns = charityEngine.getCampaigns(status as string);
  res.json({ campaigns });
});

router.get('/charity/volunteer', (req: Request, res: Response) => {
  const { remote } = req.query;
  const opportunities = charityEngine.getVolunteerOpportunities(remote === 'true' ? true : remote === 'false' ? false : undefined);
  res.json({ opportunities });
});

router.post('/charity/volunteer/signup', (req: Request, res: Response) => {
  try {
    const { userId, opportunityId } = req.body;
    const opp = charityEngine.signUpVolunteer(userId, opportunityId);
    res.json({ success: true, opportunity: opp });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/charity/nft/mint', (req: Request, res: Response) => {
  try {
    const { userId, charityId, donationAmount, coinSymbol } = req.body;
    const nft = charityEngine.mintCharityNFT(userId, charityId, donationAmount, coinSymbol || 'SKY4444');
    res.json({ success: true, nft });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/charity/impact/:userId', (req: Request, res: Response) => {
  const report = charityEngine.getImpactReport(req.params.userId);
  res.json({ report });
});

router.get('/charity/transparency/:charityId', (req: Request, res: Response) => {
  const ledger = charityEngine.getTransparencyLedger(req.params.charityId);
  res.json(ledger);
});

router.get('/charity/stats', (_req: Request, res: Response) => {
  const stats = charityEngine.getGlobalStats();
  res.json(stats);
});

// =============================================================================
// LIVE SECTION
// =============================================================================

// Streaming
router.post('/live/stream/start', (req: Request, res: Response) => {
  const { hostId, hostName, title, category, isNSFW, isPremium, tags } = req.body;
  const stream = liveSectionEngine.goLive(hostId, hostName, { title, category, isNSFW, isPremium, tags });
  res.json({ success: true, stream });
});

router.post('/live/stream/end', (req: Request, res: Response) => {
  try {
    const { streamId } = req.body;
    const stream = liveSectionEngine.endStream(streamId);
    res.json({ success: true, stream });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/live/stream/join', (req: Request, res: Response) => {
  try {
    const { streamId } = req.body;
    const stream = liveSectionEngine.joinStream(streamId);
    res.json({ success: true, stream });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/live/stream/leave', (req: Request, res: Response) => {
  const { streamId } = req.body;
  liveSectionEngine.leaveStream(streamId);
  res.json({ success: true });
});

router.post('/live/stream/tip', (req: Request, res: Response) => {
  try {
    const { streamId, userId, username, amount, coinSymbol } = req.body;
    const chat = liveSectionEngine.tipStream(streamId, userId, username, amount, coinSymbol || 'SKY4444');
    res.json({ success: true, chat });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/live/stream/chat', (req: Request, res: Response) => {
  const { streamId, userId, username, message, badges } = req.body;
  const chat = liveSectionEngine.sendStreamChat(streamId, userId, username, message, badges);
  res.json({ success: true, chat });
});

router.get('/live/streams', (req: Request, res: Response) => {
  const { category, includeNSFW } = req.query;
  const streams = liveSectionEngine.getLiveStreams(category as string, includeNSFW === 'true');
  res.json({ streams });
});

router.get('/live/stream/:streamId/chat', (req: Request, res: Response) => {
  const chat = liveSectionEngine.getStreamChat(req.params.streamId);
  res.json({ chat });
});

// Calls
router.post('/live/call', (req: Request, res: Response) => {
  const { callerId, callerName, receiverId, receiverName, type, isPaid, pricePerMinute, coinSymbol } = req.body;
  const call = liveSectionEngine.initiateCall(callerId, callerName, receiverId, receiverName, type || 'voice', { isPaid, pricePerMinute, coinSymbol });
  res.json({ success: true, call });
});

router.post('/live/call/answer', (req: Request, res: Response) => {
  try {
    const { callId } = req.body;
    const call = liveSectionEngine.answerCall(callId);
    res.json({ success: true, call });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/live/call/end', (req: Request, res: Response) => {
  try {
    const { callId } = req.body;
    const call = liveSectionEngine.endCall(callId);
    res.json({ success: true, call });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/live/call/decline', (req: Request, res: Response) => {
  try {
    const { callId } = req.body;
    const call = liveSectionEngine.declineCall(callId);
    res.json({ success: true, call });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/live/calls/:userId', (req: Request, res: Response) => {
  const active = liveSectionEngine.getActiveCalls(req.params.userId);
  const history = liveSectionEngine.getCallHistory(req.params.userId);
  res.json({ active, history });
});

// Messages
router.post('/live/message', (req: Request, res: Response) => {
  const { fromUserId, toUserId, content, type, mediaUrl, replyTo, duration } = req.body;
  const msg = liveSectionEngine.sendMessage(fromUserId, toUserId, content, type || 'text', { mediaUrl, replyTo, duration });
  res.json({ success: true, message: msg });
});

router.get('/live/messages/:conversationId', (req: Request, res: Response) => {
  const messages = liveSectionEngine.getConversationMessages(req.params.conversationId);
  res.json({ messages });
});

router.post('/live/messages/read', (req: Request, res: Response) => {
  const { conversationId, userId } = req.body;
  liveSectionEngine.markRead(conversationId, userId);
  res.json({ success: true });
});

router.get('/live/conversations/:userId', (req: Request, res: Response) => {
  const conversations = liveSectionEngine.getUserConversations(req.params.userId);
  res.json({ conversations });
});

router.post('/live/message/react', (req: Request, res: Response) => {
  const { messageId, userId, emoji } = req.body;
  liveSectionEngine.reactToMessage(messageId, userId, emoji);
  res.json({ success: true });
});

router.post('/live/message/delete', (req: Request, res: Response) => {
  const { messageId, userId } = req.body;
  liveSectionEngine.deleteMessage(messageId, userId);
  res.json({ success: true });
});

// Snaps
router.post('/live/snap', (req: Request, res: Response) => {
  const { fromUserId, toUserId, mediaUrl, mediaType, duration, caption, filters } = req.body;
  const snap = liveSectionEngine.sendSnap(fromUserId, toUserId, mediaUrl, mediaType || 'image', { duration, caption, filters });
  res.json({ success: true, snap });
});

router.post('/live/snap/view', (req: Request, res: Response) => {
  try {
    const { snapId } = req.body;
    const snap = liveSectionEngine.viewSnap(snapId);
    res.json({ success: true, snap });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/live/snaps/pending/:userId', (req: Request, res: Response) => {
  const snaps = liveSectionEngine.getPendingSnaps(req.params.userId);
  res.json({ snaps });
});

router.get('/live/snaps/sent/:userId', (req: Request, res: Response) => {
  const snaps = liveSectionEngine.getSentSnaps(req.params.userId);
  res.json({ snaps });
});

router.post('/live/snap/screenshot', (req: Request, res: Response) => {
  const { snapId } = req.body;
  liveSectionEngine.reportScreenshot(snapId);
  res.json({ success: true, warning: 'Screenshot detected and reported to sender' });
});

// Stats
router.get('/live/stats', (_req: Request, res: Response) => {
  const stats = liveSectionEngine.getStats();
  res.json(stats);
});

export default router;
