const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get user dashboard data
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    // Fetch user with populated course data
    const user = await User.findById(userId)
      .populate({
        path: 'enrolledCourses.courseId',
        select: 'title description thumbnail duration category instructor totalLessons price',
        populate: {
          path: 'instructor',
          select: 'name profilePicture'
        }
      })
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate real user stats
    const enrolledCoursesCount = user.enrolledCourses.length;
    const completedCoursesCount = user.enrolledCourses.filter(enrollment => enrollment.completed).length;
    const inProgressCoursesCount = user.enrolledCourses.filter(enrollment => !enrollment.completed && enrollment.progress > 0).length;
    
    // Calculate total hours learned (estimated based on progress)
    let totalHoursLearned = 0;
    user.enrolledCourses.forEach(enrollment => {
      if (enrollment.courseId && enrollment.courseId.duration) {
        const courseDuration = enrollment.courseId.duration.hours + (enrollment.courseId.duration.minutes / 60);
        totalHoursLearned += (courseDuration * enrollment.progress) / 100;
      }
    });

    const userStats = {
      coursesCompleted: completedCoursesCount,
      coursesInProgress: inProgressCoursesCount,
      totalHoursLearned: Math.round(totalHoursLearned),
      certificatesEarned: user.achievements ? user.achievements.filter(a => a.title && a.title.includes('Certificate')).length : 0,
      totalCourses: enrolledCoursesCount
    };

    // Transform enrolled courses to match frontend expectations
    const courseProgress = user.enrolledCourses
      .filter(enrollment => enrollment.courseId && !enrollment.completed && enrollment.progress > 0)
      .map(enrollment => ({
        id: enrollment.courseId._id.toString(),
        title: enrollment.courseId.title,
        progress: enrollment.progress,
        totalLessons: enrollment.courseId.totalLessons || 0,
        completedLessons: Math.floor((enrollment.courseId.totalLessons || 0) * enrollment.progress / 100),
        thumbnail: enrollment.courseId.thumbnail || '/api/placeholder/300/200',
        duration: enrollment.courseId.duration 
          ? `${enrollment.courseId.duration.hours}h ${enrollment.courseId.duration.minutes}m`
          : 'Duration TBD',
        instructor: {
          id: enrollment.courseId.instructor._id?.toString() || 'unknown',
          name: enrollment.courseId.instructor.name || 'Unknown Instructor',
          avatar: enrollment.courseId.instructor.profilePicture || '/api/placeholder/40/40'
        },
        status: 'in-progress',
        lastAccessed: enrollment.enrolledAt || new Date().toISOString(),
        category: enrollment.courseId.category || 'General'
      }));

    const enrolledCourses = user.enrolledCourses.map(enrollment => ({
      id: enrollment.courseId._id.toString(),
      title: enrollment.courseId.title,
      progress: enrollment.progress,
      totalLessons: enrollment.courseId.totalLessons || 0,
      completedLessons: Math.floor((enrollment.courseId.totalLessons || 0) * enrollment.progress / 100),
      thumbnail: enrollment.courseId.thumbnail || '/api/placeholder/300/200',
      duration: enrollment.courseId.duration 
        ? `${enrollment.courseId.duration.hours}h ${enrollment.courseId.duration.minutes}m`
        : 'Duration TBD',
      instructor: {
        id: enrollment.courseId.instructor._id?.toString() || 'unknown',
        name: enrollment.courseId.instructor.name || 'Unknown Instructor',
        avatar: enrollment.courseId.instructor.profilePicture || '/api/placeholder/40/40'
      },
      status: enrollment.completed ? 'completed' : (enrollment.progress > 0 ? 'in-progress' : 'not-started'),
      enrolledAt: enrollment.enrolledAt,
      category: enrollment.courseId.category || 'General',
      price: enrollment.courseId.price || 0
    }));

    // Create real user achievements or default ones
    const achievements = user.achievements && user.achievements.length > 0 
      ? user.achievements.map(achievement => ({
          id: achievement._id?.toString() || Math.random().toString(),
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon || '🎓',
          earnedAt: achievement.earnedAt || new Date().toISOString(),
          rarity: 'common'
        }))
      : [
          {
            id: 'welcome',
            title: 'Welcome to CodingJojo!',
            description: 'Started your learning journey',
            icon: '🎓',
            earnedAt: user.createdAt || new Date().toISOString(),
            rarity: 'common'
          }
        ];

    // Build dashboard data object with real user data
    const dashboardData = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isPremium: user.isPremium,
        joinedDate: user.createdAt
      },
      stats: userStats,
      courseProgress: courseProgress,
      enrolledCourses: enrolledCourses,
      upcomingEvents: [], // TODO: Implement real events system
      subscription: {
        id: user._id.toString(),
        plan: user.isPremium ? 'premium' : 'free',
        status: 'active',
        startDate: user.subscription?.startDate || user.createdAt,
        endDate: user.subscription?.endDate,
        renewalDate: user.subscription?.endDate,
        price: user.isPremium ? 29.99 : 0,
        billingCycle: 'monthly',
        features: user.isPremium ? [
          'Unlimited course access',
          'Priority support',
          'Downloadable resources',
          'Live sessions',
          'Certificates'
        ] : [
          'Limited course access',
          'Basic support',
          'Community access'
        ]
      },
      achievements: achievements,
      recentActivity: [], // TODO: Implement activity tracking
      notifications: [], // TODO: Implement notifications system
      learningGoals: [], // TODO: Implement learning goals
      quickStats: {
        weeklyProgress: {
          hoursLearned: Math.round(totalHoursLearned * 0.2), // Estimate weekly hours
          lessonsCompleted: Math.floor(userStats.coursesCompleted * 10), // Estimate lessons
          quizzesCompleted: Math.floor(userStats.coursesCompleted * 3), // Estimate quizzes
          streakDays: 1 // TODO: Implement streak tracking
        },
        monthlyGoals: {
          targetHours: 40,
          completedHours: Math.round(totalHoursLearned),
          targetCourses: 2,
          completedCourses: completedCoursesCount
        }
      }
    };

    res.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while loading dashboard'
    });
  }
};

