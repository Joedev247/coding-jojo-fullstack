"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService, CartItemWithCourse } from '../services/cartService';
import { Course } from '../types/courses';
import { useToast } from '../hooks/useToast';
import { useAuth } from './AuthContext';

// Local cart item interface (for localStorage)
interface LocalCartItem {
  course: Course;
  quantity: number;
  addedAt: string;
}

interface CartContextType {
  cartItems: LocalCartItem[];
  addToCart: (course: Course, quantity?: number) => Promise<void>;
  removeFromCart: (courseId: string) => void;
  updateQuantity: (courseId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  getCartTotal: () => number;
  getTotalItems: () => number;
  loading: boolean;
  syncWithServer: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<LocalCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();

  // Load cart data on mount and when authentication changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadCartData();
    }
  }, [isAuthenticated, user]);

  const loadCartData = async () => {
    if (isAuthenticated && user) {
      // User is authenticated, load from server
      await syncFromServer();
    } else {
      // User not authenticated, load from localStorage
      loadFromLocalStorage();
    }
    setIsInitialized(true);
  };

  const loadFromLocalStorage = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      localStorage.removeItem('cart'); // Clear corrupted data
    }
  };

  const syncFromServer = async () => {
    if (!isAuthenticated || !user) return;
    
    try {
      setLoading(true);
      const response = await cartService.getCart();
      
      if (response.success && response.data) {
        // Transform server response to local format
        const serverCartItems: LocalCartItem[] = response.data.items.map(item => ({
          course: {
            id: item.course._id,
            title: item.course.title,
            price: item.course.price,
            thumbnail: item.course.thumbnail,
            instructor: {
              name: item.course.instructor.name,
              id: item.course.instructor._id
            },
            // Add other required Course properties
            description: item.course.description || '',
            category: item.course.category,
            level: item.course.level,
            duration: item.course.duration,
            rating: item.course.rating,
            studentsEnrolled: item.course.studentsEnrolled
          } as Course,
          quantity: item.quantity,
          addedAt: item.addedAt
        }));
        
        setCartItems(serverCartItems);
        
        // Also sync with localStorage
        localStorage.setItem('cart', JSON.stringify(serverCartItems));
        console.log('Synced cart from server:', serverCartItems);
      }
    } catch (error) {
      console.warn('Failed to sync cart from server, using localStorage:', error);
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // Sync to server (only when authenticated)
  const syncToServer = async (localCartItems: LocalCartItem[]) => {
    if (!isAuthenticated || !user) return;

    // Save to localStorage anyway
    localStorage.setItem('cart', JSON.stringify(localCartItems));

    try {
      // Sync each item with server
      for (const item of localCartItems) {
        await cartService.addToCart(item.course.id, item.quantity);
      }
      console.log('Successfully synced cart to server');
    } catch (error) {
      console.warn('Failed to sync cart to server:', error);
    }
  };

  // Save cart to localStorage and optionally sync to server
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('Saved cart to localStorage:', cartItems);
    }
  }, [cartItems, isInitialized]);

  const addToCart = async (course: Course, quantity: number = 1): Promise<void> => {
    try {
      setLoading(true);

      // Check if course is already in cart
      const existingItemIndex = cartItems.findIndex(item => item.course.id === course.id);

      let updatedItems: LocalCartItem[];

      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast.success('Course updated in cart!', {
          description: `Quantity updated for "${course.title}"`
        });
      } else {
        // Add new item to cart
        const newCartItem: LocalCartItem = {
          course,
          quantity,
          addedAt: new Date().toISOString()
        };
        
        updatedItems = [...cartItems, newCartItem];
        
        toast.success('Course added to cart!', {
          description: `"${course.title}" has been added to your cart.`
        });
      }

      setCartItems(updatedItems);

      // Sync with database if authenticated
      if (isAuthenticated && user) {
        try {
          await cartService.addToCart(course.id, quantity);
          console.log('Successfully synced cart addition with database');
        } catch (apiError) {
          console.warn('Failed to sync cart addition with database:', apiError);
          toast.error('Added to cart but failed to sync with server', {
            description: 'Your cart is saved locally but may not sync across devices.'
          });
        }
      }

    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add course to cart', {
        description: 'Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (courseId: string): void => {
    try {
      const itemToRemove = cartItems.find(item => item.course.id === courseId);
      const updatedItems = cartItems.filter(item => item.course.id !== courseId);
      
      setCartItems(updatedItems);
      
      if (itemToRemove) {
        toast.success('Course removed from cart', {
          description: `"${itemToRemove.course.title}" has been removed from your cart.`
        });
      }

      // Sync with database if authenticated
      if (isAuthenticated && user) {
        cartService.removeFromCart(courseId).catch(error => {
          console.warn('Failed to sync cart removal with database:', error);
        });
      }

    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove course from cart');
    }
  };

  const updateQuantity = (courseId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }

    try {
      const updatedItems = cartItems.map(item =>
        item.course.id === courseId
          ? { ...item, quantity }
          : item
      );
      
      setCartItems(updatedItems);

      // Sync with database if authenticated
      if (isAuthenticated && user) {
        cartService.updateCartItem(courseId, quantity).catch(error => {
          console.warn('Failed to sync cart update with database:', error);
        });
      }

    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = (): void => {
    try {
      setCartItems([]);
      toast.info('Cart cleared', {
        description: 'All items have been removed from your cart.'
      });

      // Sync with database if authenticated
      if (isAuthenticated && user) {
        cartService.clearCart().catch(error => {
          console.warn('Failed to sync cart clear with database:', error);
        });
      }

    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const isInCart = (courseId: string): boolean => {
    return cartItems.some(item => item.course.id === courseId);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.course.price === 'number' ? item.course.price : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const syncWithServer = async (): Promise<void> => {
    if (isAuthenticated && user) {
      await syncFromServer();
    }
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartTotal,
    getTotalItems,
    loading,
    syncWithServer
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
