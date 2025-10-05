const { Post, Category, Tag } = require("../models/Community");
const User = require("../models/User");

// Mock data for development (fallback when database is not available)
const mockPosts = [
  {
    _id: "507f1f77bcf86cd799439011",
    title: "Getting Started with React Hooks",
    content:
      "React Hooks have revolutionized the way we write React components. In this post, I'll share some tips and best practices for using hooks effectively in your React applications.",
    excerpt:
      "Learn the fundamentals of React Hooks and how they can improve your React development workflow.",
    author: {
      _id: "507f1f77bcf86cd799439001",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/testimonial-avatar.jpg",
      role: "instructor"
    },
    category: "react",
    tags: ["react", "hooks", "javascript", "frontend"],
    likes: [
      { user: "507f1f77bcf86cd799439002", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { user: "507f1f77bcf86cd799439003", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    ],
    comments: [
      {
        _id: "comment1",
        user: {
          _id: "507f1f77bcf86cd799439002",
          name: "Mike Chen",
          avatar: "/testimonial-avatar.jpg",
          role: "student"
        },
        content:
          "Great explanation! This really helped me understand useState better.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        likes: [],
      },
    ],
    views: 245,
    isPinned: true,
    isFeatured: true,
    status: "published",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    likeCount: 2,
    commentCount: 1,
  },
  {
    _id: "507f1f77bcf86cd799439012",
    title: "Python vs JavaScript: Which Should You Learn First?",
    content:
      "Both Python and JavaScript are excellent programming languages for beginners. Let's explore the pros and cons of each to help you make an informed decision.",
    excerpt:
      "A comprehensive comparison of Python and JavaScript for new programmers.",
    author: {
      _id: "507f1f77bcf86cd799439004",
      name: "Alex Rodriguez",
      email: "alex@example.com",
      avatar: "/testimonial-avatar.jpg",
      role: "admin"
    },
    category: "career",
    tags: ["python", "javascript", "beginner", "career"],
    likes: [
      { user: "507f1f77bcf86cd799439005", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    ],
    comments: [],
    views: 189,
    isPinned: false,
    isFeatured: false,
    status: "published",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    likeCount: 1,
    commentCount: 0,
  },
  {
    _id: "507f1f77bcf86cd799439013",
    title: "Building a REST API with Node.js and Express",
    content:
      "Learn how to create a robust REST API using Node.js and Express. We'll cover routing, middleware, error handling, and best practices.",
    excerpt: "Step-by-step guide to building RESTful APIs with Node.js.",
    author: {
      _id: "507f1f77bcf86cd799439006",
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/testimonial-avatar.jpg",
      role: "instructor"
    },
    category: "node",
    tags: ["nodejs", "express", "api", "backend"],
    likes: [
      { user: "507f1f77bcf86cd799439007", createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
      { user: "507f1f77bcf86cd799439008", createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
      { user: "507f1f77bcf86cd799439009", createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    ],
    comments: [
      {
        _id: "comment2",
        user: {
          _id: "507f1f77bcf86cd799439007",
          name: "David Kim",
          avatar: "/testimonial-avatar.jpg",
          role: "student"
        },
        content:
          "Excellent tutorial! The middleware section was particularly helpful.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        likes: [],
      },
    ],
    views: 312,
    isPinned: false,
    isFeatured: true,
    status: "published",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    likeCount: 3,
    commentCount: 1,
  },
];

const mockCategories = [
  {
    _id: "cat1",
    name: "General Discussion",
    slug: "general",
    description: "General programming discussions and community chat",
    color: "#6366F1",
    icon: "chat",
    postCount: 45,
    isActive: true,
  },
  {
    _id: "cat2",
    name: "JavaScript",
    slug: "javascript",
    description: "Everything about JavaScript, ES6+, and modern JS frameworks",
    color: "#F59E0B",
    icon: "code",
    postCount: 78,
    isActive: true,
  },
  {
    _id: "cat3",
    name: "Python",
    slug: "python",
    description: "Python programming, Django, Flask, and data science",
    color: "#10B981",
    icon: "terminal",
    postCount: 56,
    isActive: true,
  },
  {
    _id: "cat4",
    name: "React",
    slug: "react",
    description:
      "React.js discussions, hooks, state management, and best practices",
    color: "#3B82F6",
    icon: "react",
    postCount: 89,
    isActive: true,
  },
  {
    _id: "cat5",
    name: "Node.js",
    slug: "node",
    description: "Backend development with Node.js, Express, and APIs",
    color: "#84CC16",
    icon: "server",
    postCount: 34,
    isActive: true,
  },
  {
    _id: "cat6",
    name: "Web Design",
    slug: "web-design",
    description: "UI/UX design, CSS, animations, and frontend aesthetics",
    color: "#EC4899",
    icon: "design",
    postCount: 23,
    isActive: true,
  },
  {
    _id: "cat7",
    name: "Career Advice",
    slug: "career",
    description:
      "Job hunting, interviews, career growth, and industry insights",
    color: "#8B5CF6",
    icon: "briefcase",
    postCount: 67,
    isActive: true,
  },
  {
    _id: "cat8",
    name: "Project Showcase",
    slug: "projects",
    description: "Share your projects and get feedback from the community",
    color: "#F97316",
    icon: "star",
    postCount: 41,
    isActive: true,
  },
];

const mockMembers = [
  {
    _id: "507f1f77bcf86cd799439001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/testimonial-avatar.jpg",
    bio: "Full-stack developer with 5+ years experience",
    joinedAt: new Date("2023-08-15"),
    postCount: 12,
    reputation: 245,
    badges: ["Top Contributor", "React Expert"],
    isOnline: true,
  },
  {
    _id: "507f1f77bcf86cd799439002",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "/testimonial-avatar.jpg",
    bio: "Frontend enthusiast, React and Vue specialist",
    joinedAt: new Date("2023-09-22"),
    postCount: 8,
    reputation: 189,
    badges: ["Rising Star"],
    isOnline: false,
  },
  {
    _id: "507f1f77bcf86cd799439003",
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/testimonial-avatar.jpg",
    bio: "Backend developer, Node.js and Python expert",
    joinedAt: new Date("2023-07-10"),
    postCount: 15,
    reputation: 312,
    badges: ["Top Contributor", "Backend Guru"],
    isOnline: true,
  },
  {
    _id: "507f1f77bcf86cd799439004",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    avatar: "/testimonial-avatar.jpg",
    bio: "Career coach and senior software engineer",
    joinedAt: new Date("2023-06-05"),
    postCount: 20,
    reputation: 456,
    badges: ["Top Contributor", "Mentor", "Career Expert"],
    isOnline: false,
  },
];

const mockTags = [
  { name: "javascript", count: 156, category: "javascript" },
  { name: "react", count: 134, category: "react" },
  { name: "nodejs", count: 89, category: "node" },
  { name: "python", count: 78, category: "python" },
  { name: "frontend", count: 67, category: "general" },
  { name: "backend", count: 56, category: "general" },
  { name: "api", count: 45, category: "node" },
  { name: "css", count: 43, category: "web-design" },
  { name: "beginner", count: 41, category: "general" },
  { name: "career", count: 38, category: "career" },
  { name: "hooks", count: 34, category: "react" },
  { name: "express", count: 32, category: "node" },
  { name: "typescript", count: 29, category: "javascript" },
  { name: "database", count: 27, category: "general" },
  { name: "web-development", count: 25, category: "general" },
];

// Get all posts with filtering and pagination
const getPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      sort = "recent",
      search,
      featured,
    } = req.query;

    // Check if database is available
    if (!Post.db || !Post.db.readyState) {
      // Use mock data when database is not available but ensure real timestamps
      let filteredPosts = [...mockPosts].map(post => ({
        ...post,
        createdAt: new Date(post.createdAt), // Ensure real date objects
        updatedAt: new Date(post.updatedAt || post.createdAt)
      }));

      // Apply filters to mock data
      if (category && category !== "all") {
        filteredPosts = filteredPosts.filter(post => post.category === category);
      }

      if (tag) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.includes(tag.toLowerCase())
        );
      }

      if (search) {
        const searchTerm = search.toLowerCase();
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some(t => t.toLowerCase().includes(searchTerm))
        );
      }

      if (featured === "true") {
        filteredPosts = filteredPosts.filter(post => post.isFeatured);
      }

      // Sort mock data
      switch (sort) {
        case "popular":
          filteredPosts.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
          break;
        case "trending":
          filteredPosts.sort((a, b) => {
            const aScore = (a.likeCount || 0) + (a.commentCount || 0) + (a.views || 0);
            const bScore = (b.likeCount || 0) + (b.commentCount || 0) + (b.views || 0);
            return bScore - aScore;
          });
          break;
        case "oldest":
          filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "recent":
        default:
          filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }

      // Pagination for mock data
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

      return res.status(200).json({
        success: true,
        data: {
          posts: paginatedPosts,
          pagination: {
            current: parseInt(page),
            total: Math.ceil(filteredPosts.length / limit),
            count: paginatedPosts.length,
            totalPosts: filteredPosts.length,
          },
        },
      });
    }

    // Build query object for database
    let query = { status: "published" };

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] };
    }

    // Filter by search term
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Filter by featured
    if (featured === "true") {
      query.isFeatured = true;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case "popular":
        sortObj = { likeCount: -1, commentCount: -1 };
        break;
      case "trending":
        sortObj = { views: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "recent":
      default:
        sortObj = { createdAt: -1 };
    }

    // Execute database query with pagination
    const skip = (page - 1) * limit;
    const posts = await Post.find(query)
      .populate("author", "name email avatar role")
      .populate("likes.user", "name avatar")
      .populate("comments.user", "name avatar")
      .populate("viewers.user", "name email avatar role")
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalPosts = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(totalPosts / limit),
          count: posts.length,
          totalPosts,
        },
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
      error: error.message,
    });
  }
};

