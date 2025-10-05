const mongoose = require('mongoose');
const Course = require('./src/models/Course');
const User = require('./src/models/User');
require('dotenv').config();

const createFeaturedCourse = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/coding-jojo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // Find or create an instructor user
    let instructor = await User.findOne({ role: 'instructor' });
    
    if (!instructor) {
      console.log('📝 Creating instructor user...');
      instructor = await User.create({
        name: 'Dr. Sarah Chen',
        email: 'sarah.chen@codingjojo.com',
        password: 'instructor123',
        role: 'instructor',
        bio: 'AI Researcher & Machine Learning Engineer with 10+ years of experience in developing cutting-edge ML systems',
        avatar: {
          url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80'
        },
        isEmailVerified: true
      });
      console.log('✅ Instructor created');
    } else {
      console.log('✅ Found existing instructor');
    }

    // Check if featured course already exists
    const existingCourse = await Course.findOne({ isFeatured: true });
    
    if (existingCourse) {
      console.log('✅ Featured course already exists:', existingCourse.title);
      return;
    }

    // Create a featured course
    console.log('📝 Creating featured course...');
    const featuredCourse = await Course.create({
      title: 'Advanced Machine Learning: Deep Neural Networks & AI Systems',
      description: 'Master the cutting-edge techniques in deep learning, neural networks architecture, and build intelligent systems that can learn from vast amounts of data.',
      longDescription: 'This comprehensive course will take you from the fundamentals of machine learning to advanced deep learning techniques. You\'ll learn how to build and deploy neural networks, work with computer vision, natural language processing, and create AI systems that can solve real-world problems.',
      level: 'advanced',
      category: 'Machine Learning',
      tags: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Python', 'TensorFlow', 'AI'],
      instructor: instructor._id,
      // FIXED: Set both thumbnailUrl and thumbnail for proper Cloudinary image display
      thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        publicId: null, // External image, no Cloudinary public ID
        width: 600,
        height: 400
      },
      price: 69.99,
      originalPrice: 129.99,
      duration: {
        hours: 42,
        minutes: 30
      },
      totalLessons: 156,
      language: 'English',
      prerequisites: [
        'Basic understanding of Python programming',
        'Fundamental knowledge of mathematics (linear algebra, calculus)',
        'Basic understanding of statistics and probability'
      ],
      learningObjectives: [
        'Build and train deep neural networks from scratch',
        'Implement convolutional neural networks for computer vision',
        'Create recurrent neural networks for sequence data',
        'Deploy machine learning models to production',
        'Understand and apply advanced ML techniques'
      ],
      targetAudience: [
        'Intermediate to advanced Python developers',
        'Data scientists looking to expand their ML skills',
        'Software engineers interested in AI/ML',
        'Students pursuing AI/ML careers'
      ],
      courseContent: [
        {
          sectionTitle: 'Introduction to Deep Learning',
          sectionDescription: 'Fundamentals of neural networks and deep learning',
          lessons: [
            {
              title: 'What is Deep Learning?',
              description: 'Introduction to deep learning concepts and applications',
              duration: 15,
              order: 1
            },
            {
              title: 'Neural Network Fundamentals',
              description: 'Understanding the building blocks of neural networks',
              duration: 25,
              order: 2
            }
          ],
          order: 1
        },
        {
          sectionTitle: 'Building Your First Neural Network',
          sectionDescription: 'Hands-on implementation of neural networks',
          lessons: [
            {
              title: 'Setting Up Your Environment',
              description: 'Installing and configuring TensorFlow and Python libraries',
              duration: 20,
              order: 1
            },
            {
              title: 'Your First Neural Network',
              description: 'Building a simple neural network from scratch',
              duration: 30,
              order: 2
            }
          ],
          order: 2
        }
      ],
      averageRating: 4.9,
      totalRatings: 2103,
      totalEnrollments: 15420,
      isPublished: true,
      isFeatured: true,
      isPremium: true,
      status: 'published',
      certificate: {
        isAvailable: true,
        criteria: {
          minScore: 85,
          completionRequired: true
        }
      },
      publishedAt: new Date()
    });

    console.log('🎉 Featured course created successfully!');
    console.log('Title:', featuredCourse.title);
    console.log('ID:', featuredCourse._id);
    console.log('Instructor:', instructor.name);
    console.log('Price:', `$${featuredCourse.price} (was $${featuredCourse.originalPrice})`);
    console.log('Rating:', `${featuredCourse.averageRating}/5 (${featuredCourse.totalRatings} reviews)`);
    console.log('Enrollments:', featuredCourse.totalEnrollments);

  } catch (error) {
    console.error('❌ Error creating featured course:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
};

// Run the script
createFeaturedCourse();
