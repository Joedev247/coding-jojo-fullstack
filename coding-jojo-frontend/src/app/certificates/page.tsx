'use client';

import React from 'react';
import CertificateGenerator from '../../components/certificate/CertificateGenerator';

export default function CertificatesPage() {
  // Mock data for demonstration
  const mockCourseId = 'course_123';
  const mockCourseName = 'Complete JavaScript Course';
  const mockInstructorName = 'John Doe';
  const mockStudentId = 'student_456';
  const mockStudentName = 'Jane Smith';
  const mockCompletionDate = new Date().toISOString();

  const handleCertificateGenerated = (certificate: any) => {
    console.log('Certificate generated:', certificate);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <CertificateGenerator 
        courseId={mockCourseId}
        courseName={mockCourseName}
        instructorName={mockInstructorName}
        studentId={mockStudentId}
        studentName={mockStudentName}
        completionDate={mockCompletionDate}
        onCertificateGenerated={handleCertificateGenerated}
      />
    </div>
  );
}
