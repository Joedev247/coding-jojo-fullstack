const express = require('express');
const router = express.Router();
const searchService = require('../services/searchService');
const analyticsService = require('../services/analyticsService');
const cacheService = require('../services/cacheService');
const { auth } = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimit');

// Search endpoints
router.get('/search/courses', rateLimit.search, async (req, res) => {
  try {
    const { q: query, page, limit, category, level, price_min, price_max, rating, sort } = req.query;

    const cacheKey = cacheService.generateKey('search_courses', 
      cacheService.generateHashKey({ query, page, limit, category, level, price_min, price_max, rating, sort })
    );

    // Try cache first
    const cached = await cacheService.get(cacheKey);
    if (cached.success && cached.data) {
      return res.json({ ...cached.data, fromCache: true });
    }

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      category,
      level,
      priceRange: price_min || price_max ? {
        min: parseFloat(price_min) || 0,
        max: parseFloat(price_max) || 10000
      } : undefined,
      rating: rating ? parseFloat(rating) : undefined,
      sortBy: sort
    };

    const result = await searchService.searchCourses(query, options);
    
    if (result.success) {
      // Cache for 5 minutes
      await cacheService.set(cacheKey, result, 300);
      
      // Track search analytics
      if (req.user) {
        await analyticsService.trackUserActivity(req.user.id, 'search', {
          data: { query, category, level, resultsCount: result.data?.total || 0 }
        });
      }
    }

    res.json(result);
  } catch (error) {
    console.error('Search courses error:', error);
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

router.get('/search/instructors', rateLimit.search, async (req, res) => {
  try {
    const { q: query, page, limit, skills, location, sort } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      role: 'instructor',
      skills: skills ? skills.split(',') : undefined,
      location,
      sortBy: sort
    };

    const result = await searchService.searchUsers(query, options);
    
    if (result.success && req.user) {
      await analyticsService.trackUserActivity(req.user.id, 'search_instructors', {
        data: { query, skills, location, resultsCount: result.data?.total || 0 }
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Search instructors error:', error);
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

router.get('/search/lessons', auth, async (req, res) => {
  try {
    const { q: query, course_id: courseId, type, page, limit } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      courseId,
      type
    };

    const result = await searchService.searchLessons(query, options);
    
    if (result.success) {
      await analyticsService.trackUserActivity(req.user.id, 'search_lessons', {
        data: { query, courseId, type, resultsCount: result.data?.total || 0 }
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Search lessons error:', error);
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

router.get('/search/suggestions', rateLimit.search, async (req, res) => {
  try {
    const { q: query, type = 'courses' } = req.query;

    if (!query || query.length < 2) {
      return res.json({ success: true, data: [] });
    }

    const result = await searchService.getSuggestions(type, query, 10);
    res.json(result);
  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({ success: false, error: 'Suggestions failed' });
  }
});

// Analytics endpoints
router.get('/analytics/dashboard', auth, async (req, res) => {
  try {
    // Only allow instructors and admins to view analytics
    if (!['instructor', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const { days = 30 } = req.query;
    const cacheKey = cacheService.generateKey('dashboard_analytics', req.user.id, days);

    // Try cache first (1 hour TTL)
    const cached = await cacheService.get(cacheKey);
    if (cached.success && cached.data) {
      return res.json({ ...cached.data, fromCache: true });
    }

    const result = await analyticsService.getDashboardAnalytics(parseInt(days));
    
    if (result.success) {
      await cacheService.set(cacheKey, result, 3600); // Cache for 1 hour
    }

    res.json(result);
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({ success: false, error: 'Analytics failed' });
  }
});

router.get('/analytics/course/:courseId', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { days = 30 } = req.query;

    // Check if user has access to this course analytics
    if (req.user.role !== 'admin') {
      // TODO: Check if user is the instructor of this course
    }

    const cacheKey = cacheService.generateKey('course_analytics', courseId, days);
    
    // Try cache first (30 minutes TTL)
    const cached = await cacheService.get(cacheKey);
    if (cached.success && cached.data) {
      return res.json({ ...cached.data, fromCache: true });
    }

    const result = await analyticsService.getCourseAnalytics(courseId, parseInt(days));
    
    if (result.success) {
      await cacheService.set(cacheKey, result, 1800); // Cache for 30 minutes
    }

    res.json(result);
  } catch (error) {
    console.error('Course analytics error:', error);
    res.status(500).json({ success: false, error: 'Analytics failed' });
  }
});

router.get('/analytics/user', auth, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const userId = req.user.id;

    const cacheKey = cacheService.generateKey('user_analytics', userId, days);
    
    // Try cache first (15 minutes TTL)
    const cached = await cacheService.get(cacheKey);
    if (cached.success && cached.data) {
      return res.json({ ...cached.data, fromCache: true });
    }

    const result = await analyticsService.getUserAnalytics(userId, parseInt(days));
    
    if (result.success) {
      await cacheService.set(cacheKey, result, 900); // Cache for 15 minutes
    }

    res.json(result);
  } catch (error) {
    console.error('User analytics error:', error);
    res.status(500).json({ success: false, error: 'Analytics failed' });
  }
});

router.get('/analytics/reports/:type', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }

    const { type } = req.params;
    const { days = 30, format = 'json', courseId } = req.query;

    const options = {
      dateRange: parseInt(days),
      format,
      courseId
    };

    const result = await analyticsService.generateReport(type, options);
    
    if (result.success && format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${type}-report.csv"`);
      return res.send(result.data);
    }

    res.json(result);
  } catch (error) {
    console.error('Analytics reports error:', error);
    res.status(500).json({ success: false, error: 'Report generation failed' });
  }
});

// Cache management endpoints
router.get('/cache/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }

    const result = await cacheService.getStats();
    res.json(result);
  } catch (error) {
    console.error('Cache stats error:', error);
    res.status(500).json({ success: false, error: 'Failed to get cache stats' });
  }
});

router.post('/cache/clear', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }

    const { pattern } = req.body;
    
    if (!pattern) {
      return res.status(400).json({ success: false, error: 'Pattern required' });
    }

    const result = await cacheService.clearPattern(pattern);
    res.json(result);
  } catch (error) {
    console.error('Cache clear error:', error);
    res.status(500).json({ success: false, error: 'Failed to clear cache' });
  }
});

router.delete('/cache/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Users can only clear their own cache, admins can clear any
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const result = await cacheService.invalidateUserCache(userId);
    res.json(result);
  } catch (error) {
    console.error('User cache clear error:', error);
    res.status(500).json({ success: false, error: 'Failed to clear user cache' });
  }
});

