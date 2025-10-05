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
      courseProgress: [
        {
          id: '1',
          title: 'React Mastery: Building Modern UIs',
          progress: 75,
          totalLessons: 45,
          completedLessons: 34,
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          duration: '25 hours',
          instructor: {
            id: 'i1',
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          status: 'in-progress'
        },
        {
          id: '2',
          title: 'Node.js Complete Guide',
          progress: 45,
          totalLessons: 38,
          completedLessons: 17,
          thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          duration: '30 hours',
          instructor: {
            id: 'i2',
            name: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          status: 'in-progress'
        },
        {
          id: '3',
          title: 'Python Data Science Fundamentals',
          progress: 90,
          totalLessons: 32,
          completedLessons: 29,
          thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          duration: '20 hours',
          instructor: {
            id: 'i3',
            name: 'Dr. Emily Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          status: 'in-progress'
        }
      ],
      enrolledCourses: [
        {
          id: '1',
          title: 'React Mastery: Building Modern UIs',
          progress: 75,
          totalLessons: 45,
          completedLessons: 34,
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          duration: '25 hours',
          instructor: {
            id: 'i1',
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          status: 'in-progress'
        },
        {
          id: '4',
          title: 'Advanced JavaScript Concepts',
          progress: 0,
          totalLessons: 28,
          completedLessons: 0,
          thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          duration: '20 hours',
          instructor: {
            id: 'i4',
            name: 'Lisa Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          status: 'not-started'
        }
      ],
      upcomingEvents: [
        {
          id: 'e1',
          title: 'Live Coding Session: Building a REST API',
          type: 'live-session',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '14:00',
          duration: '2 hours',
          instructor: 'Mike Chen',
          description: 'Join us for an interactive session where we build a complete REST API from scratch.',
          isRegistered: true
        },
        {
          id: 'e2',
          title: 'React Workshop: Advanced Patterns',
          type: 'workshop',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '16:00',
          duration: '3 hours',
          instructor: 'Sarah Johnson',
          description: 'Deep dive into advanced React patterns including render props, HOCs, and custom hooks.',
          isRegistered: false
        }
      ],
      subscription: {
        id: 'sub1',
        plan: user.isPremium ? 'premium' : 'free',
        status: 'active',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
        renewalDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
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
      achievements: [
        {
          id: 'ach1',
          title: 'First Course Completed',
          description: 'Completed your first course on the platform',
          icon: '🎓',
          earnedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          rarity: 'common'
        },
        {
          id: 'ach2',
          title: 'JavaScript Expert',
          description: 'Completed 5 JavaScript courses',
          icon: '🚀',
          earnedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          rarity: 'rare'
        },
        {
          id: 'ach3',
          title: 'Quiz Master',
          description: 'Scored 100% on 10 quizzes',
          icon: '🏆',
          earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          rarity: 'epic'
        }
      ],
      recentActivity: [
        {
          id: 'act1',
          type: 'course_completed',
          title: 'Completed lesson: "React Hooks Deep Dive"',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          course: 'React Mastery: Building Modern UIs',
          points: 50
        },
        {
          id: 'act2',
          type: 'quiz_completed',
          title: 'Completed quiz: "JavaScript Fundamentals"',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          course: 'Advanced JavaScript Concepts',
          score: 95,
          maxScore: 100
        },
        {
          id: 'act3',
          type: 'achievement_earned',
          title: 'Earned achievement: "Quiz Master"',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          points: 100
        }
      ],
      notifications: [
        {
          id: 'n1',
          type: 'course_update',
          title: 'New lesson available in React Mastery',
          message: 'A new lesson "Testing React Components" has been added to your course.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          isRead: false,
          actionUrl: '/dashboard/courses/1'
        },
        {
          id: 'n2',
          type: 'event_reminder',
          title: 'Live session starting soon',
          message: 'Your registered live session "Building a REST API" starts in 2 hours.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          actionUrl: '/dashboard/events/e1'
        }
      ],
      learningGoals: [
        {
          id: 'goal1',
          title: 'Complete React Mastery Course',
          description: 'Finish all lessons and projects in the React course',
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 75,
          status: 'in-progress'
        },
        {
          id: 'goal2',
          title: 'Learn Node.js Fundamentals',
          description: 'Build 3 projects using Node.js and Express',
          targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 30,
          status: 'in-progress'
        }
      ],
      quickStats: {
        weeklyProgress: {
          hoursLearned: 8.5,
          lessonsCompleted: 12,
          quizzesCompleted: 5,
          streakDays: 7
        },
        monthlyGoals: {
          targetHours: 40,
          completedHours: 28,
          targetCourses: 2,
          completedCourses: 1
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
    const analytics = {
      learningProgress: {
        dailyHours: [2, 1.5, 3, 2.5, 1, 4, 2], // Last 7 days
        weeklyCompletion: [85, 92, 78, 95, 88], // Last 5 weeks
        courseCategories: {
          'Web Development': 45,
          'Data Science': 25,
          'Mobile Development': 15,
          'DevOps': 15
        }
      },
      performance: {
        averageQuizScore: 87,
        totalQuizzesTaken: 24,
        perfectScores: 8,
        improvementTrend: 'increasing'
      },
      achievements: {
        totalEarned: 12,
        recentAchievements: 3,
        nextMilestone: {
          title: 'Course Marathon',
          description: 'Complete 10 courses',
          progress: 8,
          target: 10
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
