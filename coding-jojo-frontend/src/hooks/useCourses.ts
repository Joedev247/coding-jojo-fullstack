import { useState, useEffect } from 'react';
import { useToast } from './useToast';
import { courseService, Course, CourseFilters, Enrollment, Instructor } from '../services/courseService';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const toast = useToast();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all courses from API
        const response = await courseService.getCourses();
        if (response.success && response.data) {
          setCourses(response.data);
        } else {
          setCourses([]);
          setError('Failed to load courses');
          toast.error('Failed to load courses. Please refresh the page.');
        }
        
        // Also fetch user enrollments
        try {
          const enrollmentResponse = await courseService.getUserEnrollments();
          if (enrollmentResponse.success) {
            setEnrollments(enrollmentResponse.data ?? []);
          }
        } catch (enrollmentErr) {
          // Enrollments are optional, don't fail if this errors
          console.warn('Failed to load enrollments:', enrollmentErr);
        }
        
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to load courses';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  // Filter and search methods
  const searchCourses = async (query: string, filters?: CourseFilters) => {
    try {
      setIsLoading(true);
      const response = await courseService.searchCourses(query, filters);
      if (response.success) {
        setCourses(response.data ?? []);
        return response.data ?? [];
      } else {
        toast.error('Search failed');
        return [];
      }
    } catch (err: any) {
      toast.error('Search failed: ' + err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const filterCourses = async (filters: CourseFilters) => {
    try {
      setIsLoading(true);
      const response = await courseService.getCourses(filters);
      if (response.success) {
        setCourses(response.data ?? []);
        return response.data ?? [];
      } else {
        toast.error('Failed to filter courses');
        return [];
      }
    } catch (err: any) {
      toast.error('Filter failed: ' + err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getEnrolledCourses = () => {
    return courses.filter(course => 
      enrollments.some(enrollment => enrollment.courseId === course._id)
    );
  };

  const getCompletedCourses = () => {
    return courses.filter(course => 
      enrollments.some(enrollment => 
        enrollment.courseId === course._id && enrollment.progress === 100
      )
    );
  };

  const getInProgressCourses = () => {
    return courses.filter(course => 
      enrollments.some(enrollment => 
        enrollment.courseId === course._id && 
        enrollment.progress > 0 && 
        enrollment.progress < 100
      )
    );
  };

  const getCoursesByCategory = async (categoryId: string) => {
    try {
      setIsLoading(true);
      const response = await courseService.getCoursesByCategory(categoryId);
      if (response.success) {
        setCourses(response.data ?? []);
        return response.data ?? [];
      } else {
        toast.error('Failed to load courses by category');
        return [];
      }
    } catch (err: any) {
      toast.error('Failed to load courses: ' + err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Course actions
  const enrollInCourse = async (courseId: string) => {
    try {
      const response = await courseService.enrollInCourse(courseId);
      if (response.success) {
        // Update enrollments
        setEnrollments(prev => response.data ? [...prev, response.data] : prev);
        toast.success('Successfully enrolled in course!');
        return true;
      } else {
        toast.error('Failed to enroll in course');
        return false;
      }
    } catch (err: any) {
      toast.error('Enrollment failed: ' + err.message);
      return false;
    }
  };

  const updateProgress = async (courseId: string, progress: number) => {
    try {
      const response = await courseService.updateProgress(courseId, progress);
      if (response.success) {
        // Update local enrollments state
        setEnrollments(prev => 
          prev.map(enrollment => 
            enrollment.courseId === courseId 
              ? { ...enrollment, progress }
              : enrollment
          )
        );
        return true;
      } else {
        toast.error('Failed to update progress');
        return false;
      }
    } catch (err: any) {
      toast.error('Failed to update progress: ' + err.message);
      return false;
    }
  };

  const saveCourse = async (courseId: string) => {
    try {
      const response = await courseService.saveCourse(courseId);
      if (response.success) {
        // Update local course state
        setCourses(prev => 
          prev.map(course => 
            course._id === courseId 
              ? { ...course, isSaved: true } 
              : course
          )
        );
        toast.success('Course saved to wishlist!');
        return true;
      } else {
        toast.error('Failed to save course');
        return false;
      }
    } catch (err: any) {
      toast.error('Failed to save course: ' + err.message);
      return false;
    }
  };

  const removeSavedCourse = async (courseId: string) => {
    try {
      const response = await courseService.removeSavedCourse(courseId);
      if (response.success) {
        // Update local course state
        setCourses(prev => 
          prev.map(course => 
            course._id === courseId 
              ? { ...course, isSaved: false } 
              : course
          )
        );
        toast.success('Course removed from wishlist!');
        return true;
      } else {
        toast.error('Failed to remove saved course');
        return false;
      }
    } catch (err: any) {
      toast.error('Failed to remove saved course: ' + err.message);
      return false;
    }
  };

  const rateCourse = async (courseId: string, rating: number, review?: string) => {
    try {
      const response = await courseService.rateCourse(courseId, rating, review);
      if (response.success) {
        toast.success('Thank you for your rating!');
        return true;
      } else {
        toast.error('Failed to submit rating');
        return false;
      }
    } catch (err: any) {
      toast.error('Failed to submit rating: ' + err.message);
      return false;
    }
  };

  const getCourseById = async (courseId: string) => {
    try {
      const response = await courseService.getCourseById(courseId);
      if (response.success) {
        return response.data;
      } else {
        toast.error('Failed to load course details');
        return null;
      }
    } catch (err: any) {
      toast.error('Failed to load course: ' + err.message);
      return null;
    }
  };

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await courseService.getCourses();
      if (response.success) {
        setCourses(response.data ?? []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to refresh courses');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    courses,
    enrollments,
    isLoading,
    error,
    // Filter methods
    getEnrolledCourses,
    getCompletedCourses,
    getInProgressCourses,
    getCoursesByCategory,
    searchCourses,
    filterCourses,
    // Course actions
    enrollInCourse,
    updateProgress,
    saveCourse,
    removeSavedCourse,
    rateCourse,
    getCourseById,
    refetch
  };
}

export default useCourses;
export type { Course, Instructor };