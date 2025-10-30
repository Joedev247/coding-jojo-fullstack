"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Check,
  CreditCard,
  Smartphone,
  Lock,
  Crown,
  Users,
  Diamond,
  Rocket,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Star,
  Zap,
  Award,
} from "lucide-react";
import Link from "next/link";
import PaymentForm from "../../components/subscription/PaymentForm";
import PlanSummary from "../../components/subscription/PlanSummary";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useToast } from "../../hooks/useToast";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../components/auth/ProtectedRoute";

// Plan data matching pricing-plans.tsx
const planData = {
  personal: {
    title: "Personal Plan",
    forText: "For you",
    userCount: "Individual",
    icon: <Rocket className="w-6 h-6 text-pink-500" />,
    features: [
      "Access to 12,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Mobile and TV apps",
      "Offline viewing on mobile",
    ],
  },
  team: {
    title: "Team Plan",
    forText: "For your team",
    userCount: "2 to 20 people",
    icon: <Users className="w-6 h-6 text-orange-500" />,
    popular: true,
    features: [
      "Access to 12,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Analytics and adoption reports",
      "Team learning insights",
      "SSO integration (for 10+ users)",
      "Slack integration",
    ],
  },
  enterprise: {
    title: "Enterprise Plan",
    forText: "For your whole organization",
    userCount: "More than 20 people",
    icon: <Diamond className="w-6 h-6 text-pink-500" />,
    features: [
      "Access to 27,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and insights",
      "Dedicated customer success team",
      "International course collection featuring 15 languages",
      "Customizable content",
      "Hands-on tech training with add-on",
      "Strategic implementation services with add-on",
    ],
  },
};

function SubscriptionPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { upgradeToPremium } = useAuth();
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const planType = searchParams.get("plan") || "personal";
  const billing = searchParams.get("billing") || "annual";
  const isAnnual = billing === "annual";

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedPlan = planData[planType as keyof typeof planData];

  // Calculate pricing
  const getPricing = () => {
    switch (planType) {
      case "personal":
        return {
          price: isAnnual ? 8.0 : 10.0,
          originalPrice: isAnnual ? 10.0 : null,
          period: "per month",
          billingInfo: isAnnual
            ? "Billed annually. Save 20%"
            : "Billed monthly. Cancel anytime.",
          totalPrice: isAnnual ? 96.0 : 10.0,
          billingPeriod: isAnnual ? "year" : "month",
        };
      case "team":
        return {
          price: isAnnual ? 24.0 : 30.0,
          originalPrice: isAnnual ? 30.0 : null,
          period: "per user/month",
          billingInfo: isAnnual
            ? "Billed annually. Save 20%"
            : "Billed monthly. Cancel anytime.",
          totalPrice: isAnnual ? 288.0 : 30.0,
          billingPeriod: isAnnual ? "year" : "month",
        };
      case "enterprise":
        return {
          price: "Contact sales",
          period: "",
          billingInfo: "Custom pricing based on your needs",
          totalPrice: 0,
          billingPeriod: "custom",
        };
      default:
        return {
          price: isAnnual ? 8.0 : 10.0,
          originalPrice: isAnnual ? 10.0 : null,
          period: "per month",
          billingInfo: isAnnual
            ? "Billed annually. Save 20%"
            : "Billed monthly. Cancel anytime.",
          totalPrice: isAnnual ? 96.0 : 10.0,
          billingPeriod: isAnnual ? "year" : "month",
        };
    }
  };

  const pricing = getPricing();
  const handlePayment = async (paymentData: any) => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would integrate with actual payment processors
      // For MTN Mobile Money: integrate with MTN MoMo API
      // For card payments: integrate with Stripe, PayPal, etc.
      // Upgrade user to premium after successful payment
      await upgradeToPremium();

      setPaymentSuccess(true);
      toast.success("Payment successful! Welcome to premium! Redirecting...");

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push("/dashboard?upgrade=success");
      }, 3000);
    } catch (error) {
      toast.error(
        "Payment failed. Please check your payment details and try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <CheckCircle2 className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 text-sm">
              Welcome to {selectedPlan?.title}! You'll be redirected to your
              dashboard shortly.
            </p>
          </div>
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
          <div className="relative z-10 container mx-auto px-4 py-6 max-w-[1200px]">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-7 h-7 bg-white group-hover:bg-blue-50 border border-blue-200 group-hover:border-blue-300  transition-all duration-200 shadow-sm">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-all duration-200" />
                </div>
                <span className="text-sm font-medium group-hover:underline underline-offset-4">
                  Back to pricing
                </span>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur-md opacity-30"></div>
                    <div className="relative p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full border-2 border-blue-200 shadow-lg">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <Diamond className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 relative">
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 text-transparent bg-clip-text">
                    Upgrade to Premium
                  </span>
                  <div className="absolute -top-1 -right-6 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <Zap className="w-3 h-3 text-blue-600" />
                  </div>
                </h1>

                <p className="text-gray-600 text-sm flex items-center justify-center gap-2 mb-3">
                  <Lock className="w-3 h-3 text-blue-500" />
                  Complete your subscription to unlock premium features
                  <Rocket className="w-3 h-3 text-blue-600" />
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-600">Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-500">Trusted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-yellow-500">Premium</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Plan Summary - Left Column */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <PlanSummary
                      plan={selectedPlan!}
                      pricing={pricing}
                      isAnnual={isAnnual}
                    />
                  </div>
                </div>

                {/* Payment Section - Right Column */}
                <div className="flex justify-center">
                  <div className="w-full max-w-lg">
                    <div className="bg-white/95 backdrop-blur-sm border border-blue-200  shadow-lg p-4 md:p-6">
                      {/* Payment Method Selection */}
                      <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-600" />
                          Choose Payment Method
                        </h2>

                        <div className="grid grid-cols-1 gap-3">
                          {/* Card Payment */}
                          <button
                            onClick={() => setPaymentMethod("card")}
                            className={`p-3 border-2  transition-all duration-200 flex items-center gap-3 ${
                              paymentMethod === "card"
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                          >
                            <CreditCard
                              className={`w-5 h-5 ${
                                paymentMethod === "card"
                                  ? "text-blue-600"
                                  : "text-gray-600"
                              }`}
                            />
                            <div className="text-left flex-1">
                              <div
                                className={`font-medium text-sm ${
                                  paymentMethod === "card"
                                    ? "text-gray-800"
                                    : "text-gray-700"
                                }`}
                              >
                                Credit/Debit Card
                              </div>
                              <div className="text-xs text-gray-600">
                                Visa, Mastercard, American Express
                              </div>
                            </div>
                            {paymentMethod === "card" && (
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            )}
                          </button>

                          {/* Mobile Money */}
                          <button
                            onClick={() => setPaymentMethod("momo")}
                            className={`p-3 border-2  transition-all duration-200 flex items-center gap-3 ${
                              paymentMethod === "momo"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
                            }`}
                          >
                            <Smartphone
                              className={`w-5 h-5 ${
                                paymentMethod === "momo"
                                  ? "text-yellow-600"
                                  : "text-gray-600"
                              }`}
                            />
                            <div className="text-left flex-1">
                              <div
                                className={`font-medium text-sm ${
                                  paymentMethod === "momo"
                                    ? "text-gray-800"
                                    : "text-gray-700"
                                }`}
                              >
                                MTN Mobile Money
                              </div>
                              <div className="text-xs text-gray-600">
                                Pay with your MTN MoMo account
                              </div>
                            </div>
                            {paymentMethod === "momo" && (
                              <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Payment Form */}
                      <div className="flex justify-center">
                        <PaymentForm
                          paymentMethod={paymentMethod}
                          pricing={pricing}
                          onPayment={handlePayment}
                          isProcessing={isProcessing}
                          planType={planType}
                        />
                      </div>

                      {/* Security Notice */}
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200  flex items-start gap-3">
                        <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-blue-700 mb-1">
                            Secure Payment
                          </div>
                          <div className="text-xs text-gray-600">
                            Your payment information is encrypted and secure. We
                            never store your payment details.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}

export default function SubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
          <LoadingSpinner size="xl" />
        </div>
      }
    >
      <SubscriptionPageContent />
    </Suspense>
  );
}
