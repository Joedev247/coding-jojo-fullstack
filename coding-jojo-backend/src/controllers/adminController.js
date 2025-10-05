const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Transaction = require('../models/Transaction');
const Subscription = require('../models/Subscription');
const InstructorEarnings = require('../models/InstructorEarnings');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getAdminStats = async (req, res) => {
  try {
    // Get real statistics from database
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ isPublished: true });
    
    // Calculate users added today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersToday = await User.countDocuments({ 
      createdAt: { $gte: today } 
    });

    // Calculate courses added today
    const newCoursesToday = await Course.countDocuments({ 
      createdAt: { $gte: today } 
    });

    // Get transaction statistics
    const transactionStats = await Transaction.getAdminStats();
    const subscriptionStats = await Subscription.getSubscriptionStats();

    // Calculate real revenue from completed transactions
    const totalRevenue = transactionStats.total[0]?.amount || 0;
    const todayRevenue = transactionStats.today[0]?.amount || 0;
    const monthRevenue = transactionStats.thisMonth[0]?.amount || 0;

    // Get top courses by enrollment count
    const topCourses = await Course.find({ isPublished: true })
      .sort({ totalEnrollments: -1 })
      .limit(5)
      .select('title totalEnrollments averageRating price')
      .populate('instructor', 'name');

    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email isPremium createdAt');

    // Get recent transactions for activity feed
    const recentTransactions = transactionStats.recentTransactions || [];

    // Calculate percentage changes (simplified calculation)
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const yesterdayUsers = await User.countDocuments({ 
      createdAt: { $gte: yesterday, $lt: today } 
    });
    const lastWeekUsers = await User.countDocuments({ 
      createdAt: { $gte: lastWeek, $lt: yesterday } 
    });

    const userGrowthPercent = lastWeekUsers > 0 
      ? ((newUsersToday - yesterdayUsers) / lastWeekUsers * 100).toFixed(1)
      : 0;

    const stats = {
      totalStudents: totalUsers,
      totalCourses: totalCourses,
      totalRevenue: totalRevenue,
      activeUsers: await User.countDocuments({ isPremium: true }),
      newUsers: {
        count: newUsersToday.toString(),
        percentChange: parseFloat(userGrowthPercent) || 0
      },
      revenue: {
        count: totalRevenue,
        percentChange: 18.3, // You can calculate this based on previous month data
        todayRevenue,
        monthRevenue
      },
      completionRate: {
        count: 85 // You can implement this based on course completion data
      },
      engagementRate: {
        count: 72 // You can implement this based on user activity data
      },
      transactionSummary: {
        totalTransactions: transactionStats.total[0]?.count || 0,
        todayTransactions: transactionStats.today[0]?.count || 0,
        monthTransactions: transactionStats.thisMonth[0]?.count || 0,
        byType: transactionStats.byType || [],
        byPaymentMethod: transactionStats.byPaymentMethod || []
      },
      subscriptionSummary: {
        totalSubscriptions: subscriptionStats.total[0]?.count || 0,
        activeSubscriptions: subscriptionStats.activeSubscriptions[0]?.count || 0,
        byPlan: subscriptionStats.byPlan || [],
        byStatus: subscriptionStats.byStatus || [],
        churnRate: subscriptionStats.churnRate[0]?.count || 0
      },
      monthlySales: [
        { month: 'Jan', value: 4000 },
        { month: 'Feb', value: 3000 },
        { month: 'Mar', value: 2000 },
        { month: 'Apr', value: 2780 },
        { month: 'May', value: 1890 },
        { month: 'Jun', value: 2390 }
      ],
      categoryDistribution: [
        { name: 'Web Development', value: 35 },
        { name: 'Data Science', value: 25 },
        { name: 'Mobile Development', value: 20 },
        { name: 'DevOps', value: 20 }
      ],
      recentActivity: [
        ...recentUsers.slice(0, 3).map(user => ({
          user: user.name,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          action: 'joined the platform',
          target: 'User Registration',
          time: new Date(user.createdAt).toLocaleDateString()
        })),
        ...recentTransactions.slice(0, 3).map(transaction => ({
          user: transaction.userInfo?.[0]?.name || 'Unknown User',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b302?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          action: transaction.type === 'course_purchase' ? 'purchased course' : 'upgraded subscription',
          target: transaction.courseInfo?.[0]?.title || `${transaction.type} - $${transaction.amount}`,
          time: new Date(transaction.createdAt).toLocaleDateString()
        }))
      ].slice(0, 6),
      topCourses: topCourses.map(course => ({
        id: course._id,
        title: course.title,
        enrollments: course.totalEnrollments,
        rating: course.averageRating,
        price: course.price,
        instructor: course.instructor?.name      }))
    };

    res.json({
      success: true,
      data: stats // Return stats in data field to match frontend API expectations
    });

  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching admin statistics'
    });
  }
};

