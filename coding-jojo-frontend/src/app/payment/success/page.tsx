"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800  shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-blue-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your payment has been processed successfully. You can now access your purchased course.
        </p>
        <div className="space-y-3">
          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4  transition-colors">
            Go to Dashboard
          </button>
          <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4  transition-colors">
            View Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
