"use client";

import React from 'react';
import { useParams } from 'next/navigation';

export default function PaymentPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800  shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Course Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Payment page for course ID: {courseId}
          </p>
          <div className="mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Payment functionality is under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
