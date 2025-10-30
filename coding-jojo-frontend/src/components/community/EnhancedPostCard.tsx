// Enhanced Post Card component with full CRUD functionality
"use client";

import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
  BookmarkCheck,
  Flag,
  VolumeX,
  UserPlus,
  UserCheck,
  Edit,
  Trash2,
  Calendar,
  Eye,
  Pin,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Post } from "../../services/communityApi";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "../ui/UserAvatar";
import ShareModal from "../ui/ShareModal";

// Viewers Display Component
const ViewersDisplay: React.FC<{ 
  viewers?: Array<{
    user: {
      _id: string;
      name: string;
      email: string;
      avatar: string;
      role?: string;
    };
    viewedAt: string;
  }>;
  totalViews: number; 
  formatDate: (dateString: string) => string;
}> = ({ viewers = [], totalViews, formatDate }) => {
  const [showViewersList, setShowViewersList] = useState(false);
  
  // Get recent unique viewers (last 7 days, unique by user)
  const recentViewers = viewers
    .filter(v => {
      const viewedDate = new Date(v.viewedAt);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return viewedDate > sevenDaysAgo;
    })
    .reduce((unique, viewer) => {
      // Remove duplicates by user ID
      const exists = unique.find(v => v.user._id === viewer.user._id);
      if (!exists) {
        unique.push(viewer);
      }
      return unique;
    }, [] as typeof viewers)
    .sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())
    .slice(0, 5); // Show max 5 recent viewers

  if (recentViewers.length === 0) {
    return (
      <div className="flex items-center space-x-1">
        <Eye className="w-3 h-3" />
        <span>{totalViews} views</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => setShowViewersList(!showViewersList)}
      >
        <div className="flex items-center space-x-1">
          <Eye className="w-3 h-3" />
          <span>{totalViews} views</span>
        </div>
        
        {recentViewers.length > 0 && (
          <div className="flex -space-x-1">
            {recentViewers.slice(0, 3).map((viewer) => (
              <UserAvatar
                key={viewer.user._id}
                user={viewer.user}
                size="xs"
                className="ring-2 ring-gray-800"
              />
            ))}
            {recentViewers.length > 3 && (
              <div className="w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-400 ring-2 ring-gray-800">
                +{recentViewers.length - 3}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Viewers dropdown */}
      {showViewersList && recentViewers.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200  shadow-lg p-3 min-w-64 z-50">
          <div className="text-sm text-gray-300 mb-2">Recent viewers (last 7 days)</div>
          <div className="space-y-2">
            {recentViewers.map((viewer) => (
              <div key={viewer.user._id} className="flex items-center space-x-2">
                <UserAvatar
                  user={viewer.user}
                  size="sm"
                  showRole={true}
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-200">{viewer.user.name}</div>
                  <div className="text-xs text-gray-400">
                    {formatDate(viewer.viewedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalViews > recentViewers.length && (
            <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
              +{totalViews - recentViewers.length} more views
            </div>
          )}
        </div>
      )}
    </div>
  );
};
interface CommentItemProps {
  comment: any;
  postId: string;
  onAddReply?: (postId: string, commentId: string, content: string) => void;
  onToggleCommentLike?: (postId: string, commentId: string) => void;
  currentUser: any;
}

function CommentItem({
  comment,
  postId,
  onAddReply,
  onToggleCommentLike,
  currentUser,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localLikes, setLocalLikes] = useState(comment.likes?.length || 0);
  const [localIsLiked, setLocalIsLiked] = useState(
    comment.likes?.some((like: any) => like.user === currentUser?.id) || false
  );

  const handleReply = async () => {
    if (replyText.trim() && onAddReply) {
      try {
        await onAddReply(postId, comment._id, replyText);
        setReplyText("");
        setShowReplyForm(false);
      } catch (error) {
        console.error("Failed to add reply:", error);
      }
    }
  };

  const handleCommentLike = async () => {
    if (onToggleCommentLike) {
      // Optimistic update
      const newIsLiked = !localIsLiked;
      const newLikeCount = newIsLiked ? localLikes + 1 : localLikes - 1;

      setLocalIsLiked(newIsLiked);
      setLocalLikes(newLikeCount);

      try {
        await onToggleCommentLike(postId, comment._id);
      } catch (error) {
        // Revert on error
        setLocalIsLiked(!newIsLiked);
        setLocalLikes(localLikes);
        console.error("Failed to toggle comment like:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      // For recent posts, show relative time
      if (diffInMinutes < 1) return "just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInHours < 24) return `${diffInHours}h ago`;
      
      // For posts older than 24 hours, show actual date and time
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      
      if (diffInDays < 7) {
        // Show day of week for recent posts
        const dayOptions: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        };
        return date.toLocaleDateString('en-US', dayOptions);
      }
      
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-3">
        <UserAvatar 
          user={{
            name: comment.user.name,
            email: comment.user.email,
            avatar: comment.user.avatar,
            profilePicture: comment.user.profilePicture
          }}
          size="sm"
          showRole={comment.user.email?.includes("instructor") || comment.user.email?.includes("admin")}
          className="cursor-pointer"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-300">
              {comment.user.name}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{comment.content}</p>

          {/* Comment actions */}
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={handleCommentLike}
              className={`flex items-center space-x-1 text-xs transition duration-200 ${
                localIsLiked
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <ThumbsUp
                className={`w-3 h-3 ${localIsLiked ? "fill-pink-400" : ""}`}
              />
              <span>{localLikes}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-gray-500 hover:text-gray-300 transition duration-200"
            >
              Reply
            </button>
          </div>

          {/* Reply form */}
          {showReplyForm && (
            <div className="mt-3 bg-gray-50 p-3 rounded border border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.user.name}...`}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleReply()}
                />
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="px-3 py-2 bg-pink-600 text-white text-sm  hover:bg-pink-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <span>Reply</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onAddReply?: (postId: string, commentId: string, content: string) => void;
  onToggleCommentLike?: (postId: string, commentId: string) => void;
  onSave: (postId: string) => void;
  onUnsave: (postId: string) => void;
  onReport: (postId: string, reason: string) => void;
  onMute: (postId: string) => void;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  onShare?: (post: Post) => void;
  isAdmin?: boolean;
  savedPosts?: string[];
  followedUsers?: string[];
  mutedThreads?: string[];
}

export default function PostCard({
  post,
  onLike,
  onComment,
  onAddReply,
  onToggleCommentLike,
  onSave,
  onUnsave,
  onReport,
  onMute,
  onFollow,
  onUnfollow,
  onEdit,
  onDelete,
  onShare,
  isAdmin = false,
  savedPosts = [],
  followedUsers = [],
  mutedThreads = [],
}: PostCardProps) {
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [reportReason, setReportReason] = useState("");

  // Check if current user has liked the post
  const isLiked = post.likes.some((like) => like.user === user?.id);
  const isSaved = savedPosts.includes(post._id);
  const isFollowing = followedUsers.includes(post.author._id);
  const isMuted = mutedThreads.includes(post._id);
  const isAuthor = user?.id === post.author._id;

  const [localLikeCount, setLocalLikeCount] = useState(post.likeCount);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localCommentCount, setLocalCommentCount] = useState(post.commentCount);

  const handleLike = async () => {
    // Optimistic update for immediate UI feedback
    const newIsLiked = !localIsLiked;
    const newLikeCount = newIsLiked ? localLikeCount + 1 : localLikeCount - 1;

    setLocalIsLiked(newIsLiked);
    setLocalLikeCount(newLikeCount);

    try {
      await onLike(post._id);
    } catch (error) {
      // Revert optimistic update on error
      setLocalIsLiked(!newIsLiked);
      setLocalLikeCount(localLikeCount);
    }
  };

  const handleAddComment = async () => {
    if (commentText.trim()) {
      try {
        await onComment(post._id, commentText);
        setCommentText("");
        setShowCommentForm(false);
        // Optimistically increment comment count
        setLocalCommentCount((prev) => prev + 1);
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  // Update local state when post props change
  useEffect(() => {
    setLocalLikeCount(post.likeCount);
    setLocalIsLiked(isLiked);
    setLocalCommentCount(post.commentCount);
  }, [post.likeCount, isLiked, post.commentCount]);

  const handleSave = () => {
    if (isSaved) {
      onUnsave(post._id);
    } else {
      onSave(post._id);
    }
  };

  const handleFollow = () => {
    if (isFollowing) {
      onUnfollow(post.author._id);
    } else {
      onFollow(post.author._id);
    }
  };

  const handleReport = () => {
    if (reportReason.trim()) {
      onReport(post._id, reportReason);
      setReportReason("");
      setShowReportDialog(false);
    }
  };

  const handleMute = () => {
    onMute(post._id);
    setShowOptions(false);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    }
    setShowOptions(false);
  };

  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this post?")
    ) {
      onDelete(post._id);
    }
    setShowOptions(false);
  };

  const handleShare = () => {
    setShowShareModal(true);
    setShowOptions(false);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      // For recent posts, show relative time
      if (diffInMinutes < 1) return "just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInHours < 24) return `${diffInHours}h ago`;
      
      // For posts older than 24 hours, show actual date and time
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      
      if (diffInDays < 7) {
        // Show day of week for recent posts
        const dayOptions: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        };
        return date.toLocaleDateString('en-US', dayOptions);
      }
      
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "instructor":
        return "from-blue-100/50 to-blue-200/50 text-blue-600 border-blue-300/50";
      case "admin":
        return "from-purple-500/10 to-blue-500/10 text-purple-400 border-purple-500/20";
      case "moderator":
        return "from-blue-500/10 to-emerald-500/10 text-blue-400 border-blue-500/20";
      default:
        return "from-gray-500/10 to-gray-600/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md hover:border-blue-200 transition duration-300 group relative ${
        isMuted ? "opacity-50" : ""
      }`}
    >
      {/* Pinned/Featured indicators */}
      {post.isPinned && (
        <div className="absolute top-2 right-2 bg-yellow-500/20 text-yellow-400 p-1 rounded">
          <Pin className="w-4 h-4" />
        </div>
      )}
      {post.isFeatured && (
        <div className="absolute top-2 right-8 bg-purple-500/20 text-purple-400 p-1 rounded">
          <Star className="w-4 h-4" />
        </div>
      )}
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <UserAvatar 
          user={{
            name: post.author.name,
            email: post.author.email,
            avatar: post.author.avatar
          }}
          size="lg"
          showRole={true}
          className="hover:scale-105 transition-transform cursor-pointer"
        />

        <div className="flex-1">
          <div className="flex items-center">
            <h4 className="font-medium text-gray-900 text-sm">{post.author.name}</h4>
            {post.author.email?.includes("instructor") && (
              <span
                className={`ml-2 bg-gradient-to-r ${getRoleColor(
                  "instructor"
                )} text-xs px-2.5 py-0.5 rounded-full font-medium border`}
              >
                Instructor
              </span>
            )}
            {post.author.email?.includes("admin") && (
              <span
                className={`ml-2 bg-gradient-to-r ${getRoleColor(
                  "admin"
                )} text-xs px-2.5 py-0.5 rounded-full font-medium border`}
              >
                Admin
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span>Posted in</span>
            <button className="text-blue-600 hover:text-blue-700 font-medium capitalize text-xs">
              {post.category}
            </button>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <span>•</span>
            <ViewersDisplay 
              viewers={post.viewers}
              totalViews={post.views}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>
      {/* Post Content */}
      <div
        className="cursor-pointer"
        onClick={() => window.open(`/community/posts/${post._id}`, "_blank")}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition duration-200">
          {post.title}
        </h3>
        <p className="text-gray-700 mb-4 line-clamp-3 text-sm">
          {post.excerpt || post.content}
        </p>
      </div>
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 5).map((tag: string, index: number) => (
            <button
              key={index}
              className="bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-xs px-2 py-0.5 rounded transition duration-200 border border-gray-200 hover:border-blue-300"
            >
              #{tag}
            </button>
          ))}
          {post.tags.length > 5 && (
            <span className="text-xs text-gray-500 px-2.5 py-1">
              +{post.tags.length - 5} more
            </span>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex space-x-5">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1.5 transition duration-200 group ${
              localIsLiked
                ? "text-blue-600 font-medium"
                : "text-gray-500 hover:text-blue-600"
            }`}
            aria-label={localIsLiked ? "Unlike" : "Like"}
          >
            <ThumbsUp
              className={`w-5 h-5 transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 ${
                localIsLiked
                  ? "fill-pink-400 stroke-pink-400"
                  : "group-hover:stroke-pink-400"
              }`}
            />
            <span>{localLikeCount}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-600 transition duration-200 group"
          >
            <MessageCircle className="w-5 h-5 transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 group-hover:stroke-pink-400" />
            <span>{localCommentCount}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-600 transition duration-200 group"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5 transition-all duration-200 transform group-hover:scale-110 group-active:scale-95 group-hover:stroke-pink-400" />
            <span>Share</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`flex items-center space-x-1.5 transition duration-200 group ${
              isSaved
                ? "text-yellow-400"
                : "text-gray-400 hover:text-yellow-400"
            }`}
            aria-label={isSaved ? "Unsave" : "Save"}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            ) : (
              <Bookmark className="w-5 h-5 group-hover:stroke-yellow-400" />
            )}
          </button>
        </div>

        {/* More Options */}
        <div className="relative">
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-200 p-1 hover:bg-gray-100 rounded-full"
            aria-label="More options"
            onClick={() => setShowOptions(!showOptions)}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showOptions && (
            <div className="absolute z-50 right-0 mt-2 w-48 bg-white  shadow-lg border border-gray-200">
              <ul className="py-1">
                {/* Edit/Delete for author or admin */}
                {(isAuthor || isAdmin) && (
                  <>
                    <li>
                      <button
                        onClick={handleEdit}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit post</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDelete}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete post</span>
                      </button>
                    </li>
                    <hr className="border-gray-700" />
                  </>
                )}

                {/* Follow/Unfollow user */}
                {!isAuthor && (
                  <li>
                    <button
                      onClick={handleFollow}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Unfollow user</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Follow user</span>
                        </>
                      )}
                    </button>
                  </li>
                )}

                {/* Mute thread */}
                <li>
                  <button
                    onClick={handleMute}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
                  >
                    <VolumeX className="w-4 h-4" />
                    <span>{isMuted ? "Unmute thread" : "Mute thread"}</span>
                  </button>
                </li>

                {/* Report content */}
                {!isAuthor && (
                  <li>
                    <button
                      onClick={() => setShowReportDialog(true)}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 flex items-center space-x-2"
                    >
                      <Flag className="w-4 h-4" />
                      <span>Report content</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Comment Form */}
      {showCommentForm && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex space-x-3">
              <UserAvatar 
                user={{
                  name: user?.name || "You",
                  email: user?.email,
                  avatar: user?.profilePicture
                }}
                size="sm"
                showRole={user?.email?.includes("instructor") || user?.email?.includes("admin")}
              />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts on this post..."
                  className="w-full p-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  rows={3}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {commentText.length}/500 characters
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setShowCommentForm(false);
                        setCommentText("");
                      }}
                      className="px-3 py-2 text-sm text-gray-400 hover:text-white transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Report Dialog */}
      {showReportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  p-6 max-w-md w-full mx-4 border border-gray-200 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Report Content
            </h3>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Please describe why you're reporting this content..."
              className="w-full p-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowReportDialog(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={!reportReason.trim()}
                className="px-4 py-2 bg-red-600 text-white text-sm  hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      {/* Comments Section */}
      {post.comments && post.comments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-3">
            Recent Comments ({post.commentCount})
          </h4>
          <div className="space-y-4">
            {post.comments.slice(0, 3).map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
                onAddReply={onAddReply}
                onToggleCommentLike={onToggleCommentLike}
                currentUser={user}
              />
            ))}
            {post.commentCount > 3 && (
              <button
                onClick={() =>
                  window.open(`/community/posts/${post._id}`, "_blank")
                }
                className="text-sm text-blue-600 hover:text-blue-700 transition duration-200"
              >
                View all {post.commentCount} comments
              </button>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        post={post}
      />
    </div>
  );
}
