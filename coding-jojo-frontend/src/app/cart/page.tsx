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
          src={course.thumbnail || "/placeholder-course.jpg"}
          alt={course.title}
          width={400}
          height={225}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              savedCourses.has(course.id)
                ? "text-pink-500 fill-pink-500"
                : "text-gray-300"
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
            </Link>
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
              {" "}
              {isInCart(course.id) ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Added to Cart</span>
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
        instructor: {
          ...course.instructor,
          id: course.instructor._id,
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
      <div className="min-h-screen text-white relative">
        <Navbar />
        
        {/* <AnimatedBackground /> */}

        {/* <Breadcrumb items={breadcrumbItems} /> */}

        {/* Main Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-8">
          <div className="max-w-[1400] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-0">
                Your Shopping Cart
              </h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={syncWithServer}
                  disabled={loading}
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <LoadingSpinner size="xs" />
                  ) : (
                    <ShoppingCart className="h-5 w-5 mr-2" />
                  )}
                  <span>{loading ? 'Syncing...' : 'Sync with Server'}</span>
                </button>
                <Link
                  href="/courses"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
            {cartItems.length === 0 ? (
              <div className="text-center py-16   bg-gray-900/60">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">
                  Looks like you haven't added any courses yet.
                </p>
                <Link
                  href="/courses"
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium px-6 py-3  shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                >
                  Explore Courses
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-grow">
                  <div className="  bg-gray-900/60 backdrop-blur-sm overflow-hidden">
                    {" "}
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-4">
                        {getTotalItems()} Items in Cart ({cartItems.length}{" "}
                        Courses)
                      </h2>

                      <div className="divide-y divide-gray-800">
                        {cartItems.map((cartItem) => (
                          <div
                            key={cartItem.course.id}
                            className="py-6 flex flex-col sm:flex-row gap-4"
                          >
                            <div className="sm:w-32 h-20 overflow-hidden relative flex-shrink-0">
                              <Image
                                src={
                                  cartItem.course.thumbnail ||
                                  "/placeholder-course.jpg"
                                }
                                alt={cartItem.course.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-grow">
                              <h3 className="font-medium text-lg mb-1">
                                {cartItem.course.title}
                              </h3>
                              <p className="text-gray-400 text-sm mb-2">
                                By {cartItem.course.instructor.name}
                              </p>

                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      handleQuantityUpdate(
                                        cartItem.course.id,
                                        cartItem.quantity - 1
                                      )
                                    }
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                                    disabled={cartItem.quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="mx-3 min-w-[2rem] text-center">
                                    {cartItem.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityUpdate(
                                        cartItem.course.id,
                                        cartItem.quantity + 1
                                      )
                                    }
                                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div>
                                    <div className="text-lg font-semibold">
                                      {formatPrice(cartItem.course.price)}
                                    </div>
                                    {cartItem.quantity > 1 && (
                                      <div className="text-sm text-gray-400">
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
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <X className="h-5 w-5" />
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
                <div className="lg:w-80 flex-shrink-0">
                  <div className="  bg-gray-900/60 backdrop-blur-sm overflow-hidden sticky top-24">
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Order Summary
                      </h2>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tax (5%)</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                          <div className="flex justify-between text-green-500">
                            <span>Discount</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="pt-3 border-t border-gray-800">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            <span>Lifetime access to all courses</span>
                          </div>
                        </div>
                      </div>

                      {/* Coupon Code */}
                      {!couponApplied ? (
                        <div className="mb-6">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder="Enter coupon code"
                              className="flex-grow h-10 px-1 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 focus:border-pink-500/50 text-white placeholder-gray-400 outline-none duration-300 text-white text-sm outline-none transition-all"
                            />
                            <button
                              onClick={applyCoupon}
                              className="px-4 py-2  bg-gray-900 hover:bg-gray-700 border border-gray-700/50 text-white  transition-colors"
                            >
                            Apply
                            </button>
                          </div>
                          <div className="text-xs text-gray-400 mt-2 flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>Try code: JOJO25 for 25% off</span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-6 bg-green-500/10 p-3 flex justify-between items-center">
                          <div>
                            <span className="text-green-500 font-medium">
                              {couponCode}
                            </span>
                            <p className="text-xs text-gray-400">
                              25% discount applied
                            </p>
                          </div>
                          <button
                            onClick={clearCoupon}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {/* Checkout Button */}
                      <Link
                        href="/checkout"
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium px-6 py-3  shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center justify-center"
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>

                      <div className="mt-4 text-xs text-center text-gray-400">
                        Secure checkout. 30-day money-back guarantee.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}{" "}
            {/* Related Courses - Shown only when cart has items */}
            {cartItems.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-6">
                  You might also like
                </h2>{" "}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getRelatedCourses().map((course) => (
                    <RelatedCourseCard
                      key={course.id}
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
