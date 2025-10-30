"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { ChevronRight, Package, BookOpen, CreditCard, Smartphone, CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar";

interface AddressData {
  firstName: string;
  secondName: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

interface DeliveryMethod {
  id: string;
  name: string;
  price: number;
  date: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { cartItems, getCartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // Start at Address Details (step 1 of 3)
  const [currency, setCurrency] = useState<"USD" | "XAF">("USD");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const [deliveryAddress, setDeliveryAddress] = useState<AddressData>({
    firstName: user?.firstName || "Matheus",
    secondName: user?.lastName || "Wangchest",
    streetAddress: "Street and number",
    city: "City",
    zipCode: "00-000",
    country: "Poland",
    phoneNumber: "123456789",
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("");
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState("fedex");

  const deliveryMethods: DeliveryMethod[] = [
    { id: "dhl", name: "DHL EXPRESS", price: 14.95, date: "Friday, 01.02.2019" },
    { id: "fedex", name: "FEDEX", price: 9.95, date: "Friday, 01.02.2019" },
    { id: "gls", name: "GLS", price: 4.95, date: "Monday, 11.02.2019" },
  ];

  // Exchange rate: 1 USD = 600 XAF
  const exchangeRate = 600;

  // Calculate total from cart in USD
  const subtotalUSD = cartItems && cartItems.length > 0 ? getCartTotal() : 32.97;
  const shippingCostUSD = 0; // No shipping for digital courses
  const totalUSD = subtotalUSD + shippingCostUSD;

  // Convert to selected currency
  const subtotal = currency === "USD" ? subtotalUSD : subtotalUSD * exchangeRate;
  const shippingCost = currency === "USD" ? shippingCostUSD : shippingCostUSD * exchangeRate;
  const total = currency === "USD" ? totalUSD : totalUSD * exchangeRate;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      // Process payment and redirect
      handleConfirmOrder();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmOrder = () => {
    // Redirect to success payment page
    router.push("/success-payment");
  };

  const formatPrice = (price: number) => {
    if (currency === "USD") {
      return `$${price.toFixed(2)}`;
    } else {
      return `${price.toFixed(0)} XAF`;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  const steps = [
    { number: 1, label: "ADDRESS DETAILS", active: currentStep >= 1 },
    { number: 2, label: "PAYMENT METHOD", active: currentStep >= 2 },
    { number: 3, label: "PREVIEW & CONFIRM", active: currentStep >= 3 },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        step.active
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <p
                      className={`text-xs mt-2 font-medium text-center ${
                        step.active ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 -mt-6 ${
                        steps[index + 1].active ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded shadow-sm p-8">
                {/* Step 1: Address Details */}
                {currentStep === 1 && (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Address details
                      </h1>
                      <p className="text-sm text-gray-500">
                        Please provide your billing information for course enrollment.
                      </p>
                    </div>

                {/* Delivery Address */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                    Delivery address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={deliveryAddress.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                          Second Name
                        </label>
                        <input
                          type="text"
                          name="secondName"
                          value={deliveryAddress.secondName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={deliveryAddress.streetAddress}
                        onChange={handleInputChange}
                        placeholder="Street and number"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={deliveryAddress.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={deliveryAddress.zipCode}
                          onChange={handleInputChange}
                          placeholder="00-000"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                          Country
                        </label>
                        <div className="relative">
                          <select
                            name="country"
                            value={deliveryAddress.country}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Poland">Poland</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Germany">Germany</option>
                            <option value="Cameroon">Cameroon</option>
                          </select>
                          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={deliveryAddress.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Have to start format with no spaces and dashes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                    Billing address
                  </h2>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sameAddress"
                      checked={useSameAddress}
                      onChange={(e) => setUseSameAddress(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="sameAddress" className="ml-2 text-sm text-gray-900">
                      Use delivery address as billing address
                    </label>
                  </div>
                </div>


                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={handlePreviousStep}
                        disabled={currentStep === 1}
                        className={`px-6 py-2.5 text-sm font-medium transition-colors uppercase ${
                          currentStep === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-8 py-2.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center space-x-2 uppercase"
                      >
                        <span>Next step</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* Step 2: Payment Method */}
                {currentStep === 2 && (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Payment method
                      </h1>
                      <p className="text-sm text-gray-500">
                        Select your preferred payment method to complete your course purchase.
                      </p>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-8">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                        Select Payment Method
                      </h2>
                      <div className="space-y-3">
                        {/* Credit/Debit Card */}
                        <label
                          className={`flex items-center justify-between p-4 border-2 rounded cursor-pointer transition-all ${
                            selectedPaymentMethod === "card"
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <input
                              type="radio"
                              name="payment"
                              value="card"
                              checked={selectedPaymentMethod === "card"}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <CreditCard className="w-6 h-6 text-gray-600" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900">Credit/Debit Card</p>
                              <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-6 border border-gray-300 rounded flex items-center justify-center">
                              <span className="text-blue-600 font-bold text-xs">VISA</span>
                            </div>
                            <div className="w-10 h-6 border border-gray-300 rounded flex items-center justify-center">
                              <div className="flex space-x-0.5">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </label>

                        {/* PayPal */}
                        <label
                          className={`flex items-center justify-between p-4 border-2 rounded cursor-pointer transition-all ${
                            selectedPaymentMethod === "paypal"
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <input
                              type="radio"
                              name="payment"
                              value="paypal"
                              checked={selectedPaymentMethod === "paypal"}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">P</span>
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">PayPal</p>
                              <p className="text-xs text-gray-500">Pay with your PayPal account</p>
                            </div>
                          </div>
                        </label>

                        {/* Mobile Money */}
                        <label
                          className={`flex items-center justify-between p-4 border-2 rounded cursor-pointer transition-all ${
                            selectedPaymentMethod === "mobilemoney"
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <input
                              type="radio"
                              name="payment"
                              value="mobilemoney"
                              checked={selectedPaymentMethod === "mobilemoney"}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <Smartphone className="w-6 h-6 text-emerald-600" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900">Mobile Money</p>
                              <p className="text-xs text-gray-500">MTN Mobile Money</p>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-yellow-400 s-center justify-center">
                            <span className="text-blue-900 font-black text-xs">MTN</span>
                          </div>
                        </label>

                        {/* Orange Money */}
                        <label
                          className={`flex items-center justify-between p-4 border-2 rounded cursor-pointer transition-all ${
                            selectedPaymentMethod === "orangemoney"
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <input
                              type="radio"
                              name="payment"
                              value="orangemoney"
                              checked={selectedPaymentMethod === "orangemoney"}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <Smartphone className="w-6 h-6 text-orange-600" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900">Orange Money</p>
                              <p className="text-xs text-gray-500">Pay with Orange Money</p>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-orange-500 s-center justify-center">
                            <span className="text-white font-black text-xs">OM</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Card Details Form */}
                    {selectedPaymentMethod === "card" && (
                      <div className="mb-8">
                        <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                          Card Details
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={cardDetails.cardNumber}
                              onChange={handleCardInputChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              name="cardName"
                              value={cardDetails.cardName}
                              onChange={handleCardInputChange}
                              placeholder="John Doe"
                              className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={cardDetails.expiryDate}
                                onChange={handleCardInputChange}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                                CVV
                              </label>
                              <input
                                type="text"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleCardInputChange}
                                placeholder="123"
                                maxLength={4}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mobile Money Number */}
                    {(selectedPaymentMethod === "mobilemoney" || selectedPaymentMethod === "orangemoney") && (
                      <div className="mb-8">
                        <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                          {selectedPaymentMethod === "mobilemoney" ? "Mobile Money" : "Orange Money"} Details
                        </h2>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5 uppercase">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={mobileMoneyNumber}
                            onChange={(e) => setMobileMoneyNumber(e.target.value)}
                            placeholder="+237 6XX XXX XXX"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Enter your {selectedPaymentMethod === "mobilemoney" ? "MTN" : "Orange"} Money number
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={handlePreviousStep}
                        className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors uppercase"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-8 py-2.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center space-x-2 uppercase"
                      >
                        <span>Next step</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* Step 3: Preview & Confirm */}
                {currentStep === 3 && (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Preview & Confirm
                      </h1>
                      <p className="text-sm text-gray-500">
                        Review your order details and confirm your purchase.
                      </p>
                    </div>

                    {/* Order Summary */}
                    <div className="mb-8">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                        Order Summary
                      </h2>
                      <div className="bg-gray-50 rounded p-6 space-y-4">
                        {cartItems && cartItems.length > 0 ? (
                          cartItems.map((cartItem, index) => (
                            <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                              <div className="flex items-center space-x-4">
                                {cartItem.course?.thumbnail ? (
                                  <div className="w-16 h-16 relative rounded overflow-hidden">
                                    <Image
                                      src={cartItem.course.thumbnail}
                                      alt={cartItem.course?.title || "Course"}
                                      fill
                                      className="object-cover"
                                      onError={(e: any) => {
                                        e.currentTarget.src = '/placeholder-course.jpg';
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-white" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-semibold text-sm text-gray-900">
                                    {cartItem.course?.title || "Course Name"}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Instructor: {cartItem.course?.instructor?.name || "Unknown"}
                                  </p>
                                  {cartItem.quantity > 1 && (
                                    <p className="text-xs text-blue-600 font-medium">
                                      Quantity: {cartItem.quantity}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <p className="font-bold text-gray-900">
                                {formatPrice((cartItem.course?.price || 0) * cartItem.quantity)}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-center py-4">No courses in cart</p>
                        )}
                      </div>
                    </div>

                    {/* Billing Information */}
                    <div className="mb-8">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                        Billing Information
                      </h2>
                      <div className="bg-gray-50 rounded p-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Name</p>
                            <p className="font-semibold text-gray-900">
                              {deliveryAddress.firstName} {deliveryAddress.secondName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Phone</p>
                            <p className="font-semibold text-gray-900">{deliveryAddress.phoneNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Country</p>
                            <p className="font-semibold text-gray-900">{deliveryAddress.country}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">City</p>
                            <p className="font-semibold text-gray-900">{deliveryAddress.city}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-500 mb-1">Address</p>
                            <p className="font-semibold text-gray-900">
                              {deliveryAddress.streetAddress}, {deliveryAddress.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-8">
                      <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">
                        Payment Method
                      </h2>
                      <div className="bg-gray-50 rounded p-6">
                        <div className="flex items-center space-x-3">
                          {selectedPaymentMethod === "card" && (
                            <>
                              <CreditCard className="w-6 h-6 text-gray-600" />
                              <div>
                                <p className="font-semibold text-sm text-gray-900">Credit/Debit Card</p>
                                <p className="text-xs text-gray-500">
                                  {cardDetails.cardNumber ? `**** **** **** ${cardDetails.cardNumber.slice(-4)}` : "Card ending in ****"}
                                </p>
                              </div>
                            </>
                          )}
                          {selectedPaymentMethod === "paypal" && (
                            <>
                              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white font-bold">P</span>
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-gray-900">PayPal</p>
                                <p className="text-xs text-gray-500">PayPal Account</p>
                              </div>
                            </>
                          )}
                          {selectedPaymentMethod === "mobilemoney" && (
                            <>
                              <Smartphone className="w-6 h-6 text-emerald-600" />
                              <div>
                                <p className="font-semibold text-sm text-gray-900">Mobile Money</p>
                                <p className="text-xs text-gray-500">{mobileMoneyNumber || "MTN Mobile Money"}</p>
                              </div>
                            </>
                          )}
                          {selectedPaymentMethod === "orangemoney" && (
                            <>
                              <Smartphone className="w-6 h-6 text-orange-600" />
                              <div>
                                <p className="font-semibold text-sm text-gray-900">Orange Money</p>
                                <p className="text-xs text-gray-500">{mobileMoneyNumber || "Orange Money Account"}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-6">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                        />
                        <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                          I agree to the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={handlePreviousStep}
                        className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors uppercase"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirmOrder}
                        className="px-8 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700 transition-colors flex items-center space-x-2 uppercase"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm Order</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded shadow-sm p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order summary
                  </h2>
                  {/* Currency Toggle */}
                  <div className="flex items-center bg-gray-100 rounded p-1">
                    <button
                      onClick={() => setCurrency("USD")}
                      className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                        currency === "USD"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      USD
                    </button>
                    <button
                      onClick={() => setCurrency("XAF")}
                      className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                        currency === "XAF"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      XAF
                    </button>
                  </div>
                </div>

                {/* Product Headers */}
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 mb-4 pb-3 border-b border-gray-200 uppercase">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-3 text-center">QTY</div>
                  <div className="col-span-3 text-right">Price</div>
                </div>

                {/* Products */}
                <div className="space-y-4 mb-6">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((cartItem, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-center text-sm">
                        <div className="col-span-6">
                          <div className="flex items-start space-x-3">
                            {cartItem.course?.thumbnail ? (
                              <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={cartItem.course.thumbnail}
                                  alt={cartItem.course?.title || "Course"}
                                  fill
                                  className="object-cover"
                                  onError={(e: any) => {
                                    e.currentTarget.src = '/placeholder-course.jpg';
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-xs leading-tight">
                                {cartItem.course?.title || "Product name"}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {cartItem.course?.level || "All Levels"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-center">
                          <p className="text-gray-900">{cartItem.quantity}</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="font-semibold text-gray-900">
                            {formatPrice((cartItem.course?.price || 0) * cartItem.quantity)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="grid grid-cols-12 gap-2 items-center text-sm">
                        <div className="col-span-6">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-xs">
                                Product name
                              </p>
                              <p className="text-xs text-gray-500">Color: Red</p>
                              <p className="text-xs text-gray-500">Material: Canvas</p>
                              <p className="text-xs text-gray-500">Size: M</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-center">
                          <p className="text-gray-900">1</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(15.99)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-2 items-center text-sm">
                        <div className="col-span-6">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-xs">
                                JavaScript Course
                              </p>
                              <p className="text-xs text-gray-500">Beginner Level</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-center">
                          <p className="text-gray-900">1</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(11.99)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-2 items-center text-sm">
                        <div className="col-span-6">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-xs">
                                Python Course
                              </p>
                              <p className="text-xs text-gray-500">Advanced Level</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 text-center">
                          <p className="text-gray-900">1</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(4.99)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cartItems?.length || 3} courses)
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Exchange Rate Info */}
                {currency === "XAF" && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">Exchange Rate:</span> 1 USD = {exchangeRate} XAF
                    </p>
                  </div>
                )}

  

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Payment methods
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-8 border border-gray-300 rounded flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xs">VISA</span>
                    </div>
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">PayPal</span>
                    </div>
                    <div className="w-12 h-8 border border-gray-300 rounded flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-12 h-8 border border-gray-300 rounded flex items-center justify-center">
                      <div className="flex space-x-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
