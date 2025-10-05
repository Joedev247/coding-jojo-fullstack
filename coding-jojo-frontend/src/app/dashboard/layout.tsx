'use client';

import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import SimpleBreadcrumb from '../../components/dashboard/SimpleBreadcrumb';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white">
        <AnimatedBackground />      
        <Sidebar />
        <div className="md:pl-64">
          {/* Breadcrumb Navigation */}
          <SimpleBreadcrumb />
          
          <main className=" mx-auto p-4 relative z-10">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}