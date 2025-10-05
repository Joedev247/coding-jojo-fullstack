const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  sendEmail,
  generateOTP,
  getOTPEmailTemplate,
  getPasswordResetSuccessTemplate,
} = require("../config/email");
const { isConnected } = require("../config/database");

// Helper function to check database connection
const checkDatabaseConnection = (res) => {
  if (!isConnected()) {
    return res.status(503).json({
      success: false,
      message:
        "Database connection not available. Please try again in a moment.",
      error: "SERVICE_UNAVAILABLE",
    });
  }
  return null;
};

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      name: user.name,
      isPremium: user.isPremium || false,
      role: user.role || "student",
    },
    process.env.JWT_SECRET || "fallback-secret",
    {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    }
  );
};

// Real authentication - no mock data

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { firstName, lastName, name, email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Use provided name or construct from firstName/lastName
    const fullName =
      name || `${firstName || ""} ${lastName || ""}`.trim() || "User";

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      firstName: firstName || fullName.split(" ")[0],
      lastName: lastName || fullName.split(" ").slice(1).join(" "),
      name: fullName,
      email,
      password,
    });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.name,
          email: user.email,
          role: user.role,
          isPremium: user.isPremium,
          isEmailVerified: user.isEmailVerified,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check for user with password included
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = user.getSignedJwtToken();

    console.log("🔑 Login Controller: Generated token details:", {
      hasToken: !!token,
      tokenType: typeof token,
      tokenLength: token?.length || 0,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'NO TOKEN',
      tokenValue: token,
      isUndefinedString: token === "undefined"
    });

    const responseData = {
      success: true,
      token,
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName || user.name.split(" ")[0],
          lastName: user.lastName || user.name.split(" ").slice(1).join(" "),
          name: user.name,
          email: user.email,
          role: user.role,
          isPremium: user.isPremium,
          isEmailVerified: user.isEmailVerified || false,
          avatar: user.avatar,
        },
      },
    };

    console.log("📤 Login Controller: Sending response:", {
      success: responseData.success,
      hasToken: !!responseData.token,
      tokenInData: !!responseData.token,
      userEmail: responseData.data.user.email
    });

    res.json(responseData);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    // Get user from database using the ID from the JWT token
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName || user.name.split(" ")[0],
        lastName: user.lastName || user.name.split(" ").slice(1).join(" "),
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
        isEmailVerified: user.isEmailVerified || false,
        avatar: user.avatar?.url || user.profilePicture,
        bio: user.bio,
        joinedDate: user.createdAt || user.joinedDate,
        lastActive: user.lastActive || user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // For demo purposes, accept any 6-digit OTP
    if (!otp || otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 6-digit OTP",
      });
    }

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during OTP verification",
    });
  }
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    // Check database connection first
    const connectionError = checkDatabaseConnection(res);
    if (connectionError) return connectionError;

    const { email } = req.body;
    console.log(`🔍 Password reset request for email: ${email}`);

    if (!email) {
      console.log("❌ No email provided");
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.log(`❌ Invalid email format: ${email}`);
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    console.log(`🔍 Looking for user with email: ${email.toLowerCase()}`);
    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log(`ℹ️ No user found with email: ${email.toLowerCase()}`);
      // For security, we'll send success response even if user doesn't exist
      // This prevents email enumeration attacks
      return res.json({
        success: true,
        message:
          "If an account with this email exists, you will receive a password reset code.",
      });
    }

    console.log(`✅ User found: ${user.email}, ID: ${user._id}`);
    console.log(
      `🔍 User has password: ${!!user.password}, Google ID: ${!!user.googleId}, GitHub ID: ${!!user.githubId}`
    );

    // Check if user has a password (OAuth users might not have one)
    if (!user.password && (user.googleId || user.githubId)) {
      console.log(`❌ OAuth user attempting password reset: ${user.email}`);
      return res.status(400).json({
        success: false,
        message:
          "This account uses social login. Please sign in with Google or GitHub.",
      });
    }

    try {
      console.log(`🔄 Generating OTP for user: ${user.email}`);
      // Generate OTP
      const otp = user.generatePasswordResetOTP();
      console.log(`✅ OTP generated: ${otp}`);

      console.log(`💾 Saving user with OTP...`);
      await user.save({ validateBeforeSave: false });
      console.log(`✅ User saved successfully`);

      // Send email with OTP
      console.log(`📧 Preparing to send email to: ${user.email}`);
      const emailTemplate = getOTPEmailTemplate(otp, user.email);

      await sendEmail({
        email: user.email,
        subject: "Password Reset Code - Coding JoJo",
        html: emailTemplate,
        text: `Your password reset code is: ${otp}. This code will expire in 10 minutes.`,
      });

      console.log(`✅ Password reset OTP sent to ${user.email}`);

      res.json({
        success: true,
        message: "Password reset code sent to your email address",
      });
    } catch (emailError) {
      console.error("❌ Email send error:", emailError);

      // Clear the OTP fields if email fails
      user.passwordResetOTP = undefined;
      user.passwordResetOTPExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: "Email could not be sent. Please try again later.",
      });
    }
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Verify OTP for password reset
// @route   POST /api/auth/verify-reset-otp
// @access  Public
const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and OTP",
      });
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP format. Please enter a 6-digit code.",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
      passwordResetOTP: { $exists: true },
      passwordResetOTPExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    // Verify OTP
    if (!user.verifyPasswordResetOTP(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset code",
      });
    }

    res.json({
      success: true,
      message: "OTP verified successfully. You can now set your new password.",
    });
  } catch (error) {
    console.error("Verify reset OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, OTP, and new password",
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate OTP format (should be 6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP format. Please enter a 6-digit code.",
      });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check for strong password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
      passwordResetOTP: { $exists: true },
      passwordResetOTPExpire: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    // Verify OTP
    if (!user.verifyPasswordResetOTP(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    try {
      // Update password
      user.password = newPassword;
      user.clearPasswordResetFields();

      // Reset login attempts
      user.loginAttempts = 0;
      user.lockUntil = undefined;

      await user.save();

      // Send confirmation email
      const resetTime = new Date().toLocaleString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });

      const successEmailTemplate = getPasswordResetSuccessTemplate(
        user.email,
        resetTime
      );

      // Send success email (don't fail the request if this fails)
      try {
        await sendEmail({
          email: user.email,
          subject: "Password Reset Successful - Coding JoJo",
          html: successEmailTemplate,
          text: `Your password has been successfully reset for your Coding JoJo account (${user.email}) at ${resetTime}.`,
        });
      } catch (emailError) {
        console.error("Success email send error:", emailError);
        // Don't fail the request if confirmation email fails
      }

      console.log(`Password reset successful for user: ${user.email}`);

      res.json({
        success: true,
        message:
          "Password reset successful. You can now log in with your new password.",
      });
    } catch (saveError) {
      console.error("Password save error:", saveError);
      return res.status(500).json({
        success: false,
        message: "Failed to update password. Please try again.",
      });
    }
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Google OAuth success callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      console.log("No user found in Google OAuth callback");
      return res.redirect(
        `${process.env.FRONTEND_URL || 'https://codingjojo.vercel.app'}/login?error=oauth_failed`
      );
    }

    // Generate token using our helper function for consistency
    const token = generateToken(req.user);
    
    console.log("Google OAuth success for user:", req.user.email);

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'https://codingjojo.vercel.app';
    res.redirect(
      `${frontendUrl}/auth/callback?token=${token}&provider=google`
    );
  } catch (error) {
    console.error("Google auth success error:", error);
    const frontendUrl = process.env.FRONTEND_URL || 'https://codingjojo.vercel.app';
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
};

