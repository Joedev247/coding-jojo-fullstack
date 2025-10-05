// Simple controller test
const express = require('express');

console.log('Testing controller import...');

try {
  const chatController = require('./src/controllers/chatController');
  console.log('Controller imported successfully');
  console.log('getUserChats type:', typeof chatController.getUserChats);
  
  // Test the problematic function specifically
  if (typeof chatController.getUserChats === 'function') {
    console.log('✅ getUserChats is a function');
  } else {
    console.log('❌ getUserChats is not a function:', chatController.getUserChats);
  }
  
} catch (error) {
  console.error('Error importing controller:', error.message);
  console.error(error.stack);
}