// Get single post
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if database is available
    if (!Post.db || !Post.db.readyState) {
      // Use mock data when database is not available
      const post = mockPosts.find((p) => p._id === id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      // Increment view count (in memory for mock data)
      post.views += 1;

      // Ensure real timestamps
      const responsePost = {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt || post.createdAt)
      };

      return res.status(200).json({
        success: true,
        data: responsePost,
      });
    }

    // Get from database
    const post = await Post.findById(id)
      .populate("author", "name email avatar role")
      .populate("likes.user", "name avatar")
      .populate("comments.user", "name avatar")
      .populate("viewers.user", "name email avatar role");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Track viewer if user is authenticated
    const userId = req.user?.id || req.headers['x-user-id'];
    if (userId) {
      // Check if this user has already viewed this post
      const existingView = post.viewers.find(v => v.user._id.toString() === userId.toString());
      
      if (!existingView) {
        // Add new viewer
        post.viewers.push({
          user: userId,
          viewedAt: new Date()
        });
        
        // Populate the new viewer data
        await post.populate({
          path: 'viewers.user',
          select: 'name email avatar role',
          match: { _id: userId }
        });
      }
    }

    // Increment view count in database
    post.views = (post.views || 0) + 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching post",
      error: error.message,
    });
  }
};

// Create new post
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, isPinned, isFeatured } = req.body;

    // Get user from authentication middleware (assumes auth middleware sets req.user)
    let author;
    let authorUser;
    
    if (req.user) {
      author = req.user._id;
      authorUser = req.user;
    } else {
      // Fallback for development/testing
      const userId = req.headers["x-user-id"];
      
      if (userId) {
        // Try to find specific user
        authorUser = await User.findById(userId);
        if (authorUser) {
          author = authorUser._id;
        }
      }

      if (!authorUser) {
        return res.status(401).json({
          success: false,
          message: "Authentication required - user not found",
        });
      }
    }

    // Update user activity
    if (authorUser) {
      await updateUserActivity(authorUser._id);
    }

    // Create post data with real user information
    const postData = {
      title,
      content,
      excerpt: content.substring(0, 150) + (content.length > 150 ? "..." : ""),
      author,
      category: category || "general",
      tags: tags || [],
      isPinned: isPinned || false,
      isFeatured: isFeatured || false,
      status: "published",
      createdAt: new Date(), // Real creation time
      updatedAt: new Date(),
    };

    // Check if database is available
    if (!Post.db || !Post.db.readyState) {
      // Return mock response when database is not available
      const mockPost = {
        _id: `post_${Date.now()}`,
        ...postData,
        author: {
          _id: authorUser._id,
          name: authorUser.name,
          email: authorUser.email,
          avatar: authorUser.avatar?.url || authorUser.avatar || '/testimonial-avatar.jpg',
          role: authorUser.role
        },
        likeCount: 0,
        commentCount: 0,
        views: 0,
        likes: [],
        comments: []
      };

      return res.status(201).json({
        success: true,
        data: mockPost,
        message: "Post created successfully",
      });
    }

    // Create post in database
    const newPost = await Post.create(postData);

    // Populate author details for response
    await newPost.populate("author", "name email avatar role");

    res.status(201).json({
      success: true,
      data: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: "Error creating post",
      error: error.message,
    });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    const postIndex = mockPosts.findIndex((p) => p._id === id);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Update post
    mockPosts[postIndex] = {
      ...mockPosts[postIndex],
      title: title || mockPosts[postIndex].title,
      content: content || mockPosts[postIndex].content,
      category: category || mockPosts[postIndex].category,
      tags: tags || mockPosts[postIndex].tags,
      updatedAt: new Date(),
    };

    res.status(200).json({
      success: true,
      data: mockPosts[postIndex],
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating post",
      error: error.message,
    });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postIndex = mockPosts.findIndex((p) => p._id === id);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    mockPosts.splice(postIndex, 1);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: error.message,
    });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: mockCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// Get community members
