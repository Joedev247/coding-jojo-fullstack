const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    // Always use database for authentication
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }
    
    // Update user's last active time for real-time online status
    try {
      await User.findByIdAndUpdate(user._id, {
        lastActive: new Date()
      });
    } catch (updateError) {
      console.error('Error updating user lastActive:', updateError);
      // Don't fail the request if we can't update activity
    }
    
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user && (req.user.role === 'admin' || req.user.email === 'admin@coding-jojo.com' || req.user.email === 'admin@codingjojo.com')) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin role required.'
        });
      }
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    if (req.user && (req.user.role === 'admin' || req.user.email === 'admin@codingjojo.com')) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
};

// Authorization middleware for specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    next();
  };
};

module.exports = { 
  auth,
  protect: auth, // alias to maintain backward compatibility
  adminAuth, 
  authenticateToken: auth, 
  requireAdmin,
  authorize
};