router.delete('/cache/course/:courseId', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Only instructors of the course or admins can clear course cache
    if (req.user.role !== 'admin') {
      // TODO: Check if user is the instructor of this course
    }

    const result = await cacheService.invalidateCourseCache(courseId);
    res.json(result);
  } catch (error) {
    console.error('Course cache clear error:', error);
    res.status(500).json({ success: false, error: 'Failed to clear course cache' });
  }
});

// Online users endpoints
router.get('/users/online', auth, async (req, res) => {
  try {
    const result = await cacheService.getOnlineUsers();
    res.json(result);
  } catch (error) {
    console.error('Online users error:', error);
    res.status(500).json({ success: false, error: 'Failed to get online users' });
  }
});

router.post('/users/online', auth, async (req, res) => {
  try {
    const result = await cacheService.setUserOnline(req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Set user online error:', error);
    res.status(500).json({ success: false, error: 'Failed to set user online' });
  }
});

// Course view tracking
router.post('/courses/:courseId/view', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Track view in analytics
    await analyticsService.updateCourseAnalytics(courseId, 'views', 1, { userId });
    
    // Track view in cache
    await cacheService.trackCourseView(courseId, userId);

    // Track user activity
    await analyticsService.trackUserActivity(userId, 'course_view', {
      resource: courseId,
      data: { timestamp: new Date() }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Course view tracking error:', error);
    res.status(500).json({ success: false, error: 'Failed to track view' });
  }
});

router.get('/courses/:courseId/views', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { days = 7 } = req.query;

    // Check access permissions
    if (req.user.role !== 'admin') {
      // TODO: Check if user is the instructor of this course
    }

    const result = await cacheService.getCourseViews(courseId, parseInt(days));
    res.json(result);
  } catch (error) {
    console.error('Course views error:', error);
    res.status(500).json({ success: false, error: 'Failed to get course views' });
  }
});

