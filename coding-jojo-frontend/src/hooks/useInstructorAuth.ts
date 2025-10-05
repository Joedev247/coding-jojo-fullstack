'use client';

import { useState, useEffect } from 'react';
import teacherService from '../services/teacherService';

export interface InstructorUser {
  _id?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  kycCompleted?: boolean;
  profilePicture?: string;
  isActive?: boolean;
  role?: string;
}

export function useInstructorAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<InstructorUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    try {
      const authStatus = teacherService.isAuthenticated();
      const teacherInfo = teacherService.getTeacherInfo();
      
      setIsAuthenticated(authStatus);
      if (authStatus && teacherInfo) {
        setUser(teacherInfo);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = async () => {
    try {
      await teacherService.logout();
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false, error };
    }
  };

  const refreshAuth = () => {
    checkAuth();
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    logout,
    refreshAuth
  };
}
