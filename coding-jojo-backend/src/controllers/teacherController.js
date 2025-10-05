const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cloudinary = require('../config/cloudinary');
const xlsx = require('xlsx');

// @desc    Register new teacher
// @route   POST /api/teacher/register
// @access  Public
const registerTeacher = asyncHandler(async (req, res) => {
  console.log('📝 Teacher registration attempt:', {
    email: req.body.email,
    name: req.body.name,
    hasPassword: !!req.body.password,
    bodyKeys: Object.keys(req.body),
    body: req.body
  });

  const {
    name,
    email,
    password,
    firstName,
    lastName,
    bio,
    experience,
    expertise,
    teachingExperience,
    dateOfBirth,
    phoneNumber,
    agreeToVerification
  } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log('❌ User already exists with email:', email);
    return res.status(400).json({
      success: false,
      error: 'Teacher with this email already exists'
    });
  }

  // Validate required fields
  if (!name || !email || !password) {
    console.log('❌ Missing required fields:', { name: !!name, email: !!email, password: !!password });
    return res.status(400).json({
      success: false,
      error: 'Name, email, and password are required'
    });
  }

  console.log('✅ Validation passed, creating teacher...');

  // Create teacher with initial application status
  try {
    const teacher = await User.create({
      name,
      email,
      password,
      firstName,
      lastName,
      bio,
      role: 'instructor',
      teacherProfile: {
        applicationStatus: 'pending',
        applicationSubmittedAt: new Date(),
        experience,
        expertise: expertise || [],
        teachingExperience: {
          years: teachingExperience?.years || 0,
          description: teachingExperience?.description || ''
        },
        verification: {
          status: 'pending',
          submittedAt: new Date(),
          personalInfo: {
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            phoneNumber
          }
        }
      }
    });

    console.log('✅ Teacher created successfully:', teacher._id);

    // Generate JWT token
    const token = teacher.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      data: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
        applicationStatus: teacher.teacherProfile.applicationStatus,
        verificationStatus: teacher.teacherProfile.verification.status,
        isApproved: teacher.teacherProfile.isApproved
      }
    });
  } catch (createError) {
    console.error('❌ Error creating teacher:', createError);
    return res.status(400).json({
      success: false,
      error: createError.message || 'Failed to create teacher account'
    });
  }
});

// @desc    Upload verification documents
// @route   POST /api/teacher/verification/upload
// @access  Private (Teacher)
const uploadVerificationDocuments = asyncHandler(async (req, res) => {
  const teacherId = req.user.id;
  
  // Check if teacher exists
  const teacher = await User.findById(teacherId);
  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  // Handle file uploads (this would typically use multer or similar)
  // For now, we'll simulate the file URLs
  const {
    certificateUrls,
    idFrontUrl,
    idBackUrl,
    selfiePhotoUrl
  } = req.body;

  // Update teacher's verification documents
  await User.findByIdAndUpdate(teacherId, {
    'teacherProfile.verification.documents.certificates': certificateUrls || [],
    'teacherProfile.verification.documents.idFront': idFrontUrl || '',
    'teacherProfile.verification.documents.idBack': idBackUrl || '',
    'teacherProfile.verification.documents.selfiePhoto': selfiePhotoUrl || '',
    'teacherProfile.verification.submittedAt': new Date()
  });

  res.status(200).json({
    success: true,
    message: 'Verification documents uploaded successfully'
  });
});

// @desc    Login teacher
// @route   POST /api/teacher/login
// @access  Public
const loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  const teacher = await User.findOne({ email }).select('+password');
  if (!teacher) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  if (!['instructor','teacher'].includes(teacher.role)) {
    return res.status(403).json({ success: false, error: 'Account not an instructor. Apply first.' });
  }

  const isMatch = await teacher.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  // ensure teacherProfile exists
  if (!teacher.teacherProfile) {
    teacher.teacherProfile = { applicationStatus: 'approved', isApproved: true };
  } else {
    if (!teacher.teacherProfile.applicationStatus) teacher.teacherProfile.applicationStatus = teacher.teacherProfile.isApproved ? 'approved' : 'pending';
  }

  teacher.lastActive = new Date();
  await teacher.save();

  const token = teacher.getSignedJwtToken();
  res.status(200).json({
    success: true,
    token,
    data: {
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: teacher.role,
      applicationStatus: teacher.teacherProfile?.applicationStatus,
      isApproved: teacher.teacherProfile?.isApproved
    }
  });
});

