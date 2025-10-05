"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ToastContextType {
  success: (message: string, options?: any) => any;
  error: (message: string, options?: any) => any;
  warning: (message: string, options?: any) => any;
  info: (message: string, options?: any) => any;
  loading: (message: string, options?: any) => any;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => any;
  dismiss: (toastId?: string | number) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const value: ToastContextType = {
    success: (message, options) => mounted ? toast.success(message, options) : Promise.resolve(),
    error: (message, options) => mounted ? toast.error(message, options) : Promise.resolve(),
    warning: (message, options) => mounted ? toast.warning(message, options) : Promise.resolve(),
    info: (message, options) => mounted ? toast.info(message, options) : Promise.resolve(),
    loading: (message, options) => mounted ? toast.loading(message, options) : Promise.resolve(),
    promise: (promise, messages) => mounted ? toast.promise(promise, messages) : Promise.resolve(),
    dismiss: (toastId) => mounted ? toast.dismiss(toastId) : undefined,
    dismissAll: () => mounted ? toast.dismiss() : undefined,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

// Also export the direct hook for flexibility
export { useToast } from '../hooks/useToast';
