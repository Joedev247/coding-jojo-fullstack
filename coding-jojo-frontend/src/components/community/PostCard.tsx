"use client";

import React, { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import UserAvatar from "../ui/UserAvatar";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface PostCardProps {
  post: Post;
  handleLikePost: (postId: string) => void;
}

export default function PostCard({ post, handleLikePost }: PostCardProps) {
  const [showOptions, setShowOptions] = useState(false);

  const handleMoreOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition duration-300 group">
      <div className="flex items-center space-x-2.5 mb-3">
        <div className="relative w-9 h-9">
          <Image
            src={post.author.avatarUrl}
            alt={post.author.name}
            fill
            className="rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
          />
          {post.author.role === "Instructor" && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-blue-600 rounded-full p-1 border-2 border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-medium text-gray-700 text-sm">{post.author.name}</h4>
            {post.author.role === "Instructor" && (
              <span className="ml-2 bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium border border-blue-200">
                Instructor
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Posted in{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              {post.category}
            </button>{" "}
            • {post.createdAt}
          </p>
        </div>
      </div>
      <button className="block group w-full text-left">
        <h3 className="text-lg font-semibold text-gray-800 mb-1.5 group-hover:text-blue-600 transition duration-200">
          {post.title}
        </h3>
      </button>
      <p className="text-gray-600 mb-3 line-clamp-3 text-sm">{post.content}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.map((tag: string, index: number) => (
          <button
            key={index}
            className="bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 text-xs px-2 py-0.5 rounded-full transition duration-200"
          >
            #{tag}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => handleLikePost(post.id)}
            className={`flex items-center space-x-1 text-sm ${
              post.isLiked
                ? "text-blue-600 font-medium"
                : "text-gray-500 hover:text-blue-600"
            } transition duration-200 group`}
            aria-label={post.isLiked ? "Unlike" : "Like"}
          >
            <ThumbsUp
              className={`w-4 h-4 ${
                post.isLiked
                  ? "fill-blue-600 stroke-blue-600"
                  : "group-hover:stroke-blue-600"
              } transition-all duration-200 transform group-hover:scale-110 group-active:scale-95`}
            />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition duration-200 group">
            <MessageCircle className="w-4 h-4 transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 group-hover:stroke-blue-600" />
            <span>{post.comments}</span>
          </button>
          <button
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition duration-200 group"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 group-hover:stroke-blue-600" />
            <span>Share</span>
          </button>
        </div>
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600 transition duration-200 p-1 hover:bg-gray-100 rounded"
            aria-label="More options"
            onClick={handleMoreOptionsClick}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showOptions && (
            <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200  shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
                    Save post
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
                    Report content
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
                    Mute this thread
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
                    Follow user
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