// @desc    Get teacher profile
// @route   GET /api/teacher/profile
// @access  Private
const getTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);
  
  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  res.status(200).json({
    success: true,
    data: teacher
  });
});

// @desc    Update teacher profile
// @route   PUT /api/teacher/profile
// @access  Private
const updateTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);

  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  // Update basic fields
  const {
    name,
    firstName,
    lastName,
    bio,
    skills,
    socialLinks,
    experience,
    expertise,
    teachingExperience,
    portfolio,
    pricing,
    communications
  } = req.body;

  if (name) teacher.name = name;
  if (firstName) teacher.firstName = firstName;
  if (lastName) teacher.lastName = lastName;
  if (bio) teacher.bio = bio;
  if (skills) teacher.skills = skills;
  if (socialLinks) teacher.socialLinks = { ...teacher.socialLinks, ...socialLinks };

  // Update teacher profile fields
  if (experience) teacher.teacherProfile.experience = experience;
  if (expertise) teacher.teacherProfile.expertise = expertise;
  if (teachingExperience) teacher.teacherProfile.teachingExperience = { ...teacher.teacherProfile.teachingExperience, ...teachingExperience };
  if (portfolio) teacher.teacherProfile.portfolio = { ...teacher.teacherProfile.portfolio, ...portfolio };
  if (pricing) teacher.teacherProfile.pricing = { ...teacher.teacherProfile.pricing, ...pricing };
  if (communications) teacher.teacherProfile.communications = { ...teacher.teacherProfile.communications, ...communications };

  await teacher.save();

  res.status(200).json({
    success: true,
    data: teacher
  });
});

// @desc    Upload verification documents
// @route   POST /api/teacher/documents
// @access  Private
const uploadDocuments = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);

  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Please upload at least one document'
    });
  }

  const documents = [];

  for (const file of req.files) {
    documents.push({
      type: req.body.documentType || 'id',
      url: file.secure_url,
      publicId: file.public_id,
      uploadedAt: new Date(),
      status: 'pending'
    });
  }

  teacher.teacherProfile.verification.documents.push(...documents);
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Documents uploaded successfully',
    data: documents
  });
});

// @desc    Get teacher dashboard data
// @route   GET /api/teacher/dashboard
// @access  Private
const getTeacherDashboard = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);

  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  // Get courses created by teacher
  const courses = await Course.find({ instructor: req.user.id })
    .populate('enrolledStudents.student', 'name email avatar')
    .sort('-createdAt');

  // Calculate stats
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);
  const totalEarnings = teacher.teacherProfile?.earnings?.totalEarnings || 0;
  const pendingEarnings = teacher.teacherProfile?.earnings?.pendingPayouts || 0;
  const averageRating = teacher.teacherProfile?.courseStats?.averageRating || 0;

  // Get recent enrollments (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentEnrollments = courses.reduce((acc, course) => {
    const recentStudents = course.enrolledStudents.filter(
      enrollment => enrollment.enrolledAt >= thirtyDaysAgo
    );
    return acc + recentStudents.length;
  }, 0);

  // Get monthly earnings trend (last 6 months)
  const monthlyEarnings = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthYear = date.toISOString().slice(0, 7); // YYYY-MM format
    
    // This would typically come from a transactions/earnings collection
    // For now, we'll use dummy data
    monthlyEarnings.push({
      month: monthYear,
      earnings: Math.floor(Math.random() * 5000) + 1000
    });
  }

  const dashboardData = {
    stats: {
      totalCourses: courses.length,
      totalStudents,
      totalEarnings,
      pendingEarnings,
      averageRating,
      recentEnrollments
    },
    recentCourses: courses.slice(0, 5),
    monthlyEarnings,
    recentStudents: courses
      .flatMap(course => course.enrolledStudents)
      .sort((a, b) => b.enrolledAt - a.enrolledAt)
      .slice(0, 10),
    applicationStatus: teacher.teacherProfile?.applicationStatus,
    isApproved: teacher.teacherProfile?.isApproved,
    isVerified: teacher.teacherProfile?.verification?.isVerified
  };

  res.status(200).json({
    success: true,
    data: dashboardData
  });
});

