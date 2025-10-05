// Debug script to scan chatController for non-function properties
const chatController = require('./chatController');
console.log('--- chatController property types ---');
Object.entries(chatController).forEach(([key, value]) => {
  console.log(`${key}: ${typeof value}`);
});
