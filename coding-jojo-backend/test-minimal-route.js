// Test minimal route
const express = require('express');
const router = express.Router();
const testController = require('./test-minimal-controller');

console.log('Testing route setup...');
console.log('testController.getUserChats type:', typeof testController.getUserChats);

try {
  router.get('/sessions', testController.getUserChats);
  console.log('✅ Route created successfully');
} catch (error) {
  console.error('❌ Route creation failed:', error.message);
}

module.exports = router;
