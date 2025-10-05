// MongoDB initialization script for Docker
// This script sets up the initial database structure and indexes

db = db.getSiblingDB('coding-jojo');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password', 'name'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        },
        password: {
          bsonType: 'string',
          minLength: 6
        },
        name: {
          bsonType: 'string',
          minLength: 2
        },
        role: {
          bsonType: 'string',
          enum: ['student', 'instructor', 'admin']
        }
      }
    }
  }
});

// Create indexes for users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ createdAt: -1 });

// Create courses collection
db.createCollection('courses');
db.courses.createIndex({ title: 'text', description: 'text' });
db.courses.createIndex({ category: 1 });
db.courses.createIndex({ instructor: 1 });
db.courses.createIndex({ isPublished: 1 });
db.courses.createIndex({ rating: -1 });
db.courses.createIndex({ enrollmentCount: -1 });
db.courses.createIndex({ createdAt: -1 });

// Create transactions collection
db.createCollection('transactions');
db.transactions.createIndex({ user: 1 });
db.transactions.createIndex({ course: 1 });
db.transactions.createIndex({ status: 1 });
db.transactions.createIndex({ reference: 1 }, { unique: true });
db.transactions.createIndex({ createdAt: -1 });

// Create notifications collection
db.createCollection('notifications');
db.notifications.createIndex({ recipient: 1, read: 1 });
db.notifications.createIndex({ createdAt: -1 });
db.notifications.createIndex({ type: 1 });

// Create chat collection
db.createCollection('chats');
db.chats.createIndex({ courseId: 1 });
db.chats.createIndex({ participants: 1 });
db.chats.createIndex({ 'messages.timestamp': -1 });

// Create enrollments collection
db.createCollection('enrollments');
db.enrollments.createIndex({ user: 1, course: 1 }, { unique: true });
db.enrollments.createIndex({ user: 1 });
db.enrollments.createIndex({ course: 1 });
db.enrollments.createIndex({ enrolledAt: -1 });

// Create reviews collection
db.createCollection('reviews');
db.reviews.createIndex({ course: 1 });
db.reviews.createIndex({ user: 1 });
db.reviews.createIndex({ user: 1, course: 1 }, { unique: true });
db.reviews.createIndex({ rating: -1 });

// Create categories collection
db.createCollection('categories');
db.categories.createIndex({ name: 1 }, { unique: true });
db.categories.createIndex({ slug: 1 }, { unique: true });

// Insert default categories
db.categories.insertMany([
  {
    name: 'Web Development',
    slug: 'web-development',
    description: 'Learn to build websites and web applications',
    icon: 'code',
    createdAt: new Date()
  },
  {
    name: 'Mobile Development',
    slug: 'mobile-development',
    description: 'Build mobile apps for iOS and Android',
    icon: 'mobile',
    createdAt: new Date()
  },
  {
    name: 'Data Science',
    slug: 'data-science',
    description: 'Analyze data and build machine learning models',
    icon: 'chart-bar',
    createdAt: new Date()
  },
  {
    name: 'DevOps',
    slug: 'devops',
    description: 'Learn deployment, CI/CD, and infrastructure',
    icon: 'server',
    createdAt: new Date()
  },
  {
    name: 'Programming Languages',
    slug: 'programming-languages',
    description: 'Master various programming languages',
    icon: 'code',
    createdAt: new Date()
  },
  {
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Learn to secure systems and applications',
    icon: 'shield-alt',
    createdAt: new Date()
  }
]);

// Create admin user (password will be hashed by the application)
const adminUser = {
  name: 'Admin User',
  email: 'admin@codingjojo.com',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBhTySTdgUgP3y', // 'admin123' hashed
  role: 'admin',
  isEmailVerified: true,
  profile: {
    bio: 'System Administrator',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

// Insert admin user if it doesn't exist
db.users.updateOne(
  { email: adminUser.email },
  { $setOnInsert: adminUser },
  { upsert: true }
);

print('✅ MongoDB initialization completed successfully');
print('   - Created collections with validation');
print('   - Created indexes for performance');
print('   - Inserted default categories');
print('   - Created admin user (admin@codingjojo.com / admin123)');
print('🎉 Database is ready for use!');
