const Redis = require('redis');
const crypto = require('crypto');

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.defaultTTL = 3600; // 1 hour in seconds
    this.redisEnabled = process.env.REDIS_ENABLED === 'true';
    
    if (this.redisEnabled) {
      console.log('✓ Redis enabled for cache service');
      this.initializeClient();
    } else {
      console.log('✓ Redis disabled for cache service');
      // Create a no-op redis mock to prevent any connection attempts
      this.client = {
        get: async () => null,
        set: async () => {},
        del: async () => {},
        exists: async () => false,
        keys: async () => [],
        flushall: async () => {},
        info: async () => '',
        connect: async () => {},
        disconnect: async () => {},
        on: () => {}
      };
    }
  }

  async initializeClient() {
    // Completely skip Redis when disabled
    if (!this.redisEnabled) {
      return;
    }

    // Don't even attempt connection if Redis is disabled globally
    if (process.env.REDIS_ENABLED === 'false') {
      this.redisEnabled = false;
      this.isConnected = false;
      return;
    }

    try {
      this.client = Redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        socket: {
          connectTimeout: 3000,
          lazyConnect: true
        },
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 1
      });

      this.client.on('error', (err) => {
        console.log('⚠️ Redis Client Error, disabling cache for this session');
        this.isConnected = false;
        this.redisEnabled = false;
        this.client = null;
      });

      this.client.on('connect', () => {
        console.log('✓ Redis Client Connected');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        console.log('✓ Redis Client Ready');
      });

      await this.client.connect();
    } catch (error) {
      console.log('⚠️ Failed to connect to Redis, disabling cache for this session');
      this.isConnected = false;
      this.redisEnabled = false;
      this.client = null;
    }
  }

  // Generate cache key
  generateKey(prefix, ...parts) {
    const keyParts = [prefix, ...parts].filter(Boolean);
    return keyParts.join(':');
  }

  // Generate hash key for complex objects
  generateHashKey(obj) {
    const str = JSON.stringify(obj, Object.keys(obj).sort());
    return crypto.createHash('md5').update(str).digest('hex');
  }

  // Set cache with TTL
  async set(key, value, ttl = this.defaultTTL) {
    if (!this.isConnected || !this.redisEnabled) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const serializedValue = JSON.stringify(value);
      await this.client.setEx(key, ttl, serializedValue);
      return { success: true };
    } catch (error) {
      console.error('Cache set error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get from cache
  async get(key) {
    if (!this.isConnected || !this.redisEnabled) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const value = await this.client.get(key);
      if (value === null) {
        return { success: true, data: null };
      }
      
      const parsedValue = JSON.parse(value);
      return { success: true, data: parsedValue };
    } catch (error) {
      console.error('Cache get error:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete from cache
  async delete(key) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.del(key);
      return { success: true, deleted: result };
    } catch (error) {
      console.error('Cache delete error:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if key exists
  async exists(key) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.exists(key);
      return { success: true, exists: result === 1 };
    } catch (error) {
      console.error('Cache exists error:', error);
      return { success: false, error: error.message };
    }
  }

  // Set TTL for existing key
  async expire(key, ttl) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.expire(key, ttl);
      return { success: true, set: result === 1 };
    } catch (error) {
      console.error('Cache expire error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get TTL for key
  async ttl(key) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.ttl(key);
      return { success: true, ttl: result };
    } catch (error) {
      console.error('Cache TTL error:', error);
      return { success: false, error: error.message };
    }
  }

  // Clear all cache with pattern
  async clearPattern(pattern) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
      return { success: true, cleared: keys.length };
    } catch (error) {
      console.error('Cache clear pattern error:', error);
      return { success: false, error: error.message };
    }
  }

  // Increment counter
  async increment(key, amount = 1, ttl = this.defaultTTL) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.incrBy(key, amount);
      if (result === amount) {
        // First time setting, add TTL
        await this.client.expire(key, ttl);
      }
      return { success: true, value: result };
    } catch (error) {
      console.error('Cache increment error:', error);
      return { success: false, error: error.message };
    }
  }

  // Decrement counter
  async decrement(key, amount = 1) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.decrBy(key, amount);
      return { success: true, value: result };
    } catch (error) {
      console.error('Cache decrement error:', error);
      return { success: false, error: error.message };
    }
  }

  // Add to set
  async sadd(key, ...members) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.sAdd(key, members);
      return { success: true, added: result };
    } catch (error) {
      console.error('Cache sadd error:', error);
      return { success: false, error: error.message };
    }
  }

  // Remove from set
  async srem(key, ...members) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.sRem(key, members);
      return { success: true, removed: result };
    } catch (error) {
      console.error('Cache srem error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get set members
  async smembers(key) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.sMembers(key);
      return { success: true, members: result };
    } catch (error) {
      console.error('Cache smembers error:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if member exists in set
  async sismember(key, member) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.sIsMember(key, member);
      return { success: true, isMember: result };
    } catch (error) {
      console.error('Cache sismember error:', error);
      return { success: false, error: error.message };
    }
  }

  // Push to list (left)
  async lpush(key, ...values) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.lPush(key, values);
      return { success: true, length: result };
    } catch (error) {
      console.error('Cache lpush error:', error);
      return { success: false, error: error.message };
    }
  }

  // Pop from list (right)
  async rpop(key) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.rPop(key);
      return { success: true, value: result };
    } catch (error) {
      console.error('Cache rpop error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get list range
  async lrange(key, start = 0, stop = -1) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.lRange(key, start, stop);
      return { success: true, values: result };
    } catch (error) {
      console.error('Cache lrange error:', error);
      return { success: false, error: error.message };
    }
  }

  // Hash operations
  async hset(key, field, value) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const serializedValue = JSON.stringify(value);
      const result = await this.client.hSet(key, field, serializedValue);
      return { success: true, set: result };
    } catch (error) {
      console.error('Cache hset error:', error);
      return { success: false, error: error.message };
    }
  }

  async hget(key, field) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.hGet(key, field);
      if (result === null) {
        return { success: true, data: null };
      }
      
      const parsedValue = JSON.parse(result);
      return { success: true, data: parsedValue };
    } catch (error) {
      console.error('Cache hget error:', error);
      return { success: false, error: error.message };
    }
  }

  async hgetall(key) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const result = await this.client.hGetAll(key);
      const parsed = {};
      for (const [field, value] of Object.entries(result)) {
        try {
          parsed[field] = JSON.parse(value);
        } catch {
          parsed[field] = value;
        }
      }
      return { success: true, data: parsed };
    } catch (error) {
      console.error('Cache hgetall error:', error);
      return { success: false, error: error.message };
    }
  }

  // Cache wrapper function
  async cache(key, fetchFunction, ttl = this.defaultTTL) {
    // Try to get from cache first
    const cached = await this.get(key);
    if (cached.success && cached.data !== null) {
      return { success: true, data: cached.data, fromCache: true };
    }

    try {
      // Fetch fresh data
      const freshData = await fetchFunction();
      
      // Cache the result
      await this.set(key, freshData, ttl);
      
      return { success: true, data: freshData, fromCache: false };
    } catch (error) {
      console.error('Cache wrapper error:', error);
      return { success: false, error: error.message };
    }
  }

  // Cache invalidation patterns
  async invalidateUserCache(userId) {
    const patterns = [
      `user:${userId}:*`,
      `profile:${userId}:*`,
      `courses:user:${userId}:*`,
      `enrollment:${userId}:*`
    ];

    const results = await Promise.all(
      patterns.map(pattern => this.clearPattern(pattern))
    );

    return { success: true, results };
  }

  async invalidateCourseCache(courseId) {
    const patterns = [
      `course:${courseId}:*`,
      `lessons:${courseId}:*`,
      `reviews:${courseId}:*`,
      `analytics:${courseId}:*`
    ];

    const results = await Promise.all(
      patterns.map(pattern => this.clearPattern(pattern))
    );

    return { success: true, results };
  }

  // Session management
  async setSession(sessionId, userData, ttl = 24 * 60 * 60) { // 24 hours
    const key = this.generateKey('session', sessionId);
    return await this.set(key, userData, ttl);
  }

  async getSession(sessionId) {
    const key = this.generateKey('session', sessionId);
    return await this.get(key);
  }

  async deleteSession(sessionId) {
    const key = this.generateKey('session', sessionId);
    return await this.delete(key);
  }

  // Rate limiting
  async rateLimit(identifier, limit, window = 3600) {
    const key = this.generateKey('rate_limit', identifier, Math.floor(Date.now() / (window * 1000)));
    
    const current = await this.increment(key, 1, window);
    if (!current.success) {
      return { success: false, error: current.error };
    }

    const isLimited = current.value > limit;
    const remaining = Math.max(0, limit - current.value);

    return {
      success: true,
      isLimited,
      current: current.value,
      remaining,
      resetTime: Math.ceil(Date.now() / 1000) + window
    };
  }

  // Online users tracking
  async setUserOnline(userId, ttl = 300) { // 5 minutes
    const key = this.generateKey('online', userId);
    return await this.set(key, { timestamp: Date.now() }, ttl);
  }

  async removeUserOnline(userId) {
    const key = this.generateKey('online', userId);
    return await this.delete(key);
  }

  async getOnlineUsers() {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const keys = await this.client.keys('online:*');
      const userIds = keys.map(key => key.split(':')[1]);
      return { success: true, users: userIds };
    } catch (error) {
      console.error('Get online users error:', error);
      return { success: false, error: error.message };
    }
  }

  // Course views tracking
  async trackCourseView(courseId, userId) {
    const dailyKey = this.generateKey('views', courseId, new Date().toISOString().split('T')[0]);
    const uniqueKey = this.generateKey('unique_views', courseId);
    
    // Increment daily views
    await this.increment(dailyKey, 1, 24 * 60 * 60); // 24 hours TTL
    
    // Add to unique viewers set
    await this.sadd(uniqueKey, userId);
    await this.expire(uniqueKey, 30 * 24 * 60 * 60); // 30 days TTL
  }

  async getCourseViews(courseId, days = 7) {
    const views = [];
    const uniqueViewers = await this.smembers(this.generateKey('unique_views', courseId));

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const key = this.generateKey('views', courseId, dateStr);
      const dayViews = await this.get(key);
      
      views.push({
        date: dateStr,
        views: dayViews.success && dayViews.data ? parseInt(dayViews.data) : 0
      });
    }

    return {
      success: true,
      dailyViews: views.reverse(),
      uniqueViewers: uniqueViewers.success ? uniqueViewers.members.length : 0
    };
  }

  // Search result caching
  async cacheSearchResults(query, filters, results, ttl = 300) { // 5 minutes
    const hashKey = this.generateHashKey({ query, filters });
    const key = this.generateKey('search', hashKey);
    return await this.set(key, results, ttl);
  }

  async getCachedSearchResults(query, filters) {
    const hashKey = this.generateHashKey({ query, filters });
    const key = this.generateKey('search', hashKey);
    return await this.get(key);
  }

  // Leaderboard functions
  async updateLeaderboard(leaderboardName, userId, score) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const key = this.generateKey('leaderboard', leaderboardName);
      await this.client.zAdd(key, { score, value: userId });
      return { success: true };
    } catch (error) {
      console.error('Update leaderboard error:', error);
      return { success: false, error: error.message };
    }
  }

  async getLeaderboard(leaderboardName, start = 0, stop = -1, withScores = true) {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const key = this.generateKey('leaderboard', leaderboardName);
      const result = withScores 
        ? await this.client.zRangeWithScores(key, start, stop, { REV: true })
        : await this.client.zRange(key, start, stop, { REV: true });
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Get leaderboard error:', error);
      return { success: false, error: error.message };
    }
  }

  // Cache statistics
  async getStats() {
    if (!this.isConnected) {
      return { success: false, error: 'Cache not available' };
    }

    try {
      const info = await this.client.info();
      const dbSize = await this.client.dbSize();
      
      return {
        success: true,
        stats: {
          connected: this.isConnected,
          totalKeys: dbSize,
          info: this.parseRedisInfo(info)
        }
      };
    } catch (error) {
      console.error('Get cache stats error:', error);
      return { success: false, error: error.message };
    }
  }

  parseRedisInfo(info) {
    const lines = info.split('\r\n');
    const parsed = {};
    
    lines.forEach(line => {
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split(':');
        if (key && value) {
          parsed[key] = isNaN(value) ? value : Number(value);
        }
      }
    });
    
    return parsed;
  }

  // Cleanup and maintenance
  async cleanup() {
    const patterns = [
      'session:*', // Old sessions
      'rate_limit:*', // Old rate limit entries
      'views:*', // Old view counts
      'search:*' // Old search results
    ];

    const results = {};
    for (const pattern of patterns) {
      try {
        const keys = await this.client.keys(pattern);
        const expiredKeys = [];
        
        for (const key of keys) {
          const ttl = await this.ttl(key);
          if (ttl.success && ttl.ttl === -1) { // No expiry set
            expiredKeys.push(key);
          }
        }
        
        if (expiredKeys.length > 0) {
          await this.client.del(expiredKeys);
          results[pattern] = expiredKeys.length;
        }
      } catch (error) {
        results[pattern] = { error: error.message };
      }
    }

    return { success: true, cleaned: results };
  }

  // Graceful shutdown
  async disconnect() {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
      console.log('Cache service disconnected');
    }
  }
}

module.exports = new CacheService();
