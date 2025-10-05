import React from 'react';
import { Clock, User, Play } from 'lucide-react';
import Button from '../ui/button';
import Badge from '../ui/Badge';

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  lastChapter: string;
  category: string;
  thumbnail: string;
  lastAccessed: string;
  timeSpent?: number;
  instructor?: {
    id: string;
    name: string;
    avatar: string;
  };
  status: 'not-started' | 'in-progress' | 'completed';
}

interface EnrolledCoursesProps {
  courses: CourseProgress[];
}

const EnrolledCourses: React.FC<EnrolledCoursesProps> = ({ courses }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">My Courses</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">All</Button>
          <Button variant="ghost" size="sm">In Progress</Button>
          <Button variant="ghost" size="sm">Completed</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-800 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-40 md:h-auto relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.status === 'completed' && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="success">Completed</Badge>
                  </div>
                )}
              </div>
              
              <div className="md:w-3/4 md:pl-6 mt-4 md:mt-0 flex flex-col p-6 md:p-0">                <h3 className="text-lg font-medium text-white">{course.title}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{course.lastChapter}</p>
                
                <div className="flex items-center mt-3 space-x-4">
                  <div className="flex items-center text-xs text-gray-400">
                    <User className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{course.instructor?.name || 'Instructor'}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{course.timeSpent ? `${course.timeSpent}h` : 'N/A'}</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-purple-400 font-medium">{course.progress}%</span>
                    <span className="text-gray-400"> completed</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {course.status === 'not-started' ? (
                      <Button variant="primary" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Start Course
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        {course.status === 'completed' ? 'Review Course' : 'Continue'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;