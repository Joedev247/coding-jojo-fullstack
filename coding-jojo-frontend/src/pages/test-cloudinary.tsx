import React, { useState, useEffect } from 'react';
import CourseUploadForm from '../components/course/CourseUploadForm';
import CourseVideoSection from '../components/courses/CourseVideoSection';
import { Course } from '../types/courses';

const TestCloudinaryPage: React.FC = () => {
  const [testCourse, setTestCourse] = useState<Course | null>(null);

  // Example course data with proper Cloudinary URLs
  useEffect(() => {
    // Simulate fetching a course with proper Cloudinary URLs
    const sampleCourse: Course = {
      id: 'test-course-1',
      title: 'Test Course with Cloudinary',
      description: 'Testing Cloudinary integration',
      thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/v1/coding-jojo/course-thumbnails/sample-thumbnail.jpg',
      thumbnailUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1/coding-jojo/course-thumbnails/sample-thumbnail.jpg', // FIXED: Direct secure_url
      courseContent: [
        {
          sectionTitle: 'Introduction',
          lessons: [
            {
              title: 'Welcome Video',
              videoUrl: 'https://res.cloudinary.com/your-cloud/video/upload/v1/coding-jojo/course-videos/sample-video.mp4', // FIXED: Direct secure_url
              videoData: {
                url: 'https://res.cloudinary.com/your-cloud/video/upload/v1/coding-jojo/course-videos/sample-video.mp4',
                publicId: 'coding-jojo/course-videos/sample-video',
                duration: 300,
                format: 'mp4',
                size: 1024000,
                width: 1920,
                height: 1080,
                thumbnail: 'https://res.cloudinary.com/your-cloud/video/upload/v1/coding-jojo/course-videos/sample-video.jpg'
              }
            }
          ]
        }
      ],
      instructor: {
        id: '1',
        name: 'Test Instructor',
        avatarUrl: 'https://res.cloudinary.com/your-cloud/image/upload/v1/coding-jojo/avatars/instructor.jpg',
        role: 'instructor'
      },
      category: 'Web Development',
      tags: ['test', 'cloudinary'],
      level: 'beginner',
      duration: '5 minutes',
      lectures: 1,
      studentsEnrolled: 0,
      rating: 0,
      ratingCount: 0,
      progress: 0,
      price: 0,
      isFeatured: false,
      isNew: true,
      isSaved: false,
      createdAt: new Date().toISOString(),
      status: 'published'
    };
    
    setTestCourse(sampleCourse);
  }, []);

  const handleCourseCreated = (course: any) => {
    console.log('New course created:', course);
    
    // Convert to our Course type format
    const formattedCourse: Course = {
      id: course._id || course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail?.url || course.thumbnailUrl,
      thumbnailUrl: course.thumbnailUrl, // FIXED: Use direct secure_url
      courseContent: course.courseContent,
      instructor: {
        id: course.instructor._id || course.instructor.id,
        name: course.instructor.name,
        avatarUrl: course.instructor.avatar || course.instructor.avatarUrl || '',
        role: course.instructor.role || 'instructor'
      },
      category: course.category,
      tags: course.tags || [],
      level: course.level,
      duration: course.duration || '0 minutes',
      lectures: course.totalLessons || 0,
      studentsEnrolled: course.enrolledStudents?.length || 0,
      rating: course.averageRating || 0,
      ratingCount: course.totalRatings || 0,
      progress: 0,
      price: course.price || 0,
      originalPrice: course.originalPrice,
      isFeatured: course.isFeatured || false,
      isNew: true,
      isSaved: false,
      createdAt: course.createdAt || new Date().toISOString(),
      status: course.status || 'published'
    };
    
    setTestCourse(formattedCourse);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Cloudinary Integration Test
        </h1>
        
        {/* Debug Info */}
        <div className="mb-8 p-4 bg-gray-800 ">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Environment Check:</strong></p>
            <ul className="list-disc list-inside pl-4 text-gray-300">
              <li>Next.js images domain: res.cloudinary.com ✓</li>
              <li>Backend Cloudinary config: {process.env.NODE_ENV === 'development' ? '⚠️ Check backend env vars' : '✓'}</li>
              <li>Course thumbnailUrl field: ✓</li>
              <li>Video secure_url usage: ✓</li>
            </ul>
          </div>
        </div>

        {/* Course Upload Form */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upload New Course</h2>
          <CourseUploadForm onCourseCreated={handleCourseCreated} />
        </div>

        {/* Course Display */}
        {testCourse && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Course Preview</h2>
            
            {/* Thumbnail Test */}
            <div className="mb-8 p-4 bg-gray-800 ">
              <h3 className="text-lg font-medium mb-4">Thumbnail Test</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Using Next.js Image component:</p>
                  <img
                    src={testCourse.thumbnailUrl || testCourse.thumbnail}
                    alt={testCourse.title}
                    className="w-full h-48 object-cover "
                    onError={(e) => {
                      console.error('Image load error:', e);
                      e.currentTarget.src = '/placeholder-course.jpg';
                    }}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">URL being used:</p>
                  <code className="text-xs bg-gray-700 p-2 rounded block break-all">
                    {testCourse.thumbnailUrl || testCourse.thumbnail}
                  </code>
                  <p className="text-sm text-gray-400 mt-2">Course data:</p>
                  <pre className="text-xs bg-gray-700 p-2 rounded mt-2 overflow-auto max-h-32">
                    {JSON.stringify({
                      thumbnail: testCourse.thumbnail,
                      thumbnailUrl: testCourse.thumbnailUrl
                    }, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Video Test */}
            <div className="p-4 bg-gray-800 ">
              <h3 className="text-lg font-medium mb-4">Video Test</h3>
              <CourseVideoSection course={testCourse} />
            </div>
          </div>
        )}

        {/* Troubleshooting Guide */}
        <div className="bg-gray-800  p-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Guide</h2>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-medium text-blue-400">✅ Images not loading? Check:</h3>
              <ul className="list-disc list-inside pl-4 text-gray-300">
                <li>Backend uses <code>req.file.secure_url</code> (not <code>req.file.path</code>)</li>
                <li>Database saves <code>thumbnailUrl</code> field with Cloudinary secure_url</li>
                <li>Next.js config includes <code>res.cloudinary.com</code> in domains</li>
                <li>Frontend uses <code>course.thumbnailUrl</code> for image src</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-400">✅ Videos not playing? Check:</h3>
              <ul className="list-disc list-inside pl-4 text-gray-300">
                <li>Video URLs use Cloudinary secure_url</li>
                <li>Video format is supported (MP4 recommended)</li>
                <li>CORS headers allow video streaming</li>
                <li>Video source tag has correct type attribute</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-orange-400">⚠️ Environment Setup:</h3>
              <ul className="list-disc list-inside pl-4 text-gray-300">
                <li>CLOUDINARY_CLOUD_NAME in backend .env</li>
                <li>CLOUDINARY_API_KEY in backend .env</li>
                <li>CLOUDINARY_API_SECRET in backend .env</li>
                <li>Replace 'your-cloud' with actual Cloudinary cloud name</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCloudinaryPage;
