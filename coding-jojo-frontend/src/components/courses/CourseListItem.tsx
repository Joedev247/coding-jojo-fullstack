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

interface CourseListItemProps {
  course: Course;
  handleSaveCourse: (id: string) => void;
}

const CourseListItem: React.FC<CourseListItemProps> = ({
  course,
  handleSaveCourse,
}) => {
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
        if (addToCart) {
          await addToCart(course);
        }
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
    <div className="group h-full flex flex-col overflow-hidden bg-white  border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10 hover:translate-y-[-1px] hover:border-blue-300 md:flex-row">
      {/* Card Header/Image with gradient overlay */}
      <div className="relative aspect-video md:w-64 flex-shrink-0 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={400}
          height={225}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {/* Tags and badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {course.isFeatured && (
            <div className="bg-blue-600 text-white text-xs py-0.5 px-2 rounded-full font-medium shadow-sm">
              Featured
            </div>
          )}
          {course.isNew && (
            <div className="bg-blue-500 text-white text-xs py-0.5 px-2 rounded-full font-medium shadow-sm">
              New
            </div>
          )}
        </div>
        {/* Level indicator */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs py-0.5 px-2 rounded-full">
          <Users className="w-3 h-3" />
          <span>{course.level}</span>
        </div>{" "}
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs py-0.5 px-2 rounded-full">
          <Clock className="w-3 h-3" />
          <span>{formatDuration(course.duration)}</span>
        </div>
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-blue-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-4 w-4 text-white" fill="white" />
          </div>
        </div>
        {/* Save button */}
        <button
          onClick={() => handleSaveCourse(course.id)}
          className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white rounded-full transition duration-200"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              course.isSaved ? "text-blue-600 fill-blue-600" : "text-gray-400"
            }`}
          />
        </button>
        {course.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-1 bg-blue-600"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Card Body with improved layout */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
          {course.title}
        </h3>

        <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
          <Users className="w-3 h-3" />
          {course.instructor.name}
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
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Progress Bar with gradient - Only shown if progress exists */}
        {course.progress !== undefined && (
          <div className="mb-2">
            <div className="mb-1 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">
                Course Progress
              </span>
              <span className="text-xs text-gray-600">{course.progress}%</span>
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
              <span className="text-xs font-medium text-blue-600">
                {calculateDiscount(course)}% off
              </span>
            )}
          </div>

          {/* Added View Detail and Add to Cart buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/courses/${course.id}`}>
              <button className="w-full py-2 px-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium  transition-colors flex items-center justify-center gap-1 whitespace-nowrap min-w-fit flex-shrink-0">
                <Eye className="h-3 w-3 flex-shrink-0" />
                <span>View Details</span>
              </button>
            </Link>{" "}
            <button
              onClick={handleAddToCart}
              disabled={isInCart(course.id) || isAddingToCart}
              className={`py-2 px-2.5 text-white text-xs font-medium  transition-colors flex items-center justify-center gap-1 whitespace-nowrap min-w-fit flex-shrink-0 ${
                isInCart(course.id)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : isAddingToCart
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
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

export default CourseListItem;
