// Community API service for backend integration
import { apiClient as api } from "../lib/api";

export interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  likes: Array<{
    user: string;
    createdAt: string;
  }>;
  comments: Array<{
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
    likes: Array<{
      user: string;
      createdAt: string;
    }>;
  }>;
  views: number;
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
  isPinned: boolean;
  isFeatured: boolean;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  postCount: number;
  isActive: boolean;
}

export interface Member {
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

export interface Tag {
  name: string;
  count: number;
  category: string;
}

export interface CommunityStats {
  totalPosts: number;
  totalMembers: number;
  onlineMembers: number;
  totalViews: number;
  popularTags: Tag[];
}

// Get all posts with filtering and pagination
export const getPosts = async (
  params: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    sort?: "recent" | "popular" | "trending" | "oldest";
    search?: string;
    featured?: boolean;
  } = {}
) => {
  try {
    console.log("getPosts called with params:", params);
    const response = await api.get("/community/posts", { params });
    console.log("getPosts response:", response);
    return response;
  } catch (error) {
    console.error("getPosts error:", error);
    throw new Error("Failed to fetch posts");
  }
};

// Get single post by ID
export const getPost = async (id: string) => {
  try {
    const response = await api.get(`/community/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch post");
  }
};

// Create new post
export const createPost = async (postData: {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}) => {
  try {
    const response = await api.post("/community/posts", postData);
    return response;
  } catch (error) {
    console.error("createPost error:", error);
    throw new Error("Failed to create post");
  }
};

// Update post
export const updatePost = async (
  id: string,
  postData: {
    title?: string;
    content?: string;
    category?: string;
    tags?: string[];
  }
) => {
  try {
    const response = await api.put(`/community/posts/${id}`, postData);
    return response;
  } catch (error) {
    console.error("updatePost error:", error);
    throw new Error("Failed to update post");
  }
};

// Delete post
export const deletePost = async (id: string) => {
  try {
    const response = await api.delete(`/community/posts/${id}`);
    return response;
  } catch (error) {
    console.error("deletePost error:", error);
    throw new Error("Failed to delete post");
  }
};

// Like/unlike post
export const toggleLike = async (id: string) => {
  try {
    const response = await api.post(`/community/posts/${id}/like`);
    return response;
  } catch (error) {
    console.error("toggleLike error:", error);
    throw new Error("Failed to toggle like");
  }
};

// Add comment to post
export const addComment = async (id: string, content: string) => {
  try {
    const response = await api.post(`/community/posts/${id}/comments`, {
      content,
    });
    return response;
  } catch (error) {
    console.error("addComment error:", error);
    throw new Error("Failed to add comment");
  }
};

// Add reply to comment
export const addReply = async (
  postId: string,
  commentId: string,
  content: string
) => {
  try {
    const response = await api.post(
      `/community/posts/${postId}/comments/${commentId}/reply`,
      { content }
    );
    return response;
  } catch (error) {
    console.error("addReply error:", error);
    throw new Error("Failed to add reply");
  }
};

// Toggle comment like
export const toggleCommentLike = async (postId: string, commentId: string) => {
  try {
    const response = await api.post(
      `/community/posts/${postId}/comments/${commentId}/like`
    );
    return response;
  } catch (error) {
    console.error("toggleCommentLike error:", error);
    throw new Error("Failed to toggle comment like");
  }
};

// Delete comment
export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const response = await api.delete(
      `/community/posts/${postId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete comment");
  }
};

// Get categories
export const getCategories = async () => {
  try {
    const response = await api.get("/community/categories");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

// Get categories with post counts and stats
export const getCategoryStats = async () => {
  try {
    const response = await api.get("/community/categories/stats");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category statistics");
  }
};

// Get members
export const getMembers = async (
  params: {
    page?: number;
    limit?: number;
    sort?: "reputation" | "newest" | "posts";
  } = {}
) => {
  try {
    const response = await api.get("/community/members", { params });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch members");
  }
};

// Get popular tags
export const getPopularTags = async (limit: number = 15) => {
  try {
    const response = await api.get("/community/popular-tags", {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch popular tags");
  }
};

// Save/bookmark post
export const savePost = async (id: string) => {
  try {
    const response = await api.post(`/community/posts/${id}/save`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to save post");
  }
};

// Unsave/unbookmark post
export const unsavePost = async (id: string) => {
  try {
    const response = await api.delete(`/community/posts/${id}/save`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to unsave post");
  }
};

// Report post
export const reportPost = async (id: string, reason: string) => {
  try {
    const response = await api.post(`/community/posts/${id}/report`, {
      reason,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to report post");
  }
};

// Follow user
export const followUser = async (userId: string) => {
  try {
    const response = await api.post(`/community/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to follow user");
  }
};

// Unfollow user
export const unfollowUser = async (userId: string) => {
  try {
    const response = await api.delete(`/community/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to unfollow user");
  }
};

// Mute thread
export const muteThread = async (id: string) => {
  try {
    const response = await api.post(`/community/posts/${id}/mute`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to mute thread");
  }
};

// Get community stats
export const getCommunityStats = async () => {
  try {
    const response = await api.get("/community/stats");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch community stats");
  }
};

// Search posts
export const searchPosts = async (
  query: string,
  filters?: {
    category?: string;
    tags?: string[];
    author?: string;
    dateRange?: { from: string; to: string };
  }
) => {
  try {
    const response = await api.get("/community/search", {
      params: { query, ...filters },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to search posts");
  }
};

// Get trending posts
export const getTrendingPosts = async (
  timeframe: "day" | "week" | "month" = "week"
) => {
  try {
    const response = await api.get("/community/trending", {
      params: { timeframe },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch trending posts");
  }
};

// Get user's saved posts
export const getSavedPosts = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get("/community/saved", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch saved posts");
  }
};

// Get user's posts
export const getUserPosts = async (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await api.get(`/community/users/${userId}/posts`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user posts");
  }
};
