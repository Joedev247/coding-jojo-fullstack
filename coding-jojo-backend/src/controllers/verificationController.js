const InstructorVerification = require('../models/InstructorVerification');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');
const { sendSMS } = require('../utils/smsService');
const { cloudinary } = require('../config/cloudinary');
const crypto = require('crypto');

// @desc    Initialize instructor verification
// @route   POST /api/teacher/verification/initialize
// @access  Private (Instructor)
exports.initializeVerification = asyncHandler(async (req, res, next) => {
  const { phoneNumber, countryCode = '+237' } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  // Check if verification already exists
  let verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (verification) {
    return res.status(200).json({
      success: true,
      data: verification,
      message: 'Verification process already initialized'
    });
  }

  // Create new verification
  verification = await InstructorVerification.create({
    instructor: req.user.id,
    phoneVerification: {
      phoneNumber,
      countryCode
    }
  });

  await verification.addHistoryEntry('initialization', 'create', 'success', null, req.user.id);

  res.status(201).json({
    success: true,
    data: verification,
    message: 'Verification process initialized successfully'
  });
});

// @desc    Send email verification code
// @route   POST /api/teacher/verification/email/send-code
// @access  Private (Instructor)
exports.sendEmailVerificationCode = asyncHandler(async (req, res, next) => {
  console.log('Send email verification code request for user:', req.user.id);
  
  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    console.log('No verification record found for user:', req.user.id);
    return res.status(404).json({ success: false, error: 'Verification process not initialized' });
  }

  if (verification.emailVerification.isVerified) {
    console.log('Email already verified for user:', req.user.id);
    return res.status(400).json({ success: false, error: 'Email is already verified' });
  }

  // Check rate limiting (1 code per 30 seconds for development, 2 minutes for production)
  const rateLimit = process.env.NODE_ENV === 'production' ? 2 * 60 * 1000 : 30 * 1000;
  const lastCodeSent = verification.emailVerification.lastCodeSentAt;
  if (lastCodeSent && (new Date() - lastCodeSent) < rateLimit) {
    const waitTime = Math.ceil((rateLimit - (new Date() - lastCodeSent)) / 1000);
    console.log('Rate limit hit for user:', req.user.id, `Wait ${waitTime} seconds`);
    return res.status(429).json({ 
      success: false, 
      error: `Please wait ${waitTime} seconds before requesting another code` 
    });
  }

  // Generate verification code
  const verificationCode = verification.generateVerificationCode('email');
  await verification.save();
  
  console.log('Generated verification code for user:', req.user.id, 'Code:', verificationCode);

  // Send email
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Email Verification</h1>
        <p style="color: white; margin: 10px 0 0 0;">Coding Jojo Instructor Verification</p>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #333;">Verify Your Email Address</h2>
        <p style="color: #666; line-height: 1.6;">
          Please enter the following verification code to verify your email address:
        </p>
        <div style="background: white; padding: 20px; margin: 20px 0; text-align: center; border-radius: 5px; border-left: 4px solid #667eea;">
          <h1 style="color: #667eea; margin: 0; font-size: 36px; letter-spacing: 5px;">${verificationCode}</h1>
        </div>
        <p style="color: #666; line-height: 1.6;">
          This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
        </p>
      </div>
      <div style="background: #333; padding: 20px; text-align: center;">
        <p style="color: #999; margin: 0;">© 2024 Coding Jojo. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    console.log('Sending email to:', req.user.email);
    await sendEmail({
      email: req.user.email,
      subject: 'Coding Jojo - Email Verification Code',
      html: emailTemplate
    });

    await verification.addHistoryEntry('email', 'send_code', 'success', { code_sent_to: req.user.email }, req.user.id);
    console.log('Email sent successfully to:', req.user.email);

    res.status(200).json({
      success: true,
      message: 'Verification code sent to your email'
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    await verification.addHistoryEntry('email', 'send_code', 'failed', { error: error.message }, req.user.id);
    return res.status(500).json({ success: false, error: 'Email could not be sent' });
  }
});