// @desc    Get teacher courses
// @route   GET /api/teacher/courses
// @access  Private
const getTeacherCourses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, status, sortBy = 'createdAt' } = req.query;

  const query = { instructor: req.user.id };

  // Add search functionality
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } }
    ];
  }

  // Add status filter
  if (status && status !== 'all') {
    query.status = status;
  }

  // Get total count
  const total = await Course.countDocuments(query);

  // Get courses with pagination
  const courses = await Course.find(query)
    .populate('enrolledStudents.student', 'name email avatar')
    .sort(`-${sortBy}`)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  // Add additional stats to each course
  const coursesWithStats = courses.map(course => {
    const courseObj = course.toObject();
    courseObj.studentsCount = course.enrolledStudents.length;
    courseObj.revenue = course.enrolledStudents.length * course.price;
    courseObj.completionRate = course.enrolledStudents.length > 0 
      ? (course.enrolledStudents.filter(s => s.completed).length / course.enrolledStudents.length) * 100
      : 0;
    
    return courseObj;
  });

  res.status(200).json({
    success: true,
    data: {
      courses: coursesWithStats,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalCourses: total
      }
    }
  });
});

// @desc    Create new course
// @route   POST /api/teacher/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);

  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  if (!teacher.teacherProfile?.isApproved) {
    return res.status(403).json({
      success: false,
      error: 'You must be an approved teacher to create courses'
    });
  }

  // Set instructor to current teacher
  req.body.instructor = req.user.id;

  // Handle thumbnail upload
  if (req.file) {
    // FIXED: Use secure_url for both thumbnail object and thumbnailUrl field
    req.body.thumbnailUrl = req.file.secure_url; // Direct URL for frontend
    req.body.thumbnail = {
      url: req.file.secure_url,
      publicId: req.file.public_id,
      width: req.file.width,
      height: req.file.height
    };
  }

  // Generate slug from title
  if (req.body.title) {
    req.body.slug = req.body.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }

  const course = await Course.create(req.body);
  await course.populate('instructor', 'name email avatar');

  // Update teacher stats
  teacher.teacherProfile.courseStats.totalCourses += 1;
  await teacher.save();

  res.status(201).json({
    success: true,
    data: course
  });
});

// @desc    Update course
// @route   PUT /api/teacher/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }

  // Make sure teacher owns the course
  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to update this course'
    });
  }

  // Handle thumbnail upload
  if (req.file) {
    // Delete old thumbnail if exists
    if (course.thumbnail?.publicId) {
      await cloudinary.uploader.destroy(course.thumbnail.publicId);
    }
    
    // FIXED: Use secure_url for both fields
    req.body.thumbnailUrl = req.file.secure_url; // Direct URL for frontend
    req.body.thumbnail = {
      url: req.file.secure_url,
      publicId: req.file.public_id,
      width: req.file.width,
      height: req.file.height
    };
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('instructor', 'name email avatar');

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Delete course
// @route   DELETE /api/teacher/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }

  // Make sure teacher owns the course
  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to delete this course'
    });
  }

  // Delete associated files from cloudinary
  if (course.thumbnail?.publicId) {
    await cloudinary.uploader.destroy(course.thumbnail.publicId);
  }

  // Delete course videos and resources
  for (const section of course.courseContent) {
    for (const lesson of section.lessons) {
      if (lesson.videoUrl?.publicId) {
        await cloudinary.uploader.destroy(lesson.videoUrl.publicId, { resource_type: 'video' });
      }
      for (const resource of lesson.resources) {
        if (resource.publicId) {
          await cloudinary.uploader.destroy(resource.publicId);
        }
      }
    }
  }

  await Course.findByIdAndDelete(req.params.id);

  // Update teacher stats
  const teacher = await User.findById(req.user.id);
  teacher.teacherProfile.courseStats.totalCourses = Math.max(0, teacher.teacherProfile.courseStats.totalCourses - 1);
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Course deleted successfully'
  });
});

