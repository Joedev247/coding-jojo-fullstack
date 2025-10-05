"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  User,
  Star,
  Trophy,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

// Define proper types
interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  isDefault: boolean;
}

interface SubscriptionData {
  id: string;
  plan: string;
  status: "active" | "cancelled" | "past_due";
  price: number;
  billing_cycle: "monthly" | "yearly";
  next_billing_date: string;
  features: string[];
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "failed";
  invoice_url?: string;
}

// Real user-based data generators
const getUserPaymentMethods = (user: any): PaymentMethod[] => {
  if (!user) return [];

  // If user has premium, they likely have at least one payment method
  if (user.isPremium) {
    return [
      {
        id: "1",
        type: "card",
        last4: "4242",
        brand: "Visa",
        expiryMonth: 12,
        expiryYear: 2027,
        isDefault: true,
      },
    ];
  }

  // Free users don't have payment methods
  return [];
};

const getUserTransactions = (user: any): Transaction[] => {
  if (!user) return [];

  const transactions: Transaction[] = [];

  // If user is premium, generate some subscription transactions
  if (user.isPremium) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Generate last 3 months of subscription payments
    for (let i = 0; i < 3; i++) {
      const transactionDate = new Date(currentYear, currentMonth - i, 21);
      transactions.push({
        id: `sub_${i + 1}`,
        description: "Premium Plan - Monthly Subscription",
        amount: 10.0,
        date: transactionDate.toISOString().split("T")[0],
        status: "paid",
        invoice_url: "#",
      });
    }
  }

  return transactions;
};

