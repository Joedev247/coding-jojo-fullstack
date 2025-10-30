"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  CreditCard,
  CheckCircle,
  Lock,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
// import AnimatedBackground from '@/components/ui/AnimatedBackground';
// import Breadcrumb from '@/components/ui/Breadcrumb';
import { useToast } from "../../hooks/useToast";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
export default function PaymentPage() {
  const toast = useToast();

  // Payment details stateymentPage() {
  // Payment details state
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // Order summary data (would typically come from checkout state)
  const orderSummary = {
    total: 27.98,
    itemCount: 2,
    discount: 9.33,
  };

  // Handle payment form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "cardNumber") {
      // Format card number with spaces
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else if (name === "expiryDate") {
      // Format expiry date as MM/YY
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  // Handle payment method selection
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (paymentMethod === "credit-card") {
      if (
        !paymentDetails.cardNumber ||
        !paymentDetails.cardName ||
        !paymentDetails.expiryDate ||
        !paymentDetails.cvv
      ) {
        toast.error("Please fill in all required fields", {
          description:
            "All credit card fields are required to process your payment.",
        });
        return;
      }
    }

    // Simulate successful payment
    setTimeout(() => {
      // Redirect to success page
      window.location.href = "/order-success";
    }, 1500);
  };

  const breadcrumbItems = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
    { label: "Payment", active: true },
  ];
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <div className="min-h-screen mt-16 bg-white text-gray-900 font-['Montserrat',sans-serif] relative">
          {/* <AnimatedBackground /> */}

          {/* <Breadcrumb items={breadcrumbItems} /> */}

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Payment Method Selection and Form */}
              <div className="flex-grow order-2 lg:order-1">
                <div className="bg-white  border border-blue-100 shadow-sm overflow-hidden mb-4">
                  <div className="p-4">
                    <h2 className="text-xs font-semibold mb-4 text-gray-900">
                      Payment Method
                    </h2>

                    {/* Payment Method Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-3  border transition-colors ${
                          paymentMethod === "credit-card"
                            ? "bg-blue-50 border-blue-200 shadow-sm"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => handlePaymentMethodChange("credit-card")}
                      >
                        <CreditCard
                          className={`h-5 w-5 mb-1.5 ${
                            paymentMethod === "credit-card"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            paymentMethod === "credit-card"
                              ? "text-blue-700"
                              : "text-gray-600"
                          }`}
                        >
                          Credit Card
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-3  border transition-colors ${
                          paymentMethod === "paypal"
                            ? "bg-blue-50 border-blue-200 shadow-sm"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => handlePaymentMethodChange("paypal")}
                      >
                        <div
                          className={`h-5 w-5 mb-1.5 flex items-center justify-center ${
                            paymentMethod === "paypal"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          <Image
                            src="/paypal-logo.png"
                            alt="PayPal"
                            width={20}
                            height={20}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            paymentMethod === "paypal"
                              ? "text-blue-700"
                              : "text-gray-600"
                          }`}
                        >
                          PayPal
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-3  border transition-colors ${
                          paymentMethod === "apple-pay"
                            ? "bg-blue-50 border-blue-200 shadow-sm"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => handlePaymentMethodChange("apple-pay")}
                      >
                        <div
                          className={`h-5 w-5 mb-1.5 flex items-center justify-center ${
                            paymentMethod === "apple-pay"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          <Image
                            src="/apple-pay-logo.png"
                            alt="Apple Pay"
                            width={20}
                            height={20}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            paymentMethod === "apple-pay"
                              ? "text-blue-700"
                              : "text-gray-600"
                          }`}
                        >
                          Apple Pay
                        </span>
                      </button>
                    </div>

                    {/* Credit Card Form */}
                    {paymentMethod === "credit-card" && (
                      <form onSubmit={handleSubmit}>
                        {/* Card Number */}
                        <div className="mb-3">
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentDetails.cardNumber}
                              onChange={handleInputChange}
                              maxLength={19}
                              placeholder="1234 5678 9012 3456"
                              className="w-full h-10 pl-3 pr-16 border border-gray-300  bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm outline-none transition-all duration-300 placeholder-gray-500"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                              <Image
                                src="/visa-logo.png"
                                alt="Visa"
                                width={20}
                                height={12}
                              />
                              <Image
                                src="/mastercard-logo.png"
                                alt="Mastercard"
                                width={20}
                                height={12}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="mb-3">
                          <label
                            htmlFor="cardName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Cardholder Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={paymentDetails.cardName}
                            onChange={handleInputChange}
                            placeholder="John Smith"
                            className="w-full h-10 px-3 border border-gray-300  bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm outline-none transition-all duration-300 placeholder-gray-500"
                          />
                        </div>

                        {/* Expiry Date and CVV - 2 columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <div>
                            <label
                              htmlFor="expiryDate"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Expiry Date{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={paymentDetails.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full h-10 px-3 border border-gray-300  bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm outline-none transition-all duration-300 placeholder-gray-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={paymentDetails.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              maxLength={4}
                              className="w-full h-10 px-3 border border-gray-300  bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm outline-none transition-all duration-300 placeholder-gray-500"
                            />
                          </div>
                        </div>

                        {/* Save Card Checkbox */}
                        <div className="mb-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="saveCard"
                              name="saveCard"
                              checked={paymentDetails.saveCard}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label
                              htmlFor="saveCard"
                              className="ml-2 text-sm text-gray-600"
                            >
                              Save this card for future purchases
                            </label>
                          </div>
                        </div>

                        {/* Payment Button */}
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-3  shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          <span>Pay ${orderSummary.total.toFixed(2)}</span>
                        </button>
                      </form>
                    )}

                    {/* PayPal Payment Option */}
                    {paymentMethod === "paypal" && (
                      <div className="text-center p-4">
                        <div className="mb-4">
                          <Image
                            src="/paypal-button.png"
                            alt="PayPal Checkout"
                            width={280}
                            height={42}
                            className="mx-auto"
                          />
                        </div>
                        <p className="text-gray-600 text-sm">
                          You will be redirected to PayPal to complete your
                          payment.
                        </p>
                      </div>
                    )}

                    {/* Apple Pay Payment Option */}
                    {paymentMethod === "apple-pay" && (
                      <div className="text-center p-4">
                        <div className="mb-4">
                          <div className="bg-black  border border-gray-300 p-2 w-56 mx-auto">
                            <Image
                              src="/apple-pay-button.png"
                              alt="Apple Pay"
                              width={200}
                              height={32}
                              className="mx-auto"
                            />
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Pay securely with Apple Pay. Your device will prompt
                          you to confirm the payment.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Information */}
                <div className="bg-white  border border-blue-100 shadow-sm overflow-hidden p-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900 text-sm">
                        Secure Payment Processing
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Your payment information is encrypted and securely
                        processed. We do not store your full credit card
                        details.
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <Image
                          src="/visa-logo.png"
                          alt="Visa"
                          width={32}
                          height={20}
                        />
                        <Image
                          src="/mastercard-logo.png"
                          alt="Mastercard"
                          width={32}
                          height={20}
                        />
                        <Image
                          src="/amex-logo.png"
                          alt="American Express"
                          width={32}
                          height={20}
                        />
                        <Image
                          src="/paypal-logo.png"
                          alt="PayPal"
                          width={32}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-80 flex-shrink-0 order-1 lg:order-2">
                <div className="bg-white  border border-blue-100 shadow-sm overflow-hidden sticky top-20">
                  <div className="p-4">
                    <h2 className="text-xs font-semibold mb-3 text-gray-900">
                      Order Summary
                    </h2>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">
                          $
                          {(orderSummary.total + orderSummary.discount).toFixed(
                            2
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-blue-600">
                        <span>Discount</span>
                        <span>-${orderSummary.discount.toFixed(2)}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between font-semibold text-xs">
                          <span className="text-gray-900">Total</span>
                          <span className="text-gray-900">${orderSummary.total.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          <span>
                            {orderSummary.itemCount} courses • Lifetime access
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Benefits */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          30-day money-back guarantee
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          Full lifetime access to all course materials
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          Access on mobile, desktop and TV
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          Certificate of completion
                        </span>
                      </div>
                    </div>

                    {/* Need Help Section */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-sm text-gray-900">Need help?</h3>
                          <p className="text-xs text-gray-600 mt-1">
                            If you have any questions about your payment or
                            order, please contact our support team at{" "}
                            <a
                              href="mailto:support@codingjojo.com"
                              className="text-blue-600 hover:underline"
                            >
                              support@codingjojo.com
                            </a>
                          </p>
                        </div>
                      </div>
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
