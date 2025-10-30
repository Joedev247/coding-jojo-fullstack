// API Configuration and Base Client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    current: number;
    total: number;
    count: number;
    totalPosts?: number;
    totalMembers?: number;
  };
}

// API Client Configuration
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('auth_token');
      const sessionToken = sessionStorage.getItem('auth_token');
      
      // Check for explicitly undefined values stored as strings
      if (localToken === "undefined" || localToken === "null") {
        console.warn("API Client: Removing invalid localStorage token:", localToken);
        localStorage.removeItem('auth_token');
      }
      
      if (sessionToken === "undefined" || sessionToken === "null") {
        console.warn("API Client: Removing invalid sessionStorage token:", sessionToken);
        sessionStorage.removeItem('auth_token');
      }
      
      const token = (localToken && localToken !== "undefined" && localToken !== "null") ? localToken : 
                   (sessionToken && sessionToken !== "undefined" && sessionToken !== "null") ? sessionToken : null;
      
      if (!token) {
        console.log("API Client: No valid auth token found");
      }
      
      return token;
    }
    return null;
  }

  private getHeaders(): Record<string, string> {
    const headers = { ...this.defaultHeaders };
    const token = this.getAuthToken();
    
    if (token && token !== "undefined" && token !== "null") {
      headers.Authorization = `Bearer ${token}`;
      console.log("API Client: Adding authorization header with token:", `${token.substring(0, 10)}...`);
    } else {
      console.log("API Client: No valid token available for authorization header");
    }
    
    return headers;
  }  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data;
    
    try {
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        
        // Debug logging for auth endpoints
        const url = response.url;
        if (url.includes('/auth/login')) {
          console.log("🔍 API Client: Raw login response:", {
            status: response.status,
            ok: response.ok,
            data: data,
            token: data?.token,
            tokenType: typeof data?.token,
            tokenValue: data?.token,
            isUndefinedString: data?.token === "undefined"
          });
        }
        
      } else {
        data = await response.text();
      }
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      return {
        success: false,
        error: 'Failed to parse server response'
      };
    }

    if (!response.ok) {
      // Return error response instead of throwing
      return {
        success: false,
        error: data?.message || data?.error || `HTTP Error: ${response.status}`,
        message: data?.message || `Request failed with status ${response.status}`
      };
    }

    // If the response is already in our ApiResponse format, return it
    if (data && typeof data === 'object' && 'success' in data) {
      return data as ApiResponse<T>;
    }

    // Otherwise, wrap it in our ApiResponse format
    return {
      success: true,
      data: data as T,
    } as ApiResponse<T>;
  }  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      const url = new URL(`${this.baseURL}${endpoint}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PUT request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('DELETE request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PATCH request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Utility types for API responses
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    current: number;
    total: number;
    count: number;
    totalPosts?: number;
    totalMembers?: number;
  };
}

// Export the API client as default
export default apiClient;
