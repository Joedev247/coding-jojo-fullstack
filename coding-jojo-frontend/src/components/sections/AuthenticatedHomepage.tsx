import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  Play,
  Users,
  Calendar,
  Award,
  MessageCircle,
  Code,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Brain,
  Zap,
  Star,
  CheckCircle,
  User,
  Globe,
  Smartphone,
  Palette,
  Database,
  Shield,
  Monitor,
  ArrowRight,
  Heart,
  Eye,
  ThumbsUp,
  Download,
  TrendingUp as TrendIcon,
  Flame,
  BookmarkPlus,
  Bookmark,
  PlayCircle,
  ShoppingCart,
  Lightbulb,
  Gift,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import { useCart } from "../../contexts/CartContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import LoadingSpinner from "../ui/LoadingSpinner";
import PricingPlanSection from "./PricingPlanSection";
import PopularCoursesSection from "./popular-courses";
import { courseService } from "../../services/courseService";
import { formatCourseDuration } from "../../utils/formatters";
import Link from "next/link";
import PopularTopics from "./popular-topics";
import FAQSection from "./FAQs";

// Types
interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  image: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  tags: string[];
  isNew?: boolean;
  isTrending?: boolean;
  discount?: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  bgColor: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  author: string;
  quote: string;
  initial: string;
  avatarColor: string;
  timeAgo: string;
  skillLevel: string;
  completedCourses: number;
}

