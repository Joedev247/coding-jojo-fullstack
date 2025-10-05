"use client";

import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Post } from '../../services/communityApi';
import ShareModal from './ShareModal';

interface ShareButtonProps {
  post: Post;
  variant?: 'default' | 'compact' | 'icon-only';
  className?: string;
  showLabel?: boolean;
}

export default function ShareButton({ 
  post, 
  variant = 'default',
  className = '',
  showLabel = true 
}: ShareButtonProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  const getButtonClasses = () => {
    const baseClasses = "flex items-center transition-all duration-200 group";
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} space-x-1 text-gray-400 hover:text-pink-400 text-sm`;
      case 'icon-only':
        return `${baseClasses} text-gray-400 hover:text-pink-400 p-2  hover:bg-gray-800`;
      default:
        return `${baseClasses} space-x-1.5 text-gray-400 hover:text-pink-400`;
    }
  };

  const getIconClasses = () => {
    const baseClasses = "transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 group-hover:stroke-pink-400";
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} w-4 h-4`;
      case 'icon-only':
        return `${baseClasses} w-5 h-5`;
      default:
        return `${baseClasses} w-5 h-5`;
    }
  };

  return (
    <>
      <button
        onClick={() => setShowShareModal(true)}
        className={`${getButtonClasses()} ${className}`}
        aria-label="Share post"
        title="Share this post"
      >
        <Share2 className={getIconClasses()} />
        {showLabel && variant !== 'icon-only' && (
          <span className={variant === 'compact' ? 'text-xs' : ''}>
            Share
          </span>
        )}
      </button>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        post={post}
      />
    </>
  );
}