// Leaderboard endpoints
router.get('/leaderboard/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 50 } = req.query;

    const cacheKey = cacheService.generateKey('leaderboard_cache', type);
    
    // Try cache first (10 minutes TTL)
    const cached = await cacheService.get(cacheKey);
    if (cached.success && cached.data) {
      return res.json({ ...cached.data, fromCache: true });
    }

    const result = await cacheService.getLeaderboard(type, 0, parseInt(limit) - 1);
    
    if (result.success) {
      await cacheService.set(cacheKey, result, 600); // Cache for 10 minutes
    }

    res.json(result);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ success: false, error: 'Failed to get leaderboard' });
  }
});

router.post('/leaderboard/:type/score', auth, async (req, res) => {
  try {
    const { type } = req.params;
    const { score } = req.body;
    const userId = req.user.id;

    if (typeof score !== 'number') {
      return res.status(400).json({ success: false, error: 'Score must be a number' });
    }

    const result = await cacheService.updateLeaderboard(type, userId, score);
    
    if (result.success) {
      // Clear leaderboard cache
      const cacheKey = cacheService.generateKey('leaderboard_cache', type);
      await cacheService.delete(cacheKey);
    }

    res.json(result);
  } catch (error) {
    console.error('Update leaderboard error:', error);
    res.status(500).json({ success: false, error: 'Failed to update leaderboard' });
  }
});

// Rate limiting info
router.get('/rate-limit/status', auth, rateLimit.api, async (req, res) => {
  try {
    const identifier = req.user.id;
    const limits = {
      api: await cacheService.rateLimit(identifier, 1000, 3600), // 1000 per hour
      search: await cacheService.rateLimit(`search:${identifier}`, 100, 3600), // 100 per hour
      upload: await cacheService.rateLimit(`upload:${identifier}`, 50, 3600) // 50 per hour
    };

    res.json({
      success: true,
      limits: {
        api: limits.api.success ? {
          current: limits.api.current,
          remaining: limits.api.remaining,
          resetTime: limits.api.resetTime,
          isLimited: limits.api.isLimited
        } : null,
        search: limits.search.success ? {
          current: limits.search.current,
          remaining: limits.search.remaining,
          resetTime: limits.search.resetTime,
          isLimited: limits.search.isLimited
        } : null,
        upload: limits.upload.success ? {
          current: limits.upload.current,
          remaining: limits.upload.remaining,
          resetTime: limits.upload.resetTime,
          isLimited: limits.upload.isLimited
        } : null
      }
    });
  } catch (error) {
    console.error('Rate limit status error:', error);
    res.status(500).json({ success: false, error: 'Failed to get rate limit status' });
  }
});

// System health check
router.get('/health', async (req, res) => {
  try {
    const [cacheStats, searchHealth] = await Promise.all([
      cacheService.getStats(),
      // Add search service health check when available
      Promise.resolve({ success: true, status: 'connected' })
    ]);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      services: {
        cache: {
          connected: cacheStats.success && cacheStats.stats?.connected,
          totalKeys: cacheStats.stats?.totalKeys || 0
        },
        search: {
          connected: searchHealth.success
        },
        analytics: {
          connected: true // MongoDB connection assumed
        }
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      success: false,
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
