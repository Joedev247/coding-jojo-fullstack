import { apiClient, ApiResponse } from '../lib/api';
import { VideoUpload } from './videoService';

// Enhanced Course Service with comprehensive content management
export interface Instructor {
  _id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  bio?: string;
  expertise?: string[];
  rating?: number;
  coursesCount?: number;
  studentsCount?: number;
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isLocked: boolean;
  duration?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'live_session' | 'download';
  order: number;
  duration: number;
  content: {
    video?: {
      videoId: string;
      video: VideoUpload;
      transcript?: string;
    };
    text?: {
      content: string;
      estimatedReadTime: number;
    };
    quiz?: {
      questions: QuizQuestion[];
      passingScore: number;
      timeLimit?: number;
      allowRetakes: boolean;
    };
    assignment?: {
      instructions: string;
      maxScore: number;
      dueDate?: string;
      submissionFormat: string[];
    };
    liveSession?: {
      sessionId: string;
      scheduledTime: string;
    };
    download?: {
      files: {
        name: string;
        url: string;
        size: number;
      }[];
    };
  };
  isPreview: boolean;
  isCompleted: boolean;
  attachments: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  courseId: string;
  instructorId: string;
  scheduledFor: string;
  duration: number;
  maxParticipants: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  participants?: string[];
  recordingUrl?: string;
  isRecorded: boolean;
  agenda?: string[];
  materials?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  instructorName: string;
  templateId: string;
  issuedAt: string;
  verificationCode: string;
  certificateUrl: string;
  views?: number;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  background: {
    type: 'color' | 'gradient' | 'image';
    value?: string | null;
    gradient?: {
      type: 'linear' | 'radial';
      colors: string[];
      direction: number;
    } | null;
    image?: string | null;
  };
  layout: {
    orientation: 'landscape' | 'portrait';
    width: number;
    height: number;
    padding: number;
    elements: {
      type: string;
      content: string;
      position: { x: number; y: number };
      style: {
        fontSize: number;
        fontFamily: string;
        fontWeight: string;
        color: string;
        textAlign: string;
      };
    }[];
  };
  customFields: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseStats {
  totalStudents: number;
  totalRevenue: number;
  completionRate: number;
  averageRating: number;
  totalWatchTime: number;
  monthlyData: {
    enrollments: number[];
    revenue: number[];
    completions: number[];
  };
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  previewVideo?: VideoUpload;
  previewVideoUrl?: string;
  launchPost?: string;
  instructor: Instructor;
  category: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  duration: string;
  lectures: number;
  studentsEnrolled?: number;
  totalEnrollments?: number;
  totalDuration: number;
  rating: {
    average: number;
    count: number;
  };
  ratingCount: number;
  progress?: number;
  price: number;
  currency: string;
  originalPrice?: number;
  isFeatured: boolean;
  isNew?: boolean;
  isSaved?: boolean;
  createdAt: string;
  updatedAt?: string;
  status: 'draft' | 'published' | 'archived';
  prerequisites?: string[];
  learningObjectives?: string[];
  requirements: string[];
  learningOutcomes: string[];
  syllabus?: any[];
  sections: CourseSection[];
  certificates?: Certificate[];
  analytics?: any;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  price?: 'free' | 'paid' | 'all';
  rating?: number;
  duration?: string;
  search?: string;
  sortBy?: 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high';
  page?: number;
  limit?: number;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  courseCount: number;
  icon?: string;
}

export interface Enrollment {
  _id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completedAt?: string;
  certificateId?: string;
  lastAccessedAt?: string;
}

export interface CourseProgress {
  _id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedLessons: string[];
  currentLesson?: string;
  timeSpent: number;
  lastAccess: string;
  quiz_scores?: any[];
  assignments?: any[];
}

class CourseService {
  // Get all courses with filters
  async getCourses(filters?: CourseFilters): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>('/courses', filters);
  }

