// Test script to verify online users functionality
async function testOnlineUsers() {
  console.log('🔄 Testing Online Users Functionality...\n');

  try {
    // Use native fetch if available, otherwise use node-fetch dynamically
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    
    const API_BASE = 'http://localhost:5000/api/v1';

    // Test 1: Get online users without authentication
    console.log('📡 Testing GET /community/users/online (public access)...');
    const response = await fetch(`${API_BASE}/community/users/online`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Online users endpoint working!');
      console.log(`📊 Found ${data.data.length} online users:`);
      
      data.data.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} (${user.role}) - ${user.reputation} rep`);
      });
    } else {
      console.log('❌ Failed to get online users:', data.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Test community chat to see user activity tracking
    console.log('📡 Testing GET /community/chat...');
    const chatResponse = await fetch(`${API_BASE}/community/chat`);
    const chatData = await chatResponse.json();
    
    if (chatData.success) {
      console.log('✅ Community chat endpoint working!');
      console.log(`💬 Found ${chatData.data.length} chat messages`);
      
      if (chatData.data.length > 0) {
        const latestMessage = chatData.data[0];
        console.log(`   Latest: "${latestMessage.content}" by ${latestMessage.sender.name}`);
      }
    } else {
      console.log('❌ Failed to get chat messages:', chatData.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Test sending a message (this will be limited without auth)
    console.log('📡 Testing POST /community/chat...');
    const sendResponse = await fetch(`${API_BASE}/community/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-name': 'Test User',
        'x-user-role': 'student',
        'x-user-avatar': '/testimonial-avatar.jpg'
      },
      body: JSON.stringify({
        content: 'Hello from test script! Testing online user functionality.',
        type: 'text'
      })
    });
    
    const sendData = await sendResponse.json();
    
    if (sendData.success) {
      console.log('✅ Message sent successfully!');
      console.log(`📤 Message: "${sendData.data.content}"`);
    } else {
      console.log('❌ Failed to send message:', sendData.message);
    }

    console.log('\n🎉 Online users functionality test completed!\n');

  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.log('\n💡 Make sure the backend server is running on http://localhost:5000');
  }
}

// Run the test
testOnlineUsers();
