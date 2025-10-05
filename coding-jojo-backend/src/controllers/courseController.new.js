const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      level, 
      search, 
      sort = 'newest',
      featured 
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = { isPublished: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (level && level !== 'all') {
      query.level = level;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'price-low':
        sortObj = { price: 1 };
        break;
      case 'price-high':
        sortObj = { price: -1 };
        break;
      case 'rating':
        sortObj = { averageRating: -1 };
        break;
      case 'popular':
        sortObj = { totalEnrollments: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    // Get courses with pagination
    const courses = await Course.find(query)
      .populate('instructor', 'name email avatar bio')
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .select('-courseContent -enrolledStudents -ratings');

    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / limitNum);

    // Format courses for frontend
    const formattedCourses = courses.map(course => ({
      id: course._id,
      title: course.title,
      description: course.description,
      level: course.level,
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice,
      thumbnail: course.thumbnail,
      duration: course.duration,
      totalLessons: course.totalLessons,
      averageRating: course.averageRating || 0,
      totalRatings: course.totalRatings || 0,
      totalEnrollments: course.totalEnrollments || 0,
      instructor: {
        id: course.instructor._id,
        name: course.instructor.name,
        avatar: course.instructor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        bio: course.instructor.bio || 'Experienced instructor'
      },
      isPremium: course.isPremium,
      isFeatured: course.isFeatured,
      tags: course.tags,
      learningObjectives: course.learningObjectives,
      prerequisites: course.prerequisites,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    }));

    res.json({
      success: true,
      data: formattedCourses,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCourses,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      },
      message: 'Courses retrieved successfully'
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findById(id)
      .populate('instructor', 'name email avatar bio socialLinks')
      .populate('ratings.user', 'name avatar');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if course is published (unless user is the instructor or admin)
    if (!course.isPublished) {
      return res.status(403).json({
        success: false,
        message: 'Course is not available'
      });
    }

    // Add detailed course content for single course view
    const detailedCourse = {
      ...course.toObject(),
      enrollmentCount: course.enrolledStudents?.length || 0,
      formattedDuration: `${course.duration?.hours || 0}h ${course.duration?.minutes || 0}m`,
      courseContent: course.courseContent?.map(section => ({
        ...section,
        lessons: section.lessons?.map(lesson => ({
          ...lesson,
          isPreview: lesson.isPreview || false
        }))
      })) || []
    };

    res.json({
      success: true,
      data: detailedCourse,
      message: 'Course retrieved successfully'
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const course = await Course.findById(id);
    const user = await User.findById(userId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if course is published
    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    // Check if user is already enrolled
    const isAlreadyEnrolled = course.enrolledStudents.some(
      enrollment => enrollment.student.toString() === userId
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Check if user already has this course in enrolledCourses
    const userAlreadyEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.courseId.toString() === id
    );

    if (userAlreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Add enrollment to course
    course.enrolledStudents.push({
      student: userId,
      enrolledAt: new Date(),
      progress: 0,
      completed: false
    });

    // Update enrollment count
    course.totalEnrollments = course.enrolledStudents.length;

    // Add course to user's enrolled courses
    user.enrolledCourses.push({
      courseId: id,
      enrolledAt: new Date(),
      progress: 0,
      completed: false
    });

    await course.save();
    await user.save();

    res.json({
      success: true,
      message: 'Successfully enrolled in course',
      enrollment: {
        courseId: id,
        courseTitle: course.title,
        enrolledAt: new Date(),
        progress: 0
      }
    });

  } catch (error) {
    console.error('Enroll in course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while enrolling in course'
    });
  }
};

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
const getFeaturedCourses = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const featuredCourses = await Course.find({ 
      isPublished: true, 
      isFeatured: true 
    })
      .populate('instructor', 'name email avatar bio')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('-courseContent -enrolledStudents -ratings');

    // Format courses for frontend
    const formattedCourses = featuredCourses.map(course => ({
      id: course._id,
      title: course.title,
      description: course.description,
      level: course.level,
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice,
      thumbnail: course.thumbnail,
      duration: course.duration,
      totalLessons: course.totalLessons,
      averageRating: course.averageRating || 0,
      totalRatings: course.totalRatings || 0,
      totalEnrollments: course.totalEnrollments || 0,
      instructor: {
        id: course.instructor._id,
        name: course.instructor.name,
        avatar: course.instructor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        bio: course.instructor.bio || 'Experienced instructor'
      },
      isPremium: course.isPremium,
      isFeatured: course.isFeatured,
      tags: course.tags,
      createdAt: course.createdAt
    }));
    
    res.json({
      success: true,
      data: formattedCourses,
      message: 'Featured courses retrieved successfully'
    });

  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured courses'
    });
  }
};

// @desc    Get course categories
// @route   GET /api/courses/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category', { isPublished: true });
    
    res.json({
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  enrollInCourse,
  getFeaturedCourses,
  getCategories
};
