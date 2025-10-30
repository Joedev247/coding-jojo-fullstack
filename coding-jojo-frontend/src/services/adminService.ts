import { apiClient, ApiResponse } from '../lib/api';

// Admin Service for admin panel functionality
export interface AdminStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  activeUsers: number;
  newUsers: {
    count: string;
    percentChange: number;
  };
  revenue: {
    count: number;
    percentChange: number;
  };
  completionRate: {
    count: number;
  };
  engagementRate: {
    count: number;
  };
  monthlySales: { month: string; value: number }[];
  categoryDistribution: { name: string; value: number }[];
  recentActivity: {
    user: string;
    avatar: string;
    action: string;
    target: string;
    time: string;
  }[];
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  joinDate: string;
  avatar?: string;
  coursesEnrolled: number;
  lastActive: string;
  status: 'active' | 'suspended' | 'inactive';
  subscription?: string;
  totalSpent?: number;
}

export interface CreateCourseData {
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  price: number;
  isPaid: boolean;
  isFeatured?: boolean; // allow passing featured flag from admin UI
  thumbnail?: File;
  videoFiles?: File[];
  videoUrls?: string[];
  lessons?: {
    title: string;
    description: string;
    videoUrl?: string;
    duration: number;
    isPaid: boolean;
  }[];
}

export interface AdminCourse {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  category: string;
  level: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  duration: {
    hours: number;
    minutes: number;
  };
  totalLessons: number;
  enrolledStudents: number;
  rating: number;
  reviews: number;
  tags: string[];
  status: 'draft' | 'published' | 'pending' | 'rejected' | 'archived';
  createdAt: string;
  updatedAt: string;
  totalEarnings: number;
  isPremium: boolean;
  isFeatured: boolean;
  prerequisites?: string[];
  learningObjectives?: string[];
  targetAudience?: string[];
  completionRate?: number;
  difficulty?: string;
  hasVideo?: boolean;
}

export interface AdminPurchase {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  course: {
    _id: string;
    title: string;
    thumbnail: string;
    price: number;
  };
  amount: number;
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  refundedAt?: string;
  refundReason?: string;
}

export interface CommunityPostData {
  title: string;
  content: string;
  type: string;
  pinned?: boolean;
  category?: string;
  tags?: string[];
}

export interface CommunityEventData {
  title: string;
  description: string;
  type: 'announcement' | 'workshop' | 'meetup' | 'competition' | 'webinar';
  startDate: string;
  endDate?: string; // made optional to align with EventFormData
  location?: string; // made optional to align with EventFormData
  maxAttendees?: number; // made optional to align with EventFormData
  tags: string[];
  isVirtual: boolean;
}

class AdminService {
  // Dashboard Stats
  async getDashboardStats(): Promise<ApiResponse<AdminStats>> {
    return apiClient.get<AdminStats>('/admin/stats');
  }

  async getAdminStats(): Promise<ApiResponse<AdminStats>> {
    return this.getDashboardStats();
  }

  // User Management
  async getUsers(filters?: {
    role?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<AdminUser[]>> {
    return apiClient.get<AdminUser[]>('/admin/users', filters);
  }

  async getUserById(userId: string): Promise<ApiResponse<AdminUser>> {
    return apiClient.get<AdminUser>(`/admin/users/${userId}`);
  }

  async updateUserRole(userId: string, role: 'student' | 'instructor' | 'admin'): Promise<ApiResponse<{ message: string }>> {
    return apiClient.put<{ message: string }>(`/admin/users/${userId}/role`, { role });
  }

  async updateUserStatus(userId: string, status: 'active' | 'suspended' | 'inactive'): Promise<ApiResponse<{ message: string }>> {
    return apiClient.put<{ message: string }>(`/admin/users/${userId}/status`, { status });
  }

  async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/users/${userId}`);
  }

  async sendUserNotification(userId: string, notification: {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
  }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/admin/users/${userId}/notifications`, notification);
  }

