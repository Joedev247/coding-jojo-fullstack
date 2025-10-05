"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Copy, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle,
  Mail,
  Link,
  Check,
  QrCode,
  TrendingUp
} from 'lucide-react';
import { Post } from '../../services/communityApi';
import { ShareAnalyticsService, shareUtils } from '../../services/shareService';
import { useToast } from '../../hooks/useToast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

export default function ShareModal({ isOpen, onClose, post }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const postUrl = `${window.location.origin}/community/posts/${post._id}`;
  const shareTitle = post.title;
  const shareDescription = post.excerpt || post.content.substring(0, 150) + '...';
  const siteName = 'CodingJojo';

  // Use enhanced share utilities
  const shareLinks = shareUtils.getShareUrls(post, window.location.origin);

  const copyToClipboard = async () => {
    const success = await shareUtils.copyToClipboard(postUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Success', { description: 'Link copied to clipboard!' });
      // Track analytics
      ShareAnalyticsService.trackShare(post._id, 'clipboard');
    } else {
      toast.error('Error', { description: 'Failed to copy link to clipboard' });
    }
  };

  const openShareWindow = (url: string, platform: string) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      url,
      'shareWindow',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    // Show success message
    toast.success('Success', { 
      description: `Sharing to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!` 
    });

    // Track analytics
    ShareAnalyticsService.trackShare(post._id, platform);
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-pink-600 hover:bg-pink-700',
      url: shareLinks.facebook,
      platform: 'facebook'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: shareLinks.twitter,
      platform: 'twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: shareLinks.linkedin,
      platform: 'linkedin'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      url: shareLinks.whatsapp,
      platform: 'whatsapp'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: shareLinks.email,
      platform: 'email',
      isEmail: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900  border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Share Post</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1  hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b border-gray-700">
          <div className="bg-gray-800/50  p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{post.author.name}</p>
                <p className="text-xs text-gray-400">CodingJojo Community</p>
              </div>
            </div>
            <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">
              {post.title}
            </h4>
            <p className="text-gray-400 text-xs line-clamp-2">
              {shareDescription}
            </p>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-800  p-3 border border-gray-700">
              <p className="text-sm text-gray-300 truncate">{postUrl}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className={`flex items-center space-x-2 px-4 py-3  transition-all duration-200 ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-pink-600 hover:bg-pink-700 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Social Media Options */}
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Share to social media</h4>
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.name}
                  onClick={() => {
                    if (option.isEmail) {
                      window.location.href = option.url;
                      toast.success('Success', { description: 'Opening email client...' });
                      ShareAnalyticsService.trackShare(post._id, option.platform);
                    } else {
                      openShareWindow(option.url, option.platform);
                    }
                  }}
                  className={`flex items-center space-x-3 p-3  ${option.color} text-white transition-all duration-200 hover:scale-105 active:scale-95`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{option.name}</span>
                </button>
              );
            })}
          </div>

          {/* Additional Share Options */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  openShareWindow(shareLinks.reddit, 'reddit');
                }}
                className="flex items-center justify-center space-x-2 p-3  bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200"
              >
                <div className="w-5 h-5 bg-white rounded text-orange-600 flex items-center justify-center text-xs font-bold">
                  r
                </div>
                <span className="font-medium">Reddit</span>
              </button>
              
              <button
                onClick={() => {
                  openShareWindow(shareLinks.telegram, 'telegram');
                }}
                className="flex items-center justify-center space-x-2 p-3  bg-blue-500 hover:bg-pink-600 text-white transition-all duration-200"
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-500 text-xs font-bold">T</span>
                </div>
                <span className="font-medium">Telegram</span>
              </button>
            </div>
          </div>

          {/* Native Share (Mobile) */}
          {shareUtils.supportsNativeShare() && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={async () => {
                  const success = await shareUtils.nativeShare({
                    title: shareTitle,
                    text: shareDescription,
                    url: postUrl,
                  });
                  
                  if (success) {
                    toast.success('Success', { description: 'Content shared successfully!' });
                    ShareAnalyticsService.trackShare(post._id, 'native');
                  }
                }}
                className="w-full flex items-center justify-center space-x-2 p-3  bg-gradient-to-r from-pink-600 to-orange-600 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-200"
              >
                <Link className="w-5 h-5" />
                <span className="font-medium">More sharing options</span>
              </button>
            </div>
          )}

          {/* QR Code Section */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full flex items-center justify-center space-x-2 p-2  text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              <QrCode className="w-4 h-4" />
              <span className="text-sm">{showQR ? 'Hide' : 'Show'} QR Code</span>
            </button>
            
            {showQR && (
              <div className="mt-3 flex flex-col items-center space-y-2">
                <Image 
                  src={shareUtils.generateQRCode(postUrl)}
                  alt="QR Code for post"
                  width={128}
                  height={128}
                  className="border border-gray-700 "
                />
                <p className="text-xs text-gray-400 text-center">
                  Scan with camera to open post
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Info */}
        <div className="px-4 pb-4">
          <div className="bg-gray-800/30  p-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Post engagement</span>
              <div className="flex items-center space-x-4">
                <span>{post.likeCount} likes</span>
                <span>{post.commentCount} comments</span>
                <span>{post.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