// @desc    Get all users for admin
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role && role !== 'all') {
      query.role = role;
    }

    // Get users with pagination
    const users = await User.find(query)
      .select('name email role isPremium createdAt lastActive enrolledCourses')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limitNum);

    // Format users data
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium,
      joinedAt: user.createdAt,
      lastActive: user.lastActive || user.createdAt,
      totalCourses: user.enrolledCourses?.length || 0,
      status: 'active' // Add proper status field to User model if needed
    }));

    res.json({
      success: true,
      users: formattedUsers,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalUsers,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
};

// @desc    Get all courses for admin
// @route   GET /api/admin/courses
// @access  Private (Admin only)
const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, status } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'all') {
      query.category = category;
    }
    if (status) {
      if (status === 'published') {
        query.isPublished = true;
      } else if (status === 'draft') {
        query.isPublished = false;
      }
    }

    // Get courses with pagination
    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / limitNum);    // Format courses data for frontend compatibility
    const formattedCourses = courses.map(course => ({
      _id: course._id,
      id: course._id,
      title: course.title,
      description: course.description,
      instructor: {
        _id: course.instructor?._id || '',
        name: course.instructor?.name || 'Unknown'
      },
      instructorEmail: course.instructor?.email || '',
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice,
      studentsEnrolled: course.totalEnrollments || 0,
      rating: course.averageRating || 0,
      totalRatings: course.totalRatings || 0,
      status: course.isPublished ? 'published' : 'draft',
      isFeatured: course.isFeatured,
      isPremium: course.isPremium,
      createdAt: course.createdAt,
      lastUpdated: course.lastUpdated || course.updatedAt,
      thumbnail: course.thumbnailUrl || course.thumbnail?.url || course.thumbnail,
      duration: course.duration,
      totalLessons: course.totalLessons || 0,
      level: course.level,
      tags: course.tags || []
    }));    res.json({
      success: true,
      data: formattedCourses, // Use 'data' field to match frontend expectations
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCourses,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });

  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};

// @desc    Create new course
// @route   POST /api/admin/courses
// @access  Private (Admin only)
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      longDescription,
      category,
      level,
      price,
      originalPrice,
      thumbnail,
      duration,
      totalLessons,
      tags,
      prerequisites,
      learningObjectives,
      targetAudience,
      isPremium,
      isFeatured,
      instructor
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !level) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, category, and level'
      });
    }

    // Handle instructor field - ensure it's a valid ObjectId
    let instructorId;
    if (instructor) {
      // If instructor is provided, validate it's a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(instructor)) {
        instructorId = instructor;
      } else {
        // If instructor is provided but not a valid ObjectId (like "Admin"), 
        // try to find a user with that name or use current user
        if (instructor === "Admin" && req.user) {
          instructorId = req.user._id;
        } else {
          // Try to find user by name
          const instructorUser = await User.findOne({ 
            $or: [
              { name: instructor },
              { email: instructor }
            ]
          });
          instructorId = instructorUser ? instructorUser._id : req.user._id;
        }
      }
    } else {
      // No instructor provided, use current user
      instructorId = req.user._id;
    }    // Handle thumbnail upload properly
    const courseData = {
      title,
      description,
      longDescription,
      category,
      level,
      price: price || 0,
      originalPrice,
      duration: duration || { hours: 0, minutes: 0 },
      totalLessons: totalLessons || 0,
      tags: tags || [],
      prerequisites: prerequisites || [],
      learningObjectives: learningObjectives || [],
      targetAudience: targetAudience || [],
      isPremium: isPremium || false,
      isFeatured: isFeatured !== undefined ? isFeatured : true, // Default to featured for testing
      instructor: instructorId,
      isPublished: true // Auto-publish courses for now
    };

    // Handle thumbnail properly - check if it's a Cloudinary URL or file upload
    if (req.file) {
      // If file was uploaded via multer/cloudinary
      courseData.thumbnailUrl = req.file.secure_url;
      courseData.thumbnail = {
        url: req.file.secure_url,
        publicId: req.file.public_id,
        width: req.file.width,
        height: req.file.height
      };
    } else if (thumbnail && thumbnail.startsWith('http')) {
      // If thumbnail URL is provided directly (like from frontend upload)
      courseData.thumbnailUrl = thumbnail;
      courseData.thumbnail = {
        url: thumbnail,
        publicId: null, // No public ID if URL is provided directly
        width: null,
        height: null
      };
    } else {
      // Default thumbnail - use a working image URL based on category
      const defaultThumbnailsByCategory = {
        'Web Development': 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
        'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
        'Machine Learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
        'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
        'Programming Languages': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
        'Databases': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
        'DevOps': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
        'Cybersecurity': 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80'
      };
      
      const defaultThumbnail = defaultThumbnailsByCategory[category] || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80';
      courseData.thumbnailUrl = defaultThumbnail;
      courseData.thumbnail = {
        url: defaultThumbnail,
        publicId: null,
        width: 800,
        height: 450
      };
    }

    const course = await Course.create(courseData);    await course.populate('instructor', 'name email');

    // Format course data for frontend compatibility
    const formattedCourse = {
      _id: course._id,
      id: course._id,
      title: course.title,
      description: course.description,
      instructor: {
        _id: course.instructor?._id || '',
        name: course.instructor?.name || 'Unknown'
      },
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice,
      studentsEnrolled: course.totalEnrollments || 0,
      rating: course.averageRating || 0,
      status: course.isPublished ? 'published' : 'draft',
      isFeatured: course.isFeatured,
      isPremium: course.isPremium,
      createdAt: course.createdAt,
      thumbnail: course.thumbnailUrl || course.thumbnail?.url || course.thumbnail,
      duration: course.duration,
      totalLessons: course.totalLessons || 0,
      level: course.level,
      tags: course.tags || []
    };

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: formattedCourse
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating course'
    });
  }
};

