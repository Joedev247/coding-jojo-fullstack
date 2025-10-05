const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

// Connect to database using environment variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo';

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Find all admin users
    const admins = await User.find({ role: 'admin' }).select('name email role createdAt');
    console.log('\n👥 Admin users found:', admins.length);
    
    if (admins.length > 0) {
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.name} (${admin.email}) - Created: ${admin.createdAt}`);
      });
    }
    
    // Find all users to see what's available
    const allUsers = await User.find({}).select('name email role').limit(10);
    console.log('\n👥 All users (first 10):');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Database error:', err.message);
    process.exit(1);
  });