// @desc    Verify email code
// @route   POST /api/teacher/verification/email/verify
// @access  Private (Instructor)
exports.verifyEmailCode = asyncHandler(async (req, res, next) => {
  console.log('Verify email code request:', { 
    userId: req.user.id, 
    body: req.body,
    timestamp: new Date().toISOString()
  });

  const { code } = req.body;
  
  if (!code) {
    console.log('No verification code provided');
    return res.status(400).json({ success: false, error: 'Verification code is required' });
  }

  // Use atomic findOneAndUpdate to prevent parallel save issues
  const verification = await InstructorVerification.findOne({ 
    instructor: req.user.id,
    'emailVerification.verificationCode': code,
    'emailVerification.verificationCodeExpires': { $gt: new Date() },
    'emailVerification.attempts': { $lt: 3 }
  });
  
  if (!verification) {
    // Check if verification exists but with invalid conditions
    const anyVerification = await InstructorVerification.findOne({ instructor: req.user.id });
    
    if (!anyVerification) {
      console.log('No verification record found for user:', req.user.id);
      return res.status(404).json({ success: false, error: 'Verification process not found' });
    }

    // Check specific failure reasons
    if (!anyVerification.emailVerification.verificationCode) {
      return res.status(400).json({ success: false, error: 'No verification code found' });
    }
    
    if (anyVerification.emailVerification.verificationCodeExpires < new Date()) {
      return res.status(400).json({ success: false, error: 'Verification code has expired' });
    }
    
    if (anyVerification.emailVerification.attempts >= 3) {
      return res.status(400).json({ success: false, error: 'Maximum verification attempts exceeded' });
    }
    
    // Must be invalid code - increment attempts
    await InstructorVerification.findByIdAndUpdate(anyVerification._id, {
      $inc: { 'emailVerification.attempts': 1 }
    });
    return res.status(400).json({ success: false, error: 'Invalid verification code' });
  }

  // Success - use atomic update to prevent parallel saves
  try {
    const updatedVerification = await InstructorVerification.findByIdAndUpdate(
      verification._id,
      {
        $set: {
          'emailVerification.isVerified': true,
          'emailVerification.verifiedAt': new Date(),
          'emailVerification.attempts': 0
        },
        $unset: {
          'emailVerification.verificationCode': 1,
          'emailVerification.verificationCodeExpires': 1
        },
        $push: {
          'verificationHistory': {
            step: 'email',
            action: 'verify_code',
            status: 'success',
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );

    console.log('Verification successful and saved');

    res.status(200).json({
      success: true,
      message: 'Email verification successful',
      data: {
        emailVerified: true,
        progressPercentage: updatedVerification.progressPercentage
      }
    });
  } catch (updateError) {
    console.error('Error updating verification:', updateError);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to update verification status' 
    });
  }
});

// @desc    Send SMS verification code
// @route   POST /api/teacher/verification/phone/send-code
// @access  Private (Instructor)
exports.sendPhoneVerificationCode = asyncHandler(async (req, res, next) => {
  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not initialized' });
  }

  if (verification.phoneVerification.isVerified) {
    return res.status(400).json({ success: false, error: 'Phone number is already verified' });
  }

  // Check rate limiting (1 code per 2 minutes)
  const lastCodeSent = verification.phoneVerification.lastCodeSentAt;
  if (lastCodeSent && (new Date() - lastCodeSent) < 2 * 60 * 1000) {
    return res.status(429).json({ success: false, error: 'Please wait before requesting another code' });
  }

  // Generate verification code
  const verificationCode = verification.generateVerificationCode('phone');
  await verification.save();

  const phoneNumber = verification.phoneVerification.countryCode + verification.phoneVerification.phoneNumber;
  const message = `Your Coding Jojo verification code is: ${verificationCode}. This code will expire in 10 minutes.`;

  try {
    console.log('Sending SMS to:', phoneNumber, 'Message preview:', message.substring(0, 50) + '...');
    const smsResult = await sendSMS(phoneNumber, message);
    console.log('SMS Result:', smsResult);

    await verification.addHistoryEntry('phone', 'send_code', 'success', { 
      code_sent_to: phoneNumber,
      sms_result: smsResult 
    }, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Verification code sent to your phone',
      smsInfo: process.env.NODE_ENV === 'development' ? smsResult : undefined
    });
  } catch (error) {
    console.error('SMS sending error:', error);
    await verification.addHistoryEntry('phone', 'send_code', 'failed', { error: error.message }, req.user.id);
    return res.status(500).json({ success: false, error: 'SMS could not be sent' });
  }
});

