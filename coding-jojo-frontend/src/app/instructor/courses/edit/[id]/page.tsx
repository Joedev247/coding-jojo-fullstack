'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CourseBuilder from '../../../../../components/course/CourseBuilder';
import { useToast } from '../../../../../contexts/ToastContext';
import { Course, courseService } from '../../../../../services/courseService';

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const { success: showSuccess, error: showError } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const courseId = params.id as string;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (courseId) {
          const response = await courseService.getCourseById(courseId);
          setCourse(response.data);
        }
      } catch (error: any) {
        showError(error.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, showError]);

  const handleSave = (updatedCourse: Course) => {
    setCourse(updatedCourse);
    showSuccess('Course updated successfully!');
  };

  const handlePublish = (publishedCourse: Course) => {
    setCourse(publishedCourse);
    showSuccess('Course published successfully!');
    router.push('/instructor/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CourseBuilder 
        course={course}
        onSave={handleSave}
        onPublish={handlePublish}
        isEditing={true}
      />
    </div>
  );
}
