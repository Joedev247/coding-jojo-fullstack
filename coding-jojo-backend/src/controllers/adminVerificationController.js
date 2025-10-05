const InstructorVerification = require('../models/InstructorVerification');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all instructor verifications for admin review
// @route   GET /api/admin/verifications
// @access  Private (Admin)
exports.getAllVerifications = asyncHandler(async (req, res, next) => {
  const {
    status,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build query
  let query = {};
  if (status) {
    query.verificationStatus = status;
  }

  // Build sort object
  const sortObj = {};
  sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Execute query with pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const verifications = await InstructorVerification.find(query)
    .populate('instructor', 'name email avatar role')
    .populate('adminReview.reviewedBy', 'name email')
    .sort(sortObj)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await InstructorVerification.countDocuments(query);

  // Calculate statistics
  const stats = await InstructorVerification.aggregate([
    {
      $group: {
        _id: '$verificationStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  const statsObject = stats.reduce((acc, stat) => {
    acc[stat._id] = stat.count;
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    data: {
      verifications,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      },
      statistics: {
        total,
        pending: statsObject.pending || 0,
        in_progress: statsObject.in_progress || 0,
        under_review: statsObject.under_review || 0,
        approved: statsObject.approved || 0,
        rejected: statsObject.rejected || 0,
        suspended: statsObject.suspended || 0
      }
    }
  });
});

// @desc    Get specific instructor verification for admin review
// @route   GET /api/admin/verifications/:id
// @access  Private (Admin)
exports.getVerificationById = asyncHandler(async (req, res, next) => {
  const verification = await InstructorVerification.findById(req.params.id)
    .populate('instructor', 'name email avatar role createdAt')
    .populate('adminReview.reviewedBy', 'name email')
    .populate('verificationHistory.performedBy', 'name email');

  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification not found' });
  }

  res.status(200).json({
    success: true,
    data: verification
  });
});

// @desc    Approve instructor verification
// @route   PUT /api/admin/verifications/:id/approve
// @access  Private (Admin)
exports.approveVerification = asyncHandler(async (req, res, next) => {
  const { notes, feedback } = req.body;

  const verification = await InstructorVerification.findById(req.params.id)
    .populate('instructor', 'name email');

  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification not found' });
  }

  if (verification.verificationStatus === 'approved') {
    return res.status(400).json({ success: false, error: 'Verification is already approved' });
  }

  // Update verification status
  verification.verificationStatus = 'approved';
  verification.approvedAt = new Date();
  verification.adminReview = {
    reviewedBy: req.user.id,
    reviewedAt: new Date(),
    status: 'approved',
    notes: notes || '',
    feedback: feedback || 'Your instructor verification has been approved!'
  };

  // Mark all verification steps as verified
  verification.idVerification.isVerified = true;
  verification.idVerification.verifiedAt = new Date();
  verification.idVerification.verifiedBy = req.user.id;

  verification.selfieVerification.isVerified = true;
  verification.selfieVerification.verifiedAt = new Date();
  verification.selfieVerification.verifiedBy = req.user.id;

  await verification.save();

  // Update user's teacher profile
  const instructor = await User.findById(verification.instructor._id);
  if (instructor && instructor.teacherProfile) {
    instructor.teacherProfile.isApproved = true;
    instructor.teacherProfile.applicationStatus = 'approved';
    instructor.teacherProfile.verification.status = 'approved';
    instructor.teacherProfile.verification.reviewedAt = new Date();
    instructor.teacherProfile.verification.reviewedBy = req.user.id;
    await instructor.save();
  }

  // Add history entry
  await verification.addHistoryEntry('admin_review', 'approve', 'success', {
    approved_by: req.user.name,
    notes,
    feedback
  }, req.user.id);

  // Send approval email to instructor
  try {
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🎉 Verification Approved!</h1>
          <p style="color: white; margin: 10px 0 0 0;">Congratulations, ${verification.instructor.name}!</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333;">Your Instructor Application Has Been Approved</h2>
          <p style="color: #666; line-height: 1.6;">
            We're excited to welcome you to the Coding Jojo instructor community! Your verification has been approved and you can now:
          </p>
          <ul style="color: #666; line-height: 1.8;">
            <li>Create and publish courses</li>
            <li>Start earning from your expertise</li>
            <li>Connect with students worldwide</li>
            <li>Access advanced instructor tools</li>
          </ul>
          ${feedback ? `
            <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #10b981;">
              <h3 style="color: #10b981; margin-top: 0;">Feedback:</h3>
              <p style="color: #666; margin-bottom: 0;">${feedback}</p>
            </div>
          ` : ''}
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL}/teacher/dashboard" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Start Teaching Now
            </a>
          </div>
        </div>
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0;">© 2024 Coding Jojo. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendEmail({
      email: verification.instructor.email,
      subject: '🎉 Your Coding Jojo Instructor Application Has Been Approved!',
      html: emailTemplate
    });
  } catch (error) {
    console.error('Failed to send approval email:', error);
  }

  res.status(200).json({
    success: true,
    message: 'Instructor verification approved successfully',
    data: {
      verificationStatus: verification.verificationStatus,
      approvedAt: verification.approvedAt,
      instructorName: verification.instructor.name
    }
  });
});