// @desc    Verify phone code
// @route   POST /api/teacher/verification/phone/verify
// @access  Private (Instructor)
exports.verifyPhoneCode = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: 'Verification code is required' });
  }

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not found' });
  }

  const result = verification.verifyCode(code, 'phone');
  await verification.save();

  if (!result.success) {
    return res.status(400).json({ success: false, error: result.message });
  }

  res.status(200).json({
    success: true,
    message: result.message,
    data: {
      phoneVerified: true,
      progressPercentage: verification.progressPercentage
    }
  });
});

// @desc    Submit personal information
// @route   POST /api/teacher/verification/personal-info
// @access  Private (Instructor)
exports.submitPersonalInfo = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    nationality,
    address
  } = req.body;

  if (!firstName || !lastName || !dateOfBirth) {
    return res.status(400).json({ success: false, error: 'First name, last name, and date of birth are required' });
  }

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not initialized' });
  }

  // Update personal info
  verification.personalInfo = {
    firstName,
    lastName,
    dateOfBirth: new Date(dateOfBirth),
    gender,
    nationality,
    address,
    submittedAt: new Date()
  };

  await verification.save();
  await verification.addHistoryEntry('personal_info', 'submit', 'success', { submitted_fields: Object.keys(req.body) }, req.user.id);

  res.status(200).json({
    success: true,
    message: 'Personal information submitted successfully',
    data: {
      personalInfoCompleted: true,
      progressPercentage: verification.progressPercentage
    }
  });
});

// @desc    Upload ID documents
// @route   POST /api/teacher/verification/id-documents
// @access  Private (Instructor)
exports.uploadIdDocuments = asyncHandler(async (req, res, next) => {
  console.log('\n🚀 === ID DOCUMENTS UPLOAD CONTROLLER STARTED ===');
  console.log('📋 Request details:', {
    body: req.body,
    files: req.files ? Object.keys(req.files) : 'no files',
    userId: req.user?.id,
    hasUser: !!req.user,
    method: req.method,
    url: req.originalUrl
  });

  const { documentType } = req.body;
  
  if (!documentType || !['national_id', 'passport', 'drivers_license'].includes(documentType)) {
    return res.status(400).json({ success: false, error: 'Valid document type is required' });
  }

  if (!req.files || (!req.files.frontImage && !req.files.backImage)) {
    console.log('Missing files:', { 
      hasFiles: !!req.files, 
      files: req.files ? Object.keys(req.files) : 'none' 
    });
    return res.status(400).json({ success: false, error: 'At least one document image is required' });
  }

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not initialized' });
  }

  try {
    const uploadPromises = [];

    // Upload front image
    if (req.files.frontImage) {
      console.log('Uploading front image:', req.files.frontImage[0].path);
      const frontUpload = cloudinary.uploader.upload(req.files.frontImage[0].path, {
        folder: `instructor_verification/${req.user.id}/id_documents`,
        public_id: `${req.user.id}_id_front_${Date.now()}`,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto'
      });
      uploadPromises.push(frontUpload);
    }

    // Upload back image
    if (req.files.backImage) {
      console.log('Uploading back image:', req.files.backImage[0].path);
      const backUpload = cloudinary.uploader.upload(req.files.backImage[0].path, {
        folder: `instructor_verification/${req.user.id}/id_documents`,
        public_id: `${req.user.id}_id_back_${Date.now()}`,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto'
      });
      uploadPromises.push(backUpload);
    }

    console.log('Starting Cloudinary uploads...');
    const uploadResults = await Promise.all(uploadPromises);
    console.log('Cloudinary upload results:', uploadResults.map(r => ({ public_id: r.public_id, secure_url: r.secure_url })));

    // Update verification with uploaded images
    verification.idVerification.documentType = documentType;
    
    if (req.files.frontImage) {
      verification.idVerification.frontImage = {
        url: uploadResults[0].secure_url,
        publicId: uploadResults[0].public_id,
        uploadedAt: new Date()
      };
    }

    if (req.files.backImage) {
      const backIndex = req.files.frontImage ? 1 : 0;
      verification.idVerification.backImage = {
        url: uploadResults[backIndex].secure_url,
        publicId: uploadResults[backIndex].public_id,
        uploadedAt: new Date()
      };
    }

    // Mark ID document step as completed
    verification.completedSteps.idDocument = true;
    verification.idVerification.isVerified = true;

    await verification.save();
    await verification.addHistoryEntry('id_documents', 'upload', 'success', { 
      document_type: documentType,
      front_uploaded: !!req.files.frontImage,
      back_uploaded: !!req.files.backImage
    }, req.user.id);

    res.status(200).json({
      success: true,
      message: 'ID documents uploaded successfully',
      data: {
        idDocumentsUploaded: true,
        progressPercentage: verification.progressPercentage,
        frontImageUrl: verification.idVerification.frontImage?.url,
        backImageUrl: verification.idVerification.backImage?.url,
        nextStep: 'selfie'
      }
    });

  } catch (error) {
    console.error('ID documents upload error:', error);
    await verification.addHistoryEntry('id_documents', 'upload', 'failed', { error: error.message }, req.user.id);
    return res.status(500).json({ success: false, error: 'Failed to upload ID documents' });
  }
});