// @desc    Publish course
// @route   PUT /api/teacher/courses/:id/publish
// @access  Private (Teacher only)
const publishCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }

  // Make sure teacher owns the course
  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to publish this course'
    });
  }

  // Update course status to published
  course.status = 'published';
  course.publishedAt = new Date();
  await course.save();

  res.status(200).json({
    success: true,
    message: 'Course published successfully',
    data: course
  });
});

// @desc    Unpublish course
// @route   PUT /api/teacher/courses/:id/unpublish
// @access  Private (Teacher only)
const unpublishCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }

  // Make sure teacher owns the course
  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to unpublish this course'
    });
  }

  // Update course status to draft
  course.status = 'draft';
  await course.save();

  res.status(200).json({
    success: true,
    message: 'Course unpublished successfully',
    data: course
  });
});

// @desc    Get course students
// @route   GET /api/teacher/courses/:id/students
// @access  Private
const getCourseStudents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('enrolledStudents.student', 'name email avatar lastActive')
    .populate('instructor', 'name');

  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }

  // Make sure teacher owns the course
  if (course.instructor._id.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to view this course students'
    });
  }

  const students = course.enrolledStudents.map(enrollment => ({
    student: enrollment.student,
    enrolledAt: enrollment.enrolledAt,
    progress: enrollment.progress,
    completed: enrollment.completed,
    completedLessons: enrollment.completedLessons,
    lastActive: enrollment.student.lastActive
  }));

  res.status(200).json({
    success: true,
    data: {
      courseTitle: course.title,
      totalStudents: students.length,
      students
    }
  });
});

// @desc    Get course analytics
// @route   GET /api/teacher/courses/:id/analytics
// @access  Private
const getCourseAnalytics = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('enrolledStudents.student', 'name email')
    .populate('ratings.user', 'name');

  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }

  // Make sure teacher owns the course
  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to view this course analytics'
    });
  }

  // Calculate analytics
  const totalStudents = course.enrolledStudents.length;
  const completedStudents = course.enrolledStudents.filter(s => s.completed).length;
  const completionRate = totalStudents > 0 ? (completedStudents / totalStudents) * 100 : 0;
  
  const averageProgress = totalStudents > 0 
    ? course.enrolledStudents.reduce((sum, s) => sum + s.progress, 0) / totalStudents 
    : 0;

  const ratingsData = course.ratings || [];
  const averageRating = ratingsData.length > 0 
    ? ratingsData.reduce((sum, r) => sum + r.rating, 0) / ratingsData.length 
    : 0;

  // Enrollment trend (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const enrollmentTrend = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));
    
    const enrollmentsToday = course.enrolledStudents.filter(
      s => s.enrolledAt >= dayStart && s.enrolledAt <= dayEnd
    ).length;
    
    enrollmentTrend.push({
      date: dayStart.toISOString().split('T')[0],
      enrollments: enrollmentsToday
    });
  }

  // Rating distribution
  const ratingDistribution = {
    5: ratingsData.filter(r => r.rating === 5).length,
    4: ratingsData.filter(r => r.rating === 4).length,
    3: ratingsData.filter(r => r.rating === 3).length,
    2: ratingsData.filter(r => r.rating === 2).length,
    1: ratingsData.filter(r => r.rating === 1).length
  };

  const analytics = {
    overview: {
      totalStudents,
      completedStudents,
      completionRate: Math.round(completionRate * 100) / 100,
      averageProgress: Math.round(averageProgress * 100) / 100,
      averageRating: Math.round(averageRating * 100) / 100,
      totalRatings: ratingsData.length,
      revenue: totalStudents * course.price
    },
    enrollmentTrend,
    ratingDistribution,
    recentReviews: ratingsData.slice(-5).reverse()
  };

  res.status(200).json({
    success: true,
    data: analytics
  });
});

