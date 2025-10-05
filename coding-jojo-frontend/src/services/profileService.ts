import { apiClient, ApiResponse } from '../lib/api';

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  bio?: string;
  profilePicture?: string;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  isPremium: boolean;
  role: 'student' | 'instructor' | 'admin';
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  joinedDate?: string;
  lastActive?: string;
}

class ProfileService {
  async updateProfile(data: ProfileUpdateData): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.put('/users/profile', data);
      return response as ApiResponse<User>;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  async uploadProfilePicture(profilePicture: string): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.post('/users/upload-profile-picture', {
        profilePicture
      });
      return response as ApiResponse<User>;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload profile picture');
    }
  }

  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    try {
      const response = await apiClient.get('/users/profile');
      return response as ApiResponse<{ user: User }>;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  }
}

export const profileService = new ProfileService();
export default profileService;
