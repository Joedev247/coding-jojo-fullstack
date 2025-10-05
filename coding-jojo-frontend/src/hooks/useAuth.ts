import { useState, useEffect } from 'react';
import { User } from '../types/dashboard';
import { authService, AuthUser, LoginCredentials, RegisterData } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is already logged in
        const storedUser = authService.getStoredUser();
        const token = authService.getStoredToken();
        
        if (storedUser && token) {
          // Verify token is still valid by fetching current user
          try {
            const response = await authService.getCurrentUser();
            if (response.success && response.data) {
              setUser(transformAuthUserToUser(response.data));
            } else {
              // Token is invalid, clear storage
              await authService.logout();
              setUser(null);
            }
          } catch (err) {
            // Token is invalid, clear storage
            await authService.logout();
            setUser(null);
          }
        }
      } catch (err) {
        setError('Failed to initialize authentication');
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(credentials);
      if (response.success && response.data && response.data.user) {
        setUser(transformAuthUserToUser(response.data.user));
        return { success: true };
      } else {
        setError('Login failed');
        return { success: false, error: 'Login failed' };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(userData);
      if (response.success && response.data && response.data.user) {
        setUser(transformAuthUserToUser(response.data.user));
        return { success: true };
      } else {
        setError('Registration failed');
        return { success: false, error: 'Registration failed' };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      // Redirect to login page or home
      window.location.href = '/';
    } catch (err) {
      // Even if logout API fails, clear local state
      setUser(null);
      window.location.href = '/';
    }
  };
  const updateProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.updateProfile(userData);
      if (response.success && response.data) {
        setUser(transformAuthUserToUser(response.data));
        return { success: true };
      } else {
        setError('Failed to update profile');
        return { success: false, error: 'Failed to update profile' };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeToPremium = async () => {
    try {
      setIsLoading(true);
      // This would redirect to subscription page or handle payment
      window.location.href = '/subscription?plan=premium';
      return { success: true };
    } catch (err: any) {
      setError('Failed to upgrade to premium');
      return { success: false, error: 'Failed to upgrade to premium' };
    } finally {
      setIsLoading(false);
    }
  };
  // Helper function to transform AuthUser to User type
  const transformAuthUserToUser = (authUser: AuthUser): User => {
    return {
      id: authUser._id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
      username: authUser.username || `${authUser.firstName}${authUser.lastName}`,
      avatar: authUser.avatar || '',
      bio: authUser.bio || '',
      role: authUser.role,
      joinedDate: authUser.joinedDate,
      lastActive: authUser.lastActive,
      isPremium: authUser.isPremium || false,
      enrolledCourses: authUser.enrolledCourses || []
    };
  };

  const isAuthenticated = !!user && !!authService.getStoredToken();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    upgradeToPremium
  };
}