// @desc    Get teacher earnings
// @route   GET /api/teacher/earnings
// @access  Private
const getEarnings = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);
  const courses = await Course.find({ instructor: req.user.id });

  // Calculate total revenue from courses
  const totalRevenue = courses.reduce((sum, course) => {
    return sum + (course.enrolledStudents.length * course.price);
  }, 0);

  // Platform fee (typically 30% for platforms like Udemy)
  const platformFeeRate = 0.30;
  const platformFee = totalRevenue * platformFeeRate;
  const netEarnings = totalRevenue - platformFee;

  const earningsData = {
    totalRevenue,
    platformFee,
    netEarnings,
    pendingPayouts: teacher.teacherProfile?.earnings?.pendingPayouts || 0,
    totalPayouts: teacher.teacherProfile?.earnings?.totalEarnings || 0,
    payoutHistory: teacher.teacherProfile?.earnings?.payoutHistory || [],
    courseEarnings: courses.map(course => ({
      courseId: course._id,
      title: course.title,
      students: course.enrolledStudents.length,
      revenue: course.enrolledStudents.length * course.price,
      netEarnings: (course.enrolledStudents.length * course.price) * (1 - platformFeeRate)
    }))
  };

  res.status(200).json({
    success: true,
    data: earningsData
  });
});

// Placeholder functions for advanced features
const updateBankDetails = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);
  
  teacher.teacherProfile.paymentInfo = {
    ...teacher.teacherProfile.paymentInfo,
    ...req.body
  };
  
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Bank details updated successfully'
  });
});

const requestPayout = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const teacher = await User.findById(req.user.id);

  // Add payout request logic here
  teacher.teacherProfile.earnings.payoutHistory.push({
    amount,
    date: new Date(),
    status: 'pending',
    transactionId: crypto.randomBytes(16).toString('hex')
  });

  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Payout request submitted successfully'
  });
});

const getPayoutHistory = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: teacher.teacherProfile?.earnings?.payoutHistory || []
  });
});

const updateAvailability = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);
  
  teacher.teacherProfile.availability = {
    ...teacher.teacherProfile.availability,
    ...req.body
  };
  
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Availability updated successfully'
  });
});

const getTeacherReviews = asyncHandler(async (req, res) => {
  const courses = await Course.find({ instructor: req.user.id })
    .populate('ratings.user', 'name avatar');

  const allReviews = courses.flatMap(course => 
    course.ratings.map(rating => ({
      ...rating.toObject(),
      courseTitle: course.title,
      courseId: course._id
    }))
  );

  res.status(200).json({
    success: true,
    data: allReviews.sort((a, b) => b.createdAt - a.createdAt)
  });
});

const respondToReview = asyncHandler(async (req, res) => {
  // Implementation for responding to reviews
  res.status(200).json({
    success: true,
    message: 'Response added successfully'
  });
});

const getCommunications = asyncHandler(async (req, res) => {
  // Implementation for getting teacher communications
  res.status(200).json({
    success: true,
    data: []
  });
});

const sendMessage = asyncHandler(async (req, res) => {
  // Implementation for sending messages
  res.status(200).json({
    success: true,
    message: 'Message sent successfully'
  });
});

const scheduleSession = asyncHandler(async (req, res) => {
  // Implementation for scheduling sessions
  res.status(200).json({
    success: true,
    message: 'Session scheduled successfully'
  });
});