const getMembers = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = "reputation" } = req.query;

    let sortedMembers = [...mockMembers];

    // Sort members
    switch (sort) {
      case "newest":
        sortedMembers.sort(
          (a, b) => new Date(b.joinedAt) - new Date(a.joinedAt)
        );
        break;
      case "posts":
        sortedMembers.sort((a, b) => b.postCount - a.postCount);
        break;
      case "reputation":
      default:
        sortedMembers.sort((a, b) => b.reputation - a.reputation);
        break;
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedMembers = sortedMembers.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        members: paginatedMembers,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(sortedMembers.length / limit),
          count: paginatedMembers.length,
          totalMembers: sortedMembers.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching members",
      error: error.message,
    });
  }
};

// Get popular tags
const getPopularTags = async (req, res) => {
  try {
    const { limit = 15 } = req.query;

    const popularTags = mockTags
      .sort((a, b) => b.count - a.count)
      .slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      data: popularTags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching popular tags",
      error: error.message,
    });
  }
};

// Like/unlike a post
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;

    // Get user from authentication middleware
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      // Fallback for development/testing
      userId = req.headers["x-user-id"] || "507f1f77bcf86cd799439001";

      // Verify user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingLikeIndex = post.likes.findIndex(
      (like) => like.user.toString() === userId.toString()
    );

    if (existingLikeIndex > -1) {
      // Remove like
      post.likes.splice(existingLikeIndex, 1);
      post.likeCount = post.likes.length;

      await post.save();

      res.status(200).json({
        success: true,
        data: {
          postId: id,
          liked: false,
          likeCount: post.likeCount,
        },
        message: "Post unliked successfully",
      });
    } else {
      // Add like
      post.likes.push({
        user: userId,
        createdAt: new Date(),
      });
      post.likeCount = post.likes.length;

      await post.save();

      res.status(200).json({
        success: true,
        data: {
          postId: id,
          liked: true,
          likeCount: post.likeCount,
        },
        message: "Post liked successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling like",
      error: error.message,
    });
  }
};

