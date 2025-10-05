"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "../hooks/useToast";
import { authService, AuthUser } from "../services/authService";

// User interface - updated to match backend
export interface User {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  profilePicture?: string;
  isPremium?: boolean;
  bio?: string;
  role: "student" | "instructor" | "admin";
  enrolledCourses?: string[];
  isEmailVerified?: boolean;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean }>;
  loginWithToken: (token: string) => Promise<{ success: boolean; user?: any }>;

  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean }>;
  logout: () => void;
  googleSignIn: (credential?: string) => Promise<void>;
  githubSignIn: (code?: string) => Promise<void>;
  upgradeToPremium: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resendOTP: (email: string) => Promise<void>;
  resetPassword: (
    email: string,
    otp: string,
    newPassword: string
  ) => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const toast = useToast();

  // Ensure we're mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []); // Initialize authentication state immediately from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = authService.getStoredToken();
      const storedUser = authService.getStoredUser();

      console.log("AuthContext initialization:", {
        token: !!token,
        tokenPreview: token ? `${token.substring(0, 10)}...` : "NO TOKEN",
        tokenType: typeof token,
        tokenValue: token,
        storedUser: !!storedUser,
        userEmail: storedUser?.email || "NO EMAIL"
      });

      if (token && storedUser) {
        // Check if token is valid (not undefined string)
        if (token === "undefined" || token === "null") {
          console.error("AuthContext: Invalid token found, clearing storage");
          authService.logout();
          setIsLoading(false);
          return;
        }
        
        // Immediately set user to avoid showing non-authenticated state
        try {
          const convertedUser = convertAuthUserToUser(storedUser);
          setUser(convertedUser);
          console.log("AuthContext: User restored from localStorage:", convertedUser.email);
        } catch (error) {
          console.error("AuthContext: Error setting initial user state:", error);
          // Clear invalid stored data
          authService.logout();
        }
      } else if (token && !storedUser) {
        console.warn("AuthContext: Token found but no user data, attempting to fetch user");
        // Try to fetch user data with existing token
        authService.getCurrentUser()
          .then(response => {
            if (response.success && response.data) {
              const convertedUser = convertAuthUserToUser(response.data);
              authService.setAuthData(token, response.data);
              setUser(convertedUser);
              console.log("AuthContext: User data fetched and restored:", convertedUser.email);
            } else {
              console.error("AuthContext: Failed to fetch user data, clearing token");
              authService.logout();
            }
          })
          .catch(error => {
            console.error("AuthContext: Error fetching user data:", error);
            authService.logout();
          })
          .finally(() => {
            setIsLoading(false);
          });
        return; // Don't set loading to false yet
      } else {
        console.log("AuthContext: No stored authentication data found");
      }
      
      // Always set loading to false after initial check
      setIsLoading(false);
    }
  }, []);
  // Convert AuthUser to User format
  const convertAuthUserToUser = (authUser: AuthUser): User => {
    // Ensure profilePicture is always a string or empty string
    let profilePicture = "";
    if (
      authUser.profilePicture &&
      typeof authUser.profilePicture === "string"
    ) {
      profilePicture = authUser.profilePicture;
    } else if (authUser.avatar && typeof authUser.avatar === "string") {
      profilePicture = authUser.avatar;
    }

    const user: User = {
      _id: authUser._id,
      id: authUser._id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      name:
        authUser.name ||
        `${authUser.firstName || ""} ${authUser.lastName || ""}`.trim() ||
        "User",
      email: authUser.email,
      profilePicture,
      isPremium: authUser.isPremium,
      bio: authUser.bio,
      role: authUser.role,
      enrolledCourses: authUser.enrolledCourses,
      isEmailVerified: authUser.isEmailVerified,
    };

    console.log("Converting AuthUser to User:", {
      authUser: {
        email: authUser.email,
        profilePicture: authUser.profilePicture,
        avatar: authUser.avatar,
        profilePictureType: typeof authUser.profilePicture,
        avatarType: typeof authUser.avatar,
      },
      convertedUser: {
        email: user.email,
        profilePicture: user.profilePicture,
        profilePictureType: typeof user.profilePicture,
      },
    });

    return user;
  }; // Background verification temporarily disabled to prevent logout issues
  // TODO: Re-implement with proper error handling and retry logic
  /*
  useEffect(() => {
    // Only run verification if we have a user and are mounted
    if (!mounted || typeof window === "undefined" || !user) {
      return;
    }

    console.log("Background verification: Scheduled for user", user.email);
    // Background verification logic would go here
  }, [mounted, user?.id]);
  */
  // Login with token function for OAuth callbacks
  const loginWithToken = async (
    token: string
  ): Promise<{ success: boolean; user?: any }> => {
    setIsLoading(true);
    try {
      console.log("LoginWithToken: Starting with token:", token ? `${token.substring(0, 10)}...` : 'NO TOKEN');
      
      if (!token) {
        console.error("LoginWithToken: No token provided");
        return { success: false };
      }

      // Store the token temporarily for API call
      localStorage.setItem("auth_token", token);

      // Fetch user data with the token
      const response = await authService.getCurrentUser();
      console.log("LoginWithToken: getCurrentUser response:", { 
        success: response.success, 
        hasData: !!response.data 
      });

      if (response.success && response.data) {
        const userData = convertAuthUserToUser(response.data);

        // Properly store both token and user data using authService
        try {
          authService.setAuthData(token, response.data);
          console.log("LoginWithToken: Auth data stored successfully");
        } catch (storageError) {
          console.error("LoginWithToken: Failed to store auth data:", storageError);
          localStorage.removeItem("auth_token");
          return { success: false };
        }

        setUser(userData);

        console.log("LoginWithToken: Login successful for user:", userData.email);

        // Small delay to ensure storage operations complete
        await new Promise((resolve) => setTimeout(resolve, 100));

        return { success: true, user: userData };
      } else {
        console.error("LoginWithToken: Failed to get user data:", response.error || response.message);
        // Clean up if fetching user data fails
        localStorage.removeItem("auth_token");
        return { success: false };
      }
    } catch (error: any) {
      console.error("LoginWithToken error:", error);
      localStorage.removeItem("auth_token");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }; // Login function
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean }> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (response.success && response.data) {
        const userData = convertAuthUserToUser(response.data.user);

        // Auth data is already stored in authService.login method
        setUser(userData);
        toast.success("Welcome back! Login successful.");

        // Small delay to ensure storage operations complete
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Verify token was stored properly
        const storedToken = authService.getStoredToken();
        if (!storedToken) {
          console.error("Login: Token not properly stored");
          toast.error("Authentication failed. Please try again.");
          return { success: false };
        }

        console.log("Login: Successfully completed with stored token");
        return { success: true };
      } else {
        toast.error(
          response.message || "Login failed. Please check your credentials."
        );
        return { success: false };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }; // Signup function
  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean }> => {
    setIsLoading(true);
    try {
      const [firstName, ...lastNameParts] = name.split(" ");
      const lastName = lastNameParts.join(" ") || "";

      const response = await authService.register({
        firstName,
        lastName,
        email,
        password,
        role: "student",
      });

      if (response.success && response.data) {
        const userData = convertAuthUserToUser(response.data.user);

        // Properly store both token and user data using authService
        authService.setAuthData(response.data.token, response.data.user);

        setUser(userData);
        toast.success("Account created successfully! Welcome to Coding JoJo.");

        // Small delay to ensure storage operations complete
        await new Promise((resolve) => setTimeout(resolve, 100));

        return { success: true };
      } else {
        toast.error(
          response.message || "Registration failed. Please try again."
        );
        return { success: false };
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };
  // Logout function
  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      toast.success("Logged out successfully.");
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
      console.error("Logout error:", error);
    }
  }; // Google Sign In
  const googleSignIn = async (credential?: string) => {
    setIsLoading(true);
    try {
      if (credential) {
        // Handle Google One Tap/Login component credential
        const response = await authService.googleLogin(credential);
        if (response.success && response.data) {
          const convertedUser = convertAuthUserToUser(response.data.user);

          // Properly store both token and user data using authService
          authService.setAuthData(response.data.token, response.data.user);

          setUser(convertedUser);
          toast.success("Successfully signed in with Google!");
          // Redirect to authenticated home page after successful authentication
          if (typeof window !== "undefined") {
            window.location.href = "/?welcome=true";
          }
        } else {
          throw new Error(response.message || "Google sign-in failed");
        }
      } else {
        // Handle OAuth redirect flow
        await authService.initiateGoogleAuth();
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error(error.message || "Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // GitHub Sign In
  const githubSignIn = async (code?: string) => {
    setIsLoading(true);
    try {
      await authService.initiateGitHubAuth();
    } catch (error: any) {
      console.error("GitHub sign-in error:", error);
      toast.error(error.message || "GitHub sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  // Upgrade to Premium function
  const upgradeToPremium = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // For now, we'll update locally until premium upgrade endpoint is available
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      toast.success("🎉 Upgraded to Premium!");
    } catch (error: any) {
      console.error("Premium upgrade error:", error);
      toast.error("Premium upgrade failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // Update user profile function
  const updateUserProfile = async (userData: Partial<User>) => {
    if (!user) {
      console.error("No user found, cannot update profile");
      return;
    }

    console.log(
      "AuthContext: Starting profile update with userData:",
      userData
    );
    setIsLoading(true);
    try {
      console.log("AuthContext: Calling authService.updateProfile");
      const response = await authService.updateProfile(userData);
      console.log("AuthContext: Received response:", response);

      if (response.success && response.data) {
        const updatedUser = convertAuthUserToUser(response.data);
        console.log("AuthContext: Converted user data:", updatedUser);
        setUser(updatedUser);
        toast.success("Profile updated successfully!");
      } else {
        console.error("AuthContext: Update failed with response:", response);
        toast.error(response.message || "Profile update failed.");
      }
    } catch (error: any) {
      console.error("AuthContext: Profile update error:", error);
      toast.error(error.message || "Profile update failed. Please try again.");
      throw error; // Re-throw so the calling function knows it failed
    } finally {
      setIsLoading(false);
    }
  };
  // Request password reset function
  const requestPasswordReset = async (email: string) => {
    try {
      const response = await authService.forgotPassword({ email });

      if (response.success) {
        toast.success("Password reset email sent!");
      } else {
        toast.error(response.message || "Failed to send reset email.");
      }
    } catch (error: any) {
      console.error("Password reset request error:", error);
      toast.error(
        error.message || "Failed to send reset email. Please try again."
      );
    }
  };
  // Verify OTP function
  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await authService.verifyResetOTP({ email, otp });

      if (response.success) {
        toast.success("OTP verified successfully!");
        return true;
      } else {
        toast.error(response.message || "Invalid or expired OTP.");
        return false;
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error(
        error.message || "OTP verification failed. Please try again."
      );
      return false;
    }
  };

  // Resend OTP function
  const resendOTP = async (email: string) => {
    try {
      // For now, simulate resend until backend endpoint is available
      toast.success("Verification code sent!");
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast.error(error.message || "Failed to resend code. Please try again.");
    }
  };

  // Reset password function
  const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string
  ) => {
    try {
      const response = await authService.resetPassword({
        email,
        otp,
        newPassword,
      });

      if (response.success) {
        toast.success("Password reset successful!");
      } else {
        toast.error(response.message || "Password reset failed.");
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Password reset failed. Please try again.");
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithToken,
    signup,
    logout,
    googleSignIn,
    githubSignIn,
    upgradeToPremium,
    updateUserProfile,
    requestPasswordReset,
    verifyOTP,
    resendOTP,
    resetPassword,
  };
  // Don't render context until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          isLoading: true,
          isAuthenticated: false,
          login: async () => ({ success: false }),
          loginWithToken: async () => ({ success: false }),
          signup: async () => ({ success: false }),
          logout: () => {},
          googleSignIn: async () => {},
          githubSignIn: async () => {},
          upgradeToPremium: async () => {},
          updateUserProfile: async () => {},
          requestPasswordReset: async () => {},
          verifyOTP: async () => false,
          resendOTP: async () => {},
          resetPassword: async () => {},
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
