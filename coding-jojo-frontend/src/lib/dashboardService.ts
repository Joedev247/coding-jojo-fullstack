import { apiClient, ApiResponse } from './api';

// Dashboard interfaces
export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isPremium: boolean;
  joinedDate: string;
}

export interface UserStats {
  coursesCompleted: number;
  coursesInProgress: number;
  totalHoursLearned: number;
  certificatesEarned: number;
  totalCourses: number;
}

export interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
  duration: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  status: 'in-progress' | 'not-started' | 'completed';
  lastAccessed: string;
  category: string;
  lastChapter: string;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
  duration: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  status: 'in-progress' | 'not-started' | 'completed';
  enrolledAt: string;
  category: string;
  price: number;
  lastChapter: string;
  lastAccessed: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  rarity: string;
}

export interface Subscription {
  id: string;
  plan: 'free' | 'premium';
  status: string;
  startDate: string;
  endDate?: string;
  renewalDate?: string;
  price: number;
  billingCycle: string;
  features: string[];
}

export interface DashboardData {
  user: DashboardUser;
  stats: UserStats;
  courseProgress: CourseProgress[];
  enrolledCourses: EnrolledCourse[];
  upcomingEvents: any[];
  subscription: Subscription;
  achievements: Achievement[];
  recentActivity: any[];
  notifications: any[];
  learningGoals: any[];
  quickStats: {
    weeklyProgress: {
      hoursLearned: number;
      lessonsCompleted: number;
      quizzesCompleted: number;
      streakDays: number;
    };
    monthlyGoals: {
      targetHours: number;
      completedHours: number;
      targetCourses: number;
      completedCourses: number;
    };
  };
}

export interface Analytics {
  learningProgress: {
    dailyHours: number[];
    weeklyCompletion: number[];
    courseCategories: Record<string, number>;
  };
  performance: {
    averageQuizScore: number;
    totalQuizzesTaken: number;
    perfectScores: number;
    improvementTrend: string;
  };
  achievements: {
    totalEarned: number;
    recentAchievements: number;
    nextMilestone: {
      title: string;
      description: string;
      progress: number;
      target: number;
    };
  };
}

class DashboardService {
  
  /**
   * Get comprehensive dashboard data for the authenticated user
   */
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    try {
      const response = await apiClient.get<DashboardData>('/dashboard');
      return response;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data'
      };
    }
  }

  /**
   * Get learning analytics for the authenticated user
   */
  async getAnalytics(): Promise<ApiResponse<Analytics>> {
    try {
      const response = await apiClient.get<Analytics>('/dashboard/analytics');
      return response;
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch analytics data'
      };
    }
  }

  /**
   * Get user's enrolled courses
   */
  async getUserCourses(): Promise<ApiResponse<EnrolledCourse[]>> {
    try {
      const dashboardResponse = await this.getDashboardData();
      
      if (dashboardResponse.success && dashboardResponse.data) {
        return {
          success: true,
          data: dashboardResponse.data.enrolledCourses
        };
      }
      
      return {
        success: false,
        error: 'Failed to fetch user courses'
      };
    } catch (error) {
      console.error('Error fetching user courses:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user courses'
      };
    }
  }

  /**
   * Get user progress for courses
   */
  async getCourseProgress(): Promise<ApiResponse<CourseProgress[]>> {
    try {
      const dashboardResponse = await this.getDashboardData();
      
      if (dashboardResponse.success && dashboardResponse.data) {
        return {
          success: true,
          data: dashboardResponse.data.courseProgress
        };
      }
      
      return {
        success: false,
        error: 'Failed to fetch course progress'
      };
    } catch (error) {
      console.error('Error fetching course progress:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch course progress'
      };
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<ApiResponse<UserStats>> {
    try {
      const dashboardResponse = await this.getDashboardData();
      
      if (dashboardResponse.success && dashboardResponse.data) {
        return {
          success: true,
          data: dashboardResponse.data.stats
        };
      }
      
      return {
        success: false,
        error: 'Failed to fetch user statistics'
      };
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user statistics'
      };
    }
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;