export default function AuthenticatedHomepage({ searchParams, router }: { searchParams: ReturnType<typeof import('next/navigation').useSearchParams>, router: ReturnType<typeof import('next/navigation').useRouter> }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { success } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTip, setCurrentTip] = useState(0);
  const [mounted, setMounted] = useState(false);
  // State to track bookmarked courses by id
  const [bookmarked, setBookmarked] = useState<{ [id: number]: boolean }>({});
  // Carousel state
  const [carouselPosition, setCarouselPosition] = useState(0);
  // Testimonial carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  
  // Course state
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [trendingCourses, setTrendingCourses] = useState<any[]>([]);
  const [newCourses, setNewCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set());
  
  // Cart context
  const cartContext = useCart();
  const addToCart = cartContext?.addToCart || (async () => {});
  const isInCart = cartContext?.isInCart || (() => false);
  const addToCartTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Calculate responsive slides to show
  const getSlidesToShow = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Google",
      content: "CodingJojo transformed my career! The hands-on projects and expert instructors helped me land my dream job at Google.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      author: "Sarah Johnson",
      quote: "CodingJojo transformed my career! The hands-on projects and expert instructors helped me land my dream job at Google.",
      initial: "S",
      avatarColor: "from-purple-500 to-pink-500",
      timeAgo: "2 days ago",
      skillLevel: "Advanced",
      completedCourses: 12,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Data Scientist",
      company: "Microsoft",
      content: "The data science courses are incredibly comprehensive. I went from beginner to professional in just 6 months!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      author: "Michael Chen",
      quote: "The data science courses are incredibly comprehensive. I went from beginner to professional in just 6 months!",
      initial: "M",
      avatarColor: "from-blue-500 to-cyan-500",
      timeAgo: "1 week ago",
      skillLevel: "Expert",
      completedCourses: 18,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Full Stack Developer",
      company: "Airbnb",
      content: "Amazing platform! The project-based learning approach really helped me understand complex concepts quickly.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      author: "Emily Rodriguez",
      quote: "Amazing platform! The project-based learning approach really helped me understand complex concepts quickly.",
      initial: "E",
      avatarColor: "from-green-500 to-emerald-500",
      timeAgo: "3 days ago",
      skillLevel: "Intermediate",
      completedCourses: 8,
    },
  ];
  
  const totalSlides = testimonials.length;

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (animating) return;
    setAnimating(true);
    setActiveSlide((prev) => {
      const maxSlide = Math.max(0, totalSlides - slidesToShow);
      return prev >= maxSlide ? 0 : prev + 1;
    });
    setTimeout(() => setAnimating(false), 400);
  };

  const prevSlide = () => {
    if (animating) return;
    setAnimating(true);
    setActiveSlide((prev) => {
      const maxSlide = Math.max(0, totalSlides - slidesToShow);
      return prev <= 0 ? maxSlide : prev - 1;
    });
    setTimeout(() => setAnimating(false), 400);
  };

  const goToSlide = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setAnimating(false), 400);
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-blue-100 text-blue-700";
      case "Advanced":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug logging for authentication state
  useEffect(() => {
    if (mounted) {
      console.log("AuthenticatedHomepage - Current auth state:", {
        isAuthenticated,
        isLoading,
        hasUser: !!user,
        userEmail: user?.email,
        userName: user?.name,
      });
    }
  }, [mounted, isAuthenticated, isLoading, user]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  // Check if user has completed onboarding
  useEffect(() => {
    if (mounted && !isLoading && isAuthenticated && user) {
      // Check if user has completed onboarding
      // You can add an onboardingCompleted field to your user model
      // For now, we'll skip this check, but you can enable it later
      // if (!user.onboardingCompleted) {
      //   router.push("/onboarding");
      // }
    }
  }, [mounted, isLoading, isAuthenticated, user, router]);

  // Update time for dynamic greeting
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  // Learning tips
  const learningTips = [
    "Complete projects to reinforce your learning",
    "Join study groups and coding communities",
    "Practice coding every day, even if just for 15 minutes",
    "Build a portfolio to showcase your skills",
    "Stay updated with the latest tech trends",
  ];

  // Tip rotator
  useEffect(() => {
    const tipTimer = setInterval(
      () => setCurrentTip((prev) => (prev + 1) % learningTips.length),
      5000
    );
    return () => clearInterval(tipTimer);
  }, []);

  // Fetch courses from backend
  useEffect(() => {
    let mounted = true;

    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        // Fetch all courses
        const response = await courseService.getCourses({ limit: 50 }); // Fetch more to ensure all sections have data
        
        if (response?.success && response.data) {
          const transformed = response.data
            .filter((c: any) => !!(c.id || c._id))
            .map((c: any) => ({
              id: c.id || c._id,
              title: c.title,
              author: c.instructor?.name || "Unknown",
              rating: c.averageRating || 4.7,
              students: c.totalEnrollments || c.students || 0,
              lessons: c.totalLessons || c.lessons || 6,
              duration: formatCourseDuration(c.duration) || c.duration || "02 WEEKS",
              price: c.price || 0,
              originalPrice: c.originalPrice,
              level: c.level || "Beginner",
              category: c.category || "General",
              thumbnail: c.thumbnail || "/api/placeholder/300/200",
              instructor: {
                name: c.instructor?.name || "Unknown",
                avatarUrl: c.instructor?.avatar || "/default-avatar.png",
              },
              isNew: c.isNew || false,
              isFeatured: c.isFeatured || false,
              isTrending: c.isTrending || false,
              createdAt: c.createdAt || new Date(),
            }));

          if (mounted) {
            // Smart distribution: If backend has flags, use them; otherwise distribute evenly
            const featuredFiltered = transformed.filter(c => c.isFeatured);
            const trendingFiltered = transformed.filter(c => c.isTrending);
            const newFiltered = transformed.filter(c => c.isNew);
            
            // If no courses have flags, distribute evenly from all available courses
            if (transformed.length < 16) {
              // If we have fewer than 16 courses, cycle through them for all sections
              const cycledCourses = [...transformed, ...transformed, ...transformed, ...transformed];
              setRecommendedCourses(cycledCourses.slice(0, 4));
              setFeaturedCourses(cycledCourses.slice(0, 4));
              setTrendingCourses(cycledCourses.slice(0, 4));
              setNewCourses(cycledCourses.slice(0, 4));
            } else {
              // Normal distribution if we have enough courses
              setRecommendedCourses(transformed.slice(0, 4));
              setFeaturedCourses(featuredFiltered.length >= 4 ? featuredFiltered.slice(0, 4) : transformed.slice(4, 8));
              setTrendingCourses(trendingFiltered.length >= 4 ? trendingFiltered.slice(0, 4) : transformed.slice(8, 12));
              setNewCourses(newFiltered.length >= 4 ? newFiltered.slice(0, 4) : transformed.slice(12, 16));
            }
          }
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        if (mounted) setCoursesLoading(false);
      }
    };

    if (mounted && isAuthenticated) {
      fetchCourses();
    }

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  // Handle welcome message for new OAuth users
  useEffect(() => {
    if (
      mounted &&
      isAuthenticated &&
      user &&
      searchParams.get("welcome") === "true"
    ) {
      const welcomeMessage =
        (user as any).authProvider === "google"
          ? `Welcome to CodingJojo! Your Google account has been successfully connected.`
          : `Welcome to CodingJojo! You're now logged in and ready to start learning.`;

      success(welcomeMessage, {
        duration: 6000,
        description: `Hi ${user.name}! Explore our courses and start your coding journey.`,
      });

      // Remove the welcome parameter from URL without triggering a page reload
      const url = new URL(window.location.href);
      url.searchParams.delete("welcome");
      window.history.replaceState({}, "", url.toString());
    }
  }, [mounted, isAuthenticated, user, searchParams, success]);

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // NOTE: recommendedCourses, featuredCourses, trendingCourses, and newCourses
  // are now fetched from the backend API via useEffect above

  // Course Card Component
  const CourseCard = ({ course, showDiscount = false }: { course: Course; showDiscount?: boolean }) => (
    <div className="bg-white  shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
            NEW
          </span>
        )}
        {course.isTrending && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
            <TrendIcon className="h-3 w-3" />
            TRENDING
          </span>
        )}
        {showDiscount && course.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
            -{course.discount}%
          </span>
        )}
        <button className="absolute bottom-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
          <BookmarkPlus className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {course.category}
          </span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">By {course.instructor}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({course.students.toLocaleString()} students)</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium  transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );

  // Show loading spinner while authentication is being checked
  if (!mounted || isLoading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-white flex items-center justify-center">
  
          <LoadingSpinner size="sm" />
        </div>
      </>
    );
  }

  // Don't render anything if not authenticated (will be redirected)
  if (!isAuthenticated) {
    return null;
  }


  function toggleBookmark(id: number): void {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.08);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Navbar />
    <div className="min-h-screen bg-white">
      {/* Hero Section - Unique Purple & Gradient Design - Full Screen Fit */}
      <div className="relative h-screen max-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Team collaboration and learning"
            fill
            className="object-cover opacity-20"
            priority
          />
          {/* Vibrant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-gray-800/90 to-gray-700/95"></div>
        </div>

        {/* Unique Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.6\'%3E%3Cpath d=\'M0 0h40v40H0V0zm40 40h40v40H40V40z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>

        {/* Smooth Curved Bottom Border - Different Shape - Extended to Middle */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 ">
          <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0C360 120 720 120 1080 60C1200 30 1320 0 1440 0V400H0V0Z" fill="white"/>
            <path d="M0 40C360 160 720 160 1080 100C1200 70 1320 40 1440 40V400H0V40Z" fill="#22033fff" fillOpacity="0.2"/>
            <path d="M0 80C360 200 720 200 1080 140C1200 110 1320 80 1440 80V400H0V80Z" fill="slates" fillOpacity="0.1"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Content */}
            <div className="space-y-4 text-white">
              {/* Unique Badge with Icon */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-xl border border-white/20">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-white font-bold text-xs">CONTINUE YOUR JOURNEY</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6sxl font-bold text-white leading-tight">
                Welcome Back!
              </h1>
              <p className="text-lg lg:text-3xl text-purple-100 font-semibold">
                {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">{user?.name || 'Learner'}</span>!
              </p>
              <p className="text-purple-100 text-lg lg:text-lg max-w-xl leading-relaxed">
                Continue exploring thousands of courses and master the skills that matter most. Your next breakthrough is just one lesson away!
              </p>
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:from-yellow-500 hover:to-orange-600 text-gray-100 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Continue Learning
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-white/25 backdrop-blur-md border-2 border-white/40 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300">
                  Explore Courses
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Content - Unique Hexagonal Frame Design - Smaller */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Unique Decorative Elements */}
              <div className="relative">
                {/* Purple & Pink Gradient Rings - Smaller */}
                <div className="absolute top-0 right-0 w-[280px] h-[42s0px] bg-gradient-to-br from-slate-500 to-blue-500 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
                <div className="absolute -top-4 -right-4 w-[400px] h-[400px] border-4 border-slate-400/30 rounded-full animate-spin-slow"></div>
                <div className="absolute top-8s right-8 w-[350px] h-[350px] border-2 border-slate-300/20 rounded-full animate-float-slow"></div>
                
                {/* Modern Card Frame with Gradient Border - Smaller */}
                <div className="relative w-[450px] h-[450px] bg-gradient-to-br from-slate-500 via-blue-500 to-slate-400 rounded-full shadow-2xl animate-float">
                  {/* Inner White Border */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 rounded-full p-6">
                    {/* Inner Image Container with Rounded Corners */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
                      <Image
                        src="/images/instructor/authusers.png"
                        alt="Happy students learning"
                        width={450}
                        height={450}
                        className="w-full h-full object-cover"
                        priority
                      />
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-600/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative Floating Icons - Smaller */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-slate-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl animate-float rotate-12">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-5 -left-3 w-10 h-10 bg-gradient-to-br from-slate-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl animate-float" style={{animationDelay: '0.5s'}}>
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-1/4 -right-5 w-10 h-10 bg-gradient-to-br from-slate-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl animate-float" style={{animationDelay: '1s'}}>
                  <Brain className="w-5 h-5 text-white" />
                </div>
              </div>

            </div>
          </div>

          {/* Stats Bar - Compact Glassmorphism Cards */}
          <div className="grid grid-cols-4 mt-15 gap-3 mt-8">
            {[
              { label: 'Completed', value: '0', icon: CheckCircle, gradient: 'from-green-400 to-emerald-500' },
              { label: 'In Progress', value: '0', icon: BookOpen, gradient: 'from-cyan-400 to-blue-500' },
              { label: 'Hours Learned', value: '0', icon: Clock, gradient: 'from-purple-400 to-pink-500' },
              { label: 'Avg Score', value: '0%', icon: Target, gradient: 'from-orange-400 to-red-500' }
            ].map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-20 group-hover:opacity-10 blur-xl transition-opacity duration-300`}></div>
                  
                  <div className="relative bg-white backdrop-blur-md p-3 border border-white/30 hover:bg-white/25 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-black" />
                      </div>
                      <p className="text-2xl font-bold text-black">{stat.value}</p>
                    </div>
                    <p className="text-xs text-black-200 font-semibold uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div >
        
        {/* Recommended for You */}
        <section className="mb-10 max-w-7xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Recommended for You</h2>
                <p className="text-gray-500 text-sm">Personalized course picks based on your interests</p>
              </div>
            </div>
            <button className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coursesLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <LoadingSpinner size="md" />
              </div>
            ) : recommendedCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No courses available
              </div>
            ) : recommendedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200"
              >
                {/* Course Image with Duration Badge */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail || '/placeholder-course.jpg'}
                    alt={course.title || 'Course thumbnail'}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e: any) => {
                      e.currentTarget.src = '/placeholder-course.jpg';
                    }}
                  />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                    {course.duration}
                  </div>

                  {/* Course Time Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{Math.floor(course.lessons * 1.5)}h {Math.floor((course.lessons * 1.5 % 1) * 60)}m</span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  {/* Rating and Level Row */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Rating - Left */}
                    <div className="flex items-center gap-1">
                      {renderStars(course.rating)}
                      <span className="text-gray-600 text-xs ml-1">({course.rating})</span>
                    </div>
                    
                    {/* Level - Right */}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-600 text-xs">{course.level}</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
                    {/* Lessons - Left */}
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Lesson {course.lessons}</span>
                    </div>
                    
                    {/* Students - Right */}
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Students {course.students}+</span>
                    </div>
                  </div>

                  {/* Instructor and Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 font-medium">{course.author}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 font-bold text-sm">
                        ${course.price}
                      </div>
                      {course.originalPrice && (
                        <div className="text-gray-400 text-xs line-through">
                          ${course.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/courses/${course.id}`}>
                      <button className="w-full py-1.5 px-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded">
                        <Eye className="h-3 w-3" />
                        <span>View Detail</span>
                      </button>
                    </Link>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInCart(course.id) || addingToCart.has(course.id)) return;
                        setAddingToCart((prev) => new Set([...prev, course.id]));
                        addToCart(course as any).catch((err) => console.error('Failed to add to cart', err));
                        const t = setTimeout(() => {
                          setAddingToCart((prev) => {
                            const s = new Set(prev);
                            s.delete(course.id);
                            return s;
                          });
                          addToCartTimeoutsRef.current.delete(course.id);
                        }, 1500);
                        addToCartTimeoutsRef.current.set(course.id, t);
                      }}
                      className={`w-full py-1.5 px-2 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded ${
                        isInCart(course.id) ? "bg-blue-700 hover:bg-green-700" : addingToCart.has(course.id) ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={isInCart(course.id) || addingToCart.has(course.id)}
                    >
                      {isInCart(course.id) ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Added</span>
                        </>
                      ) : addingToCart.has(course.id) ? (
                        <>
                          <LoadingSpinner size="xs" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-3 w-3" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Courses */}
        <section className="mb-10 max-w-7xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Featured Courses</h2>
                <p className="text-gray-500 text-sm">Start with our most popular and highly-rated courses</p>
              </div>
            </div>
            <Link href="/courses" className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coursesLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <LoadingSpinner size="md" />
              </div>
            ) : featuredCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No courses available
              </div>
            ) : featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200"
              >
                {/* Course Image with Duration Badge */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail || '/placeholder-course.jpg'}
                    alt={course.title || 'Course thumbnail'}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e: any) => {
                      e.currentTarget.src = '/placeholder-course.jpg';
                    }}
                  />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                    {course.duration}
                  </div>

                  {/* Course Time Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{Math.floor(course.lessons * 1.5)}h {Math.floor((course.lessons * 1.5 % 1) * 60)}m</span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  {/* Rating and Level Row */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Rating - Left */}
                    <div className="flex items-center gap-1">
                      {renderStars(course.rating)}
                      <span className="text-gray-600 text-xs ml-1">({course.rating})</span>
                    </div>
                    
                    {/* Level - Right */}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-600 text-xs">{course.level}</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
                    {/* Lessons - Left */}
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Lesson {course.lessons}</span>
                    </div>
                    
                    {/* Students - Right */}
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Students {course.students}+</span>
                    </div>
                  </div>

                  {/* Instructor and Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 font-medium">{course.author}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 font-bold text-sm">
                        ${course.price}
                      </div>
                      {course.originalPrice && (
                        <div className="text-gray-400 text-xs line-through">
                          ${course.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/courses/${course.id}`}>
                      <button className="w-full py-1.5 px-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded">
                        <Eye className="h-3 w-3" />
                        <span>View Detail</span>
                      </button>
                    </Link>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInCart(course.id) || addingToCart.has(course.id)) return;
                        setAddingToCart((prev) => new Set([...prev, course.id]));
                        addToCart(course as any).catch((err) => console.error('Failed to add to cart', err));
                        const t = setTimeout(() => {
                          setAddingToCart((prev) => {
                            const s = new Set(prev);
                            s.delete(course.id);
                            return s;
                          });
                          addToCartTimeoutsRef.current.delete(course.id);
                        }, 1500);
                        addToCartTimeoutsRef.current.set(course.id, t);
                      }}
                      className={`w-full py-1.5 px-2 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded ${
                        isInCart(course.id) ? "bg-blue-700 hover:bg-green-700" : addingToCart.has(course.id) ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={isInCart(course.id) || addingToCart.has(course.id)}
                    >
                      {isInCart(course.id) ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Added</span>
                        </>
                      ) : addingToCart.has(course.id) ? (
                        <>
                          <LoadingSpinner size="xs" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-3 w-3" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-10 max-w-7xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Trending Now</h2>
                <p className="text-gray-500 text-sm">Popular courses that everyone's talking about</p>
              </div>
            </div>
            <Link href="/courses" className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coursesLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <LoadingSpinner size="md" />
              </div>
            ) : trendingCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No courses available
              </div>
            ) : trendingCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200"
              >
                {/* Course Image with Duration Badge */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail || '/placeholder-course.jpg'}
                    alt={course.title || 'Course thumbnail'}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e: any) => {
                      e.currentTarget.src = '/placeholder-course.jpg';
                    }}
                  />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                    {course.duration}
                  </div>

                  {/* Course Time Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{Math.floor(course.lessons * 1.5)}h {Math.floor((course.lessons * 1.5 % 1) * 60)}m</span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  {/* Rating and Level Row */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Rating - Left */}
                    <div className="flex items-center gap-1">
                      {renderStars(course.rating)}
                      <span className="text-gray-600 text-xs ml-1">({course.rating})</span>
                    </div>
                    
                    {/* Level - Right */}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-600 text-xs">{course.level}</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
                    {/* Lessons - Left */}
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Lesson {course.lessons}</span>
                    </div>
                    
                    {/* Students - Right */}
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Students {course.students}+</span>
                    </div>
                  </div>

                  {/* Instructor and Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 font-medium">{course.author}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 font-bold text-sm">
                        ${course.price}
                      </div>
                      {course.originalPrice && (
                        <div className="text-gray-400 text-xs line-through">
                          ${course.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/courses/${course.id}`}>
                      <button className="w-full py-1.5 px-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded">
                        <Eye className="h-3 w-3" />
                        <span>View Detail</span>
                      </button>
                    </Link>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInCart(course.id) || addingToCart.has(course.id)) return;
                        setAddingToCart((prev) => new Set([...prev, course.id]));
                        addToCart(course as any).catch((err) => console.error('Failed to add to cart', err));
                        const t = setTimeout(() => {
                          setAddingToCart((prev) => {
                            const s = new Set(prev);
                            s.delete(course.id);
                            return s;
                          });
                          addToCartTimeoutsRef.current.delete(course.id);
                        }, 1500);
                        addToCartTimeoutsRef.current.set(course.id, t);
                      }}
                      className={`w-full py-1.5 px-2 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded ${
                        isInCart(course.id) ? "bg-blue-700 hover:bg-green-700" : addingToCart.has(course.id) ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={isInCart(course.id) || addingToCart.has(course.id)}
                    >
                      {isInCart(course.id) ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Added</span>
                        </>
                      ) : addingToCart.has(course.id) ? (
                        <>
                          <LoadingSpinner size="xs" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-3 w-3" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PopularCoursesSection/>  

        {/* New Courses */}
        <section className="mb-10 max-w-7xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Fresh Arrivals</h2>
                <p className="text-gray-500 text-sm">Just launched courses you don't want to miss</p>
              </div>
            </div>
            <Link href="/courses" className="text-blue-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coursesLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <LoadingSpinner size="md" />
              </div>
            ) : newCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No courses available
              </div>
            ) : newCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200"
              >
                {/* Course Image with Duration Badge */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail || '/placeholder-course.jpg'}
                    alt={course.title || 'Course thumbnail'}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e: any) => {
                      e.currentTarget.src = '/placeholder-course.jpg';
                    }}
                  />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                    {course.duration}
                  </div>

                  {/* Course Time Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{Math.floor(course.lessons * 1.5)}h {Math.floor((course.lessons * 1.5 % 1) * 60)}m</span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  {/* Rating and Level Row */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Rating - Left */}
                    <div className="flex items-center gap-1">
                      {renderStars(course.rating)}
                      <span className="text-gray-600 text-xs ml-1">({course.rating})</span>
                    </div>
                    
                    {/* Level - Right */}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-600 text-xs">{course.level}</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
                    {/* Lessons - Left */}
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Lesson {course.lessons}</span>
                    </div>
                    
                    {/* Students - Right */}
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Students {course.students}+</span>
                    </div>
                  </div>

                  {/* Instructor and Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-700 font-medium">{course.author}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 font-bold text-sm">
                        ${course.price}
                      </div>
                      {course.originalPrice && (
                        <div className="text-gray-400 text-xs line-through">
                          ${course.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/courses/${course.id}`}>
                      <button className="w-full py-1.5 px-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded">
                        <Eye className="h-3 w-3" />
                        <span>View Detail</span>
                      </button>
                    </Link>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInCart(course.id) || addingToCart.has(course.id)) return;
                        setAddingToCart((prev) => new Set([...prev, course.id]));
                        addToCart(course as any).catch((err) => console.error('Failed to add to cart', err));
                        const t = setTimeout(() => {
                          setAddingToCart((prev) => {
                            const s = new Set(prev);
                            s.delete(course.id);
                            return s;
                          });
                          addToCartTimeoutsRef.current.delete(course.id);
                        }, 1500);
                        addToCartTimeoutsRef.current.set(course.id, t);
                      }}
                      className={`w-full py-1.5 px-2 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded ${
                        isInCart(course.id) ? "bg-blue-700 hover:bg-green-700" : addingToCart.has(course.id) ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={isInCart(course.id) || addingToCart.has(course.id)}
                    >
                      {isInCart(course.id) ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Added</span>
                        </>
                      ) : addingToCart.has(course.id) ? (
                        <>
                          <LoadingSpinner size="xs" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-3 w-3" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

                <PopularTopics/>


              <PricingPlanSection />
        {/* Call to Action */}
        <section className="text-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">Ready to Start Learning?</h2>
          <p className="text-purple-100 text-base lg:text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of students already learning on CodingJojo. Get unlimited access to all courses and start building your future today.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="bg-white text-purple-600 px-6 py-2 font-semibold text-sm hover:bg-gray-100 transition-all transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-6 py-2 font-semibold text-sm hover:bg-white hover:text-purple-600 transition-all">
             upgrade
            </button>
          </div>
        </section>

                <FAQSection/>
        
              
        {/* Testimonials */}
        <section className="relative py-12 md:py-16 mb-10 font-['Inter',sans-serif]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Enhanced Section Header for CODING JOJO */}
            <div className="mb-10 md:mb-12 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg mb-4 border border-blue-500/20">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Star className="h-2.5 w-2.5 text-white fill-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                  Student Success Stories
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-gray-800 mb-3">
                <span className="text-gray-800">Transforming Careers at </span>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                  CODING JOJO
                </span>
              </h2>

              <p className="max-w-2xl mx-auto text-gray-600 text-xs">
                Join thousands of developers who've landed their dream jobs through
                our comprehensive coding bootcamps and mentorship programs
              </p>

              {/* Enhanced Stats */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white border border-gray-200 backdrop-blur-sm p-3 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    4.9★
                  </div>
                  <div className="text-xs text-gray-600">Average Rating</div>
                </div>
                <div className="bg-white border border-gray-200 backdrop-blur-sm p-3 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-xs text-gray-600">Students Enrolled</div>
                </div>
                <div className="bg-white border border-gray-200 backdrop-blur-sm p-3 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    95%
                  </div>
                  <div className="text-xs text-gray-600">Job Placement</div>
                </div>
              </div>
            </div>

            {/* Compact Testimonial Carousel */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                disabled={animating}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white border border-gray-200 hover:border-blue-500/50 rounded-full shadow-xl p-2.5 backdrop-blur-sm transition-all duration-300 group ${
                  animating
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-blue-500/20 hover:bg-blue-50"
                }`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </button>

              <div className="overflow-hidden px-8">
                <div
                  ref={slidesContainerRef}
                  className="flex transition-all duration-400 ease-out will-change-transform"
                  style={{
                    transform: `translateX(-${
                      activeSlide * (100 / slidesToShow)
                    }%)`,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="px-3 flex-shrink-0"
                      style={{ width: `${100 / slidesToShow}%` }}
                    >
                      {/* Compact Testimonial Card */}
                      <div className="bg-white border border-gray-200 backdrop-blur-sm p-5 shadow-xl hover:border-blue-500/30 h-full flex flex-col hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative group hover:transform hover:scale-[1.02] cursor-pointer">
                        {/* User Info Header */}
                        <div className="flex items-center mb-3">
                          <div className="mr-3 flex-shrink-0 relative">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white/20`}
                            >
                              {testimonial.initial}
                            </div>
                            {/* Verified Badge */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                              <Code className="w-2 h-2 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-xs truncate">
                              {testimonial.author}
                            </h4>
                            <div className="flex items-center text-xs">
                              <span className="text-gray-600 font-medium">
                                {testimonial.role}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <span className="text-blue-600 text-xs font-semibold">
                                {testimonial.company}
                              </span>
                              <span className="mx-2 text-gray-400 text-xs">•</span>
                              <span className="text-gray-500 text-xs">
                                {testimonial.timeAgo}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-600">
                            ({testimonial.rating}.0)
                          </span>
                        </div>

                        {/* Testimonial Quote - Compact */}
                        <p className="text-gray-700 text-xs leading-relaxed flex-grow mb-3 line-clamp-3">
                          "{testimonial.quote}"
                        </p>

                        {/* Skills & Progress */}
                        <div className="mt-auto space-y-2">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${getSkillLevelColor(
                                testimonial.skillLevel
                              )}`}
                            >
                              {testimonial.skillLevel}
                            </span>
                            <span className="text-xs text-gray-500">
                              {testimonial.completedCourses} courses completed
                            </span>
                          </div>

                          {/* Decorative Bottom Border */}
                          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transform origin-left group-hover:scale-x-110 transition-transform duration-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                disabled={animating}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white border border-gray-200 hover:border-blue-500/50 rounded-full shadow-xl p-2.5 backdrop-blur-sm transition-all duration-300 group ${
                  animating
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-blue-500/20 hover:bg-blue-50"
                }`}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>

            {/* Compact Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({
                length: Math.max(1, totalSlides - slidesToShow + 1),
              }).map((_, index) => {
                const isActive = activeSlide === index;

                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={animating}
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 w-6 shadow-lg shadow-blue-500/30"
                        : "bg-gray-300 w-2 hover:bg-gray-400 hover:w-3"
                    } ${animating ? "opacity-50" : ""}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div> 
      <Footer />
    </>
  );
}
