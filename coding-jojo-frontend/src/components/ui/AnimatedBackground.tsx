'use client';

import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* White gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-white" />
      
      {/* Background Boxes */}
      <div className="absolute inset-0 opacity-30">
      </div>
      
      {/* Additional overlay for better readability */}
      <div className="absolute inset-0 bg-white/50" />
      
      {/* Floating orbs - blue theme */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/3 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-600/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Subtle top gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-50/10" />
    </div>
  );
};

export default AnimatedBackground;