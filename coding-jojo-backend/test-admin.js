const mongoose = require('mongoose');
const User = require('./src/models/User');

// Connect to database
mongoose.connect('mongodb://localhost:27017/coding-jojo')
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Check if admin exists
    let admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('❌ No admin user found. Creating one...');
      admin = new User({
        name: 'Admin User',
        email: 'admin@codingjojo.com',
        password: 'admin123',
        role: 'admin',
        isEmailVerified: true,
        isPremium: true
      });
      await admin.save();
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user found:', admin.email);
    }
    
    console.log('\n🔑 Admin Login Credentials:');
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('Email:', admin.email);
    console.log('ID:', admin._id);
    
    // Test password matching
    const isMatch = await admin.matchPassword('admin123');
    console.log('Password test:', isMatch ? '✅ PASS' : '❌ FAIL');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Database error:', err.message);
    process.exit(1);
  });
