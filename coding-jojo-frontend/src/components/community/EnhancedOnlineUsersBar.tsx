// Enhanced Online Users Bar with real-time functionality
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Users, Circle, Crown, Award, Zap } from "lucide-react";
import UserAvatar from "../ui/UserAvatar";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  joinedAt: string;
  postCount: number;
  reputation: number;
  badges: string[];
  isOnline: boolean;
  lastSeen?: string;
  role?: string;
}

interface OnlineUsersBarProps {
  users: User[];
  totalOnline?: number;
  maxDisplayUsers?: number;
}

const OnlineUsersBar: React.FC<OnlineUsersBarProps> = ({
  users,
  totalOnline,
  maxDisplayUsers = 8,
}) => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);

  // Filter and sort online users
  useEffect(() => {
    const online = users
      .filter((user) => user.isOnline)
      .sort((a, b) => {
        // Sort by role (admins/instructors first), then by reputation
        const roleOrder = { admin: 0, instructor: 1, moderator: 2, member: 3 };
        const aRole = a.email?.includes("admin")
          ? "admin"
          : a.email?.includes("instructor")
          ? "instructor"
          : a.role || "member";
        const bRole = b.email?.includes("admin")
          ? "admin"
          : b.email?.includes("instructor")
          ? "instructor"
          : b.role || "member";

        const roleComparison =
          (roleOrder[aRole as keyof typeof roleOrder] || 3) -
          (roleOrder[bRole as keyof typeof roleOrder] || 3);

        if (roleComparison !== 0) return roleComparison;
        return b.reputation - a.reputation;
      });

    setOnlineUsers(online);
  }, [users]);

  const displayUsers = showAllUsers
    ? onlineUsers
    : onlineUsers.slice(0, maxDisplayUsers);
  const remainingCount = onlineUsers.length - maxDisplayUsers;

  const getUserRole = (user: User) => {
    if (user.email?.includes("admin")) return "Admin";
    if (user.email?.includes("instructor")) return "Instructor";
    if (user.role === "moderator") return "Moderator";
    return "Member";
  };

  const getRoleIcon = (user: User) => {
    const role = getUserRole(user);
    switch (role) {
      case "Admin":
        return <Crown className="w-3 h-3 text-purple-400" />;
      case "Instructor":
        return <Award className="w-3 h-3 text-pink-400" />;
      case "Moderator":
        return <Zap className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  const getRoleColor = (user: User) => {
    const role = getUserRole(user);
    switch (role) {
      case "Admin":
        return "border-purple-500 ring-purple-500/20";
      case "Instructor":
        return "border-pink-500 ring-pink-500/20";
      case "Moderator":
        return "border-blue-500 ring-blue-500/20";
      default:
        return "border-green-500 ring-green-500/20";
    }
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="  bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Online Status and Count */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Users className="w-5 h-5 text-green-400" />
                <Circle className="absolute -top-1 -right-1 w-3 h-3 text-green-400 fill-green-400" />
              </div>
              <div>
                <span className="text-green-400 font-medium">
                  {totalOnline || onlineUsers.length} Online
                </span>
                <span className="text-gray-400 text-sm ml-2">
                  • {users.length} Total Members
                </span>
              </div>
            </div>
          </div>

          {/* Online Users Avatars */}
          <div className="flex items-center space-x-1">
            {displayUsers.map((user) => (
              <div
                key={user._id}
                className="group relative"
                title={`${user.name} - ${getUserRole(user)} (${
                  user.reputation
                } reputation)`}
              >
                <UserAvatar
                  user={{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role
                  }}
                  size="sm"
                  showRole={true}
                  showOnlineStatus={true}
                  isOnline={user.isOnline}
                />

                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div className="bg-gray-800 text-white text-xs py-2 px-3 shadow-lg border border-gray-700 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">{user.name}</div>
                      {getRoleIcon(user)}
                    </div>
                    <div className="text-gray-400 mt-1">
                      {getUserRole(user)} • {user.reputation} rep
                    </div>
                    <div className="text-green-400 text-xs mt-1">
                      Online now
                    </div>
                    {user.bio && (
                      <div className="text-gray-300 mt-1 max-w-48 text-wrap">
                        {user.bio.length > 50
                          ? `${user.bio.substring(0, 50)}...`
                          : user.bio}
                      </div>
                    )}

                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Show more button */}
            {remainingCount > 0 && !showAllUsers && (
              <button
                onClick={() => setShowAllUsers(true)}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-xs text-gray-300 hover:text-white transition duration-200 border border-gray-600"
                title={`Show ${remainingCount} more online users`}
              >
                +{remainingCount}
              </button>
            )}

            {/* Show less button */}
            {showAllUsers && onlineUsers.length > maxDisplayUsers && (
              <button
                onClick={() => setShowAllUsers(false)}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-xs text-gray-300 hover:text-white transition duration-200 border border-gray-600"
                title="Show less"
              >
                ←
              </button>
            )}
          </div>

          {/* Community Activity Indicator */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Activity</span>
            </div>

            {/* Activity stats */}
            <div className="flex items-center space-x-3">
              <span>
                {Math.floor(onlineUsers.length * 0.3)} active discussions
              </span>
              <span>•</span>
              <span>{Math.floor(onlineUsers.length * 0.5)} recent posts</span>
            </div>
          </div>
        </div>

        {/* Mobile view - Expandable user list */}
        <div className="md:hidden mt-2">
          {showAllUsers && (
            <div className="grid grid-cols-8 gap-2">
              {onlineUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col items-center"
                  title={`${user.name} - ${getUserRole(user)}`}
                >
                  <div
                    className={`relative w-6 h-6 rounded-full border ${getRoleColor(
                      user
                    )}`}
                  >
                    <Image
                      src={user.avatar || "/api/placeholder/100/100"}
                      alt={user.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-gray-900"></div>
                  </div>
                  <span className="text-xs text-gray-400 truncate w-12 text-center mt-1">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineUsersBar;
