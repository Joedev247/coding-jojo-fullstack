"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Star, Users, Clock, ChevronLeft, ChevronRight, Eye, ShoppingCart, BookOpen, Monitor, Smartphone, PenTool, TrendingUp, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "../../types/courses";
import { courseService } from "../../services/courseService";
import { useCart } from "../../contexts/CartContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import { formatCourseDuration } from "../../utils/formatters";

// Course category data matching the screenshot
const courseCategories = [
  {
    id: "graphic-design",
    name: "Graphic Design",
    count: 245,
    color: "bg-blue-600",
    icon: PenTool
  },
  {
    id: "web-development", 
    name: "Web Development",
    count: 286,
    color: "bg-gray-100",
    icon: Monitor
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing", 
    count: 286,
    color: "bg-gray-100",
    icon: TrendingUp
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    count: 140,
    color: "bg-gray-100", 
    icon: Smartphone
  },
  {
    id: "data-science",
    name: "Data Science",
    count: 180,
    color: "bg-gray-100", 
    icon: BookOpen
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    count: 95,
    color: "bg-gray-100", 
    icon: Smartphone
  }
];

// Mock course data based on screenshot with 8 courses
const mockCourses = [
  {
    id: "1",
    title: "Advanced Android 12 & Kotlin Development Course",
    instructor: { name: "Max Alexix", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.7,
    ratingCount: 4.7,
    duration: "03 WEEKS",
    lessons: 6,
    students: 60,
    level: "Beginner",
    price: 49.99,
    originalPrice: 99.99,
    thumbnail: "/api/placeholder/300/200",
    category: "Mobile Development"
  },
  {
    id: "2", 
    title: "Learn Figma — UI/UX Design Essential Training",
    instructor: { name: "Kevin Perry", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.7,
    ratingCount: 4.7,
    duration: "02 WEEKS", 
    lessons: 9,
    students: 50,
    level: "Beginner",
    price: 39.99,
    originalPrice: 79.99,
    thumbnail: "/api/placeholder/300/200",
    category: "UI/UX Design"
  },
  {
    id: "3",
    title: "IT Statistics Data Science and Business Analysis", 
    instructor: { name: "Max Alexix", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.7,
    ratingCount: 4.7,
    duration: "04 WEEKS",
    lessons: 7,
    students: 30,
    level: "Beginner", 
    price: 59.99,
    originalPrice: 119.99,
    thumbnail: "/api/placeholder/300/200",
    category: "Data Science"
  },
  {
    id: "4",
    title: "Education Software and PHP and JS System Script",
    instructor: { name: "Kevin Perry", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.7,
    ratingCount: 4.7,
    duration: "02 WEEKS",
    lessons: 10,
    students: 20,
    level: "Beginner",
    price: 29.99,
    originalPrice: 59.99,
    thumbnail: "/api/placeholder/300/200",
    category: "Web Development"
  },
  {
    id: "5",
    title: "Complete React & Node.js Full Stack Development",
    instructor: { name: "Sarah Johnson", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.8,
    ratingCount: 4.8,
    duration: "06 WEEKS",
    lessons: 15,
    students: 120,
    level: "Intermediate",
    price: 79.99,
    originalPrice: 149.99,
    thumbnail: "/api/placeholder/300/200",
    category: "Web Development"
  },
  {
    id: "6",
    title: "Digital Marketing Mastery & Social Media Strategy",
    instructor: { name: "Mike Chen", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.6,
    ratingCount: 4.6,
    duration: "05 WEEKS",
    lessons: 12,
    students: 85,
    level: "Beginner",
    price: 44.99,
    originalPrice: 89.99,
    thumbnail: "/api/placeholder/300/200",
    category: "Digital Marketing"
  },
  {
    id: "7",
    title: "Advanced Graphic Design with Adobe Creative Suite",
    instructor: { name: "Emma Davis", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.9,
    ratingCount: 4.9,
    duration: "08 WEEKS",
    lessons: 20,
    students: 95,
    level: "Advanced",
    price: 89.99,
    originalPrice: 179.99,
    thumbnail: "/api/placeholder/300/200",
    category: "Graphic Design"
  },
  {
    id: "8",
    title: "Python Machine Learning & AI Development",
    instructor: { name: "Dr. Alex Kumar", avatarUrl: "/api/placeholder/32/32" },
    rating: 4.8,
    ratingCount: 4.8,
    duration: "10 WEEKS",
    lessons: 25,
    students: 75,
    level: "Advanced",
    price: 99.99,
    originalPrice: 199.99,
    thumbnail: "/api/placeholder/300/200",
    category: "Data Science"
  }
];

export default function PopularCoursesSection() {
  // display same number as featured-courses (2 rows x 4 cols)
  const COURSES_PER_ROW = 4;
  const ROWS_TO_DISPLAY = 2;
  const VISIBLE_COURSES = COURSES_PER_ROW * ROWS_TO_DISPLAY; // 8

  const [courses, setCourses] = useState<Course[] | any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set());
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Cart context
  const cartContext = useCart();
  const addToCart = cartContext?.addToCart || (async () => {});
  const isInCart = cartContext?.isInCart || (() => false);
  const addToCartTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Fetch real courses from backend and transform to the UI shape
  useEffect(() => {
    let mounted = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseService.getCourses({ limit: VISIBLE_COURSES });
        if (response?.success && response.data) {
          const transformed = response.data
            .filter((c: any) => !!(c.id || c._id))
            .map((c: any) => ({
              id: c.id || c._id,
              title: c.title,
              instructor: {
                name: c.instructor?.name || "Unknown",
                avatarUrl: c.instructor?.avatar || "/default-avatar.png",
              },
              rating: c.averageRating || 0,
              ratingCount: c.totalRatings || 0,
              duration: formatCourseDuration(c.duration) || c.duration || "-",
              lessons: c.totalLessons || c.lessons || 0,
              students: c.totalEnrollments || c.students || 0,
              level: c.level || "Beginner",
              price: c.price || 0,
              originalPrice: c.originalPrice,
              thumbnail: c.thumbnail || "/api/placeholder/300/200",
              category: c.category || "General",
              description: c.description || "",
              progress: c.progress || 0,
              isFeatured: c.isFeatured || false,
              isNew: c.isNew || false,
              isSaved: c.isSaved || false,
            }));

          if (mounted) setCourses(transformed);
        } else {
          // fallback to mock courses if backend returns nothing
          if (mounted) setCourses(mockCourses);
        }
      } catch (err) {
        console.error("Error fetching popular courses:", err);
        if (mounted) setCourses(mockCourses);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCourses();

    return () => {
      mounted = false;
    };
  }, []);

  // Scroll functions for categories
  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 300;
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
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

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-wide">
              POPULAR COURSES
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Our Popular Online Courses
          </h2>
        </div>

        {/* Course Categories Row - Scrollable */}
        <div className="relative mb-8">
          {/* Left Arrow */}
          <button 
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Scrollable Categories Container */}
          <div 
            ref={categoriesRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courseCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={`${
                    category.color === "bg-blue-600" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                  }  p-4 border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group flex-shrink-0 min-w-[200px]`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8  ${
                      category.color === "bg-blue-600" ? "bg-white/20" : "bg-blue-50"
                    } flex items-center justify-center`}>
                      <IconComponent className={`w-4 h-4 ${
                        category.color === "bg-blue-600" ? "text-white" : "text-blue-600"
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${
                        category.color === "bg-blue-600" ? "text-white" : "text-gray-900"
                      }`}>
                        {category.name}
                      </h3>
                      <p className={`text-xs ${
                        category.color === "bg-blue-600" ? "text-white/80" : "text-gray-600"
                      }`}>
                        {category.count} Courses
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courses Grid - 2 rows of 4 courses each */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {courses.slice(0, 8).map((course) => (
            <div
              key={course.id}
              className="group h-full flex flex-col overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:translate-y-[-1px] hover:border-blue-300"
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
                    try {
                      e.currentTarget.src = '/placeholder-course.jpg';
                    } catch (err) {
                      // ignore
                    }
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
                    <span className="text-gray-600 text-xs ml-1">({course.ratingCount})</span>
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
                    <span className="text-xs text-gray-700 font-medium">{course.instructor.name}</span>
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

                      // Set adding state
                      setAddingToCart((prev) => new Set([...prev, course.id]));

                      // Call cart context
                      addToCart(course as Course).catch((err) => {
                        console.error('Failed to add to cart', err);
                      });

                      // set timeout to clear loading state
                      const existing = addToCartTimeoutsRef.current.get(course.id);
                      if (existing) clearTimeout(existing);
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
                      isInCart(course.id)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : addingToCart.has(course.id)
                        ? "bg-blue-700 hover:bg-blue-800"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isInCart(course.id) || addingToCart.has(course.id)}
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

        {/* View All Courses Button */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors duration-300 text-sm"
          >
            VIEW ALL COURSES
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}