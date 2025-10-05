import { apiClient, ApiResponse } from './api';

// Course interfaces matching backend response
export interface CourseInstructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number;
  originalPrice?: number;
  thumbnail: {
    url: string;
    publicId?: string;
    width?: number;
    height?: number;
  };
  duration: {
    hours: number;
    minutes: number;
  };
  totalLessons: number;
  averageRating: number;
  totalRatings: number;
  totalEnrollments: number;
  instructor: CourseInstructor;
  isPremium: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export interface FeaturedCoursesResponse {
  success: boolean;
  data: Course[];
  message: string;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  data: {
    enrollment: {
      courseId: string;
      userId: string;
      enrolledAt: string;
      progress: number;
    };
  };
}

class CourseService {
  async getFeaturedCourses(limit: number = 6): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get<Course[]>('/courses/featured', { limit });
      return response;
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch featured courses'
      };
    }
  }

  async getAllCourses(params?: {
    page?: number;
    limit?: number;
    category?: string;
    level?: string;
    search?: string;
    sort?: string;
    featured?: boolean;
  }): Promise<ApiResponse<Course[]>> {
    try {
      const response = await apiClient.get<Course[]>('/courses', params);
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch courses'
      };
    }
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    try {
      const response = await apiClient.get<Course>(`/courses/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching course:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch course'
      };
    }
  }

  async enrollInCourse(courseId: string): Promise<ApiResponse<EnrollmentResponse['data']>> {
    try {
      const response = await apiClient.post<EnrollmentResponse['data']>(`/courses/${courseId}/enroll`);
      return response;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to enroll in course'
      };
    }
  }

  async getCategories(): Promise<ApiResponse<Array<{ id: string; name: string; count: number }>>> {
    try {
      const response = await apiClient.get<Array<{ id: string; name: string; count: number }>>('/courses/categories');
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch categories'
      };
    }
  }

  // Utility methods
  formatDuration(duration: { hours: number; minutes: number }): string {
    if (duration.hours === 0) {
      return `${duration.minutes}m`;
    }
    return duration.minutes === 0 
      ? `${duration.hours}h` 
      : `${duration.hours}h ${duration.minutes}m`;
  }

  formatPrice(price: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price);
  }

  calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  // Format relative time (e.g., "Last updated: May 2025")
  formatLastUpdated(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long' 
    };
    return `Last updated: ${date.toLocaleDateString('en-US', options)}`;
  }
}

export const courseService = new CourseService();
export default courseService;
