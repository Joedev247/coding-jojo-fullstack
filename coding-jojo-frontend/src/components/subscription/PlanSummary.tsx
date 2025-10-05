import React from "react";
import { Check, Crown, Sparkles } from "lucide-react";

interface PlanSummaryProps {
  plan: {
    title: string;
    forText: string;
    userCount: string;
    icon: React.ReactNode;
    popular?: boolean;
    features: string[];
  };
  pricing: {
    price: number | string;
    originalPrice?: number | null;
    period: string;
    billingInfo: string;
    totalPrice: number;
    billingPeriod: string;
  };
  isAnnual: boolean;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({
  plan,
  pricing,
  isAnnual,
}) => {
  return (
    <div className="sticky top-8">
      <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-800 shadow-xl p-6 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-pink-500 to-orange-500"></div>

        {plan.popular && (
          <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-orange-500 text-xs font-bold text-white shadow-lg">
            Most Popular
          </div>
        )}

        {/* Plan Header */}
        <div className="relative mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20">
              {plan.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{plan.title}</h3>
              <p className="text-sm text-gray-300">{plan.forText}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="bg-pink-500/10 px-3 py-1 border border-pink-500/20 text-sm">
              <span className="text-pink-500 font-medium">
                {plan.userCount}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6 p-4  bg-gray-900/50 border border-gray-700">
          {typeof pricing.price === "number" ? (
            <>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  ${pricing.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400">{pricing.period}</span>
              </div>

              {pricing.originalPrice && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-400 line-through">
                    ${pricing.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5">
                    Save 20%
                  </span>
                </div>
              )}

              <p className="text-xs text-gray-400 mb-4">
                {pricing.billingInfo}
              </p>

              {/* Total Amount */}
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">
                    Total {isAnnual ? "annually" : "monthly"}:
                  </span>
                  <span className="text-xl font-bold text-white">
                    ${pricing.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
                {pricing.price}
              </div>
              <p className="text-sm text-gray-400">{pricing.billingInfo}</p>
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            What's included:
          </h4>
          <ul className="space-y-2">
            {plan.features.slice(0, 6).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
            {plan.features.length > 6 && (
              <li className="text-xs text-gray-400 italic">
                +{plan.features.length - 6} more features...
              </li>
            )}
          </ul>
        </div>

        {/* Money-back guarantee */}
        <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20">
          <div className="text-xs text-green-400 font-medium mb-1">
            30-day money-back guarantee
          </div>
          <div className="text-xs text-gray-300">
            Not satisfied? Get a full refund within 30 days.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