const getUpcomingSessions = asyncHandler(async (req, res) => {
  // Implementation for getting upcoming sessions
  res.status(200).json({
    success: true,
    data: []
  });
});

const bulkUploadCourses = asyncHandler(async (req, res) => {
  // Implementation for bulk course upload
  res.status(200).json({
    success: true,
    message: 'Courses uploaded successfully'
  });
});

const exportCourseData = asyncHandler(async (req, res) => {
  // Implementation for exporting course data
  res.status(200).json({
    success: true,
    message: 'Course data exported successfully'
  });
});

const getTeacherStats = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);
  const courses = await Course.find({ instructor: req.user.id });

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0),
    totalEarnings: teacher.teacherProfile?.earnings?.totalEarnings || 0,
    averageRating: teacher.teacherProfile?.courseStats?.averageRating || 0
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

const updateTeacherSettings = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.user.id);
  
  // Update various settings
  if (req.body.preferences) {
    teacher.preferences = { ...teacher.preferences, ...req.body.preferences };
  }
  
  if (req.body.teacherProfile) {
    teacher.teacherProfile = { ...teacher.teacherProfile, ...req.body.teacherProfile };
  }
  
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Settings updated successfully'
  });
});

const getStudentFeedback = asyncHandler(async (req, res) => {
  // Implementation for getting student feedback
  res.status(200).json({
    success: true,
    data: []
  });
});

const createAssignment = asyncHandler(async (req, res) => {
  // Implementation for creating assignments
  res.status(200).json({
    success: true,
    message: 'Assignment created successfully'
  });
});

const gradeAssignment = asyncHandler(async (req, res) => {
  // Implementation for grading assignments
  res.status(200).json({
    success: true,
    message: 'Assignment graded successfully'
  });
});

const createQuiz = asyncHandler(async (req, res) => {
  // Implementation for creating quizzes
  res.status(200).json({
    success: true,
    message: 'Quiz created successfully'
  });
});

const createCertificate = asyncHandler(async (req, res) => {
  // Implementation for creating certificates
  res.status(200).json({
    success: true,
    message: 'Certificate created successfully'
  });
});

// Admin functions
const approveTeacher = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.params.id);
  
  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  teacher.teacherProfile.applicationStatus = 'approved';
  teacher.teacherProfile.isApproved = true;
  teacher.teacherProfile.approvedAt = new Date();
  
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Teacher approved successfully'
  });
});

const rejectTeacher = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.params.id);
  
  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  teacher.teacherProfile.applicationStatus = 'rejected';
  teacher.teacherProfile.isApproved = false;
  
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Teacher application rejected'
  });
});

const verifyTeacher = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.params.id);
  
  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  teacher.teacherProfile.verification.isVerified = true;
  teacher.teacherProfile.verification.verificationDate = new Date();
  
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'Teacher verified successfully'
  });
});

// @desc    Get pending teacher applications (Admin only)
// @route   GET /api/admin/teachers/pending
// @access  Private (Admin)
const getPendingApplications = asyncHandler(async (req, res) => {
  const pendingTeachers = await User.find({
    role: 'instructor',
    'teacherProfile.applicationStatus': 'pending'
  }).select('name email teacherProfile.verification teacherProfile.applicationSubmittedAt bio teachingExperience expertise');

  res.status(200).json({
    success: true,
    count: pendingTeachers.length,
    data: pendingTeachers
  });
});

// @desc    Review teacher verification documents (Admin only)
// @route   GET /api/admin/teachers/:id/verification
// @access  Private (Admin)
const getTeacherVerification = asyncHandler(async (req, res) => {
  const teacher = await User.findById(req.params.id);
  
  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      teacherId: teacher._id,
      name: teacher.name,
      email: teacher.email,
      verification: teacher.teacherProfile.verification,
      teachingExperience: teacher.teacherProfile.teachingExperience,
      expertise: teacher.teacherProfile.expertise,
      bio: teacher.bio
    }
  });
});

