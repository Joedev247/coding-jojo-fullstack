import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  Clock,
  Users,
  Star,
  Play,
  Eye,
  ShoppingCart,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { Course } from "../../types/courses";
import Link from "next/link";
import { useCart } from "../../contexts/CartContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import { formatDuration } from "../../utils/helpers";

interface CourseCardProps {
  course: Course;
  handleSaveCourse: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  handleSaveCourse,
}) => {
  // Debug: Log course data to check URLs
  React.useEffect(() => {
    console.log('Course data in CourseCard:', {
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnail,
      thumbnailUrl: course.thumbnailUrl,
      // Log first video if available
      firstVideo: course.courseContent?.[0]?.lessons?.[0]?.videoUrl
    });
  }, [course]);

  // Always call the hook at the top level
  const cartContext = useCart();
  const addToCart = cartContext?.addToCart || (async () => {});
  const isInCart = cartContext?.isInCart || (() => false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const handleAddToCart = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      // Prevent adding if already in cart or currently adding
      if (isInCart(course.id) || isAddingToCart) {
        console.log(`Course ${course.id} is already in cart or being added`);
        return;
      }

      console.log(
        `Adding individual course to cart: ${course.id} - ${course.title}`
      );

      setIsAddingToCart(true);

      try {
        // Add this specific course to cart
        await addToCart(course);
      } catch (error) {
        console.error("Error adding course to cart:", error);
      }

      // Simulate loading state for visual feedback
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    },
    [course, addToCart, isInCart, isAddingToCart]
  );

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

  return (
    <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200">
      {/* Course Image with Duration Badge (restored thumbnail) */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnailUrl || course.thumbnail || '/placeholder-course.jpg'}
          alt={course.title || 'Course thumbnail'}
          width={480}
          height={270}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e: any) => {
            try {
              e.currentTarget.src = '/placeholder-course.jpg';
            } catch (err) {
              // ignore
            }
          }}
        />

        {/* subtle dark gradient overlay to keep text/badges readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

        {/* Duration Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
          {course.duration}
        </div>

        {/* Course Time Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{Math.floor((course.lectures ?? 0) * 1.5)}h {Math.floor(((course.lectures ?? 0) * 1.5 % 1) * 60)}m</span>
        </div>

        {/* optional play overlay for preview */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-blue-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Course Content (popular-courses style) */}
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
            <span>Lesson {course.lectures}</span>
          </div>

          {/* Students - Right */}
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Students {course.studentsEnrolled}+</span>
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
            onClick={handleAddToCart}
            className={`w-full py-1.5 px-2 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded ${
              isInCart(course.id)
                ? "bg-blue-600 hover:bg-blue-700"
                : isAddingToCart
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isInCart(course.id) || isAddingToCart}
          >
            {isInCart(course.id) ? (
              <>
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                <span>Added</span>
              </>
            ) : isAddingToCart ? (
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
  );
};

export default CourseCard;
