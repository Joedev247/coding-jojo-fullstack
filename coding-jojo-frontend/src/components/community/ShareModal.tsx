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
      color: 'bg-blue-600 hover:bg-blue-700',
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
      <div className="bg-white  shadow-xl max-w-md w-full border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-900">
            Share Post
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Post Preview */}
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
              {post.title}
            </h4>
            <p className="text-xs text-gray-600">
              by {post.author.username || post.author.email.split('@')[0]}
            </p>
          </div>

          {/* Copy Link */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Copy Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-2 py-1.5 border border-gray-300 rounded bg-gray-50 text-gray-900 text-xs focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center space-x-1"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Share Options */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Share on Social Media
            </label>
            <div className="grid grid-cols-2 gap-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option.name.toLowerCase(), option.url)}
                  disabled={isSharing}
                  className={`${option.color} text-white px-3 py-2 rounded text-xs transition-colors flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <option.icon className="w-3 h-3" />
                  <span className="text-xs font-medium">{option.name}</span>
                  <ExternalLink className="w-2 h-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
