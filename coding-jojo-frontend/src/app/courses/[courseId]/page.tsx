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
  Video,
  Eye  // Add this line
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
    <div className="bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">{item.icon}</span>
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
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
      <div className="min-h-screen bg-white text-gray-900">
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
              className="object-cover opacity-10"
              priority />
            <div className="absolute inset-0 bg-white"></div>
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 pt-8 pb-12">
            <div className="max-w-7xl mx-auto px-4">
            

              {/* Course Information and Enhanced Course Preview Card - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Course Information - Enhanced */}
                <div className="lg:col-span-2">
                   {/* Course Preview Screen - At the Top */}
              <div className="mb-8">
                <div className="bg-white  shadow-xl overflow-hidden border border-gray-200">
                  {/* Preview Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-emerald-600 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Course Preview</h2>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="p-6">
                    <div className="relative group">
                      {/* Course Thumbnail/Preview Image */}
                      <div className="relative aspect-video bg-gray-900  overflow-hidden shadow-lg">
                        <Image
                          src={typeof course.thumbnail === 'string' && course.thumbnail.trim() !== ''
                            ? course.thumbnail
                            : "/placeholder-course.jpg"}
                          alt={course.title || "Course preview"}
                          width={1200}
                          height={675}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e: any) => {
                            try {
                              e.currentTarget.src = '/placeholder-course.jpg';
                            } catch (err) {
                              // ignore
                            }
                          }}
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-24 h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                            <Play className="w-10 h-10 text-blue-600 ml-1" />
                          </button>
                        </div>

                        {/* Course Duration Badge */}
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1.5  font-semibold shadow-lg">
                          {(() => {
                            const duration = course.duration;
                            if (!duration) return 'N/A';
                            if (typeof duration === 'object' && duration && 'hours' in duration && 'minutes' in duration) {
                              const hours = (duration as any).hours;
                              const minutes = (duration as any).minutes;
                              return `${hours}h ${minutes}m`;
                            }
                            return String(duration);
                          })()}
                        </div>

                        {/* Course Level Badge */}
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1.5  font-semibold shadow-lg">
                          {course.level || 'All Levels'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                  {/* Course Level Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1.5  text-sm font-medium ${course.level === 'beginner'
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : course.level === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                          : 'bg-red-100 text-red-700 border border-red-200'}`}>
                      <Award className="w-4 h-4 mr-1.5" />
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    {course.category && (
                      <span className="inline-flex items-center px-3 py-1.5  text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200">
                        <Tag className="w-4 h-4 mr-1.5" />
                        {course.category}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      {course.title}
                    </span>
                  </h1>

                  <p className="text-xs text-gray-700 mb-6 leading-relaxed max-w-4xl">
                    {course.description}
                  </p>

                  {/* Course Stats - Enhanced Design */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm border border-blue-100  shadow-sm">
                      <div className="flex items-center gap-1">
                        <RatingStars rating={course.rating} />
                        <span className="text-amber-600 font-bold text-sm">{course.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ({course.ratingCount} reviews)
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm border border-blue-100  shadow-sm">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs font-bold text-gray-900">{course.students.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm border border-blue-100  shadow-sm">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs font-bold text-gray-900">{course.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm border border-blue-100  shadow-sm">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs font-bold text-gray-900">{course.lectures}</div>
                        <div className="text-sm text-gray-600">Lectures</div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Social Actions */}
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={handleLikeCourse}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium  transition-all duration-300 ${courseStats.isLiked
                          ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-sm'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                    >
                      <Heart className={`w-4 h-4 ${courseStats.isLiked ? 'fill-current' : ''}`} />
                      <span>{typeof courseStats.totalLikes === 'number' ? courseStats.totalLikes : 0}</span>
                      <span className="hidden sm:inline">Like</span>
                    </button>

                    <button
                      onClick={handleShareCourse}
                      disabled={sharing}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 border border-gray-300 text-sm font-medium "
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{sharing ? 'Sharing...' : (typeof courseStats.totalShares === 'number' ? courseStats.totalShares : 0)}</span>
                      <span className="hidden sm:inline">Share</span>
                    </button>

                    <button
                      onClick={() => setShowRatingForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-medium  shadow-sm"
                    >
                      <Star className="w-4 h-4" />
                      <span className="hidden sm:inline">Rate Course</span>
                    </button>
                  </div>

                  {/* Enhanced Instructor Section */}
                  <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm border border-blue-100  shadow-sm">
                    <div className="relative">
                      <Image
                        src={(course.instructor?.avatarUrl && typeof course.instructor.avatarUrl === 'string' && course.instructor.avatarUrl.trim() !== '') ? course.instructor.avatarUrl : '/default-avatar.png'}
                        alt={course.instructor?.name || 'Instructor'}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-blue-200" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">Course Instructor</p>
                      <h3 className="font-bold text-xs text-gray-900 mb-1">{course.instructor.name}</h3>
                      <p className="text-gray-600 text-sm">{course.instructor.role}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Course Preview Card */}
                <div className="lg:col-span-1">
                  <div className="bg-white/90 backdrop-blur-md p-6 sticky top-8 border border-blue-200 shadow-lg ">
                    <div className="relative mb-4 overflow-hidden  group">
                      <Image
                        src={(course.thumbnail && typeof course.thumbnail === 'string' && course.thumbnail.trim() !== '') ? course.thumbnail : '/default-course.jpg'}
                        alt={course.title || 'Course preview'}
                        width={400}
                        height={225}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      {course.videoPreview && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
                            <Play className="w-6 h-6 text-gray-900 fill-current ml-1" />
                          </button>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          PREMIUM
                        </span>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                          ${course.price}
                        </span>
                        <Sparkles className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-gray-600 text-sm">One-time payment • Lifetime access</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {!isInCart(course.id) ? (
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-4 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-md "
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      ) : (
                        <div className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-4 flex items-center justify-center gap-2 shadow-md ">
                          <CheckCircle className="w-4 h-4" />
                          ✓ Added to Cart
                        </div>
                      )}

                      <Link href="/cart" className="block">
                        <button className="w-full border-2 border-blue-300 text-gray-700 py-2 px-4 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 font-medium ">
                          View Cart
                        </button>
                      </Link>
                    </div>

                    {/* Course Details */}
                    <div className="space-y-3 p-4 bg-blue-50/50 border border-blue-200 ">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        This course includes:
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium text-gray-900">{course.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Lectures:</span>
                          <span className="font-medium text-gray-900">{course.lectures} lessons</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Level:</span>
                          <span className="font-medium text-gray-900 capitalize">{course.level}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Language:</span>
                          <span className="font-medium text-gray-900">English</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Certificate:</span>
                          <span className="font-medium text-gray-900">✓ Included</span>
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-blue-200  max-w-md w-full p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rate this Course</h3>
                <p className="text-gray-600">Share your learning experience</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`text-2xl transition-all duration-200 hover:scale-110 ${star <= userRating ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {userRating === 1 ? 'Poor' :
                      userRating === 2 ? 'Fair' :
                        userRating === 3 ? 'Good' :
                          userRating === 4 ? 'Very Good' : 'Excellent'}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Review (Optional)
                </label>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Share your thoughts about this course..."
                  className="w-full p-3 bg-gray-50 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300  transition-all duration-200"
                  rows={3} />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRatingForm(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200 font-medium "
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRating}
                  disabled={!userRating || submittingRating}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 font-medium  shadow-sm"
                >
                  {submittingRating ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </div>
          </div>
        )}



        {/* Enhanced Course Content Tabs */}
        <div className="relative z-10 py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-md overflow-hidden border border-blue-200 shadow-lg ">
              {/* Enhanced Tab Navigation */}
              <div className="border-b border-blue-100">
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
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap relative ${activeTab === tab.id
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"}`}
                    >
                      {activeTab === tab.id && (
                        <div className="absolute inset-0 bg-blue-50/50 border-b-2 border-blue-600"></div>
                      )}
                      <div className="relative z-10 flex items-center gap-2">
                        {tab.icon}
                        {tab.label}
                        {tab.id === 'comments' && courseStats.totalComments > 0 && (
                          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[18px] h-4 flex items-center justify-center">
                            {typeof courseStats.totalComments === 'number' ? courseStats.totalComments : 0}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Course Overview</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </div>

                    {Array.isArray(course.tags) && course.tags.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
                            <Tag className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Technologies & Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 text-sm px-3 py-1  border border-blue-200 hover:border-blue-300 transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Objectives */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">What You'll Learn</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Master the fundamentals and core concepts",
                          "Build real-world projects and applications",
                          "Learn industry best practices and techniques",
                          "Understand advanced patterns and methods",
                          "Gain practical, hands-on experience",
                          "Prepare for professional development"
                        ].map((objective, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 ">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Course Curriculum</h3>
                    </div>
                    <div className="bg-blue-50/50 p-6 border border-blue-200 ">
                      <div className="text-gray-700 space-y-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {course.lectures} Lessons
                          </div>
                          <div className="text-gray-500">•</div>
                          <div className="text-gray-600">{course.duration} total content</div>
                        </div>
                        <p className="mb-4">This comprehensive course includes {course.lectures} carefully structured lessons covering:</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            "Fundamentals and core concepts",
                            "Practical exercises and projects",
                            "Advanced techniques and best practices",
                            "Real-world applications and examples",
                            "Industry insights and current trends",
                            "Hands-on coding challenges"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white border border-blue-100 ">
                              <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {index + 1}
                              </div>
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Discussion ({typeof courseStats.totalComments === 'number' ? courseStats.totalComments : 0})
                        </h3>
                      </div>
                    </div>

                    {/* Enhanced Add Comment Form */}
                    <div className="mb-8 p-4 bg-blue-50/50 border border-blue-200 ">
                      <h4 className="text-xs font-semibold text-gray-900 mb-3">Join the Discussion</h4>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this course..."
                        className="w-full p-3 bg-white text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300  transition-all duration-200 mb-3"
                        rows={3} />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSubmitComment}
                          disabled={!newComment.trim() || submittingComment}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 flex items-center gap-2 font-medium  shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                          {submittingComment ? 'Posting...' : 'Post Comment'}
                        </button>
                      </div>
                    </div>

                    {/* Enhanced Comments List */}
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment._id} className="bg-white p-4 border border-gray-200  shadow-sm">
                          <div className="flex items-start gap-3">
                            <Image
                              src={(comment.user?.avatar && typeof comment.user.avatar === 'string' && comment.user.avatar.trim() !== '') ? comment.user.avatar : '/default-avatar.png'}
                              alt={comment.user?.name || 'Anonymous'}
                              width={40}
                              height={40}
                              className="rounded-full border-2 border-gray-300" />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-gray-900">{comment.user.name}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>

                              <div className="flex items-center gap-4 text-sm">
                                <button
                                  onClick={() => handleLikeComment(comment._id)}
                                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{typeof comment.totalLikes === 'number' ? comment.totalLikes : 0}</span>
                                </button>

                                <button
                                  onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                >
                                  <Reply className="w-4 h-4" />
                                  Reply
                                </button>
                              </div>

                              {/* Enhanced Reply Form */}
                              {replyingTo === comment._id && (
                                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 ">
                                  <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Write your reply..."
                                    className="w-full p-2 bg-white text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300  mb-2"
                                    rows={2} />
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent('');
                                      } }
                                      className="px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleSubmitReply(comment._id)}
                                      disabled={!replyContent.trim() || submittingReply}
                                      className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 font-medium  text-sm"
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
                                        className="rounded-full border-2 border-gray-600" />
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
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500  flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Student Reviews</h3>
                    </div>
                    <div className="text-center py-12 text-gray-600">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Star className="w-8 h-8 text-yellow-500 opacity-70" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">Reviews Coming Soon!</h4>
                      <p>Detailed student reviews and ratings will be available here.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Meet Your Instructor</h3>
                    </div>
                    <div className="bg-blue-50/50 p-6 border border-blue-200 ">
                      <div className="flex items-start gap-6">
                        <div className="relative">
                          <img
                            src={(course.instructor?.avatarUrl && typeof course.instructor.avatarUrl === 'string' && course.instructor.avatarUrl.trim() !== '')
                              ? course.instructor.avatarUrl.trim()
                              : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
                            alt={course.instructor?.name || 'Instructor'}
                            className="w-24 h-24 rounded-full border-4 border-blue-200 object-cover" />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor.name}</h4>
                          <p className="text-xs text-gray-600 mb-4">{course.instructor.role}</p>
                          <p className="text-gray-700 leading-relaxed">
                            Experienced instructor passionate about teaching and helping students achieve their goals.
                            With years of industry experience, brings real-world knowledge to every lesson, ensuring
                            students gain practical skills that can be applied immediately in their careers.
                          </p>

                          {/* Instructor Stats */}
                          <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900">15+</div>
                              <div className="text-sm text-gray-600">Years Experience</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900">10k+</div>
                              <div className="text-sm text-gray-600">Students Taught</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900">4.9</div>
                              <div className="text-sm text-gray-600">Instructor Rating</div>
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
          <div className="relative z-10 py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">You Might Also Like</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedCourses.slice(0, 4).map((relatedCourse) => (
                  <div key={relatedCourse.id} className="group h-full flex flex-col overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:translate-y-[-1px] hover:border-blue-300">
                    {/* Course Image with Duration Badge */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={typeof relatedCourse.thumbnail === 'string' && relatedCourse.thumbnail.trim() !== ''
                          ? relatedCourse.thumbnail
                          : "/placeholder-course.jpg"}
                        alt={relatedCourse.title || "Course thumbnail"}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e: any) => {
                          try {
                            e.currentTarget.src = '/placeholder-course.jpg';
                          } catch (err) {
                            // ignore
                          }
                        }}
                      />

                      {/* Duration Badge */}
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                        {(() => {
                          const duration = relatedCourse.duration;
                          if (!duration) return 'N/A';
                          if (typeof duration === 'object' && duration !== null && 'hours' in duration && 'minutes' in duration) {
                            const durationObj = duration as { hours: number; minutes: number };
                            return `${durationObj.hours}h ${durationObj.minutes}m`;
                          }
                          return String(duration);
                        })()}
                      </div>

                      {/* Course Time Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{Math.floor((relatedCourse.lectures || 1) * 1.5)}h {Math.floor(((relatedCourse.lectures || 1) * 1.5 % 1) * 60)}m</span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-4">
                      {/* Rating and Level Row */}
                      <div className="flex items-center justify-between mb-2">
                        {/* Rating - Left */}
                        <div className="flex items-center gap-1">
                          <RatingStars rating={relatedCourse.rating} />
                          <span className="text-gray-600 text-xs ml-1">({relatedCourse.ratingCount})</span>
                        </div>

                        {/* Level - Right */}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-gray-600" />
                          <span className="text-gray-600 text-xs">{relatedCourse.level || 'All Levels'}</span>
                      </div>
                    </div>

                    {/* Course Title */}
                      <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedCourse.title}
                      </h3>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
                        {/* Lessons - Left */}
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                          <span>Lesson {relatedCourse.lectures || 0}</span>
                      </div>

                        {/* Students - Right */}
                      <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>Students {(relatedCourse.students || 0)}+</span>
                      </div>
                    </div>

                    {/* Instructor and Price */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="w-3 h-3 text-gray-600" />
                        </div>
                          <span className="text-xs text-gray-700 font-medium">{relatedCourse.instructor?.name || 'Unknown'}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-600 font-bold text-sm">
                          ${typeof relatedCourse.price === 'number' ? relatedCourse.price.toFixed(2) : relatedCourse.price}
                        </div>
                        {relatedCourse.originalPrice && (
                          <div className="text-gray-400 text-xs line-through">
                            ${typeof relatedCourse.originalPrice === 'number' ? relatedCourse.originalPrice.toFixed(2) : relatedCourse.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/courses/${relatedCourse.id}`}>
                          <button className="w-full py-1.5 px-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded">
                            <Eye className="h-3 w-3" />
                            <span>View Detail</span>
                          </button>
                        </Link>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart();
                          }}
                          className="w-full py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded"
                        >
                          <ShoppingCart className="h-3 w-3" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
              </div>
              ))}
            </div>
            </div>
      </div>
      )}
    </div>
    <Footer />
    </>
  );
}