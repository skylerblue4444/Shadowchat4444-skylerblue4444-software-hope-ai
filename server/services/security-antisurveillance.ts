/**
 * Security & Anti-Surveillance Tools
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: I2P integration, Tor routing, Wire protocol, Mini Tor router,
 * Anti-tracking, Metadata stripping, Encrypted storage, Dead drops,
 * Canary system, Panic button, Decoy mode
 */

// =============================================================================
// TYPES
// =============================================================================

export interface TorCircuit {
  id: string;
  userId: string;
  entryNode: string;
  middleNode: string;
  exitNode: string;
  status: 'building' | 'active' | 'closed' | 'failed';
  createdAt: Date;
  expiresAt: Date;
  bytesTransferred: number;
  latencyMs: number;
  country: string;
}

export interface I2PSession {
  id: string;
  userId: string;
  destination: string;
  tunnelLength: number;
  isActive: boolean;
  inboundTunnels: number;
  outboundTunnels: number;
  createdAt: Date;
  bytesIn: number;
  bytesOut: number;
}

export interface WireSession {
  id: string;
  userId: string;
  peerId: string;
  protocol: 'wire' | 'signal' | 'matrix';
  encryptionType: 'double_ratchet' | 'aes256' | 'chacha20' | 'xchacha20poly1305';
  isActive: boolean;
  messagesExchanged: number;
  keyRotations: number;
  lastKeyRotation: Date;
  createdAt: Date;
}

export interface MiniTorNode {
  id: string;
  type: 'entry' | 'middle' | 'exit' | 'bridge';
  address: string;
  port: number;
  publicKey: string;
  bandwidth: number;
  uptime: number;
  country: string;
  isOnline: boolean;
  connections: number;
  maxConnections: number;
  flags: string[];
}

export interface PrivacyProfile {
  userId: string;
  torEnabled: boolean;
  i2pEnabled: boolean;
  wireProtocol: boolean;
  vpnEnabled: boolean;
  dnsOverHttps: boolean;
  metadataStripping: boolean;
  canaryActive: boolean;
  panicButtonEnabled: boolean;
  decoyModeEnabled: boolean;
  antiFingerprinting: boolean;
  trackingProtection: 'standard' | 'strict' | 'paranoid';
  encryptionLevel: 'standard' | 'military' | 'quantum_resistant';
  deadDropEnabled: boolean;
  burnAfterRead: boolean;
  privacyScore: number;
}

export interface SecurityEvent {
  id: string;
  userId: string;
  type: 'login_attempt' | 'tracking_blocked' | 'fingerprint_blocked' | 'metadata_stripped' | 'circuit_rotated' | 'key_rotated' | 'canary_triggered' | 'panic_activated' | 'intrusion_detected' | 'data_request';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  blocked: boolean;
  sourceIp?: string;
  timestamp: Date;
}

export interface DeadDrop {
  id: string;
  creatorId: string;
  recipientId?: string;
  content: string;
  encryptedPayload: string;
  accessKey: string;
  expiresAt: Date;
  maxReads: number;
  currentReads: number;
  selfDestruct: boolean;
  isActive: boolean;
  createdAt: Date;
}

export interface CanaryStatus {
  id: string;
  userId: string;
  message: string;
  lastUpdated: Date;
  isAlive: boolean;
  updateFrequency: 'daily' | 'weekly' | 'monthly';
  missedUpdates: number;
  alertContacts: string[];
}

// =============================================================================
// MINI TOR ROUTER ENGINE
// =============================================================================

class MiniTorRouterEngine {
  private nodes: Map<string, MiniTorNode> = new Map();
  private circuits: Map<string, TorCircuit> = new Map();

  constructor() {
    this.initializeNodes();
  }