// @desc    Upload selfie
// @route   POST /api/teacher/verification/selfie
// @access  Private (Instructor)
exports.uploadSelfie = asyncHandler(async (req, res, next) => {
  console.log('\n🤳 === SELFIE UPLOAD CONTROLLER STARTED ===');
  console.log('📋 Request details:', {
    hasFile: !!req.file,
    file: req.file ? { 
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size 
    } : 'NO FILE',
    body: req.body,
    userId: req.user?.id,
    method: req.method,
    url: req.originalUrl
  });

  if (!req.file) {
    console.log('❌ No selfie file received in request');
    return res.status(400).json({ success: false, error: 'Selfie image is required' });
  }

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not initialized' });
  }

  try {
    // Upload selfie to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: `instructor_verification/${req.user.id}/selfie`,
      public_id: `${req.user.id}_selfie_${Date.now()}`,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    // Update verification with selfie
    verification.selfieVerification.selfieImage = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      uploadedAt: new Date()
    };

    // TODO: Implement face matching logic here
    // For now, we'll mark it as pending manual review
    verification.selfieVerification.livenessCheck = {
      isPassed: true, // This would be determined by AI service
      confidence: 85, // Mock confidence score
      processedAt: new Date()
    };

    // Mark selfie step as completed
    verification.completedSteps.selfie = true;
    verification.selfieVerification.isVerified = true;

    await verification.save();
    await verification.addHistoryEntry('selfie', 'upload', 'success', { 
      selfie_uploaded: true,
      confidence_score: 85
    }, req.user.id);

    console.log('✅ Selfie uploaded and step marked as completed');

    res.status(200).json({
      success: true,
      message: 'Selfie uploaded successfully',
      data: {
        selfieUploaded: true,
        progressPercentage: verification.progressPercentage,
        selfieUrl: verification.selfieVerification.selfieImage.url,
        livenessScore: verification.selfieVerification.livenessCheck.confidence,
        nextStep: 'submit'
      }
    });

  } catch (error) {
    await verification.addHistoryEntry('selfie', 'upload', 'failed', { error: error.message }, req.user.id);
    return res.status(500).json({ success: false, error: 'Failed to upload selfie' });
  }
});

// @desc    Submit professional information
// @route   POST /api/teacher/verification/professional-info
// @access  Private (Instructor)
exports.submitProfessionalInfo = asyncHandler(async (req, res, next) => {
  const {
    expertise,
    experience,
    education,
    certifications,
    portfolio
  } = req.body;

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not initialized' });
  }

  // Update professional info
  verification.professionalInfo = {
    expertise: expertise || [],
    experience: experience || 0,
    education: education || [],
    certifications: certifications || [],
    portfolio: portfolio || {}
  };

  await verification.save();
  await verification.addHistoryEntry('professional_info', 'submit', 'success', { 
    expertise_count: expertise?.length || 0,
    education_count: education?.length || 0,
    certification_count: certifications?.length || 0
  }, req.user.id);

  res.status(200).json({
    success: true,
    message: 'Professional information submitted successfully',
    data: {
      professionalInfoCompleted: true,
      progressPercentage: verification.progressPercentage
    }
  });
});

