"use client"

import React from 'react';
import Image from 'next/image';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  textClassName?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  text,
  textClassName = ''
}) => {  // Container dimensions - outer boundary
  const containerSizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
  };

  // Primary ring dimensions - outer ring
  const ringSizeClasses = {
    xs: 'w-4 h-4 border-[1px]',
    sm: 'w-12 h-12 border-2',
    md: 'w-20 h-20 border-3',
    lg: 'w-24 h-24 border-4',
    xl: 'w-36 h-36 border-5'
  };

  // Secondary ring dimensions - inner ring
  const secondaryRingClasses = {
    xs: 'w-3 h-3 border-[0.5px]',
    sm: 'w-8 h-8 border-[1.5px]',
    md: 'w-14 h-14 border-2',
    lg: 'w-16 h-16 border-3',
    xl: 'w-26 h-26 border-4'
  };

  // Logo container dimensions - fits inside secondary ring
  const logoContainerClasses = {
    xs: 'w-2 h-2',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20'
  };

  // Image pixel dimensions - actual image size
  const imageSizes = {
    xs: 8,
    sm: 24,
    md: 40,
    lg: 48,
    xl: 80
  };
  return (
    
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${containerSizeClasses[size]} flex items-center justify-center`}>
        {/* Primary animated ring - outermost */}
        <div className={`absolute inset-0 ${ringSizeClasses[size]} border-pink-500/20 border-t-pink-500 border-r-pink-500/70 border-b-pink-500/50 border-l-pink-500/80 rounded-full animate-spin shadow-lg shadow-pink-500/25`}></div>
        
        {/* Secondary ring - inner ring with counter rotation */}
        <div 
          className={`absolute inset-0 flex items-center justify-center`}
        >
          <div className={`${secondaryRingClasses[size]} border-orange-500/30 border-t-orange-500/70 border-r-orange-500/50 border-b-orange-500 border-l-orange-500/60 rounded-full animate-spin`} 
               style={{ animationDirection: 'reverse', animationDuration: '2.5s' }}>
          </div>
        </div>
        
        {/* Platform logo - perfectly centered within both rings */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div className={`${logoContainerClasses[size]} flex items-center justify-center`}>
            <Image
              src="/loading-spinner.png"
              alt="Loading..."
              width={imageSizes[size]}
              height={imageSizes[size]}
              className="object-contain animate-pulse filter blur-[0.3px] drop-shadow-md"
              priority
            />
          </div>
        </div>
        
        {/* Subtle glow effect */}
        <div className={`absolute inset-0 ${containerSizeClasses[size]} rounded-full bg-gradient-to-r from-pink-500/5 to-orange-500/5 animate-pulse`}></div>
      </div>
      
      {text && (
        <p className={`mt-4 text-gray-300 animate-pulse text-sm font-medium tracking-wide ${textClassName}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