// @desc    GitHub OAuth success callback
// @route   GET /api/auth/github/callback
// @access  Public
const githubAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.FRONTEND_URL || 'https://codingjojo.vercel.app'}/login?error=oauth_failed`
      );
    }

    const token = req.user.getSignedJwtToken();

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'https://codingjojo.vercel.app';
    res.redirect(
      `${frontendUrl}/auth/callback?token=${token}&provider=github`
    );
  } catch (error) {
    console.error("GitHub auth success error:", error);
    const frontendUrl = process.env.FRONTEND_URL || 'https://codingjojo.vercel.app';
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
};

// @desc    OAuth failure callback
// @route   GET /api/auth/oauth/failure
// @access  Public
const oauthFailure = (req, res) => {
  console.log("OAuth failure:", req.query);
  const provider = req.query.provider || "unknown";
  const error = req.query.error || "oauth_failed";
  const frontendUrl = process.env.FRONTEND_URL || 'https://codingjojo.vercel.app';
  res.redirect(
    `${frontendUrl}/login?error=${error}&provider=${provider}`
  );
};

// Development only - Create admin user
// @desc    Create admin user for development
// @route   POST /api/auth/create-admin
// @access  Public (development only)
const createAdminUser = async (req, res) => {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        success: false,
        message: "This endpoint is only available in development mode",
      });
    }

    const {
      email = "admin@codingjojo.com",
      password = "admin123",
      name = "Admin User",
    } = req.body;

    // Check if admin already exists
    let user = await User.findOne({ email });

    if (user) {
      // Generate token for existing admin
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || "fallback-secret",
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        success: true,
        message: "Admin user already exists",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    }

    // Create new admin user
    user = new User({
      name,
      email,
      password, // Will be hashed by the model pre-save hook
      role: "admin",
      isEmailVerified: true,
    });

    await user.save();

    // Generate token
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "fallback-secret",
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating admin user",
    });
  }
};

// @desc    Verify Google credential (for Google Login component)
// @route   POST /api/auth/google/verify
// @access  Public
const verifyGoogleCredential = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify the Google JWT token
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid Google credential",
      });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
      // Update Google info if user exists
      existingUser.googleId = payload.sub;
      existingUser.avatar = existingUser.avatar || payload.picture;
      existingUser.isEmailVerified = true;
      await existingUser.save();

      const token = existingUser.getSignedJwtToken();

      return res.status(200).json({
        success: true,
        token,
        data: {
          user: {
            _id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            isPremium: existingUser.isPremium,
            isEmailVerified: existingUser.isEmailVerified,
            avatar: existingUser.avatar,
          },
        },
      });
    }

    // Create new user
    const newUser = new User({
      googleId: payload.sub,
      firstName: payload.given_name || payload.name?.split(" ")[0] || "User",
      lastName:
        payload.family_name ||
        payload.name?.split(" ").slice(1).join(" ") ||
        "",
      name:
        payload.name ||
        `${payload.given_name || ""} ${payload.family_name || ""}`.trim() ||
        "User",
      email: payload.email,
      avatar: payload.picture,
      isEmailVerified: true, // Google accounts are verified
      role: "student",
    });

    await newUser.save();

    const token = newUser.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      data: {
        user: {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          isPremium: newUser.isPremium,
          isEmailVerified: newUser.isEmailVerified,
          avatar: newUser.avatar,
        },
      },
    });
  } catch (error) {
    console.error("Google credential verification error:", error);
    res.status(400).json({
      success: false,
      message: "Invalid Google credential or verification failed",
    });
  }
};

// @desc    Admin login with secure password
// @route   POST /api/auth/admin-login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Admin password is required",
      });
    }

    // Check for the admin user by role
    const adminUser = await User.findOne({ role: "admin" }).select("+password");

    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: "Admin user not found. Please complete the admin setup first.",
      });
    }

    // Check if password matches
    const isMatch = await adminUser.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const token = adminUser.getSignedJwtToken();

    res.json({
      success: true,
      token,
      data: {
        user: {
          _id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
          isPremium: adminUser.isPremium,
          isEmailVerified: adminUser.isEmailVerified,
          avatar: adminUser.avatar,
        },
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin login",
    });
  }
};

// @desc    Check if admin user exists
// @route   GET /api/auth/admin-status
// @access  Public
const checkAdminStatus = async (req, res) => {
  try {
    const dbCheck = checkDatabaseConnection(res);
    if (dbCheck) return dbCheck;

    // Check if admin user exists
    const adminUser = await User.findOne({ role: "admin" });

    res.json({
      success: true,
      adminExists: !!adminUser,
    });
  } catch (error) {
    console.error("Check admin status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking admin status",
      adminExists: false,
    });
  }
};

// @desc    Set admin password (one-time setup)
// @route   POST /api/auth/setup-admin
// @access  Public (should be secured in production)
const setupAdminPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    // Check if admin user already exists
    let adminUser = await User.findOne({ role: "admin" });

    if (adminUser) {
      // Update existing admin password
      adminUser.password = password;
      await adminUser.save();

      return res.json({
        success: true,
        message: "Admin password updated successfully",
      });
    }

    // Create new admin user
    adminUser = new User({
      name: "Administrator",
      email: "admin@codingjojo.com",
      password,
      role: "admin",
      isEmailVerified: true,
    });

    await adminUser.save();

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
    });
  } catch (error) {
    console.error("Setup admin password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin setup",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  verifyOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  googleAuthSuccess,
  githubAuthSuccess,
  oauthFailure,
  createAdminUser,
  verifyGoogleCredential,
  adminLogin,
  setupAdminPassword,
  checkAdminStatus,
};
