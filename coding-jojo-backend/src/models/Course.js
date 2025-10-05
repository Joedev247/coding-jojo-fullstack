const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  longDescription: {
    type: String,
    maxlength: [2000, 'Long description cannot be more than 2000 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Web Development',
      'Mobile Development', 
      'Data Science',
      'Machine Learning',
      'DevOps',
      'Cybersecurity',
      'Game Development',
      'Programming Languages',
      'Databases',
      'Cloud Computing'
    ]
  },
  tags: [{
    type: String
  }],
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  // Fixed: Use secure_url directly for thumbnails
  thumbnailUrl: {
    type: String,
    required: [true, 'Course thumbnail is required'],
    default: 'https://res.cloudinary.com/your-cloud/image/upload/v1/coding-jojo/defaults/no-thumbnail.jpg'
  },
  thumbnail: {
    url: {
      type: String,
      default: 'https://res.cloudinary.com/your-cloud/image/upload/v1/coding-jojo/defaults/no-thumbnail.jpg'
    },
    publicId: String, // Cloudinary public ID for deletion
    width: Number,
    height: Number
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    width: Number,
    height: Number,
    description: String
  }],
  price: {
    type: Number,
    default: 0
  },
  originalPrice: {
    type: Number
  },
  currency: {
    type: String,
    default: 'USD'
  },
  duration: {
    hours: {
      type: Number,
      default: 0
    },
    minutes: {
      type: Number,
      default: 0
    }
  },
  totalLessons: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'English'
  },
  subtitles: [{
    type: String
  }],
  prerequisites: [{
    type: String
  }],
  learningObjectives: [{
    type: String
  }],
  targetAudience: [{
    type: String
  }],
  courseContent: [{
    sectionTitle: {
      type: String,
      required: true
    },
    sectionDescription: String,
    lessons: [{
      title: {
        type: String,
        required: true
      },
      description: String,
      // Fixed: Add direct video URL field for secure_url
      videoUrl: {
        type: String // Direct Cloudinary secure_url for videos
      },
      // Keep detailed video metadata
      videoData: {
        url: String, // Cloudinary video URL (secure_url)
        publicId: String, // Cloudinary public ID for deletion
        duration: Number, // Video duration in seconds
        format: String, // Video format (mp4, webm, etc.)
        thumbnail: String, // Auto-generated video thumbnail URL
        size: Number, // File size in bytes
        width: Number,
        height: Number
      },
      duration: {
        type: Number, // in minutes
        default: 0
      },
      resources: [{
        title: String,
        url: String, // Cloudinary URL for files
        publicId: String, // Cloudinary public ID for deletion
        type: {
          type: String,
          enum: ['pdf', 'code', 'link', 'exercise', 'document', 'archive']
        },
        size: Number, // File size in bytes
        format: String // File format
      }],
      quiz: {
        questions: [{
          question: String,
          options: [String],
          correctAnswer: Number,
          explanation: String
        }]
      },
      order: {
        type: Number,
        default: 0
      }
    }],
    order: {
      type: Number,
      default: 0
    }
  }],
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedLessons: [{
      lessonId: String,
      completedAt: Date
    }]
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must not be more than 5']
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  totalEnrollments: {
    type: Number,
    default: 0
  },
  // New fields for social features
  likes: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalLikes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    replies: [{
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true,
        maxlength: [500, 'Reply cannot be more than 500 characters']
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    likes: [{
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      likedAt: {
        type: Date,
        default: Date.now
      }
    }],
    totalLikes: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalComments: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },  isPremium: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  certificate: {
    isAvailable: {
      type: Boolean,
      default: false
    },
    template: String,
    criteria: {
      minScore: {
        type: Number,
        default: 80
      },
      completionRequired: {
        type: Boolean,
        default: true
      }
    }
  },
  publishedAt: Date,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create course slug from the title
courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
  next();
});

// Calculate total duration
courseSchema.virtual('totalDuration').get(function() {
  let totalMinutes = 0;
  this.courseContent.forEach(section => {
    section.lessons.forEach(lesson => {
      totalMinutes += lesson.duration || 0;
    });
  });
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
    total: totalMinutes
  };
});

module.exports = mongoose.model('Course', courseSchema);
