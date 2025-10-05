const mongoose = require('mongoose');

// Instructor Verification Schema
const instructorVerificationSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Step 1: Email Verification
  emailVerification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationCode: String,
    verificationCodeExpires: Date,
    attempts: {
      type: Number,
      default: 0
    },
    verifiedAt: Date,
    lastCodeSentAt: Date
  },

  // Step 2: Phone/SMS Verification
  phoneVerification: {
    phoneNumber: {
      type: String,
      required: true
    },
    countryCode: {
      type: String,
      default: '+237' // Cameroon default
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationCode: String,
    verificationCodeExpires: Date,
    attempts: {
      type: Number,
      default: 0
    },
    verifiedAt: Date,
    lastCodeSentAt: Date
  },

  // Step 3: Personal Information
  personalInfo: {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    dateOfBirth: {
      type: Date,
      required: false
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    nationality: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    submittedAt: Date
  },

  // Step 4: ID Document Upload (Front & Back)
  idVerification: {
    documentType: {
      type: String,
      enum: ['national_id', 'passport', 'drivers_license'],
      required: false
    },
    frontImage: {
      url: String,
      publicId: String, // Cloudinary public ID
      uploadedAt: Date
    },
    backImage: {
      url: String,
      publicId: String,
      uploadedAt: Date
    },
    extractedData: {
      documentNumber: String,
      expiryDate: Date,
      issueDate: Date,
      fullName: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    rejectionReason: String
  },

  // Step 5: Selfie/Face Verification
  selfieVerification: {
    selfieImage: {
      url: String,
      publicId: String,
      uploadedAt: Date
    },
    faceMatch: {
      confidence: Number, // 0-100
      isMatch: Boolean,
      processedAt: Date
    },
    livenessCheck: {
      isPassed: Boolean,
      confidence: Number,
      processedAt: Date
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    rejectionReason: String
  },

  // Professional Information (Optional but recommended)
  professionalInfo: {
    expertise: [String],
    experience: {
      type: Number, // Years
      default: 0
    },
    education: [{
      degree: String,
      institution: String,
      graduationYear: Number,
      certificate: {
        url: String,
        publicId: String
      }
    }],
    certifications: [{
      name: String,
      issuer: String,
      issueDate: Date,
      expiryDate: Date,
      credentialUrl: String,
      certificate: {
        url: String,
        publicId: String
      }
    }],
    portfolio: {
      website: String,
      github: String,
      linkedin: String,
      projects: [{
        title: String,
        description: String,
        url: String,
        technologies: [String]
      }]
    }
  },

  // Overall Verification Status
  verificationStatus: {
    type: String,
    enum: ['pending', 'in_progress', 'under_review', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },

  // Progress Tracking
  completedSteps: {
    email: {
      type: Boolean,
      default: false
    },
    phone: {
      type: Boolean,
      default: false
    },
    personalInfo: {
      type: Boolean,
      default: false
    },
    idDocument: {
      type: Boolean,
      default: false
    },
    selfie: {
      type: Boolean,
      default: false
    },
    educationCertificate: {
      type: Boolean,
      default: false
    }
  },

  // Step 6: Education Certificate Verification
  educationVerification: {
    certificates: [{
      certificateType: {
        type: String,
        enum: [
          'high_school_diploma', 'bachelors_degree', 'masters_degree', 'phd_doctorate',
          'professional_certification', 'coding_bootcamp', 'industry_certification',
          'teaching_qualification', 'technical_diploma', 'associate_degree',
          'online_course_certificate', 'other'
        ]
      },
      institutionName: String,
      fieldOfStudy: String,
      graduationYear: Number,
      gpa: Number,
      certificateDocument: {
        url: String,
        publicId: String,
        uploadedAt: Date,
        fileSize: Number,
        mimeType: String
      },
      verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected', 'needs_clarification'],
        default: 'pending'
      },
      verificationNotes: String,
      verifiedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      verifiedAt: Date,
      submittedAt: {
        type: Date,
        default: Date.now
      }
    }],
    minimumRequirementMet: {
      type: Boolean,
      default: false
    },
    overallStatus: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected', 'incomplete'],
      default: 'pending'
    },
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    adminNotes: String
  },

  // Admin Review
  adminReview: {
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    status: {
      type: String,
      enum: ['approved', 'rejected', 'needs_more_info']
    },
    notes: String,
    feedback: String // Feedback to instructor
  },

  // Verification History
  verificationHistory: [{
    step: String,
    action: String,
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    details: mongoose.Schema.Types.Mixed,
    performedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }],

  // Security & Compliance
  ipAddresses: [String],
  deviceFingerprints: [String],
  riskScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Timestamps
  submittedAt: Date,
  approvedAt: Date,
  rejectedAt: Date,
  lastUpdatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'instructor_verifications'
});

// Indexes for performance
instructorVerificationSchema.index({ instructor: 1 });
instructorVerificationSchema.index({ verificationStatus: 1 });
instructorVerificationSchema.index({ 'emailVerification.isVerified': 1 });
instructorVerificationSchema.index({ 'phoneVerification.isVerified': 1 });
instructorVerificationSchema.index({ createdAt: -1 });

// Virtual for progress percentage
instructorVerificationSchema.virtual('progressPercentage').get(function() {
  const steps = ['email', 'phone', 'personalInfo', 'idDocument', 'selfie', 'educationCertificate'];
  const completedCount = steps.filter(step => this.completedSteps[step]).length;
  return Math.round((completedCount / steps.length) * 100);
});

// Pre-save middleware to update progress
instructorVerificationSchema.pre('save', function(next) {
  this.lastUpdatedAt = new Date();
  
  // Update completed steps based on verification status
  this.completedSteps.email = this.emailVerification.isVerified;
  this.completedSteps.phone = this.phoneVerification.isVerified;
  this.completedSteps.personalInfo = !!(this.personalInfo.firstName && this.personalInfo.lastName && this.personalInfo.dateOfBirth);
  this.completedSteps.idDocument = this.idVerification.isVerified;
  this.completedSteps.selfie = this.selfieVerification.isVerified;
  this.completedSteps.educationCertificate = this.educationVerification?.overallStatus === 'approved' || 
    this.educationVerification?.minimumRequirementMet || false;

  // Update overall verification status
  if (Object.values(this.completedSteps).every(step => step)) {
    this.verificationStatus = 'under_review';
  } else if (Object.values(this.completedSteps).some(step => step)) {
    this.verificationStatus = 'in_progress';
  }

  next();
});

// Method to add verification history entry
instructorVerificationSchema.methods.addHistoryEntry = function(step, action, status, details = null, performedBy = null) {
  this.verificationHistory.push({
    step,
    action,
    status,
    details,
    performedBy
  });
  // Don't save here - let the caller handle saving
  // return this.save();
};

// Method to generate verification code
instructorVerificationSchema.methods.generateVerificationCode = function(type = 'email') {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  if (type === 'email') {
    this.emailVerification.verificationCode = code;
    this.emailVerification.verificationCodeExpires = expires;
    this.emailVerification.lastCodeSentAt = new Date();
  } else if (type === 'phone') {
    this.phoneVerification.verificationCode = code;
    this.phoneVerification.verificationCodeExpires = expires;
    this.phoneVerification.lastCodeSentAt = new Date();
  }

  return code;
};

// Method to verify code
instructorVerificationSchema.methods.verifyCode = function(code, type = 'email') {
  let verification = type === 'email' ? this.emailVerification : this.phoneVerification;
  
  if (!verification.verificationCode) {
    return { success: false, message: 'No verification code found' };
  }

  if (verification.verificationCodeExpires < new Date()) {
    return { success: false, message: 'Verification code has expired' };
  }

  if (verification.attempts >= 3) {
    return { success: false, message: 'Maximum verification attempts exceeded' };
  }

  if (verification.verificationCode !== code) {
    verification.attempts += 1;
    return { success: false, message: 'Invalid verification code' };
  }

  // Success
  verification.isVerified = true;
  verification.verifiedAt = new Date();
  verification.verificationCode = undefined;
  verification.verificationCodeExpires = undefined;
  verification.attempts = 0;

  this.addHistoryEntry(type, 'verify_code', 'success');
  
  return { success: true, message: 'Verification successful' };
};

// Static method to get verification by instructor ID
instructorVerificationSchema.statics.getByInstructor = function(instructorId) {
  return this.findOne({ instructor: instructorId }).populate('instructor', 'name email role');
};

// Method to check if education certificate requirements are met
instructorVerificationSchema.methods.checkEducationRequirements = function() {
  const certificates = this.educationVerification?.certificates || [];
  
  // Must have at least one certificate
  if (certificates.length === 0) {
    return {
      met: false,
      reason: 'At least one education certificate is required'
    };
  }

  // Check for at least one certificate (any type is acceptable for basic completion)
  // High-level certificates get priority, but any certificate with document upload counts
  const validCertificateTypes = [
    'high_school_diploma',
    'associate_degree',
    'bachelors_degree',
    'masters_degree', 
    'phd_doctorate',
    'professional_certification',
    'coding_bootcamp',
    'industry_certification',
    'teaching_qualification',
    'technical_diploma',
    'online_course_certificate',
    'other'
  ];

  const hasValidCertificate = certificates.some(cert => 
    validCertificateTypes.includes(cert.certificateType) && 
    (cert.verificationStatus === 'verified' || cert.verificationStatus === 'pending') &&
    cert.certificateDocument && cert.certificateDocument.url
  );

  if (!hasValidCertificate) {
    return {
      met: false,
      reason: 'At least one education certificate with uploaded document is required'
    };
  }

  return { met: true };
};

// Method to update education verification status
instructorVerificationSchema.methods.updateEducationStatus = function() {
  if (!this.educationVerification) {
    this.educationVerification = {
      certificates: [],
      minimumRequirementMet: false,
      overallStatus: 'pending'
    };
  }

  const requirements = this.checkEducationRequirements();
  
  this.educationVerification.minimumRequirementMet = requirements.met;
  this.completedSteps.educationCertificate = requirements.met;

  // Update overall education status
  const certificates = this.educationVerification.certificates || [];
  const pendingCertificates = certificates.filter(cert => cert.verificationStatus === 'pending');
  const verifiedCertificates = certificates.filter(cert => cert.verificationStatus === 'verified');
  const rejectedCertificates = certificates.filter(cert => cert.verificationStatus === 'rejected');

  if (verifiedCertificates.length > 0) {
    this.educationVerification.overallStatus = 'approved';
  } else if (pendingCertificates.length > 0 && requirements.met) {
    this.educationVerification.overallStatus = 'under_review';
  } else if (rejectedCertificates.length > 0 && pendingCertificates.length === 0) {
    this.educationVerification.overallStatus = 'rejected';
  } else {
    this.educationVerification.overallStatus = 'incomplete';
  }

  return requirements;
};

// Method to check if all verification steps are complete
instructorVerificationSchema.methods.isVerificationComplete = function() {
  const steps = this.completedSteps;
  return steps.email && steps.phone && steps.personalInfo && 
         steps.idDocument && steps.selfie && steps.educationCertificate;
};

module.exports = mongoose.model('InstructorVerification', instructorVerificationSchema);
