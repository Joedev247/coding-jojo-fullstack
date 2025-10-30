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
      <div className="bg-white border border-gray-200  shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-3">
          <MessageCircle className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xs font-medium text-gray-900 mb-2">
          No discussions found
        </h3>
        <p className="text-gray-600 mb-4 max-w-sm mx-auto text-sm">
          Try adjusting your search or filter to find what you&apos;re looking
          for.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center font-medium transition duration-200 shadow-sm mx-auto text-sm">
          <MessageCircle className="w-3 h-3 mr-2" />
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