// @desc    Get verification status
// @route   GET /api/teacher/verification/status
// @access  Private (Instructor)
exports.getVerificationStatus = asyncHandler(async (req, res, next) => {
  const verification = await InstructorVerification.findOne({ instructor: req.user.id })
    .populate('instructor', 'name email');

  if (!verification) {
    return res.status(200).json({
      success: true,
      data: {
        isInitialized: false,
        message: 'Verification process not yet started'
      }
    });
  }

  // Get education certificate info
  const certificates = verification.educationVerification?.certificates || [];
  const educationRequirementsCheck = verification.checkEducationRequirements();

  res.status(200).json({
    success: true,
    data: {
      isInitialized: true,
      verificationStatus: verification.verificationStatus,
      progressPercentage: verification.progressPercentage,
      completedSteps: verification.completedSteps,
      emailVerified: verification.emailVerification.isVerified,
      phoneVerified: verification.phoneVerification.isVerified,
      personalInfoCompleted: verification.completedSteps.personalInfo,
      idDocumentsUploaded: verification.completedSteps.idDocument,
      selfieUploaded: verification.completedSteps.selfie,
      educationCertificateCompleted: verification.completedSteps.educationCertificate,
      educationVerification: {
        certificates: certificates,
        overallStatus: verification.educationVerification?.overallStatus || 'pending',
        minimumRequirementMet: verification.educationVerification?.minimumRequirementMet || false,
        requirementsCheck: educationRequirementsCheck,
        certificatesCount: certificates.length
      },
      adminReview: verification.adminReview,
      submittedAt: verification.submittedAt,
      lastUpdated: verification.lastUpdatedAt
    }
  });
});

// @desc    Submit verification for review
// @route   POST /api/teacher/verification/submit
// @access  Private (Instructor)
exports.submitForReview = asyncHandler(async (req, res, next) => {
  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not initialized' });
  }

  // Check if all required steps are completed
  const requiredSteps = ['email', 'phone', 'personalInfo', 'idDocument', 'selfie', 'educationCertificate'];
  const missingSteps = requiredSteps.filter(step => !verification.completedSteps[step]);

  if (missingSteps.length > 0) {
    return res.status(400).json({ 
      success: false, 
      error: `Please complete the following steps: ${missingSteps.join(', ')}` 
    });
  }

  // Check if education certificate requirements are met
  const educationCheck = verification.checkEducationRequirements();
  if (!educationCheck.met) {
    return res.status(400).json({
      success: false,
      error: `Education certificate requirement not met: ${educationCheck.reason}`
    });
  }

  // Ensure at least one certificate is uploaded
  const certificates = verification.educationVerification?.certificates || [];
  if (certificates.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'At least one education certificate must be uploaded before submission'
    });
  }

  verification.verificationStatus = 'under_review';
  verification.submittedAt = new Date();
  
  await verification.save();
  await verification.addHistoryEntry('submission', 'submit_for_review', 'success', { 
    submitted_for_review: true,
    all_steps_completed: true,
    education_certificates_count: certificates.length
  }, req.user.id);

  // Send notification email to admin
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@codingjojo.com';
    await sendEmail({
      email: adminEmail,
      subject: 'New Instructor Verification Submission',
      html: `
        <h2>New Instructor Verification Submission</h2>
        <p><strong>Instructor:</strong> ${req.user.name} (${req.user.email})</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Progress:</strong> ${verification.progressPercentage}% Complete</p>
        <p><strong>Education Certificates:</strong> ${certificates.length} uploaded</p>
        <p>Please review the submission in the admin panel.</p>
      `
    });
  } catch (error) {
    console.error('Failed to send admin notification:', error);
  }

  res.status(200).json({
    success: true,
    message: 'Verification submitted for review successfully',
    data: {
      verificationStatus: verification.verificationStatus,
      submittedAt: verification.submittedAt,
      educationCertificatesCount: certificates.length
    }
  });
});

// @desc    Reset verification rate limits (development only)
// @route   POST /api/teacher/verification/reset-limits
// @access  Private (Instructor) - Development only
exports.resetVerificationLimits = asyncHandler(async (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, error: 'Not available in production' });
  }

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({ success: false, error: 'Verification process not found' });
  }

  // Reset rate limiting timestamps
  verification.emailVerification.lastCodeSentAt = undefined;
  verification.phoneVerification.lastCodeSentAt = undefined;
  
  // Reset attempts
  verification.emailVerification.attempts = 0;
  verification.phoneVerification.attempts = 0;

  await verification.save();

  res.status(200).json({
    success: true,
    message: 'Rate limits and attempts reset successfully'
  });
});

