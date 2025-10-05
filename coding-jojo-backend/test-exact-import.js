// Test exact import scenario
console.log('Testing exact chatController import scenario...');

try {
  // Import exactly like the route does
  const authMiddleware = require('./src/middleware/auth');
  const chatController = require('./src/controllers/chatController');
  
  console.log('Imports successful');
  console.log('chatController type:', typeof chatController);
  console.log('chatController keys:', Object.keys(chatController));
  
  // Test the specific function
  console.log('getUserChats exists:', 'getUserChats' in chatController);
  console.log('getUserChats type:', typeof chatController.getUserChats);
  
  if (typeof chatController.getUserChats === 'function') {
    console.log('✅ getUserChats is a function');
  } else {
    console.log('❌ getUserChats is not a function');
    console.log('Value:', chatController.getUserChats);
  }
  
} catch (error) {
  console.error('Error in exact import test:', error.message);
  console.error('Stack:', error.stack);
}
