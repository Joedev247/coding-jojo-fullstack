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
    <div className="sticky top-6">
      <div className="bg-white/95 backdrop-blur-sm border border-blue-200  shadow-lg p-4 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-600 to-blue-700"></div>

        {plan.popular && (
          <div className="absolute -top-2 left-3 px-2 py-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded text-xs font-bold text-white shadow-lg">
            Most Popular
          </div>
        )}

        {/* Plan Header */}
        <div className="relative mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 ">
              {plan.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{plan.title}</h3>
              <p className="text-xs text-gray-600">{plan.forText}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-50 px-2 py-1 border border-blue-200 rounded text-xs">
              <span className="text-blue-600 font-medium">
                {plan.userCount}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 ">
          {typeof pricing.price === "number" ? (
            <>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  ${pricing.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-600">{pricing.period}</span>
              </div>

              {pricing.originalPrice && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500 line-through">
                    ${pricing.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                    Save 20%
                  </span>
                </div>
              )}

              <p className="text-xs text-gray-600 mb-3">
                {pricing.billingInfo}
              </p>

              {/* Total Amount */}
              <div className="border-t border-blue-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-700">
                    Total {isAnnual ? "annually" : "monthly"}:
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    ${pricing.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {pricing.price}
              </div>
              <p className="text-xs text-gray-600">{pricing.billingInfo}</p>
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-blue-600" />
            What's included:
          </h4>
          <ul className="space-y-2">
            {plan.features.slice(0, 6).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                <Check className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
            {plan.features.length > 6 && (
              <li className="text-xs text-gray-600 italic">
                +{plan.features.length - 6} more features...
              </li>
            )}
          </ul>
        </div>

        {/* Money-back guarantee */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 ">
          <div className="text-xs text-blue-700 font-medium mb-1">
            30-day money-back guarantee
          </div>
          <div className="text-xs text-gray-600">
            Not satisfied? Get a full refund within 30 days.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;