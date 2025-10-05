const cacheService = require('../services/cacheService');

// Rate limiting middleware factory
const createRateLimit = (type, limit, windowSeconds = 3600, message) => {
  return async (req, res, next) => {
    try {
      // Get identifier (user ID if authenticated, IP if not)
      const identifier = req.user ? 
        `${type}:user:${req.user.id}` : 
        `${type}:ip:${req.ip}`;

      // Check rate limit
      const result = await cacheService.rateLimit(identifier, limit, windowSeconds);
      
      if (!result.success) {
        // If cache is not available, allow the request but log the issue
        console.warn('Rate limiting unavailable, allowing request');
        return next();
      }

      // Add rate limit headers
      res.set({
        'X-RateLimit-Limit': limit,
        'X-RateLimit-Remaining': result.remaining,
        'X-RateLimit-Reset': result.resetTime
      });

      if (result.isLimited) {
        return res.status(429).json({
          success: false,
          error: message || 'Too many requests',
          retryAfter: result.resetTime - Math.floor(Date.now() / 1000)
        });
      }

      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      // Don't block requests if rate limiting fails
      next();
    }
  };
};

// Pre-configured rate limiters
const rateLimiters = {
  // General API rate limiting
  api: createRateLimit('api', 1000, 3600, 'API rate limit exceeded'), // 1000 requests per hour
  
  // Authentication rate limiting
  auth: createRateLimit('auth', 10, 900, 'Too many authentication attempts'), // 10 attempts per 15 minutes
  
  // Search rate limiting
  search: createRateLimit('search', 100, 3600, 'Search rate limit exceeded'), // 100 searches per hour
  
  // Upload rate limiting
  upload: createRateLimit('upload', 50, 3600, 'Upload rate limit exceeded'), // 50 uploads per hour
  
  // Chat message rate limiting
  chat: createRateLimit('chat', 200, 3600, 'Chat rate limit exceeded'), // 200 messages per hour
  
  // Email rate limiting
  email: createRateLimit('email', 20, 3600, 'Email rate limit exceeded'), // 20 emails per hour
  
  // Password reset rate limiting
  password_reset: createRateLimit('password_reset', 5, 3600, 'Too many password reset attempts'), // 5 per hour
  
  // Course enrollment rate limiting
  enrollment: createRateLimit('enrollment', 10, 3600, 'Too many enrollment attempts'), // 10 per hour
  
  // Payment processing rate limiting
  payment: createRateLimit('payment', 20, 3600, 'Payment rate limit exceeded'), // 20 payments per hour
  
  // Video streaming rate limiting
  video: createRateLimit('video', 500, 3600, 'Video streaming rate limit exceeded'), // 500 requests per hour
  
  // Analytics requests rate limiting
  analytics: createRateLimit('analytics', 100, 3600, 'Analytics rate limit exceeded'), // 100 requests per hour
  
  // Contact/support rate limiting
  contact: createRateLimit('contact', 5, 3600, 'Too many contact submissions'), // 5 per hour
  
  // Review/rating rate limiting
  review: createRateLimit('review', 10, 86400, 'Too many review submissions') // 10 per day
};

// Custom rate limiter function
const customRateLimit = (type, limit, windowSeconds, message) => {
  return createRateLimit(type, limit, windowSeconds, message);
};

// IP-based rate limiter (for non-authenticated users)
const ipRateLimit = (type, limit, windowSeconds = 3600, message) => {
  return async (req, res, next) => {
    try {
      const identifier = `${type}:ip:${req.ip}`;
      
      const result = await cacheService.rateLimit(identifier, limit, windowSeconds);
      
      if (!result.success) {
        console.warn('IP rate limiting unavailable, allowing request');
        return next();
      }

      res.set({
        'X-RateLimit-Limit': limit,
        'X-RateLimit-Remaining': result.remaining,
        'X-RateLimit-Reset': result.resetTime
      });

      if (result.isLimited) {
        return res.status(429).json({
          success: false,
          error: message || 'Too many requests from this IP',
          retryAfter: result.resetTime - Math.floor(Date.now() / 1000)
        });
      }

      next();
    } catch (error) {
      console.error('IP rate limiting error:', error);
      next();
    }
  };
};

