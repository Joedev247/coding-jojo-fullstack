'use client';

import React, { useEffect, useState } from 'react';
import LiveSessionManager from '../../../components/live/LiveSessionManager';
import { Video } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export default function LiveSessionsPage() {
  const [instructorInfo, setInstructorInfo] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    // Get instructor info from storage
    const teacherInfo = localStorage.getItem('teacher_info') || sessionStorage.getItem('teacher_info');
    if (teacherInfo) {
      try {
        const parsedInfo = JSON.parse(teacherInfo);
        setInstructorInfo(parsedInfo);
      } catch (error) {
        console.error('Error parsing teacher info:', error);
        toast.error('Failed to load instructor information');
      }
    }
  }, [toast]);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-gray-700/50  p-8 mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-6">
            <Video className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Live Sessions
            </h1>
            <p className="text-gray-300 text-lg">Schedule and manage your live teaching sessions</p>
          </div>
        </div>
      </div>

      {instructorInfo && (
        <LiveSessionManager 
          courseId={instructorInfo.defaultCourseId || ''}
          instructorId={instructorInfo.id || instructorInfo._id}
        />
      )}
    </>
  );
}
