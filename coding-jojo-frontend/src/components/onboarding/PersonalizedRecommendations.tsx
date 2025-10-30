import React from 'react';
import { Star, Clock, Users, PlayCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  price: number;
  originalPrice?: number;
  category: string;
}

interface PersonalizedRecommendationsProps {
  courses: Course[];
  userInterests: string[];
  userLevel: string;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  courses,
  userInterests,
  userLevel,
}) => {
  // Mock courses based on interests
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      rating: 4.8,
      students: 125000,
      duration: '65 hours',
      level: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop',
      price: 49,
      originalPrice: 199,
      category: 'Web Development',
    },
    {
      id: '2',
      title: 'Data Science and Machine Learning',
      instructor: 'Jose Portilla',
      rating: 4.9,
      students: 98000,
      duration: '42 hours',
      level: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      price: 79,
      originalPrice: 299,
      category: 'Data Science',
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Daniel Schifano',
      rating: 4.7,
      students: 45000,
      duration: '28 hours',
      level: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      price: 39,
      originalPrice: 149,
      category: 'Graphic Design',
    },
  ];

  return (
    <div className="mt-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Recommended Courses for You 🎯
        </h3>
        <p className="text-gray-600 text-sm">
          Based on your interests: {userInterests.slice(0, 3).join(', ')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white  shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  course.level === 'beginner' 
                    ? 'bg-green-100 text-green-700'
                    : course.level === 'intermediate'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {course.level}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                  <PlayCircle className="w-5 h-5 text-indigo-600" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs text-indigo-600 font-medium">
                  {course.category}
                </span>
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {course.title}
              </h4>
              
              <p className="text-sm text-gray-600 mb-3">
                by {course.instructor}
              </p>

              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-800">
                    ${course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm  hover:bg-indigo-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700  hover:bg-gray-50 transition-colors">
          View More Courses
        </button>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;