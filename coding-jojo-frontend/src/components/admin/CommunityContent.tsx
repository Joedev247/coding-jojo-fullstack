// components/dashboard/CommunityContent.tsx
import React, { useState } from "react";
import Image from "next/image";
import {
  PlusCircle,
  MessageCircle,
  Star,
  Edit,
  Trash,
  Calendar,
} from "lucide-react";
import { Post } from "../../types/admin";
import DeleteConfirmationDialog from "../ui/DeleteConfirmationDialog";

interface CommunityContentProps {
  posts: Post[];
  events?: any[];
  onAddPost: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onAddEvent?: () => void;
  onEditEvent?: (event: any) => void;
  onDeleteEvent?: (id: string) => void;
}

const CommunityContent: React.FC<CommunityContentProps> = ({
  posts,
  events = [],
  onAddPost,
  onEditPost,
  onDeletePost,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const [postTypeFilter, setPostTypeFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const filteredPosts = posts.filter(
    (post) => postTypeFilter === "all" || post.type === postTypeFilter
  );

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      onDeletePost(postToDelete);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  return (
    <>
      <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800  mb-6">
        <div className="p-5 border-b border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            Community Posts
          </h3>{" "}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onAddPost}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium px-4 py-2 text-sm  shadow-md transition duration-200 flex items-center justify-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Post
            </button>
            {onAddEvent && (
              <button
                onClick={onAddEvent}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-4 py-2 text-sm  shadow-md transition duration-200 flex items-center justify-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </button>
            )}
            <select
              className="bg-gray-800 border border-gray-700  px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={postTypeFilter}
              onChange={(e) => setPostTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="announcement">Announcements</option>
              <option value="discussion">Discussions</option>
              <option value="question">Questions</option>
              <option value="resource">Resources</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-800">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  {" "}
                  <div className="h-10 w-10 relative mr-4">
                    <Image
                      src={post.author?.avatar || "/testimonial-avatar.jpg"}
                      alt={post.author?.name || "User"}
                      fill
                      className="rounded-full object-cover border border-gray-700"
                    />
                  </div>
                  <div>
                    {" "}
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          post.type === "announcement"
                            ? "bg-blue-500/20 text-blue-400"
                            : post.type === "discussion"
                            ? "bg-purple-500/20 text-purple-400"
                            : post.type === "question"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {post.type
                          ? post.type.charAt(0).toUpperCase() +
                            post.type.slice(1)
                          : "Unknown"}
                      </span>
                      {post.status === "draft" && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400">
                          Draft
                        </span>
                      )}
                    </div>{" "}
                    <h4 className="text-white font-medium mt-1">
                      {post.title || "Untitled"}
                    </h4>
                    <div className="flex items-center mt-2 space-x-4 text-sm">
                      <span className="text-gray-400">
                        {post.author?.name || "Unknown Author"}
                      </span>
                      <span className="text-gray-500">
                        {post.createdAt || "Unknown Date"}
                      </span>
                      <div className="flex items-center text-gray-400">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments || 0}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Star className="w-4 h-4 mr-1" />
                        {post.likes || 0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEditPost(post)}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors  hover:bg-gray-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors  hover:bg-gray-800"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium text-white">1</span> to{" "}
            <span className="font-medium text-white">
              {filteredPosts.length}
            </span>{" "}
            of <span className="font-medium text-white">{posts.length}</span>{" "}
            posts
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2   bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="px-3 py-1  bg-gradient-to-r from-pink-500 to-orange-500 text-white">
              1
            </button>
            <button className="px-3 py-1   bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-3 py-1   bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              3
            </button>
            <button className="p-2   bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2   bg-gray-900/50 backdrop-blur-sm border border-gray-800  hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Community Engagement
            </h3>
          </div>
          <div className="p-5 h-64 relative">
            {/* This would be where your chart goes */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Chart placeholder - Community engagement metrics would render here
            </div>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800  hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              Post Statistics
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Posts</span>
              <span className="text-white font-medium">{posts.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Announcements</span>
              <span className="text-white font-medium">
                {posts.filter((p) => p.type === "announcement").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Discussions</span>
              <span className="text-white font-medium">
                {posts.filter((p) => p.type === "discussion").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Questions</span>
              <span className="text-white font-medium">
                {posts.filter((p) => p.type === "question").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Resources</span>
              <span className="text-white font-medium">
                {posts.filter((p) => p.type === "resource").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg. Comments / Post</span>
              <span className="text-white font-medium">
                {posts.length > 0
                  ? (
                      posts.reduce((acc, post) => acc + post.comments, 0) /
                      posts.length
                    ).toFixed(1)
                  : "0.0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        itemName="post"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default CommunityContent;
