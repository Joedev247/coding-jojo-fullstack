// Test script to verify the featured course API endpoint
const fetch = require('node-fetch');

async function testFeaturedCourseAPI() {
  try {
    console.log('🔄 Testing Featured Course API...');
    
    const response = await fetch('http://localhost:5000/api/courses/featured?limit=1');
    const data = await response.json();
    
    console.log('✅ API Response Status:', response.status);
    console.log('✅ API Response Success:', data.success);
    
    if (data.success && data.data && data.data.length > 0) {
      const course = data.data[0];
      console.log('\n📚 Featured Course Details:');
      console.log('  Title:', course.title);
      console.log('  ID:', course.id);
      console.log('  Description:', course.description.substring(0, 100) + '...');
      console.log('  Level:', course.level);
      console.log('  Category:', course.category);
      console.log('  Price:', course.price);
      console.log('  Original Price:', course.originalPrice);
      console.log('  Duration:', course.duration);
      console.log('  Total Lessons:', course.totalLessons);
      console.log('  Average Rating:', course.averageRating);
      console.log('  Total Ratings:', course.totalRatings);
      console.log('  Total Enrollments:', course.totalEnrollments);
      console.log('  Is Featured:', course.isFeatured);
      console.log('  Instructor:', course.instructor?.name);
      console.log('  Instructor Bio:', course.instructor?.bio);
      console.log('  Thumbnail:', course.thumbnail?.url || course.thumbnail);
      console.log('  Created At:', course.createdAt);
      
      // Check which properties match the frontend interface
      console.log('\n🔍 Frontend Interface Compatibility:');
      console.log('  _id:', course.id ? '✅' : '❌');
      console.log('  title:', course.title ? '✅' : '❌');
      console.log('  description:', course.description ? '✅' : '❌');
      console.log('  level:', course.level ? '✅' : '❌');
      console.log('  category:', course.category ? '✅' : '❌');
      console.log('  price:', course.price !== undefined ? '✅' : '❌');
      console.log('  originalPrice:', course.originalPrice !== undefined ? '✅' : '❌');
      console.log('  duration:', course.duration ? '✅' : '❌');
      console.log('  totalLessons:', course.totalLessons !== undefined ? '✅' : '❌');
      console.log('  rating (averageRating):', course.averageRating !== undefined ? '✅' : '❌');
      console.log('  ratingCount (totalRatings):', course.totalRatings !== undefined ? '✅' : '❌');
      console.log('  studentsEnrolled (totalEnrollments):', course.totalEnrollments !== undefined ? '✅' : '❌');
      console.log('  instructor.name:', course.instructor?.name ? '✅' : '❌');
      console.log('  instructor.bio:', course.instructor?.bio ? '✅' : '❌');
      console.log('  thumbnail:', course.thumbnail ? '✅' : '❌');
      console.log('  isFeatured:', course.isFeatured !== undefined ? '✅' : '❌');
      console.log('  createdAt:', course.createdAt ? '✅' : '❌');
      
    } else {
      console.log('❌ No featured courses found or invalid response structure');
      console.log('Raw response:', JSON.stringify(data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error testing featured course API:', error.message);
  }
}

testFeaturedCourseAPI();
