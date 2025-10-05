"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  CreditCard,
  ShieldCheck,
  Award,
  Clock,
  Globe,
} from "lucide-react";
// import AnimatedBackground from '@/components/ui/AnimatedBackground';
// import Breadcrumb from '@/components/ui/Breadcrumb';
import { useToast } from "../../hooks/useToast";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../components/auth/ProtectedRoute";

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
}

export default function CheckoutPage() {
  const toast = useToast();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    saveInfo: true,
  });

  // Order summary state
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Cart items (would normally be fetched from cart state/API)
  const cartItems: CartItem[] = [
    {
      id: "1",
      title: "Complete JavaScript Course 2025",
      image: "/course-javascript.jpg",
      price: 14.99,
      originalPrice: 89.99,
    },
    {
      id: "2",
      title: "React for Beginners: Build Modern Web Apps",
      image: "/course-react.jpg",
      price: 12.99,
      originalPrice: 94.99,
    },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.05; // 5% tax example
  const discount = subtotal * 0.25; // Example 25% discount
  const total = subtotal + tax - discount;

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form and proceed to payment
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error("Please fill in all required fields", {
        description: "Email, first name, and last name are required.",
      });
      return;
    }

    // Navigate to payment page
    window.location.href = "/payment";
  };

  const breadcrumbItems = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout", active: true },
  ];
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <div className="min-h-screen mt-20 font-['Montserrat',sans-serif] text-white relative">
          {/* <AnimatedBackground/> */}

          {/* <Breadcrumb items={breadcrumbItems} /> */}

          <div className="relative z-10 max-w-[1400] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-[1400] flex flex-col lg:flex-row gap-8">
              {/* Checkout Form */}
              <div className="flex-grow order-2 lg:order-1">
                <div className="  bg-gray-900/60 backdrop-blur-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-6">
                      Billing Information
                    </h2>

                    <form onSubmit={handleSubmit}>
                      {/* Email */}
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          placeholder="you@example.com"
                        />
                      </div>

                      {/* Name - 2 columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div className="mb-4">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Country / Region{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                            className="w-full h-12 px-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                          }}
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="BR">Brazil</option>
                          <option value="JP">Japan</option>
                          <option value="NG">Nigeria</option>
                        </select>
                      </div>

                      {/* Address */}
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          placeholder="Street address, apartment, suite, etc."
                        />
                      </div>

                      {/* City, State, Zip - 3 columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            State / Province{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            ZIP / Postal <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          />
                        </div>
                      </div>

                      {/* Save Information Checkbox */}
                      <div className="mb-6">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="saveInfo"
                            name="saveInfo"
                            checked={formData.saveInfo}
                            onChange={handleInputChange}
                            className="h-4 w-4  bg-gray-900 focus:ring-pink-500 text-pink-500 rounded"
                          />
                          <label
                            htmlFor="saveInfo"
                            className="ml-2 text-sm text-gray-400"
                          >
                            Save this information for next time
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium px-6 py-4 shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                      >
                        Continue to Payment
                      </button>
                    </form>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <div className="  bg-gray-900/60 backdrop-blur-sm p-4 flex flex-col items-center text-center">
                    <ShieldCheck className="h-8 w-8 text-pink-500 mb-2" />
                    <h3 className="font-medium text-sm">Secure Payment</h3>
                    <p className="text-gray-400 text-xs mt-1">
                      Encrypted transactions
                    </p>
                  </div>
                  <div className="  bg-gray-900/60 backdrop-blur-sm p-4 flex flex-col items-center text-center">
                    <Award className="h-8 w-8 text-pink-500 mb-2" />
                    <h3 className="font-medium text-sm">Quality Content</h3>
                    <p className="text-gray-400 text-xs mt-1">
                      Expert instructors
                    </p>
                  </div>
                  <div className="  bg-gray-900/60 backdrop-blur-sm p-4 flex flex-col items-center text-center">
                    <Clock className="h-8 w-8 text-pink-500 mb-2" />
                    <h3 className="font-medium text-sm">Lifetime Access</h3>
                    <p className="text-gray-400 text-xs mt-1">
                      Learn at your pace
                    </p>
                  </div>
                  <div className="  bg-gray-900/60 backdrop-blur-sm p-4 flex flex-col items-center text-center">
                    <Globe className="h-8 w-8 text-pink-500 mb-2" />
                    <h3 className="font-medium text-sm">Global Community</h3>
                    <p className="text-gray-400 text-xs mt-1">
                      Join fellow developers
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary - Mobile collapsible, Desktop fixed */}
              <div className="lg:w-96 flex-shrink-0 order-1 lg:order-2">
                {/* Mobile Collapsible Summary */}
                <div className="lg:hidden   bg-gray-900/60 backdrop-blur-sm overflow-hidden mb-6">
                  <button
                    className="w-full p-4 flex justify-between items-center"
                    onClick={() => setShowOrderSummary(!showOrderSummary)}
                  >
                    <div className="flex items-center">
                      <h2 className="font-semibold">Order Summary</h2>
                      <span className="ml-2 text-gray-400">
                        ({cartItems.length} courses)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">${total.toFixed(2)}</span>
                      {showOrderSummary ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {showOrderSummary && (
                    <div className="p-4 pt-0">
                      {/* Cart Items */}
                      <div className="space-y-4 mb-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-16 h-12 overflow-hidden relative flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-sm font-medium line-clamp-1">
                                {item.title}
                              </h3>
                              <div className="flex items-center mt-1">
                                <span className="text-sm font-semibold">
                                  ${item.price.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-400 line-through ml-2">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Price Details */}
                      <div className="space-y-2 pt-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-500">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Desktop Fixed Summary */}
                <div className="hidden lg:block   bg-gray-900/60 backdrop-blur-sm overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-20 h-14 overflow-hidden relative flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-sm font-medium line-clamp-2">
                              {item.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className="text-sm font-semibold">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-xs text-gray-400 line-through ml-2">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax (5%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-500">
                        <span>Discount (25%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                      <div className="pt-3">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/60 p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-pink-500" />
                        <div>
                          <p className="text-sm font-medium">
                            Complete your purchase on the next page
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            All major credit cards accepted
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-center text-gray-400">
                      Secure checkout. 30-day money-back guarantee.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}
