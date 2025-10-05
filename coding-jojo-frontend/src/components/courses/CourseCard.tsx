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
    <div className="group h-full flex flex-col overflow-hidden  bg-gray-900/70 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 hover:translate-y-[-2px] hover:border-pink-500/30">
      {/* Card Header/Image with gradient overlay */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnailUrl || course.thumbnail || '/placeholder-course.jpg'} // FIXED: Use thumbnailUrl first
          alt={course.title || 'Course thumbnail'}
          width={400}
          height={225}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            console.error('Failed to load course thumbnail:', course.thumbnailUrl || course.thumbnail);
            // Fallback to placeholder image
            e.currentTarget.src = '/placeholder-course.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {/* Tags and badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isFeatured && (
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs py-1 px-2 font-medium shadow-lg">
              Featured
            </div>
          )}
          {course.isNew && (
            <div className="bg-green-500 text-white text-xs py-1 px-2 font-medium shadow-lg">
              New
            </div>
          )}
        </div>
        {/* Level indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-full">
          <Users className="w-3 h-3" />
          <span>{course.level}</span>
        </div>{" "}
        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-full">
          <Clock className="w-3 h-3" />
          <span>{formatDuration(course.duration)}</span>
        </div>
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-pink-500/80 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-5 w-5 text-white" fill="white" />
          </div>
        </div>
        {/* Save button */}
        <button
          onClick={() => handleSaveCourse(course.id)}
          className="absolute top-2 right-2 p-1.5   bg-gray-900/70 hover:bg-gray-800 rounded-full transition duration-200"
        >
          <Heart
            className={`w-4 h-4 ${
              course.isSaved ? "text-pink-500 fill-pink-500" : "text-gray-300"
            }`}
          />
        </button>
        {course.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div
              className="h-1 bg-gradient-to-r from-pink-500 to-orange-500"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Card Body with improved layout */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-gray-300 mb-2 flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>
            <Image
              src={course.instructor.avatarUrl && course.instructor.avatarUrl.trim() !== "" ? course.instructor.avatarUrl : "/default-avatar.png"}
              alt={course.instructor.name}
              width={18}
              height={18}
              className="inline-block rounded-full mr-1 align-middle"
            />
            {course.instructor.name}
          </span>
        </p>

        <div className="flex items-center gap-1 mb-3">
          {renderStars(course.rating)}
          <span className="text-amber-400 font-bold text-xs ml-1">
            {course.rating}
          </span>
          <span className="text-gray-400 text-xs">
            ({course.ratingCount?.toLocaleString() || "0"})
          </span>
        </div>

        {/* Course description - truncated */}
        <p className="text-xs text-gray-400 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Progress Bar with gradient - Only shown if progress exists */}
        {course.progress !== undefined && (
          <div className="mb-3">
            <div className="mb-1.5 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-300">
                Course Progress
              </span>
              <span className="text-xs text-gray-300">{course.progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Price tag with improved styling */}
        <div className="mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="font-bold text-white">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="text-gray-400 text-xs line-through ml-1">
                  ${course.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {calculateDiscount(course) && (
              <span className="text-xs font-medium text-green-400">
                {calculateDiscount(course)}% off
              </span>
            )}
          </div>

          {/* Added View Detail and Add to Cart buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/courses/${course.id}`}>
              <button className="w-full py-2.5 px-3 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap min-w-fit flex-shrink-0">
                <Eye className="h-3.5 w-3.5 flex-shrink-0" />
                <span>View Details</span>
              </button>
            </Link>{" "}
            <button
              onClick={handleAddToCart}
              disabled={isInCart(course.id) || isAddingToCart}
              className={`py-2.5 px-3 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-lg whitespace-nowrap min-w-fit flex-shrink-0 ${
                isInCart(course.id)
                  ? "bg-green-600 hover:bg-green-700"
                  : isAddingToCart
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500"
              }`}
            >
              {isInCart(course.id) ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Added to Cart</span>{" "}
                </>
              ) : isAddingToCart ? (
                <>
                  <LoadingSpinner size="xs" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
