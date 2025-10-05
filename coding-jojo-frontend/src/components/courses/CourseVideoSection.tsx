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
      <div className="bg-gray-800  p-8 text-center">
        <div className="text-gray-400 text-4xl mb-4">📹</div>
        <h3 className="text-white text-xl mb-2">No course content available</h3>
        <p className="text-gray-400">This course doesn't have any video content yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <div className="bg-gray-900  overflow-hidden">
          {selectedVideo?.videoUrl ? (
            <VideoPlayer
              videoUrl={selectedVideo.videoUrl}
              title={selectedVideo.title}
              poster={selectedVideo.poster}
              className="w-full aspect-video"
            />
          ) : (
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Play className="w-12 h-12 mx-auto mb-4" />
                <p>Select a lesson to start watching</p>
              </div>
            </div>
          )}
          
          {selectedVideo && (
            <div className="p-4 bg-gray-800">
              <h2 className="text-xl font-semibold text-white mb-2">
                {selectedVideo.title}
              </h2>
              <p className="text-gray-300 text-sm">
                Course: {course.title}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Course Content Sidebar */}
      <div className="bg-gray-900  overflow-hidden">
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Course Content</h3>
          <p className="text-sm text-gray-400">
            {course.courseContent.length} sections
          </p>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {course.courseContent.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-700 last:border-b-0">
              <div className="p-4 bg-gray-850">
                <h4 className="font-medium text-white mb-1">
                  {section.sectionTitle}
                </h4>
                {section.lessons && (
                  <p className="text-xs text-gray-400">
                    {section.lessons.length} lessons
                  </p>
                )}
              </div>
              
              {section.lessons && (
                <div className="bg-gray-900">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lessonIndex}
                      onClick={() => handleVideoSelect(sectionIndex, lessonIndex)}
                      className={`w-full p-3 text-left hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0 ${
                        selectedVideo?.title === lesson.title 
                          ? 'bg-pink-600/20 border-pink-500/50' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.videoUrl ? (
                          <Play className="w-4 h-4 text-pink-400 flex-shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium truncate ${
                            lesson.videoUrl ? 'text-white' : 'text-gray-500'
                          }`}>
                            {lesson.title}
                          </p>
                          {lesson.videoData?.duration && (
                            <p className="text-xs text-gray-400">
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