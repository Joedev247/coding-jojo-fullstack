'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

export default function AuthTest() {
  const { user, login, logout, isLoading, isAuthenticated } = useAuth();
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('password123');
  const [testResult, setTestResult] = useState<string>('');

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const testLogin = async () => {
    try {
      setTestResult('Testing login...');
      const result = await authService.login({ email: testEmail, password: testPassword });
      setTestResult(`Login successful: ${JSON.stringify(result)}`);
    } catch (error) {
      setTestResult(`Login failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testLogout = async () => {
    try {
      setTestResult('Testing logout...');
      await logout();
      setTestResult('Logout successful');
    } catch (error) {
      setTestResult(`Logout failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testTokenValidation = async () => {
    try {
      setTestResult('Testing token validation...');
      const result = await authService.getCurrentUser();
      setTestResult(`Current user: ${JSON.stringify(result)}`);
    } catch (error) {
      setTestResult(`Token validation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-pink-600 text-white p-4  text-sm z-50 max-w-md">
      <h4 className="font-bold mb-3">🧪 Auth Test Panel</h4>
      
      <div className="space-y-3">
        <div>
          <p><strong>Current Status:</strong></p>
          <p>Loading: {isLoading.toString()}</p>
          <p>Authenticated: {isAuthenticated.toString()}</p>
          <p>User: {user?.email || 'None'}</p>
        </div>

        <div>
          <p><strong>Test Credentials:</strong></p>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full p-1 text-black text-xs rounded mb-1"
            placeholder="Email"
          />
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            className="w-full p-1 text-black text-xs rounded"
            placeholder="Password"
          />
        </div>

        <div className="flex gap-1 flex-wrap">
          <button
            onClick={testLogin}
            className="px-2 py-1 bg-green-500 hover:bg-green-600 rounded text-xs"
            disabled={isLoading}
          >
            Test Login
          </button>
          <button
            onClick={testLogout}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-xs"
            disabled={isLoading}
          >
            Test Logout
          </button>
          <button
            onClick={testTokenValidation}
            className="px-2 py-1 bg-purple-500 hover:bg-purple-600 rounded text-xs"
            disabled={isLoading}
          >
            Test Token
          </button>
        </div>

        {testResult && (
          <div className="bg-black/20 p-2 rounded text-xs">
            <p><strong>Result:</strong></p>
            <p className="break-all">{testResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}
