import React from "react";
import {
  Crown,
  Calendar,
  CreditCard,
  ArrowUpCircle,
  Check,
  X,
} from "lucide-react";
import { Subscription } from "@/types/dashboard";

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "premium":
        return "from-pink-500 to-orange-500";
      case "pro":
        return "from-purple-500 to-blue-500";
      case "team":
        return "from-blue-500 to-teal-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "premium":
      case "pro":
      case "team":
        return <Crown className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-blue-400 bg-blue-400/10";
      case "expired":
      case "canceled":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  p-6 hover:border-pink-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2  bg-gradient-to-r ${getPlanColor(
              subscription.plan
            )}`}
          >
            {getPlanIcon(subscription.plan)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white capitalize">
              {subscription.plan} Plan
            </h3>
            <p className="text-sm text-gray-400">
              {subscription.billingCycle === "monthly" ? "Monthly" : "Annual"}{" "}
              Subscription
            </p>
          </div>
        </div>

        <div className="text-right">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              subscription.status
            )}`}
          >
            {subscription.status.charAt(0).toUpperCase() +
              subscription.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Subscription Details */}
      <div className="space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Price</span>
          <span className="text-white font-semibold">
            {subscription.price === 0
              ? "Free"
              : `$${subscription.price}/${
                  subscription.billingCycle === "monthly" ? "month" : "year"
                }`}
          </span>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-gray-400">Started</p>
              <p className="text-white">{formatDate(subscription.startDate)}</p>
            </div>
          </div>

          {subscription.endDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-gray-400">
                  {subscription.status === "active" ? "Renews" : "Expires"}
                </p>
                <p className="text-white">{formatDate(subscription.endDate)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">
            Plan Features
          </h4>
          <div className="space-y-2">
            {subscription.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {subscription.plan === "free" ? (
                  <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                ) : (
                  <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                )}
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Button for Free Plan */}
        {subscription.plan === "free" && subscription.status === "active" && (
          <div className="pt-4 border-t border-gray-700/50">
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white py-3 px-4  font-medium transition-all duration-300 group">
              <ArrowUpCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Upgrade to Premium
            </button>
          </div>
        )}

        {/* Manage Subscription Button for Paid Plans */}
        {subscription.plan !== "free" && subscription.status === "active" && (
          <div className="pt-4 border-t border-gray-700/50">
            <button className="w-full flex items-center justify-center gap-2  bg-gray-900 hover:bg-gray-700 text-white py-3 px-4  font-medium transition-all duration-300 border border-gray-600">
              <CreditCard className="h-5 w-5" />
              Manage Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