// @desc    Get single course for admin
// @route   GET /api/admin/courses/:id
// @access  Private (Admin only)
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id)
      .populate('instructor', 'name email')
      .populate('enrolledStudents.student', 'name email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      course
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
};

// @desc    Update course
// @route   PUT /api/admin/courses/:id
// @access  Private (Admin only)
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, lastUpdated: new Date() };

    // Handle thumbnail update if file was uploaded
    if (req.file) {
      updateData.thumbnailUrl = req.file.secure_url;
      updateData.thumbnail = {
        url: req.file.secure_url,
        publicId: req.file.public_id,
        width: req.file.width,
        height: req.file.height
      };
    } else if (req.body.thumbnail && req.body.thumbnail.startsWith('http')) {
      // If thumbnail URL is provided directly
      updateData.thumbnailUrl = req.body.thumbnail;
      updateData.thumbnail = {
        url: req.body.thumbnail,
        publicId: null,
        width: null,
        height: null
      };
    }

    const course = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email');    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Format course data for frontend compatibility
    const formattedCourse = {
      _id: course._id,
      id: course._id,
      title: course.title,
      description: course.description,
      instructor: {
        _id: course.instructor?._id || '',
        name: course.instructor?.name || 'Unknown'
      },
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice,
      studentsEnrolled: course.totalEnrollments || 0,
      rating: course.averageRating || 0,
      status: course.isPublished ? 'published' : 'draft',
      isFeatured: course.isFeatured,
      isPremium: course.isPremium,
      createdAt: course.createdAt,
      thumbnail: course.thumbnailUrl || course.thumbnail?.url || course.thumbnail,
      duration: course.duration,
      totalLessons: course.totalLessons || 0,
      level: course.level,
      tags: course.tags || []
    };

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: formattedCourse
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating course'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/admin/courses/:id
// @access  Private (Admin only)
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if course has enrolled students
    if (course.enrolledStudents && course.enrolledStudents.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete course with enrolled students. Archive it instead.'
      });
    }

    await Course.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting course'
    });
  }
};

// @desc    Get user details for admin
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select('-password')
      .populate('enrolledCourses.courseId', 'title thumbnail');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user'
    });
  }
};

// @desc    Update user details
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated via admin
    delete updateData.password;
    delete updateData.googleId;
    delete updateData.githubId;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting admin users
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin only)
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['active', 'suspended', 'inactive'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: active, suspended, inactive'
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User status updated successfully',
      user
    });

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user status'
    });
  }
};

// @desc    Update course status
// @route   PUT /api/admin/courses/:id/status
// @access  Private (Admin only)
const updateCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['draft', 'published', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be draft, published, or archived'
      });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Update course status
    const updateData = {
      isPublished: status === 'published',
      status: status,
      lastUpdated: new Date()
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email');

    res.json({
      success: true,
      message: `Course status updated to ${status}`,
      data: {
        _id: updatedCourse._id,
        status: status,
        isPublished: status === 'published'
      }
    });

  } catch (error) {
    console.error('Update course status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating course status'
    });
  }
};

