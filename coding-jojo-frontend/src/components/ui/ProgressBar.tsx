"use client"

import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  showPercentage = false,
  size = 'md',
  color = 'primary',
  className = '',
  animated = true,
}) => {
  // Ensure value is between 0-100
  const progress = Math.max(0, Math.min(100, value));
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  const colorClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-yellow-400 to-amber-500',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div className={`w-full ${sizeClasses[size]} bg-gray-700 rounded-full overflow-hidden`}>
          <div
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${
              animated ? 'transition-all duration-500 ease-out' : ''
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {showPercentage && (
          <div className="text-xs text-gray-400 mt-1">
            {progress.toFixed(0)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;