const express = require('express');
const router = express.Router();
const {
  getUserChats,
  getChatById,
  createChat,
  sendMessage,
  markChatAsRead,
  getCourseChats,
  searchMessages,
  deleteChat
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');
const { uploadCourseFiles } = require('../middleware/upload');

// Apply authentication to all routes
router.use(protect);

// Get user's chats
router.get('/', getUserChats);

// Create new chat
router.post('/', createChat);

// Get course-specific chats
router.get('/course/:courseId', getCourseChats);

// Get specific chat with messages
router.get('/:chatId', getChatById);

// Send a message to a chat (with optional file attachments)
router.post('/:chatId/messages', uploadCourseFiles, sendMessage);

// Mark chat as read
router.put('/:chatId/read', markChatAsRead);

// Search messages in chat
router.get('/:chatId/search', searchMessages);

// Delete chat
router.delete('/:chatId', deleteChat);

module.exports = router;
