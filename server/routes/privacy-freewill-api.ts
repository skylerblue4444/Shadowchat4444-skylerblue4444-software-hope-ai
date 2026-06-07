/**
 * Privacy Monetization Web3 + Free Will Enhancement API Routes
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 */

import { Router, Request, Response } from 'express';
import { privacyMonetization, freeWillEngine } from '../services/privacy-web3-freewill';

const router = Router();

// =============================================================================
// DATA VAULT
// =============================================================================

router.post('/vault/create', (req: Request, res: Response) => {
  const { userId } = req.body;
  const vault = privacyMonetization.createVault(userId);
  res.json({ success: true, vault });
});

router.get('/vault/:userId', (req: Request, res: Response) => {
  const vault = privacyMonetization.getVault(req.params.userId);
  if (!vault) return res.status(404).json({ error: 'Vault not found' });
  res.json({ vault });
});

router.post('/vault/monetize', (req: Request, res: Response) => {
  try {
    const { userId, categories } = req.body;
    const vault = privacyMonetization.enableMonetization(userId, categories);
    res.json({ success: true, vault });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/vault/disable-monetization', (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const vault = privacyMonetization.disableMonetization(userId);
    res.json({ success: true, vault });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/vault/price', (req: Request, res: Response) => {
  const { userId, categoryId, price } = req.body;
  privacyMonetization.setCategoryPrice(userId, categoryId, price);
  res.json({ success: true });
});

router.get('/vault/:userId/earnings', (req: Request, res: Response) => {
  const report = privacyMonetization.getEarningsReport(req.params.userId);
  res.json(report);
});

// =============================================================================
// DATA MARKETPLACE
// =============================================================================

router.post('/marketplace/list', (req: Request, res: Response) => {
  const { userId, categoryType, price, description } = req.body;
  const listing = privacyMonetization.listOnMarketplace(userId, categoryType, price, description);
  res.json({ success: true, listing });
});

router.get('/marketplace', (req: Request, res: Response) => {
  const { category } = req.query;
  const listings = privacyMonetization.getMarketplace(category as string);
  res.json({ listings });
});

router.post('/marketplace/buy', (req: Request, res: Response) => {
  try {
    const { buyerId, sellerId, categoryId } = req.body;
    const access = privacyMonetization.requestDataAccess(buyerId, sellerId, categoryId);
    res.json({ success: true, access });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

// =============================================================================
// WEB3 IDENTITY
// =============================================================================

router.post('/identity/create', (req: Request, res: Response) => {
  const { userId } = req.body;
  const identity = privacyMonetization.createIdentity(userId);
  res.json({ success: true, identity });
});

router.get('/identity/:userId', (req: Request, res: Response) => {
  const identity = privacyMonetization.getIdentity(req.params.userId);
  if (!identity) return res.status(404).json({ error: 'Identity not found' });
  res.json({ identity });
});

router.post('/identity/credential', (req: Request, res: Response) => {
  try {
    const { userId, type, issuer, claims } = req.body;
    const credential = privacyMonetization.addCredential(userId, type, issuer, claims);
    res.json({ success: true, credential });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/identity/attestation', (req: Request, res: Response) => {
  try {
    const { userId, type, issuer, claim } = req.body;
    const attestation = privacyMonetization.addAttestation(userId, type, issuer, claim);
    res.json({ success: true, attestation });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

// =============================================================================
// FREE WILL ENHANCEMENT
// =============================================================================

router.post('/freewill/create', (req: Request, res: Response) => {
  const { userId, mode } = req.body;
  const profile = freeWillEngine.createProfile(userId, mode || 'beginner');
  res.json({ success: true, profile });
});

router.get('/freewill/:userId', (req: Request, res: Response) => {
  const profile = freeWillEngine.getProfile(req.params.userId);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json({ profile });
});

router.post('/freewill/mode', (req: Request, res: Response) => {
  try {
    const { userId, mode } = req.body;
    const profile = freeWillEngine.setMode(userId, mode);
    res.json({ success: true, profile });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/freewill/xp', (req: Request, res: Response) => {
  try {
    const { userId, skill, amount } = req.body;
    const result = freeWillEngine.addXP(userId, skill, amount);
    res.json({ success: true, ...result });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/freewill/enhance', (req: Request, res: Response) => {
  try {
    const { userId, enhancementId } = req.body;
    const enhancement = freeWillEngine.activateEnhancement(userId, enhancementId);
    res.json({ success: true, enhancement });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/freewill/:userId/enhancements', (req: Request, res: Response) => {
  const enhancements = freeWillEngine.getAvailableEnhancements(req.params.userId);
  res.json({ enhancements });
});

router.post('/freewill/challenge/complete', (req: Request, res: Response) => {
  try {
    const { userId, challengeId } = req.body;
    const result = freeWillEngine.completeChallenge(userId, challengeId);
    res.json({ success: true, ...result });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/freewill/achievements', (_req: Request, res: Response) => {
  const achievements = freeWillEngine.getAllAchievements();
  res.json({ achievements });
});

router.get('/freewill/leaderboard', (_req: Request, res: Response) => {
  const leaderboard = freeWillEngine.getLeaderboard();
  res.json({ leaderboard });
});

export default router;
