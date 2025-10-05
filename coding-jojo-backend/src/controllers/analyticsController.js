const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get comprehensive teacher analytics
// @route   GET /api/analytics/teacher-overview
// @access  Private (Teachers only)
const getTeacherAnalytics = asyncHandler(async (req, res) => {
  const { timeRange = '30d' } = req.query;
  
  // Calculate date range
  const endDate = new Date();
  let startDate = new Date();
  
  switch (timeRange) {
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(endDate.getDate() - 90);
      break;
    case '1y':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(endDate.getDate() - 30);
  }

  try {
    // Get teacher's courses
    const courses = await Course.find({ instructor: req.user.id })
      .populate('enrolledStudents.student', 'name email createdAt')
      .populate('ratings.user', 'name');

    // Calculate comprehensive analytics
    const analytics = {
      overview: {
        totalCourses: courses.length,
        publishedCourses: courses.filter(c => c.status === 'published').length,
        draftCourses: courses.filter(c => c.status === 'draft').length,
        totalStudents: courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0),
        totalRevenue: courses.reduce((sum, course) => sum + (course.enrolledStudents.length * course.price), 0),
        averageRating: calculateAverageRating(courses),
        totalRatings: courses.reduce((sum, course) => sum + course.ratings.length, 0)
      },
      
      performance: {
        completionRate: calculateOverallCompletionRate(courses),
        engagementRate: calculateEngagementRate(courses),
        dropoffRate: calculateDropoffRate(courses),
        averageProgress: calculateAverageProgress(courses)
      },
      
      revenue: {
        totalEarnings: courses.reduce((sum, course) => sum + (course.enrolledStudents.length * course.price), 0),
        thisMonth: calculateMonthlyRevenue(courses, startDate, endDate),
        byMonth: generateMonthlyRevenueData(courses, 12),
        byCourse: courses.map(course => ({
          courseId: course._id,
          title: course.title,
          revenue: course.enrolledStudents.length * course.price,
          students: course.enrolledStudents.length
        })).sort((a, b) => b.revenue - a.revenue)
      },
      
      students: {
        newEnrollments: calculateNewEnrollments(courses, startDate, endDate),
        enrollmentTrend: generateEnrollmentTrend(courses, 30),
        demographics: calculateStudentDemographics(courses),
        retention: calculateStudentRetention(courses)
      },
      
      courses: {
        topPerforming: getTopPerformingCourses(courses, 5),
        needsAttention: getCoursesNeedingAttention(courses, 5),
        recentActivity: getRecentCourseActivity(courses, 10)
      },
      
      engagement: {
        avgSessionDuration: calculateAverageSessionDuration(courses),
        activeStudents: calculateActiveStudents(courses, startDate, endDate),
        completionRates: courses.map(course => ({
          courseId: course._id,
          title: course.title,
          completionRate: course.enrolledStudents.length > 0 
            ? (course.enrolledStudents.filter(s => s.completed).length / course.enrolledStudents.length) * 100 
            : 0
        }))
      }
    };

    res.status(200).json({
      success: true,
      data: analytics,
      timeRange,
      generatedAt: new Date()
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate analytics'
    });
  }
});

// @desc    Get detailed course analytics
// @route   GET /api/analytics/course/:courseId
// @access  Private (Teachers only)
const getCourseAnalytics = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { timeRange = '30d' } = req.query;

  try {
    const course = await Course.findById(courseId)
      .populate('enrolledStudents.student', 'name email createdAt lastActive')
      .populate('ratings.user', 'name')
      .populate('instructor', 'name');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check authorization
    if (course.instructor._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this course analytics'
      });
    }

    const analytics = {
      course: {
        id: course._id,
        title: course.title,
        status: course.status,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
      },
      
      enrollment: {
        total: course.enrolledStudents.length,
        completed: course.enrolledStudents.filter(s => s.completed).length,
        active: course.enrolledStudents.filter(s => !s.completed && s.progress > 0).length,
        inactive: course.enrolledStudents.filter(s => s.progress === 0).length,
        enrollmentTrend: generateCourseEnrollmentTrend(course, 30)
      },
      
      performance: {
        completionRate: course.enrolledStudents.length > 0 
          ? (course.enrolledStudents.filter(s => s.completed).length / course.enrolledStudents.length) * 100 
          : 0,
        averageProgress: course.enrolledStudents.length > 0 
          ? course.enrolledStudents.reduce((sum, s) => sum + s.progress, 0) / course.enrolledStudents.length 
          : 0,
        dropoffPoints: identifyDropoffPoints(course),
        engagementMetrics: calculateCourseEngagement(course)
      },
      
      ratings: {
        average: course.rating.average,
        total: course.ratings.length,
        distribution: calculateRatingDistribution(course.ratings),
        recent: course.ratings.slice(-10).map(r => ({
          rating: r.rating,
          comment: r.comment,
          user: r.user.name,
          date: r.createdAt
        }))
      },
      
      revenue: {
        total: course.enrolledStudents.length * course.price,
        perStudent: course.price,
        projectedMonthly: calculateProjectedMonthlyRevenue(course),
        conversionRate: calculateCourseConversionRate(course)
      },
      
      content: {
        totalSections: course.courseContent.length,
        totalLessons: course.courseContent.reduce((sum, section) => sum + section.lessons.length, 0),
        totalDuration: calculateTotalCourseDuration(course),
        mostEngagingLessons: identifyMostEngagingLessons(course),
        leastEngagingLessons: identifyLeastEngagingLessons(course)
      },
      
      students: {
        topPerformers: getTopPerformingStudents(course, 5),
        strugglingStudents: getStrugglingStudents(course, 5),
        recentActivity: getRecentStudentActivity(course, 10)
      }
    };

    res.status(200).json({
      success: true,
      data: analytics,
      timeRange,
      generatedAt: new Date()
    });

  } catch (error) {
    console.error('Course Analytics Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate course analytics'
    });
  }
});

