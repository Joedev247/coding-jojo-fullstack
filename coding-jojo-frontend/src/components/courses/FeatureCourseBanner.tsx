import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock, Layers, CheckCircle, Calendar, Play, TrendingUp, AlertCircle } from 'lucide-react';
import RatingStars from './RatingStars';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/courses';
import { useAuth } from '../../contexts/AuthContext';

const FeaturedCourseBanner: React.FC = () => {
  const [featuredCourse, setFeaturedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchFeaturedCourse();
  }, []);

  const fetchFeaturedCourse = async () => {
    try {
      setLoading(true);
      const response = await courseService.getFeaturedCourses();
      
      if (response.success && response.data && response.data.length > 0) {
        // Map backend course object to frontend shape
        const c = response.data[0];
        const courseId = (c as any).id || (c as any)._id;
        if (courseId) {
          const mappedCourse: Course = {
              id: courseId,
              title: c.title,
              description: c.description,
              thumbnail: c.thumbnail || '',
              instructor: {
                id: (c.instructor as any)?._id || (c.instructor as any)?.id || '',
                name: c.instructor?.name || '',
                avatarUrl: typeof c.instructor?.avatarUrl === 'string'
                  ? c.instructor.avatarUrl
                  : ((c.instructor?.avatarUrl as any)?.url || c.instructor?.avatarUrl || ''),
                role: c.instructor?.role || '',
              },
              category: c.category,
              tags: c.tags || [],
              level: c.level,
              duration: c.duration,
              lectures: c.lectures,
              studentsEnrolled: c.studentsEnrolled ?? c.totalEnrollments ?? 0,
              rating: typeof c.rating === 'number'
                ? c.rating
                : (c.rating && typeof (c.rating as any).average === 'number' ? (c.rating as any).average : 0),
              ratingCount: (typeof c.rating === 'object' && c.rating !== null && typeof (c.rating as any).count === 'number')
                ? (c.rating as any).count
                : (c.ratingCount ?? (c as any).totalRatings ?? 0),
              progress: c.progress ?? 0,
              price: c.price,
              originalPrice: c.originalPrice,
              isFeatured: c.isFeatured,
              isNew: c.isNew ?? false,
              isSaved: c.isSaved ?? false,
              createdAt: c.createdAt,
              status: c.status,
            };
          setFeaturedCourse(mappedCourse);
          setError(null);
        } else {
          setFeaturedCourse(null);
          setError('Featured course data is incomplete. Please contact support or try again later.');
        }
      } else {
        setFeaturedCourse(null);
        setError('No featured courses available');
      }
    } catch (err) {
      console.error('Error fetching featured course:', err);
      setError('Failed to load featured course');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollNow = async () => {
    if (!featuredCourse) return;

    if (!user) {
      // Redirect to login if not authenticated
      router.push('/auth/login?redirect=' + encodeURIComponent(`/courses/${featuredCourse.id}`));
      return;
    }

    try {
      setEnrolling(true);
      const response = await courseService.enrollInCourse(featuredCourse.id);
      
      if (response.success) {
        // Redirect to course dashboard or show success message
        router.push(`/dashboard/courses/${featuredCourse.id}`);
      } else {
        setError(response.error || 'Failed to enroll in course');
      }
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const handlePreviewCourse = () => {
    if (!featuredCourse) return;
    if (!featuredCourse.id) {
      console.error('Course ID is undefined:', featuredCourse);
      setError('Course ID is missing. Please contact support or try again later.');
      return;
    }
    // Redirect to the real course details page using the course id
    router.push(`/courses/${featuredCourse.id}`);
  };

  const handlePlayPreview = () => {
    if (!featuredCourse) return;
    if (!featuredCourse.id) {
      console.error('Course ID is undefined:', featuredCourse);
      setError('Course ID is missing. Please contact support or try again later.');
      return;
    }
    router.push(`/courses/${featuredCourse.id}?preview=true`);
  };

  if (loading) {
    return (
      <div className="relative z-10 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                <div className="animate-pulse">
                  <div className="h-3 bg-gray-300 rounded w-32 mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="flex gap-3 mb-4">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-300 rounded w-28"></div>
                    <div className="h-10 bg-gray-300 rounded w-28"></div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:col-span-2">
                <div className="h-64 bg-gray-300 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !featuredCourse) {
    return (
      <div className="relative z-10 bg-gradient-to-r from-blue-50 to-indigo-100 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white  border border-gray-200 overflow-hidden shadow-lg">
            <div className="p-6 lg:p-8 text-center">
              <AlertCircle className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Featured Course Unavailable</h3>
              <p className="text-gray-600 mb-4 text-sm">{error}</p>
              <button 
                onClick={fetchFeaturedCourse}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2  text-sm transition duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (duration: string | any) => {
    // If duration is already formatted (like "42h 30m"), return as is
    if (typeof duration === 'string' && duration.includes('h')) {
      return duration;
    }
    
    // Handle cases where duration might be in different format or object
    if (typeof duration === 'object' && duration !== null) {
      // If it's an object with hours and minutes properties
      if ('hours' in duration && 'minutes' in duration) {
        const hours = (duration as any).hours || 0;
        const minutes = (duration as any).minutes || 0;
        return `${hours}h ${minutes}m`;
      }
    }
    
    // If it's a string but not formatted, return as is
    if (typeof duration === 'string') {
      return duration || '0h 0m';
    }
    
    // Otherwise, return default
    return '0h 0m';
  };
  
  const formatLastUpdated = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long' 
    };
    return `Last updated: ${date.toLocaleDateString('en-US', options)}`;
  };
  
  const formatPrice = (price: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price);
  };
  
  const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const formatDurationDisplay = formatDuration(featuredCourse?.duration || '');
  const lastUpdated = formatLastUpdated(featuredCourse?.createdAt || '');
  const discountPercentage = featuredCourse?.originalPrice 
    ? calculateDiscountPercentage(featuredCourse.originalPrice, featuredCourse.price)
    : 0;

  return (
    <div className="relative z-10 bg-gradient-to-r from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white  border border-gray-200 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center mb-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  FEATURED COURSE
                </span>
                <span className="ml-2.5 text-xs text-gray-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-blue-500" />
                  {featuredCourse.studentsEnrolled.toLocaleString()} students enrolled
                </span>
                {discountPercentage > 0 && (
                  <span className="ml-2.5 text-xs text-white bg-red-500 px-2 py-0.5 rounded-full">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {featuredCourse.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                {featuredCourse.description}
              </p>
              
              <div className="flex flex-wrap items-center text-xs text-gray-600 gap-3 mb-4">
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  {formatDurationDisplay} of content
                </div>
                <div className="flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  {featuredCourse.level} level
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  Certificate included
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  {lastUpdated}
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="relative w-8 h-8 mr-3">
                  <Image
                    src={
                      typeof featuredCourse.instructor.avatarUrl === 'string' && featuredCourse.instructor.avatarUrl.trim() !== ''
                        ? featuredCourse.instructor.avatarUrl
                        : '/testimonial-avatar.jpg'
                    }
                    alt={featuredCourse.instructor.name || 'Instructor'}
                    fill
                    className="rounded-full object-cover border-2 border-blue-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/testimonial-avatar.jpg';
                    }}
                  />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-800">
                    {featuredCourse.instructor.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {'Experienced Instructor'}
                  </p>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="flex items-center mr-1.5">
                    <RatingStars rating={featuredCourse.rating ?? 0} />
                  </div>
                  <span className="text-yellow-500 font-bold text-sm">
                    {(featuredCourse.rating ?? 0).toFixed(1)}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">
                    ({(featuredCourse.ratingCount ?? 0).toLocaleString()})
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={handleEnrollNow}
                  disabled={enrolling}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5  flex items-center font-medium text-sm transition duration-200 shadow-sm"
                >
                  <Play className="w-4 h-4 mr-1.5" />
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  <span className="ml-1.5 font-bold">
                    {formatPrice(featuredCourse.price)}
                  </span>
                  {featuredCourse.originalPrice && (
                    <span className="ml-1.5 text-xs line-through text-blue-200">
                      {formatPrice(featuredCourse.originalPrice)}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={handlePreviewCourse}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5  flex items-center font-medium text-sm transition duration-200"
                >
                  Preview Course
                </button>
              </div>
              
              {error && (
                <div className="mt-3 p-2.5 bg-red-50 border border-red-200  text-red-600 text-xs">
                  {error}
                </div>
              )}
            </div>
            
            <div className="hidden lg:block lg:col-span-2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
              <div className="relative h-full w-full">
                <Image
                  src={
                    typeof featuredCourse.thumbnail === 'string' && featuredCourse.thumbnail.trim() !== ''
                      ? featuredCourse.thumbnail
                      : '/placeholder-course.jpg'
                  }
                  alt={featuredCourse.title || 'Course'}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-course.jpg';
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                  onClick={handlePlayPreview}
                  className="bg-pink-500/20 backdrop-blur-sm rounded-full p-4 cursor-pointer hover:bg-pink-500/30 transition duration-300 transform hover:scale-110"
                >
                  <Play className="w-12 h-12 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseBanner;