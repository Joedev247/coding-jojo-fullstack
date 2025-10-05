const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Course = require('../models/Course');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const socketIo = require('socket.io');

// @desc    Get teacher messages/conversations
// @route   GET /api/teacher/messages
// @access  Private (Teachers only)
const getTeacherMessages = asyncHandler(async (req, res) => {
  const { type = 'all', status = 'all', page = 1, limit = 20 } = req.query;

  try {
    const query = {
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    };

    // Filter by message type
    if (type !== 'all') {
      query.type = type;
    }

    // Filter by status
    if (status !== 'all') {
      query.status = status;
    }

    const messages = await Message.find(query)
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar')
      .populate('course', 'title')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Group messages into conversations
    const conversations = {};
    
    messages.forEach(message => {
      const otherUser = message.sender._id.toString() === req.user.id 
        ? message.recipient 
        : message.sender;
      
      const conversationId = otherUser._id.toString();
      
      if (!conversations[conversationId]) {
        conversations[conversationId] = {
          user: otherUser,
          messages: [],
          lastMessage: message,
          unreadCount: 0
        };
      }
      
      conversations[conversationId].messages.push(message);
      
      if (!message.read && message.recipient._id.toString() === req.user.id) {
        conversations[conversationId].unreadCount++;
      }
    });

    const conversationList = Object.values(conversations);

    res.status(200).json({
      success: true,
      data: {
        conversations: conversationList,
        totalMessages: messages.length
      }
    });

  } catch (error) {
    console.error('Messages Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// @desc    Send message to student
// @route   POST /api/teacher/messages
// @access  Private (Teachers only)
const sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, subject, content, type = 'direct', courseId, priority = 'normal' } = req.body;

  if (!recipientId || !content) {
    return res.status(400).json({
      success: false,
      error: 'Recipient and message content are required'
    });
  }

  try {
    // Verify recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        error: 'Recipient not found'
      });
    }

    // If course-related, verify teacher owns the course
    let course = null;
    if (courseId) {
      course = await Course.findById(courseId);
      if (!course || course.instructor.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to send messages for this course'
        });
      }
    }

    // Create message
    const message = await Message.create({
      sender: req.user.id,
      recipient: recipientId,
      subject,
      content,
      type,
      course: courseId,
      priority,
      metadata: {
        teacherMessage: true,
        sentAt: new Date()
      }
    });

    await message.populate([
      { path: 'sender', select: 'name email avatar' },
      { path: 'recipient', select: 'name email avatar' },
      { path: 'course', select: 'title' }
    ]);

    // Create notification for recipient
    await Notification.create({
      user: recipientId,
      type: 'message',
      title: 'New Message from Instructor',
      message: `You have a new message from ${req.user.name}`,
      data: {
        messageId: message._id,
        senderId: req.user.id,
        senderName: req.user.name,
        courseId: courseId || null
      },
      priority
    });

    // Emit real-time notification if socket.io is available
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${recipientId}`).emit('new_message', {
        messageId: message._id,
        sender: {
          id: req.user.id,
          name: req.user.name
        },
        preview: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
        type,
        courseId
      });
    }

    res.status(201).json({
      success: true,
      data: message
    });

  } catch (error) {
    console.error('Send Message Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
});

// @desc    Send bulk message to course students
// @route   POST /api/teacher/messages/bulk
// @access  Private (Teachers only)
const sendBulkMessage = asyncHandler(async (req, res) => {
  const { courseId, subject, content, recipientFilter = 'all', priority = 'normal' } = req.body;

  if (!courseId || !content) {
    return res.status(400).json({
      success: false,
      error: 'Course ID and message content are required'
    });
  }

  try {
    // Verify course ownership
    const course = await Course.findById(courseId)
      .populate('enrolledStudents.student', 'name email');

    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to send messages for this course'
      });
    }

    // Filter recipients based on criteria
    let recipients = course.enrolledStudents;

    switch (recipientFilter) {
      case 'active':
        recipients = recipients.filter(enrollment => 
          enrollment.progress > 0 && !enrollment.completed
        );
        break;
      case 'completed':
        recipients = recipients.filter(enrollment => enrollment.completed);
        break;
      case 'struggling':
        recipients = recipients.filter(enrollment => 
          enrollment.progress > 0 && enrollment.progress < 25
        );
        break;
      case 'inactive':
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        recipients = recipients.filter(enrollment => 
          enrollment.student.lastActive < oneWeekAgo
        );
        break;
      // 'all' - no filtering needed
    }

    const messages = [];
    const notifications = [];

    // Create messages for each recipient
    for (const enrollment of recipients) {
      const message = {
        sender: req.user.id,
        recipient: enrollment.student._id,
        subject,
        content,
        type: 'course_announcement',
        course: courseId,
        priority,
        metadata: {
          bulkMessage: true,
          recipientFilter,
          sentAt: new Date()
        }
      };

      messages.push(message);

      // Create notification
      notifications.push({
        user: enrollment.student._id,
        type: 'course_announcement',
        title: `Course Announcement: ${course.title}`,
        message: subject || content.substring(0, 100) + '...',
        data: {
          courseId,
          courseName: course.title,
          senderId: req.user.id,
          senderName: req.user.name
        },
        priority
      });
    }

    // Bulk insert messages and notifications
    const createdMessages = await Message.insertMany(messages);
    await Notification.insertMany(notifications);

    // Send real-time notifications
    const io = req.app.get('io');
    if (io) {
      recipients.forEach(enrollment => {
        io.to(`user_${enrollment.student._id}`).emit('course_announcement', {
          courseId,
          courseName: course.title,
          sender: req.user.name,
          subject,
          preview: content.substring(0, 100) + (content.length > 100 ? '...' : '')
        });
      });
    }

    res.status(201).json({
      success: true,
      data: {
        messagesSent: createdMessages.length,
        recipients: recipients.length,
        course: course.title,
        recipientFilter
      }
    });

  } catch (error) {
    console.error('Bulk Message Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send bulk message'
    });
  }
});

// @desc    Create discussion forum for course
// @route   POST /api/teacher/courses/:courseId/discussions
// @access  Private (Teachers only)
const createCourseDiscussion = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, content, category = 'general', pinned = false } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      error: 'Title and content are required'
    });
  }

  try {
    // Verify course ownership
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to create discussions for this course'
      });
    }

    // For now, we'll add this to the course model
    // In a full implementation, you'd have a separate Discussion model
    const discussionData = {
      id: new Date().getTime().toString(),
      title,
      content,
      category,
      author: req.user.id,
      authorName: req.user.name,
      pinned,
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (!course.discussions) {
      course.discussions = [];
    }

    course.discussions.unshift(discussionData);
    await course.save();

    // Notify all course students
    const notifications = course.enrolledStudents.map(enrollment => ({
      user: enrollment.student,
      type: 'discussion_created',
      title: 'New Discussion in Course',
      message: `${req.user.name} started a new discussion: ${title}`,
      data: {
        courseId,
        courseName: course.title,
        discussionId: discussionData.id,
        discussionTitle: title
      }
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      data: discussionData
    });

  } catch (error) {
    console.error('Discussion Creation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create discussion'
    });
  }
});

// @desc    Schedule live session/webinar
// @route   POST /api/teacher/courses/:courseId/live-sessions
// @access  Private (Teachers only)
const scheduleLiveSession = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { 
    title, 
    description, 
    scheduledFor, 
    duration, 
    maxParticipants, 
    sessionType = 'webinar',
    requiresRegistration = true 
  } = req.body;

  if (!title || !scheduledFor) {
    return res.status(400).json({
      success: false,
      error: 'Title and scheduled time are required'
    });
  }

  try {
    // Verify course ownership
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to schedule sessions for this course'
      });
    }

    const sessionData = {
      id: new Date().getTime().toString(),
      title,
      description,
      scheduledFor: new Date(scheduledFor),
      duration: duration || 60, // minutes
      sessionType,
      maxParticipants,
      requiresRegistration,
      instructor: req.user.id,
      instructorName: req.user.name,
      registeredParticipants: [],
      status: 'scheduled',
      createdAt: new Date()
    };

    // Add to course
    if (!course.liveSessions) {
      course.liveSessions = [];
    }

    course.liveSessions.push(sessionData);
    await course.save();

    // Notify all course students
    const notifications = course.enrolledStudents.map(enrollment => ({
      user: enrollment.student,
      type: 'live_session_scheduled',
      title: 'New Live Session Scheduled',
      message: `${req.user.name} scheduled a live session: ${title}`,
      data: {
        courseId,
        courseName: course.title,
        sessionId: sessionData.id,
        sessionTitle: title,
        scheduledFor: sessionData.scheduledFor
      }
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      data: sessionData
    });

  } catch (error) {
    console.error('Live Session Scheduling Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to schedule live session'
    });
  }
});

// @desc    Create assignment for course
// @route   POST /api/teacher/courses/:courseId/assignments
// @access  Private (Teachers only)
const createAssignment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { 
    title, 
    description, 
    instructions, 
    dueDate, 
    maxScore, 
    submissionTypes, 
    allowLateSubmission = false,
    rubric 
  } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({
      success: false,
      error: 'Title, description, and due date are required'
    });
  }

  try {
    // Verify course ownership
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to create assignments for this course'
      });
    }

    const assignmentData = {
      id: new Date().getTime().toString(),
      title,
      description,
      instructions,
      dueDate: new Date(dueDate),
      maxScore: maxScore || 100,
      submissionTypes: submissionTypes || ['text'],
      allowLateSubmission,
      rubric: rubric || [],
      createdBy: req.user.id,
      createdByName: req.user.name,
      submissions: [],
      status: 'active',
      createdAt: new Date()
    };

    // Add to course
    if (!course.assignments) {
      course.assignments = [];
    }

    course.assignments.push(assignmentData);
    await course.save();

    // Notify all course students
    const notifications = course.enrolledStudents.map(enrollment => ({
      user: enrollment.student,
      type: 'assignment_created',
      title: 'New Assignment Available',
      message: `New assignment in ${course.title}: ${title}`,
      data: {
        courseId,
        courseName: course.title,
        assignmentId: assignmentData.id,
        assignmentTitle: title,
        dueDate: assignmentData.dueDate
      }
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      data: assignmentData
    });

  } catch (error) {
    console.error('Assignment Creation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create assignment'
    });
  }
});

// @desc    Send personalized feedback to student
// @route   POST /api/teacher/students/:studentId/feedback
// @access  Private (Teachers only)
const sendStudentFeedback = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { 
    courseId, 
    feedbackType = 'general', 
    content, 
    suggestions, 
    encouragement,
    grade,
    isPublic = false 
  } = req.body;

  if (!content) {
    return res.status(400).json({
      success: false,
      error: 'Feedback content is required'
    });
  }

  try {
    // Verify student and course
    const [student, course] = await Promise.all([
      User.findById(studentId),
      Course.findById(courseId)
    ]);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to provide feedback for this course'
      });
    }

    // Check if student is enrolled
    const enrollment = course.enrolledStudents.find(
      e => e.student.toString() === studentId
    );

    if (!enrollment) {
      return res.status(400).json({
        success: false,
        error: 'Student is not enrolled in this course'
      });
    }

    const feedbackData = {
      id: new Date().getTime().toString(),
      student: studentId,
      studentName: student.name,
      instructor: req.user.id,
      instructorName: req.user.name,
      course: courseId,
      courseName: course.title,
      feedbackType,
      content,
      suggestions: suggestions || [],
      encouragement,
      grade,
      isPublic,
      createdAt: new Date()
    };

    // Add feedback to course
    if (!course.studentFeedback) {
      course.studentFeedback = [];
    }

    course.studentFeedback.push(feedbackData);
    await course.save();

    // Create notification for student
    await Notification.create({
      user: studentId,
      type: 'feedback_received',
      title: 'New Feedback from Instructor',
      message: `You received feedback from ${req.user.name} in ${course.title}`,
      data: {
        courseId,
        courseName: course.title,
        feedbackId: feedbackData.id,
        instructorName: req.user.name,
        feedbackType
      }
    });

    res.status(201).json({
      success: true,
      data: feedbackData
    });

  } catch (error) {
    console.error('Feedback Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send feedback'
    });
  }
});

module.exports = {
  getTeacherMessages,
  sendMessage,
  sendBulkMessage,
  createCourseDiscussion,
  scheduleLiveSession,
  createAssignment,
  sendStudentFeedback
};