// Add comment to post
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, parentComment } = req.body;

    // Get user from authentication middleware
    let userId;
    let currentUser;
    
    if (req.user) {
      userId = req.user._id;
      currentUser = req.user;
    } else {
      // Fallback for development/testing
      userId = req.headers["x-user-id"];
      
      if (userId) {
        // Try to find specific user
        currentUser = await User.findById(userId);
        if (!currentUser) {
          return res.status(401).json({
            success: false,
            message: "Authentication required - user not found",
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }
    }

    // Update user activity
    if (currentUser) {
      await updateUserActivity(currentUser._id);
    }

    // Check if database is available
    if (!Post.db || !Post.db.readyState) {
      // Handle mock data when database is not available
      const post = mockPosts.find((p) => p._id === id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      const newComment = {
        _id: `comment_${Date.now()}`,
        user: {
          _id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          avatar: currentUser.avatar?.url || currentUser.avatar || '/testimonial-avatar.jpg',
          role: currentUser.role
        },
        content,
        parentComment: parentComment || null,
        createdAt: new Date(),
        likes: [],
        likeCount: 0
      };

      post.comments.push(newComment);
      post.commentCount = post.comments.length;

      return res.status(201).json({
        success: true,
        data: newComment,
        message: "Comment added successfully",
      });
    }

    // Handle database operations
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const newComment = {
      user: userId,
      content,
      parentComment: parentComment || null,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    post.commentCount = post.comments.length;

    await post.save();

    // Populate the new comment with user details for response
    await post.populate("comments.user", "name email avatar role");
    const addedComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      success: true,
      data: addedComment,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: "Error adding comment",
      error: error.message,
    });
  }
};

// Share post
const sharePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, message } = req.body;

    // Get user data from headers
    const userId = req.headers["x-user-id"] || `user_${Date.now()}`;
    const userName = req.headers["x-user-name"] || "Anonymous User";

    const post = mockPosts.find((p) => p._id === id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user already shared this post
    const existingShareIndex = post.shares.findIndex(
      (share) => share.user === userId
    );

    if (existingShareIndex === -1) {
      // Add share
      post.shares.push({
        user: userId,
        userName: userName,
        platform: platform || "community",
        message: message || "",
        createdAt: new Date(),
      });
      post.shareCount = post.shares.length;
    }

    res.status(200).json({
      success: true,
      data: {
        postId: id,
        shareCount: post.shareCount,
        platform: platform || "community",
      },
      message: "Post shared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sharing post",
      error: error.message,
    });
  }
};

// Like/unlike a comment
const toggleCommentLike = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    // Get user data from headers
    const userId = req.headers["x-user-id"] || `user_${Date.now()}`;
    const userName = req.headers["x-user-name"] || "Anonymous User";

    const post = mockPosts.find((p) => p._id === postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = post.comments.find((c) => c._id === commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    const existingLikeIndex = comment.likes.findIndex(
      (like) => like.user === userId
    );

    if (existingLikeIndex > -1) {
      // Remove like
      comment.likes.splice(existingLikeIndex, 1);
      comment.likeCount = comment.likes.length;

      res.status(200).json({
        success: true,
        data: {
          commentId,
          liked: false,
          likeCount: comment.likeCount,
        },
        message: "Comment unliked successfully",
      });
    } else {
      // Add like
      comment.likes.push({
        user: userId,
        userName: userName,
        createdAt: new Date(),
      });
      comment.likeCount = comment.likes.length;

      res.status(200).json({
        success: true,
        data: {
          commentId,
          liked: true,
          likeCount: comment.likeCount,
        },
        message: "Comment liked successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling comment like",
      error: error.message,
    });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = mockPosts.find((p) => p._id === postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const commentIndex = post.comments.findIndex((c) => c._id === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    post.comments.splice(commentIndex, 1);
    post.commentCount = post.comments.length;

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting comment",
      error: error.message,
    });
  }
};

// Save post
const savePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = mockPosts.find((p) => p._id === id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving post",
      error: error.message,
    });
  }
};

// Unsave post
const unsavePost = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      message: "Post unsaved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error unsaving post",
      error: error.message,
    });
  }
};

// Report post
const reportPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const post = mockPosts.find((p) => p._id === id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // In real implementation, save report to database
    console.log(`Post ${id} reported for: ${reason}`);

    res.status(200).json({
      success: true,
      message: "Post reported successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error reporting post",
      error: error.message,
    });
  }
};

// Mute thread
const muteThread = async (req, res) => {
  try {
    const { id } = req.params;

    const post = mockPosts.find((p) => p._id === id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Thread muted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error muting thread",
      error: error.message,
    });
  }
};

// Follow user
const followUser = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error following user",
      error: error.message,
    });
  }
};

// Unfollow user
const unfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error unfollowing user",
      error: error.message,
    });
  }
};

// Get community stats
const getCommunityStats = async (req, res) => {
  try {
    const stats = {
      totalPosts: mockPosts.length,
      totalMembers: mockMembers.length,
      onlineMembers: mockMembers.filter((m) => m.isOnline).length,
      totalViews: mockPosts.reduce((sum, post) => sum + post.views, 0),
      popularTags: mockTags.slice(0, 10),
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching community stats",
      error: error.message,
    });
  }
};

