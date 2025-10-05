'use client';

import { useEffect, useState } from 'react';
import teacherService from '../../../services/teacherService';

export default function AuthDebugPage() {
  const [authState, setAuthState] = useState<any>(null);

  useEffect(() => {
    const checkAuthState = () => {
      const isAuth = teacherService.isAuthenticated();
      const teacherInfo = teacherService.getTeacherInfo();
      const token = localStorage.getItem('teacher_token');
      
      setAuthState({
        isAuthenticated: isAuth,
        teacherInfo,
        hasToken: !!token,
        tokenPreview: token ? token.substring(0, 30) + '...' : null,
        localStorage: {
          teacher_token: localStorage.getItem('teacher_token') ? 'EXISTS' : 'MISSING',
          teacher_info: localStorage.getItem('teacher_info') ? 'EXISTS' : 'MISSING'
        },
        sessionStorage: {
          teacher_token: sessionStorage.getItem('teacher_token') ? 'EXISTS' : 'MISSING',
          teacher_info: sessionStorage.getItem('teacher_info') ? 'EXISTS' : 'MISSING'
        }
      });
    };

    checkAuthState();
    // Update every 2 seconds for real-time debugging
    const interval = setInterval(checkAuthState, 2000);
    return () => clearInterval(interval);
  }, []);

  const clearStorage = () => {
    localStorage.removeItem('teacher_token');
    localStorage.removeItem('teacher_info');
    sessionStorage.removeItem('teacher_token');
    sessionStorage.removeItem('teacher_info');
    window.location.reload();
  };

  const testLogin = async () => {
    try {
      // Replace with actual test credentials
      const response = await teacherService.login({
        email: 'test@example.com',
        password: 'testpassword'
      });
      alert('Login test result: ' + JSON.stringify(response, null, 2));
    } catch (error) {
      alert('Login test failed: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Authentication Debug Panel</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 ">
            <h2 className="text-xl font-semibold mb-4">Auth State</h2>
            <pre className="text-sm overflow-auto bg-gray-700 p-4 rounded">
              {JSON.stringify(authState, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-800 p-6 ">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
              >
                🔄 Refresh Auth State
              </button>
              
              <button
                onClick={clearStorage}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                🗑️ Clear All Storage
              </button>

              <button
                onClick={testLogin}
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                🧪 Test Login (Update credentials in code)
              </button>

              <button
                onClick={() => window.location.href = '/instructor/login'}
                className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                🔑 Go to Login
              </button>

              <button
                onClick={() => window.location.href = '/instructor/instructor-courses'}
                className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
              >
                📚 Try Instructor Courses
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-6 ">
          <h2 className="text-xl font-semibold mb-4">Console Logs</h2>
          <div className="text-sm text-gray-300">
            <p>• Check browser console for detailed authentication logs</p>
            <p>• TeacherService now logs login responses and storage operations</p>
            <p>• InstructorProtectedRoute logs authentication checks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
