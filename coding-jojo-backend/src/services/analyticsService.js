const mongoose = require('mongoose');
const Redis = require('redis');

// Analytics Models
const UserActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // 'login', 'logout', 'course_view', 'video_watch', etc.
  resource: { type: String }, // course_id, video_id, etc.
  metadata: { type: Object, default: {} }, // Additional data
  timestamp: { type: Date, default: Date.now },
  sessionId: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  location: {
    country: String,
    city: String,
    coordinates: [Number]
  }
});

const CourseAnalyticsSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  metrics: {
    views: { type: Number, default: 0 },
    enrollments: { type: Number, default: 0 },
    completions: { type: Number, default: 0 },
    dropouts: { type: Number, default: 0 },
    averageWatchTime: { type: Number, default: 0 },
    totalWatchTime: { type: Number, default: 0 },
    uniqueViewers: [{ type: String }],
    revenue: { type: Number, default: 0 },
    refunds: { type: Number, default: 0 }
  }
}, { minimize: false });

const UserEngagementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  metrics: {
    loginCount: { type: Number, default: 0 },
    sessionDuration: { type: Number, default: 0 }, // in minutes
    coursesViewed: { type: Number, default: 0 },
    videosWatched: { type: Number, default: 0 },
    messagesPosted: { type: Number, default: 0 },
    forumPosts: { type: Number, default: 0 },
    questionsAsked: { type: Number, default: 0 },
    answersGiven: { type: Number, default: 0 }
  }
});

const RevenueAnalyticsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  metrics: {
    totalRevenue: { type: Number, default: 0 },
    courseRevenue: { type: Number, default: 0 },
    subscriptionRevenue: { type: Number, default: 0 },
    refunds: { type: Number, default: 0 },
    netRevenue: { type: Number, default: 0 },
    transactionCount: { type: Number, default: 0 },
    averageOrderValue: { type: Number, default: 0 },
    paymentMethods: {
      stripe: { type: Number, default: 0 },
      mobileMoney: { type: Number, default: 0 },
      bank: { type: Number, default: 0 }
    },
    countries: { type: Map, of: Number, default: () => new Map() }
  }
});

// Create models
const UserActivity = mongoose.model('UserActivity', UserActivitySchema);
const CourseAnalytics = mongoose.model('CourseAnalytics', CourseAnalyticsSchema);
const UserEngagement = mongoose.model('UserEngagement', UserEngagementSchema);
const RevenueAnalytics = mongoose.model('RevenueAnalytics', RevenueAnalyticsSchema);

class AnalyticsService {
  constructor() {
    this.redis = null;
    this.redisEnabled = process.env.REDIS_ENABLED === 'true';
    
    if (this.redisEnabled) {
      console.log('✓ Redis enabled for analytics service');
      this.initializeRedis();
    } else {
      console.log('✓ Redis disabled for analytics service');
      // Create a no-op redis mock to prevent any connection attempts
      this.redis = {
        hincrby: async () => {},
        expire: async () => {},
        hgetall: async () => ({}),
        connect: async () => {},
        disconnect: async () => {},
        on: () => {}
      };
    }
  }

  async initializeRedis() {
    if (!this.redisEnabled) {
      return;
    }

    try {
      this.redis = Redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        socket: {
          connectTimeout: 3000,
          lazyConnect: true
        }
      });
      
      this.redis.on('error', (err) => {
        console.log('⚠️ Analytics Redis connection failed, falling back to MongoDB only');
        this.redisEnabled = false;
        this.redis = null;
      });

