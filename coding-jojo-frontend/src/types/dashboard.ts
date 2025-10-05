// User types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  role: 'student' | 'instructor' | 'admin';
  joinedDate: string;
  lastActive: string;
  isPremium?: boolean;
  enrolledCourses?: string[];
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

// Course related types
export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  title?: string;
  courses?: number;
  students?: number;
  rating?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
  isCompleted: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  totalStudents: number;
  isWishlisted: boolean;
  status: 'enrolled' | 'completed' | 'not-enrolled';
  progress?: number;
    studentsCount: number;

}

export interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  lastChapter: string;
  category: string;
  thumbnail: string;
  lastAccessed: string;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  progress: number;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  status: 'in-progress' | 'not-started' | 'completed';
}

export interface UpcomingEvent {
  id: string;
  title: string;
  type: 'live-session' | 'deadline' | 'quiz';
  date: string;
  time: string;
  course: string;
  isImportant: boolean;
}

export interface UserStats {
  coursesCompleted: number;
  coursesInProgress: number;
  totalHoursLearned: number;
  certificatesEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  progress: number;
}

// Learning Progress types
export interface QuizScore {
  id: string;
  courseId: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  course: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  title: string;
  issueDate: string;
  course: string;
  credentialUrl: string;
}

// Events and scheduling types
export interface Event {
  id: string;
  title: string;
  type: 'live-session' | 'assignment' | 'quiz' | 'deadline';
  date: string;
  time: string;
  course: string;
  courseId: string;
  isImportant: boolean;
  description?: string;
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  grade?: number;
  maxGrade: number;
  feedback?: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error' | 'course' | 'assignment' | 'quiz' | 'message' | 'system';
  link?: string;
}

// Message types
export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'instructor' | 'admin';
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'instructor' | 'admin';
  }[];
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
}

// Billing and subscription types
export interface Subscription {
  id: string;
  plan: 'free' | 'basic' | 'premium' | 'team';
  status: 'active' | 'canceled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  renewalDate?: string;
  price: number;
  billingCycle: 'monthly' | 'annual';
  features: string[];
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'bank_transfer';
  details: {
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    email?: string;
  };
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  items: {
    description: string;
    amount: number;
  }[];
  downloadUrl: string;
}

