const Course = require('../models/Course');
const User = require('../models/User');
const { 
  processUploadedFiles, 
  cleanupFiles, 
  deleteOldFiles, 
  deleteFile,
  getVideoMetadata,
  generateVideoThumbnail 
} = require('../middleware/upload');
const { isConnected } = require('../config/database');

// Helper function to check database connection
const checkDatabaseConnection = (res) => {
  if (!isConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database connection not available. Please try again in a moment.',
      error: 'SERVICE_UNAVAILABLE'
    });
  }
  return null;
};

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
      id: course._id, // Transform _id to id for frontend
      title: course.title,
      description: course.description,
      level: course.level,
      category: course.category,
      price: course.price,
      originalPrice: course.originalPrice,
      // FIXED: Use thumbnailUrl first, then fall back to thumbnail.url
      thumbnail: course.thumbnailUrl || course.thumbnail?.url || 'https://res.cloudinary.com/your-cloud/image/upload/v1/coding-jojo/defaults/no-thumbnail.jpg',
      duration: course.duration,
      totalLessons: course.totalLessons,
      averageRating: course.averageRating || 0,
      totalRatings: course.totalRatings || 0,
      totalEnrollments: course.totalEnrollments || 0,
      instructor: {
        id: course.instructor?._id, // Transform _id to id
        name: course.instructor?.name,
        avatar: course.instructor?.avatar?.url || course.instructor?.avatar || '', // Map avatarUrl to avatar
        role: course.instructor?.role || '',
        bio: course.instructor?.bio || 'Experienced instructor'
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
    // Check database connection first
    const connectionError = checkDatabaseConnection(res);
    if (connectionError) return connectionError;

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
      // FIXED: Ensure thumbnail is a string for frontend compatibility
      thumbnail: course.thumbnailUrl || course.thumbnail?.url || '',
      duration: course.duration,
      totalLessons: course.totalLessons,
      averageRating: course.averageRating || 0,
      totalRatings: course.totalRatings || 0,
      totalEnrollments: course.totalEnrollments || 0,
      instructor: {
        id: course.instructor._id,
        name: course.instructor.name,
        avatarUrl: typeof course.instructor.avatar === 'string'
          ? course.instructor.avatar
          : (course.instructor.avatar?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'),
        bio: course.instructor.bio || 'Experienced instructor',
        role: course.instructor.role || '',
      },
      isPremium: course.isPremium,
      isFeatured: course.isFeatured,
      tags: course.tags,
      isNew: course.isNew || false,
      isSaved: false,
      rating: course.averageRating || 0,
      ratingCount: course.totalRatings || 0,
      studentsEnrolled: course.totalEnrollments || 0,
      progress: 0,
      createdAt: course.createdAt,
      status: course.status || 'published',
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
    });  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructor/Admin)
const createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courseData = req.body;

    // Process uploaded files
    let processedFiles = {};
    if (req.files && Object.keys(req.files).length > 0) {
      try {
        processedFiles = await processUploadedFiles(req.files);
      } catch (error) {
        await cleanupFiles(req.files);
        return res.status(400).json({
          success: false,
          error: 'Error processing uploaded files: ' + error.message
        });
      }
    }

    // Create course object
    const newCourse = {
      ...courseData,
      instructor: instructorId,
      ...processedFiles
    };

    // Parse JSON fields if they exist
    if (courseData.courseContent && typeof courseData.courseContent === 'string') {
      newCourse.courseContent = JSON.parse(courseData.courseContent);
    }
    if (courseData.tags && typeof courseData.tags === 'string') {
      newCourse.tags = JSON.parse(courseData.tags);
    }
    if (courseData.prerequisites && typeof courseData.prerequisites === 'string') {
      newCourse.prerequisites = JSON.parse(courseData.prerequisites);
    }
    if (courseData.learningObjectives && typeof courseData.learningObjectives === 'string') {
      newCourse.learningObjectives = JSON.parse(courseData.learningObjectives);
    }

    const course = await Course.create(newCourse);

    // Populate instructor details
    await course.populate('instructor', 'name email avatar bio');

    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });

  } catch (error) {
    // Clean up uploaded files on error
    if (req.files) {
      await cleanupFiles(req.files);
    }
    
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while creating course'
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Instructor/Admin)
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;
    const updateData = req.body;

    // Find existing course
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      if (req.files) await cleanupFiles(req.files);
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check if user is the instructor or admin
    if (existingCourse.instructor.toString() !== instructorId && req.user.role !== 'admin') {
      if (req.files) await cleanupFiles(req.files);
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this course'
      });
    }

    // Process uploaded files
    let processedFiles = {};
    if (req.files && Object.keys(req.files).length > 0) {
      try {
        processedFiles = await processUploadedFiles(req.files);
        // Delete old files if new ones are uploaded
        await deleteOldFiles(existingCourse, processedFiles);
      } catch (error) {
        await cleanupFiles(req.files);
        return res.status(400).json({
          success: false,
          error: 'Error processing uploaded files: ' + error.message
        });
      }
    }

    // Merge update data with processed files
    const updateFields = {
      ...updateData,
      ...processedFiles
    };

    // Parse JSON fields if they exist
    if (updateData.courseContent && typeof updateData.courseContent === 'string') {
      updateFields.courseContent = JSON.parse(updateData.courseContent);
    }
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateFields.tags = JSON.parse(updateData.tags);
    }
    if (updateData.prerequisites && typeof updateData.prerequisites === 'string') {
      updateFields.prerequisites = JSON.parse(updateData.prerequisites);
    }
    if (updateData.learningObjectives && typeof updateData.learningObjectives === 'string') {
      updateFields.learningObjectives = JSON.parse(updateData.learningObjectives);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email avatar bio');

    res.json({
      success: true,
      data: updatedCourse,
      message: 'Course updated successfully'
    });

  } catch (error) {
    // Clean up uploaded files on error
    if (req.files) {
      await cleanupFiles(req.files);
    }
    
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating course'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor/Admin)
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.id;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check if user is the instructor or admin
    if (course.instructor.toString() !== instructorId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this course'
      });
    }

    // Delete associated files from Cloudinary
    const filesToDelete = [];

    // Add thumbnail
    if (course.thumbnail && course.thumbnail.publicId) {
      filesToDelete.push(deleteFile(course.thumbnail.publicId, 'image'));
    }

    // Add images
    if (course.images && course.images.length > 0) {
      course.images.forEach(image => {
        if (image.publicId) {
          filesToDelete.push(deleteFile(image.publicId, 'image'));
        }
      });
    }

    // Add videos from course content
    if (course.courseContent && course.courseContent.length > 0) {
      course.courseContent.forEach(section => {
        if (section.lessons && section.lessons.length > 0) {
          section.lessons.forEach(lesson => {
            if (lesson.videoUrl && lesson.videoUrl.publicId) {
              filesToDelete.push(deleteFile(lesson.videoUrl.publicId, 'video'));
            }
            // Add resources
            if (lesson.resources && lesson.resources.length > 0) {
              lesson.resources.forEach(resource => {
                if (resource.publicId) {
                  filesToDelete.push(deleteFile(resource.publicId, 'raw'));
                }
              });
            }
          });
        }
      });
    }

    // Delete files from Cloudinary
    await Promise.all(filesToDelete);

    // Delete course from database
    await Course.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting course'
    });
  }
};

