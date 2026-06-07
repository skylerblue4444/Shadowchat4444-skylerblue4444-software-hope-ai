/**
 * Security & Anti-Surveillance API Routes
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 */

import { Router, Request, Response } from 'express';
import { miniTorRouter, i2pEngine, wireProtocol, securityEngine } from '../services/security-antisurveillance';

const router = Router();

// =============================================================================
// MINI TOR ROUTER
// =============================================================================

router.post('/tor/circuit/build', (req: Request, res: Response) => {
  try {
    const { userId, preferredCountry } = req.body;
    const circuit = miniTorRouter.buildCircuit(userId, preferredCountry);
    res.json({ success: true, circuit });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.post('/tor/circuit/rotate', (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const circuit = miniTorRouter.rotateCircuit(userId);
    res.json({ success: true, circuit });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/tor/circuits/:userId', (req: Request, res: Response) => {
  const circuits = miniTorRouter.getActiveCircuits(req.params.userId);
  res.json({ circuits });
});

router.get('/tor/network', (_req: Request, res: Response) => {
  const status = miniTorRouter.getNetworkStatus();
  res.json(status);
});

router.get('/tor/nodes', (req: Request, res: Response) => {
  const { type } = req.query;
  const nodes = miniTorRouter.getNodes(type as string);
  res.json({ nodes });
});

// =============================================================================
// I2P
// =============================================================================

router.post('/i2p/session/create', (req: Request, res: Response) => {
  const { userId, tunnelLength } = req.body;
  const session = i2pEngine.createSession(userId, tunnelLength || 3);
  res.json({ success: true, session });
});

router.post('/i2p/session/close', (req: Request, res: Response) => {
  const { sessionId } = req.body;
  i2pEngine.closeSession(sessionId);
  res.json({ success: true });
});

router.get('/i2p/sessions/:userId', (req: Request, res: Response) => {
  const sessions = i2pEngine.getActiveSessions(req.params.userId);
  res.json({ sessions });
});

router.get('/i2p/network', (_req: Request, res: Response) => {
  const stats = i2pEngine.getNetworkStats();
  res.json(stats);
});

// =============================================================================
// WIRE PROTOCOL
// =============================================================================

router.post('/wire/session/create', (req: Request, res: Response) => {
  const { userId, peerId, protocol, encryption } = req.body;
  const session = wireProtocol.createSession(userId, peerId, protocol, encryption);
  res.json({ success: true, session });
});

router.post('/wire/keys/rotate', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    const session = wireProtocol.rotateKeys(sessionId);
    res.json({ success: true, session });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/wire/sessions/:userId', (req: Request, res: Response) => {
  const sessions = wireProtocol.getActiveSessions(req.params.userId);
  res.json({ sessions });
});

router.post('/wire/session/close', (req: Request, res: Response) => {
  const { sessionId } = req.body;
  wireProtocol.closeSession(sessionId);
  res.json({ success: true });
});

// =============================================================================
// PRIVACY PROFILE
// =============================================================================

router.get('/privacy/:userId', (req: Request, res: Response) => {
  const profile = securityEngine.getProfile(req.params.userId);
  res.json({ profile });
});

router.put('/privacy/:userId', (req: Request, res: Response) => {
  const profile = securityEngine.updateProfile(req.params.userId, req.body);
  res.json({ success: true, profile });
});

router.get('/privacy/:userId/status', (req: Request, res: Response) => {
  const status = securityEngine.getSecurityStatus(req.params.userId);
  res.json(status);
});

// =============================================================================
// SECURITY EVENTS
// =============================================================================

router.get('/security/events/:userId', (req: Request, res: Response) => {
  const { limit } = req.query;
  const events = securityEngine.getEvents(req.params.userId, parseInt(limit as string) || 50);
  res.json({ events });
});

router.post('/security/event', (req: Request, res: Response) => {
  const { userId, type, severity, description, blocked, sourceIp } = req.body;
  const event = securityEngine.logEvent(userId, type, severity, description, blocked, sourceIp);
  res.json({ success: true, event });
});

// =============================================================================
// DEAD DROPS
// =============================================================================

router.post('/deaddrop/create', (req: Request, res: Response) => {
  const { creatorId, content, recipientId, expiresHours, maxReads, selfDestruct } = req.body;
  const drop = securityEngine.createDeadDrop(creatorId, content, { recipientId, expiresHours, maxReads, selfDestruct });
  res.json({ success: true, dropId: drop.id, accessKey: drop.accessKey });
});

router.post('/deaddrop/read', (req: Request, res: Response) => {
  try {
    const { dropId, accessKey } = req.body;
    const result = securityEngine.readDeadDrop(dropId, accessKey);
    res.json({ success: true, ...result });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

// =============================================================================
// CANARY
// =============================================================================

router.post('/canary/setup', (req: Request, res: Response) => {
  const { userId, message, frequency, alertContacts } = req.body;
  const canary = securityEngine.setupCanary(userId, message, frequency || 'weekly', alertContacts || []);
  res.json({ success: true, canary });
});

router.post('/canary/update', (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    const canary = securityEngine.updateCanary(userId, message);
    res.json({ success: true, canary });
  } catch (e: any) { res.status(400).json({ success: false, error: e.message }); }
});

router.get('/canary/:userId', (req: Request, res: Response) => {
  const canary = securityEngine.getCanary(req.params.userId);
  res.json({ canary });
});

// =============================================================================
// PANIC BUTTON
// =============================================================================

router.post('/panic', (req: Request, res: Response) => {
  const { userId } = req.body;
  const result = securityEngine.activatePanic(userId);
  res.json({ success: true, ...result });
});

// =============================================================================
// ANTI-FINGERPRINTING
// =============================================================================

router.get('/fingerprint/decoy', (_req: Request, res: Response) => {
  const decoy = securityEngine.generateDecoyFingerprint();
  res.json({ fingerprint: decoy });
});

router.post('/metadata/strip', (req: Request, res: Response) => {
  const stripped = securityEngine.stripMetadata(req.body.data || {});
  res.json({ stripped });
});

export default router;
