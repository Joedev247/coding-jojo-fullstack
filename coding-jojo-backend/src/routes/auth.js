const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  register,
  login,
  getMe,
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
  checkAdminStatus
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/reset-password', resetPassword);
router.post('/create-admin', createAdminUser); // Development only

// Admin authentication routes
router.post('/admin-login', adminLogin);
router.post('/setup-admin', setupAdminPassword);
router.get('/admin-status', checkAdminStatus);

// OAuth routes
// Google OAuth
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/oauth/failure' }),
  googleAuthSuccess
);

// Google Login component verification
router.post('/google/verify', verifyGoogleCredential);

// GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/api/auth/oauth/failure' }),
  githubAuthSuccess
);

// OAuth failure route
router.get('/oauth/failure', oauthFailure);

// Protected routes
router.get('/me', auth, getMe);
router.get('/verify-token', auth, (req, res) => {
  // If we reach here, the token is valid (auth middleware passed)
  res.json({
    success: true,
    message: 'Token is valid',
    user: req.user
  });
});

module.exports = router;