// Burst protection (short-term high-rate protection)
const burstProtection = (limit = 10, windowSeconds = 60) => {
  return async (req, res, next) => {
    try {
      const identifier = req.user ? 
        `burst:user:${req.user.id}` : 
        `burst:ip:${req.ip}`;

      const result = await cacheService.rateLimit(identifier, limit, windowSeconds);
      
      if (!result.success) {
        return next();
      }

      if (result.isLimited) {
        return res.status(429).json({
          success: false,
          error: 'Request rate too high, please slow down',
          retryAfter: windowSeconds
        });
      }

      next();
    } catch (error) {
      console.error('Burst protection error:', error);
      next();
    }
  };
};

// Skip rate limiting for certain conditions
const skipRateLimit = (skipCondition) => {
  return (req, res, next) => {
    if (typeof skipCondition === 'function' && skipCondition(req)) {
      return next();
    }
    return next();
  };
};

// Admin bypass (admins get higher limits)
const adminBypass = (regularLimit, adminLimit, windowSeconds = 3600) => {
  return (req, res, next) => {
    const limit = req.user && req.user.role === 'admin' ? adminLimit : regularLimit;
    const type = req.route ? req.route.path : 'general';
    
    return createRateLimit(type, limit, windowSeconds)(req, res, next);
  };
};

// Dynamic rate limiting based on user subscription
const subscriptionRateLimit = (limits = {}) => {
  const defaultLimits = {
    free: 100,
    basic: 200,
    premium: 500,
    admin: 10000
  };
  
  const finalLimits = { ...defaultLimits, ...limits };
  
  return (req, res, next) => {
    const userType = req.user ? 
      (req.user.subscription || 'free') : 
      'free';
    
    const limit = finalLimits[userType] || finalLimits.free;
    const type = req.route ? req.route.path : 'general';
    
    return createRateLimit(type, limit, 3600)(req, res, next);
  };
};

// Exponential backoff for repeated violations
const exponentialBackoff = (baseLimit, maxLimit, backoffFactor = 2) => {
  return async (req, res, next) => {
    try {
      const identifier = req.user ? req.user.id : req.ip;
      const violationKey = `violations:${identifier}`;
      
      // Get violation count
      const violationResult = await cacheService.get(violationKey);
      const violations = violationResult.success && violationResult.data ? 
        violationResult.data : 0;
      
      // Calculate current limit with backoff
      const currentLimit = Math.min(
        baseLimit / Math.pow(backoffFactor, violations),
        maxLimit
      );
      
      const result = await cacheService.rateLimit(
        `backoff:${identifier}`, 
        Math.max(1, Math.floor(currentLimit)), 
        3600
      );
      
      if (!result.success) {
        return next();
      }

      if (result.isLimited) {
        // Increment violation count
        await cacheService.set(violationKey, violations + 1, 24 * 3600); // 24 hours
        
        return res.status(429).json({
          success: false,
          error: 'Rate limit exceeded with exponential backoff',
          currentLimit: Math.floor(currentLimit),
          violations: violations + 1,
          retryAfter: result.resetTime - Math.floor(Date.now() / 1000)
        });
      }

      next();
    } catch (error) {
      console.error('Exponential backoff error:', error);
      next();
    }
  };
};

// Rate limit status endpoint helper
const getRateLimitStatus = async (identifier, types = []) => {
  const status = {};
  
  for (const type of types) {
    try {
      const key = `${type}:${identifier}`;
      const result = await cacheService.rateLimit(key, 1, 3600);
      
      if (result.success) {
        status[type] = {
          current: result.current - 1, // Subtract the test request
          remaining: result.remaining + 1,
          resetTime: result.resetTime,
          isLimited: result.isLimited
        };
      }
    } catch (error) {
      status[type] = { error: 'Unable to check status' };
    }
  }
  
  return status;
};

module.exports = {
  // Main rate limiters
  ...rateLimiters,
  
  // Custom rate limiter functions
  customRateLimit,
  ipRateLimit,
  burstProtection,
  skipRateLimit,
  adminBypass,
  subscriptionRateLimit,
  exponentialBackoff,
  
  // Utility functions
  getRateLimitStatus
};
