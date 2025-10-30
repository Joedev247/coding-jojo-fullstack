// Enhanced User Avatar component with fallback to initials and role indicators
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Crown, Award, Shield } from "lucide-react";

interface UserAvatarProps {
  user: {
    _id?: string;
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
    profilePicture?: string;
    role?: string;
  };
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showRole?: boolean;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
  className?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showRole = false,
  showOnlineStatus = false,
  isOnline = false,
  className = '',
  onClick
}) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return '?';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const displayName = user.username || user.name || user.email || 'Unknown';
  const avatarUrl = user.profilePicture || user.avatar;

  // Size configurations
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-xs',
    xl: 'w-16 h-16 text-lg'
  };

  const iconSizes = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3', 
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  // Get user role
  const getUserRole = () => {
    if (user.email?.includes('admin')) return 'admin';
    if (user.email?.includes('instructor')) return 'instructor';
    if (user.email?.includes('moderator') || user.role === 'moderator') return 'moderator';
    return 'member';
  };

  // Get role colors
  const getRoleColor = () => {
    const role = getUserRole();
    switch (role) {
      case 'admin':
        return 'border-purple-500 ring-purple-500/20';
      case 'instructor':
        return 'border-pink-500 ring-pink-500/20';
      case 'moderator':
        return 'border-blue-500 ring-blue-500/20';
      default:
        return 'border-gray-600 ring-gray-500/20';
    }
  };

  // Get role icon
  const getRoleIcon = () => {
    const role = getUserRole();
    const iconClass = iconSizes[size];
    switch (role) {
      case 'admin':
        return <Crown className={`${iconClass} text-purple-400`} />;
      case 'instructor':
        return <Award className={`${iconClass} text-pink-400`} />;
      case 'moderator':
        return <Shield className={`${iconClass} text-blue-400`} />;
      default:
        return null;
    }
  };

  // Get background color based on name for consistent colors
  const getInitialsColor = () => {
    if (!displayName) return 'bg-gray-600';
    const colors = [
      'bg-red-600',
      'bg-pink-600', 
      'bg-blue-600',
      'bg-yellow-600',
      'bg-purple-600',
      'bg-pink-600',
      'bg-indigo-600',
      'bg-orange-600',
    ];
    const index = displayName.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Check if user has a valid image
  const hasValidImage = () => {
    return avatarUrl && 
           typeof avatarUrl === 'string' &&
           avatarUrl !== '/api/placeholder/100/100' && 
           avatarUrl.trim() !== '' && 
           !imageError;
  };

  const baseClasses = `relative ${sizeClasses[size]} ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`;

  return (
    <div className={baseClasses} onClick={onClick}>
      {hasValidImage() ? (
        <div className={`${sizeClasses[size]} rounded-full border-2 ${showRole ? getRoleColor() : 'border-gray-600'} ${showRole ? 'ring-2 ring-offset-1 ring-offset-gray-900' : ''} overflow-hidden`}>
          <Image
            src={avatarUrl!}
            alt={displayName}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className={`${sizeClasses[size]} rounded-full border-2 ${showRole ? getRoleColor() : 'border-gray-600'} ${showRole ? 'ring-2 ring-offset-1 ring-offset-gray-900' : ''} ${getInitialsColor()} flex items-center justify-center font-medium text-white`}>
          {getInitials(displayName)}
        </div>
      )}

      {/* Online status indicator */}
      {showOnlineStatus && isOnline && (
        <div className={`absolute -bottom-0.5 -right-0.5 ${
          size === 'xs' ? 'w-2 h-2' : 
          size === 'sm' ? 'w-2.5 h-2.5' : 
          'w-3 h-3'
        } bg-blue-400 rounded-full border-2 border-gray-900`}></div>
      )}

      {/* Role icon */}
      {showRole && getRoleIcon() && (
        <div className={`absolute -top-1 -left-1 bg-gray-900 rounded-full ${
          size === 'xs' ? 'p-0.5' : 'p-1'
        }`}>
          {getRoleIcon()}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
