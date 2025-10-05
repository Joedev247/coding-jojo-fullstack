const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if admin exists
    let admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('Creating admin user...');
      admin = new User({
        name: 'Admin User',
        email: 'admin@coding-jojo.com',
        password: 'admin123',
        role: 'admin',
        isEmailVerified: true,
        isPremium: true
      });
      await admin.save();
      console.log('✅ Admin user created!');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    console.log('\n🔑 Admin Login Credentials:');
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('ID:', admin._id);
    
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
