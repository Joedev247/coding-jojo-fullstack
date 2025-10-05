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
    <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-6 hover:shadow-pink-900/10 transition duration-300 group">
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative w-10 h-10">
          <Image
            src={post.author.avatarUrl}
            alt={post.author.name}
            fill
            className=" object-cover border-2 border-gray-700 group-hover:border-pink-500 transition-colors"
          />
          {post.author.role === "Instructor" && (
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-orange-500  p-1 border-2 border-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
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
            <h4 className="font-medium text-gray-200">{post.author.name}</h4>
            {post.author.role === "Instructor" && (
              <span className="ml-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 text-pink-400 text-xs px-2.5 py-0.5  font-medium border border-pink-500/20">
                Instructor
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">
            Posted in{" "}
            <button className="text-pink-400 hover:text-pink-300 font-medium">
              {post.category}
            </button>{" "}
            • {post.createdAt}
          </p>
        </div>
      </div>
      <button className="block group w-full text-left">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition duration-200">
          {post.title}
        </h3>
      </button>
      <p className="text-gray-300 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: string, index: number) => (
          <button
            key={index}
            className="bg-gray-800 hover:bg-pink-900/40 text-gray-400 hover:text-pink-300 text-xs px-2.5 py-1 transition duration-200 hover:border-pink-600"
          >
            #{tag}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex space-x-5">
          <button
            onClick={() => handleLikePost(post.id)}
            className={`flex items-center space-x-1.5 ${
              post.isLiked
                ? "text-pink-400 font-medium"
                : "text-gray-400 hover:text-pink-400"
            } transition duration-200 group`}
            aria-label={post.isLiked ? "Unlike" : "Like"}
          >
            <ThumbsUp
              className={`w-5 h-5 ${
                post.isLiked
                  ? "fill-pink-400 stroke-pink-400"
                  : "group-hover:stroke-pink-400"
              } transition-all duration-200 transform group-hover:scale-110 group-active:scale-95`}
            />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1.5 text-gray-400 hover:text-pink-400 transition duration-200 group">
            <MessageCircle className="w-5 h-5 transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 group-hover:stroke-pink-400" />
            <span>{post.comments}</span>
          </button>
          <button
            className="flex items-center space-x-1.5 text-gray-400 hover:text-pink-400 transition duration-200 group"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5 transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 group-hover:stroke-pink-400" />
            <span>Share</span>
          </button>
        </div>
        <div className="relative">
          <button
            className="text-gray-400 hover:text-white transition duration-200 p-1 hover:bg-gray-800 "
            aria-label="More options"
            onClick={handleMoreOptionsClick}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showOptions && (
            <div className="absolute z-50 right-0 mt-2 w-48  bg-gray-900 shadow-xl z-10">
              <ul className="py-1">
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    Save post
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    Report content
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    Mute this thread
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
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
