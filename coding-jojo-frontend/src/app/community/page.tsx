"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Globe,
  HelpCircle,
  MessageCircle,
  Bell,
  BookOpen,
  Award,
  Plus,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";
import Header from "../../components/community/Header";
import EnhancedOnlineUsersBar from "../../components/community/EnhancedOnlineUsersBar";
import LeftSidebar from "../../components/community/LeftSidebar";
import RightSidebar from "../../components/community/RightSidebar";
import SearchAndFilter from "../../components/community/SearchAndFilter";
import CategoryTabs from "../../components/community/CategoryTabs";
import EnhancedPostCard from "../../components/community/EnhancedPostCard";
import CreatePostModal from "../../components/community/CreatePostModal";
import EventsSection from "../../components/community/EventsSection";
import CommunityChat from "../../components/community/CommunityChat";
import ProfessionalCommunityChat from "../../components/community/ProfessionalCommunityChat";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useCommunity } from "../../hooks/useCommunity";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../hooks/useToast";
import { communityService } from "../../services/communityService";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Post as ApiPost } from "../../services/communityApi";
import { debugAuthState } from "../../utils/authDebug";

// Interface for online users
interface OnlineUser {
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
  status: string;
}

// Convert categories to include icons
const getCategories = () => [
  {
    _id: "all",
    name: "All Categories",
    slug: "all",
    description: "All posts",
    color: "#6366F1",
    icon: "globe",
    postCount: 347,
    isActive: true,
  },
  {
    _id: "questions",
    name: "Questions",
    slug: "questions",
    description: "Community Q&A",
    color: "#3B82F6",
    icon: "help",
    postCount: 124,
    isActive: true,
  },
  {
    _id: "discussions",
    name: "Discussions",
    slug: "discussions",
    description: "General discussions",
    color: "#EC4899",
    icon: "chat",
    postCount: 98,
    isActive: true,
  },
  {
    _id: "announcements",
    name: "Announcements",
    slug: "announcements",
    description: "Important updates",
    color: "#F59E0B",
    icon: "bell",
    postCount: 47,
    isActive: true,
  },
  {
    _id: "showcase",
    name: "Showcase",
    slug: "showcase",
    description: "Project showcases",
    color: "#8B5CF6",
    icon: "award",
    postCount: 36,
    isActive: true,
  },
  {
    _id: "resources",
    name: "Resources",
    slug: "resources",
    description: "Learning resources",
    color: "#10B981",
    icon: "book",
    postCount: 42,
    isActive: true,
  },
];

const mockTrendingTopics: string[] = [
  "react",
  "javascript",
  "webdev",
  "tailwindcss",
  "beginners",
  "ai",
  "machinelearning",
  "coding",
];

