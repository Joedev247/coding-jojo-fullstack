import { apiClient, ApiResponse } from '../lib/api';

// Community & Chat Service
export interface CommunityMember {
  _id: string;
  name: string;
  avatarUrl?: string;
  role: 'student' | 'instructor' | 'admin';
  lastActive: string;
  joinedAt: string;
  reputation?: number;
  badges?: string[];
}

export interface ForumPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: CommunityMember;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  isPinned?: boolean;
  isLocked?: boolean;
  status: 'published' | 'draft' | 'archived' | 'flagged';
}

export interface Comment {
  _id: string;
  content: string;
  author: CommunityMember;
  postId: string;
  parentCommentId?: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  type: 'workshop' | 'meetup' | 'competition' | 'announcement' | 'webinar';
  startDate: string;
  endDate?: string;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  maxAttendees?: number;
  currentAttendees: number;
  organizer: CommunityMember;
  attendees: CommunityMember[];
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
  isAttending?: boolean;
}

export interface CategoryStats {
  _id: string;
  name: string;
  slug: string;
  postCount: number;
  recentPostCount: number; // posts in last 24 hours
  activeUsers: number;
  description: string;
  color: string;
  icon: string;
}

export interface RealTimeChatMessage {
  _id: string;
  content: string;
  sender: CommunityMember;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'code';
  reactions?: { [emoji: string]: CommunityMember[] };
  replyTo?: string;
  edited?: boolean;
  editedAt?: string;
}

export interface CommunityNotification {
  _id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'event' | 'announcement';
  title: string;
  message: string;
  relatedId?: string;
  relatedType?: 'post' | 'comment' | 'event' | 'user';
  sender?: CommunityMember;
  isRead: boolean;
  createdAt: string;
}

export interface ChatConversation {
  _id: string;
  participants: CommunityMember[];
  type: 'direct' | 'group' | 'support';
  title?: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  conversationId: string;
  sender: CommunityMember;
  content: string;
  type: 'text' | 'image' | 'file' | 'code' | 'system';
  attachments?: {
    url: string;
    name: string;
    size: number;
    type: string;
  }[];
  createdAt: string;
  editedAt?: string;
  isRead: boolean;
  reactions?: {
    emoji: string;
    users: string[];
  }[];
}

export interface ForumCategory {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  postCount: number;
  color?: string;
  isActive: boolean;
}

class CommunityService {
  // Forum Posts
  async getForumPosts(filters?: {
    category?: string;
    tags?: string[];
    search?: string;
    sortBy?: 'newest' | 'popular' | 'trending' | 'unanswered';
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<ForumPost[]>> {
    return apiClient.get<ForumPost[]>('/community/posts', filters);
  }

  async getForumPost(postId: string): Promise<ApiResponse<ForumPost>> {
    return apiClient.get<ForumPost>(`/community/posts/${postId}`);
  }

  async createForumPost(postData: {
    title: string;
    content: string;
    category: string;
    tags?: string[];
  }): Promise<ApiResponse<ForumPost>> {
    return apiClient.post<ForumPost>('/community/posts', postData);
  }

  async updateForumPost(postId: string, postData: Partial<ForumPost>): Promise<ApiResponse<ForumPost>> {
    return apiClient.put<ForumPost>(`/community/posts/${postId}`, postData);
  }

  async deleteForumPost(postId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/community/posts/${postId}`);
  }

  async likeForumPost(postId: string): Promise<ApiResponse<{ message: string; likesCount: number }>> {
    return apiClient.post<{ message: string; likesCount: number }>(`/community/posts/${postId}/like`);
  }
  async unlikeForumPost(postId: string): Promise<ApiResponse<{ message: string; likesCount: number }>> {
    return apiClient.delete<{ message: string; likesCount: number }>(`/community/posts/${postId}/like`);
  }

  async shareForumPost(postId: string, shareData?: {
    platform?: string;
    message?: string;
  }): Promise<ApiResponse<{ message: string; shareCount: number }>> {
    return apiClient.post<{ message: string; shareCount: number }>(`/community/posts/${postId}/share`, shareData || {});
  }

  async reportForumPost(postId: string, reason: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/community/posts/${postId}/report`, { reason });
  }

  // Comments
  async getPostComments(postId: string): Promise<ApiResponse<Comment[]>> {
    return apiClient.get<Comment[]>(`/community/posts/${postId}/comments`);
  }

  async createComment(postId: string, commentData: {
    content: string;
    parentCommentId?: string;
  }): Promise<ApiResponse<Comment>> {
    return apiClient.post<Comment>(`/community/posts/${postId}/comments`, commentData);
  }

  async updateComment(commentId: string, content: string): Promise<ApiResponse<Comment>> {
    return apiClient.put<Comment>(`/community/comments/${commentId}`, { content });
  }

  async deleteComment(commentId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/community/comments/${commentId}`);
  }
  async likeComment(commentId: string): Promise<ApiResponse<{ message: string; likesCount: number }>> {
    return apiClient.post<{ message: string; likesCount: number }>(`/community/comments/${commentId}/like`);
  }

  async toggleCommentLike(postId: string, commentId: string): Promise<ApiResponse<{ message: string; likesCount: number; liked: boolean }>> {
    return apiClient.post<{ message: string; likesCount: number; liked: boolean }>(`/community/posts/${postId}/comments/${commentId}/like`);
  }

  async addCommentReply(postId: string, commentId: string, content: string): Promise<ApiResponse<Comment>> {
    return apiClient.post<Comment>(`/community/posts/${postId}/comments/${commentId}/reply`, { content });
  }

  async unlikeComment(commentId: string): Promise<ApiResponse<{ message: string; likesCount: number }>> {
    return apiClient.delete<{ message: string; likesCount: number }>(`/community/comments/${commentId}/like`);
  }

  // Categories
  async getForumCategories(): Promise<ApiResponse<ForumCategory[]>> {
    return apiClient.get<ForumCategory[]>('/community/categories');
  }

  async getForumCategory(categoryId: string): Promise<ApiResponse<ForumCategory>> {
    return apiClient.get<ForumCategory>(`/community/categories/${categoryId}`);
  }

  // Community Members
  async getCommunityMembers(filters?: {
    role?: string;
    search?: string;
    sortBy?: 'newest' | 'reputation' | 'activity';
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<CommunityMember[]>> {
    return apiClient.get<CommunityMember[]>('/community/members', filters);
  }

  async getCommunityMember(memberId: string): Promise<ApiResponse<CommunityMember>> {
    return apiClient.get<CommunityMember>(`/community/members/${memberId}`);
  }

  async followMember(memberId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/community/members/${memberId}/follow`);
  }

