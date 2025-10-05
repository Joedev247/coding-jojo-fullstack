import { apiClient, ApiResponse } from '../lib/api';

// Notification Service
export interface NotificationData {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  isRead: boolean;
  link?: string;
  actionRequired?: boolean;
}

export interface NotificationSettings {
  email: {
    newCourse: boolean;
    assignment: boolean;
    message: boolean;
  };
  push: {
    newCourse: boolean;
    assignment: boolean;
    message: boolean;
  };
}

class NotificationService {
  // Get notifications
  async getNotifications(params?: { page?: number; limit?: number; type?: string; status?: string }): Promise<ApiResponse<NotificationData[]>> {
    return apiClient.get<NotificationData[]>('/notifications', params);
  }

  // Get unread count
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return apiClient.get<{ count: number }>('/notifications/unread-count');
  }

  // Mark as read
  async markAsRead(notificationId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>(`/notifications/${notificationId}/read`);
  }

  // Mark all as read
  async markAllAsRead(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>('/notifications/mark-all-read');
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/notifications/${notificationId}`);
  }

  // Clear all notifications
  async clearAllNotifications(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>('/notifications/clear-all');
  }

  // Get notification settings
  async getNotificationSettings(): Promise<ApiResponse<NotificationSettings>> {
    return apiClient.get<NotificationSettings>('/notifications/settings');
  }

  // Update notification settings
  async updateNotificationSettings(settings: NotificationSettings): Promise<ApiResponse<NotificationSettings>> {
    return apiClient.patch<NotificationSettings>('/notifications/settings', settings);
  }
}

export const notificationService = new NotificationService();
