'use client';

import React, { useState, useEffect } from 'react';
import CertificateGenerator from '../../../components/certificate/CertificateGenerator';
import { Award } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export default function InstructorCertificatesPage() {
  const [instructorInfo, setInstructorInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadInstructorInfo = () => {
      setLoading(true);
      try {
        // Get instructor info from storage
        const teacherInfo = localStorage.getItem('teacher_info') || sessionStorage.getItem('teacher_info');
        if (teacherInfo) {
          const parsedInfo = JSON.parse(teacherInfo);
          console.log('Parsed instructor info:', parsedInfo); // Debug log
          setInstructorInfo(parsedInfo);
        } else {
          console.log('No teacher_info found in storage'); // Debug log
          // Set default instructor info if not found
          setInstructorInfo({
            name: 'Instructor',
            fullName: 'Default Instructor',
            email: 'instructor@example.com',
            defaultCourseId: 'sample-course-123',
            defaultCourseName: 'Sample Course'
          });
        }
      } catch (error) {
        console.error('Error parsing teacher info:', error);
        toast.error('Failed to load instructor information');
        // Set default instructor info on error
        setInstructorInfo({
          name: 'Instructor',
          fullName: 'Default Instructor', 
          email: 'instructor@example.com',
          defaultCourseId: 'sample-course-123',
          defaultCourseName: 'Sample Course'
        });
      } finally {
        setLoading(false);
      }
    };

    loadInstructorInfo();
  }, []); // Remove toast dependency to prevent infinite re-renders

  const handleCertificateGenerated = () => {
    toast.success('Certificate generated successfully!');
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 border border-gray-200  p-6 mb-6 shadow-sm">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-md">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1">
              Certificates
            </h1>
            <p className="text-gray-600 text-sm">Generate and manage course completion certificates</p>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <CertificateGenerator
          courseId={instructorInfo?.defaultCourseId || instructorInfo?.courseId || 'sample-course-123'}
          courseName={instructorInfo?.defaultCourseName || instructorInfo?.courseName || 'Sample Course'}
          instructorName={instructorInfo?.name || instructorInfo?.fullName || instructorInfo?.username || 'Default Instructor'}
          onCertificateGenerated={handleCertificateGenerated}
        />
      )}
    </>
  );
}
