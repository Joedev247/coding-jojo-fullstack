const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  getCategories,
  getMembers,
  getPopularTags,
  toggleLike,
  addComment,
  addReply,
  sharePost,
  toggleCommentLike,
  savePost,
  unsavePost,
  reportPost,
  muteThread,
  followUser,
  unfollowUser,
  updatePost,
  deletePost,
  deleteComment,
  getCommunityStats,
  searchPosts,
  getTrendingPosts,
  getSavedPosts,
  getUserPosts,
  // Events
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  unattendEvent,
  // Enhanced Features
  getCategoryStats,
  getCommunityChat,
  sendCommunityMessage,
  reactToChatMessage,
  removeChatReaction,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getOnlineUsers,
  updateUserStatus,
} = require("../controllers/communityController");

// Import auth middleware (optional for some routes)
const { auth } = require('../middleware/auth');

// @route   GET /api/v1/community/posts
// @desc    Get all community posts with filtering and pagination
// @access  Public
router.get("/posts", getPosts);

// @route   GET /api/v1/community/posts/:id
// @desc    Get single post by ID
// @access  Public
router.get("/posts/:id", getPost);

// @route   POST /api/v1/community/posts
// @desc    Create a new post
// @access  Private (requires authentication)
router.post("/posts", auth, createPost);

// @route   POST /api/v1/community/posts/:id/like
// @desc    Like or unlike a post
// @access  Private (requires authentication)
router.post("/posts/:id/like", auth, toggleLike);

// @route   POST /api/v1/community/posts/:id/comments
// @desc    Add comment to a post
// @access  Private (requires authentication)
router.post("/posts/:id/comments", auth, addComment);

// @route   POST /api/community/posts/:postId/comments/:commentId/reply
// @desc    Add a reply to a comment
// @access  Private (requires authentication)
router.post("/posts/:postId/comments/:commentId/reply", auth, addReply);

// @route   POST /api/v1/community/posts/:id/share
// @desc    Share a post
// @access  Private (requires authentication)
router.post("/posts/:id/share", sharePost); // In production: authenticate,

// @route   POST /api/community/posts/:postId/comments/:commentId/like
// @desc    Like or unlike a comment
// @access  Private (requires authentication)
router.post("/posts/:postId/comments/:commentId/like", auth, toggleCommentLike);

// @route   POST /api/v1/community/posts/:id/save
// @desc    Save/bookmark a post
// @access  Private (requires authentication)
router.post("/posts/:id/save", savePost); // In production: authenticate,

// @route   DELETE /api/v1/community/posts/:id/save
// @desc    Unsave/unbookmark a post
// @access  Private (requires authentication)
router.delete("/posts/:id/save", unsavePost); // In production: authenticate,

// @route   POST /api/v1/community/posts/:id/report
// @desc    Report a post
// @access  Private (requires authentication)
router.post("/posts/:id/report", reportPost); // In production: authenticate,

// @route   POST /api/v1/community/posts/:id/mute
// @desc    Mute a thread
// @access  Private (requires authentication)
router.post("/posts/:id/mute", muteThread); // In production: authenticate,

// @route   POST /api/v1/community/users/:id/follow
// @desc    Follow a user
// @access  Private (requires authentication)
router.post("/users/:id/follow", followUser); // In production: authenticate,

// @route   DELETE /api/v1/community/users/:id/follow
// @desc    Unfollow a user
// @access  Private (requires authentication)
router.delete("/users/:id/follow", unfollowUser); // In production: authenticate,

// @route   PUT /api/v1/community/posts/:id
// @desc    Update a post
// @access  Private (requires authentication)
router.put("/posts/:id", updatePost); // In production: authenticate,

// @route   DELETE /api/v1/community/posts/:id
// @desc    Delete a post
// @access  Private (requires authentication)
router.delete("/posts/:id", deletePost); // In production: authenticate,

// @route   DELETE /api/v1/community/posts/:postId/comments/:commentId
// @desc    Delete a comment
// @access  Private (requires authentication)
router.delete("/posts/:postId/comments/:commentId", deleteComment); // In production: authenticate,

