// Custom hook for community functionality
import { useState, useEffect, useCallback } from 'react';
import { useToast } from './useToast';
import { ApiResponse } from '../lib/api';
import {
  Post,
  Category,
  Member,
  Tag,
  CommunityStats,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
  getCategories,
  getMembers,
  getPopularTags,
  savePost,
  unsavePost,
  reportPost,
  followUser,
  unfollowUser,
  muteThread,
  getCommunityStats,
  searchPosts,
  getTrendingPosts,
  getSavedPosts,
  getUserPosts
} from '../services/communityApi';

import { communityService } from '../services/communityService';

interface CommunityFilters {
  category?: string;
  tag?: string;
  sort?: 'recent' | 'popular' | 'trending' | 'oldest';
  search?: string;
  featured?: boolean;
}

interface PaginationInfo {
  current: number;
  total: number;
  count: number;
  totalPosts: number;
}

export const useCommunity = () => {
  // State management
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [popularTags, setPopularTags] = useState<Tag[]>([]);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    total: 1,
    count: 0,
    totalPosts: 0
  });

  const toast = useToast();  // Fetch posts with filters
  const fetchPosts = useCallback(async (filters: CommunityFilters & { page?: number; limit?: number } = {}) => {
    // Prevent multiple simultaneous requests
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('useCommunity fetchPosts called with filters:', filters);
      const response = await getPosts(filters) as ApiResponse<{ posts: Post[], pagination: PaginationInfo }>;
      console.log('useCommunity fetchPosts response:', response);
      
      if (response && response.success) {
        setPosts(response.data?.posts || []);
        setPagination(response.data?.pagination || {
          current: 1,
          total: 1,
          count: 0,
          totalPosts: 0
        });
      } else {
        throw new Error(response?.message || response?.error || 'Failed to fetch posts');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(errorMessage);
      console.error('Error fetching posts:', err);
      // Don't show toast for every error to prevent spam
      // toast.error('Error', { description: errorMessage });
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array to prevent re-creation

  // Fetch single post
  const fetchPost = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await getPost(id) as any;
      
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch post');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch post';
      setError(errorMessage);
      toast.error('Error', { description: errorMessage });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create new post
  const handleCreatePost = useCallback(async (postData: {
    title: string;
    content: string;
    category: string;
    tags?: string[];
  }) => {
    try {
      setLoading(true);
      const response = await createPost(postData) as any;
      
      if (response.success) {
        setPosts(prev => [response.data, ...prev]);
        toast.success('Success', { description: 'Post created successfully!' });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create post');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      setError(errorMessage);
      toast.error('Error', { description: errorMessage });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Update post
  const handleUpdatePost = useCallback(async (id: string, postData: {
    title?: string;
    content?: string;
    category?: string;
    tags?: string[];
  }) => {
    try {
      setLoading(true);
      const response = await updatePost(id, postData) as any;
      
      if (response.success) {
        setPosts(prev => prev.map(post => 
          post._id === id ? { ...post, ...response.data } : post
        ));
        toast.success('Success', { description: 'Post updated successfully!' });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update post');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      setError(errorMessage);
      toast.error('Error', { description: errorMessage });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Delete post
  const handleDeletePost = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await deletePost(id) as any;
      
      if (response.success) {
        setPosts(prev => prev.filter(post => post._id !== id));
        toast.success('Success', { description: 'Post deleted successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to delete post');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      setError(errorMessage);
      toast.error('Error', { description: errorMessage });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Toggle like on post
  const handleLike = useCallback(async (id: string) => {
    try {
      const response = await toggleLike(id) as any;
      
      if (response.success) {
        setPosts(prev => prev.map(post => {
          if (post._id === id) {
            const isLiked = response.data.liked;
            const newLikeCount = response.data.likeCount;
            
            return {
              ...post,
              likeCount: newLikeCount,
              likes: isLiked 
                ? [...post.likes, { user: 'current-user', createdAt: new Date().toISOString() }]
                : post.likes.filter(like => like.user !== 'current-user')
            };
          }
          return post;
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to toggle like');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle like';
      toast.error('Error', { description: errorMessage });
      return null;
    }
  }, [toast]);

  // Add comment to post
  const handleAddComment = useCallback(async (id: string, content: string) => {
    try {
      const response = await addComment(id, content) as any;
      
      if (response.success) {
        setPosts(prev => prev.map(post => {
          if (post._id === id) {
            return {
              ...post,
              comments: [...post.comments, response.data],
              commentCount: post.commentCount + 1
            };
          }
          return post;
        }));
        toast.success('Success', { description: 'Comment added successfully!' });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to add comment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add comment';
      toast.error('Error', { description: errorMessage });
      return null;
    }
  }, [toast]);

  // Delete comment
  const handleDeleteComment = useCallback(async (postId: string, commentId: string) => {
    try {
      const response = await deleteComment(postId, commentId) as any;
      
      if (response.success) {
        setPosts(prev => prev.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment._id !== commentId),
              commentCount: post.commentCount - 1
            };
          }
          return post;
        }));
        toast.success('Success', { description: 'Comment deleted successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to delete comment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete comment';
      toast.error('Error', { description: errorMessage });
      return false;
    }
  }, [toast]);

  // Save/bookmark post
  const handleSavePost = useCallback(async (id: string) => {
    try {
      const response = await savePost(id) as any;
      
      if (response.success) {
        toast.success('Success', { description: 'Post saved successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to save post');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save post';
      toast.error('Error', { description: errorMessage });
      return false;
    }
  }, [toast]);

  // Unsave/unbookmark post
  const handleUnsavePost = useCallback(async (id: string) => {
    try {
      const response = await unsavePost(id) as any;
      
      if (response.success) {
        toast.success('Success', { description: 'Post unsaved successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to unsave post');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to unsave post';
      toast.error('Error', { description: errorMessage });
      return false;
    }
  }, [toast]);

  // Report post
  const handleReportPost = useCallback(async (id: string, reason: string) => {
    try {
      const response = await reportPost(id, reason) as any;
      
      if (response.success) {
        toast.success('Success', { description: 'Post reported successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to report post');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to report post';
      toast.error('Error', { description: errorMessage });
      return false;
    }
  }, [toast]);

  // Follow user
  const handleFollowUser = useCallback(async (userId: string) => {
    try {
      const response = await followUser(userId) as any;
      
      if (response.success) {
        toast.success('Success', { description: 'User followed successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to follow user');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to follow user';
      toast.error('Error', { description: errorMessage });
      return false;
    }
  }, [toast]);

  // Unfollow user
  const handleUnfollowUser = useCallback(async (userId: string) => {
    try {
      const response = await unfollowUser(userId) as any;
      
      if (response.success) {
        toast.success('Success', { description: 'User unfollowed successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to unfollow user');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to unfollow user';
      toast.error('Error', { description: errorMessage });
      return false;
    }
  }, [toast]);

  // Mute thread
  const handleMuteThread = useCallback(async (id: string) => {
    try {
      const response = await muteThread(id) as any;
      
      if (response.success) {
        toast.success('Success', { description: 'Thread muted successfully!' });
        return true;
      } else {
        throw new Error(response.message || 'Failed to mute thread');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mute thread';
      toast.error('Error', { description: errorMessage });
      return false;
    }
  }, [toast]);

  // Fetch initial data
  const fetchCategories = useCallback(async () => {
    try {
      const response = await getCategories() as any;
      if (response.success) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  const fetchMembers = useCallback(async (params = {}) => {
    try {
      const response = await getMembers(params) as any;
      if (response.success) {
        setMembers(response.data.members);
      }
    } catch (err) {
      console.error('Failed to fetch members:', err);
    }
  }, []);

  const fetchPopularTags = useCallback(async () => {
    try {
      const response = await getPopularTags() as any;
      if (response.success) {
        setPopularTags(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch popular tags:', err);
    }
  }, []);

  const fetchCommunityStats = useCallback(async () => {
    try {
      const response = await getCommunityStats() as any;
      if (response.success) {
        setCommunityStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch community stats:', err);
    }
  }, []);

  // Search functionality
  const searchCommunityPosts = useCallback(async (query: string, filters?: {
    category?: string;
    tags?: string[];
    author?: string;
    dateRange?: { from: string; to: string };
  }) => {
    try {
      setLoading(true);
      const response = await searchPosts(query, filters) as any;
      
      if (response.success) {
        setPosts(response.data.posts);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Failed to search posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get trending posts
  const fetchTrendingPosts = useCallback(async (timeframe: 'day' | 'week' | 'month' = 'week') => {
    try {
      setLoading(true);
      const response = await getTrendingPosts(timeframe) as any;
      
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      console.error('Failed to fetch trending posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get saved posts
  const fetchSavedPosts = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await getSavedPosts(page, limit) as any;
      
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      console.error('Failed to fetch saved posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user posts
  const fetchUserPosts = useCallback(async (userId: string, page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await getUserPosts(userId, page, limit) as any;
      
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      console.error('Failed to fetch user posts:', err);
    } finally {
      setLoading(false);
    }  }, []);

  // Add reply to comment
  const handleAddReply = useCallback(async (postId: string, commentId: string, content: string) => {
    try {
      const response = await communityService.addCommentReply(postId, commentId, content) as any;
      
      if (response.success) {
        setPosts(prev => prev.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, response.data],
              commentCount: post.commentCount + 1
            };
          }
          return post;
        }));
        toast.success('Success', { description: 'Reply added successfully!' });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to add reply');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add reply';
      toast.error('Error', { description: errorMessage });
      return null;
    }
  }, [toast]);

  // Toggle comment like
  const handleToggleCommentLike = useCallback(async (postId: string, commentId: string) => {
    try {
      const response = await communityService.toggleCommentLike(postId, commentId) as any;
      
      if (response.success) {
        setPosts(prev => prev.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment._id === commentId) {
                  return {
                    ...comment,
                    likeCount: response.data.likeCount,
                    isLiked: response.data.liked
                  };
                }
                return comment;
              })
            };
          }
          return post;
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to toggle comment like');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle comment like';
      toast.error('Error', { description: errorMessage });
      return null;
    }
  }, [toast]);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load initial data concurrently to reduce load time
        await Promise.allSettled([
          fetchCategories(),
          fetchMembers(),
          fetchPopularTags(),
          fetchCommunityStats()
        ]);
      } catch (err) {
        console.error('Error initializing community data:', err);
      }
    };

    initializeData();
  }, []); // Empty dependency array - only run once on mount
  return {
    // State
    posts,
    categories,
    members,
    popularTags,
    communityStats,
    loading,
    error,
    setError,
    pagination,    // Post operations
    fetchPosts,
    fetchPost,
    createPost: handleCreatePost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
    likePost: handleLike,
    addComment: handleAddComment,
    addReply: handleAddReply,
    toggleCommentLike: handleToggleCommentLike,
    deleteComment: handleDeleteComment,

    // User interactions
    savePost: handleSavePost,
    unsavePost: handleUnsavePost,
    reportPost: handleReportPost,
    followUser: handleFollowUser,
    unfollowUser: handleUnfollowUser,
    muteThread: handleMuteThread,

    // Data fetching
    fetchCategories,
    fetchMembers,
    fetchPopularTags,
    fetchCommunityStats,

    // Advanced features
    searchPosts: searchCommunityPosts,
    fetchTrendingPosts,
    fetchSavedPosts,
    fetchUserPosts
  };
};

export default useCommunity;
