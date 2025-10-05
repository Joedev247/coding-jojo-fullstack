import api, { ApiResponse } from '../lib/api';

export interface ChatMessage {
  _id: string;
  message: string;
  sender: {
    _id: string;
    username: string;
    email: string;
    profilePicture?: string;
  };
  timestamp: Date;
  messageType: 'text' | 'voice' | 'image' | 'file' | 'system';
  reactions?: Array<{
    userId: string;
    emoji: string;
  }>;
  replyTo?: {
    messageId: string;
    message: string;
    sender: string;
  };
  isEdited?: boolean;
  fileUrl?: string;
  voiceDuration?: number;
}

export interface OnlineUser {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: Date;
  isTyping?: boolean;
}

export interface ChatRoom {
  _id: string;
  name: string;
  description?: string;
  members: string[];
  isPrivate: boolean;
  createdAt: Date;
  lastActivity: Date;
}

class ChatService {
  // Get all messages
  async getMessages(): Promise<ChatMessage[]> {
    try {
      const response: ApiResponse<ChatMessage[]> = await api.get('/chat/messages');
      return response.data || [];
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw error;
    }
  }

  // Send a message
  async sendMessage(messageData: {
    message: string;
    messageType?: 'text' | 'voice' | 'image' | 'file';
    replyTo?: {
      messageId: string;
      message: string;
      sender: string;
    };
    fileUrl?: string;
    voiceDuration?: number;
  }): Promise<ChatMessage> {
    try {
      const response: ApiResponse<ChatMessage> = await api.post('/chat/messages', messageData);
      return response.data!;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  // React to a message
  async reactToMessage(messageId: string, emoji: string): Promise<void> {
    try {
      await api.post(`/chat/messages/${messageId}/react`, { emoji });
    } catch (error) {
      console.error('Failed to react to message:', error);
      throw error;
    }
  }

  // Edit a message
  async editMessage(messageId: string, newMessage: string): Promise<ChatMessage> {
    try {
      const response: ApiResponse<ChatMessage> = await api.put(`/chat/messages/${messageId}`, { message: newMessage });
      return response.data!;
    } catch (error) {
      console.error('Failed to edit message:', error);
      throw error;
    }
  }

  // Delete a message
  async deleteMessage(messageId: string): Promise<void> {
    try {
      await api.delete(`/chat/messages/${messageId}`);
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  }

  // Get online users
  async getOnlineUsers(): Promise<OnlineUser[]> {
    try {
      const response: ApiResponse<OnlineUser[]> = await api.get('/chat/users/online');
      return response.data || [];
    } catch (error) {
      console.error('Failed to get online users:', error);
      throw error;
    }
  }

  // Update user status
  async updateUserStatus(status: 'online' | 'away' | 'busy' | 'offline'): Promise<void> {
    try {
      await api.post('/chat/users/status', { status });
    } catch (error) {
      console.error('Failed to update user status:', error);
      throw error;
    }
  }

  // Set typing status
  async setTypingStatus(isTyping: boolean): Promise<void> {
    try {
      await api.post('/chat/users/typing', { isTyping });
    } catch (error) {
      console.error('Failed to set typing status:', error);
      throw error;
    }
  }

  // Get chat rooms
  async getChatRooms(): Promise<ChatRoom[]> {
    try {
      const response: ApiResponse<ChatRoom[]> = await api.get('/chat/rooms');
      return response.data || [];
    } catch (error) {
      console.error('Failed to get chat rooms:', error);
      throw error;
    }
  }

  // Create a chat room
  async createChatRoom(roomData: {
    name: string;
    description?: string;
    isPrivate?: boolean;
    members?: string[];
  }): Promise<ChatRoom> {
    try {
      const response: ApiResponse<ChatRoom> = await api.post('/chat/rooms', roomData);
      return response.data!;
    } catch (error) {
      console.error('Failed to create chat room:', error);
      throw error;
    }
  }

  // Join a chat room
  async joinChatRoom(roomId: string): Promise<void> {
    try {
      await api.post(`/chat/rooms/${roomId}/join`);
    } catch (error) {
      console.error('Failed to join chat room:', error);
      throw error;
    }
  }

  // Leave a chat room
  async leaveChatRoom(roomId: string): Promise<void> {
    try {
      await api.post(`/chat/rooms/${roomId}/leave`);
    } catch (error) {
      console.error('Failed to leave chat room:', error);
      throw error;
    }
  }

  // Get messages for a specific room
  async getRoomMessages(roomId: string): Promise<ChatMessage[]> {
    try {
      const response: ApiResponse<ChatMessage[]> = await api.get(`/chat/rooms/${roomId}/messages`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to get room messages:', error);
      throw error;
    }
  }

  // Send message to a specific room
  async sendRoomMessage(roomId: string, messageData: {
    message: string;
    messageType?: 'text' | 'voice' | 'image' | 'file';
    replyTo?: {
      messageId: string;
      message: string;
      sender: string;
    };
    fileUrl?: string;
    voiceDuration?: number;
  }): Promise<ChatMessage> {
    try {
      const response: ApiResponse<ChatMessage> = await api.post(`/chat/rooms/${roomId}/messages`, messageData);
      return response.data!;
    } catch (error) {
      console.error('Failed to send room message:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