// @desc    Get gamification data for teacher
// @route   GET /api/gamification/teacher-progress
// @access  Private (Teachers only)
const getTeacherGamification = asyncHandler(async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id);
    const courses = await Course.find({ instructor: req.user.id });

    // Calculate gamification metrics
    const gamification = {
      level: calculateTeacherLevel(teacher, courses),
      experience: calculateTeacherExperience(teacher, courses),
      achievements: calculateTeacherAchievements(teacher, courses),
      badges: getTeacherBadges(teacher, courses),
      leaderboard: await getTeacherLeaderboard(req.user.id),
      challenges: getActiveChallenges(teacher, courses),
      rewards: getAvailableRewards(teacher),
      streaks: calculateTeacherStreaks(teacher)
    };

    res.status(200).json({
      success: true,
      data: gamification
    });

  } catch (error) {
    console.error('Gamification Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load gamification data'
    });
  }
});

// Helper Functions
function calculateAverageRating(courses) {
  const allRatings = courses.flatMap(course => course.ratings);
  if (allRatings.length === 0) return 0;
  return allRatings.reduce((sum, rating) => sum + rating.rating, 0) / allRatings.length;
}

function calculateOverallCompletionRate(courses) {
  const allStudents = courses.flatMap(course => course.enrolledStudents);
  if (allStudents.length === 0) return 0;
  const completedStudents = allStudents.filter(student => student.completed);
  return (completedStudents.length / allStudents.length) * 100;
}

function calculateEngagementRate(courses) {
  const allStudents = courses.flatMap(course => course.enrolledStudents);
  if (allStudents.length === 0) return 0;
  const activeStudents = allStudents.filter(student => student.progress > 10);
  return (activeStudents.length / allStudents.length) * 100;
}

function calculateDropoffRate(courses) {
  const allStudents = courses.flatMap(course => course.enrolledStudents);
  if (allStudents.length === 0) return 0;
  const droppedStudents = allStudents.filter(student => student.progress < 10);
  return (droppedStudents.length / allStudents.length) * 100;
}

function calculateAverageProgress(courses) {
  const allStudents = courses.flatMap(course => course.enrolledStudents);
  if (allStudents.length === 0) return 0;
  return allStudents.reduce((sum, student) => sum + student.progress, 0) / allStudents.length;
}

function calculateMonthlyRevenue(courses, startDate, endDate) {
  return courses.reduce((sum, course) => {
    const monthlyEnrollments = course.enrolledStudents.filter(
      student => student.enrolledAt >= startDate && student.enrolledAt <= endDate
    );
    return sum + (monthlyEnrollments.length * course.price);
  }, 0);
}

function generateMonthlyRevenueData(courses, months) {
  const data = [];
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const monthlyRevenue = calculateMonthlyRevenue(courses, monthStart, monthEnd);
    
    data.push({
      month: monthStart.toISOString().slice(0, 7),
      revenue: monthlyRevenue,
      enrollments: courses.reduce((sum, course) => {
        return sum + course.enrolledStudents.filter(
          student => student.enrolledAt >= monthStart && student.enrolledAt <= monthEnd
        ).length;
      }, 0)
    });
  }
  return data;
}

