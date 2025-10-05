'use client';

import React from 'react';
import CourseBuilder from '../../../../components/course/CourseBuilder';
import { useToast } from '../../../../hooks/useToast';
import { useRouter } from 'next/navigation';
import { Course } from '../../../../services/courseService';

export default function NewCoursePage() {
  const toast = useToast();
  const router = useRouter();

  const handleSave = (course: Course) => {
    toast.success('Course saved successfully!');
    console.log('Course saved:', course);
  };

  const handlePublish = (course: Course) => {
    toast.success('Course published successfully!');
    console.log('Course published:', course);
    router.push('/instructor/dashboard');
  };

  return (
    <CourseBuilder 
      onSave={handleSave}
      onPublish={handlePublish}
      isEditing={false}
    />
  );
}
