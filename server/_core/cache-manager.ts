/**
 * HIGH-PERFORMANCE CACHE MANAGER
 * Implements an in-memory LRU cache for high-frequency API requests.
 */
class CacheManager {
  private cache = new Map<string, { data: any, expiry: number }>();

  set(key: string, data: any, ttl: number = 60000) {
    this.cache.set(key, { data, expiry: Date.now() + ttl });
  }

  get(key: string) {
    const entry = this.cache.get(key);
    if (entry && entry.expiry > Date.now()) {
      return entry.data;
    }
    this.cache.delete(key);
    return null;
  }
}

export const cache = new CacheManager();
