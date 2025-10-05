const mongoose = require('mongoose');
const { Post, Category } = require('./src/models/Community');
const User = require('./src/models/User');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Post.deleteMany({});
    await Category.deleteMany({});

    // Create categories
    const categories = [
      {
        name: 'Questions',
        slug: 'questions',
        description: 'Community Q&A',
        color: '#3B82F6',
        icon: 'help-circle',
        postCount: 0,
        isActive: true
      },
      {
        name: 'Discussions',
        slug: 'discussions',
        description: 'General discussions',
        color: '#EC4899',
        icon: 'message-circle',
        postCount: 0,
        isActive: true
      },
      {
        name: 'Announcements',
        slug: 'announcements',
        description: 'Important updates',
        color: '#F59E0B',
        icon: 'bell',
        postCount: 0,
        isActive: true
      },
      {
        name: 'Showcase',
        slug: 'showcase',
        description: 'Project showcases',
        color: '#8B5CF6',
        icon: 'award',
        postCount: 0,
        isActive: true
      },
      {
        name: 'Resources',
        slug: 'resources',
        description: 'Learning resources',
        color: '#10B981',
        icon: 'book-open',
        postCount: 0,
        isActive: true
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created:', createdCategories.length);    // Find or create a test user
    let testUser = await User.findOne({ email: 'test@example.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
        avatar: 'https://via.placeholder.com/150/6366F1/FFFFFF?text=TU'
      });
    }

    // Create sample posts
    const samplePosts = [
      {
        title: 'Welcome to the Coding JoJo Community!',
        content: 'This is our vibrant community where developers share knowledge, ask questions, and showcase their amazing projects. Feel free to introduce yourself and start engaging with fellow developers!',
        excerpt: 'Welcome to our developer community! Start engaging with fellow developers.',
        author: testUser._id,
        category: 'announcements',
        type: 'announcement',
        tags: ['welcome', 'community', 'introduction'],
        isPinned: true,
        isFeatured: true,
        views: 150
      },
      {
        title: 'How to debug React hooks effectively?',
        content: 'I\'m having trouble debugging my React hooks. Sometimes the state doesn\'t update as expected, and I\'m not sure how to trace the issue. What are the best practices for debugging React hooks? Any recommended tools or techniques?',
        excerpt: 'Looking for best practices and tools for debugging React hooks.',
        author: testUser._id,
        category: 'questions',
        type: 'question',
        tags: ['react', 'hooks', 'debugging', 'javascript'],
        views: 89
      },
      {
        title: 'My First Full-Stack Project - Task Manager App',
        content: 'I just completed my first full-stack project using React, Node.js, and MongoDB! It\'s a task manager application with user authentication, CRUD operations, and real-time updates. I learned so much during this journey. Would love to get feedback from the community!',
        excerpt: 'Showcasing my first full-stack project - a task manager app with React and Node.js.',
        author: testUser._id,
        category: 'showcase',
        type: 'showcase',
        tags: ['react', 'nodejs', 'mongodb', 'fullstack', 'project'],
        views: 234
      },
      {
        title: 'Best Practices for REST API Design',
        content: 'Let\'s discuss the best practices for designing RESTful APIs. What are your thoughts on naming conventions, status codes, error handling, and versioning? I\'ve been working on an API and want to make sure I\'m following industry standards.',
        excerpt: 'Discussion about REST API design best practices and standards.',
        author: testUser._id,
        category: 'discussions',
        type: 'discussion',
        tags: ['api', 'rest', 'backend', 'bestpractices'],
        views: 156
      },
      {
        title: 'Free JavaScript Resources for Beginners',
        content: 'Here\'s a curated list of free resources for learning JavaScript:\n\n1. Mozilla Developer Network (MDN)\n2. JavaScript.info\n3. freeCodeCamp\n4. Eloquent JavaScript (online book)\n5. JavaScript30 by Wes Bos\n\nThese resources cover everything from basics to advanced concepts. Perfect for beginners starting their JavaScript journey!',
        excerpt: 'Curated list of free JavaScript learning resources for beginners.',
        author: testUser._id,
        category: 'resources',
        type: 'resource',
        tags: ['javascript', 'learning', 'resources', 'beginners'],
        views: 198
      }
    ];

    const createdPosts = await Post.insertMany(samplePosts);
    console.log('Posts created:', createdPosts.length);

    // Update category post counts
    for (const category of createdCategories) {
      const postCount = await Post.countDocuments({ category: category.slug });
      await Category.findByIdAndUpdate(category._id, { postCount });
    }

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed
const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