// Search posts
const searchPosts = async (req, res) => {
  try {
    const { query, category, tags, author, page = 1, limit = 10 } = req.query;

    let filteredPosts = [...mockPosts];

    // Apply search filters
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.includes(searchTerm))
      );
    }

    if (category && category !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.category === category
      );
    }

    if (author) {
      filteredPosts = filteredPosts.filter((post) =>
        post.author.name.toLowerCase().includes(author.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(filteredPosts.length / limit),
          count: paginatedPosts.length,
          totalPosts: filteredPosts.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching posts",
      error: error.message,
    });
  }
};

// Get trending posts
const getTrendingPosts = async (req, res) => {
  try {
    const { timeframe = "week", limit = 10 } = req.query;

    // Sort by engagement (likes + comments + views)
    const trendingPosts = [...mockPosts]
      .sort((a, b) => {
        const aEngagement = a.likeCount + a.commentCount + a.views;
        const bEngagement = b.likeCount + b.commentCount + b.views;
        return bEngagement - aEngagement;
      })
      .slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      data: trendingPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching trending posts",
      error: error.message,
    });
  }
};

// Get saved posts
const getSavedPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Mock saved posts (in real implementation, fetch from user's saved posts)
    const savedPosts = mockPosts.slice(0, 2);

    res.status(200).json({
      success: true,
      data: {
        posts: savedPosts,
        pagination: {
          current: parseInt(page),
          total: 1,
          count: savedPosts.length,
          totalPosts: savedPosts.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching saved posts",
      error: error.message,
    });
  }
};

// Get user posts
const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const userPosts = mockPosts.filter((post) => post.author._id === id);

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = userPosts.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(userPosts.length / limit),
          count: paginatedPosts.length,
          totalPosts: userPosts.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user posts",
      error: error.message,
    });
  }
};

// ========================================
// EVENTS MANAGEMENT
// ========================================

// Mock events data
const mockEvents = [
  {
    _id: "event1",
    title: "JavaScript Workshop: Advanced Concepts",
    description:
      "Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.",
    type: "workshop",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    endDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
    ), // 3 hours later
    location: "Virtual",
    isVirtual: true,
    meetingLink: "https://meet.example.com/javascript-workshop",
    maxAttendees: 50,
    currentAttendees: 23,
    organizer: {
      _id: "507f1f77bcf86cd799439001",
      name: "Sarah Johnson",
      avatar: "/testimonial-avatar.jpg",
      role: "instructor",
    },
    attendees: [],
    tags: ["javascript", "workshop", "advanced"],
    status: "upcoming",
    createdAt: new Date("2024-01-10"),
    isAttending: false,
  },
  {
    _id: "event2",
    title: "React Community Meetup",
    description:
      "Monthly meetup for React developers to share experiences and network.",
    type: "meetup",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    isVirtual: false,
    location: "Tech Hub, Downtown",
    maxAttendees: 100,
    currentAttendees: 67,
    organizer: {
      _id: "507f1f77bcf86cd799439002",
      name: "Mike Chen",
      avatar: "/testimonial-avatar.jpg",
      role: "admin",
    },
    attendees: [],
    tags: ["react", "meetup", "networking"],
    status: "upcoming",
    createdAt: new Date("2024-01-12"),
    isAttending: true,
  },
];

// @desc    Get all events
// @route   GET /api/v1/community/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const { type, status, upcoming, page = 1, limit = 10 } = req.query;

    let filteredEvents = [...mockEvents];

    // Apply filters
    if (type) {
      filteredEvents = filteredEvents.filter((event) => event.type === type);
    }

    if (status) {
      filteredEvents = filteredEvents.filter(
        (event) => event.status === status
      );
    }

    if (upcoming === "true") {
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.startDate) > new Date()
      );
    }

    // Sort by start date
    filteredEvents.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const paginatedEvents = filteredEvents.slice(
      startIndex,
      startIndex + parseInt(limit)
    );

    res.status(200).json({
      success: true,
      data: {
        events: paginatedEvents,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(filteredEvents.length / limit),
          count: paginatedEvents.length,
          totalEvents: filteredEvents.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    });
  }
};

// @desc    Get single event
// @route   GET /api/v1/community/events/:id
// @access  Public
const getEvent = async (req, res) => {
  try {
    const event = mockEvents.find((e) => e._id === req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message,
    });
  }
};

// @desc    Create new event
// @route   POST /api/v1/community/events
// @access  Private (Admin)
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      startDate,
      endDate,
      location,
      isVirtual,
      meetingLink,
      maxAttendees,
      tags,
    } = req.body;

    const newEvent = {
      _id: `event${Date.now()}`,
      title,
      description,
      type,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      location,
      isVirtual,
      meetingLink,
      maxAttendees: maxAttendees || null,
      currentAttendees: 0,
      organizer: {
        _id: "admin1",
        name: "Admin User",
        avatar: "/admin-avatar.jpg",
        role: "admin",
      },
      attendees: [],
      tags: tags || [],
      status: "upcoming",
      createdAt: new Date(),
      isAttending: false,
    };

    mockEvents.push(newEvent);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
};

