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
      <div className="bg-gradient-to-r from-blue-50 to-white backdrop-blur-sm border border-gray-200  shadow-sm p-4 mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
            <Video className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1">
              Live Sessions
            </h1>
            <p className="text-gray-600 text-sm">Schedule and manage your live teaching sessions</p>
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
