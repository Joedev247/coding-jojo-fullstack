const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      user: {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
        profilePicture: user.profilePicture,
        bio: user.bio,
        skills: user.skills || [],
        socialLinks: user.socialLinks || {},
        joinedDate: user.createdAt || new Date().toISOString(),
        lastActive: user.lastActive || new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, name, email, bio, profilePicture, skills, socialLinks } = req.body;
    const userId = req.user.id || req.user._id;    // Check if database is available
    if (!User.db || !User.db.readyState) {
      // Mock update for development - only update fields that are explicitly provided
      const updatedUser = { ...req.user };
      
      if (firstName !== undefined) updatedUser.firstName = firstName;
      if (lastName !== undefined) updatedUser.lastName = lastName;
      if (name !== undefined) updatedUser.name = name;
      if (email !== undefined && email !== req.user.email) updatedUser.email = email;
      if (bio !== undefined) updatedUser.bio = bio;
      if (profilePicture !== undefined) updatedUser.profilePicture = profilePicture;
      if (skills !== undefined) updatedUser.skills = skills;
      if (socialLinks !== undefined) updatedUser.socialLinks = socialLinks;
      
      // If firstName or lastName is provided, auto-update name field
      if (firstName !== undefined || lastName !== undefined) {
        const newFirstName = firstName !== undefined ? firstName : req.user.firstName || '';
        const newLastName = lastName !== undefined ? lastName : req.user.lastName || '';
        updatedUser.name = `${newFirstName} ${newLastName}`.trim() || req.user.name;
      }

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });
    }    // Build update data - only include fields that are explicitly provided
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;
    if (skills !== undefined) updateData.skills = skills;
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;    // Only update email if it's provided and different from current email
    if (email !== undefined && email !== req.user.email) {
      // Check if email already exists for another user
      const existingUser = await User.findOne({ email: email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists for another user'
        });
      }
      updateData.email = email;
    }

    // If firstName or lastName is provided, auto-update the name field
    if (firstName !== undefined || lastName !== undefined) {
      const currentUser = req.user;
      const newFirstName = firstName !== undefined ? firstName : currentUser.firstName || '';
      const newLastName = lastName !== undefined ? lastName : currentUser.lastName || '';
      updateData.name = `${newFirstName} ${newLastName}`.trim() || currentUser.name;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' is already in use`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

// @desc    Upgrade to premium
// @route   POST /api/users/upgrade-premium
// @access  Private
const upgradeToPremium = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    // Check if database is available
    if (!User.db || !User.db.readyState) {
      // Mock upgrade for development
      return res.json({
        success: true,
        message: 'Successfully upgraded to premium!',
        user: {
          ...req.user,
          isPremium: true
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        isPremium: true,
        'subscription.plan': 'premium',
        'subscription.startDate': new Date(),
        'subscription.endDate': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Successfully upgraded to premium!',
      user
    });

  } catch (error) {
    console.error('Premium upgrade error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during premium upgrade'
    });
  }
};

// @desc    Get user's enrolled courses
// @route   GET /api/users/courses
// @access  Private
const getUserCourses = async (req, res) => {
  try {
    // Mock enrolled courses data
    const enrolledCourses = [
      {
        id: '1',
        title: 'React Mastery: Building Modern UIs',
        progress: 75,
        totalLessons: 45,
        completedLessons: 34,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '25 hours',
        instructor: 'Sarah Johnson',
        enrolledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'in-progress'
      },
      {
        id: '2',
        title: 'Node.js Complete Guide',
        progress: 45,
        totalLessons: 38,
        completedLessons: 17,
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '30 hours',
        instructor: 'Mike Chen',
        enrolledAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'in-progress'
      }
    ];

    res.json({
      success: true,
      courses: enrolledCourses,
      total: enrolledCourses.length
    });

  } catch (error) {
    console.error('Get user courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};

// @desc    Get user notifications
// @route   GET /api/users/notifications
// @access  Private
const getNotifications = async (req, res) => {
  try {
    const notifications = [
      {
        id: 'n1',
        type: 'course_update',
        title: 'New lesson available in React Mastery',
        message: 'A new lesson "Testing React Components" has been added to your course.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: false,
        actionUrl: '/dashboard/courses/1'
      },
      {
        id: 'n2',
        type: 'event_reminder',
        title: 'Live session starting soon',
        message: 'Your registered live session "Building a REST API" starts in 2 hours.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        actionUrl: '/dashboard/events/e1'
      },
      {
        id: 'n3',
        type: 'achievement',
        title: 'Achievement unlocked!',
        message: 'You\'ve earned the "JavaScript Expert" achievement for completing 5 JavaScript courses.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        actionUrl: '/dashboard/achievements'
      }
    ];

    res.json({
      success: true,
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length
    });

  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/users/notifications/:id/read
// @access  Private
const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    // In a real app, you would update the notification in the database
    res.json({
      success: true,
      message: 'Notification marked as read'
    });

  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upload profile picture
// @route   POST /api/users/upload-profile-picture
// @access  Private
const uploadProfilePicture = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user.id || req.user._id;

    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: 'Profile picture data is required'
      });
    }

    // Check if database is available
    if (!User.db || !User.db.readyState) {
      // Mock update for development
      const updatedUser = {
        ...req.user,
        profilePicture
      };

      return res.json({
        success: true,
        message: 'Profile picture updated successfully',
        data: updatedUser
      });
    }

    // Update only the profile picture
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile picture updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading profile picture'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  upgradeToPremium,
  getUserCourses,
  getNotifications,
  markNotificationRead
};
