'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../ui/LoadingSpinner';
import AnimatedBackground from '../ui/AnimatedBackground';

interface InstructorProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const InstructorProtectedRoute: React.FC<InstructorProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/instructor/login'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkInstructorAuth = () => {
      try {
        // Check for instructor token in both localStorage and sessionStorage
        const token = localStorage.getItem('teacher_token') || sessionStorage.getItem('teacher_token');
        const instructorInfo = localStorage.getItem('teacher_info') || sessionStorage.getItem('teacher_info');

        console.log('InstructorProtectedRoute: Checking auth', {
          hasToken: !!token,
          hasInstructorInfo: !!instructorInfo,
          tokenPreview: token ? `${token.substring(0, 10)}...` : 'NO TOKEN'
        });

        if (token && instructorInfo) {
          try {
            const parsedInstructor = JSON.parse(instructorInfo);
            setInstructor(parsedInstructor);
            setIsAuthenticated(true);
            console.log('InstructorProtectedRoute: Instructor authenticated', parsedInstructor.email || parsedInstructor.name);
          } catch (error) {
            console.error('InstructorProtectedRoute: Error parsing instructor info', error);
            // Clear invalid data
            localStorage.removeItem('teacher_token');
            localStorage.removeItem('teacher_info');
            sessionStorage.removeItem('teacher_token');
            sessionStorage.removeItem('teacher_info');
            setIsAuthenticated(false);
          }
        } else {
          console.log('InstructorProtectedRoute: No instructor authentication found');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('InstructorProtectedRoute: Error checking authentication', error);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkInstructorAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('InstructorProtectedRoute: Redirecting to login');
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="z-10">
          <LoadingSpinner size="sm" text="Verifying instructor access..." />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="z-10 text-center">
          <LoadingSpinner size="sm" text="Redirecting to instructor login..." />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default InstructorProtectedRoute;
