import { apiClient, ApiResponse } from "../lib/api";

// Authentication Service
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "student" | "instructor";
}

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  username?: string;
  avatar?: string;
  profilePicture?: string;
  bio?: string;
  role: "student" | "instructor" | "admin";
  joinedDate: string;
  lastActive: string;
  isEmailVerified: boolean;
  isPremium?: boolean;
  enrolledCourses?: string[];
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyOTPData {
  email: string;
  otp: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface VerifyEmailData {
  token: string;
}

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  }
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    console.log("🔍 AuthService: Full response structure:", {
      success: response.success,
      hasData: !!response.data,
      dataKeys: response.data ? Object.keys(response.data) : [],
      responseKeys: Object.keys(response),
      tokenInData: response.data?.token,
      tokenInResponse: (response as any).token,
      userInData: response.data?.user,
      userInResponse: (response as any).user
    });

    // Handle both possible response structures:
    // 1. Wrapped: { success: true, data: { token, user } }
    // 2. Direct: { success: true, token, user }
    const token = response.data?.token || (response as any).token;
    const user = response.data?.user || (response as any).user;
    
    // Store the token and user data
    if (response.success && token && user) {
      console.log("Login successful for user:", user.email);
      console.log("Token received:", token ? `${token.substring(0, 10)}...` : 'NO TOKEN');
      console.log("Token type and value:", { type: typeof token, value: token });
      
      // Additional validation for string "undefined"
      if (token === "undefined" || token === "null" || !token) {
        console.error("AuthService: Server returned invalid token value:", token);
        return {
          success: false,
          error: "Server returned invalid authentication token"
        };
      }
      
      try {
        this.setAuthData(token, user);
        console.log("Auth data stored successfully after login");
      } catch (error) {
        console.error("Failed to store auth data after login:", error);
        return {
          success: false,
          error: "Failed to store authentication data"
        };
      }
    } else {
      console.error("Login failed - missing token or user data:", {
        hasToken: !!token,
        hasUser: !!user,
        tokenValue: token,
        userValue: user,
        response: response
      });
    }

    return response;
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      userData
    );

    // Handle both possible response structures
    const token = response.data?.token || (response as any).token;
    const user = response.data?.user || (response as any).user;

    // Store the token and user data
    if (response.success && token && user) {
      console.log("Registration successful for user:", user.email);
      console.log("Token received:", token ? `${token.substring(0, 10)}...` : 'NO TOKEN');
      
      try {
        this.setAuthData(token, user);
        console.log("Auth data stored successfully after registration");
      } catch (error) {
        console.error("Failed to store auth data after registration:", error);
        return {
          success: false,
          error: "Failed to store authentication data"
        };
      }
    } else {
      console.error("Registration failed - missing token or user data:", {
        hasToken: !!token,
        hasUser: !!user,
        response: response
      });
    }

    return response;
  }
  async logout(): Promise<ApiResponse<void>> {
    console.log("Logging out user, clearing all stored data");

    // Clear all storage locations
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }

    return {
      success: true,
      message: "Logged out successfully",
    };
  }

  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    return apiClient.get<AuthUser>("/auth/me");
  }

  async forgotPassword(
    data: ForgotPasswordData
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>("/auth/forgot-password", data);
  }

  async verifyResetOTP(
    data: VerifyOTPData
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>("/auth/verify-reset-otp", data);
  }

  async resetPassword(
    data: ResetPasswordData
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>("/auth/reset-password", data);
  }

  async verifyEmail(
    data: VerifyEmailData
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.get<{ message: string }>(
      `/auth/verify-email/${data.token}`
    );
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post<{ token: string }>("/auth/refresh-token");
  } // OAuth methods
  async initiateGoogleAuth(): Promise<void> {
    window.location.href = `${this.baseURL}/auth/google`;
  }

  async googleLogin(credential: string): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>("/auth/google/verify", {
      credential: credential,
    });

    // Handle both possible response structures
    const token = response.data?.token || (response as any).token;
    const user = response.data?.user || (response as any).user;

    // Store the token and user data if successful
    if (response.success && token && user) {
      console.log("Google login successful for user:", user.email);
      console.log("Token received:", token ? `${token.substring(0, 10)}...` : 'NO TOKEN');
      
      try {
        this.setAuthData(token, user);
        console.log("Auth data stored successfully after Google login");
      } catch (error) {
        console.error("Failed to store auth data after Google login:", error);
        return {
          success: false,
          error: "Failed to store authentication data"
        };
      }
    } else {
      console.error("Google login failed - missing token or user data:", {
        hasToken: !!token,
        hasUser: !!user,
        response: response
      });
    }

    return response;
  }

  async initiateGitHubAuth(): Promise<void> {
    window.location.href = `${this.baseURL}/auth/github`;
  }
  // Token management
  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      const localToken = localStorage.getItem("auth_token");
      const sessionToken = sessionStorage.getItem("auth_token");
      
      console.log("Getting stored token:", { 
        localToken: localToken ? `${localToken.substring(0, 10)}...` : null,
        sessionToken: sessionToken ? `${sessionToken.substring(0, 10)}...` : null,
        localTokenType: typeof localToken,
        sessionTokenType: typeof sessionToken,
        localTokenValue: localToken,
        sessionTokenValue: sessionToken
      });
      
      // Prefer localStorage, fall back to sessionStorage
      const token = localToken || sessionToken;
      
      if (token === "undefined" || token === "null") {
        console.warn("AuthService: Found invalid token value:", token);
        this.clearStoredData();
        return null;
      }
      
      return token;
    } catch (error) {
      console.error("Error accessing stored token:", error);
      return null;
    }
  }

  getStoredUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        console.log("Getting stored user:", user.email);
        return user;
      }
    } catch (error) {
      console.error("Error accessing stored user:", error);
      localStorage.removeItem("user"); // Clear corrupted data
    }
    return null;
  }

  setAuthData(token: string, user: AuthUser): void {
    if (!token) {
      console.error("AuthService: Attempting to store empty/undefined token");
      throw new Error("Token is required for authentication");
    }
    
    // Additional validation to catch string "undefined"
    if (typeof token !== 'string' || token === "undefined" || token === "null" || token.length < 10) {
      console.error("AuthService: Invalid token format:", { token, type: typeof token, length: token?.length });
      throw new Error("Invalid token format received from server");
    }
    
    if (!user) {
      console.error("AuthService: Attempting to store empty/undefined user");
      throw new Error("User data is required for authentication");
    }

    try {
      console.log("AuthService: Storing auth data", { 
        hasToken: !!token, 
        tokenLength: token?.length || 0,
        tokenPreview: token.substring(0, 20) + "...",
        userEmail: user?.email 
      });
      
      // Clear any existing invalid data first
      this.clearStoredData();
      
      // Store synchronously
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Also store in sessionStorage as backup
      sessionStorage.setItem("auth_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      
      // Immediate verification
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("user");
      
      console.log("AuthService: Storage verification:", {
        storedToken: storedToken === token ? "✅ MATCH" : `❌ MISMATCH: expected "${token}", got "${storedToken}"`,
        storedUser: !!storedUser ? "✅ STORED" : "❌ MISSING",
        storedTokenType: typeof storedToken,
        storedTokenValue: storedToken
      });
      
      if (!storedToken || storedToken === "undefined" || storedToken !== token) {
        console.error("AuthService: Token storage failed - verification failed", {
          expected: token,
          actual: storedToken,
          type: typeof storedToken
        });
        throw new Error("Failed to store authentication token - verification failed");
      }
      
      if (!storedUser || storedUser === "undefined") {
        console.error("AuthService: User storage failed - user is undefined");
        throw new Error("Failed to store user data");
      }
      
      console.log("✅ AuthService: Auth data stored and verified successfully");
      
    } catch (error) {
      console.error("AuthService: Error storing auth data:", error);
      // Clean up any partially stored data
      this.clearStoredData();
      throw error;
    }
  }

  private clearStoredData(): void {
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing stored data:", error);
    }
  }
  async updateProfile(data: Partial<AuthUser>): Promise<ApiResponse<AuthUser>> {
    console.log("AuthService: Updating profile with data:", data);
    console.log("AuthService: Making PUT request to /v1/users/profile");

    const response = await apiClient.put<AuthUser>("/v1/users/profile", data);
    console.log("AuthService: Received response:", response);

    // Update stored user data
    if (response.success && response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("AuthService: Updated localStorage with new user data");
    }

    return response;
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>("/auth/update-password", {
      passwordCurrent: data.currentPassword,
      password: data.newPassword,
      passwordConfirm: data.newPassword,
    });
  }
}

export const authService = new AuthService();
export default authService;
