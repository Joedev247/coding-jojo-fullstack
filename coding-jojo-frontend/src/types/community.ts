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
  isPinned: boolean;
  isFeatured: boolean;
  status: 'draft' | 'published' | 'archived';
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
  // Legacy fields for compatibility
  id?: string;
  avatarUrl?: string;
  lastActive?: string;
}