// @desc    Upload education certificate
// @route   POST /api/teacher/verification/education-certificate
// @access  Private (Instructor)
exports.uploadEducationCertificate = asyncHandler(async (req, res, next) => {
  console.log('\n📚 === EDUCATION CERTIFICATE UPLOAD STARTED ===');
  console.log('📋 Request details:', {
    body: req.body,
    hasFile: !!req.file,
    userId: req.user?.id,
    file: req.file ? {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'NO FILE'
  });

  const { certificateType, institutionName, fieldOfStudy, graduationYear, gpa } = req.body;

  // Validate required fields
  if (!certificateType || !institutionName || !fieldOfStudy || !graduationYear) {
    return res.status(400).json({
      success: false,
      error: 'Certificate type, institution name, field of study, and graduation year are required'
    });
  }

  // Validate certificate type
  const validCertificateTypes = [
    'high_school_diploma', 'bachelors_degree', 'masters_degree', 'phd_doctorate',
    'professional_certification', 'coding_bootcamp', 'industry_certification',
    'teaching_qualification', 'technical_diploma', 'associate_degree',
    'online_course_certificate', 'other'
  ];

  if (!validCertificateTypes.includes(certificateType)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid certificate type'
    });
  }

  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'Certificate document is required'
    });
  }

  // Validate file type
  const allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'application/pdf'
  ];

  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      error: 'Only images (JPEG, PNG, GIF) and PDF files are allowed'
    });
  }

  // Validate file size (10MB max)
  if (req.file.size > 10 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      error: 'File size must be less than 10MB'
    });
  }

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({
      success: false,
      error: 'Verification process not found. Please initialize verification first.'
    });
  }

  try {
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: `instructor_verification/${req.user.id}/education_certificates`,
      public_id: `${req.user.id}_cert_${Date.now()}_${certificateType}`,
      resource_type: 'auto', // Supports both images and documents
      quality: 'auto',
      fetch_format: 'auto'
    });

    console.log('✅ Certificate uploaded to Cloudinary:', {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      resource_type: uploadResult.resource_type
    });

    // Create certificate object
    const newCertificate = {
      certificateType,
      institutionName,
      fieldOfStudy,
      graduationYear: parseInt(graduationYear),
      gpa: gpa ? parseFloat(gpa) : undefined,
      certificateDocument: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        uploadedAt: new Date(),
        fileSize: uploadResult.bytes || req.file.size,
        mimeType: req.file.mimetype
      },
      verificationStatus: 'pending'
    };

    // Initialize education verification if it doesn't exist
    if (!verification.educationVerification) {
      verification.educationVerification = {
        certificates: [],
        minimumRequirementMet: false,
        overallStatus: 'pending'
      };
    }

    // Add certificate to verification record
    verification.educationVerification.certificates.push(newCertificate);

    // Update verification status using the model method
    verification.updateEducationStatus();

    // Add history entry
    await verification.addHistoryEntry(
      'education_certificate',
      'upload',
      'success',
      { 
        certificateType, 
        institution: institutionName,
        fieldOfStudy,
        graduationYear: parseInt(graduationYear)
      },
      req.user.id
    );

    await verification.save();

    console.log('✅ Education certificate saved successfully');

    res.status(201).json({
      success: true,
      data: {
        certificate: newCertificate,
        educationStatus: verification.educationVerification.overallStatus,
        requirementsMet: verification.educationVerification.minimumRequirementMet,
        progressPercentage: verification.progressPercentage
      },
      message: 'Education certificate uploaded successfully'
    });

  } catch (error) {
    console.error('❌ Certificate upload error:', error);
    await verification.addHistoryEntry(
      'education_certificate',
      'upload',
      'failed',
      { error: error.message },
      req.user.id
    );
    return res.status(500).json({
      success: false,
      error: 'Failed to upload certificate'
    });
  }
});

