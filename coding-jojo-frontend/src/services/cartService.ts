import { apiClient, ApiResponse } from '../lib/api';

// Cart Service
export interface CartItem {
  course: string; // courseId for API
  quantity: number;
  price: number;
}

// Extended cart item for API responses with populated course data
export interface CartItemWithCourse {
  course: {
    _id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    instructor: {
      _id: string;
      name: string;
      avatarUrl?: string;
    };
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration?: string;
    price: number;
    rating?: number;
    studentsEnrolled?: number;
  };
  quantity: number;
  addedAt: string;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

// Full cart response with populated course data
export interface CartResponse {
  items: CartItemWithCourse[];
  summary: CartSummary;
}

class CartService {
  // Get cart
  async getCart(): Promise<ApiResponse<CartResponse>> {
    try {
      console.log('Fetching cart from database...');
      return await apiClient.get<CartResponse>('/cart');
    } catch (error) {
      console.error('Cart service - getCart error:', error);
      throw error;
    }
  }

  // Add to cart
  async addToCart(courseId: string, quantity = 1): Promise<ApiResponse<{ message: string }>> {
    try {
      console.log('Adding to cart via database:', { courseId, quantity });
      return await apiClient.post<{ message: string }>('/cart/add', { courseId, quantity });
    } catch (error) {
      console.error('Cart service - addToCart error:', error);
      throw error;
    }
  }

  // Update cart item
  async updateCartItem(courseId: string, quantity: number): Promise<ApiResponse<{ message: string }>> {
    try {
      console.log('Updating cart item in database:', { courseId, quantity });
      return await apiClient.put<{ message: string }>(`/cart/update/${courseId}`, { quantity });
    } catch (error) {
      console.error('Cart service - updateCartItem error:', error);
      throw error;
    }
  }

  // Remove from cart
  async removeFromCart(courseId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      console.log('Removing from cart in database:', { courseId });
      return await apiClient.delete<{ message: string }>(`/cart/remove/${courseId}`);
    } catch (error) {
      console.error('Cart service - removeFromCart error:', error);
      throw error;
    }
  }

  // Clear cart
  async clearCart(): Promise<ApiResponse<{ message: string }>> {
    try {
      console.log('Clearing cart in database...');
      return await apiClient.delete<{ message: string }>('/cart/clear');
    } catch (error) {
      console.error('Cart service - clearCart error:', error);
      throw error;
    }
  }

  // Get cart summary
  async getCartSummary(): Promise<ApiResponse<CartResponse>> {
    try {
      console.log('Getting cart summary from database...');
      return await apiClient.get<CartResponse>('/cart/summary');
    } catch (error) {
      console.error('Cart service - getCartSummary error:', error);
      throw error;
    }
  }
}

export const cartService = new CartService();
