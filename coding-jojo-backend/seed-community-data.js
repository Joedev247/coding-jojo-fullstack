// Seed Community Data Script
const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const { Post } = require("./src/models/Community");
const User = require("./src/models/User");

// Sample posts data
const samplePosts = [
  {
    title: "Getting started with React Hooks - A Complete Guide",
    content:
      "React Hooks have revolutionized how we write React components. In this comprehensive guide, I'll walk you through everything you need to know about useState, useEffect, useContext, and custom hooks. We'll build practical examples and discuss best practices for modern React development.",
    excerpt:
      "Learn React Hooks from scratch with practical examples and best practices.",
    category: "react",
    type: "discussion",
    tags: ["react", "hooks", "javascript", "frontend", "tutorial"],
    isPinned: true,
    isFeatured: true,
    status: "published",
  },
  {
    title: "Python vs JavaScript: Which language should you learn first?",
    content:
      "Both Python and JavaScript are excellent choices for beginners, but they serve different purposes. Python excels in data science, AI, and backend development, while JavaScript dominates web development. Let's explore the pros and cons of each to help you make an informed decision.",
    excerpt:
      "A detailed comparison of Python and JavaScript for new programmers.",
    category: "discussions",
    type: "discussion",
    tags: ["python", "javascript", "beginners", "career", "programming"],
    status: "published",
  },
  {
    title: "Help: Cannot resolve 'Module not found' error in Node.js",
    content:
      "I'm working on a Node.js project and keep getting 'Module not found' errors even though I've installed the packages with npm install. Here's my package.json and the error message. Any help would be appreciated!",
    excerpt: "Need help with Node.js module resolution errors.",
    category: "questions",
    type: "question",
    tags: ["nodejs", "help", "error", "modules", "npm"],
    status: "published",
  },
  {
    title: "🎉 New Feature: Dark Mode Theme Released!",
    content:
      "We're excited to announce the release of our new dark mode theme! You can now toggle between light and dark modes in your profile settings. This feature was highly requested by the community and we're thrilled to deliver it.",
    excerpt: "Dark mode theme is now available for all users.",
    category: "announcements",
    type: "announcement",
    tags: ["announcement", "dark-mode", "ui", "feature"],
    isPinned: true,
    status: "published",
  },
  {
    title: "My First Full-Stack Web Application - E-commerce Site",
    content:
      "I just finished my first full-stack e-commerce application using React, Node.js, Express, and MongoDB. It includes user authentication, product catalog, shopping cart, and payment integration with Stripe. Check out the live demo and let me know what you think!",
    excerpt: "Showcasing my first full-stack e-commerce application.",
    category: "showcase",
    type: "showcase",
    tags: ["showcase", "fullstack", "react", "nodejs", "ecommerce", "project"],
    status: "published",
  },
  {
    title: "Free Resources: Best YouTube Channels for Learning Web Development",
    content:
      "Here's a curated list of the best free YouTube channels for learning web development in 2025. These channels cover everything from HTML/CSS basics to advanced React patterns and Node.js backend development.",
    excerpt: "Curated list of free web development learning resources.",
    category: "resources",
    type: "resource",
    tags: ["resources", "youtube", "learning", "webdev", "free"],
    status: "published",
  },
];

async function seedCommunityData() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get or create a default user for posts
    let defaultUser = await User.findOne({ email: "demo@codingjojo.com" });

    if (!defaultUser) {
      console.log("🔄 Creating default user...");
      defaultUser = new User({
        name: "Demo User",
        email: "demo@codingjojo.com",
        password: "hashedpassword", // In real app this would be properly hashed
        role: "student",
        avatar: "/testimonial-avatar.jpg",
        bio: "Community member sharing knowledge and learning together.",
        joinedAt: new Date(),
        postCount: 0,
        reputation: 150,
        badges: ["early-adopter", "helpful"],
      });
      await defaultUser.save();
      console.log("✅ Default user created");
    }

    // Clear existing posts
    console.log("🔄 Clearing existing posts...");
    await Post.deleteMany({});
    console.log("✅ Existing posts cleared");

    // Create new posts
    console.log("🔄 Creating sample posts...");
    const postsToCreate = samplePosts.map((post) => ({
      ...post,
      author: defaultUser._id,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
      updatedAt: new Date(),
      views: Math.floor(Math.random() * 500) + 10,
      likes: [], // Start with no likes
      comments: [],
      likeCount: 0,
      commentCount: 0,
    }));

    const createdPosts = await Post.insertMany(postsToCreate);
    console.log(`✅ Created ${createdPosts.length} sample posts`);

    // Add some random likes to posts
    console.log("🔄 Adding random interactions...");
    for (const post of createdPosts) {
      // Random number of likes (0-5)
      const likeCount = Math.floor(Math.random() * 6);
      for (let i = 0; i < likeCount; i++) {
        post.likes.push({
          user: defaultUser._id,
          createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        });
      }
      post.likeCount = post.likes.length;
      await post.save();
    }
    console.log("✅ Added random interactions");

    console.log("🎉 Community data seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`- User created: ${defaultUser.name} (${defaultUser.email})`);
    console.log(`- Posts created: ${createdPosts.length}`);
    console.log(
      `- Categories used: ${
        [...new Set(samplePosts.map((p) => p.category))].length
      }`
    );
    console.log(
      `- Tags created: ${
        [...new Set(samplePosts.flatMap((p) => p.tags))].length
      }`
    );
  } catch (error) {
    console.error("❌ Error seeding community data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

// Run the seed script
if (require.main === module) {
  seedCommunityData();
}

module.exports = { seedCommunityData, samplePosts };