// @desc    Reject instructor verification
// @route   PUT /api/admin/verifications/:id/reject
// @access  Private (Admin)
exports.rejectVerification = asyncHandler(async (req, res, next) => {
  const { reason, feedback, allowResubmission = true } = req.body;

  if (!reason) {
    return res.status(400).json({ success: false, error: 'Rejection reason is required' });
  }

  const verification = await InstructorVerification.findById(req.params.id)
    .populate('instructor', 'name email');

  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification not found' });
  }

  if (verification.verificationStatus === 'rejected') {
    return res.status(400).json({ success: false, error: 'Verification is already rejected' });
  }

  // Update verification status
  verification.verificationStatus = 'rejected';
  verification.rejectedAt = new Date();
  verification.adminReview = {
    reviewedBy: req.user.id,
    reviewedAt: new Date(),
    status: 'rejected',
    notes: reason,
    feedback: feedback || 'Unfortunately, your verification was rejected. Please see the details below and resubmit if applicable.'
  };

  // Add rejection reasons to specific verification steps if needed
  if (reason.includes('ID') || reason.includes('document')) {
    verification.idVerification.rejectionReason = reason;
  }
  if (reason.includes('selfie') || reason.includes('photo')) {
    verification.selfieVerification.rejectionReason = reason;
  }

  await verification.save();

  // Update user's teacher profile
  const instructor = await User.findById(verification.instructor._id);
  if (instructor && instructor.teacherProfile) {
    instructor.teacherProfile.isApproved = false;
    instructor.teacherProfile.applicationStatus = 'rejected';
    instructor.teacherProfile.verification.status = 'rejected';
    instructor.teacherProfile.verification.reviewedAt = new Date();
    instructor.teacherProfile.verification.reviewedBy = req.user.id;
    instructor.teacherProfile.verification.notes = reason;
    await instructor.save();
  }

  // Add history entry
  await verification.addHistoryEntry('admin_review', 'reject', 'rejected', {
    rejected_by: req.user.name,
    reason,
    feedback,
    allow_resubmission: allowResubmission
  }, req.user.id);

  // Send rejection email to instructor
  try {
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Verification Update</h1>
          <p style="color: white; margin: 10px 0 0 0;">Regarding your instructor application</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333;">Verification Requires Attention</h2>
          <p style="color: #666; line-height: 1.6;">
            We've reviewed your instructor verification application and unfortunately, we need you to address some issues before we can proceed.
          </p>
          <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ef4444;">
            <h3 style="color: #ef4444; margin-top: 0;">Issues Found:</h3>
            <p style="color: #666; margin-bottom: 0;">${reason}</p>
          </div>
          ${feedback ? `
            <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #3b82f6;">
              <h3 style="color: #3b82f6; margin-top: 0;">Additional Feedback:</h3>
              <p style="color: #666; margin-bottom: 0;">${feedback}</p>
            </div>
          ` : ''}
          ${allowResubmission ? `
            <p style="color: #666; line-height: 1.6;">
              Don't worry! You can resubmit your verification after addressing these issues. Please log in to your account and update your verification information.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/teacher/verification" 
                 style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Update Verification
              </a>
            </div>
          ` : `
            <p style="color: #666; line-height: 1.6;">
              Unfortunately, this application cannot be resubmitted at this time. Please contact our support team if you have any questions.
            </p>
          `}
        </div>
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0;">© 2024 Coding Jojo. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendEmail({
      email: verification.instructor.email,
      subject: 'Coding Jojo Instructor Verification - Action Required',
      html: emailTemplate
    });
  } catch (error) {
    console.error('Failed to send rejection email:', error);
  }

  res.status(200).json({
    success: true,
    message: 'Instructor verification rejected',
    data: {
      verificationStatus: verification.verificationStatus,
      rejectedAt: verification.rejectedAt,
      reason,
      allowResubmission
    }
  });
});

