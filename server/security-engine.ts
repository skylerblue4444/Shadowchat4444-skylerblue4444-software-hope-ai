/**
 * Security Engine - 2FA, rate limiting, fraud detection
 */
import { EventEmitter } from 'events';

interface SecurityEvent {
  id: string;
  userId: string;
  type: 'login' | 'logout' | 'failed_login' | 'api_call' | 'large_trade' | 'withdrawal';
  severity: 'low' | 'medium' | 'high';
  details: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
}

class SecurityEngine extends EventEmitter {
  private events: Map<string, SecurityEvent> = new Map();
  private rateLimits: Map<string, { count: number; resetTime: number }> = new Map();
  private suspiciousIPs: Set<string> = new Set();
  private twoFAEnabled: Map<string, boolean> = new Map();

  trackSecurityEvent(
    userId: string,
    type: SecurityEvent['type'],
    severity: SecurityEvent['severity'],
    details: Record<string, any>,
    ipAddress: string
  ): SecurityEvent {
    const event: SecurityEvent = {
      id: `sec_${Date.now()}_${Math.random()}`,
      userId,
      type,
      severity,
      details,
      timestamp: new Date(),
      ipAddress,
    };

    this.events.set(event.id, event);
    this.emit('security:event', event);

    if (severity === 'high') {
      this.emit('security:alert', event);
    }

    return event;
  }

  checkRateLimit(userId: string, limit: number = 100, windowSeconds: number = 60): boolean {
    const key = `rate_${userId}`;
    const now = Date.now();
    const existing = this.rateLimits.get(key);

    if (!existing || now > existing.resetTime) {
      this.rateLimits.set(key, { count: 1, resetTime: now + windowSeconds * 1000 });
      return true;
    }

    if (existing.count >= limit) {
      return false;
    }

    existing.count++;
    return true;
  }

  enable2FA(userId: string): { secret: string; qrCode: string } {
    this.twoFAEnabled.set(userId, true);
    const secret = `2fa_secret_${Math.random().toString(36).substr(2, 32)}`;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(secret)}`;

    this.emit('2fa:enabled', { userId, secret });
    return { secret, qrCode };
  }

  disable2FA(userId: string): void {
    this.twoFAEnabled.set(userId, false);
    this.emit('2fa:disabled', { userId });
  }

  is2FAEnabled(userId: string): boolean {
    return this.twoFAEnabled.get(userId) || false;
  }

  flagSuspiciousIP(ipAddress: string): void {
    this.suspiciousIPs.add(ipAddress);
    this.emit('ip:flagged', { ipAddress });
  }

  isSuspiciousIP(ipAddress: string): boolean {
    return this.suspiciousIPs.has(ipAddress);
  }

  getSecurityEvents(userId: string, limit: number = 50): SecurityEvent[] {
    return Array.from(this.events.values())
      .filter((e) => e.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

export { SecurityEngine, SecurityEvent };
