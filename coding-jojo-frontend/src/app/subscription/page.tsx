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
import PaymentForm from "@/components/subscription/PaymentForm";
import PlanSummary from "@/components/subscription/PlanSummary";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "../../hooks/useToast";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="xl"  />
      </div>
    );
  }
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-300">
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
        <div className="min-h-screen relative overflow-hidden">
          <div className="relative z-10 container mx-auto px-4 py-8 max-w-[1400px]">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-8 h-8  bg-gray-900/60 group-hover:bg-purple-500/20 border border-gray-700/50 group-hover:border-purple-500/40 rounded-full transition-all duration-300 group-hover:scale-110">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-all duration-300" />
                </div>
                <span className="text-sm font-medium group-hover:underline underline-offset-4">
                  Back to pricing
                </span>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                      <div className="relative p-3 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-full border-2 border-white/20 shadow-2xl">
                        <Crown className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
                      <Diamond className="w-5 h-5 text-purple-400 animate-pulse" />
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 relative">
                    <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 text-transparent bg-clip-text">
                      Upgrade to Premium
                    </span>
                    <div className="absolute -top-2 -right-8 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 animate-spin" />
                      <Zap className="w-5 h-5 text-purple-400 animate-bounce" />
                    </div>
                  </h1>

                  <p className="text-gray-300 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4 text-green-400" />
                    Complete your subscription to unlock premium features
                    <Rocket className="w-4 h-4 text-pink-400" />
                  </p>

                  <div className="flex items-center justify-center gap-4 mt-4 opacity-60">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-400">Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">Trusted</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-yellow-400">Premium</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
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
                    <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-800 shadow-xl p-6 md:p-8">
                      {/* Payment Method Selection */}
                      <div className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-pink-500" />
                          Choose Payment Method
                        </h2>

                        <div className="grid grid-cols-1 gap-3">
                          {/* Card Payment */}
                          <button
                            onClick={() => setPaymentMethod("card")}
                            className={`p-4 border-2 transition-all duration-300 flex items-center gap-3 ${
                              paymentMethod === "card"
                                ? "border-pink-500 bg-pink-500/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <CreditCard
                              className={`w-6 h-6 ${
                                paymentMethod === "card"
                                  ? "text-pink-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <div className="text-left flex-1">
                              <div
                                className={`font-medium ${
                                  paymentMethod === "card"
                                    ? "text-white"
                                    : "text-gray-300"
                                }`}
                              >
                                Credit/Debit Card
                              </div>
                              <div className="text-sm text-gray-400">
                                Visa, Mastercard, American Express
                              </div>
                            </div>
                            {paymentMethod === "card" && (
                              <CheckCircle2 className="w-5 h-5 text-pink-500" />
                            )}
                          </button>

                          {/* Mobile Money */}
                          <button
                            onClick={() => setPaymentMethod("momo")}
                            className={`p-4 border-2 transition-all duration-300 flex items-center gap-3 ${
                              paymentMethod === "momo"
                                ? "border-yellow-500 bg-yellow-500/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <Smartphone
                              className={`w-6 h-6 ${
                                paymentMethod === "momo"
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <div className="text-left flex-1">
                              <div
                                className={`font-medium ${
                                  paymentMethod === "momo"
                                    ? "text-white"
                                    : "text-gray-300"
                                }`}
                              >
                                MTN Mobile Money
                              </div>
                              <div className="text-sm text-gray-400">
                                Pay with your MTN MoMo account
                              </div>
                            </div>
                            {paymentMethod === "momo" && (
                              <CheckCircle2 className="w-5 h-5 text-yellow-500" />
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
                      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                        <Lock className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-green-400 mb-1">
                            Secure Payment
                          </div>
                          <div className="text-xs text-gray-300">
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
        <div className="min-h-screen bg-black flex items-center justify-center">
          <LoadingSpinner size="xl"  />
        </div>
      }
    >
      <SubscriptionPageContent />
    </Suspense>
  );
}
