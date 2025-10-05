import { apiClient, ApiResponse } from '../lib/api';

// Analytics Service
export interface DashboardOverview {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  activeUsers: number;
}

export interface RealtimeMetrics {
  activeUsers: number;
  onlineUsers: number;
  coursesInProgress: number;
  recentSignups: number;
}

export interface UserAnalytics {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  userGrowth: {
    daily: { date: string; count: number }[];
    weekly: { week: string; count: number }[];
    monthly: { month: string; count: number }[];
  };
}

export interface CourseAnalytics {
  totalCourses: number;
  publishedCourses: number;
  popularCourses: Array<{
    courseId: string;
    title: string;
    enrollments: number;
    rating: number;
  }>;
  categoryDistribution: Array<{
    category: string;
    count: number;
  }>;
}

export interface RevenueAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: {
    daily: { date: string; amount: number }[];
    weekly: { week: string; amount: number }[];
    monthly: { month: string; amount: number }[];
  };
  topSellingCourses: Array<{
    courseId: string;
    title: string;
    revenue: number;
  }>;
}

export interface EngagementAnalytics {
  avgSessionDuration: number;
  completionRate: number;
  activeStudents: number;
  courseCompletions: number;
  engagementTrends: {
    daily: { date: string; engagement: number }[];
    weekly: { week: string; engagement: number }[];
  };
}

export interface InstructorAnalytics {
  totalStudents: number;
  totalRevenue: number;
  courseCompletions: number;
  averageRating: number;
  coursesPublished: number;
  monthlyEarnings: Array<{
    month: string;
    earnings: number;
  }>;
  studentGrowth: Array<{
    date: string;
    students: number;
  }>;
}

export interface TrackEventData {
  eventType: string;
  eventData: any;
}

class AnalyticsService {
  // Get dashboard overview (Admin)
  async getDashboardOverview(timeframe = '30d'): Promise<ApiResponse<DashboardOverview>> {
    return apiClient.get<DashboardOverview>('/analytics/dashboard', { timeframe });
  }

  // Get real-time metrics (Admin)
  async getRealtimeMetrics(): Promise<ApiResponse<RealtimeMetrics>> {
    return apiClient.get<RealtimeMetrics>('/analytics/realtime');
  }

  // Track custom event
  async trackEvent(eventData: TrackEventData): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/analytics/track', eventData);
  }

  // Get user analytics (Admin)
  async getUserAnalytics(timeframe = '7d'): Promise<ApiResponse<UserAnalytics>> {
    return apiClient.get<UserAnalytics>('/analytics/users', { timeframe });
  }

  // Get course analytics (Admin)
  async getCourseAnalytics(timeframe = '30d'): Promise<ApiResponse<CourseAnalytics>> {
    return apiClient.get<CourseAnalytics>('/analytics/courses', { timeframe });
  }

  // Get revenue analytics (Admin)
  async getRevenueAnalytics(timeframe = '90d'): Promise<ApiResponse<RevenueAnalytics>> {
    return apiClient.get<RevenueAnalytics>('/analytics/revenue', { timeframe });
  }

  // Get engagement analytics (Admin)
  async getEngagementAnalytics(timeframe = '30d'): Promise<ApiResponse<EngagementAnalytics>> {
    return apiClient.get<EngagementAnalytics>('/analytics/engagement', { timeframe });
  }

  // Get instructor analytics (Instructor/Admin)
  async getInstructorAnalytics(instructorId: string, timeframe = '30d'): Promise<ApiResponse<InstructorAnalytics>> {
    return apiClient.get<InstructorAnalytics>(`/analytics/instructor/${instructorId}`, { timeframe });
  }
}

export const analyticsService = new AnalyticsService();