// @desc    Approve/Reject teacher application (Admin only)
// @route   PUT /api/admin/teachers/:id/review
// @access  Private (Admin)
const reviewTeacherApplication = asyncHandler(async (req, res) => {
  const { status, notes } = req.body; // status: 'approved' or 'rejected'
  const adminId = req.user.id;
  
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid status. Must be "approved" or "rejected"'
    });
  }

  const teacher = await User.findById(req.params.id);
  
  if (!teacher || teacher.role !== 'instructor') {
    return res.status(404).json({
      success: false,
      error: 'Teacher not found'
    });
  }

  // Update verification status
  teacher.teacherProfile.verification.status = status;
  teacher.teacherProfile.verification.reviewedAt = new Date();
  teacher.teacherProfile.verification.reviewedBy = adminId;
  teacher.teacherProfile.verification.notes = notes || '';
  teacher.teacherProfile.applicationStatus = status;
  teacher.teacherProfile.isApproved = status === 'approved';

  await teacher.save();

  // TODO: Send email notification to teacher about approval/rejection

  res.status(200).json({
    success: true,
    message: `Teacher application ${status} successfully`,
    data: {
      teacherId: teacher._id,
      status,
      reviewedAt: teacher.teacherProfile.verification.reviewedAt
    }
  });
});

// @desc    Upload video for course
// @route   POST /api/teacher/upload/video
// @access  Private (Teacher only)
const uploadVideo = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No video file provided'
      });
    }

    console.log('Video upload middleware result:', req.file);

    // FIXED: Use Cloudinary secure_url directly
    const videoData = {
      id: req.file.public_id || req.file.filename,
      url: req.file.secure_url || req.file.path, // Use secure_url from Cloudinary
      publicId: req.file.public_id,
      duration: req.file.duration,
      format: req.file.format,
      size: req.file.bytes || req.file.size,
      width: req.file.width,
      height: req.file.height,
      // Generate video thumbnail
      thumbnail: req.file.public_id ? 
        `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_10p,w_400,h_225,c_fill/${req.file.public_id}.jpg` :
        null
    };

    // Debug log to verify Cloudinary URL
    console.log('Cloudinary video upload result:', videoData);
    
    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      data: videoData
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while uploading video'
    });
  }
});

// @desc    Upload image (for thumbnails)
// @route   POST /api/teacher/upload/image
// @access  Private (Teacher only)
const uploadImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    console.log('Upload middleware result:', req.file);

    // FIXED: Use Cloudinary secure_url directly
    const imageData = {
      id: req.file.public_id || req.file.filename,
      url: req.file.secure_url || req.file.path, // Use secure_url from Cloudinary
      publicId: req.file.public_id,
      format: req.file.format,
      size: req.file.bytes || req.file.size,
      width: req.file.width,
      height: req.file.height
    };

    // Debug log to verify Cloudinary URL
    console.log('Cloudinary upload result:', imageData);
    
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: imageData
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while uploading image'
    });
  }
});

module.exports = {
  registerTeacher,
  uploadVerificationDocuments,
  loginTeacher,
  getTeacherProfile,
  updateTeacherProfile,
  uploadDocuments,
  getTeacherDashboard,
  getTeacherCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
  getCourseStudents,
  getCourseAnalytics,
  getEarnings,
  updateBankDetails,
  requestPayout,
  getPayoutHistory,
  updateAvailability,
  getTeacherReviews,
  respondToReview,
  getCommunications,
  sendMessage,
  scheduleSession,
  getUpcomingSessions,
  bulkUploadCourses,
  exportCourseData,
  getTeacherStats,
  updateTeacherSettings,
  getStudentFeedback,
  createAssignment,
  gradeAssignment,
  createQuiz,
  createCertificate,
  approveTeacher,
  rejectTeacher,
  verifyTeacher,
  uploadVideo,
  uploadImage,
  getPendingApplications,
  getTeacherVerification,
  reviewTeacherApplication
};