// @desc    Upload lesson video
// @route   POST /api/courses/:courseId/lessons/:lessonId/video
// @access  Private (Instructor/Admin)
const uploadLessonVideo = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const instructorId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No video file uploaded'
      });
    }

    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      await deleteFile(req.file.filename, 'video');
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check authorization
    if (course.instructor.toString() !== instructorId && req.user.role !== 'admin') {
      await deleteFile(req.file.filename, 'video');
      return res.status(403).json({
        success: false,
        error: 'Not authorized to upload videos to this course'
      });
    }

    // Find lesson
    let lesson = null;
    let sectionIndex = -1;
    let lessonIndex = -1;

    for (let i = 0; i < course.courseContent.length; i++) {
      const section = course.courseContent[i];
      for (let j = 0; j < section.lessons.length; j++) {
        if (section.lessons[j]._id.toString() === lessonId) {
          lesson = section.lessons[j];
          sectionIndex = i;
          lessonIndex = j;
          break;
        }
      }
      if (lesson) break;
    }

    if (!lesson) {
      await deleteFile(req.file.filename, 'video');
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }

    // Delete old video if exists
    if (lesson.videoUrl && lesson.videoUrl.publicId) {
      await deleteFile(lesson.videoUrl.publicId, 'video');
    }

    // Get video metadata and thumbnail
    const videoMetadata = await getVideoMetadata(req.file.filename);
    const videoThumbnail = generateVideoThumbnail(req.file.filename);

    // Update lesson with new video
    course.courseContent[sectionIndex].lessons[lessonIndex].videoUrl = {
      url: req.file.path,
      publicId: req.file.filename,
      duration: videoMetadata.duration,
      format: videoMetadata.format,
      size: videoMetadata.bytes,
      width: videoMetadata.width,
      height: videoMetadata.height,
      thumbnail: videoThumbnail
    };

    // Update lesson duration (convert from seconds to minutes)
    course.courseContent[sectionIndex].lessons[lessonIndex].duration = Math.ceil(videoMetadata.duration / 60);

    await course.save();

    res.json({
      success: true,
      data: {
        videoUrl: course.courseContent[sectionIndex].lessons[lessonIndex].videoUrl,
        duration: course.courseContent[sectionIndex].lessons[lessonIndex].duration
      },
      message: 'Video uploaded successfully'
    });

  } catch (error) {
    // Clean up uploaded file on error
    if (req.file) {
      await deleteFile(req.file.filename, 'video');
    }
    
    console.error('Upload lesson video error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while uploading video'
    });
  }
};



// @desc    Rate a course
// @route   POST /api/courses/:id/rate
// @access  Private (Student)
const rateCourse = async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ success: false, message: 'Database connection not available.' });
  }
  const courseId = req.params.id;
  const userId = req.user.id;
  const { rating, review } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    // Remove previous rating by user if exists
    course.ratings = course.ratings.filter(r => r.user.toString() !== userId);
    // Add new rating
    course.ratings.push({ user: userId, rating, review });
    // Update averageRating and totalRatings
    course.totalRatings = course.ratings.length;
    course.averageRating = course.ratings.reduce((sum, r) => sum + r.rating, 0) / (course.totalRatings || 1);
    await course.save();
    res.json({
      success: true,
      data: {
        averageRating: course.averageRating,
        totalRatings: course.totalRatings
      },
      message: 'Rating submitted successfully.'
    });
  } catch (err) {
    console.error('Error rating course:', err);
    res.status(500).json({ success: false, message: 'Server error while rating course.' });
  }
};

// @desc    Like/Unlike a course
// @route   POST /api/courses/:id/like
// @access  Private
const likeCourse = async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ success: false, message: 'Database connection not available.' });
  }
  
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    
    // Check if user already liked the course
    const existingLike = course.likes.find(like => like.user.toString() === userId);
    
    if (existingLike) {
      // Unlike: Remove like
      course.likes = course.likes.filter(like => like.user.toString() !== userId);
      course.totalLikes = Math.max(0, course.totalLikes - 1);
      await course.save();
      
      res.json({
        success: true,
        data: {
          isLiked: false,
          totalLikes: course.totalLikes
        },
        message: 'Course unliked successfully.'
      });
    } else {
      // Like: Add like
      course.likes.push({ user: userId });
      course.totalLikes += 1;
      await course.save();
      
      res.json({
        success: true,
        data: {
          isLiked: true,
          totalLikes: course.totalLikes
        },
        message: 'Course liked successfully.'
      });
    }
  } catch (err) {
    console.error('Error liking course:', err);
    res.status(500).json({ success: false, message: 'Server error while liking course.' });
  }
};

// @desc    Add a comment to a course
// @route   POST /api/courses/:id/comments
// @access  Private
const addComment = async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ success: false, message: 'Database connection not available.' });
  }
  
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Comment content is required.' });
    }
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    
    // Add comment
    const newComment = {
      user: userId,
      content: content.trim(),
      likes: [],
      totalLikes: 0,
      replies: []
    };
    
    course.comments.push(newComment);
    course.totalComments += 1;
    await course.save();
    
    // Populate the new comment with user data
    await course.populate('comments.user', 'name avatar');
    const addedComment = course.comments[course.comments.length - 1];
    
    res.json({
      success: true,
      data: addedComment,
      message: 'Comment added successfully.'
    });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ success: false, message: 'Server error while adding comment.' });
  }
};