// @desc    Update event
// @route   PUT /api/v1/community/events/:id
// @access  Private (Admin)
const updateEvent = async (req, res) => {
  try {
    const eventIndex = mockEvents.findIndex((e) => e._id === req.params.id);

    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    mockEvents[eventIndex] = {
      ...mockEvents[eventIndex],
      ...req.body,
      updatedAt: new Date(),
    };

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: mockEvents[eventIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message,
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/v1/community/events/:id
// @access  Private (Admin)
const deleteEvent = async (req, res) => {
  try {
    const eventIndex = mockEvents.findIndex((e) => e._id === req.params.id);

    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    mockEvents.splice(eventIndex, 1);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message,
    });
  }
};

// @desc    Attend event
// @route   POST /api/v1/community/events/:id/attend
// @access  Private
const attendEvent = async (req, res) => {
  try {
    const event = mockEvents.find((e) => e._id === req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Toggle attendance
    event.isAttending = !event.isAttending;
    if (event.isAttending) {
      event.currentAttendees += 1;
    } else {
      event.currentAttendees = Math.max(0, event.currentAttendees - 1);
    }

    res.status(200).json({
      success: true,
      message: event.isAttending
        ? "Successfully registered for event"
        : "Successfully unregistered from event",
      data: { isAttending: event.isAttending },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating attendance",
      error: error.message,
    });
  }
};

// @desc    Unattend event
// @route   DELETE /api/v1/community/events/:id/attend
// @access  Private
const unattendEvent = async (req, res) => {
  try {
    const event = mockEvents.find((e) => e._id === req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.isAttending = false;
    event.currentAttendees = Math.max(0, event.currentAttendees - 1);

    res.status(200).json({
      success: true,
      message: "Successfully unregistered from event",
      data: { isAttending: false },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error unregistering from event",
      error: error.message,
    });
  }
};

// ========================================
// ENHANCED COMMUNITY FEATURES
// ========================================

// @desc    Get category statistics with real counts
// @route   GET /api/v1/community/categories/stats
// @access  Public
const getCategoryStats = async (req, res) => {
  try {
    // Count posts by mapping existing categories to main categories
    const getPostCountForCategory = (mainCategory) => {
      const categoryMappings = {
        questions: ["help", "question", "support", "debugging", "error"],
        discussions: ["general", "discussion", "chat", "opinion", "career"],
        announcements: ["announcement", "news", "update"],
        showcase: ["showcase", "project", "portfolio", "demo"],
        resources: ["tutorial", "guide", "resource", "learning", "react", "javascript", "node", "python", "css", "html", "vue", "angular"]
      };
      
      const mappedCategories = categoryMappings[mainCategory] || [];
      return mockPosts.filter(post => 
        post.category === mainCategory || 
        mappedCategories.includes(post.category)
      ).length;
    };

    const categories = [
      {
        _id: "questions",
        name: "Questions",
        slug: "questions",
        postCount: getPostCountForCategory("questions"),
        recentPostCount: 12, // posts in last 24 hours
        activeUsers: 45,
        description: "Community Q&A",
        color: "#3B82F6",
        icon: "help-circle",
      },
      {
        _id: "discussions",
        name: "Discussions",
        slug: "discussions",
        postCount: getPostCountForCategory("discussions"),
        recentPostCount: 8,
        activeUsers: 32,
        description: "General discussions",
        color: "#EC4899",
        icon: "message-circle",
      },
      {
        _id: "announcements",
        name: "Announcements",
        slug: "announcements",
        postCount: getPostCountForCategory("announcements"),
        recentPostCount: 2,
        activeUsers: 15,
        description: "Important updates",
        color: "#F59E0B",
        icon: "bell",
      },
      {
        _id: "showcase",
        name: "Showcase",
        slug: "showcase",
        postCount: getPostCountForCategory("showcase"),
        recentPostCount: 5,
        activeUsers: 28,
        description: "Project showcases",
        color: "#8B5CF6",
        icon: "award",
      },
      {
        _id: "resources",
        name: "Resources",
        slug: "resources",
        postCount: getPostCountForCategory("resources"),
        recentPostCount: 7,
        activeUsers: 19,
        description: "Learning resources",
        color: "#10B981",
        icon: "book-open",
      },
    ];

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching category statistics",
      error: error.message,
    });
  }
};

// Mock chat messages
const mockChatMessages = [
  {
    _id: "chat1",
    content: "Hey everyone! Just finished building my first React app 🎉",
    sender: {
      _id: "user1",
      name: "Alex Dev",
      avatar: "/testimonial-avatar.jpg",
      role: "student",
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    type: "text",
    reactions: {
      "🎉": [{ _id: "user2", name: "Jane" }],
      "👏": [{ _id: "user3", name: "Bob" }],
    },
  },
  {
    _id: "chat2",
    content: "That's awesome! What features did you implement?",
    sender: {
      _id: "user2",
      name: "Jane Smith",
      avatar: "/testimonial-avatar.jpg",
      role: "student",
    },
    timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    type: "text",
    reactions: {},
  },
];

// @desc    Get community chat messages
// @route   GET /api/v1/community/chat
// @access  Public
const getCommunityChat = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    // Update user activity for authenticated users
    const userId = req.user?._id || req.headers['x-user-id'];
    if (userId && !userId.startsWith('user_')) {
      await updateUserActivity(userId);
    }

    const messages = mockChatMessages
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Get community chat error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching chat messages",
      error: error.message,
    });
  }
};

