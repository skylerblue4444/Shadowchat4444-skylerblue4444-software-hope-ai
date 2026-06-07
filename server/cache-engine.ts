/**
 * Cache Engine - In-memory caching with TTL
 */
import { EventEmitter } from 'events';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  hits: number;
}

class CacheEngine extends EventEmitter {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private cleanupInterval: NodeJS.Timer;

  constructor(cleanupIntervalMs: number = 60000) {
    super();
    this.cleanupInterval = setInterval(() => this.cleanup(), cleanupIntervalMs);
  }

  set<T>(key: string, value: T, ttlSeconds: number = 3600): void {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
      hits: 0,
    });
    this.emit('cache:set', { key, ttl: ttlSeconds });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    entry.hits++;
    this.emit('cache:hit', { key, hits: entry.hits });
    return entry.value as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
    this.emit('cache:delete', { key });
  }

  clear(): void {
    this.cache.clear();
    this.emit('cache:cleared', {});
  }

  private cleanup(): void {
    const now = Date.now();
    let deleted = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        deleted++;
      }
    }

    if (deleted > 0) {
      this.emit('cache:cleanup', { deleted, remaining: this.cache.size });
    }
  }

  getStats(): { size: number; totalHits: number } {
    let totalHits = 0;
    for (const entry of this.cache.values()) {
      totalHits += entry.hits;
    }
    return { size: this.cache.size, totalHits };
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}

export { CacheEngine };
