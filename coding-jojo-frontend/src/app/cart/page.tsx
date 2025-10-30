"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  X,
  ShoppingCart,
  ArrowRight,
  Tag,
  Heart,
  Star,
  Clock,
  Users,
  Play,
  Eye,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { Course } from "../../types/courses";
import {
  courseService,
  Course as ServiceCourse,
} from "../../services/courseService";
import AnimatedBackground from "../../components/ui/AnimatedBackground";
// import Breadcrumb from '../../components/ui/Breadcrumb';
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useToast } from "../../hooks/useToast";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import { formatDuration } from "../../utils/helpers";

// Time display component to handle duration calculation
const calculateDuration = (lessons: number): string => {
  const totalHours = lessons * 1.5;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}h ${minutes}m`;
};

// Related Course Card Component with same design as CourseCard
interface RelatedCourseCardProps {
  course: Course;
  handleSaveCourse: (id: string) => void;
  savedCourses: Set<string>;
  formatPrice: (price: number | string) => string;
  addToCart: (course: Course) => void;
  isInCart: (id: string) => boolean;
}

const RelatedCourseCard: React.FC<RelatedCourseCardProps> = ({
  course,
  handleSaveCourse,
  savedCourses,
  formatPrice,
  addToCart,
  isInCart,
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isInCart(course.id) || isAddingToCart) return;

      setIsAddingToCart(true);

      // Add to cart
      addToCart(course);

      // Simulate loading state for visual feedback
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    },
    [course, addToCart, isInCart, isAddingToCart]
  );

  const renderStars = (rating: number, ratingId: string) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={`${ratingId}-star-${i}`}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="group h-full flex flex-col overflow-hidden bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:translate-y-[-1px] hover:border-blue-300">
      {/* Course Image with Duration Badge */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={
            typeof course.thumbnail === 'string' && course.thumbnail.trim() !== ''
              ? course.thumbnail
              : "/placeholder-course.jpg"
          }
          alt={typeof course.title === 'string' ? course.title.trim() : "Course thumbnail"}
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
          {course.duration != null && typeof course.duration === 'object' && 'hours' in (course.duration as object)
            ? `${(course.duration as any).hours}h ${(course.duration as any).minutes}m`
            : String(course.duration ?? "")}
        </div>

        {/* Course Time Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>
            {calculateDuration(Number((course as any).lessons) || Number((course as any).lessonCount) || 1)}
          </span>
        </div>

        {/* Save button */}
        <button
          onClick={() => handleSaveCourse(course.id)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white rounded-full transition duration-200 shadow-sm flex items-center justify-center"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              savedCourses.has(course.id)
                ? "text-red-500 fill-red-500"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Rating and Level Row */}
        <div className="flex items-center justify-between mb-2">
          {/* Rating - Left */}
          <div className="flex items-center gap-1">
            {renderStars(course.rating, `related-${course.id}`)}
            <span className="text-gray-600 text-xs ml-1">({course.ratingCount?.toLocaleString() || "0"})</span>
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
            <span>Lesson {(course as any).lessons ?? (course as any).lessonCount ?? 0}</span>
          </div>
          
          {/* Students - Right */}
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Students {(course as any).students || 0}+</span>
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
              {formatPrice(course.price)}
            </div>
            {course.originalPrice && (
              <div className="text-gray-400 text-xs line-through">
                ${course.originalPrice.toFixed(2)}
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
            disabled={isInCart(course.id) || isAddingToCart}
            className={`w-full py-1.5 px-2 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 rounded ${
              isInCart(course.id)
                ? "bg-blue-600 hover:bg-blue-700"
                : isAddingToCart
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
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

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    addToCart,
    isInCart,
    getCartTotal,
    getTotalItems,
    syncWithServer,
    loading
  } = useCart();
  const toast = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [savedCourses, setSavedCourses] = useState<Set<string>>(new Set());
  const [allCourses, setAllCourses] = useState<ServiceCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // Fetch all courses for related courses section
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const response = await courseService.getCourses();
        if (response.success && response.data) {
          setAllCourses(response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Calculate cart totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // 5% tax example
  const total = subtotal + tax - discount;

  // Handle quantity updates
  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  // Handle save course toggle
  const handleSaveCourse = (id: string) => {
    setSavedCourses((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) {
        newSaved.delete(id);
      } else {
        newSaved.add(id);
      }
      return newSaved;
    });
  };
  // Get related courses (exclude courses already in cart)
  const getRelatedCourses = () => {
    const cartCourseIds = cartItems.map((item) => item.course.id);
    return allCourses
      .filter((course: any) => !cartCourseIds.includes(course._id))
      .slice(0, 4) // Show only 4 related courses
      .map((course: any) => ({
        ...course,
        id: course._id, // Map _id to id for compatibility
        thumbnail: course.thumbnail || null, // Ensure empty strings are converted to null
        instructor: {
          ...course.instructor,
          id: course.instructor?._id,
          name: course.instructor?.name || "Unknown Instructor",
        },
      }));
  };
  // Apply coupon code
  const applyCoupon = () => {
    // Example coupon logic
    if (couponCode.toLowerCase() === "jojo25") {
      setDiscount(subtotal * 0.25); // 25% off
      setCouponApplied(true);
      toast.success("Coupon applied successfully!", {
        description: "25% discount has been applied to your order.",
      });
    } else {
      setDiscount(0);
      setCouponApplied(false);
      toast.error("Invalid coupon code", {
        description: "Please check your coupon code and try again.",
      });
    }
  };
  // Clear coupon
  const clearCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponApplied(false);
    toast.info("Coupon removed", {
      description: "The discount has been removed from your order.",
    });
  };

  // Format price to display
  const formatPrice = (price: number | string): string => {
    if (typeof price === "string") return price;
    return `$${price.toFixed(2)}`;
  };
  const breadcrumbItems = [{ id: "cart", label: "Cart", active: true }];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white text-gray-900 relative">
        <Navbar />
        
        {/* <AnimatedBackground /> */}

        {/* <Breadcrumb items={breadcrumbItems} /> */}

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-xl sm:text-2xl font-bold mb-3 md:mb-0 text-gray-900">
                Your Shopping Cart
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={syncWithServer}
                  disabled={loading}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 text-sm"
                >
                  {loading ? (
                    <LoadingSpinner size="xs" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-1.5" />
                  )}
                  <span>{loading ? 'Syncing...' : 'Sync with Server'}</span>
                </button>
                <Link
                  href="/courses"
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-1.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-white  shadow-sm border border-blue-100">
                <ShoppingCart className="h-12 w-12 mx-auto text-blue-400 mb-3" />
                <h2 className="text-lg font-medium mb-2 text-gray-900">Your cart is empty</h2>
                <p className="text-gray-600 mb-4 text-sm">
                  Looks like you haven't added any courses yet.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2  shadow-sm hover:shadow-md transition-all duration-300 text-sm"
                >
                  Explore Courses
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items */}
                <div className="flex-grow">
                  <div className="bg-white  shadow-sm border border-blue-100 overflow-hidden">
                    <div className="p-4">
                      <h2 className="text-xs font-semibold mb-3 text-gray-900">
                        {getTotalItems()} Items in Cart ({cartItems.length}{" "}
                        Courses)
                      </h2>

                      <div className="divide-y divide-gray-200">
                        {cartItems.map((cartItem, index) => (
                          <div
                            key={`${cartItem.course.id}-${index}`}
                            className="py-4 flex flex-col sm:flex-row gap-3"
                          >
                            <div className="sm:w-28 h-16 overflow-hidden relative flex-shrink-0 ">
                              <Image
                                src={
                                  typeof cartItem.course.thumbnail === 'string' && cartItem.course.thumbnail.trim() !== ''
                                    ? cartItem.course.thumbnail
                                    : "/placeholder-course.jpg"
                                }
                                alt={typeof cartItem.course.title === 'string' ? cartItem.course.title.trim() : "Course thumbnail"}
                                fill
                                className="object-cover"
                                onError={(e: any) => {
                                  try {
                                    e.currentTarget.src = '/placeholder-course.jpg';
                                  } catch (err) {
                                    // ignore
                                  }
                                }}
                              />
                            </div>

                            <div className="flex-grow">
                              <h3 className="font-medium text-xs mb-1 text-gray-900">
                                {cartItem.course.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                By {cartItem.course.instructor.name}
                              </p>

                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      handleQuantityUpdate(
                                        cartItem.course.id,
                                        cartItem.quantity - 1
                                      )
                                    }
                                    className="w-7 h-7  border border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-600"
                                    disabled={cartItem.quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="mx-2 min-w-[1.5rem] text-center text-sm font-medium text-gray-900">
                                    {cartItem.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityUpdate(
                                        cartItem.course.id,
                                        cartItem.quantity + 1
                                      )
                                    }
                                    className="w-7 h-7  border border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-600"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div>
                                    <div className="text-xs font-semibold text-gray-900">
                                      {formatPrice(cartItem.course.price)}
                                    </div>
                                    {cartItem.quantity > 1 && (
                                      <div className="text-xs text-gray-600">
                                        Total:{" "}
                                        {formatPrice(
                                          typeof cartItem.course.price ===
                                            "number"
                                            ? cartItem.course.price *
                                                cartItem.quantity
                                            : cartItem.course.price
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeItem(cartItem.course.id)
                                    }
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-72 flex-shrink-0">
                  <div className="bg-white  shadow-sm border border-blue-100 overflow-hidden sticky top-20">
                    <div className="p-4">
                      <h2 className="text-xs font-semibold mb-3 text-gray-900">
                        Order Summary
                      </h2>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax (5%)</span>
                          <span className="text-gray-900">${tax.toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                          <div className="flex justify-between text-blue-600 text-sm">
                            <span>Discount</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between font-semibold text-xs">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">${total.toFixed(2)}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            <span>Lifetime access to all courses</span>
                          </div>
                        </div>
                      </div>

                      {/* Coupon Code */}
                      {!couponApplied ? (
                        <div className="mb-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder="Enter coupon code"
                              className="flex-grow h-8 px-3 border border-gray-300  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-sm outline-none transition-all"
                            />
                            <button
                              onClick={applyCoupon}
                              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white  text-sm font-medium transition-colors"
                            >
                            Apply
                            </button>
                          </div>
                          <div className="text-xs text-gray-600 mt-1 flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>Try code: JOJO25 for 25% off</span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4 bg-blue-50 border border-blue-200  p-3 flex justify-between items-center">
                          <div>
                            <span className="text-blue-700 font-medium text-sm">
                              {couponCode}
                            </span>
                            <p className="text-xs text-blue-600">
                              25% discount applied
                            </p>
                          </div>
                          <button
                            onClick={clearCoupon}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {/* Checkout Button */}
                      <Link
                        href="/checkout"
                        className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2.5  shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center text-sm"
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>

                      <div className="mt-3 text-xs text-center text-gray-600">
                        Secure checkout. 30-day money-back guarantee.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}{" "}
            {/* Related Courses - Shown only when cart has items */}
            {cartItems.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">
                  You might also like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {getRelatedCourses().map((course, index) => (
                    <RelatedCourseCard
                      key={`related-${course.id}-${index}`}
                      course={course}
                      handleSaveCourse={handleSaveCourse}
                      savedCourses={savedCourses}
                      formatPrice={formatPrice}
                      addToCart={addToCart}
                      isInCart={isInCart}
                    />
                  ))}
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