function calculateNewEnrollments(courses, startDate, endDate) {
  return courses.reduce((sum, course) => {
    return sum + course.enrolledStudents.filter(
      student => student.enrolledAt >= startDate && student.enrolledAt <= endDate
    ).length;
  }, 0);
}

function generateEnrollmentTrend(courses, days) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));
    
    const dailyEnrollments = courses.reduce((sum, course) => {
      return sum + course.enrolledStudents.filter(
        student => student.enrolledAt >= dayStart && student.enrolledAt <= dayEnd
      ).length;
    }, 0);
    
    data.push({
      date: dayStart.toISOString().split('T')[0],
      enrollments: dailyEnrollments
    });
  }
  return data;
}

function getTopPerformingCourses(courses, limit) {
  return courses
    .map(course => ({
      id: course._id,
      title: course.title,
      students: course.enrolledStudents.length,
      revenue: course.enrolledStudents.length * course.price,
      rating: course.rating.average,
      completionRate: course.enrolledStudents.length > 0 
        ? (course.enrolledStudents.filter(s => s.completed).length / course.enrolledStudents.length) * 100 
        : 0
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

function getCoursesNeedingAttention(courses, limit) {
  return courses
    .map(course => ({
      id: course._id,
      title: course.title,
      students: course.enrolledStudents.length,
      completionRate: course.enrolledStudents.length > 0 
        ? (course.enrolledStudents.filter(s => s.completed).length / course.enrolledStudents.length) * 100 
        : 0,
      rating: course.rating.average,
      issues: []
    }))
    .filter(course => course.completionRate < 50 || course.rating < 3.5)
    .sort((a, b) => a.completionRate - b.completionRate)
    .slice(0, limit);
}

function calculateTeacherLevel(teacher, courses) {
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);
  const totalCourses = courses.length;
  const totalRating = courses.reduce((sum, course) => sum + course.rating.average, 0);
  
  // Simple level calculation based on activity
  const basePoints = totalStudents * 10 + totalCourses * 100 + (totalRating * 20);
  return Math.floor(basePoints / 1000) + 1;
}

function calculateTeacherExperience(teacher, courses) {
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);
  const totalCourses = courses.length;
  return totalStudents * 10 + totalCourses * 100;
}

function calculateTeacherAchievements(teacher, courses) {
  const achievements = [];
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);
  const totalCourses = courses.length;
  
  if (totalCourses >= 1) achievements.push({ id: 'first_course', name: 'First Course Created', earned: true });
  if (totalCourses >= 5) achievements.push({ id: 'course_creator', name: 'Course Creator', earned: true });
  if (totalCourses >= 10) achievements.push({ id: 'prolific_teacher', name: 'Prolific Teacher', earned: true });
  if (totalStudents >= 100) achievements.push({ id: 'mentor', name: 'Mentor', earned: true });
  if (totalStudents >= 1000) achievements.push({ id: 'expert_instructor', name: 'Expert Instructor', earned: true });
  
  return achievements;
}

function getTeacherBadges(teacher, courses) {
  const badges = [];
  const avgRating = calculateAverageRating(courses);
  
  if (avgRating >= 4.5) badges.push({ id: 'top_rated', name: 'Top Rated Instructor', icon: '⭐' });
  if (courses.length >= 5) badges.push({ id: 'course_master', name: 'Course Master', icon: '📚' });
  
  return badges;
}

async function getTeacherLeaderboard(teacherId) {
  // This would typically query a leaderboard collection
  // For now, return mock data
  return {
    position: 42,
    totalTeachers: 1250,
    category: 'Monthly Revenue',
    points: 8750
  };
}

function getActiveChallenges(teacher, courses) {
  return [
    {
      id: 'monthly_enrollment',
      title: 'Monthly Enrollment Goal',
      description: 'Get 50 new enrollments this month',
      progress: 32,
      target: 50,
      reward: '500 XP + Badge',
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
    }
  ];
}

function getAvailableRewards(teacher) {
  return [
    {
      id: 'featured_course',
      title: 'Featured Course Placement',
      cost: 1000,
      type: 'exposure'
    },
    {
      id: 'marketing_boost',
      title: 'Marketing Boost',
      cost: 500,
      type: 'promotion'
    }
  ];
}

function calculateTeacherStreaks(teacher) {
  return {
    currentStreak: 7,
    longestStreak: 23,
    type: 'Daily Login',
    streakStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  };
}

// Additional helper functions would be implemented here...

module.exports = {
  getTeacherAnalytics,
  getCourseAnalytics,
  getTeacherGamification
};
