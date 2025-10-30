"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  ArrowRight,
  Clock,
  Users,
  Star,
  Sparkles,
  ShoppingCart,
  Eye,
  CheckCircle,
  Play,
} from "lucide-react";
import { Course } from "../../types/courses";
import { courseService } from "../../services/courseService";
import { formatCourseDuration } from "../../utils/formatters";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../contexts/CartContext";
import LoadingSpinner from "../ui/LoadingSpinner";

// Custom Button component
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const Button = ({
  children,
  className = "",
  onClick = () => {},
  href,
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

type CourseCategory =
  | "all"
  | "development"
  | "data science"
  | "mobile"
  | "design"
  | "cryptocurrency";

export default function FeaturedCoursesSection() {
  // Always call the hook at the top level
  const cartContext = useCart();
  const addToCart = cartContext?.addToCart || (async () => {});
  const isInCart = cartContext?.isInCart || (() => false);
  const cartItems = cartContext?.cartItems || [];
  
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("all");
  const [mounted, setMounted] = useState(false);
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set());
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCartTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Fetch 8 courses from the backend
        const response = await courseService.getCourses({ limit: 8 });
        console.log("🔍 Featured Courses API Response:", response);
        if (response.success && response.data) {
          console.log("📋 Featured Courses Sample Data:", response.data[0]);
          const transformedCourses = response.data
            .filter((course: any) => !!(course.id || course._id)) // Handle both id and _id
            .map((course: any, index: number) => ({
            id: course.id || course._id, // Handle both id and _id from backend
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail || "/default-course.jpg",
            instructor: {
              id: course.instructor?.id || course.instructor?._id || "",
              name: course.instructor?.name || "Unknown",
              avatarUrl: course.instructor?.avatar || "/default-avatar.png", // Backend sends 'avatar', frontend expects 'avatarUrl'
              role: course.instructor?.role || "Instructor",
            },
            category: course.category,
            tags: course.tags || [],
            level: course.level,
            duration: formatCourseDuration(course.duration),
            lectures: course.totalLessons || 0,
            studentsEnrolled: course.totalEnrollments || 0, // Backend sends 'totalEnrollments'
            rating: course.averageRating || 0, // Backend sends 'averageRating'
            ratingCount: course.totalRatings || 0, // Backend sends 'totalRatings'
            progress: course.progress || 0,
            price: course.price || 0,
            originalPrice: course.originalPrice,
            isFeatured: course.isFeatured || false,
            isNew: course.isNew || false,
            isSaved: course.isSaved || false,
            createdAt: course.createdAt,
            status: course.status || "published",
          }));
          console.log("🎯 Featured Courses Transformed:", transformedCourses.length);
          console.log("📋 Featured Course Sample:", transformedCourses[0]);
          setCourses(transformedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);

    // Cleanup function
    return () => {
      // Clear all timeouts on unmount
      addToCartTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      addToCartTimeoutsRef.current.clear();
    };
  }, []);

  const COURSES_PER_ROW = 4;
  const ROWS_TO_DISPLAY = 2;
  const VISIBLE_COURSES = 8;

  // Filter courses based on active category - memoized for performance
  const filteredCourses = useMemo(() => {
    return activeCategory === "all"
      ? courses
      : courses.filter(
          (course) => course.category.toLowerCase() === activeCategory
        );
  }, [activeCategory, courses]);

  // Categories for filtering - memoized
  const categories = useMemo(
    () => [
      { id: "all", name: "All Courses" },
      { id: "development", name: "Web Development" },
      { id: "data science", name: "Data Science" },
      { id: "mobile", name: "Mobile" },
      { id: "design", name: "Design" },
      { id: "cryptocurrency", name: "Cryptocurrency" },
    ],
    []
  );

  // Add to cart handler - optimized with useCallback
  const handleAddToCart = useCallback(
    (course: Course, event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();

      // Prevent adding if already in cart or currently adding
      if (isInCart(course.id) || addingToCart.has(course.id)) {
        console.log(`Course ${course.id} is already in cart or being added`);
        return;
      }

      console.log(`Adding course to cart: ${course.id} - ${course.title}`);

      // Set loading state for this specific course
      setAddingToCart((prev) => new Set([...prev, course.id]));

      // Add to cart - this adds only the specific course clicked
      if (addToCart) {
        addToCart(course);
      }

      // Clear any existing timeout for this course
      const existingTimeout = addToCartTimeoutsRef.current.get(course.id);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // Set timeout to remove loading state
      const timeout = setTimeout(() => {
        setAddingToCart((prev) => {
          const newSet = new Set(prev);
          newSet.delete(course.id);
          return newSet;
        });
        addToCartTimeoutsRef.current.delete(course.id);
      }, 1500);

      addToCartTimeoutsRef.current.set(course.id, timeout);
    },
    [addToCart, isInCart, addingToCart]
  );

  // Helper functions
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-amber-400 fill-amber-400"
            : "text-gray-600"
        }`}
      />
    ));
  };

  const formatPrice = (price: number | string) => {
    if (typeof price === "string") return price;
    return `$${price.toFixed(2)}`;
  };

  const calculateDiscount = (course: Course) => {
    if (typeof course.price === "number" && course.originalPrice) {
      return Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      );
    }
    return null;
  };

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/60 to-white/40 z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <div className="space-y-4">
              <div className="h-8  bg-gray-900 rounded animate-pulse max-w-md mx-auto"></div>
              <div className="h-8  bg-gray-900 rounded animate-pulse max-w-xl"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-96  bg-gray-900  animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header with enhanced styling */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-xs font-semibold shadow-sm mb-3 border border-blue-200">
              <div className="h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
              <span className="text-blue-700">
                Top-rated courses
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-gray-900 mb-2">
              Featured
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Courses
              </span>
            </h2>
            <p className="max-w-2xl text-gray-600 text-sm">
              Handpicked by our learning experts to accelerate your career
              growth
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center">
            {/* Category Tabs */}
            <div className="hidden md:flex space-x-1 bg-white border border-gray-200 p-1 shadow-sm">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setActiveCategory(category.id as CourseCategory)
                  }
                  className={`px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap min-w-fit flex-shrink-0  ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course cards container - Modified to display in 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {filteredCourses.slice(0, VISIBLE_COURSES).map((course, index) => {
            // Ensure we have a unique key for each course
            const uniqueKey = `${course.id}-${index}`;

            return (
              <div key={uniqueKey} className="relative">
                {/* Enhanced Course Card */}
                <div className="group h-full flex flex-col overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] hover:border-blue-300">
                  {/* Card Header/Image with gradient overlay */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* Tags and badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {course.isFeatured && (
                        <div className="bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded font-medium shadow-sm">
                          Featured
                        </div>
                      )}
                      {course.isNew && (
                        <div className="bg-blue-600 text-white text-xs py-0.5 px-1.5 rounded font-medium shadow-sm">
                          New
                        </div>
                      )}
                    </div>

                    {/* Level indicator */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs py-0.5 px-1.5 rounded-full shadow-sm">
                      <Users className="w-2.5 h-2.5" />
                      <span>{course.level}</span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs py-0.5 px-1.5 rounded-full shadow-sm">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{course.duration}</span>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-blue-600 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-4 w-4 text-white" fill="white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Body with improved layout */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <Users className="w-2.5 h-2.5" />
                      {course.instructor.name}
                    </p>

                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(course.rating)}
                      <span className="text-yellow-500 font-bold text-xs ml-1">
                        {course.rating}
                      </span>
                      <span className="text-gray-500 text-xs">
                        ({course.ratingCount.toLocaleString()})
                      </span>
                    </div>

                    {/* Course description - truncated */}
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Progress Bar with gradient - Only shown if progress exists */}
                    {course.progress !== undefined && (
                      <div className="mb-3">
                        <div className="mb-1 flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-600">
                            Course Progress
                          </span>
                          <span className="text-xs text-gray-600">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Price tag with improved styling */}
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between mb-2">
                        <div>
                          <span className="font-bold text-gray-800 text-sm">
                            {formatPrice(course.price)}
                          </span>
                          {course.originalPrice && (
                            <span className="text-gray-500 text-xs line-through ml-1">
                              ${course.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        {calculateDiscount(course) && (
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            {calculateDiscount(course)}% off
                          </span>
                        )}
                      </div>

                      {/* Added View Detail and Add to Cart buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/courses/${course.id}`}>
                          <button className="w-full py-2 px-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800 text-xs font-medium transition-colors flex items-center justify-center gap-1 whitespace-nowrap min-w-fit flex-shrink-0 rounded">
                            <Eye className="h-3 w-3 flex-shrink-0" />
                            <span>View Details</span>
                          </button>
                        </Link>

                        <button
                          onClick={(e) => handleAddToCart(course, e)}
                          className={`py-2 px-2.5 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-sm whitespace-nowrap min-w-fit flex-shrink-0 rounded ${
                            isInCart(course.id)
                              ? "bg-blue-600 hover:bg-blue-700"
                              : addingToCart.has(course.id)
                              ? "bg-blue-700 hover:bg-blue-800"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          disabled={
                            isInCart(course.id) || addingToCart.has(course.id)
                          }
                        >
                          {isInCart(course.id) ? (
                            <>
                              <CheckCircle className="h-3 w-3 flex-shrink-0" />
                              <span>Added</span>
                            </>
                          ) : addingToCart.has(course.id) ? (
                            <>
                              <LoadingSpinner size="xs" />
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-3 w-3 flex-shrink-0" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Courses CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm p-6 shadow-lg  border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Ready to accelerate your career?
            </h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
              Explore our complete catalog of professional courses taught by
              industry experts
            </p>
            <Button
              href="/courses"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-2.5 font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap min-w-fit flex-shrink-0 text-sm rounded"
            >
              <span>Explore All Courses</span>{" "}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 flex-shrink-0" />
            </Button>
            <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              Over 200,000 courses available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
