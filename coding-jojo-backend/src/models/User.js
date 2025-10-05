const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, "First name cannot be more than 50 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      minlength: 6,
      select: false, // Don't return password by default
    },
    // OAuth fields
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/your-cloud/image/upload/v1/coding-jojo/defaults/default-avatar.jpg",
      },
      publicId: String, // Cloudinary public ID for deletion
      width: Number,
      height: Number,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin", "teacher"],
      default: "student",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    // Teacher-specific fields
    teacherProfile: {
      isApproved: {
        type: Boolean,
        default: false,
      },
      applicationStatus: {
        type: String,
        enum: ['pending','approved','rejected'],
        default: 'pending'
      },
      expertise: [String], // Areas of expertise
      experience: {
        type: Number, // Years of experience
        default: 0,
      },
      education: [{
        degree: String,
        institution: String,
        year: String,
      }],
      certifications: [{
        name: String,
        issuer: String,
        issueDate: Date,
        expiryDate: Date,
        credentialUrl: String,
      }],
      rating: {
        average: {
          type: Number,
          default: 0,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
      earnings: {
        total: {
          type: Number,
          default: 0,
        },
        pending: {
          type: Number,
          default: 0,
        },
        withdrawn: {
          type: Number,
          default: 0,
        },
      },
      payoutInfo: {
        method: {
          type: String,
          enum: ["bank", "paypal", "stripe"],
        },
        details: mongoose.Schema.Types.Mixed,
      },
      coursesCreated: [{
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      }],
      totalStudents: {
        type: Number,
        default: 0,
      },
      teachingSince: {
        type: Date,
        default: Date.now,
      },
      languages: [String],
      timezone: String,
      availability: {
        monday: { available: Boolean, hours: [String] },
        tuesday: { available: Boolean, hours: [String] },
        wednesday: { available: Boolean, hours: [String] },
        thursday: { available: Boolean, hours: [String] },
        friday: { available: Boolean, hours: [String] },
        saturday: { available: Boolean, hours: [String] },
        sunday: { available: Boolean, hours: [String] },
      },
      // Verification fields
      verification: {
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending'
        },
        submittedAt: Date,
        reviewedAt: Date,
        reviewedBy: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        },
        documents: {
          certificates: [String], // URLs to certificate files
          idFront: String, // URL to front of ID
          idBack: String, // URL to back of ID
          selfiePhoto: String, // URL to selfie photo
        },
        personalInfo: {
          dateOfBirth: Date,
          phoneNumber: String,
        },
        notes: String, // Admin notes about verification
      },
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot be more than 500 characters"],
    },
    skills: [
      {
        type: String,
      },
    ],
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
    enrolledCourses: [
      {
        courseId: {
          type: mongoose.Schema.ObjectId,
          ref: "Course",
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
        progress: {
          type: Number,
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    achievements: [
      {
        title: String,
        description: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
        icon: String,
      },
    ],
    subscription: {
      plan: {
        type: String,
        enum: ["free", "premium", "enterprise"],
        default: "free",
      },
      startDate: Date,
      endDate: Date,
      stripeCustomerId: String,
      stripeSubscriptionId: String,
    },
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      marketingEmails: {
        type: Boolean,
        default: false,
      },
    },
    // Community features
    following: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        followedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        followedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    communityStats: {
      postsCount: {
        type: Number,
        default: 0,
      },
      commentsCount: {
        type: Number,
        default: 0,
      },
      likesReceived: {
        type: Number,
        default: 0,
      },
      reputation: {
        type: Number,
        default: 0,
      },
    },
    // Teacher/Instructor specific fields
    teacherProfile: {
      isApproved: {
        type: Boolean,
        default: false,
      },
      applicationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'under_review'],
        default: 'pending',
      },
      applicationSubmittedAt: Date,
      approvedAt: Date,
      experience: {
        type: String,
        maxlength: [1000, 'Experience cannot be more than 1000 characters'],
      },
      education: [{
        degree: String,
        institution: String,
        year: Number,
        fieldOfStudy: String,
      }],
      certifications: [{
        name: String,
        issuingOrganization: String,
        issueDate: Date,
        expirationDate: Date,
        credentialId: String,
        credentialUrl: String,
      }],
      expertise: [{
        type: String,
      }],
      teachingExperience: {
        years: {
          type: Number,
          default: 0,
        },
        description: String,
      },
      paymentInfo: {
        bankName: String,
        accountNumber: String,
        routingNumber: String,
        paypalEmail: String,
        stripeAccountId: String,
        taxId: String,
      },
      earnings: {
        totalEarnings: {
          type: Number,
          default: 0,
        },
        pendingPayouts: {
          type: Number,
          default: 0,
        },
        lastPayoutDate: Date,
        payoutHistory: [{
          amount: Number,
          date: Date,
          status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
          },
          transactionId: String,
        }],
      },
      courseStats: {
        totalCourses: {
          type: Number,
          default: 0,
        },
        totalStudents: {
          type: Number,
          default: 0,
        },
        averageRating: {
          type: Number,
          default: 0,
        },
        totalReviews: {
          type: Number,
          default: 0,
        },
      },
      pricing: {
        hourlyRate: Number,
        currency: {
          type: String,
          default: 'USD',
        },
        acceptsCustomPricing: {
          type: Boolean,
          default: true,
        },
      },
      availability: {
        timezone: String,
        schedule: [{
          day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          },
          startTime: String, // Format: "HH:MM"
          endTime: String,   // Format: "HH:MM"
          isAvailable: {
            type: Boolean,
            default: true,
          },
        }],
        vacationMode: {
          isActive: {
            type: Boolean,
            default: false,
          },
          startDate: Date,
          endDate: Date,
          reason: String,
        },
      },
      communications: {
        responseTime: {
          type: Number, // in hours
          default: 24,
        },
        preferredLanguages: [String],
        communicationPreferences: {
          email: {
            type: Boolean,
            default: true,
          },
          chat: {
            type: Boolean,
            default: true,
          },
          video: {
            type: Boolean,
            default: false,
          },
        },
      },
      portfolio: {
        portfolioUrl: String,
        projects: [{
          title: String,
          description: String,
          url: String,
          imageUrl: String,
          technologies: [String],
          completedAt: Date,
        }],
      },
      verification: {
        isVerified: {
          type: Boolean,
          default: false,
        },
        verificationDate: Date,
        verificationMethod: {
          type: String,
          enum: ['document', 'interview', 'portfolio', 'test'],
        },
        documents: [{
          type: {
            type: String,
            enum: ['id', 'diploma', 'certificate', 'resume'],
          },
          url: String,
          publicId: String,
          uploadedAt: {
            type: Date,
            default: Date.now,
          },
          status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
          },
        }],
      },
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpire: Date,
    passwordResetOTP: String,
    passwordResetOTPExpire: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next(); // prevent re-hashing unchanged password
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function () {
  return require("jsonwebtoken").sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      isPremium: this.isPremium,
      role: this.role,
    },
    process.env.JWT_SECRET || "fallback-secret",
    {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    }
  );
};

// Generate password reset OTP
userSchema.methods.generatePasswordResetOTP = function () {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the OTP before saving to database
  this.passwordResetOTP = crypto.createHash("sha256").update(otp).digest("hex");

  // Set expire time to 10 minutes
  this.passwordResetOTPExpire = Date.now() + 10 * 60 * 1000;

  return otp; // Return unhashed OTP for email
};

// Verify password reset OTP
userSchema.methods.verifyPasswordResetOTP = function (candidateOTP) {
  // Hash the candidate OTP
  const hashedOTP = crypto
    .createHash("sha256")
    .update(candidateOTP)
    .digest("hex");

  // Check if OTP matches and hasn't expired
  return (
    this.passwordResetOTP === hashedOTP &&
    this.passwordResetOTPExpire > Date.now()
  );
};

// Clear password reset fields
userSchema.methods.clearPasswordResetFields = function () {
  this.passwordResetOTP = undefined;
  this.passwordResetOTPExpire = undefined;
  this.passwordResetToken = undefined;
  this.passwordResetExpire = undefined;
};

module.exports = mongoose.model("User", userSchema);
