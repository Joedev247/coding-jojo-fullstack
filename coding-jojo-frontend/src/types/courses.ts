// Course and related types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailUrl?: string; // FIXED: Add direct Cloudinary secure_url field
  courseContent?: Array<{
    sectionTitle: string;
    lessons: Array<{
      title: string;
      videoUrl?: string; // FIXED: Add direct video URL field
      videoData?: {
        url: string;
        publicId: string;
        duration: number;
        format: string;
        size: number;
        width: number;
        height: number;
        thumbnail: string;
      };
    }>;
  }>;
  instructor: {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
  };
  category: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lectures: number;
  studentsEnrolled: number;
  rating: number;
  ratingCount: number;
  progress: number;
  price: number;
  originalPrice?: number;
  isFeatured: boolean;
  isNew: boolean;
  isSaved: boolean;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

// Category interface
export interface Category {
  id: string;
  name: string;
  count?: number;
  icon?: React.ReactNode;
}

// Instructor interface
export interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  coursesCount: number;
  studentsCount: number;
  rating: number;
}


// Mock categories data
export const mockCategories = [
  { id: 'all', name: 'All Courses', count: 150 },
  { id: 'development', name: 'Web Development', count: 42 },
  { id: 'data science', name: 'Data Science', count: 38 },
  { id: 'mobile', name: 'Mobile Development', count: 24 },
  { id: 'design', name: 'Design', count: 18 },
  { id: 'cryptocurrency', name: 'Cryptocurrency', count: 12 },
  { id: 'marketing', name: 'Digital Marketing', count: 16 }
];

// Mock featured instructors
export const mockFeaturedInstructors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatarUrl: 'https://picsum.photos/id/1002/150',
    role: 'Senior Frontend Developer',
    coursesCount: 12,
    studentsCount: 15400,
    rating: 4.8
  },
  {
    id: '2',
    name: 'John Smith',
    avatarUrl: 'https://picsum.photos/id/1003/150',
    role: 'Data Scientist',
    coursesCount: 8,
    studentsCount: 12300,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Emily Chen',
    avatarUrl: 'https://picsum.photos/id/1005/150',
    role: 'Mobile App Developer',
    coursesCount: 6,
    studentsCount: 9200,
    rating: 4.7
  }
];