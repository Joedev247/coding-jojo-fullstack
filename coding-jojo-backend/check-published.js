const mongoose = require('mongoose');
const Course = require('./src/models/Course');

mongoose.connect('mongodb+srv://joedev:Joedev247@cluster0.0lpv41z.mongodb.net/codingjojo?retryWrites=true&w=majority&appName=Cluster0')
.then(async () => {
  console.log('Connected to MongoDB');
  const courses = await Course.find({}, 'title isPublished status');
  console.log(`Found ${courses.length} courses:`);
  console.log('');
  courses.forEach((course, index) => {
    console.log(`${index + 1}. ${course.title}`);
    console.log('   isPublished:', course.isPublished);
    console.log('   status:', course.status);
    console.log('');
  });
  
  // Also check how many are published
  const publishedCount = await Course.countDocuments({ isPublished: true });
  console.log(`Published courses: ${publishedCount}`);
  
  mongoose.disconnect();
}).catch(console.error);