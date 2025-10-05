'use client';

import React, { useState } from 'react';
import { 
  X, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link, 
  Mail, 
  MessageCircle,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    _id: string;
    title: string;
    content: string;
    author: {
      username?: string;
      email: string;
    };
  };
  onShare: (platform: string, data?: any) => Promise<void>;
}

export default function ShareModal({ isOpen, onClose, post, onShare }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  if (!isOpen) return null;

  const postUrl = `${window.location.origin}/community/post/${post._id}`;
  const shareText = `Check out this post: "${post.title}" by ${post.author.username || post.author.email}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = async (platform: string, url?: string) => {
    setIsSharing(true);
    try {
      if (url) {
        window.open(url, '_blank', 'width=600,height=400');
      }
      await onShare(platform, { postId: post._id, platform });
    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-pink-600 hover:bg-pink-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${shareText}\n\n${postUrl}`)}`
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800  shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Share Post
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Post Preview */}
          <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 ">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
              {post.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              by {post.author.username || post.author.email.split('@')[0]}
            </p>
          </div>

          {/* Copy Link */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Copy Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-blue-500 hover:bg-pink-600 text-white  transition-colors flex items-center space-x-1"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Share Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Share on Social Media
            </label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option.name.toLowerCase(), option.url)}
                  disabled={isSharing}
                  className={`${option.color} text-white px-4 py-3  transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{option.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200  transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
