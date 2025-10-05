const Course = require('../models/Course');

// Mock courses data
const mockCourses = [
  {
    id: '1',
    title: 'React Mastery: Building Modern UIs',
    description: 'Master React.js from fundamentals to advanced concepts. Build real-world applications.',
    level: 'intermediate',
    category: 'Web Development',
    price: 99.99,
    originalPrice: 149.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: { hours: 25, minutes: 30 },
    totalLessons: 45,
    averageRating: 4.8,
    totalRatings: 2340,
    totalEnrollments: 15420,
    instructor: {
      id: 'i1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      bio: 'Senior React Developer with 8+ years experience'
    },
    isPremium: false,
    isFeatured: true,
    isPublished: true,
    tags: ['React', 'JavaScript', 'Frontend', 'UI/UX'],
    learningObjectives: [
      'Build modern React applications from scratch',
      'Understand React hooks and context',
      'Implement state management patterns',
      'Create responsive and accessible UIs'
    ],
    prerequisites: ['Basic JavaScript knowledge', 'HTML & CSS fundamentals'],
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-12-01').toISOString()
  },
  {
    id: '2',
    title: 'Node.js Complete Guide',
    description: 'Learn Node.js, Express, and MongoDB to build full-stack applications.',
    level: 'intermediate',
    category: 'Web Development',
    price: 89.99,
    originalPrice: 129.99,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: { hours: 30, minutes: 0 },
    totalLessons: 38,
    averageRating: 4.7,
    totalRatings: 1850,
    totalEnrollments: 12300,
    instructor: {
      id: 'i2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      bio: 'Full-stack developer and Node.js expert'
    },
    isPremium: false,
    isFeatured: true,
    isPublished: true,
    tags: ['Node.js', 'Express', 'MongoDB', 'Backend'],
    learningObjectives: [
      'Build RESTful APIs with Node.js and Express',
      'Work with MongoDB and Mongoose',
      'Implement authentication and authorization',
      'Deploy applications to cloud platforms'
    ],
    prerequisites: ['JavaScript fundamentals', 'Basic understanding of web development'],
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-11-15').toISOString()
  },
  {
    id: '3',
    title: 'Python Data Science Fundamentals',
    description: 'Learn data analysis, visualization, and machine learning with Python.',
    level: 'beginner',
    category: 'Data Science',
    price: 79.99,
    originalPrice: 119.99,
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: { hours: 20, minutes: 45 },
    totalLessons: 32,
    averageRating: 4.6,
    totalRatings: 980,
    totalEnrollments: 8500,
    instructor: {
      id: 'i3',
      name: 'Dr. Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      bio: 'Data Scientist with PhD in Statistics'
    },
    isPremium: true,
    isFeatured: false,
    isPublished: true,
    tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
    learningObjectives: [
      'Master Python for data analysis',
      'Create data visualizations with matplotlib and seaborn',
      'Build machine learning models',
      'Work with pandas and numpy libraries'
    ],
    prerequisites: ['Basic programming knowledge'],
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-10-20').toISOString()
  },
  {
    id: '4',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into advanced JavaScript topics including closures, prototypes, and async programming.',
    level: 'advanced',
    category: 'Programming Languages',
    price: 69.99,
    originalPrice: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: { hours: 18, minutes: 30 },
    totalLessons: 28,
    averageRating: 4.9,
    totalRatings: 1200,
    totalEnrollments: 6800,
    instructor: {
      id: 'i4',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      bio: 'JavaScript expert and technical author'
    },
    isPremium: false,
    isFeatured: false,
    isPublished: true,
    tags: ['JavaScript', 'ES6+', 'Async Programming', 'Advanced'],
    learningObjectives: [
      'Master closures and scope in JavaScript',
      'Understand prototypal inheritance',
      'Work with promises and async/await',
      'Implement advanced design patterns'
    ],
    prerequisites: ['Solid JavaScript fundamentals', 'Experience with web development'],
    createdAt: new Date('2024-04-12').toISOString(),
    updatedAt: new Date('2024-09-30').toISOString()
  }
];

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const {
      category,
      level,
      search,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12,
      featured
    } = req.query;

    let filteredCourses = [...mockCourses];

    // Apply filters
    if (category && category !== 'all') {
      filteredCourses = filteredCourses.filter(course => 
        course.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (level && level !== 'all') {
      filteredCourses = filteredCourses.filter(course => 
        course.level === level
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (featured === 'true') {
      filteredCourses = filteredCourses.filter(course => course.isFeatured);
    }

    // Apply sorting
    filteredCourses.sort((a, b) => {
      let aVal, bVal;
      
      switch (sort) {
        case 'price':
          aVal = a.price;
          bVal = b.price;
          break;
        case 'rating':
          aVal = a.averageRating;
          bVal = b.averageRating;
          break;
        case 'popularity':
          aVal = a.totalEnrollments;
          bVal = b.totalEnrollments;
          break;
        case 'title':
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        default:
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
      }

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Apply pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    const totalCourses = filteredCourses.length;
    const totalPages = Math.ceil(totalCourses / limitNum);

    res.json({
      success: true,
      courses: paginatedCourses,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCourses,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      },
      filters: {
        categories: [...new Set(mockCourses.map(course => course.category))],
        levels: ['beginner', 'intermediate', 'advanced']
      }
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = mockCourses.find(course => course.id === id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Add detailed course content for single course view
    const detailedCourse = {
      ...course,
      courseContent: [
        {
          sectionTitle: 'Getting Started',
          sectionDescription: 'Introduction to the course and setup',
          lessons: [
            {
              title: 'Course Introduction',
              description: 'Welcome and course overview',
              duration: 10,
              isPreview: true
            },
            {
              title: 'Environment Setup',
              description: 'Setting up your development environment',
              duration: 15,
              isPreview: false
            }
          ],
          order: 1
        },
        {
          sectionTitle: 'Core Concepts',
          sectionDescription: 'Fundamental concepts and principles',
          lessons: [
            {
              title: 'Understanding the Basics',
              description: 'Core concepts explained',
              duration: 25,
              isPreview: false
            },
            {
              title: 'Practical Examples',
              description: 'Hands-on examples and exercises',
              duration: 30,
              isPreview: false
            }
          ],
          order: 2
        }
      ],
      relatedCourses: mockCourses
        .filter(c => c.id !== id && c.category === course.category)
        .slice(0, 3),
      reviews: [
        {
          id: 'r1',
          user: {
            name: 'John Smith',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80'
          },
          rating: 5,
          review: 'Excellent course! Very comprehensive and well-structured.',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'r2',
          user: {
            name: 'Alice Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80'
          },
          rating: 4,
          review: 'Great content, learned a lot. Would recommend to others.',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    };

    res.json({
      success: true,
      course: detailedCourse
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;

    const course = mockCourses.find(course => course.id === id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is already enrolled (in a real app, check database)
    // For now, just return success

    res.json({
      success: true,
      message: 'Successfully enrolled in course',
      enrollment: {
        courseId: id,
        userId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        completed: false
      }
    });

  } catch (error) {
    console.error('Course enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during enrollment'
    });
  }
};

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
const getFeaturedCourses = async (req, res) => {
  try {
    // Filter for featured courses
    const featuredCourses = mockCourses.filter(course => course.isFeatured);
    
    res.json({
      success: true,
      data: featuredCourses,
      message: 'Featured courses retrieved successfully'
    });

  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured courses'
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  enrollInCourse,
  getFeaturedCourses
};