// @desc    Send community chat message
// @route   POST /api/v1/community/chat
// @access  Private
const sendCommunityMessage = async (req, res) => {
  try {
    const { content, type = "text" } = req.body;
    
    // Get user information
    const userId = req.user?._id || req.headers['x-user-id'] || `user_${Date.now()}`;
    const userName = req.user?.name || req.headers['x-user-name'] || "Anonymous User";
    const userAvatar = req.user?.avatar?.url || req.user?.avatar || req.headers['x-user-avatar'] || "/testimonial-avatar.jpg";
    const userRole = req.user?.role || req.headers['x-user-role'] || "student";

    // Update user activity
    if (userId && userId.startsWith('user_') === false) {
      await updateUserActivity(userId);
    }

    const newMessage = {
      _id: `chat${Date.now()}`,
      content,
      sender: {
        _id: userId,
        name: userName,
        avatar: userAvatar,
        role: userRole,
      },
      timestamp: new Date(),
      type,
      reactions: {},
    };

    mockChatMessages.push(newMessage);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error('Send community message error:', error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// @desc    React to chat message
// @route   POST /api/v1/community/chat/:id/react
// @access  Private
const reactToChatMessage = async (req, res) => {
  try {
    const { emoji } = req.body;
    const message = mockChatMessages.find((m) => m._id === req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (!message.reactions[emoji]) {
      message.reactions[emoji] = [];
    }

    // Toggle reaction
    const userIndex = message.reactions[emoji].findIndex(
      (u) => u._id === "currentUser"
    );
    if (userIndex > -1) {
      message.reactions[emoji].splice(userIndex, 1);
      if (message.reactions[emoji].length === 0) {
        delete message.reactions[emoji];
      }
    } else {
      message.reactions[emoji].push({
        _id: "currentUser",
        name: "Current User",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reaction updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating reaction",
      error: error.message,
    });
  }
};

// @desc    Remove reaction from chat message
// @route   DELETE /api/v1/community/chat/:id/react/:emoji
// @access  Private
const removeChatReaction = async (req, res) => {
  try {
    const { emoji } = req.params;
    const message = mockChatMessages.find((m) => m._id === req.params.id);

    if (!message || !message.reactions[emoji]) {
      return res.status(404).json({
        success: false,
        message: "Message or reaction not found",
      });
    }

    const userIndex = message.reactions[emoji].findIndex(
      (u) => u._id === "currentUser"
    );
    if (userIndex > -1) {
      message.reactions[emoji].splice(userIndex, 1);
      if (message.reactions[emoji].length === 0) {
        delete message.reactions[emoji];
      }
    }

    res.status(200).json({
      success: true,
      message: "Reaction removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing reaction",
      error: error.message,
    });
  }
};

// Mock notifications
const mockNotifications = [
  {
    _id: "notif1",
    type: "like",
    title: "New Like",
    message: "Sarah Johnson liked your post",
    relatedId: "post1",
    relatedType: "post",
    sender: {
      _id: "user1",
      name: "Sarah Johnson",
      avatar: "/testimonial-avatar.jpg",
    },
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
  },
];

// @desc    Get notifications
// @route   GET /api/v1/community/notifications
// @access  Private
const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const paginatedNotifications = mockNotifications.slice(
      startIndex,
      startIndex + parseInt(limit)
    );

    res.status(200).json({
      success: true,
      data: {
        notifications: paginatedNotifications,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(mockNotifications.length / limit),
          count: paginatedNotifications.length,
          totalNotifications: mockNotifications.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/v1/community/notifications/:id/read
// @access  Private
const markNotificationAsRead = async (req, res) => {
  try {
    const notification = mockNotifications.find((n) => n._id === req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking notification as read",
      error: error.message,
    });
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/v1/community/notifications/read-all
// @access  Private
const markAllNotificationsAsRead = async (req, res) => {
  try {
    mockNotifications.forEach((notification) => {
      notification.isRead = true;
    });

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking all notifications as read",
      error: error.message,
    });
  }
};

// @desc    Get online users
// @route   GET /api/v1/community/users/online
// @access  Public
const getOnlineUsers = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    // Check if database is available
    if (!User.db || !User.db.readyState) {
      // Fallback mock data when database is not available
      const mockOnlineUsers = [
        {
          _id: "user1",
          name: "Sarah Johnson",
          email: "sarah@admin.com",
          avatar: "/testimonial-avatar.jpg",
          role: "instructor",
          lastActive: new Date(),
          status: "online",
          bio: "Full-stack instructor with 5+ years experience",
          joinedAt: new Date("2023-08-15"),
          postCount: 12,
          reputation: 245,
          badges: ["Top Contributor", "React Expert"],
          isOnline: true,
        },
        {
          _id: "user2",
          name: "Mike Chen",
          email: "mike@student.com",
          avatar: "/testimonial-avatar.jpg",
          role: "student",
          lastActive: new Date(),
          status: "online",
          bio: "Frontend enthusiast, React and Vue specialist",
          joinedAt: new Date("2023-09-22"),
          postCount: 8,
          reputation: 189,
          badges: ["Rising Star"],
          isOnline: true,
        },
        {
          _id: "user3",
          name: "Emma Wilson",
          email: "emma@instructor.com",
          avatar: "/testimonial-avatar.jpg",
          role: "instructor",
          lastActive: new Date(),
          status: "online",
          bio: "Backend developer, Node.js and Python expert",
          joinedAt: new Date("2023-07-10"),
          postCount: 15,
          reputation: 312,
          badges: ["Top Contributor", "Backend Guru"],
          isOnline: true,
        },
        {
          _id: "user4",
          name: "Alex Rodriguez",
          email: "alex@admin.com",
          avatar: "/testimonial-avatar.jpg",
          role: "admin",
          lastActive: new Date(),
          status: "online",
          bio: "Platform administrator and senior software engineer",
          joinedAt: new Date("2023-06-05"),
          postCount: 20,
          reputation: 456,
          badges: ["Admin", "Top Contributor", "Mentor"],
          isOnline: true,
        }
      ];
      
      return res.status(200).json({
        success: true,
        data: mockOnlineUsers.slice(0, parseInt(limit)),
      });
    }

    // Get real online users from database
    // Consider users online if they were active in the last 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    
    const onlineUsers = await User.find({
      lastActive: { $gte: fifteenMinutesAgo }
    })
    .select('name email avatar role bio createdAt communityStats.postsCount communityStats.reputation lastActive')
    .limit(parseInt(limit))
    .sort({ lastActive: -1 }) // Most recently active first
    .lean();

    // Transform user data to match frontend expectations
    const transformedUsers = onlineUsers.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url || user.avatar || '/testimonial-avatar.jpg',
      role: user.role,
      lastActive: user.lastActive,
      status: "online",
      bio: user.bio || `${user.role === 'admin' ? 'Platform Administrator' : user.role === 'instructor' ? 'Course Instructor' : 'Community Member'}`,
      joinedAt: user.createdAt,
      postCount: user.communityStats?.postsCount || 0,
      reputation: user.communityStats?.reputation || 0,
      badges: getBadgesForUser(user),
      isOnline: true,
      avatarUrl: user.avatar?.url || user.avatar || '/testimonial-avatar.jpg'
    }));

    res.status(200).json({
      success: true,
      data: transformedUsers,
    });
  } catch (error) {
    console.error('Get online users error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching online users",
      error: error.message,
    });
  }
};

// Helper function to generate badges based on user data
const getBadgesForUser = (user) => {
  const badges = [];
  
  if (user.role === 'admin') {
    badges.push('Admin');
  }
  
  if (user.role === 'instructor') {
    badges.push('Instructor');
  }
  
  const reputation = user.communityStats?.reputation || 0;
  if (reputation >= 500) {
    badges.push('Top Contributor');
  } else if (reputation >= 200) {
    badges.push('Active Member');
  } else if (reputation >= 50) {
    badges.push('Rising Star');
  }
  
  const postCount = user.communityStats?.postsCount || 0;
  if (postCount >= 20) {
    badges.push('Prolific Writer');
  } else if (postCount >= 10) {
    badges.push('Regular Contributor');
  }
  
  // Check if user joined recently (within last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  if (user.createdAt > thirtyDaysAgo) {
    badges.push('New Member');
  }
  
  return badges.length > 0 ? badges : ['Member'];
};