// @route   GET /api/v1/community/categories
// @desc    Get all community categories
// @access  Public
router.get("/categories", getCategories);

// @route   GET /api/v1/community/members
// @desc    Get community members with pagination
// @access  Public
router.get("/members", getMembers);

// @route   GET /api/v1/community/popular-tags
// @desc    Get popular tags
// @access  Public
router.get("/popular-tags", getPopularTags);

// @route   GET /api/v1/community/tags
// @desc    Get popular tags (alias for compatibility)
// @access  Public
router.get("/tags", getPopularTags);

// @route   GET /api/v1/community/stats
// @desc    Get community stats
// @access  Public
router.get("/stats", getCommunityStats);

// @route   GET /api/v1/community/search
// @desc    Search posts
// @access  Public
router.get("/search", searchPosts);

// @route   GET /api/v1/community/trending
// @desc    Get trending posts
// @access  Public
router.get("/trending", getTrendingPosts);

// @route   GET /api/v1/community/saved
// @desc    Get user's saved posts
// @access  Private (requires authentication)
router.get("/saved", getSavedPosts); // In production: authenticate,

// @route   GET /api/v1/community/users/:id/posts
// @desc    Get user's posts
// @access  Public
router.get("/users/:id/posts", getUserPosts);

// Events Routes
// @route   GET /api/v1/community/events
// @desc    Get all community events
// @access  Public
router.get("/events", getEvents);

// @route   GET /api/v1/community/events/:id
// @desc    Get single event by ID
// @access  Public
router.get("/events/:id", getEvent);

// @route   POST /api/v1/community/events
// @desc    Create a new event (Admin only)
// @access  Private (Admin)
router.post("/events", createEvent);

// @route   PUT /api/v1/community/events/:id
// @desc    Update an event (Admin only)
// @access  Private (Admin)
router.put("/events/:id", updateEvent);

// @route   DELETE /api/v1/community/events/:id
// @desc    Delete an event (Admin only)
// @access  Private (Admin)
router.delete("/events/:id", deleteEvent);

// @route   POST /api/v1/community/events/:id/attend
// @desc    Attend/unattend an event
// @access  Private
router.post("/events/:id/attend", attendEvent);

// @route   DELETE /api/v1/community/events/:id/attend
// @desc    Unattend an event
// @access  Private
router.delete("/events/:id/attend", unattendEvent);

// Category Statistics
// @route   GET /api/v1/community/categories/stats
// @desc    Get category statistics with real counts
// @access  Public
router.get("/categories/stats", getCategoryStats);

// Real-time Community Chat
// @route   GET /api/v1/community/chat
// @desc    Get community chat messages
// @access  Public
router.get("/chat", getCommunityChat);

// @route   POST /api/v1/community/chat
// @desc    Send a community chat message
// @access  Private
router.post("/chat", sendCommunityMessage);

// @route   POST /api/v1/community/chat/:id/react
// @desc    React to a chat message
// @access  Private
router.post("/chat/:id/react", reactToChatMessage);

// @route   DELETE /api/v1/community/chat/:id/react/:emoji
// @desc    Remove reaction from chat message
// @access  Private
router.delete("/chat/:id/react/:emoji", removeChatReaction);

// Notifications
// @route   GET /api/v1/community/notifications
// @desc    Get user notifications
// @access  Private
router.get("/notifications", getNotifications);

// @route   PATCH /api/v1/community/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.patch("/notifications/:id/read", markNotificationAsRead);

// @route   PATCH /api/v1/community/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.patch("/notifications/read-all", markAllNotificationsAsRead);

// Online Users
// @route   GET /api/v1/community/users/online
// @desc    Get online users
// @access  Public
router.get("/users/online", getOnlineUsers);

// @route   PATCH /api/v1/community/users/status
// @desc    Update user status
// @access  Private
router.patch("/users/status", updateUserStatus);

module.exports = router;
