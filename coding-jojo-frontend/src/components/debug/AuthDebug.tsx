'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthDebug() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4  text-xs font-mono z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>
          <strong>isLoading:</strong> {isLoading ? 'true' : 'false'}
        </div>
        <div>
          <strong>isAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}
        </div>
        <div>
          <strong>user:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}
        </div>
        <div>
          <strong>localStorage token:</strong> {typeof window !== 'undefined' ? (localStorage.getItem('auth_token') ? 'exists' : 'missing') : 'N/A'}
        </div>
        <div>
          <strong>sessionStorage token:</strong> {typeof window !== 'undefined' ? (sessionStorage.getItem('token') ? 'exists' : 'missing') : 'N/A'}
        </div>
      </div>
    </div>
  );
}