const getUserBillingStats = (user: any) => {
  if (!user) {
    return {
      totalSpent: 0,
      daysUntilNextBill: 0,
      activePaymentMethods: 0,
    };
  }

  const transactions = getUserTransactions(user);
  const totalSpent = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const paymentMethods = getUserPaymentMethods(user);

  // Calculate days until next bill
  let daysUntilNextBill = 0;
  if (user.isPremium) {
    const nextBilling = new Date();
    nextBilling.setDate(nextBilling.getDate() + 30); // 30 days from now
    const today = new Date();
    const timeDiff = nextBilling.getTime() - today.getTime();
    daysUntilNextBill = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  return {
    totalSpent,
    daysUntilNextBill,
    activePaymentMethods: paymentMethods.length,
  };
};

const Billing: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "payment-methods" | "transactions"
  >("overview");

  // Derive subscription data from user
  const getUserSubscription = (): SubscriptionData => {
    if (!user) {
      return {
        id: "free_plan",
        plan: "Free",
        status: "active",
        price: 0,
        billing_cycle: "monthly",
        next_billing_date: "",
        features: [
          "Limited course access",
          "Basic learning materials",
          "Community forum access",
        ],
      };
    }

    // Check if user is premium
    if (user.isPremium) {
      return {
        id: "premium_plan",
        plan: "Premium",
        status: "active",
        price: 10.0,
        billing_cycle: "monthly",
        next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 30 days from now
        features: [
          "Access to all courses",
          "Premium learning materials",
          "Priority support",
          "Downloadable resources",
          "Certificate of completion",
          "Live sessions with instructors",
        ],
      };
    } else {
      return {
        id: "free_plan",
        plan: "Free",
        status: "active",
        price: 0,
        billing_cycle: "monthly",
        next_billing_date: "",
        features: [
          "Limited course access",
          "Basic learning materials",
          "Community forum access",
        ],
      };
    }
  };

  const subscription = getUserSubscription();
  const paymentMethods = getUserPaymentMethods(user);
  const transactions = getUserTransactions(user);
  const billingStats = getUserBillingStats(user);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "paid":
        return "text-green-400 bg-green-400/10";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      case "cancelled":
      case "failed":
        return "text-red-400 bg-red-400/10";
      case "past_due":
        return "text-orange-400 bg-orange-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const getCardIcon = (brand: string) => {
    // In a real app, you'd use actual card brand icons
    return <CreditCard className="h-6 w-6" />;
  };

  return (
    <>
      <div className="space-y-12 p-8">
        {/* User Welcome Section */}
        <div className="relative mb-8 p-8   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-orange-500/5"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                {user?.profilePicture &&
                typeof user.profilePicture === "string" &&
                user.profilePicture.trim() !== "" ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name || "User"}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl border-2 border-gray-700">
                    {(user?.name || user?.email || "User")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                )}
                {user?.isPremium && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Hello,{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    {(user?.name || user?.email || "User").split(" ")[0]}
                  </span>
                  ! 💳
                </h2>
                <p className="text-gray-400">
                  Manage your subscription and billing preferences
                </p>
                {user?.isPremium && (
                  <div className="mt-2 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">
                      Premium Member
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Subscription Overview */}
        <div className="  bg-gray-900/80 backdrop-blur-sm p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Current Plan: {subscription.plan}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                {" "}
                <span
                  className={`px-3 py-1 text-sm font-medium ${getStatusColor(
                    subscription.status
                  )}`}
                >
                  {subscription.status.toUpperCase()}
                </span>
                {subscription.next_billing_date && (
                  <span className="text-gray-400 text-sm">
                    Next billing:{" "}
                    {new Date(
                      subscription.next_billing_date
                    ).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-white">
                ${subscription.price}
                <span className="text-lg text-gray-400 font-normal">
                  /{subscription.billing_cycle}
                </span>
              </p>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium transition-colors">
                Change Plan
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>{" "}
        {/* Billing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  p-6 text-center hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>{" "}
            <h4 className="text-gray-400 text-sm font-medium mb-2">
              Total Spent
            </h4>
            <p className="text-3xl font-bold text-green-400">
              ${billingStats.totalSpent.toFixed(2)}
            </p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  p-6 text-center hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>{" "}
            <h4 className="text-gray-400 text-sm font-medium mb-2">
              Days Until Next Bill
            </h4>
            <p className="text-3xl font-bold text-blue-400">
              {billingStats.daysUntilNextBill}
            </p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  p-6 text-center hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-purple-400" />
            </div>{" "}
            <h4 className="text-gray-400 text-sm font-medium mb-2">
              Active Payment Methods
            </h4>
            <p className="text-3xl font-bold text-purple-400">
              {billingStats.activePaymentMethods}
            </p>
          </div>
        </div>
        {/* Tabs */}
        <div className="  bg-gray-900/80 backdrop-blur-sm">
          <div className="flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-8 py-4 text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-pink-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              Plan Details
            </button>
            <button
              onClick={() => setActiveTab("payment-methods")}
              className={`px-8 py-4 text-sm font-medium transition-colors ${
                activeTab === "payment-methods"
                  ? "bg-pink-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-8 py-4 text-sm font-medium transition-colors ${
                activeTab === "transactions"
                  ? "bg-pink-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              Transaction History
            </button>
          </div>
        </div>
        {/* Plan Details Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="  bg-gray-900/80 backdrop-blur-sm p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Plan Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="  bg-gray-900/80 backdrop-blur-sm p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Billing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Current Period
                  </h4>
                  <p className="text-white">May 21, 2025 - June 21, 2025</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Next Billing Date
                  </h4>
                  <p className="text-white">
                    {new Date(
                      subscription.next_billing_date
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Amount
                  </h4>
                  <p className="text-white">${subscription.price}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Billing Cycle
                  </h4>
                  <p className="text-white capitalize">
                    {subscription.billing_cycle}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-red-400 mt-1" />
                <div>
                  <h4 className="text-red-400 font-medium mb-2">
                    Cancel Subscription
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    You can cancel your subscription at any time. You'll
                    continue to have access until the end of your current
                    billing period.
                  </p>
                  <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Payment Methods Tab */}
        {activeTab === "payment-methods" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Payment Methods</h3>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300">
                <Plus className="h-4 w-4" />
                Add Payment Method
              </button>
            </div>{" "}
            <div className="space-y-6">
              {paymentMethods.length === 0 ? (
                <div className="  bg-gray-900/80 backdrop-blur-sm p-8 text-center">
                  <CreditCard className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h4 className="text-white font-medium mb-2">
                    No Payment Methods
                  </h4>
                  <p className="text-gray-400 text-sm mb-6">
                    {user?.isPremium
                      ? "Add a payment method to manage your subscription payments."
                      : "Upgrade to Premium to add payment methods and access premium features."}
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-Pink-600 to-orange-600 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300">
                    {user?.isPremium
                      ? "Add Payment Method"
                      : "Upgrade to Premium"}
                  </button>
                </div>
              ) : (
                paymentMethods.map((method: PaymentMethod) => (
                  <div
                    key={method.id}
                    className="  bg-gray-900/80 backdrop-blur-sm p-8 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-3 bg-gray-700">
                        {method.type === "card" ? (
                          getCardIcon(method.brand || "")
                        ) : (
                          <div className="h-6 w-6 bg-pink-600 text-white text-xs flex items-center justify-center font-bold">
                            PP
                          </div>
                        )}
                      </div>

                      <div>
                        {method.type === "card" ? (
                          <>
                            <h4 className="text-white font-medium">
                              {method.brand} ending in {method.last4}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </>
                        ) : (
                          <>
                            <h4 className="text-white font-medium">PayPal</h4>
                            <p className="text-gray-400 text-sm">
                              {method.email}
                            </p>
                          </>
                        )}
                        {method.isDefault && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs">
                            Default
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white">
              Transaction History
            </h3>{" "}
            <div className="  bg-gray-900/80 backdrop-blur-sm">
              {transactions.length === 0 ? (
                <div className="p-8 text-center">
                  <DollarSign className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h4 className="text-white font-medium mb-2">
                    No Transactions
                  </h4>
                  <p className="text-gray-400 text-sm mb-6">
                    {user?.isPremium
                      ? "Your transaction history will appear here."
                      : "Upgrade to Premium to start making transactions and access premium features."}
                  </p>
                  {!user?.isPremium && (
                    <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300">
                      Upgrade to Premium
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-0">
                  {transactions.map(
                    (transaction: Transaction, index: number) => (
                      <div
                        key={transaction.id}
                        className={`p-8 flex items-center justify-between ${
                          index !== transactions.length - 1
                            ? "border-b border-gray-700"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div className="p-3 bg-gray-700">
                            <DollarSign className="h-6 w-6 text-green-400" />
                          </div>

                          <div>
                            <h4 className="text-white font-medium">
                              {transaction.description}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <span
                            className={`px-3 py-1 text-sm font-medium ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {transaction.status.toUpperCase()}
                          </span>

                          <span className="text-white font-bold">
                            ${transaction.amount.toFixed(2)}
                          </span>

                          {transaction.invoice_url && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm font-medium transition-colors">
                              <Download className="h-4 w-4" />
                              Invoice
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Billing;