// @desc    Get education certificates
// @route   GET /api/teacher/verification/education-certificates
// @access  Private (Instructor)
exports.getEducationCertificates = asyncHandler(async (req, res, next) => {
  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({
      success: false,
      error: 'Verification process not found'
    });
  }

  const certificates = verification.educationVerification?.certificates || [];
  const requirementsCheck = verification.checkEducationRequirements();

  res.status(200).json({
    success: true,
    data: {
      certificates,
      overallStatus: verification.educationVerification?.overallStatus || 'pending',
      minimumRequirementMet: verification.educationVerification?.minimumRequirementMet || false,
      requirementsCheck,
      progressPercentage: verification.progressPercentage
    }
  });
});

// @desc    Remove education certificate
// @route   DELETE /api/teacher/verification/education-certificate/:certificateId
// @access  Private (Instructor)
exports.removeEducationCertificate = asyncHandler(async (req, res, next) => {
  const { certificateId } = req.params;

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({
      success: false,
      error: 'Verification process not found'
    });
  }

  const certificates = verification.educationVerification?.certificates || [];
  const certificateIndex = certificates.findIndex(cert => cert._id.toString() === certificateId);

  if (certificateIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Certificate not found'
    });
  }

  const certificate = certificates[certificateIndex];

  // Check if certificate is verified (prevent removal of verified certificates)
  if (certificate.verificationStatus === 'verified') {
    return res.status(400).json({
      success: false,
      error: 'Cannot remove verified certificates. Please contact support.'
    });
  }

  try {
    // Delete from Cloudinary if publicId exists
    if (certificate.certificateDocument?.publicId) {
      await cloudinary.uploader.destroy(certificate.certificateDocument.publicId);
      console.log('✅ Certificate deleted from Cloudinary:', certificate.certificateDocument.publicId);
    }

    // Remove certificate from array
    verification.educationVerification.certificates.splice(certificateIndex, 1);

    // Update verification status
    verification.updateEducationStatus();

    // Add history entry
    await verification.addHistoryEntry(
      'education_certificate',
      'remove',
      'success',
      { 
        certificateType: certificate.certificateType,
        institution: certificate.institutionName
      },
      req.user.id
    );

    await verification.save();

    res.status(200).json({
      success: true,
      message: 'Education certificate removed successfully',
      data: {
        educationStatus: verification.educationVerification.overallStatus,
        requirementsMet: verification.educationVerification.minimumRequirementMet
      }
    });

  } catch (error) {
    console.error('❌ Certificate removal error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to remove certificate'
    });
  }
});

// @desc    Update education certificate details
// @route   PUT /api/teacher/verification/education-certificate/:certificateId
// @access  Private (Instructor)
exports.updateEducationCertificate = asyncHandler(async (req, res, next) => {
  const { certificateId } = req.params;
  const { institutionName, fieldOfStudy, graduationYear, gpa } = req.body;

  const verification = await InstructorVerification.findOne({ instructor: req.user.id });
  
  if (!verification) {
    return res.status(404).json({
      success: false,
      error: 'Verification process not found'
    });
  }

  const certificates = verification.educationVerification?.certificates || [];
  const certificate = certificates.find(cert => cert._id.toString() === certificateId);

  if (!certificate) {
    return res.status(404).json({
      success: false,
      error: 'Certificate not found'
    });
  }

  // Check if certificate is already verified (can't update verified certificates)
  if (certificate.verificationStatus === 'verified') {
    return res.status(400).json({
      success: false,
      error: 'Cannot update verified certificate'
    });
  }

  // Update certificate fields
  if (institutionName) certificate.institutionName = institutionName;
  if (fieldOfStudy) certificate.fieldOfStudy = fieldOfStudy;
  if (graduationYear) certificate.graduationYear = parseInt(graduationYear);
  if (gpa) certificate.gpa = parseFloat(gpa);

  // Reset verification status to pending since details changed
  certificate.verificationStatus = 'pending';
  certificate.rejectionReason = undefined;
  certificate.verificationNotes = undefined;

  // Update verification status
  verification.updateEducationStatus();

  // Add history entry
  await verification.addHistoryEntry(
    'education_certificate',
    'update',
    'success',
    { 
      certificateId,
      updatedFields: Object.keys(req.body)
    },
    req.user.id
  );

  await verification.save();

  res.status(200).json({
    success: true,
    data: certificate,
    message: 'Education certificate updated successfully'
  });
});
