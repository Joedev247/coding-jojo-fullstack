import { apiClient, ApiResponse } from '../lib/api';

// Progress Service
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  timeSpent: number;
  watchPercentage?: number;
}

export interface CourseProgressData {
  courseId: string;
  progress: number;
  completedLessons: string[];
  totalTimeSpent: number;
  lastAccessed: string;
}

export interface ProgressStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHoursLearned: number;
  averageProgress: number;
}

class ProgressService {
  // Get course progress
  async getCourseProgress(courseId: string): Promise<ApiResponse<CourseProgressData>> {
    return apiClient.get<CourseProgressData>(`/progress/courses/${courseId}`);
  }

  // Update lesson progress
  async updateLessonProgress(courseId: string, lessonId: string, progressData: LessonProgress): Promise<ApiResponse<any>> {
    return apiClient.post<any>(`/progress/courses/${courseId}/lessons/${lessonId}`, progressData);
  }

  // Mark course complete
  async markCourseComplete(courseId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/progress/courses/${courseId}/complete`);
  }

  // Get progress dashboard
  async getProgressDashboard(): Promise<ApiResponse<any>> {
    return apiClient.get<any>('/progress/dashboard');
  }

  // Get progress statistics
  async getProgressStatistics(timeframe = '30d'): Promise<ApiResponse<ProgressStats>> {
    return apiClient.get<ProgressStats>('/progress/stats', { timeframe });
  }

  // Track custom event
  async trackEvent(eventData: { eventType: string; eventData: any }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/analytics/track', eventData);
  }
}

export const progressService = new ProgressService();