  async unfollowMember(memberId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/community/members/${memberId}/follow`);
  }

  // Trending & Popular Content
  async getTrendingPosts(): Promise<ApiResponse<ForumPost[]>> {
    return apiClient.get<ForumPost[]>('/community/trending');
  }

  async getPopularTags(): Promise<ApiResponse<{ tag: string; count: number }[]>> {
    return apiClient.get<{ tag: string; count: number }[]>('/community/popular-tags');
  }
  async getFeaturedDiscussions(): Promise<ApiResponse<ForumPost[]>> {
    return apiClient.get<ForumPost[]>('/community/featured');
  }

  // Events Management
  async getEvents(filters?: {
    type?: string;
    status?: string;
    upcoming?: boolean;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<CommunityEvent[]>> {
    return apiClient.get<CommunityEvent[]>('/community/events', filters);
  }

  async getEvent(eventId: string): Promise<ApiResponse<CommunityEvent>> {
    return apiClient.get<CommunityEvent>(`/community/events/${eventId}`);
  }

  async createEvent(eventData: {
    title: string;
    description: string;
    type: string;
    startDate: string;
    endDate?: string;
    location?: string;
    isVirtual: boolean;
    meetingLink?: string;
    maxAttendees?: number;
    tags?: string[];
  }): Promise<ApiResponse<CommunityEvent>> {
    return apiClient.post<CommunityEvent>('/community/events', eventData);
  }

  async updateEvent(eventId: string, eventData: Partial<CommunityEvent>): Promise<ApiResponse<CommunityEvent>> {
    return apiClient.put<CommunityEvent>(`/community/events/${eventId}`, eventData);
  }

  async deleteEvent(eventId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/community/events/${eventId}`);
  }

  async attendEvent(eventId: string): Promise<ApiResponse<{ message: string; isAttending: boolean }>> {
    return apiClient.post<{ message: string; isAttending: boolean }>(`/community/events/${eventId}/attend`);
  }

  async unattendEvent(eventId: string): Promise<ApiResponse<{ message: string; isAttending: boolean }>> {
    return apiClient.delete<{ message: string; isAttending: boolean }>(`/community/events/${eventId}/attend`);
  }

  // Category Statistics with Real Counts
  async getCategoryStats(): Promise<ApiResponse<CategoryStats[]>> {
    return apiClient.get<CategoryStats[]>('/community/categories/stats');
  }

  // Real-time Community Chat
  async getCommunityChat(limit?: number): Promise<ApiResponse<RealTimeChatMessage[]>> {
    return apiClient.get<RealTimeChatMessage[]>('/community/chat', { limit });
  }

  async sendCommunityMessage(content: string, type: 'text' | 'image' | 'file' | 'code' = 'text'): Promise<ApiResponse<RealTimeChatMessage>> {
    return apiClient.post<RealTimeChatMessage>('/community/chat', { content, type });
  }

  async reactToMessage(messageId: string, emoji: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/community/chat/${messageId}/react`, { emoji });
  }

  async removeCommunityMessageReaction(messageId: string, emoji: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/community/chat/${messageId}/react/${emoji}`);
  }

  // Notifications
  async getNotifications(page?: number, limit?: number): Promise<ApiResponse<CommunityNotification[]>> {
    return apiClient.get<CommunityNotification[]>('/community/notifications', { page, limit });
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>(`/community/notifications/${notificationId}/read`);
  }

  async markAllNotificationsAsRead(): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>('/community/notifications/read-all');
  }

  // Share Post
  async sharePost(postId: string, platform: string): Promise<ApiResponse<{ message: string; shareUrl: string }>> {
    return apiClient.post<{ message: string; shareUrl: string }>(`/community/posts/${postId}/share`, { platform });
  }

  // Online Users
  async getOnlineUsers(): Promise<ApiResponse<CommunityMember[]>> {
    return apiClient.get<CommunityMember[]>('/community/users/online');
  }

  // User Activity Status
  async updateUserStatus(status: 'online' | 'away' | 'busy' | 'offline'): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>('/community/users/status', { status });
  }
}