export default function CommunityPage() {
  const { user, isLoading: authLoading } = useAuth();
  const toast = useToast();
  const {
    posts,
    categories,
    members,
    popularTags,
    loading,
    error,
    setError,
    pagination,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    addReply,
    toggleCommentLike,
    savePost,
    unsavePost,
    reportPost,
    followUser,
    unfollowUser,
    muteThread,
    fetchSavedPosts,
  } = useCommunity();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<
    "recent" | "popular" | "trending" | "oldest"
  >("recent");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<ApiPost | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [mutedThreads, setMutedThreads] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"posts" | "events" | "chat">(
    "posts"
  );
  
  // Online users state - Facebook-style functionality
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [onlineUsersLoading, setOnlineUsersLoading] = useState(false);
  const [realCategories, setRealCategories] = useState<any[]>([]);

  // Debounce search query to prevent excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Function to fetch online users with useCallback to prevent recreation
  const fetchOnlineUsers = useCallback(async () => {
    // Don't make API calls if auth is loading or user is not authenticated
    if (authLoading || !user) {
      console.log("Community: Skipping fetchOnlineUsers - auth loading or no user");
      return;
    }

    try {
      setOnlineUsersLoading(true);
      const response = await communityService.getOnlineUsers();
      if (response.success && response.data) {
        // Transform CommunityMember[] to OnlineUser[]
        const transformedUsers: OnlineUser[] = response.data.map((member: any) => ({
          _id: member._id,
          name: member.name,
          email: member.email || '',
          avatar: member.avatar || member.avatarUrl || '',
          bio: member.bio,
          joinedAt: member.joinedAt,
          postCount: member.postCount || 0,
          reputation: member.reputation || 0,
          badges: member.badges || [],
          isOnline: member.isOnline || true,
          lastSeen: member.lastSeen,
          role: member.role,
          status: member.status || 'online',
        }));
        setOnlineUsers(transformedUsers);
      }
    } catch (error) {
      console.error('Failed to fetch online users:', error);
    } finally {
      setOnlineUsersLoading(false);
    }
  }, [user, authLoading]); // Add dependencies for useCallback

  // Fetch online users on component mount and set up real-time updates
  useEffect(() => {
    // Don't run if auth is still loading
    if (authLoading) {
      console.log("Community: Waiting for auth to complete...");
      return;
    }

    console.log("Community: Auth complete, user:", !!user);
    
    // Debug auth state when component mounts
    debugAuthState();

    // Mark current user as online when they visit the community page
    const markUserOnline = async () => {
      if (user) {
        try {
          console.log("Community: Marking user as online...");
          await communityService.updateUserStatus('online');
          console.log("Community: User marked as online successfully");
        } catch (error) {
          console.error('Failed to mark user as online:', error);
        }
      }
    };

    // Initial load
    markUserOnline();
    fetchOnlineUsers();
    
    // Set up controlled real-time updates for online users
    const onlineUsersInterval = setInterval(() => {
      if (user) { // Only update if user is still logged in
        fetchOnlineUsers();
        markUserOnline(); // Keep user active
      }
    }, 30000); // Reduced frequency to 30 seconds to prevent spam
    
    return () => {
      clearInterval(onlineUsersInterval);
    };
  }, [user?.id, authLoading, fetchOnlineUsers]); // Only depend on user.id to prevent unnecessary re-runs

  // Additional computed values
  const isAdmin = user?.role === "admin" || user?.role === "instructor";
  const displayCategories =
    realCategories.length > 0
      ? realCategories
      : getCategories().map((cat) => ({
          id: cat._id,
          name: cat.name,
          count: cat.postCount,
          icon:
            cat._id === "questions" ? (
              <HelpCircle className="w-3 h-3 text-blue-600" />
            ) : cat._id === "discussions" ? (
              <MessageCircle className="w-3 h-3 text-blue-600" />
            ) : cat._id === "announcements" ? (
              <Bell className="w-3 h-3 text-blue-600" />
            ) : cat._id === "showcase" ? (
              <Award className="w-3 h-3 text-blue-600" />
            ) : (
              <BookOpen className="w-3 h-3 text-blue-600" />
            ),
        }));
  const compatibleMembers = members.map((member) => ({
    ...member,
    id: member._id,
    avatarUrl: member.avatar,
    role: member.role || "Member",
    lastActive: member.isOnline
      ? "Online now"
      : member.lastSeen
      ? new Date(member.lastSeen).toLocaleDateString()
      : "1 day ago",
  }));
  
  // Fetch real category statistics
  useEffect(() => {
    const fetchCategoryStats = async () => {
      // Don't make API calls if auth is loading
      if (authLoading) {
        console.log("Community: Skipping fetchCategoryStats - auth loading");
        return;
      }

      try {
        console.log("Community: Fetching category stats...");
        const response = (await communityService.getCategoryStats()) as any;
        console.log("Community: Category stats response:", response);
        
        if (response.success && response.data && response.data.length > 0) {
          console.log("Community: Category stats data:", response.data);
          const totalCount = response.data.reduce(
            (sum: number, cat: any) => sum + (cat.postCount || 0),
            0
          );
          
          setRealCategories([
            {
              id: "all",
              name: "All Categories",
              count: totalCount,
              icon: <Globe className="w-4 h-4 text-gray-500" />,
            },
            ...response.data.map((cat: any) => ({
              id: cat.slug,
              name: cat.name,
              count: cat.postCount || 0,
              recentCount: cat.recentPostCount || 0,
              activeUsers: cat.activeUsers || 0,
              icon:
                cat.slug === "questions" ? (
                  <HelpCircle className="w-3 h-3 text-blue-600" />
                ) : cat.slug === "discussions" ? (
                  <MessageCircle className="w-3 h-3 text-blue-600" />
                ) : cat.slug === "announcements" ? (
                  <Bell className="w-3 h-3 text-blue-600" />
                ) : cat.slug === "showcase" ? (
                  <Award className="w-3 h-3 text-blue-600" />
                ) : (
                  <BookOpen className="w-3 h-3 text-blue-600" />
                ),
            })),
          ]);
          console.log("Community: Real categories set successfully with counts:", {
            total: totalCount,
            categories: response.data.map((cat: any) => ({ name: cat.name, count: cat.postCount }))
          });
        } else {
          console.error("Community: Category stats API returned no data or success: false");
          throw new Error("No category data received");
        }
      } catch (error) {
        console.error("Failed to fetch category stats:", error);
        console.error("Error details:", {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          response: (error as any)?.response
        });
        
        // Fallback to static categories - don't throw error to UI
        console.log("Community: Using fallback categories");
        setRealCategories(
          getCategories().map((cat) => ({
            id: cat.slug,
            name: cat.name,
            count: cat.postCount,
            icon:
              cat.slug === "all" ? (
                <Globe className="w-3 h-3 text-gray-500" />
              ) : cat.slug === "questions" ? (
                <HelpCircle className="w-3 h-3 text-blue-600" />
              ) : cat.slug === "discussions" ? (
                <MessageCircle className="w-3 h-3 text-blue-600" />
              ) : cat.slug === "announcements" ? (
                <Bell className="w-3 h-3 text-blue-600" />
              ) : cat.slug === "showcase" ? (
                <Award className="w-3 h-3 text-blue-600" />
              ) : (
                <BookOpen className="w-4 h-4 text-blue-500" />
              ),
          }))
        );
      }
    };

    fetchCategoryStats();
    // Add a manual refresh button option by adding to dependencies (optional)
  }, [authLoading]);

  // Filter posts based on active tab and search query
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const filters: any = {
          page: 1,
          limit: 10,
          sort: sortOrder,
        };

        if (activeTab !== "all") {
          filters.category = activeTab;
        }

        if (debouncedSearchQuery.trim() !== "") {
          filters.search = debouncedSearchQuery;
        }

        await fetchPosts(filters);
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };

    loadPosts();
  }, [activeTab, debouncedSearchQuery, sortOrder, fetchPosts]); // Use debounced search query

  // Load user's saved posts on mount
  useEffect(() => {
    const loadSavedPosts = async () => {
      if (authLoading || !user) {
        console.log("Community: Skipping loadSavedPosts - auth loading or no user");
        return;
      }

      try {
        console.log("Community: Loading saved posts...");
        const savedPostsData = await fetchSavedPosts();
        if (savedPostsData && savedPostsData.length > 0) {
          const savedPostIds = savedPostsData.map((post: any) => post._id);
          setSavedPosts(savedPostIds);
          console.log("Community: Loaded saved posts:", savedPostIds);
        }
      } catch (error) {
        console.error("Failed to load saved posts:", error);
        // Don't show error to user as this is not critical
      }
    };

    loadSavedPosts();
  }, [authLoading, user, fetchSavedPosts]);

  // Handle post operations
  const handleCreatePost = async (data: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => {
    await createPost(data);
    setShowCreateModal(false);
  };

  const handleEditPost = (post: ApiPost) => {
    setEditingPost(post);
    setShowCreateModal(true);
  };

  const handleUpdatePost = async (data: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => {
    if (editingPost) {
      await updatePost(editingPost._id, data);
      setEditingPost(null);
      setShowCreateModal(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
  };

  const handleLikePost = async (postId: string) => {
    try {
      await likePost(postId);
      // The likePost function from useCommunity already updates the state
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleAddComment = async (postId: string, content: string) => {
    try {
      await addComment(postId, content);
      // The addComment function from useCommunity already updates the state
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleAddReply = async (
    postId: string,
    commentId: string,
    content: string
  ) => {
    try {
      console.log("Community: Adding reply to comment", { postId, commentId, content });
      await addReply(postId, commentId, content);
      console.log("Community: Reply added successfully");
      // The addReply function from useCommunity already updates the state
    } catch (error: any) {
      console.error("Failed to add reply:", error);
      // If authentication failed, show user-friendly message
      if (error.message?.includes('Authentication') || error.message?.includes('401')) {
        toast.error("Your session has expired. Please refresh the page and try again.");
      } else {
        toast.error("Failed to add reply. Please try again.");
      }
    }
  };

  const handleToggleCommentLike = async (postId: string, commentId: string) => {
    try {
      console.log("Community: Toggling comment like", { postId, commentId });
      await toggleCommentLike(postId, commentId);
      console.log("Community: Comment like toggled successfully");
      // The toggleCommentLike function from useCommunity already updates the state
    } catch (error: any) {
      console.error("Failed to toggle comment like:", error);
      // If authentication failed, show user-friendly message
      if (error.message?.includes('Authentication') || error.message?.includes('401')) {
        toast.error("Your session has expired. Please refresh the page and try again.");
      } else {
        toast.error("Failed to toggle comment like. Please try again.");
      }
    }
  };

  const handleSavePost = async (postId: string) => {
    const success = await savePost(postId);
    if (success) {
      setSavedPosts((prev) => [...prev, postId]);
    }
  };

  const handleUnsavePost = async (postId: string) => {
    const success = await unsavePost(postId);
    if (success) {
      setSavedPosts((prev) => prev.filter((id) => id !== postId));
    }
  };

  const handleReportPost = async (postId: string, reason: string) => {
    await reportPost(postId, reason);
  };

  const handleFollowUser = async (userId: string) => {
    const success = await followUser(userId);
    if (success) {
      setFollowedUsers((prev) => [...prev, userId]);
    }
  };

  const handleUnfollowUser = async (userId: string) => {
    const success = await unfollowUser(userId);
    if (success) {
      setFollowedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };
  const handleMuteThread = async (postId: string) => {
    const success = await muteThread(postId);
    if (success) {
      setMutedThreads((prev) => [...prev, postId]);
    }
  };

  const handleSharePost = async (post: ApiPost) => {
    try {
      // Mock user data for headers
      const headers = {
        "x-user-id": user?.id || "user_123",
        "x-user-name": user?.name || "Test User",
        "x-user-email": user?.email || "test@example.com",
        "x-user-type": user?.role || "user",
      };

      const response = await communityService.shareForumPost(post._id, {
        platform: "community",
        message: `Check out this post: ${post.title}`,
      });

      if (response.success) {
        console.log("Post shared successfully:", response.data);
        // You could show a success message or update share count
      }
    } catch (error) {
      console.error("Failed to share post:", error);
    }
  };

  // Show loading while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 relative">
        {/* Header - Sticky - Only show when not in chat view */}
        {currentView !== "chat" && <Header />}
        {/* Online Users Bar - Sticky - Only show when not in chat view */}
        {currentView !== "chat" && (
          <EnhancedOnlineUsersBar 
            users={onlineUsers.length > 0 ? onlineUsers : members} 
            totalOnline={onlineUsers.length}
          />
        )}
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 py-4 relative z-10">
          <div className="flex flex-col text-gray-800 lg:flex-row gap-4">
            {/* Left Sidebar - Sticky - Only show when not in chat view */}
            {currentView !== "chat" && (
              <LeftSidebar
                categories={displayCategories}
                trendingTopics={mockTrendingTopics}
                featuredMembers={compatibleMembers}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
            {/* Main Content */}
            <div className="flex-1">
              {/* View Mode Selector - Only show when not in chat view */}
              {currentView !== "chat" && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      onClick={() => setCurrentView("posts")}
                      className={`flex items-center space-x-1.5 px-3 py-2  font-medium text-sm transition duration-200 ${
                        currentView === "posts"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Posts</span>
                    </button>

                    {/* Create Post/Event Button */}
                    {user && currentView === "posts" && (
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="w-full md:w-auto flex items-center justify-center space-x-1.5 text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-4 py-2  font-medium text-sm transition duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create Post</span>
                      </button>
                    )}

                    <button
                      onClick={() => setCurrentView("events")}
                      className={`flex items-center space-x-1.5 px-3 py-2  font-medium text-sm transition duration-200 ${
                        currentView === "events"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Events</span>
                    </button>
                    <button
                      onClick={() => setCurrentView("chat" as const)}
                      className={`flex items-center space-x-1.5 px-3 py-2  font-medium text-sm transition duration-200 ${
                        (currentView as string) === "chat"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>
              )}
              {/* Posts View */}
              {currentView === "posts" && (
                <>
                  {/* Search and Filters */}
                  <SearchAndFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    categories={displayCategories}
                  />

                  {/* Tabs */}
                  <CategoryTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </>
              )}
              {/* Events View */}
              {currentView === "events" && <EventsSection isAdmin={isAdmin} />}
              {/* Chat View */}
              {currentView === "chat" && (
                <div className="h-[calc(100vh-120px)]">
                  <ProfessionalCommunityChat />
                </div>
              )}
              {currentView === "posts" && (
                <div className="space-y-6">
                  {loading && (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner />
                    </div>
                  )}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3  flex items-center justify-between">
                      <div className="text-sm">
                        <strong>Error:</strong> {error}
                      </div>
                      <button
                        onClick={() => {
                          setError(null);
                          // Retry loading posts
                          const filters: any = {
                            page: 1,
                            limit: 10,
                            sort: sortOrder,
                          };
                          if (activeTab !== "all") filters.category = activeTab;
                          if (debouncedSearchQuery.trim() !== "")
                            filters.search = debouncedSearchQuery;
                          fetchPosts(filters);
                        }}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  {posts.length === 0 && !loading && (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        No posts found
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {searchQuery
                          ? "Try adjusting your search terms or filters."
                          : "Be the first to start a discussion!"}
                      </p>
                    </div>
                  )}
                  {posts.map((post) => (
                    <EnhancedPostCard
                      key={post._id}
                      post={post}
                      onLike={handleLikePost}
                      onComment={handleAddComment}
                      onAddReply={handleAddReply}
                      onToggleCommentLike={handleToggleCommentLike}
                      onSave={handleSavePost}
                      onUnsave={handleUnsavePost}
                      onReport={handleReportPost}
                      onMute={handleMuteThread}
                      onFollow={handleFollowUser}
                      onUnfollow={handleUnfollowUser}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                      onShare={handleSharePost}
                      isAdmin={isAdmin}
                      savedPosts={savedPosts}
                      followedUsers={followedUsers}
                      mutedThreads={mutedThreads}
                    />
                  ))}
                </div>
              )}
              {/* Pagination - Only for posts */}
              {currentView === "posts" && pagination.total > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-1">
                    {Array.from(
                      { length: Math.min(pagination.total, 5) },
                      (_, i) => (
                        <button
                          key={i + 1}
                          onClick={async () => {
                            try {
                              await fetchPosts({
                                page: i + 1,
                                category:
                                  activeTab !== "all" ? activeTab : undefined,
                                search: searchQuery || undefined,
                                sort: sortOrder,
                              });
                            } catch (err) {
                              console.error("Error loading page:", err);
                            }
                          }}
                          className={`px-3 py-1.5  text-sm transition duration-200 ${
                            pagination.current === i + 1
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Sticky - Only show when not in chat view */}
            {currentView !== "chat" && <RightSidebar />}
          </div>
        </div>
        {/* Create/Edit Post Modal */}
        <CreatePostModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingPost(null);
          }}
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          categories={categories.length > 0 ? categories : getCategories()}
          editPost={editingPost}
          isAdmin={isAdmin}
        />
      </div>
      <Footer />
    </>
  );
}