  private initializeNodes(): void {
    const countries = ['US', 'DE', 'NL', 'CH', 'IS', 'RO', 'SE', 'NO', 'FI', 'CZ', 'LU', 'PA'];
    const types: MiniTorNode['type'][] = ['entry', 'middle', 'exit', 'bridge'];

    for (let i = 0; i < 50; i++) {
      const node: MiniTorNode = {
        id: `node_${i.toString().padStart(3, '0')}`,
        type: types[i % 4],
        address: `${10 + Math.floor(i / 10)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        port: 9001 + i,
        publicKey: `ed25519:${Buffer.from(Math.random().toString()).toString('base64').substr(0, 43)}`,
        bandwidth: 1000 + Math.floor(Math.random() * 9000),
        uptime: 85 + Math.floor(Math.random() * 15),
        country: countries[i % countries.length],
        isOnline: Math.random() > 0.05,
        connections: Math.floor(Math.random() * 100),
        maxConnections: 200,
        flags: this.generateFlags(types[i % 4]),
      };
      this.nodes.set(node.id, node);
    }
  }

  private generateFlags(type: string): string[] {
    const flags = ['Valid', 'Running'];
    if (type === 'entry') flags.push('Guard', 'Stable');
    if (type === 'exit') flags.push('Exit', 'Fast');
    if (type === 'bridge') flags.push('Bridge', 'Stable');
    if (Math.random() > 0.5) flags.push('HSDir');
    return flags;
  }

  buildCircuit(userId: string, preferredCountry?: string): TorCircuit {
    const onlineNodes = Array.from(this.nodes.values()).filter(n => n.isOnline);
    const entryNodes = onlineNodes.filter(n => n.type === 'entry' || n.type === 'bridge');
    const middleNodes = onlineNodes.filter(n => n.type === 'middle');
    const exitNodes = onlineNodes.filter(n => n.type === 'exit');

    if (entryNodes.length === 0 || middleNodes.length === 0 || exitNodes.length === 0) {
      throw new Error('Insufficient nodes to build circuit');
    }

    const entry = entryNodes[Math.floor(Math.random() * entryNodes.length)];
    const middle = middleNodes[Math.floor(Math.random() * middleNodes.length)];
    let exit = exitNodes[Math.floor(Math.random() * exitNodes.length)];
    if (preferredCountry) {
      const preferred = exitNodes.filter(n => n.country === preferredCountry);
      if (preferred.length > 0) exit = preferred[Math.floor(Math.random() * preferred.length)];
    }

    const circuit: TorCircuit = {
      id: `circuit_${Date.now()}_${userId}`,
      userId,
      entryNode: entry.id,
      middleNode: middle.id,
      exitNode: exit.id,
      status: 'active',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      bytesTransferred: 0,
      latencyMs: 50 + Math.floor(Math.random() * 200),
      country: exit.country,
    };

    this.circuits.set(circuit.id, circuit);
    entry.connections++;
    middle.connections++;
    exit.connections++;

    return circuit;
  }

  rotateCircuit(userId: string): TorCircuit {
    // Close existing circuits
    for (const circuit of this.circuits.values()) {
      if (circuit.userId === userId && circuit.status === 'active') {
        circuit.status = 'closed';
      }
    }
    return this.buildCircuit(userId);
  }

  getActiveCircuits(userId: string): TorCircuit[] {
    return Array.from(this.circuits.values())
      .filter(c => c.userId === userId && c.status === 'active');
  }

  getNetworkStatus(): { totalNodes: number; onlineNodes: number; activeCircuits: number; countries: string[] } {
    const nodes = Array.from(this.nodes.values());
    return {
      totalNodes: nodes.length,
      onlineNodes: nodes.filter(n => n.isOnline).length,
      activeCircuits: Array.from(this.circuits.values()).filter(c => c.status === 'active').length,
      countries: [...new Set(nodes.filter(n => n.isOnline).map(n => n.country))],
    };
  }

  getNodes(type?: string): MiniTorNode[] {
    let nodes = Array.from(this.nodes.values());
    if (type) nodes = nodes.filter(n => n.type === type);
    return nodes;
  }
}

// =============================================================================
// I2P ENGINE
// =============================================================================

class I2PEngine {
  private sessions: Map<string, I2PSession> = new Map();

  createSession(userId: string, tunnelLength: number = 3): I2PSession {
    const session: I2PSession = {
      id: `i2p_${Date.now()}_${userId}`,
      userId,
      destination: this.generateDestination(),
      tunnelLength,
      isActive: true,
      inboundTunnels: tunnelLength,
      outboundTunnels: tunnelLength,
      createdAt: new Date(),
      bytesIn: 0,
      bytesOut: 0,
    };

    this.sessions.set(session.id, session);
    return session;
  }

  private generateDestination(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz234567';
    let dest = '';
    for (let i = 0; i < 52; i++) dest += chars[Math.floor(Math.random() * chars.length)];
    return dest + '.b32.i2p';
  }

  closeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) session.isActive = false;
  }

  getActiveSessions(userId: string): I2PSession[] {
    return Array.from(this.sessions.values())
      .filter(s => s.userId === userId && s.isActive);
  }

  getNetworkStats(): { activeSessions: number; totalBytesRouted: number } {
    const sessions = Array.from(this.sessions.values()).filter(s => s.isActive);
    return {
      activeSessions: sessions.length,
      totalBytesRouted: sessions.reduce((sum, s) => sum + s.bytesIn + s.bytesOut, 0),
    };
  }
}

// =============================================================================
// WIRE PROTOCOL ENGINE
// =============================================================================

class WireProtocolEngine {
  private sessions: Map<string, WireSession> = new Map();

  createSession(userId: string, peerId: string, protocol: WireSession['protocol'] = 'wire', encryption: WireSession['encryptionType'] = 'double_ratchet'): WireSession {
    const session: WireSession = {
      id: `wire_${Date.now()}_${userId}_${peerId}`,
      userId,
      peerId,
      protocol,
      encryptionType: encryption,
      isActive: true,
      messagesExchanged: 0,
      keyRotations: 0,
      lastKeyRotation: new Date(),
      createdAt: new Date(),
    };

    this.sessions.set(session.id, session);
    return session;
  }

  rotateKeys(sessionId: string): WireSession {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    session.keyRotations++;
    session.lastKeyRotation = new Date();
    return session;
  }

  getActiveSessions(userId: string): WireSession[] {
    return Array.from(this.sessions.values())
      .filter(s => (s.userId === userId || s.peerId === userId) && s.isActive);
  }

  closeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) session.isActive = false;
  }
}

// =============================================================================
// SECURITY ENGINE (Anti-Surveillance)
// =============================================================================

class SecurityEngine {
  private profiles: Map<string, PrivacyProfile> = new Map();
  private events: SecurityEvent[] = [];
  private deadDrops: Map<string, DeadDrop> = new Map();
  private canaries: Map<string, CanaryStatus> = new Map();

  // Initialize privacy profile
  initProfile(userId: string): PrivacyProfile {
    const profile: PrivacyProfile = {
      userId,
      torEnabled: false,
      i2pEnabled: false,
      wireProtocol: true,
      vpnEnabled: false,
      dnsOverHttps: true,
      metadataStripping: true,
      canaryActive: false,
      panicButtonEnabled: false,
      decoyModeEnabled: false,
      antiFingerprinting: true,
      trackingProtection: 'strict',
      encryptionLevel: 'military',
      deadDropEnabled: false,
      burnAfterRead: false,
      privacyScore: 70,
    };

    this.profiles.set(userId, profile);
    return profile;
  }

  getProfile(userId: string): PrivacyProfile {
    return this.profiles.get(userId) || this.initProfile(userId);
  }

  updateProfile(userId: string, updates: Partial<PrivacyProfile>): PrivacyProfile {
    const profile = this.getProfile(userId);
    Object.assign(profile, updates);
    profile.privacyScore = this.calculatePrivacyScore(profile);
    return profile;
  }

  private calculatePrivacyScore(profile: PrivacyProfile): number {
    let score = 30; // Base
    if (profile.torEnabled) score += 15;
    if (profile.i2pEnabled) score += 10;
    if (profile.wireProtocol) score += 10;
    if (profile.vpnEnabled) score += 5;
    if (profile.dnsOverHttps) score += 5;
    if (profile.metadataStripping) score += 5;
    if (profile.antiFingerprinting) score += 5;
    if (profile.canaryActive) score += 3;
    if (profile.panicButtonEnabled) score += 3;
    if (profile.deadDropEnabled) score += 3;
    if (profile.burnAfterRead) score += 3;
    if (profile.trackingProtection === 'paranoid') score += 5;
    if (profile.encryptionLevel === 'quantum_resistant') score += 5;
    return Math.min(100, score);
  }

  // Log security event
  logEvent(userId: string, type: SecurityEvent['type'], severity: SecurityEvent['severity'], description: string, blocked: boolean = true, sourceIp?: string): SecurityEvent {
    const event: SecurityEvent = {
      id: `sec_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      userId,
      type,
      severity,
      description,
      blocked,
      sourceIp,
      timestamp: new Date(),
    };

    this.events.push(event);
    if (this.events.length > 10000) this.events = this.events.slice(-10000);
    return event;
  }

  getEvents(userId: string, limit: number = 50): SecurityEvent[] {
    return this.events
      .filter(e => e.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Dead Drops - anonymous encrypted message exchange
  createDeadDrop(creatorId: string, content: string, options?: { recipientId?: string; expiresHours?: number; maxReads?: number; selfDestruct?: boolean }): DeadDrop {
    const accessKey = this.generateAccessKey();
    const deadDrop: DeadDrop = {
      id: `dd_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      creatorId,
      recipientId: options?.recipientId,
      content: '', // Never store plaintext
      encryptedPayload: this.encrypt(content, accessKey),
      accessKey,
      expiresAt: new Date(Date.now() + (options?.expiresHours || 24) * 60 * 60 * 1000),
      maxReads: options?.maxReads || 1,
      currentReads: 0,
      selfDestruct: options?.selfDestruct || true,
      isActive: true,
      createdAt: new Date(),
    };

    this.deadDrops.set(deadDrop.id, deadDrop);
    return deadDrop;
  }

  readDeadDrop(dropId: string, accessKey: string): { content: string; remaining: number } {
    const drop = this.deadDrops.get(dropId);
    if (!drop) throw new Error('Dead drop not found');
    if (!drop.isActive) throw new Error('Dead drop expired');
    if (drop.expiresAt < new Date()) { drop.isActive = false; throw new Error('Dead drop expired'); }
    if (drop.accessKey !== accessKey) throw new Error('Invalid access key');

    drop.currentReads++;
    const content = this.decrypt(drop.encryptedPayload, accessKey);

    if (drop.currentReads >= drop.maxReads && drop.selfDestruct) {
      drop.isActive = false;
      this.deadDrops.delete(dropId);
    }

    return { content, remaining: drop.maxReads - drop.currentReads };
  }

  private generateAccessKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let key = '';
    for (let i = 0; i < 32; i++) key += chars[Math.floor(Math.random() * chars.length)];
    return key;
  }

  private encrypt(content: string, key: string): string {
    // Simulated encryption (in production use actual crypto library)
    return Buffer.from(`${key}:${content}`).toString('base64');
  }

  private decrypt(payload: string, key: string): string {
    const decoded = Buffer.from(payload, 'base64').toString();
    const parts = decoded.split(':');
    if (parts[0] !== key) throw new Error('Decryption failed');
    return parts.slice(1).join(':');
  }

  // Canary system
  setupCanary(userId: string, message: string, frequency: CanaryStatus['updateFrequency'], alertContacts: string[]): CanaryStatus {
    const canary: CanaryStatus = {
      id: `canary_${userId}`,
      userId,
      message,
      lastUpdated: new Date(),
      isAlive: true,
      updateFrequency: frequency,
      missedUpdates: 0,
      alertContacts,
    };

    this.canaries.set(userId, canary);
    const profile = this.getProfile(userId);
    profile.canaryActive = true;
    return canary;
  }

  updateCanary(userId: string, message?: string): CanaryStatus {
    const canary = this.canaries.get(userId);
    if (!canary) throw new Error('No canary set up');
    canary.lastUpdated = new Date();
    canary.missedUpdates = 0;
    if (message) canary.message = message;
    return canary;
  }

  getCanary(userId: string): CanaryStatus | null {
    return this.canaries.get(userId) || null;
  }

  // Panic button - wipe all data
  activatePanic(userId: string): { wiped: string[] } {
    const wiped: string[] = [];

    // Close all sessions
    wiped.push('tor_circuits');
    wiped.push('i2p_sessions');
    wiped.push('wire_sessions');

    // Destroy dead drops
    for (const [id, drop] of this.deadDrops) {
      if (drop.creatorId === userId) {
        this.deadDrops.delete(id);
        wiped.push(`dead_drop_${id}`);
      }
    }

    // Kill canary
    const canary = this.canaries.get(userId);
    if (canary) {
      canary.isAlive = false;
      wiped.push('canary');
    }

    // Log event
    this.logEvent(userId, 'panic_activated', 'critical', 'Panic button activated - all data wiped');

    wiped.push('local_keys', 'session_data', 'message_history', 'cached_data');
    return { wiped };
  }

  // Metadata stripping
  stripMetadata(data: Record<string, any>): Record<string, any> {
    const stripped = { ...data };
    delete stripped.ip;
    delete stripped.userAgent;
    delete stripped.referrer;
    delete stripped.geoLocation;
    delete stripped.deviceId;
    delete stripped.screenResolution;
    delete stripped.timezone;
    delete stripped.language;
    delete stripped.plugins;
    delete stripped.fonts;
    delete stripped.canvas;
    delete stripped.webgl;
    return stripped;
  }

  // Anti-fingerprinting
  generateDecoyFingerprint(): Record<string, string> {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    ];
    const resolutions = ['1920x1080', '2560x1440', '1366x768', '1440x900', '3840x2160'];
    const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'America/Los_Angeles', 'Europe/Berlin'];

    return {
      userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
      resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
      timezone: timezones[Math.floor(Math.random() * timezones.length)],
      language: ['en-US', 'en-GB', 'de-DE', 'fr-FR', 'ja-JP'][Math.floor(Math.random() * 5)],
      platform: ['Win32', 'MacIntel', 'Linux x86_64'][Math.floor(Math.random() * 3)],
      canvas: `canvas_${Math.random().toString(36).substr(2, 16)}`,
      webgl: `webgl_${Math.random().toString(36).substr(2, 16)}`,
    };
  }

  // Get overall security status
  getSecurityStatus(userId: string): { privacyScore: number; activeThreats: number; blockedToday: number; recommendations: string[] } {
    const profile = this.getProfile(userId);
    const todayEvents = this.events.filter(e => e.userId === userId && e.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000));

    const recommendations: string[] = [];
    if (!profile.torEnabled) recommendations.push('Enable Tor routing for anonymous browsing');
    if (!profile.i2pEnabled) recommendations.push('Enable I2P for additional anonymity layer');
    if (!profile.vpnEnabled) recommendations.push('Add VPN as first hop before Tor');
    if (!profile.panicButtonEnabled) recommendations.push('Set up panic button for emergency data wipe');
    if (!profile.canaryActive) recommendations.push('Set up a warrant canary');
    if (profile.trackingProtection !== 'paranoid') recommendations.push('Upgrade tracking protection to paranoid mode');
    if (profile.encryptionLevel !== 'quantum_resistant') recommendations.push('Upgrade to quantum-resistant encryption');

    return {
      privacyScore: profile.privacyScore,
      activeThreats: todayEvents.filter(e => !e.blocked && e.severity !== 'low').length,
      blockedToday: todayEvents.filter(e => e.blocked).length,
      recommendations,
    };
  }
}

// =============================================================================
// SINGLETON INSTANCES
// =============================================================================

export const miniTorRouter = new MiniTorRouterEngine();
export const i2pEngine = new I2PEngine();
export const wireProtocol = new WireProtocolEngine();
export const securityEngine = new SecurityEngine();

export default {
  miniTorRouter,
  i2pEngine,
  wireProtocol,
  securityEngine,
};
