// Test script to verify real user data in posts
async function testPostCreation() {
  console.log('🔄 Testing Post Creation with Real User Data...\n');

  try {
    // Use native fetch if available, otherwise use node-fetch dynamically
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    
    const API_BASE = 'http://localhost:5000/api/v1';

    // Test 1: Get existing posts to see current data
    console.log('📡 Testing GET /community/posts...');
    const postsResponse = await fetch(`${API_BASE}/community/posts`);
    const postsData = await postsResponse.json();
    
    if (postsData.success) {
      console.log('✅ Posts endpoint working!');
      console.log(`📊 Found ${postsData.data.posts.length} posts:`);
      
      postsData.data.posts.forEach((post, index) => {
        const createdAt = new Date(post.createdAt);
        const isRecent = (Date.now() - createdAt.getTime()) < (24 * 60 * 60 * 1000); // Less than 24 hours
        const timeAgo = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        
        console.log(`   ${index + 1}. "${post.title}"`);
        console.log(`      Author: ${post.author.name} (${post.author.role})`);
        console.log(`      Created: ${createdAt.toLocaleString()} (${timeAgo} days ago) ${isRecent ? '🆕' : ''}`);
        console.log(`      Stats: ${post.likeCount || 0} likes, ${post.commentCount || 0} comments, ${post.views || 0} views`);
        console.log('');
      });
    } else {
      console.log('❌ Failed to get posts:', postsData.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 2: Create a new post with test user data
    console.log('📡 Testing POST /community/posts...');
    const createResponse = await fetch(`${API_BASE}/community/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-name': 'John Developer',
        'x-user-role': 'student',
        'x-user-avatar': '/testimonial-avatar.jpg',
        'x-user-id': 'test_user_' + Date.now()
      },
      body: JSON.stringify({
        title: 'Test Post - Real User Data Implementation',
        content: 'This is a test post created to verify that real user data and accurate timestamps are being used. The post should show the actual user who created it and the exact time of creation.',
        category: 'general',
        tags: ['test', 'implementation', 'real-data'],
        isFeatured: false
      })
    });
    
    const createData = await createResponse.json();
    
    if (createData.success) {
      console.log('✅ Post created successfully!');
      console.log(`📝 Title: "${createData.data.title}"`);
      console.log(`👤 Author: ${createData.data.author.name} (${createData.data.author.role})`);
      
      const createdTime = new Date(createData.data.createdAt);
      const now = new Date();
      const secondsAgo = Math.floor((now.getTime() - createdTime.getTime()) / 1000);
      
      console.log(`⏰ Created: ${createdTime.toLocaleString()} (${secondsAgo} seconds ago)`);
      console.log(`🏷️  Category: ${createData.data.category}`);
      console.log(`🏷️  Tags: ${createData.data.tags.join(', ')}`);
    } else {
      console.log('❌ Failed to create post:', createData.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 3: Get posts again to see the new post
    console.log('📡 Testing GET /community/posts again (to see new post)...');
    const newPostsResponse = await fetch(`${API_BASE}/community/posts?limit=5&sort=recent`);
    const newPostsData = await newPostsResponse.json();
    
    if (newPostsData.success) {
      console.log('✅ Latest posts retrieved!');
      console.log(`📊 Showing ${newPostsData.data.posts.length} most recent posts:`);
      
      newPostsData.data.posts.forEach((post, index) => {
        const createdAt = new Date(post.createdAt);
        const minutesAgo = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60));
        const isVeryRecent = minutesAgo < 1;
        
        console.log(`   ${index + 1}. "${post.title}"`);
        console.log(`      Author: ${post.author.name} (${post.author.role})`);
        console.log(`      Created: ${createdAt.toLocaleString()} (${isVeryRecent ? 'just now' : minutesAgo + ' minutes ago'}) ${isVeryRecent ? '🔥' : ''}`);
        console.log('');
      });
    }

    console.log('\n🎉 Real user data test completed!\n');

  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.log('\n💡 Make sure the backend server is running on http://localhost:5000');
  }
}

// Run the test
testPostCreation();