  // Course Management
  async getCourses(filters?: {
    status?: string;
    category?: string;
    instructor?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<AdminCourse[]>> {
    return apiClient.get<AdminCourse[]>('/admin/courses', filters);
  }

  async createCourse(courseData: CreateCourseData): Promise<ApiResponse<AdminCourse>> {
    // For now, let's send JSON data to the admin endpoint
    // File uploads can be handled separately if needed
    const coursePayload = {
      title: courseData.title,
      description: courseData.description,
      instructor: courseData.instructor,
      category: courseData.category,
      level: courseData.level,
      duration: courseData.duration,
      price: courseData.price,
      isPaid: courseData.isPaid,
      videoUrls: courseData.videoUrls?.filter(url => url.trim() !== '') || [],
      lessons: courseData.lessons?.filter(lesson => lesson.title.trim() !== '') || [],
      // Additional fields expected by backend
      isFeatured: courseData.isFeatured ?? true,
      isPremium: courseData.isPaid || false,
      tags: [],
      prerequisites: [],
      learningObjectives: [],
      targetAudience: []
    };

    return apiClient.post<AdminCourse>('/admin/courses', coursePayload);
  }

  async updateCourse(courseId: string, courseData: Partial<CreateCourseData>): Promise<ApiResponse<AdminCourse>> {
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(courseData).forEach(key => {
      if (key === 'thumbnail' || key === 'videoFiles') {
        return; // Handle files separately
      }
      
      const value = courseData[key as keyof CreateCourseData];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value) || typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Add thumbnail file if provided
    if (courseData.thumbnail) {
      formData.append('thumbnail', courseData.thumbnail);
    }

    // Add video files if provided
    if (courseData.videoFiles) {
      courseData.videoFiles.forEach((file, index) => {
        formData.append(`videoFiles`, file);
      });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api'}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update course');
    }

    return response.json();
  }

  async getCourseById(courseId: string): Promise<ApiResponse<AdminCourse>> {
    return apiClient.get<AdminCourse>(`/admin/courses/${courseId}`);
  }

  async deleteCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/courses/${courseId}`);
  }

  async updateCourseStatus(courseId: string, status: 'draft' | 'published' | 'archived'): Promise<ApiResponse<{ message: string }>> {
    return apiClient.put<{ message: string }>(`/admin/courses/${courseId}/status`, { status });
  }

  async approveCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/admin/courses/${courseId}/approve`);
  }

  async rejectCourse(courseId: string, reason?: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/admin/courses/${courseId}/reject`, { reason });
  }

  async archiveCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/admin/courses/${courseId}/archive`);
  }

  async uploadCourseVideo(courseId: string, lessonId: string, videoFile: File): Promise<ApiResponse<{ videoUrl: string }>> {
    const formData = new FormData();
    formData.append('video', videoFile);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api'}/courses/${courseId}/lessons/${lessonId}/video`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload video');
    }

    return response.json();
  }

  // Purchase & Revenue Management
  async getPurchases(filters?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<AdminPurchase[]>> {
    return apiClient.get<AdminPurchase[]>('/admin/purchases', filters);
  }

  async getPurchaseById(purchaseId: string): Promise<ApiResponse<AdminPurchase>> {
    return apiClient.get<AdminPurchase>(`/admin/purchases/${purchaseId}`);
  }

  async refundPurchase(purchaseId: string, reason?: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/admin/purchases/${purchaseId}/refund`, { reason });
  }

  async getRevenueStats(period: 'week' | 'month' | 'year'): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/admin/revenue/stats?period=${period}`);
  }

  // Content Management
  async uploadContent(file: File, type: 'image' | 'video' | 'document'): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api/v1'}/admin/content/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  async deleteContent(contentId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/content/${contentId}`);
  }

  // Notifications
  async sendBulkNotification(notification: {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    targetAudience: 'all' | 'students' | 'instructors' | 'premium';
  }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/admin/notifications/bulk', notification);
  }

  async getNotificationHistory(): Promise<ApiResponse<any[]>> {
    return apiClient.get<any[]>('/admin/notifications/history');
  }

  // System Settings
  async getSettings(): Promise<ApiResponse<any>> {
    return apiClient.get<any>('/admin/settings');
  }

  async updateSettings(settings: any): Promise<ApiResponse<any>> {
    return apiClient.put<any>('/admin/settings', settings);
  }

  // Reports
  async generateReport(reportType: 'users' | 'courses' | 'revenue' | 'engagement', params?: any): Promise<ApiResponse<any>> {
    return apiClient.post<any>('/admin/reports/generate', { type: reportType, ...params });
  }

  async downloadReport(reportId: string): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/admin/reports/${reportId}/download`);
  }

  // Community Posts Management
  async getCommunityPosts(filters?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any[]>> {
    // Return mock data since the endpoint may not be implemented yet
    return {
      success: true,
      data: []
    };
  }

  async getCommunityPost(postId: string): Promise<ApiResponse<any>> {
    return apiClient.get<any>(`/admin/community/posts/${postId}`);
  }

  async deleteCommunityPost(postId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/admin/community/posts/${postId}`);
  }

  async moderatePost(postId: string, action: 'approve' | 'reject' | 'hide', reason?: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/admin/community/posts/${postId}/moderate`, { action, reason });
  }

  async createCommunityEvent(eventData: CommunityEventData): Promise<ApiResponse<any>> {
    // Placeholder implementation until backend exists
    return Promise.resolve({ success: true, data: { id: `event_${Date.now()}`, ...eventData } });
  }

  async updateCommunityPost(postId: string, postData: Partial<CommunityPostData>): Promise<ApiResponse<any>> {
    // Placeholder
    return Promise.resolve({ success: true, data: { id: postId, ...postData } });
  }

  async createCommunityPost(postData: CommunityPostData): Promise<ApiResponse<any>> {
    // Placeholder
    return Promise.resolve({ success: true, data: { id: `post_${Date.now()}`, ...postData } });
  }
}

const adminService = new AdminService();
export { adminService };
export default adminService;
