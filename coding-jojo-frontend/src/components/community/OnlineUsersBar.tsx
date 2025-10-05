"use client";

import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  lastActive: string;
}

interface OnlineUsersBarProps {
  members: Member[];
}

const UserAvatar: React.FC<{ user: { name?: string; avatarUrl?: string } }> = ({ user }) => {
  const getInitials = (name: string) => {
    return name?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';
  };

  const displayName = user.name || 'Unknown';

  if (user.avatarUrl && typeof user.avatarUrl === 'string' && user.avatarUrl.trim()) {
    return (
      <img
        src={user.avatarUrl}
        alt={displayName}
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex');
        }}
      />
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
      {getInitials(displayName)}
    </div>
  );
};

export default function OnlineUsersBar({ members }: OnlineUsersBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get online members - check for isOnline property or recent lastActive
  const onlineMembers = members.filter((member) => {
    if (member.lastActive === "Online now") return true;
    
    // Check if user was active in last 15 minutes
    if (member.lastActive) {
      const lastActiveTime = new Date(member.lastActive);
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      return lastActiveTime > fifteenMinutesAgo;
    }
    
    return false;
  });
  
  const otherMembers = members.filter((member) => !onlineMembers.includes(member));

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[90px] md:top-[84px] z-40   bg-gray-900/70 py-3 px-4 backdrop-blur-md">
      <div className="max-w-[1400] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 mr-4 hidden md:block">
            <span className="text-sm text-gray-400 flex items-center font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Online Now:
            </span>
          </div>

          {/* Left scroll button - visible only when needed */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 p-1  bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all mr-2"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Scrollable container for online users */}
          <div
            ref={scrollContainerRef}
            className="flex items-center overflow-x-auto scrollbar-hide flex-grow"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {onlineMembers.map((member) => (
              <div
                key={member.id}
                className="relative group flex-shrink-0 mx-1"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-8 h-8">
                    <div className="w-8 h-8 border-2 border-green-500 rounded-full transition-transform hover:scale-110">
                      <UserAvatar user={{ name: member.name, avatarUrl: member.avatarUrl }} />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black"></span>
                  </div>
                  <span className="text-xs text-gray-300 mt-1 whitespace-nowrap">
                    {member.name.split(" ")[0]}
                  </span>
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2   bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                  {member.name}
                </div>
              </div>
            ))}
            {otherMembers.length > 0 && (
              <div className="w-8 h-8 rounded-full  bg-gray-900 border-2 border-gray-700 flex items-center justify-center text-xs text-gray-300 font-medium flex-shrink-0 mx-1">
                +{otherMembers.length}
              </div>
            )}
          </div>

          {/* Right scroll button - visible only when needed */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 p-1  bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all ml-2"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="hidden md:flex items-center space-x-2 ml-2 flex-shrink-0">
            <span className="text-xs text-gray-400">Total online:</span>
            <span className="text-xs font-medium text-green-400">
              {onlineMembers.length} members
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
