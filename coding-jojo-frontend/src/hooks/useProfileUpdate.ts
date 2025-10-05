import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './useToast';

interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string;
  profilePicture?: string;
}

export const useProfileUpdate = () => {
  const { updateUserProfile } = useAuth();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const updateProfile = async (data: ProfileUpdateData) => {
    setIsUpdating(true);
    try {
      console.log('Starting profile update with data:', data);
      
      const updateData = {
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}`.trim() : undefined,
        email: data.email,
        bio: data.bio,
        profilePicture: data.profilePicture
      };

      // Remove undefined values
      const cleanedData = Object.fromEntries(
        Object.entries(updateData).filter(([_, value]) => value !== undefined)
      );

      console.log('Cleaned data to send:', cleanedData);

      if (updateUserProfile) {
        await updateUserProfile(cleanedData);
        console.log('Profile update completed successfully');
      } else {
        console.error('updateUserProfile function not available');
        throw new Error('Update function not available');
      }

      toast.success('Profile updated successfully!', {
        description: 'Your changes have been saved and will be reflected across the app.'
      });

      return { success: true };
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile', {
        description: error.message || 'Please try again later.'
      });
      return { success: false, error: error.message };
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateProfile,
    isUpdating
  };
};