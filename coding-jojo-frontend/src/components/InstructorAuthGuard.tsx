'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import teacherService from '../services/teacherService';
import LoadingSpinner from './ui/LoadingSpinner';
import AnimatedBackground from './ui/AnimatedBackground';

interface InstructorAuthGuardProps {
  children: React.ReactNode;
  requireVerification?: boolean;
}

export default function InstructorAuthGuard({ children, requireVerification = false }: InstructorAuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = teacherService.isAuthenticated();
        
        if (!authStatus) {
          router.push('/instructor/login');
          return;
        }

        // If verification is required, check verification status
        if (requireVerification) {
          const teacherInfo = teacherService.getTeacherInfo();
          
          if (teacherInfo) {
            // Check if verification is complete
            if (!teacherInfo.emailVerified || !teacherInfo.phoneVerified || !teacherInfo.kycCompleted) {
              router.push('/instructor/verification');
              return;
            }
          } else {
            router.push('/instructor/verification');
            return;
          }
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth guard failed:', error);
        router.push('/instructor/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, requireVerification]);

  if (isLoading) {
    return (
      <div className="min-h-screen text-white relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg text-gray-300">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect, so don't render anything
  }

  return <>{children}</>;
}