  // Get course by ID
  async getCourseById(courseId: string): Promise<ApiResponse<Course>> {
    return apiClient.get<Course>(`/courses/${courseId}`);
  }

  // Get featured courses
  async getFeaturedCourses(): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>('/courses/featured');
  }

  // Get trending courses
  async getTrendingCourses(): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>('/courses/trending');
  }

  // Get recommended courses for user
  async getRecommendedCourses(): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>('/courses/recommended');
  }

  // Get courses by category
  async getCoursesByCategory(categoryId: string, filters?: CourseFilters): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>(`/categories/${categoryId}/courses`, filters);
  }

  // Get courses by instructor
  async getCoursesByInstructor(instructorId: string): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>(`/courses/instructor/${instructorId}`);
  }

  // Search courses
  async searchCourses(query: string, filters?: CourseFilters): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>('/courses', { search: query, ...filters });
  }

  // Enroll in course
  async enrollInCourse(courseId: string): Promise<ApiResponse<Enrollment>> {
    return apiClient.post<Enrollment>(`/enrollments/${courseId}`);
  }

  // Get user enrollments
  async getUserEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    return apiClient.get<Enrollment[]>('/enrollments');
  }

  // Get enrollment by course ID
  async getEnrollmentByCourse(courseId: string): Promise<ApiResponse<Enrollment>> {
    return apiClient.get<Enrollment>(`/enrollments/${courseId}`);
  }

  // Update course progress
  async updateProgress(courseId: string, progress: number): Promise<ApiResponse<CourseProgress>> {
    return apiClient.put<CourseProgress>(`/enrollments/${courseId}/progress`, { progress });
  }

  // Get course progress
  async getCourseProgress(courseId: string): Promise<ApiResponse<CourseProgress>> {
    return apiClient.get<CourseProgress>(`/progress/courses/${courseId}`);
  }

  // Mark lesson as completed
  async markLessonCompleted(courseId: string, lessonId: string): Promise<ApiResponse<CourseProgress>> {
    return apiClient.post<CourseProgress>(`/progress/courses/${courseId}/lessons/${lessonId}`);
  }

  // Save/Wishlist course
  async saveCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/users/wishlist/${courseId}`);
  }

  // Remove from wishlist
  async removeSavedCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/users/wishlist/${courseId}`);
  }

  // Get saved courses
  async getSavedCourses(): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>('/users/wishlist');
  }

  // Rate course
  async rateCourse(courseId: string, rating: number, review?: string): Promise<ApiResponse<{ message: string }>> {
    // Backend expects /api/courses/:id/rate
    return apiClient.post<{ message: string }>(`/courses/${courseId}/rate`, { rating, review });
  }

  // Get course reviews
  async getCourseReviews(courseId: string, page?: number): Promise<ApiResponse<any[]>> {
    return apiClient.get<any[]>(`/courses/${courseId}/reviews`, { page });
  }

  // Social interaction methods
  
  // Like/Unlike course
  async likeCourse(courseId: string): Promise<ApiResponse<{ isLiked: boolean; totalLikes: number }>> {
    return apiClient.post<{ isLiked: boolean; totalLikes: number }>(`/courses/${courseId}/like`);
  }

  // Add comment to course
  async addComment(courseId: string, content: string): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`/courses/${courseId}/comments`, { content });
  }

  // Get course comments
  async getCourseComments(courseId: string, page?: number, limit?: number): Promise<ApiResponse<any[]>> {
    return apiClient.get<any[]>(`/courses/${courseId}/comments`, { page, limit });
  }

  // Like/Unlike comment
  async likeComment(courseId: string, commentId: string): Promise<ApiResponse<{ isLiked: boolean; totalLikes: number }>> {
    return apiClient.post<{ isLiked: boolean; totalLikes: number }>(`/courses/${courseId}/comments/${commentId}/like`);
  }

  // Add reply to comment
  async addReply(courseId: string, commentId: string, content: string): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`/courses/${courseId}/comments/${commentId}/reply`, { content });
  }

  // Share course
  async shareCourse(courseId: string): Promise<ApiResponse<{ shares: number }>> {
    return apiClient.post<{ shares: number }>(`/courses/${courseId}/share`);
  }

  // Create course (for instructors)
  async createCourse(courseData: Partial<Course>): Promise<ApiResponse<Course>> {
    return apiClient.post<Course>('/courses', courseData);
  }

  // Update course (for instructors)
  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<ApiResponse<Course>> {
    return apiClient.put<Course>(`/courses/${courseId}`, courseData);
  }

  // Delete course (for instructors)
  async deleteCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/courses/${courseId}`);
  }

  // Get course analytics (for instructors)
  async getCourseAnalytics(courseId: string): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/courses/${courseId}/analytics`);
  }

  // Instructor-specific methods
  async getInstructorCourses(instructorId: string): Promise<ApiResponse<Course[]>> {
    return apiClient.get<Course[]>(`/instructors/${instructorId}/courses`);
  }

  async getInstructorStats(instructorId: string): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/instructors/${instructorId}/stats`);
  }

  async publishCourse(courseId: string): Promise<ApiResponse<Course>> {
    return apiClient.put<Course>(`/courses/${courseId}/publish`);
  }

  // Live Session methods
  async getLiveSessions(courseId: string): Promise<ApiResponse<LiveSession[]>> {
    return apiClient.get<LiveSession[]>(`/courses/${courseId}/sessions`);
  }

  async createLiveSession(sessionData: Partial<LiveSession>): Promise<ApiResponse<LiveSession>> {
    return apiClient.post<LiveSession>('/sessions', sessionData);
  }

  async startLiveSession(sessionId: string): Promise<ApiResponse<LiveSession>> {
    return apiClient.put<LiveSession>(`/sessions/${sessionId}/start`);
  }

  async endLiveSession(sessionId: string): Promise<ApiResponse<LiveSession>> {
    return apiClient.put<LiveSession>(`/sessions/${sessionId}/end`);
  }

  async toggleSessionRecording(sessionId: string, isRecording: boolean): Promise<ApiResponse<LiveSession>> {
    return apiClient.put<LiveSession>(`/sessions/${sessionId}/recording`, { isRecording });
  }

  // Certificate methods
  async getCertificates(courseId: string): Promise<ApiResponse<Certificate[]>> {
    return apiClient.get<Certificate[]>(`/courses/${courseId}/certificates`);
  }

  async getCertificateTemplates(): Promise<ApiResponse<CertificateTemplate[]>> {
    return apiClient.get<CertificateTemplate[]>('/certificates/templates');
  }

  async generateCertificate(data: {
    courseId: string;
    studentId: string;
    templateId: string;
    customData: any;
  }): Promise<ApiResponse<Certificate>> {
    return apiClient.post<Certificate>('/certificates/generate', data);
  }

  async downloadCertificate(certificateId: string, format: 'pdf' | 'png' | 'jpg'): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/certificates/${certificateId}/download`, { format });
  }
}

// Category Service
class CategoryService {
  // Get all categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/categories');
  }

  // Get category by ID
  async getCategoryById(categoryId: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/categories/${categoryId}`);
  }

  // Create category (admin only)
  async createCategory(categoryData: Partial<Category>): Promise<ApiResponse<Category>> {
    return apiClient.post<Category>('/categories', categoryData);
  }

  // Update category (admin only)
  async updateCategory(categoryId: string, categoryData: Partial<Category>): Promise<ApiResponse<Category>> {
    return apiClient.put<Category>(`/categories/${categoryId}`, categoryData);
  }

  // Delete category (admin only)
  async deleteCategory(categoryId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/categories/${categoryId}`);
  }
}

export const courseService = new CourseService();
export const categoryService = new CategoryService();
