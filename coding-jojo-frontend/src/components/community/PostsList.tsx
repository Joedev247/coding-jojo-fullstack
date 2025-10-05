"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import PostCard from "../community/PostCard";
import Pagination from "./Pagination";

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

interface PostsListProps {
  posts: Post[];
  handleLikePost: (postId: string) => void;
}

export default function PostsList({ posts, handleLikePost }: PostsListProps) {
  if (posts.length === 0) {
    return (
      <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full mb-4">
          <MessageCircle className="w-8 h-8 text-pink-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">
          No discussions found
        </h3>
        <p className="text-gray-400 mb-5 max-w-sm mx-auto">
          Try adjusting your search or filter to find what you&apos;re looking
          for.
        </p>
        <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-5 py-2.5 flex items-center font-medium transition duration-200 shadow-md mx-auto">
          <MessageCircle className="w-4 h-4 mr-2" />
          Start a Discussion
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} handleLikePost={handleLikePost} />
        ))}
      </div>
      <Pagination />
    </>
  );
}