// @desc    Update user status
// @route   PATCH /api/v1/community/users/status
// @access  Private
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user?._id || req.headers['x-user-id'];
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check if database is available
    if (!User.db || !User.db.readyState) {
      return res.status(200).json({
        success: true,
        message: `Status updated to ${status}`,
        data: { status }
      });
    }

    // Update user's last active time and status
    await User.findByIdAndUpdate(userId, {
      lastActive: new Date(),
      status: status || 'online'
    });

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      data: { status }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: error.message,
    });
  }
};

// Helper function to update user activity
const updateUserActivity = async (userId) => {
  try {
    if (!userId || !User.db || !User.db.readyState) {
      return;
    }
    
    await User.findByIdAndUpdate(userId, {
      lastActive: new Date()
    });
  } catch (error) {
    console.error('Error updating user activity:', error);
  }
};

// Add reply to comment
const addReply = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    // Get user from authentication middleware
    let userId;
    if (req.user) {
      userId = req.user._id;
    } else {
      // Fallback for development/testing
      userId = req.headers["x-user-id"] || "507f1f77bcf86cd799439001";

      // Verify user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Find the parent comment
    const parentComment = post.comments.id(commentId);
    if (!parentComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Add reply to the post's comments with parentComment reference
    const newReply = {
      user: userId,
      content,
      parentComment: commentId,
      createdAt: new Date(),
    };

    post.comments.push(newReply);
    post.commentCount = post.comments.length;

    await post.save();

    // Populate the new reply with user details for response
    await post.populate("comments.user", "name email avatar role");
    const addedReply = post.comments[post.comments.length - 1];

    res.status(201).json({
      success: true,
      data: addedReply,
      message: "Reply added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding reply",
      error: error.message,
    });
  }
};

// Export all controller functions
module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  getMembers,
  getPopularTags,
  toggleLike,
  addComment,
  addReply,
  sharePost,
  toggleCommentLike,
  deleteComment,
  savePost,
  unsavePost,
  reportPost,
  muteThread,
  followUser,
  unfollowUser,
  getCommunityStats,
  searchPosts,
  getTrendingPosts,
  getSavedPosts,
  getUserPosts,
  // Events
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  unattendEvent,
  // Enhanced Features
  getCategoryStats,
  getCommunityChat,
  sendCommunityMessage,
  reactToChatMessage,
  removeChatReaction,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getOnlineUsers,
  updateUserStatus,
};
