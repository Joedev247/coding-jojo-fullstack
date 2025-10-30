'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import InstructorSidebar from '../../components/instructor/InstructorSidebar';
import InstructorBreadcrumb from '../../components/instructor/InstructorBreadcrumb';
import InstructorProtectedRoute from '../../components/auth/InstructorProtectedRoute';

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Pages that should not have sidebar (landing pages)
  const noSidebarPages = [
    '/instructor',
    '/instructor/instructor-courses',
    '/instructor/login',
    '/instructor/register',
    '/instructor/verification'
  ];

  const shouldShowSidebar = !noSidebarPages.includes(pathname);

  // If no sidebar should be shown, return children directly
  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  return (
    <InstructorProtectedRoute>
      <div className="min-h-screen text-white">
        <InstructorSidebar onCollapseChange={setIsSidebarCollapsed} />
        <div className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:pl-14' : 'md:pl-56'
        }`}>
          {/* Breadcrumb Navigation */}
          <InstructorBreadcrumb />
          
          <main className="mx-auto p-4 relative z-10">
            {children}
          </main>
        </div>
      </div>
    </InstructorProtectedRoute>
  );
}
