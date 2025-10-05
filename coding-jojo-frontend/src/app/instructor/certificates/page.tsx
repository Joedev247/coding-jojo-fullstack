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
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-8 mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-6">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Certificates
            </h1>
            <p className="text-gray-300 text-lg">Generate and manage course completion certificates</p>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
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
