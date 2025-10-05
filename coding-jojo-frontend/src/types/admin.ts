// Types for the dashboard page

// Course form data
export interface CourseFormData {
  title: string;
  category: string;
  description?: string;
  price: string; // Store as string for form handling
  level: string;
  duration: string;
  thumbnail: File | null;
  featured: boolean;
}

// Post form data
export interface PostFormData {
  title: string;
  content: string;
  type: 'announcement' | 'discussion' | 'question';
  pinned: boolean;
}

// Course type
export interface Course {
  id: string;
  title: string;
  category: string;
  tags: string[];
  level: string;
  duration: string;
lectures: number;
ratingCount: number;
  description?: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
  };
  studentsEnrolled: number;
  rating: number;
  price: number;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  isNew: boolean;
  isSaved: boolean;

}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
  lastActive: string;
  coursesEnrolled: number;
  status: 'active' | 'pending' | 'suspended';
}

// Post type
export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'discussion' | 'question' | 'resource';
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  status: 'published' | 'draft';
  pinned?: boolean;
}

// Purchase type
export interface Purchase {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  course: string;
  courseTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'refunded';
  paymentMethod: string;
}

// Stats type

export interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  activeUsers: number;
  newUsers: {
    count: string;
    percentChange: number;
  };
  revenue: {
    count: number;
    percentChange: number;
  };
  completionRate: {
    count: number;
  };
  engagementRate: {
    count: number;
  };
  monthlySales: Array<{
    month: string;
    value: number;
  }>;
  categoryDistribution: Array<{
    name: string;
    value: number;
  }>;
  recentActivity: Array<{
    user: string;
    avatar: string;
    action: string;
    target: string;
    time: string;
  }>;
}

// Notification type
export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}