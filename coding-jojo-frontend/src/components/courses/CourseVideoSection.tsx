import React, { useState, useEffect } from 'react';
import { Play, Lock, CheckCircle } from 'lucide-react';
import VideoPlayer from '../ui/VideoPlayer';
import { Course } from '../../types/courses';

interface CourseVideoSectionProps {
  course: Course;
  currentVideoIndex?: number;
  onVideoSelect?: (sectionIndex: number, lessonIndex: number) => void;
}

const CourseVideoSection: React.FC<CourseVideoSectionProps> = ({
  course,
  currentVideoIndex = 0,
  onVideoSelect
}) => {
  const [selectedVideo, setSelectedVideo] = useState<{
    videoUrl?: string;
    title: string;
    poster?: string;
  } | null>(null);

  // Debug: Log course content to check video URLs
  useEffect(() => {
    console.log('Course content in VideoSection:', {
      courseId: course.id,
      courseTitle: course.title,
      courseContent: course.courseContent,
      totalSections: course.courseContent?.length || 0,
      firstVideo: course.courseContent?.[0]?.lessons?.[0]
    });

    // Set the first available video as default
    if (course.courseContent && course.courseContent.length > 0) {
      const firstSection = course.courseContent[0];
      if (firstSection.lessons && firstSection.lessons.length > 0) {
        const firstLesson = firstSection.lessons[0];
        if (firstLesson.videoUrl) {
          setSelectedVideo({
            videoUrl: firstLesson.videoUrl,
            title: firstLesson.title,
            poster: firstLesson.videoData?.thumbnail
          });
        }
      }
    }
  }, [course]);

  const handleVideoSelect = (sectionIndex: number, lessonIndex: number) => {
    const section = course.courseContent?.[sectionIndex];
    const lesson = section?.lessons?.[lessonIndex];
    
    if (lesson && lesson.videoUrl) {
      setSelectedVideo({
        videoUrl: lesson.videoUrl,
        title: lesson.title,
        poster: lesson.videoData?.thumbnail
      });
      
      if (onVideoSelect) {
        onVideoSelect(sectionIndex, lessonIndex);
      }
    }
  };

  if (!course.courseContent || course.courseContent.length === 0) {
    return (
      <div className="bg-white border border-gray-200  p-6 text-center">
        <div className="text-gray-400 text-3xl mb-3">📹</div>
        <h3 className="text-gray-800 text-lg mb-2">No course content available</h3>
        <p className="text-gray-600 text-sm">This course doesn't have any video content yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-gray-200  overflow-hidden">
          {selectedVideo?.videoUrl ? (
            <VideoPlayer
              videoUrl={selectedVideo.videoUrl}
              title={selectedVideo.title}
              poster={selectedVideo.poster}
              className="w-full aspect-video"
            />
          ) : (
            <div className="aspect-video bg-gray-50 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Play className="w-10 h-10 mx-auto mb-3" />
                <p className="text-sm">Select a lesson to start watching</p>
              </div>
            </div>
          )}
          
          {selectedVideo && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {selectedVideo.title}
              </h2>
              <p className="text-gray-600 text-sm">
                Course: {course.title}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Course Content Sidebar */}
      <div className="bg-white border border-gray-200  overflow-hidden">
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-800">Course Content</h3>
          <p className="text-sm text-gray-600">
            {course.courseContent.length} sections
          </p>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {course.courseContent.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-200 last:border-b-0">
              <div className="p-3 bg-gray-50">
                <h4 className="font-medium text-gray-800 mb-0.5 text-sm">
                  {section.sectionTitle}
                </h4>
                {section.lessons && (
                  <p className="text-xs text-gray-600">
                    {section.lessons.length} lessons
                  </p>
                )}
              </div>
              
              {section.lessons && (
                <div className="bg-white">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lessonIndex}
                      onClick={() => handleVideoSelect(sectionIndex, lessonIndex)}
                      className={`w-full p-2.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                        selectedVideo?.title === lesson.title 
                          ? 'bg-blue-50 border-blue-200' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {lesson.videoUrl ? (
                          <Play className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-medium truncate ${
                            lesson.videoUrl ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {lesson.title}
                          </p>
                          {lesson.videoData?.duration && (
                            <p className="text-xs text-gray-500">
                              {Math.floor(lesson.videoData.duration / 60)}:
                              {(lesson.videoData.duration % 60).toString().padStart(2, '0')}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseVideoSection;