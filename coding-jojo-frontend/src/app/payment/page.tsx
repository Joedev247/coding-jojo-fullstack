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
        <div className="min-h-screen  mt-20 text-white font-['Montserrat',sans-serif] relative">
          {/* <AnimatedBackground /> */}

          {/* <Breadcrumb items={breadcrumbItems} /> */}

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Payment Method Selection and Form */}
              <div className="flex-grow order-2 lg:order-1">
                <div className="  bg-gray-900/60 backdrop-blur-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-6">
                      Payment Method
                    </h2>

                    {/* Payment Method Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-4   ${
                          paymentMethod === "credit-card"
                            ? " bg-pink-500/10"
                            : "  bg-gray-900/60 hover:bg-gray-800"
                        } transition-colors`}
                        onClick={() => handlePaymentMethodChange("credit-card")}
                      >
                        <CreditCard
                          className={`h-6 w-6 mb-2 ${
                            paymentMethod === "credit-card"
                              ? "text-pink-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            paymentMethod === "credit-card"
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          Credit Card
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-4 ${
                          paymentMethod === "paypal"
                            ? " bg-pink-500/10"
                            : "  bg-gray-900/60 hover:bg-gray-800"
                        } transition-colors`}
                        onClick={() => handlePaymentMethodChange("paypal")}
                      >
                        <div
                          className={`h-6 w-6 mb-2 flex items-center justify-center ${
                            paymentMethod === "paypal"
                              ? "text-pink-500"
                              : "text-gray-400"
                          }`}
                        >
                          <Image
                            src="/paypal-logo.png"
                            alt="PayPal"
                            width={24}
                            height={24}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            paymentMethod === "paypal"
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          PayPal
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`flex flex-col items-center justify-center p-4 ${
                          paymentMethod === "apple-pay"
                            ? " bg-pink-500/10"
                            : "  bg-gray-900/60 hover:bg-gray-800"
                        } transition-colors`}
                        onClick={() => handlePaymentMethodChange("apple-pay")}
                      >
                        <div
                          className={`h-6 w-6 mb-2 flex items-center justify-center ${
                            paymentMethod === "apple-pay"
                              ? "text-pink-500"
                              : "text-gray-400"
                          }`}
                        >
                          <Image
                            src="/apple-pay-logo.png"
                            alt="Apple Pay"
                            width={24}
                            height={24}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            paymentMethod === "apple-pay"
                              ? "text-white"
                              : "text-gray-300"
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
                        <div className="mb-4">
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-300 mb-1"
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
                              className="w-full h-12 pl-4 pr-10 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                              <Image
                                src="/visa-logo.png"
                                alt="Visa"
                                width={24}
                                height={16}
                              />
                              <Image
                                src="/mastercard-logo.png"
                                alt="Mastercard"
                                width={24}
                                height={16}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="mb-4">
                          <label
                            htmlFor="cardName"
                            className="block text-sm font-medium text-gray-300 mb-1"
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
                            className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                          />
                        </div>

                        {/* Expiry Date and CVV - 2 columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label
                              htmlFor="expiryDate"
                              className="block text-sm font-medium text-gray-300 mb-1"
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
                              className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-300 mb-1"
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
                              className="w-full h-12 px-4  backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                            />
                          </div>
                        </div>

                        {/* Save Card Checkbox */}
                        <div className="mb-6">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="saveCard"
                              name="saveCard"
                              checked={paymentDetails.saveCard}
                              onChange={handleInputChange}
                              className="h-4 w-4  bg-gray-900  focus:ring-pink-500 text-pink-500 rounded"
                            />
                            <label
                              htmlFor="saveCard"
                              className="ml-2 text-sm text-gray-400"
                            >
                              Save this card for future purchases
                            </label>
                          </div>
                        </div>

                        {/* Payment Button */}
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium px-6 py-4 shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center justify-center"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          <span>Pay ${orderSummary.total.toFixed(2)}</span>
                        </button>
                      </form>
                    )}

                    {/* PayPal Payment Option */}
                    {paymentMethod === "paypal" && (
                      <div className="text-center p-6">
                        <div className="mb-6">
                          <Image
                            src="/paypal-button.png"
                            alt="PayPal Checkout"
                            width={320}
                            height={50}
                            className="mx-auto"
                          />
                        </div>
                        <p className="text-gray-400 text-sm">
                          You will be redirected to PayPal to complete your
                          payment.
                        </p>
                      </div>
                    )}

                    {/* Apple Pay Payment Option */}
                    {paymentMethod === "apple-pay" && (
                      <div className="text-center p-6">
                        <div className="mb-6">
                          <div className="bg-black border  p-3 w-64 mx-auto">
                            <Image
                              src="/apple-pay-button.png"
                              alt="Apple Pay"
                              width={240}
                              height={40}
                              className="mx-auto"
                            />
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Pay securely with Apple Pay. Your device will prompt
                          you to confirm the payment.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Information */}
                <div className="  bg-gray-900/60 backdrop-blur-sm overflow-hidden p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-800/80 rounded-full p-3 flex-shrink-0">
                      <ShieldCheck className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Secure Payment Processing
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        Your payment information is encrypted and securely
                        processed. We do not store your full credit card
                        details.
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <Image
                          src="/visa-logo.png"
                          alt="Visa"
                          width={40}
                          height={25}
                        />
                        <Image
                          src="/mastercard-logo.png"
                          alt="Mastercard"
                          width={40}
                          height={25}
                        />
                        <Image
                          src="/amex-logo.png"
                          alt="American Express"
                          width={40}
                          height={25}
                        />
                        <Image
                          src="/paypal-logo.png"
                          alt="PayPal"
                          width={40}
                          height={25}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-96 flex-shrink-0 order-1 lg:order-2">
                <div className="  bg-gray-900/60 backdrop-blur-sm overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span>
                          $
                          {(orderSummary.total + orderSummary.discount).toFixed(
                            2
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-500">
                        <span>Discount</span>
                        <span>-${orderSummary.discount.toFixed(2)}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-800">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${orderSummary.total.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          <span>
                            {orderSummary.itemCount} courses • Lifetime access
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Benefits */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">
                          30-day money-back guarantee
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">
                          Full lifetime access to all course materials
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">
                          Access on mobile, desktop and TV
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">
                          Certificate of completion
                        </span>
                      </div>
                    </div>

                    {/* Need Help Section */}
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-sm">Need help?</h3>
                          <p className="text-xs text-gray-400 mt-1">
                            If you have any questions about your payment or
                            order, please contact our support team at{" "}
                            <a
                              href="mailto:support@codingjojo.com"
                              className="text-pink-500 hover:underline"
                            >
                              support@codingjojo.com
                            </a>
                          </p>
                        </div>
                      </div>{" "}
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
