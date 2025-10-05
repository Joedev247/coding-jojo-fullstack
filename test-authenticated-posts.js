const fs = require('fs');
const path = require('path');

// Dynamic import for node-fetch
let fetch;
(async () => {
  try {
    const fetchModule = await import('node-fetch');
    fetch = fetchModule.default;
  } catch (error) {
    console.log('Using built-in fetch...');
    fetch = global.fetch;
  }
})().then(async () => {
  console.log('🔄 Testing Authenticated Post Creation with Real User Data...\n');

  const BASE_URL = 'http://localhost:5000/api';
  
  try {
    // First, let's register/login to get a valid token
    console.log('📡 Attempting to login...');
    
    // Try multiple login attempts with different users
    const testUsers = [
      { email: 'test@example.com', password: 'password123', name: 'John Doe Real User' },
      { email: 'realuser@test.com', password: 'password123', name: 'Real Test User' },
      { email: 'user' + Date.now() + '@test.com', password: 'password123', name: 'Dynamic Real User' }
    ];
    
    let token = null;
    let userData = null;
    
    for (let user of testUsers) {
      console.log(`📡 Trying to login with ${user.email}...`);
      
      const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        token = loginData.token;
        userData = loginData.data.user;
        console.log(`✅ Login successful! User: ${userData.name} (${userData.email})`);
        break;
      } else {
        console.log(`❌ Login failed for ${user.email}, trying to register...`);
        
        const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password
          })
        });
        
        if (registerResponse.ok) {
          const registerData = await registerResponse.json();
          token = registerData.token;
          userData = registerData.user;
          console.log(`✅ Registration successful! User: ${userData.name} (${userData.email})`);
          break;
        } else {
          const errorText = await registerResponse.text();
          console.log(`❌ Registration failed for ${user.email}: ${errorText}`);
          
          // If it's just that user exists, try with a completely unique email
          if (errorText.includes('User already exists')) {
            const uniqueEmail = `testuser${Date.now()}@example.com`;
            console.log(`🔄 Trying with unique email: ${uniqueEmail}`);
            
            const uniqueRegisterResponse = await fetch(`${BASE_URL}/auth/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: `Real User ${Date.now()}`,
                email: uniqueEmail,
                password: 'password123'
              })
            });
            
            if (uniqueRegisterResponse.ok) {
              const uniqueRegisterData = await uniqueRegisterResponse.json();
              token = uniqueRegisterData.token;
              userData = uniqueRegisterData.data.user;
              console.log(`✅ Unique registration successful! User: ${userData.name} (${userData.email})`);
              break;
            } else {
              const uniqueError = await uniqueRegisterResponse.text();
              console.log(`❌ Unique registration failed: ${uniqueError}`);
            }
          }
        }
      }
    }
    
    if (!token) {
      console.log('❌ Could not authenticate with any test user');
      return;
    }
    
    console.log('\n============================================================\n');
    
    // Now test creating a post with authentication
    console.log('📡 Testing POST /community/posts with authentication...');
    
    const postData = {
      title: `Test Post by Real User - ${new Date().toLocaleString()}`,
      content: 'This is a test post created by a real authenticated user to verify that real user names and timestamps are being used.',
      tags: ['test', 'real-user', 'authentication']
    };
    
    const createResponse = await fetch(`${BASE_URL}/community/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (createResponse.ok) {
      const createData = await createResponse.json();
      const newPost = createData.data;
      console.log(`✅ Post created successfully!`);
      console.log(`   Title: "${newPost.title}"`);
      console.log(`   Author: ${newPost.author.name} (${newPost.author.role})`);
      console.log(`   Created: ${new Date(newPost.createdAt).toLocaleString()}`);
      console.log(`   ID: ${newPost._id}`);
      
      // Test getting the specific post
      console.log('\n📡 Testing GET for the newly created post...');
      const getPostResponse = await fetch(`${BASE_URL}/community/posts/${newPost._id}`);
      
      if (getPostResponse.ok) {
        const getPostData = await getPostResponse.json();
        const fetchedPost = getPostData.data;
        console.log(`✅ Post retrieved successfully!`);
        console.log(`   Title: "${fetchedPost.title}"`);
        console.log(`   Author: ${fetchedPost.author.name} (${fetchedPost.author.role})`);
        console.log(`   Created: ${new Date(fetchedPost.createdAt).toLocaleString()}`);
      } else {
        console.log('❌ Failed to retrieve the post');
      }
      
    } else {
      const error = await createResponse.text();
      console.log(`❌ Failed to create post: ${error}`);
    }
    
    console.log('\n============================================================\n');
    
    // Test getting all posts to see the mix of old and new
    console.log('📡 Testing GET /community/posts (showing latest 3)...');
    const allPostsResponse = await fetch(`${BASE_URL}/community/posts?limit=3`);
    
    if (allPostsResponse.ok) {
      const allPostsData = await allPostsResponse.json();
      console.log('Raw response:', JSON.stringify(allPostsData, null, 2));
      
      let allPosts = allPostsData.data || allPostsData.posts || allPostsData;
      
      // Handle different response structures
      if (Array.isArray(allPosts)) {
        console.log(`✅ Posts retrieved! Found ${allPosts.length} posts:`);
      } else if (allPosts && Array.isArray(allPosts.posts)) {
        allPosts = allPosts.posts;
        console.log(`✅ Posts retrieved! Found ${allPosts.length} posts:`);
      } else {
        console.log('❌ Unexpected response structure for posts');
        console.log('Response data:', allPostsData);
        return;
      }
      
      allPosts.forEach((post, index) => {
        const timeAgo = Math.floor((Date.now() - new Date(post.createdAt)) / (1000 * 60));
        console.log(`   ${index + 1}. "${post.title}"`);
        console.log(`      Author: ${post.author.name} (${post.author.role})`);
        console.log(`      Created: ${new Date(post.createdAt).toLocaleString()} (${timeAgo} minutes ago)`);
        console.log(`      Stats: ${post.likeCount || 0} likes, ${post.commentCount || 0} comments, ${post.views || 0} views\n`);
      });
    } else {
      console.log('❌ Failed to get posts');
    }
    
    console.log('🎉 Authenticated post test completed!');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
});
