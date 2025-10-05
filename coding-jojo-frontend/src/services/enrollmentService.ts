import { apiClient, ApiResponse } from '../lib/api';

// Enrollment Service
export interface EnrollmentData {
  courseId: string;
  paymentMethod?: string;
  couponCode?: string;
}

export interface EnrollmentNote {
  _id: string;
  content: string;
  lessonId: string;
  timestamp: number;
  createdAt: string;
}

export interface EnrollmentBookmark {
  _id: string;
  lessonId: string;
  timestamp: number;
  title: string;
  createdAt: string;
}

export interface EnrollmentRating {
  rating: number;
  review?: string;
}

export interface EnrollmentProgress {
  lessonId: string;
  completed: boolean;
  timeSpent: number;
  watchPercentage?: number;
}

class EnrollmentService {
  // Enroll in course
  async enrollInCourse(courseId: string, enrollmentData?: Partial<EnrollmentData>): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`/enrollments/${courseId}`, enrollmentData);
  }

  // Get user enrollments
  async getUserEnrollments(params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<any[]>> {
    return apiClient.get<any[]>('/enrollments', params);
  }
  // Get enrollment details
  async getEnrollmentDetails(enrollmentId: string): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/enrollments/${enrollmentId}`);
  }

  // Update progress
  async updateProgress(enrollmentId: string, progressData: EnrollmentProgress): Promise<ApiResponse<any>> {
    return apiClient.put<any>(`/enrollments/${enrollmentId}/progress`, progressData);
  }

  // Notes Management
  async addNote(enrollmentId: string, noteData: Partial<EnrollmentNote>): Promise<ApiResponse<EnrollmentNote>> {
    return apiClient.post<EnrollmentNote>(`/enrollments/${enrollmentId}/notes`, noteData);
  }

  async updateNote(enrollmentId: string, noteId: string, noteData: Partial<EnrollmentNote>): Promise<ApiResponse<EnrollmentNote>> {
    return apiClient.put<EnrollmentNote>(`/enrollments/${enrollmentId}/notes/${noteId}`, noteData);
  }

  async deleteNote(enrollmentId: string, noteId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/enrollments/${enrollmentId}/notes/${noteId}`);
  }

  // Bookmarks Management
  async addBookmark(enrollmentId: string, bookmarkData: Partial<EnrollmentBookmark>): Promise<ApiResponse<EnrollmentBookmark>> {
    return apiClient.post<EnrollmentBookmark>(`/enrollments/${enrollmentId}/bookmarks`, bookmarkData);
  }

  async removeBookmark(enrollmentId: string, bookmarkId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/enrollments/${enrollmentId}/bookmarks/${bookmarkId}`);
  }

  // Rate Course
  async rateCourse(enrollmentId: string, ratingData: EnrollmentRating): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/enrollments/${enrollmentId}/rating`, ratingData);
  }

  // Get course enrollment stats (for instructors)
  async getCourseEnrollmentStats(courseId: string): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/enrollments/course/${courseId}/stats`);
  }
}

export const enrollmentService = new EnrollmentService();