class ChatService {
  // Conversations
  async getConversations(): Promise<ApiResponse<ChatConversation[]>> {
    return apiClient.get<ChatConversation[]>('/chat/conversations');
  }

  async getConversation(conversationId: string): Promise<ApiResponse<ChatConversation>> {
    return apiClient.get<ChatConversation>(`/chat/conversations/${conversationId}`);
  }

  async createConversation(participantIds: string[], title?: string): Promise<ApiResponse<ChatConversation>> {
    return apiClient.post<ChatConversation>('/chat/conversations', { participantIds, title });
  }

  async deleteConversation(conversationId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/chat/conversations/${conversationId}`);
  }

  // Messages
  async getMessages(conversationId: string, page?: number): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get<ChatMessage[]>(`/chat/conversations/${conversationId}/messages`, { page });
  }

  async sendMessage(conversationId: string, messageData: {
    content: string;
    type?: 'text' | 'image' | 'file' | 'code';
    attachments?: File[];
  }): Promise<ApiResponse<ChatMessage>> {
    if (messageData.attachments && messageData.attachments.length > 0) {
      // Handle file uploads
      const formData = new FormData();
      formData.append('content', messageData.content);
      formData.append('type', messageData.type || 'text');
      messageData.attachments.forEach((file) => {
        formData.append('attachments', file);
      });

      const response = await fetch(`${apiClient['baseURL']}/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.json();
    } else {
      return apiClient.post<ChatMessage>(`/chat/conversations/${conversationId}/messages`, {
        content: messageData.content,
        type: messageData.type || 'text',
      });
    }
  }

  async editMessage(messageId: string, content: string): Promise<ApiResponse<ChatMessage>> {
    return apiClient.put<ChatMessage>(`/chat/messages/${messageId}`, { content });
  }

  async deleteMessage(messageId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/chat/messages/${messageId}`);
  }

  async markMessageAsRead(messageId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/chat/messages/${messageId}/read`);
  }

  async markConversationAsRead(conversationId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/chat/conversations/${conversationId}/read`);
  }

  // Reactions
  async addReaction(messageId: string, emoji: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/chat/messages/${messageId}/reactions`, { emoji });
  }

  async removeReaction(messageId: string, emoji: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/chat/messages/${messageId}/reactions/${emoji}`);
  }

  // AI Chat Assistant
  async sendAIMessage(message: string, context?: any): Promise<ApiResponse<{ response: string; suggestions?: string[] }>> {
    return apiClient.post<{ response: string; suggestions?: string[] }>('/chat/ai-assistant', { message, context });
  }

  async getAIConversationHistory(): Promise<ApiResponse<any[]>> {
    return apiClient.get<any[]>('/chat/ai-assistant/history');
  }

  // Support Chat
  async createSupportTicket(issueData: {
    subject: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'technical' | 'billing' | 'account' | 'course' | 'other';
  }): Promise<ApiResponse<ChatConversation>> {
    return apiClient.post<ChatConversation>('/chat/support/ticket', issueData);
  }  async getSupportTickets(): Promise<ApiResponse<ChatConversation[]>> {
    return apiClient.get<ChatConversation[]>('/chat/support/tickets');
  }
}

export const communityService = new CommunityService();
export const chatService = new ChatService();