// @desc    Get course comments
// @route   GET /api/courses/:id/comments
// @access  Public
const getCourseComments = async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ success: false, message: 'Database connection not available.' });
  }
  
  try {
    const courseId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const course = await Course.findById(courseId)
      .populate('comments.user', 'name avatar')
      .populate('comments.replies.user', 'name avatar')
      .select('comments totalComments');
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    
    // Sort comments by newest first and paginate
    const sortedComments = course.comments
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skip, skip + limit);
    
    const totalPages = Math.ceil(course.totalComments / limit);
    
    res.json({
      success: true,
      data: sortedComments,
      pagination: {
        currentPage: page,
        totalPages,
        totalComments: course.totalComments,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      message: 'Comments retrieved successfully.'
    });
  } catch (err) {
    console.error('Error getting comments:', err);
    res.status(500).json({ success: false, message: 'Server error while getting comments.' });
  }
};

// @desc    Like/Unlike a comment
// @route   POST /api/courses/:id/comments/:commentId/like
// @access  Private
const likeComment = async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ success: false, message: 'Database connection not available.' });
  }
  
  try {
    const { id: courseId, commentId } = req.params;
    const userId = req.user.id;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    
    const comment = course.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found.' });
    }
    
    // Check if user already liked the comment
    const existingLike = comment.likes.find(like => like.user.toString() === userId);
    
    if (existingLike) {
      // Unlike: Remove like
      comment.likes = comment.likes.filter(like => like.user.toString() !== userId);
      comment.totalLikes = Math.max(0, comment.totalLikes - 1);
    } else {
      // Like: Add like
      comment.likes.push({ user: userId });
      comment.totalLikes += 1;
    }
    
    await course.save();
    
    res.json({
      success: true,
      data: {
        isLiked: !existingLike,
        totalLikes: comment.totalLikes
      },
      message: existingLike ? 'Comment unliked successfully.' : 'Comment liked successfully.'
    });
  } catch (err) {
    console.error('Error liking comment:', err);
    res.status(500).json({ success: false, message: 'Server error while liking comment.' });
  }
};

// @desc    Add a reply to a comment
// @route   POST /api/courses/:id/comments/:commentId/reply
// @access  Private
const addReply = async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ success: false, message: 'Database connection not available.' });
  }
  
  try {
    const { id: courseId, commentId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Reply content is required.' });
    }
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    
    const comment = course.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found.' });
    }
    
    // Add reply
    const newReply = {
      user: userId,
      content: content.trim()
    };
    
    comment.replies.push(newReply);
    await course.save();
    
    // Populate the new reply with user data
    await course.populate('comments.replies.user', 'name avatar');
    const addedReply = comment.replies[comment.replies.length - 1];
    
    res.json({
      success: true,
      data: addedReply,
      message: 'Reply added successfully.'
    });
  } catch (err) {
    console.error('Error adding reply:', err);
    res.status(500).json({ success: false, message: 'Server error while adding reply.' });
  }
};

// @desc    Share a course (increment share count)
// @route   POST /api/courses/:id/share
// @access  Public
const shareCourse = async (req, res) => {
  if (!isConnected()) {
    return res.status(503).json({ success: false, message: 'Database connection not available.' });
  }
  
  try {
    const courseId = req.params.id;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    
    course.shares += 1;
    await course.save();
    
    res.json({
      success: true,
      data: {
        shares: course.shares
      },
      message: 'Course shared successfully.'
    });
  } catch (err) {
    console.error('Error sharing course:', err);
    res.status(500).json({ success: false, message: 'Server error while sharing course.' });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadLessonVideo,
  enrollInCourse,
  getFeaturedCourses,
  getCategories,
  rateCourse,
  likeCourse,
  addComment,
  getCourseComments,
  likeComment,
  addReply,
  shareCourse
};