      await this.redis.connect();
      console.log('✓ Analytics Redis connected');
    } catch (error) {
      console.log('⚠️ Analytics Redis connection failed, falling back to MongoDB only');
      this.redis = null;
      this.redisEnabled = false;
    }
  }

  // Track user activity
  async trackUserActivity(userId, action, metadata = {}) {
    try {
      const activity = new UserActivity({
        userId,
        action,
        resource: metadata.resource,
        metadata: metadata.data || {},
        sessionId: metadata.sessionId,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
        location: metadata.location
      });

      await activity.save();

      // Update real-time metrics in Redis
      if (this.redis && this.redisEnabled) {
        const key = `activity:${new Date().toISOString().split('T')[0]}`;
        await this.redis.hincrby(key, action, 1);
        await this.redis.expire(key, 7 * 24 * 60 * 60); // Expire after 7 days
      }

      return { success: true, activityId: activity._id };
    } catch (error) {
      console.error('Failed to track user activity:', error);
      return { success: false, error: error.message };
    }
  }

  // Update course analytics
  async updateCourseAnalytics(courseId, metric, value = 1, metadata = {}) {
    try {
      const date = new Date().toISOString().split('T')[0];
      
      const update = {};
      update[`metrics.${metric}`] = value;

      // Handle special cases
      if (metric === 'views' && metadata.userId) {
        // Track unique viewers
        const analytics = await CourseAnalytics.findOne({ courseId, date });
        if (analytics) {
          analytics.metrics.uniqueViewers.add(metadata.userId.toString());
          await analytics.save();
        } else {
          const newAnalytics = new CourseAnalytics({
            courseId,
            date,
            metrics: {
              views: 1,
              uniqueViewers: new Set([metadata.userId.toString()])
            }
          });
          await newAnalytics.save();
        }
      } else {
        await CourseAnalytics.findOneAndUpdate(
          { courseId, date },
          { $inc: update },
          { upsert: true, new: true }
        );
      }

      // Update Redis cache
      if (this.redis && this.redisEnabled) {
        const key = `course_analytics:${courseId}:${date}`;
        await this.redis.hincrby(key, metric, value);
        await this.redis.expire(key, 30 * 24 * 60 * 60); // Expire after 30 days
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to update course analytics:', error);
      return { success: false, error: error.message };
    }
  }

  // Track user engagement
  async trackUserEngagement(userId, metric, value = 1) {
    try {
      const date = new Date().toISOString().split('T')[0];
      
      const update = {};
      update[`metrics.${metric}`] = value;

      await UserEngagement.findOneAndUpdate(
        { userId, date },
        { $inc: update },
        { upsert: true, new: true }
      );

      return { success: true };
    } catch (error) {
      console.error('Failed to track user engagement:', error);
      return { success: false, error: error.message };
    }
  }

  // Track revenue
  async trackRevenue(amount, paymentMethod, metadata = {}) {
    try {
      const date = new Date().toISOString().split('T')[0];
      
      const update = {
        $inc: {
          'metrics.totalRevenue': amount,
          'metrics.transactionCount': 1,
          [`metrics.paymentMethods.${paymentMethod}`]: amount
        }
      };

      // Track by country if provided
      if (metadata.country) {
        update.$inc[`metrics.countries.${metadata.country}`] = amount;
      }

      // Track course vs subscription revenue
      if (metadata.type === 'course') {
        update.$inc['metrics.courseRevenue'] = amount;
      } else if (metadata.type === 'subscription') {
        update.$inc['metrics.subscriptionRevenue'] = amount;
      }

      await RevenueAnalytics.findOneAndUpdate(
        { date },
        update,
        { upsert: true, new: true }
      );

      return { success: true };
    } catch (error) {
      console.error('Failed to track revenue:', error);
      return { success: false, error: error.message };
    }
  }

  // Get dashboard analytics
  async getDashboardAnalytics(dateRange = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      // Get user activity trends
      const userActivityTrends = await UserActivity.aggregate([
        { $match: { timestamp: { $gte: startDate } } },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              action: "$action"
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.date": 1 } }
      ]);

      // Get course performance
      const coursePerformance = await CourseAnalytics.aggregate([
        { $match: { date: { $gte: startDate } } },
        {
          $group: {
            _id: "$courseId",
            totalViews: { $sum: "$metrics.views" },
            totalEnrollments: { $sum: "$metrics.enrollments" },
            totalCompletions: { $sum: "$metrics.completions" },
            totalRevenue: { $sum: "$metrics.revenue" },
            averageWatchTime: { $avg: "$metrics.averageWatchTime" }
          }
        },
        { $sort: { totalViews: -1 } },
        { $limit: 10 }
      ]);

      // Get revenue trends
      const revenueTrends = await RevenueAnalytics.aggregate([
        { $match: { date: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalRevenue: { $sum: "$metrics.totalRevenue" },
            transactionCount: { $sum: "$metrics.transactionCount" }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      // Get user engagement metrics
      const userEngagement = await UserEngagement.aggregate([
        { $match: { date: { $gte: startDate } } },
        {
          $group: {
            _id: null,
            avgSessionDuration: { $avg: "$metrics.sessionDuration" },
            totalLogins: { $sum: "$metrics.loginCount" },
            totalCoursesViewed: { $sum: "$metrics.coursesViewed" },
            totalVideosWatched: { $sum: "$metrics.videosWatched" },
            totalMessages: { $sum: "$metrics.messagesPosted" }
          }
        }
      ]);

      // Get real-time stats from Redis
      let realTimeStats = {};
      if (this.redis && this.redisEnabled) {
        const todayKey = `activity:${new Date().toISOString().split('T')[0]}`;
        realTimeStats = await this.redis.hgetall(todayKey) || {};
      }

      return {
        success: true,
        data: {
          userActivityTrends,
          coursePerformance,
          revenueTrends,
          userEngagement: userEngagement[0] || {},
          realTimeStats
        }
      };
    } catch (error) {
      console.error('Failed to get dashboard analytics:', error);
      return { success: false, error: error.message };
    }
  }

  // Get course-specific analytics
  async getCourseAnalytics(courseId, dateRange = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      const analytics = await CourseAnalytics.find({
        courseId,
        date: { $gte: startDate }
      }).sort({ date: 1 });

      // Calculate trends
      const metrics = {
        totalViews: 0,
        totalEnrollments: 0,
        totalCompletions: 0,
        totalRevenue: 0,
        averageWatchTime: 0,
        completionRate: 0,
        dailyTrends: []
      };

      analytics.forEach(day => {
        metrics.totalViews += day.metrics.views;
        metrics.totalEnrollments += day.metrics.enrollments;
        metrics.totalCompletions += day.metrics.completions;
        metrics.totalRevenue += day.metrics.revenue;
        
        metrics.dailyTrends.push({
          date: day.date,
          views: day.metrics.views,
          enrollments: day.metrics.enrollments,
          completions: day.metrics.completions,
          revenue: day.metrics.revenue
        });
      });

      if (metrics.totalEnrollments > 0) {
        metrics.completionRate = (metrics.totalCompletions / metrics.totalEnrollments) * 100;
      }

      if (analytics.length > 0) {
        metrics.averageWatchTime = analytics.reduce((sum, day) => sum + day.metrics.averageWatchTime, 0) / analytics.length;
      }

      return { success: true, data: metrics };
    } catch (error) {
      console.error('Failed to get course analytics:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user analytics
  async getUserAnalytics(userId, dateRange = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      // Get user activity
      const activities = await UserActivity.find({
        userId,
        timestamp: { $gte: startDate }
      }).sort({ timestamp: -1 });

      // Get user engagement
      const engagement = await UserEngagement.find({
        userId,
        date: { $gte: startDate }
      }).sort({ date: -1 });

      // Calculate metrics
      const metrics = {
        totalActivities: activities.length,
        uniqueDays: new Set(activities.map(a => a.timestamp.toISOString().split('T')[0])).size,
        activityBreakdown: {},
        engagementTrends: engagement,
        recentActivities: activities.slice(0, 20)
      };

      activities.forEach(activity => {
        metrics.activityBreakdown[activity.action] = (metrics.activityBreakdown[activity.action] || 0) + 1;
      });

      return { success: true, data: metrics };
    } catch (error) {
      console.error('Failed to get user analytics:', error);
      return { success: false, error: error.message };
    }
  }

  // Generate report
  async generateReport(type, options = {}) {
    try {
      const { dateRange = 30, format = 'json' } = options;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      let reportData = {};

      switch (type) {
        case 'revenue':
          reportData = await this.generateRevenueReport(startDate);
          break;
        case 'engagement':
          reportData = await this.generateEngagementReport(startDate);
          break;
        case 'course':
          reportData = await this.generateCourseReport(startDate, options.courseId);
          break;
        case 'user':
          reportData = await this.generateUserReport(startDate);
          break;
        default:
          reportData = await this.generateOverviewReport(startDate);
      }

      if (format === 'csv') {
        return this.convertToCSV(reportData);
      }

      return { success: true, data: reportData };
    } catch (error) {
      console.error('Failed to generate report:', error);
      return { success: false, error: error.message };
    }
  }

  async generateRevenueReport(startDate) {
    const revenueData = await RevenueAnalytics.find({
      date: { $gte: startDate }
    }).sort({ date: 1 });

    return {
      type: 'revenue',
      period: { start: startDate, end: new Date() },
      summary: {
        totalRevenue: revenueData.reduce((sum, day) => sum + day.metrics.totalRevenue, 0),
        totalTransactions: revenueData.reduce((sum, day) => sum + day.metrics.transactionCount, 0),
        averageOrderValue: revenueData.length > 0 ? 
          revenueData.reduce((sum, day) => sum + day.metrics.totalRevenue, 0) / 
          revenueData.reduce((sum, day) => sum + day.metrics.transactionCount, 0) : 0
      },
      daily: revenueData.map(day => ({
        date: day.date,
        revenue: day.metrics.totalRevenue,
        transactions: day.metrics.transactionCount,
        averageValue: day.metrics.transactionCount > 0 ? 
          day.metrics.totalRevenue / day.metrics.transactionCount : 0
      }))
    };
  }

  async generateEngagementReport(startDate) {
    const engagementData = await UserEngagement.aggregate([
      { $match: { date: { $gte: startDate } } },
      {
        $group: {
          _id: "$date",
          totalUsers: { $sum: 1 },
          avgSessionDuration: { $avg: "$metrics.sessionDuration" },
          totalLogins: { $sum: "$metrics.loginCount" },
          totalCoursesViewed: { $sum: "$metrics.coursesViewed" },
          totalVideosWatched: { $sum: "$metrics.videosWatched" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return {
      type: 'engagement',
      period: { start: startDate, end: new Date() },
      daily: engagementData.map(day => ({
        date: day._id,
        activeUsers: day.totalUsers,
        avgSessionDuration: day.avgSessionDuration,
        totalLogins: day.totalLogins,
        coursesViewed: day.totalCoursesViewed,
        videosWatched: day.totalVideosWatched
      }))
    };
  }

  async generateCourseReport(startDate, courseId = null) {
    const match = { date: { $gte: startDate } };
    if (courseId) match.courseId = courseId;

    const courseData = await CourseAnalytics.find(match).sort({ date: 1 });

    return {
      type: 'course',
      period: { start: startDate, end: new Date() },
      courseId: courseId,
      daily: courseData.map(day => ({
        date: day.date,
        courseId: day.courseId,
        views: day.metrics.views,
        enrollments: day.metrics.enrollments,
        completions: day.metrics.completions,
        revenue: day.metrics.revenue,
        watchTime: day.metrics.totalWatchTime
      }))
    };
  }

  async generateUserReport(startDate) {
    const userData = await UserActivity.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            userId: "$userId"
          }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          uniqueUsers: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    return {
      type: 'user',
      period: { start: startDate, end: new Date() },
      daily: userData.map(day => ({
        date: day._id,
        uniqueUsers: day.uniqueUsers
      }))
    };
  }

  async generateOverviewReport(startDate) {
    const [revenue, engagement, course, user] = await Promise.all([
      this.generateRevenueReport(startDate),
      this.generateEngagementReport(startDate),
      this.generateCourseReport(startDate),
      this.generateUserReport(startDate)
    ]);

    return {
      type: 'overview',
      period: { start: startDate, end: new Date() },
      revenue,
      engagement,
      course,
      user
    };
  }

  convertToCSV(data) {
    // Simple CSV conversion - implement based on data structure
    if (data.daily && Array.isArray(data.daily)) {
      const headers = Object.keys(data.daily[0] || {});
      const csvContent = [
        headers.join(','),
        ...data.daily.map(row => headers.map(header => row[header] || '').join(','))
      ].join('\n');

      return {
        success: true,
        data: csvContent,
        contentType: 'text/csv'
      };
    }

    return {
      success: false,
      error: 'Data format not suitable for CSV conversion'
    };
  }

  // Clean old analytics data
  async cleanupOldData(daysToKeep = 365) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const results = await Promise.all([
        UserActivity.deleteMany({ timestamp: { $lt: cutoffDate } }),
        CourseAnalytics.deleteMany({ date: { $lt: cutoffDate } }),
        UserEngagement.deleteMany({ date: { $lt: cutoffDate } }),
        RevenueAnalytics.deleteMany({ date: { $lt: cutoffDate } })
      ]);

      const totalDeleted = results.reduce((sum, result) => sum + result.deletedCount, 0);

      return {
        success: true,
        deletedRecords: totalDeleted,
        cutoffDate
      };
    } catch (error) {
      console.error('Failed to cleanup old analytics data:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new AnalyticsService();