// @desc    Request more information for verification
// @route   PUT /api/admin/verifications/:id/request-info
// @access  Private (Admin)
exports.requestMoreInfo = asyncHandler(async (req, res, next) => {
  const { message, requiredFields } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  const verification = await InstructorVerification.findById(req.params.id)
    .populate('instructor', 'name email');

  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification not found' });
  }

  // Update verification status
  verification.adminReview = {
    reviewedBy: req.user.id,
    reviewedAt: new Date(),
    status: 'needs_more_info',
    notes: message,
    feedback: message
  };

  await verification.save();

  // Add history entry
  await verification.addHistoryEntry('admin_review', 'request_info', 'needs_more_info', {
    requested_by: req.user.name,
    message,
    required_fields: requiredFields
  }, req.user.id);

  // Send info request email to instructor
  try {
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Additional Information Needed</h1>
          <p style="color: white; margin: 10px 0 0 0;">For your instructor verification</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333;">We Need More Information</h2>
          <p style="color: #666; line-height: 1.6;">
            Hi ${verification.instructor.name}, we're reviewing your instructor verification application and need some additional information to proceed.
          </p>
          <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #f59e0b; margin-top: 0;">Required Information:</h3>
            <p style="color: #666; margin-bottom: 0;">${message}</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            Please log in to your account and provide the requested information. Once submitted, we'll continue reviewing your application.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL}/teacher/verification" 
               style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Provide Information
            </a>
          </div>
        </div>
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0;">© 2024 Coding Jojo. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendEmail({
      email: verification.instructor.email,
      subject: 'Coding Jojo - Additional Information Required for Verification',
      html: emailTemplate
    });
  } catch (error) {
    console.error('Failed to send info request email:', error);
  }

  res.status(200).json({
    success: true,
    message: 'Information request sent to instructor',
    data: {
      status: 'needs_more_info',
      message,
      requestedAt: new Date()
    }
  });
});

