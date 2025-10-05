'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart,
  MessageCircle,
  ThumbsUp,
  Send,
  Reply,
  Tag,
  Globe,
  ChevronRight,
  Home,
  Award,
  GraduationCap,
  Calendar,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Video
} from 'lucide-react';
import { courseService } from '../../../services/courseService';
import { useCart } from '../../../contexts/CartContext';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import RatingStars from '../../../components/ui/RatingStars';

interface Course {
  id: string;
  _id?: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  videoPreview?: string;
  duration: string;
  lectures: number;
  students: number;
  level: string;
  rating: number;
  ratingCount: number;
  tags: string[];
  instructor: {
    id?: string;
    name: string;
    role: string;
    avatar?: string;
    avatarUrl?: string;
    bio?: string;
  };
  likes: number;
  comments: number;
  shares: number;
  totalEnrollments?: number;
  studentsEnrolled?: number;
  totalLessons?: number;
  averageRating?: number;
  totalRatings?: number;
  category?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isSaved?: boolean;
  createdAt?: string;
  progress?: number;
  originalPrice?: number;
  status?: 'draft' | 'published' | 'archived';
}

interface Comment {
  _id: string;
  content: string;
  user: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  totalLikes: number;
  replies: Reply[];
}

interface Reply {
  _id: string;
  content: string;
  user: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface CourseStats {
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  isLiked: boolean;
}

// Enhanced Breadcrumb Component
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

const EnhancedBreadcrumb = ({ course }: { course: Course | null }) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="w-4 h-4" />
    },
    {
      label: 'Courses',
      href: '/courses',
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  if (course) {
    breadcrumbItems.push({
      label: course.category || 'Course',
      href: `/courses?category=${course.category?.toLowerCase()}`,
      icon: <GraduationCap className="w-4 h-4" />
    });
    
    breadcrumbItems.push({
      label: course.title,
      icon: <Video className="w-4 h-4" />
    });
  }

  return (
    <div className="backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-500 mx-2" />
              )}
              <div className="flex items-center space-x-2">
                {item.icon}
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    {item.label.length > 50 ? `${item.label.substring(0, 50)}...` : item.label}
                  </span>
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const { addToCart, isInCart } = useCart();

  // Course data states
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Interactive states
  const [courseStats, setCourseStats] = useState<CourseStats>({
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    isLiked: false
  });

  // UI states
  const [activeTab, setActiveTab] = useState('overview');
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Comments states
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsPage, setCommentsPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(false);

  // Reply states
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  // Load course data
  useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadComments();
    }
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      
      // Load course details
      const courseResponse = await courseService.getCourseById(courseId);
      if (courseResponse.success && courseResponse.data) {
        const courseData = courseResponse.data as any; // Use any to handle flexible backend structure
        
        // Map the course data to match our interface
        const mappedCourse: Course = {
          id: courseData._id || courseData.id || '',
          title: courseData.title || '',
          description: courseData.description || '',
          price: courseData.price || 0,
          thumbnail: courseData.thumbnail || '/default-course.jpg',
          duration: typeof courseData.duration === 'object' && courseData.duration
            ? `${courseData.duration.hours || 0}h ${courseData.duration.minutes || 0}m` 
            : courseData.duration || '0h 0m',
          lectures: courseData.totalLessons || courseData.lectures || 0,
          students: courseData.totalEnrollments || courseData.studentsEnrolled || courseData.students || 0,
          level: courseData.level || 'beginner',
          rating: courseData.averageRating || courseData.rating || 0,
          ratingCount: courseData.totalRatings || courseData.ratingCount || 0,
          tags: Array.isArray(courseData.tags) ? courseData.tags : [],
          instructor: {
            id: courseData.instructor?._id || courseData.instructor?.id || '',
            name: courseData.instructor?.name || 'Unknown Instructor',
            role: courseData.instructor?.role || courseData.instructor?.bio || 'Instructor',
            avatarUrl: courseData.instructor?.avatar || courseData.instructor?.avatarUrl || '/default-avatar.png'
          },
          likes: typeof courseData.likes === 'number' ? courseData.likes : (Array.isArray(courseData.likes) ? courseData.likes.length : 0),
          comments: typeof courseData.comments === 'number' ? courseData.comments : (Array.isArray(courseData.comments) ? courseData.comments.length : 0),
          shares: typeof courseData.shares === 'number' ? courseData.shares : (Array.isArray(courseData.shares) ? courseData.shares.length : 0),
          category: courseData.category,
          isFeatured: courseData.isFeatured,
          isNew: courseData.isNew,
          isSaved: courseData.isSaved,
          createdAt: courseData.createdAt,
          progress: courseData.progress,
          originalPrice: courseData.originalPrice,
          status: courseData.status
        };
        
        setCourse(mappedCourse);
        setCourseStats({
          totalLikes: typeof mappedCourse.likes === 'number' ? mappedCourse.likes : 0,
          totalComments: typeof mappedCourse.comments === 'number' ? mappedCourse.comments : 0,
          totalShares: typeof mappedCourse.shares === 'number' ? mappedCourse.shares : 0,
          isLiked: false // Will be updated based on user data
        });
      }

      // Load related courses
      const relatedResponse = await courseService.getCourses();
      if (relatedResponse.success && relatedResponse.data) {
        // Filter out current course and get similar ones, then map them
        const filtered = relatedResponse.data
          .filter((c: any) => (c.id || c._id) !== courseId)
          .slice(0, 3)
          .map((courseData: any): Course => ({
            id: courseData.id || courseData._id,
            title: courseData.title,
            description: courseData.description,
            price: courseData.price,
            thumbnail: courseData.thumbnail || '/default-course.jpg',
            duration: typeof courseData.duration === 'object' 
              ? `${courseData.duration.hours}h ${courseData.duration.minutes}m` 
              : courseData.duration || '0h 0m',
            lectures: courseData.totalLessons || courseData.lectures || 0,
            students: courseData.totalEnrollments || courseData.students || 0,
            level: courseData.level,
            rating: courseData.averageRating || courseData.rating || 0,
            ratingCount: courseData.totalRatings || courseData.ratingCount || 0,
            tags: Array.isArray(courseData.tags) ? courseData.tags : [],
            instructor: {
              name: courseData.instructor?.name || 'Unknown Instructor',
              role: courseData.instructor?.role || courseData.instructor?.bio || 'Instructor',
              avatarUrl: courseData.instructor?.avatar || courseData.instructor?.avatarUrl || '/default-avatar.png'
            },
            likes: typeof courseData.likes === 'number' ? courseData.likes : (Array.isArray(courseData.likes) ? courseData.likes.length : 0),
            comments: typeof courseData.comments === 'number' ? courseData.comments : (Array.isArray(courseData.comments) ? courseData.comments.length : 0),
            shares: typeof courseData.shares === 'number' ? courseData.shares : (Array.isArray(courseData.shares) ? courseData.shares.length : 0)
          }));
        setRelatedCourses(filtered);
      }
    } catch (error) {
      console.error('Error loading course data:', error);
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (page: number = 1, reset: boolean = false) => {
    if (!courseId) return;
    
    try {
      setLoadingComments(true);
      const response = await courseService.getCourseComments(courseId, page, 10);
      
      if (response.success && response.data) {
        // Map comments data to ensure proper structure
        const mappedComments = response.data.map((comment: any) => ({
          _id: comment._id || comment.id,
          content: comment.content || '',
          user: {
            name: comment.user?.name || 'Anonymous',
            avatar: comment.user?.avatar || '/default-avatar.png'
          },
          createdAt: comment.createdAt || new Date().toISOString(),
          totalLikes: typeof comment.totalLikes === 'number' ? comment.totalLikes : (comment.likes?.length || 0),
          replies: Array.isArray(comment.replies) ? comment.replies.map((reply: any) => ({
            _id: reply._id || reply.id,
            content: reply.content || '',
            user: {
              name: reply.user?.name || 'Anonymous',
              avatar: reply.user?.avatar || '/default-avatar.png'
            },
            createdAt: reply.createdAt || new Date().toISOString()
          })) : []
        }));
        
        if (reset) {
          setComments(mappedComments);
        } else {
          setComments(prev => [...prev, ...mappedComments]);
        }
        
        const pagination = (response as any).pagination;
        setHasMoreComments(pagination?.hasNextPage || false);
        setCommentsPage(page);
        
        setCourseStats(prev => ({
          ...prev,
          totalComments: typeof pagination?.totalComments === 'number' ? pagination.totalComments : (typeof prev.totalComments === 'number' ? prev.totalComments : 0)
        }));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLikeCourse = async () => {
    if (!course) return;
    
    try {
      const response = await courseService.likeCourse(course.id);
      if (response.success && response.data) {
        const data = response.data;
        setCourseStats(prev => ({
          ...prev,
          isLiked: Boolean(data.isLiked),
          totalLikes: typeof data.totalLikes === 'number' ? data.totalLikes : (Array.isArray(data.totalLikes) ? (data.totalLikes as any[]).length : 0)
        }));
        toast.success(data.isLiked ? 'Course liked!' : 'Course unliked!');
      }
    } catch (error) {
      console.error('Error liking course:', error);
      toast.error('Failed to like course');
    }
  };

  const handleShareCourse = async () => {
    if (!course) return;
    
    try {
      setSharing(true);
      
      const shareUrl = window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      
      const response = await courseService.shareCourse(course.id);
      if (response.success && response.data) {
        const data = response.data;
        setCourseStats(prev => ({
          ...prev,
          totalShares: typeof data.shares === 'number' ? data.shares : (Array.isArray(data.shares) ? (data.shares as any[]).length : 0)
        }));
      }
      
      toast.success('Course link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing course:', error);
      toast.error('Failed to share course');
    } finally {
      setSharing(false);
    }
  };

  const handleSubmitRating = async () => {
    if (!course || !userRating) return;
    
    try {
      setSubmittingRating(true);
      const response = await courseService.rateCourse(course.id, userRating, userReview);
      
      if (response.success) {
        toast.success('Rating submitted successfully!');
        setShowRatingForm(false);
        setUserRating(0);
        setUserReview('');
        loadCourseData(); // Refresh to get updated rating
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!courseId || !newComment.trim()) return;
    
    try {
      setSubmittingComment(true);
      const response = await courseService.addComment(courseId, newComment);
      
      if (response.success) {
        setNewComment('');
        toast.success('Comment added successfully!');
        loadComments(1, true); // Refresh comments
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await courseService.likeComment(courseId, commentId);
      if (response.success && response.data) {
        const data = response.data;
        setComments(prev => 
          prev.map(comment => 
            comment._id === commentId 
              ? { ...comment, totalLikes: data.totalLikes }
              : comment
          )
        );
        toast.success('Comment liked!');
      }
    } catch (error) {
      console.error('Error liking comment:', error);
      toast.error('Failed to like comment');
    }
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;
    
    try {
      setSubmittingReply(true);
      const response = await courseService.addReply(courseId, commentId, replyContent);
      
      if (response.success) {
        setReplyContent('');
        setReplyingTo(null);
        toast.success('Reply added successfully!');
        loadComments(1, true); // Refresh comments
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Failed to add reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleAddToCart = () => {
    if (course) {
      // Create a cart-compatible course object
      const cartCourse = {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        instructor: {
          id: course.instructor.id || course.id,
          name: course.instructor.name,
          avatarUrl: course.instructor.avatarUrl || '/default-avatar.png',
          role: course.instructor.role
        },
        category: course.category || 'general',
        tags: Array.isArray(course.tags) ? course.tags : [],
        level: course.level as 'beginner' | 'intermediate' | 'advanced',
        duration: course.duration,
        lectures: course.lectures,
        studentsEnrolled: course.students,
        rating: course.rating,
        ratingCount: course.ratingCount,
        progress: course.progress || 0,
        price: course.price,
        originalPrice: course.originalPrice,
        isFeatured: course.isFeatured || false,
        isNew: course.isNew || false,
        isSaved: course.isSaved || false,
        createdAt: course.createdAt || new Date().toISOString(),
        status: course.status || 'published'
      };
      
      addToCart(cartCourse);
      toast.success('Course added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-gray-400 mb-6">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="bg-pink-500 text-white px-6 py-3 hover:bg-pink-600 transition duration-200">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white">
        {/* Enhanced Breadcrumb */}
        <EnhancedBreadcrumb course={course} />
        
        {/* Hero Section with Enhanced Design */}
        <div className="relative overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            <Image
              src={(course.thumbnail && typeof course.thumbnail === 'string' && course.thumbnail.trim() !== '') ? course.thumbnail : '/default-course.jpg'}
              alt={course.title || 'Course thumbnail'}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90"></div>
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 pt-12 pb-20">
            <div className="max-w-[1400px] mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Course Information - Enhanced */}
                <div className="lg:col-span-2">
                  {/* Course Level Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      course.level === 'beginner' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : course.level === 'intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      <Award className="w-4 h-4 mr-2" />
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    {course.category && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-800/50 text-gray-300 border border-gray-700">
                        <Tag className="w-4 h-4 mr-2" />
                        {course.category}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      {course.title}
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
                    {course.description}
                  </p>

                  {/* Course Stats - Enhanced Design */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <RatingStars rating={course.rating} />
                        <span className="text-yellow-400 font-bold text-lg">{course.rating}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        ({course.ratingCount} reviews)
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                      <Users className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="text-lg font-bold text-white">{course.students.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Students</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                      <Clock className="w-6 h-6 text-green-400" />
                      <div>
                        <div className="text-lg font-bold text-white">{course.duration}</div>
                        <div className="text-sm text-gray-400">Duration</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                      <div>
                        <div className="text-lg font-bold text-white">{course.lectures}</div>
                        <div className="text-sm text-gray-400">Lectures</div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Social Actions */}
                  <div className="flex items-center gap-4 mb-10">
                    <button
                      onClick={handleLikeCourse}
                      className={`flex items-center gap-3 px-6 py-3 font-semibold transition-all duration-300 ${
                        courseStats.isLiked 
                          ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/25' 
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${courseStats.isLiked ? 'fill-current' : ''}`} />
                      <span>{typeof courseStats.totalLikes === 'number' ? courseStats.totalLikes : 0}</span>
                      <span className="hidden sm:inline">Like</span>
                    </button>
                    
                    <button
                      onClick={handleShareCourse}
                      disabled={sharing}
                      className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 border border-gray-600 font-semibold"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>{sharing ? 'Sharing...' : (typeof courseStats.totalShares === 'number' ? courseStats.totalShares : 0)}</span>
                      <span className="hidden sm:inline">Share</span>
                    </button>
                    
                    <button
                      onClick={() => setShowRatingForm(true)}
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-semibold shadow-lg shadow-orange-500/25"
                    >
                      <Star className="w-5 h-5" />
                      <span className="hidden sm:inline">Rate Course</span>
                    </button>
                  </div>

                  {/* Enhanced Instructor Section */}
                  <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50">
                    <div className="relative">
                      <Image
                        src={(course.instructor?.avatarUrl && typeof course.instructor.avatarUrl === 'string' && course.instructor.avatarUrl.trim() !== '') ? course.instructor.avatarUrl : '/default-avatar.png'}
                        alt={course.instructor?.name || 'Instructor'}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-gray-600"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Course Instructor</p>
                      <h3 className="font-bold text-xl text-white mb-2">{course.instructor.name}</h3>
                      <p className="text-gray-400 text-sm">{course.instructor.role}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Course Preview Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md p-8 sticky top-8 border border-gray-700/50 shadow-2xl">
                    <div className="relative mb-6 overflow-hidden group">
                      <Image
                        src={(course.thumbnail && typeof course.thumbnail === 'string' && course.thumbnail.trim() !== '') ? course.thumbnail : '/default-course.jpg'}
                        alt={course.title || 'Course preview'}
                        width={400}
                        height={225}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      {course.videoPreview && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110">
                            <Play className="w-8 h-8 text-black fill-current ml-1" />
                          </button>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          PREMIUM
                        </span>
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                          ${course.price}
                        </span>
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </div>
                      <p className="text-gray-400 text-sm">One-time payment • Lifetime access</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {!isInCart(course.id) ? (
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-4 px-6 hover:from-pink-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-pink-500/25 transform hover:scale-105"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </button>
                      ) : (
                        <div className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 flex items-center justify-center gap-3 shadow-lg shadow-green-500/25">
                          <CheckCircle className="w-5 h-5" />
                          ✓ Added to Cart
                        </div>
                      )}
                      
                      <Link href="/cart" className="block">
                        <button className="w-full border-2 border-gray-600 text-white py-3 px-6 hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 font-medium">
                          View Cart
                        </button>
                      </Link>
                    </div>

                    {/* Course Details */}
                    <div className="space-y-4 p-4 bg-gray-800/30 border border-gray-700/50">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        This course includes:
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Duration:</span>
                          <span className="font-medium text-white">{course.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Lectures:</span>
                          <span className="font-medium text-white">{course.lectures} lessons</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Level:</span>
                          <span className="font-medium text-white capitalize">{course.level}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Language:</span>
                          <span className="font-medium text-white">English</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Certificate:</span>
                          <span className="font-medium text-white">✓ Included</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Rating Modal */}
        {showRatingForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 max-w-md w-full p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Rate this Course</h3>
                <p className="text-gray-400">Share your learning experience</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Your Rating
                </label>
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`text-4xl transition-all duration-200 hover:scale-110 ${
                        star <= userRating ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-500'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <p className="text-center text-sm text-gray-400 mt-2">
                    {userRating === 1 ? 'Poor' : 
                     userRating === 2 ? 'Fair' : 
                     userRating === 3 ? 'Good' : 
                     userRating === 4 ? 'Very Good' : 'Excellent'}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Your Review (Optional)
                </label>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Share your thoughts about this course..."
                  className="w-full p-4 bg-gray-800/50 text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-600 transition-all duration-200"
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowRatingForm(false)}
                  className="flex-1 py-3 px-6 bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRating}
                  disabled={!userRating || submittingRating}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 font-medium shadow-lg shadow-orange-500/25"
                >
                  {submittingRating ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Course Content Tabs */}
        <div className="relative z-10 py-20 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md overflow-hidden border border-gray-700/50 shadow-2xl">
              {/* Enhanced Tab Navigation */}
              <div className="border-b border-gray-700/50">
                <div className="flex overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview", icon: <BookOpen className="w-4 h-4" /> },
                    { id: "curriculum", label: "Curriculum", icon: <GraduationCap className="w-4 h-4" /> },
                    { id: "comments", label: "Comments", icon: <MessageCircle className="w-4 h-4" /> },
                    { id: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
                    { id: "instructor", label: "Instructor", icon: <Award className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-8 py-6 text-sm font-medium transition-all duration-300 whitespace-nowrap relative ${
                        activeTab === tab.id
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {activeTab === tab.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 border-b-2 border-gradient-to-r from-pink-500 to-orange-500"></div>
                      )}
                      <div className="relative z-10 flex items-center gap-3">
                        {tab.icon}
                        {tab.label}
                        {tab.id === 'comments' && courseStats.totalComments > 0 && (
                          <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                            {typeof courseStats.totalComments === 'number' ? courseStats.totalComments : 0}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-10">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Course Overview</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">{course.description}</p>
                    </div>

                    {Array.isArray(course.tags) && course.tags.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <Tag className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">Technologies & Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {course.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 text-sm px-4 py-2 border border-gray-600 hover:border-gray-500 transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Objectives */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">What You'll Learn</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Master the fundamentals and core concepts",
                          "Build real-world projects and applications",
                          "Learn industry best practices and techniques",
                          "Understand advanced patterns and methods",
                          "Gain practical, hands-on experience",
                          "Prepare for professional development"
                        ].map((objective, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/30 border border-gray-700/50">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                            <span className="text-gray-300">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Course Curriculum</h3>
                    </div>
                    <div className="bg-gray-800/30 p-8 border border-gray-700/50">
                      <div className="text-gray-300 space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                            {course.lectures} Lessons
                          </div>
                          <div className="text-gray-400">•</div>
                          <div className="text-gray-400">{course.duration} total content</div>
                        </div>
                        <p className="text-lg mb-6">This comprehensive course includes {course.lectures} carefully structured lessons covering:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Fundamentals and core concepts",
                            "Practical exercises and projects", 
                            "Advanced techniques and best practices",
                            "Real-world applications and examples",
                            "Industry insights and current trends",
                            "Hands-on coding challenges"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-900/50">
                              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {index + 1}
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          Discussion ({typeof courseStats.totalComments === 'number' ? courseStats.totalComments : 0})
                        </h3>
                      </div>
                    </div>

                    {/* Enhanced Add Comment Form */}
                    <div className="mb-10 p-6 bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50">
                      <h4 className="text-lg font-semibold text-white mb-4">Join the Discussion</h4>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this course..."
                        className="w-full p-4 bg-gray-800/50 text-white resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-600 transition-all duration-200 mb-4"
                        rows={4}
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSubmitComment}
                          disabled={!newComment.trim() || submittingComment}
                          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 flex items-center gap-3 font-semibold shadow-lg shadow-pink-500/25"
                        >
                          <Send className="w-4 h-4" />
                          {submittingComment ? 'Posting...' : 'Post Comment'}
                        </button>
                      </div>
                    </div>

                    {/* Enhanced Comments List */}
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment._id} className="bg-gray-800/30 p-6 border border-gray-700/50">
                          <div className="flex items-start gap-4">
                            <Image
                              src={(comment.user?.avatar && typeof comment.user.avatar === 'string' && comment.user.avatar.trim() !== '') ? comment.user.avatar : '/default-avatar.png'}
                              alt={comment.user?.name || 'Anonymous'}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-gray-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-white">{comment.user.name}</span>
                                <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-300 mb-4 leading-relaxed">{comment.content}</p>
                              
                              <div className="flex items-center gap-6 text-sm">
                                <button
                                  onClick={() => handleLikeComment(comment._id)}
                                  className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors duration-200"
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{typeof comment.totalLikes === 'number' ? comment.totalLikes : 0}</span>
                                </button>
                                
                                <button
                                  onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                >
                                  <Reply className="w-4 h-4" />
                                  Reply
                                </button>
                              </div>

                              {/* Enhanced Reply Form */}
                              {replyingTo === comment._id && (
                                <div className="mt-4 p-4 bg-gray-900/50 border border-gray-600/50">
                                  <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Write your reply..."
                                    className="w-full p-3 bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-600 mb-3"
                                    rows={2}
                                  />
                                  <div className="flex justify-end gap-3">
                                    <button
                                      onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent('');
                                      }}
                                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleSubmitReply(comment._id)}
                                      disabled={!replyContent.trim() || submittingReply}
                                      className="px-4 py-2 bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200 disabled:opacity-50 font-medium"
                                    >
                                      {submittingReply ? 'Replying...' : 'Reply'}
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Enhanced Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-6 space-y-4">
                                  {comment.replies.map((reply) => (
                                    <div key={reply._id} className="flex items-start gap-3 pl-6 border-l-2 border-gray-600">
                                      <Image
                                        src={(reply.user?.avatar && typeof reply.user.avatar === 'string' && reply.user.avatar.trim() !== '') ? reply.user.avatar : '/default-avatar.png'}
                                        alt={reply.user?.name || 'Anonymous'}
                                        width={40}
                                        height={40}
                                        className="rounded-full border-2 border-gray-600"
                                      />
                                      <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium text-white text-sm">{reply.user?.name || 'Anonymous'}</span>
                                          <span className="text-xs text-gray-500">
                                            {new Date(reply.createdAt).toLocaleDateString()}
                                          </span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{reply.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Load More Comments */}
                      {hasMoreComments && (
                        <div className="text-center">
                          <button
                            onClick={() => loadComments(commentsPage + 1)}
                            disabled={loadingComments}
                            className="px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 font-medium"
                          >
                            {loadingComments ? 'Loading...' : 'Load More Comments'}
                          </button>
                        </div>
                      )}

                      {comments.length === 0 && !loadingComments && (
                        <div className="text-center py-16 text-gray-500">
                          <div className="w-16 h-16 bg-gray-800/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <MessageCircle className="w-8 h-8 opacity-50" />
                          </div>
                          <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Student Reviews</h3>
                    </div>
                    <div className="text-center py-16 text-gray-500">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Star className="w-10 h-10 text-yellow-400 opacity-50" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-400 mb-2">Reviews Coming Soon!</h4>
                      <p>Detailed student reviews and ratings will be available here.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Meet Your Instructor</h3>
                    </div>
                    <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-8 border border-gray-700/50">
                      <div className="flex items-start gap-8">
                        <div className="relative">
                          <img
                            src={
                              (course.instructor?.avatarUrl && typeof course.instructor.avatarUrl === 'string' && course.instructor.avatarUrl.trim() !== '') 
                                ? course.instructor.avatarUrl.trim() 
                                : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                            }
                            alt={course.instructor?.name || 'Instructor'}
                            className="w-36 h-36 rounded-full border-4 border-gray-600 object-cover"
                          />
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-3xl font-bold text-white mb-2">{course.instructor.name}</h4>
                          <p className="text-lg text-gray-400 mb-6">{course.instructor.role}</p>
                          <p className="text-gray-300 leading-relaxed text-lg">
                            Experienced instructor passionate about teaching and helping students achieve their goals.
                            With years of industry experience, brings real-world knowledge to every lesson, ensuring 
                            students gain practical skills that can be applied immediately in their careers.
                          </p>
                          
                          {/* Instructor Stats */}
                          <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">15+</div>
                              <div className="text-sm text-gray-400">Years Experience</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">10k+</div>
                              <div className="text-sm text-gray-400">Students Taught</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">4.9</div>
                              <div className="text-sm text-gray-400">Instructor Rating</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="relative z-10 py-20 bg-gradient-to-b from-gray-900/50 to-black">
            <div className="max-w-[1400px] mx-auto px-4">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">You Might Also Like</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedCourses.slice(0, 3).map((relatedCourse) => (
                  <Link href={`/courses/${relatedCourse.id}`} key={relatedCourse.id} className="group">
                    <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                      <div className="relative h-48">
                        <Image
                          src={relatedCourse.thumbnail || "/default-course.jpg"}
                          alt={relatedCourse.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-white mb-3 line-clamp-2 text-lg group-hover:text-gray-100 transition-colors duration-200">
                          {relatedCourse.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">{relatedCourse.instructor.name}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <RatingStars rating={relatedCourse.rating} />
                            <span className="text-xs text-gray-400">
                              ({relatedCourse.ratingCount})
                            </span>
                          </div>
                          <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                            ${relatedCourse.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Footer with Tags */}
        <div className="relative z-10 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm py-12 px-4 border-t border-gray-700/50">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex items-center flex-wrap gap-3">
                <div className="flex items-center gap-2 text-gray-400 mb-2 lg:mb-0">
                  <Tag className="w-5 h-5" />
                  <span className="font-medium">Topics:</span>
                </div>
                {Array.isArray(course.tags) && course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 text-sm px-4 py-2 rounded-full hover:from-gray-700 hover:to-gray-600 transition-all duration-200 cursor-pointer border border-gray-600 hover:border-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-gray-400 text-sm gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </div>
                <span>•</span>
                <span>Closed captions available</span>
                <span>•</span>
                <span>© 2025 Coding Jojo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}