// @desc    Get user learning analytics
// @route   GET /api/dashboard/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    // Fetch user with populated course data for analytics
    const user = await User.findById(userId)
      .populate('enrolledCourses.courseId', 'category duration')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate real analytics based on user data
    const enrolledCourses = user.enrolledCourses || [];
    const completedCourses = enrolledCourses.filter(e => e.completed);
    
    // Calculate course categories distribution
    const categoryCounts = {};
    enrolledCourses.forEach(enrollment => {
      if (enrollment.courseId && enrollment.courseId.category) {
        const category = enrollment.courseId.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    const totalCourses = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
    const courseCategories = {};
    Object.keys(categoryCounts).forEach(category => {
      courseCategories[category] = Math.round((categoryCounts[category] / Math.max(totalCourses, 1)) * 100);
    });

    const analytics = {
      learningProgress: {
        dailyHours: [1, 1.5, 2, 1.8, 0.5, 3, 2.2], // Last 7 days - TODO: implement real tracking
        weeklyCompletion: [70, 85, 78, 92, 88], // Last 5 weeks - TODO: implement real tracking
        courseCategories: Object.keys(courseCategories).length > 0 ? courseCategories : {
          'Web Development': 100
        }
      },
      performance: {
        averageQuizScore: 85, // TODO: implement quiz tracking
        totalQuizzesTaken: completedCourses.length * 3, // Estimate
        perfectScores: Math.floor(completedCourses.length * 0.3), // Estimate
        improvementTrend: 'stable'
      },
      achievements: {
        totalEarned: user.achievements ? user.achievements.length : 1,
        recentAchievements: user.achievements ? Math.min(user.achievements.length, 3) : 1,
        nextMilestone: {
          title: 'Course Enthusiast',
          description: 'Complete 5 courses',
          progress: completedCourses.length,
          target: 5
        }
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while loading analytics'
    });
  }
};

module.exports = {
  getDashboardData,
  getAnalytics
};