// @desc    Debug: Bulk update courses to be published and featured
// @route   POST /api/admin/courses/bulk-publish
// @access  Private (Admin only)
const bulkPublishCourses = async (req, res) => {
  try {
    // Update all courses to be published and featured
    const result = await Course.updateMany(
      {}, // Update all courses
      { 
        isPublished: true,
        isFeatured: true 
      }
    );

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} courses to be published and featured`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Bulk publish courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while bulk updating courses'
    });
  }
};

// @desc    Debug: Get all courses with detailed info
// @route   GET /api/admin/courses/debug
// @access  Private (Admin only)
const debugGetAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate('instructor', 'name email')
      .select('title category isPublished isFeatured createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      totalCourses: courses.length,
      courses: courses.map(course => ({
        id: course._id,
        title: course.title,
        category: course.category,
        isPublished: course.isPublished,
        isFeatured: course.isFeatured,
        instructor: course.instructor?.name || 'Unknown',
        createdAt: course.createdAt
      }))
    });

  } catch (error) {
    console.error('Debug get all courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching debug courses'
    });  }
};

// @desc    Create admin community post
// @route   POST /api/admin/community/posts
// @access  Private (Admin only)
const createAdminPost = async (req, res) => {
  try {
    const { title, content, category, tags, type, isPinned, isFeatured } = req.body;
    
    // Admin user data (would normally come from auth middleware)
    const adminId = req.user?.id || 'admin_' + Date.now();
    const adminName = req.user?.name || 'Admin';
    const adminEmail = req.user?.email || 'admin@codingjojo.com';

    // Create post data for community service
    const postData = {
      title,
      content,
      category: category || 'general',
      tags: tags || [],
      type: type || 'announcement',
      isPinned: isPinned || false,
      isFeatured: isFeatured || false
    };

    // Forward to community controller
    const { createPost } = require('./communityController');
    
    // Set admin headers for community controller
    req.headers['x-user-type'] = 'admin';
    req.headers['x-user-id'] = adminId;
    req.headers['x-user-name'] = adminName;
    req.headers['x-user-email'] = adminEmail;
    req.body = postData;

    // Call community controller
    await createPost(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating admin post',
      error: error.message
    });
  }
};

// @desc    Create admin community event
// @route   POST /api/admin/community/events
// @access  Private (Admin only)
const createAdminEvent = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      type, 
      startDate, 
      endDate, 
      location, 
      maxAttendees,
      tags,
      isVirtual 
    } = req.body;
    
    // Admin user data
    const adminId = req.user?.id || 'admin_' + Date.now();
    const adminName = req.user?.name || 'Admin';
    const adminEmail = req.user?.email || 'admin@codingjojo.com';

    // Create event data
    const eventData = {
      title,
      description,
      type: type || 'announcement',
      startDate,
      endDate,
      location: location || (isVirtual ? 'Virtual' : 'TBD'),
      maxAttendees: maxAttendees || null,
      tags: tags || [],
      isVirtual: isVirtual || false
    };

    // Forward to community controller
    const { createEvent } = require('./communityController');
    
    // Set admin headers
    req.headers['x-user-type'] = 'admin';
    req.headers['x-user-id'] = adminId;
    req.headers['x-user-name'] = adminName;
    req.headers['x-user-email'] = adminEmail;
    req.body = eventData;

    // Call community controller
    await createEvent(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating admin event',
      error: error.message
    });
  }
};

// @desc    Get admin community stats
// @route   GET /api/admin/community/stats
// @access  Private (Admin only)
const getAdminCommunityStats = async (req, res) => {
  try {
    const { getCommunityStats } = require('./communityController');
    await getCommunityStats(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching community stats',
      error: error.message
    });
  }
};

// ===============================
// INSTRUCTOR MANAGEMENT FUNCTIONS
// ===============================

// @desc    Get all instructors with their stats
// @route   GET /api/admin/instructors
// @access  Private (Admin only)
const getAllInstructors = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      status = 'all',
      search = ''
    } = req.query;

    // Build query
    let query = { 
      role: { $in: ['instructor', 'teacher'] }
    };

    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Add status filter
    if (status !== 'all') {
      query['teacherProfile.applicationStatus'] = status;
    }

    const instructors = await User.find(query)
      .select('name email avatar role teacherProfile isPremium createdAt lastActive')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    // Get earnings data for each instructor
    const instructorIds = instructors.map(instructor => instructor._id);
    const earningsData = await InstructorEarnings.aggregate([
      { $match: { instructor: { $in: instructorIds }, 'metadata.refunded': false } },
      {
        $group: {
          _id: '$instructor',
          totalEarnings: { $sum: '$netAmount' },
          totalTransactions: { $sum: 1 },
          pendingAmount: {
            $sum: {
              $cond: [{ $eq: ['$paymentStatus', 'pending'] }, '$netAmount', 0]
            }
          }
        }
      }
    ]);

    // Get course counts for each instructor
    const courseCounts = await Course.aggregate([
      { $match: { instructor: { $in: instructorIds } } },
      {
        $group: {
          _id: '$instructor',
          totalCourses: { $sum: 1 },
          publishedCourses: {
            $sum: { $cond: ['$isPublished', 1, 0] }
          },
          totalEnrollments: { $sum: '$totalEnrollments' }
        }
      }
    ]);

    // Combine data
    const instructorsWithStats = instructors.map(instructor => {
      const earnings = earningsData.find(e => e._id.toString() === instructor._id.toString()) || {
        totalEarnings: 0,
        totalTransactions: 0,
        pendingAmount: 0
      };

      const courses = courseCounts.find(c => c._id.toString() === instructor._id.toString()) || {
        totalCourses: 0,
        publishedCourses: 0,
        totalEnrollments: 0
      };

      return {
        _id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        avatar: instructor.avatar,
        role: instructor.role,
        isPremium: instructor.isPremium,
        joinedAt: instructor.createdAt,
        lastActive: instructor.lastActive,
        verificationStatus: instructor.teacherProfile?.applicationStatus || 'pending',
        isApproved: instructor.teacherProfile?.isApproved || false,
        stats: {
          totalCourses: courses.totalCourses,
          publishedCourses: courses.publishedCourses,
          totalEnrollments: courses.totalEnrollments,
          totalEarnings: earnings.totalEarnings,
          totalTransactions: earnings.totalTransactions,
          pendingAmount: earnings.pendingAmount
        }
      };
    });

    res.status(200).json({
      success: true,
      data: {
        instructors: instructorsWithStats,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get all instructors error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch instructors'
    });
  }
};

// @desc    Get detailed instructor information
// @route   GET /api/admin/instructors/:id
// @access  Private (Admin only)
const getInstructorDetails = async (req, res) => {
  try {
    const instructorId = req.params.id;

    // Get instructor details
    const instructor = await User.findById(instructorId)
      .select('name email avatar role teacherProfile isPremium createdAt lastActive');

    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }

    // Get instructor's courses
    const courses = await Course.find({ instructor: instructorId })
      .select('title description price isPublished totalEnrollments averageRating createdAt')
      .sort({ createdAt: -1 });

    // Get earnings summary
    const earningsSummary = await InstructorEarnings.getInstructorTotalEarnings(instructorId);

    // Get recent transactions
    const recentEarnings = await InstructorEarnings.find({ instructor: instructorId })
      .populate('course', 'title price')
      .populate('student', 'name email')
      .populate('transaction', 'transactionId status amount')
      .sort({ earnedAt: -1 })
      .limit(10);

    // Get monthly earnings for the last 12 months
    const monthlyEarnings = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      const earnings = await InstructorEarnings.getMonthlyEarnings(instructorId, year, month);
      monthlyEarnings.push({
        month: `${year}-${month.toString().padStart(2, '0')}`,
        earnings: earnings[0]?.monthlyNet || 0,
        transactions: earnings[0]?.transactionCount || 0
      });
    }

    res.status(200).json({
      success: true,
      data: {
        instructor: {
          _id: instructor._id,
          name: instructor.name,
          email: instructor.email,
          avatar: instructor.avatar,
          role: instructor.role,
          isPremium: instructor.isPremium,
          joinedAt: instructor.createdAt,
          lastActive: instructor.lastActive,
          teacherProfile: instructor.teacherProfile
        },
        courses: courses,
        earningsSummary: earningsSummary[0] || {
          totalGross: 0,
          totalNet: 0,
          totalPlatformFee: 0,
          totalTransactions: 0,
          pendingAmount: 0,
          paidAmount: 0
        },
        recentEarnings: recentEarnings,
        monthlyEarnings: monthlyEarnings
      }
    });

  } catch (error) {
    console.error('Get instructor details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch instructor details'
    });
  }
};

// @desc    Get instructor transactions
// @route   GET /api/admin/instructors/:id/transactions
// @access  Private (Admin only)
const getInstructorTransactions = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const { page = 1, limit = 20, status = 'all' } = req.query;

    // Build query
    let query = { instructor: instructorId };
    if (status !== 'all') {
      query.paymentStatus = status;
    }

    const transactions = await InstructorEarnings.find(query)
      .populate('course', 'title price')
      .populate('student', 'name email avatar')
      .populate('transaction', 'transactionId status amount paymentMethod createdAt')
      .sort({ earnedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await InstructorEarnings.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        transactions: transactions,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get instructor transactions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch instructor transactions'
    });
  }
};

// @desc    Get all instructors earnings overview
// @route   GET /api/admin/earnings
// @access  Private (Admin only)
const getAllInstructorEarnings = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all instructors earnings
    const allEarnings = await InstructorEarnings.getAllInstructorsEarnings();

    // Get platform statistics
    const platformStats = await InstructorEarnings.aggregate([
      {
        $match: { 'metadata.refunded': false }
      },
      {
        $group: {
          _id: null,
          totalPlatformRevenue: { $sum: '$platformFee' },
          totalInstructorEarnings: { $sum: '$netAmount' },
          totalGrossRevenue: { $sum: '$grossAmount' },
          totalTransactions: { $sum: 1 }
        }
      }
    ]);

    // Get recent period stats
    const recentStats = await InstructorEarnings.aggregate([
      {
        $match: {
          earnedAt: { $gte: startDate },
          'metadata.refunded': false
        }
      },
      {
        $group: {
          _id: null,
          recentPlatformRevenue: { $sum: '$platformFee' },
          recentInstructorEarnings: { $sum: '$netAmount' },
          recentTransactions: { $sum: 1 }
        }
      }
    ]);

    // Get pending payouts
    const pendingPayouts = await InstructorEarnings.aggregate([
      {
        $match: {
          paymentStatus: 'pending',
          eligibleForPayoutAt: { $lte: new Date() }
        }
      },
      {
        $group: {
          _id: '$instructor',
          pendingAmount: { $sum: '$netAmount' },
          transactionCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'instructor'
        }
      },
      {
        $unwind: '$instructor'
      },
      {
        $project: {
          instructor: {
            _id: '$instructor._id',
            name: '$instructor.name',
            email: '$instructor.email'
          },
          pendingAmount: 1,
          transactionCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        instructorEarnings: allEarnings,
        platformStats: platformStats[0] || {
          totalPlatformRevenue: 0,
          totalInstructorEarnings: 0,
          totalGrossRevenue: 0,
          totalTransactions: 0
        },
        recentStats: recentStats[0] || {
          recentPlatformRevenue: 0,
          recentInstructorEarnings: 0,
          recentTransactions: 0
        },
        pendingPayouts: pendingPayouts,
        period: `Last ${days} days`
      }
    });

  } catch (error) {
    console.error('Get all instructor earnings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch instructor earnings'
    });
  }
};

// @desc    Get instructor monthly earnings report
// @route   GET /api/admin/earnings/monthly
// @access  Private (Admin only)
const getInstructorMonthlyEarnings = async (req, res) => {
  try {
    const { year = new Date().getFullYear(), month = new Date().getMonth() + 1 } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const monthlyEarnings = await InstructorEarnings.aggregate([
      {
        $match: {
          earnedAt: { $gte: startDate, $lte: endDate },
          'metadata.refunded': false
        }
      },
      {
        $group: {
          _id: '$instructor',
          monthlyGross: { $sum: '$grossAmount' },
          monthlyNet: { $sum: '$netAmount' },
          platformFee: { $sum: '$platformFee' },
          transactionCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'instructor'
        }
      },
      {
        $unwind: '$instructor'
      },
      {
        $project: {
          instructor: {
            _id: '$instructor._id',
            name: '$instructor.name',
            email: '$instructor.email',
            avatar: '$instructor.avatar'
          },
          monthlyGross: 1,
          monthlyNet: 1,
          platformFee: 1,
          transactionCount: 1
        }
      },
      {
        $sort: { monthlyNet: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        monthlyEarnings: monthlyEarnings,
        period: {
          year: parseInt(year),
          month: parseInt(month),
          startDate,
          endDate
        }
      }
    });

  } catch (error) {
    console.error('Get monthly earnings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch monthly earnings'
    });
  }
};

// @desc    Process instructor payout
// @route   POST /api/admin/instructors/:id/payout
// @access  Private (Admin only)
const processInstructorPayout = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const { paymentMethod, paymentReference, amount, notes } = req.body;

    // Validate instructor exists
    const instructor = await User.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        error: 'Instructor not found'
      });
    }

    // Get pending earnings eligible for payout
    const pendingEarnings = await InstructorEarnings.find({
      instructor: instructorId,
      paymentStatus: 'pending',
      eligibleForPayoutAt: { $lte: new Date() },
      'metadata.refunded': false
    });

    if (pendingEarnings.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No eligible earnings for payout'
      });
    }

    const totalPayoutAmount = pendingEarnings.reduce((sum, earning) => sum + earning.netAmount, 0);

    // If specific amount provided, validate it
    if (amount && amount > totalPayoutAmount) {
      return res.status(400).json({
        success: false,
        error: 'Payout amount exceeds available earnings'
      });
    }

    const payoutAmount = amount || totalPayoutAmount;
    const payoutDate = new Date();
    const payoutId = `payout_${Date.now()}_${instructorId}`;

    // Update earnings records
    let remainingAmount = payoutAmount;
    const updatedEarnings = [];

    for (const earning of pendingEarnings) {
      if (remainingAmount <= 0) break;

      const amountToPay = Math.min(remainingAmount, earning.netAmount);
      
      earning.paymentStatus = 'paid';
      earning.payout = {
        payoutId,
        payoutDate,
        paymentMethod,
        paymentReference,
        notes
      };

      await earning.save();
      updatedEarnings.push(earning._id);
      remainingAmount -= amountToPay;
    }

    res.status(200).json({
      success: true,
      message: 'Payout processed successfully',
      data: {
        payoutId,
        instructorId,
        payoutAmount,
        paymentMethod,
        paymentReference,
        payoutDate,
        updatedEarnings: updatedEarnings.length,
        notes
      }
    });

  } catch (error) {
    console.error('Process payout error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process payout'
    });
  }
};

// @desc    Get instructor payout history
// @route   GET /api/admin/instructors/:id/payouts
// @access  Private (Admin only)
const getInstructorPayoutHistory = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const { page = 1, limit = 20 } = req.query;

    const payouts = await InstructorEarnings.aggregate([
      {
        $match: {
          instructor: mongoose.Types.ObjectId(instructorId),
          paymentStatus: 'paid',
          'payout.payoutId': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$payout.payoutId',
          payoutDate: { $first: '$payout.payoutDate' },
          paymentMethod: { $first: '$payout.paymentMethod' },
          paymentReference: { $first: '$payout.paymentReference' },
          notes: { $first: '$payout.notes' },
          totalAmount: { $sum: '$netAmount' },
          transactionCount: { $sum: 1 },
          earnings: { $push: '$$ROOT' }
        }
      },
      {
        $sort: { payoutDate: -1 }
      },
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: parseInt(limit)
      }
    ]);

    const total = await InstructorEarnings.aggregate([
      {
        $match: {
          instructor: mongoose.Types.ObjectId(instructorId),
          paymentStatus: 'paid',
          'payout.payoutId': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$payout.payoutId'
        }
      },
      {
        $count: 'total'
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        payouts: payouts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil((total[0]?.total || 0) / parseInt(limit)),
          total: total[0]?.total || 0,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get payout history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payout history'
    });
  }
};

// @desc    Get all instructor verification submissions
// @route   GET /api/admin/instructor-verifications
// @access  Private (Admin only)
const getAllInstructorVerifications = async (req, res) => {
  try {
    const InstructorVerification = require('../models/InstructorVerification');
    
    const verifications = await InstructorVerification.find()
      .populate('instructor', 'name email createdAt')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: verifications.length,
      data: verifications.map(verification => ({
        _id: verification._id,
        instructor: verification.instructor,
        verificationStatus: verification.verificationStatus,
        progressPercentage: verification.progressPercentage,
        completedSteps: verification.completedSteps,
        educationCertificatesCount: verification.educationVerification?.certificates?.length || 0,
        educationStatus: verification.educationVerification?.overallStatus || 'pending',
        submittedAt: verification.submittedAt,
        lastUpdated: verification.lastUpdatedAt
      }))
    });
  } catch (error) {
    console.error('Error getting instructor verifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get instructor verifications',
      error: error.message
    });
  }
};

// @desc    Get specific instructor verification details
// @route   GET /api/admin/instructor-verifications/:id
// @access  Private (Admin only)
const getInstructorVerificationDetails = async (req, res) => {
  try {
    const InstructorVerification = require('../models/InstructorVerification');
    
    const verification = await InstructorVerification.findById(req.params.id)
      .populate('instructor', 'name email createdAt')
      .populate('adminReview.reviewedBy', 'name email');

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'Verification record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: verification
    });
  } catch (error) {
    console.error('Error getting verification details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification details',
      error: error.message
    });
  }
};

// @desc    Verify education certificate
// @route   PUT /api/admin/instructor-verifications/:verificationId/certificates/:certificateId/verify
// @access  Private (Admin only)
const verifyEducationCertificate = async (req, res) => {
  try {
    const InstructorVerification = require('../models/InstructorVerification');
    const { verificationId, certificateId } = req.params;
    const { verificationStatus, verificationNotes } = req.body;

    if (!['verified', 'rejected', 'needs_clarification'].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification status'
      });
    }

    const verification = await InstructorVerification.findById(verificationId);
    
    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'Verification record not found'
      });
    }

    // Find the specific certificate
    const certificate = verification.educationVerification.certificates.find(
      cert => cert._id.toString() === certificateId
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Update certificate verification
    certificate.verificationStatus = verificationStatus;
    certificate.verificationNotes = verificationNotes || '';
    certificate.verifiedBy = req.user.id;
    certificate.verifiedAt = new Date();

    // Update overall education verification status
    verification.updateEducationStatus();

    // Add history entry
    await verification.addHistoryEntry(
      'education_certificate',
      'admin_verify',
      verificationStatus === 'verified' ? 'success' : 'rejected',
      { 
        certificateId,
        verificationStatus,
        verifiedBy: req.user.id
      },
      req.user.id
    );

    await verification.save();

    console.log(`Admin ${req.user.email} ${verificationStatus} education certificate for verification ${verificationId}`);

    res.status(200).json({
      success: true,
      message: `Education certificate ${verificationStatus} successfully`,
      data: {
        certificate,
        educationStatus: verification.educationVerification.overallStatus
      }
    });

  } catch (error) {
    console.error('Error verifying education certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify education certificate',
      error: error.message
    });
  }
};

// @desc    Request additional education certificates
// @route   POST /api/admin/instructor-verifications/:verificationId/request-additional-certificates
// @access  Private (Admin only)
const requestAdditionalEducationCertificates = async (req, res) => {
  try {
    const InstructorVerification = require('../models/InstructorVerification');
    const { verificationId } = req.params;
    const { requiredCertifications, feedback } = req.body;

    const verification = await InstructorVerification.findById(verificationId)
      .populate('instructor', 'name email');

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'Verification record not found'
      });
    }

    // Update admin review with education requirements
    verification.adminReview = {
      ...verification.adminReview,
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      status: 'needs_more_info',
      feedback: feedback || 'Additional education certificates required',
      notes: `Additional certificates requested: ${requiredCertifications?.join(', ') || 'Not specified'}`
    };

    // Update education verification status
    verification.educationVerification.overallStatus = 'incomplete';
    verification.educationVerification.reviewedBy = req.user.id;
    verification.educationVerification.reviewedAt = new Date();
    verification.educationVerification.adminNotes = feedback;

    verification.verificationStatus = 'in_progress';

    // Add history entry
    await verification.addHistoryEntry(
      'education_certificate',
      'request_additional',
      'success',
      { 
        requiredCertifications,
        feedback,
        requestedBy: req.user.id
      },
      req.user.id
    );

    await verification.save();

    console.log(`Admin ${req.user.email} requested additional education certificates for verification ${verificationId}`);

    res.status(200).json({
      success: true,
      message: 'Additional education certificates requested successfully',
      data: {
        verification,
        requiredCertifications,
        feedback
      }
    });

  } catch (error) {
    console.error('Error requesting additional certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to request additional certificates',
      error: error.message
    });
  }
};

// @desc    Approve instructor verification
// @route   PUT /api/admin/instructor-verifications/:id/approve
// @access  Private (Admin only)
const approveInstructorVerification = async (req, res) => {
  try {
    const InstructorVerification = require('../models/InstructorVerification');
    const { feedback } = req.body;

    const verification = await InstructorVerification.findById(req.params.id)
      .populate('instructor', 'name email role');

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'Verification record not found'
      });
    }

    // Check if all steps are completed
    if (!verification.isVerificationComplete()) {
      return res.status(400).json({
        success: false,
        message: 'All verification steps must be completed before approval'
      });
    }

    // Check if education certificate requirements are met
    const educationCheck = verification.checkEducationRequirements();
    if (!educationCheck.met) {
      return res.status(400).json({
        success: false,
        message: `Education requirements not met: ${educationCheck.reason}`
      });
    }

    // Check if all education certificates are verified
    const unverifiedCerts = verification.educationVerification.certificates.filter(
      cert => cert.verificationStatus !== 'verified'
    );

    if (unverifiedCerts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'All education certificates must be verified before approval',
        unverifiedCertificates: unverifiedCerts.length
      });
    }

    // Update verification status
    verification.verificationStatus = 'approved';
    verification.adminReview = {
      reviewedBy: req.user.id,
      reviewedAt: new Date(),
      status: 'approved',
      feedback: feedback || 'Verification approved'
    };

    // Update instructor role
    const user = await User.findById(verification.instructor._id);
    user.role = 'instructor';
    user.isVerified = true;
    await user.save();

    // Add history entry
    await verification.addHistoryEntry(
      'verification',
      'approve',
      'success',
      { approvedBy: req.user.id, feedback },
      req.user.id
    );

    await verification.save();

    console.log(`Admin ${req.user.email} approved verification for instructor ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Instructor verification approved successfully',
      data: {
        verification,
        instructor: user
      }
    });

  } catch (error) {
    console.error('Error approving verification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve verification',
      error: error.message
    });
  }
};

// Update module exports to include new functions
module.exports = {
  getAdminStats,
  getAllUsers,
  getAllCourses,
  updateUserStatus,
  updateCourseStatus,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getUser,
  updateUser,
  deleteUser,
  bulkPublishCourses,
  debugGetAllCourses,
  // Community management
  createAdminPost,
  createAdminEvent,
  getAdminCommunityStats,
  // Instructor management
  getAllInstructors,
  getInstructorDetails,
  getInstructorTransactions,
  getAllInstructorEarnings,
  getInstructorMonthlyEarnings,
  processInstructorPayout,
  getInstructorPayoutHistory,
  // Education certificate verification
  getAllInstructorVerifications,
  getInstructorVerificationDetails,
  verifyEducationCertificate,
  requestAdditionalEducationCertificates,
  approveInstructorVerification
};
