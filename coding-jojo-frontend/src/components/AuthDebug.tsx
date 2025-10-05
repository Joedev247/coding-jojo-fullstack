'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthDebug() {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white p-3  text-xs z-50 max-w-sm">
      <h4 className="font-bold mb-2">🐛 Auth Debug Info</h4>
      <div className="space-y-1">
        <p><strong>Loading:</strong> {isLoading.toString()}</p>
        <p><strong>Authenticated:</strong> {isAuthenticated.toString()}</p>
        <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
        <p><strong>User Name:</strong> {user?.name || 'N/A'}</p>
        <p><strong>User Email:</strong> {user?.email || 'N/A'}</p>
        <p><strong>User Role:</strong> {user?.role || 'N/A'}</p>
        <hr className="my-2" />
        <p><strong>Token (localStorage):</strong></p>
        <p className="text-xs break-all">
          {typeof window !== 'undefined' && localStorage.getItem('auth_token') 
            ? `${localStorage.getItem('auth_token')?.substring(0, 20)}...` 
            : 'None'
          }
        </p>
        <p><strong>Token (sessionStorage):</strong></p>
        <p className="text-xs break-all">
          {typeof window !== 'undefined' && sessionStorage.getItem('token') 
            ? `${sessionStorage.getItem('token')?.substring(0, 20)}...` 
            : 'None'
          }
        </p>
      </div>
    </div>
  );
}