// @desc    Get verification statistics for admin dashboard
// @route   GET /api/admin/verifications/stats
// @access  Private (Admin)
exports.getVerificationStats = asyncHandler(async (req, res, next) => {
  const { period = '30' } = req.query;
  const days = parseInt(period);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get overall statistics
  const totalStats = await InstructorVerification.aggregate([
    {
      $group: {
        _id: '$verificationStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  // Get recent submissions
  const recentStats = await InstructorVerification.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          status: '$verificationStatus'
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.date': 1 }
    }
  ]);

  // Get average processing time
  const processingTimes = await InstructorVerification.aggregate([
    {
      $match: {
        verificationStatus: { $in: ['approved', 'rejected'] },
        submittedAt: { $exists: true },
        $or: [
          { approvedAt: { $exists: true } },
          { rejectedAt: { $exists: true } }
        ]
      }
    },
    {
      $project: {
        processingTime: {
          $divide: [
            {
              $subtract: [
                { $ifNull: ['$approvedAt', '$rejectedAt'] },
                '$submittedAt'
              ]
            },
            1000 * 60 * 60 * 24 // Convert to days
          ]
        }
      }
    },
    {
      $group: {
        _id: null,
        averageProcessingDays: { $avg: '$processingTime' },
        minProcessingDays: { $min: '$processingTime' },
        maxProcessingDays: { $max: '$processingTime' }
      }
    }
  ]);

  // Format statistics
  const statsObject = totalStats.reduce((acc, stat) => {
    acc[stat._id] = stat.count;
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    data: {
      total: {
        pending: statsObject.pending || 0,
        in_progress: statsObject.in_progress || 0,
        under_review: statsObject.under_review || 0,
        approved: statsObject.approved || 0,
        rejected: statsObject.rejected || 0,
        suspended: statsObject.suspended || 0
      },
      recent: recentStats,
      processingTime: processingTimes[0] || {
        averageProcessingDays: 0,
        minProcessingDays: 0,
        maxProcessingDays: 0
      },
      period: `Last ${days} days`
    }
  });
});

// @desc    Suspend instructor verification
// @route   PUT /api/admin/verifications/:id/suspend
// @access  Private (Admin)
exports.suspendVerification = asyncHandler(async (req, res, next) => {
  console.log('Suspend verification called with:');
  console.log('Body:', req.body);
  console.log('User:', req.user ? { id: req.user._id, email: req.user.email, role: req.user.role } : 'No user');
  console.log('Params:', req.params);
  
  const { reason, duration } = req.body;

  if (!reason) {
    console.log('Missing reason in request body');
    return res.status(400).json({ success: false, error: 'Suspension reason is required' });
  }

  const verification = await InstructorVerification.findById(req.params.id)
    .populate('instructor', 'name email');

  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification not found' });
  }

  // Update verification status
  verification.verificationStatus = 'suspended';
  verification.suspendedAt = new Date();
  verification.suspensionReason = reason;
  verification.suspensionDuration = duration; // in days
  
  // Add admin review
  verification.adminReview.reviewedBy = req.user._id;
  verification.adminReview.reviewedAt = new Date();
  verification.adminReview.decision = 'suspended';
  verification.adminReview.comments = reason;
  verification.adminReview.actionTaken = 'suspended';

  await verification.save();

  // Update user role if needed
  const user = await User.findById(verification.instructor._id);
  if (user && user.role === 'instructor') {
    user.role = 'user'; // Revoke instructor privileges
    user.instructorStatus = 'suspended';
    await user.save();
  }

  // Send suspension email notification
  try {
    await sendEmail({
      email: verification.instructor.email,
      subject: 'Instructor Verification Suspended - Coding Jojo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">Verification Suspended</h2>
          <p>Dear ${verification.instructor.name},</p>
          <p>Your instructor verification has been suspended for the following reason:</p>
          <div style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>Reason:</strong> ${reason}</p>
            ${duration ? `<p style="margin: 10px 0 0 0; color: #92400e;"><strong>Duration:</strong> ${duration} days</p>` : ''}
          </div>
          <p>You may contact support if you believe this suspension was made in error.</p>
          <p>Best regards,<br>Coding Jojo Admin Team</p>
        </div>
      `
    });
  } catch (emailError) {
    console.error('Failed to send suspension email:', emailError);
  }

  res.status(200).json({
    success: true,
    message: 'Instructor verification suspended',
    data: {
      verificationStatus: verification.verificationStatus,
      suspendedAt: verification.suspendedAt,
      reason,
      duration
    }
  });
});
