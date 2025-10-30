"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Check, ArrowRight, Users, Sparkles, Crown, Diamond, Rocket
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PricingPlan {
  title: string;
  forText: string;
  userCount: string;
  price?: string;
  period?: string;
  priceText?: string;
  billingInfo?: string;
  buttonText: string;
  features: string[];
  popular?: boolean;
  icon?: React.ReactNode;
  gradient?: string;
  planId: string; // Add plan identifier
}

const PricingCard = ({ 
  plan, 
  isActive, 
  isAnnual, 
  onPlanSelect 
}: { 
  plan: PricingPlan; 
  isActive: boolean;
  isAnnual: boolean;
  onPlanSelect: (planId: string) => void;
}) => {

  const handlePlanSelect = () => {
    onPlanSelect(plan.planId);
  };

  return (
    <div className={`relative bg-white backdrop-blur-sm shadow-xl border border-gray-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full group  ${isActive ? 'scale-[1.02] z-10' : 'scale-100 z-0'}`}>
      {plan.popular && (
        <div className="absolute -top-3 inset-x-0 mx-auto w-fit px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-xs font-bold text-white shadow-lg animate-pulse">
          Most Popular
        </div>
      )}
      
      {/* Card Header */}
      <div className={`p-6 border-b ${plan.popular ? 'border-blue-500/20' : 'border-gray-200'} rounded-t-lg relative overflow-hidden`}>
        {/* Background gradient effect */}
        <div className={`absolute inset-0 opacity-10 ${plan.gradient || 'bg-gradient-to-br from-blue-500 to-indigo-500'}`}></div>
        
        {/* Icon */}
        <div className={`inline-flex items-center justify-center p-2.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full mb-3 transition-transform duration-300 group-hover:scale-110 ${plan.popular ? 'from-blue-500/20 to-indigo-500/20' : ''}`}>
          {plan.icon || <Crown className="w-5 h-5 text-blue-600" />}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{plan.title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-600">{plan.forText}</p>
          <div className="flex items-center bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
            <Users className="w-3.5 h-3.5 text-blue-600 mr-1" />
            <span className="text-xs text-blue-600">{plan.userCount}</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="p-6 text-center">
        {plan.price ? (
          <>
            <div className="flex justify-center items-baseline mb-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{plan.price}</span>
              <span className="text-sm text-gray-600 ml-1">{plan.period}</span>
            </div>
            <p className="text-xs text-gray-500">{plan.billingInfo}</p>
          </>
        ) : (
          <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{plan.priceText}</div>
        )}
      </div>      {/* CTA Button */}
      <div className="px-6 pb-6 text-center">
        <button 
          onClick={handlePlanSelect}
          className={`w-full py-3 px-4 ${
            plan.popular 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
            } font-medium flex items-center justify-center transition-all duration-300 group shadow-lg ${plan.popular ? 'shadow-blue-500/20' : ''} hover:transform hover:-translate-y-0.5 rounded text-sm`}
        >
          {plan.buttonText}
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Features List */}
      <div className="px-6 py-4 flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="mt-0.5">
                <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-blue-600' : 'text-blue-600'} mr-2.5 flex-shrink-0`} />
              </div>
              <span className="text-xs text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PricingPlans = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1); // Default to middle plan
  const [isAnnual, setIsAnnual] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Optimized handlers with useCallback
  const handleCardHover = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const toggleBilling = useCallback((annual: boolean) => {
    setIsAnnual(annual);
  }, []);

  const handlePlanSelect = useCallback((planId: string) => {
    const billing = isAnnual ? 'annual' : 'monthly';
    router.push(`/subscription?plan=${planId}&billing=${billing}`);
  }, [router, isAnnual]);
  // Memoized plans data
  const plans = useMemo(() => [
    {
      title: "Personal Plan",
      forText: "For you",
      userCount: "Individual",
      price: isAnnual ? "$8.00" : "$10.00",
      period: "per month",
      billingInfo: isAnnual ? "Billed annually. Save 20%" : "Billed monthly. Cancel anytime.",
      buttonText: "Try it free",
      planId: "personal",
      icon: <Rocket className="w-5 h-5 text-blue-600" />,
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-500",
      features: [
        "Access to 12,000+ top courses",
        "Certification prep",
        "Goal-focused recommendations",
        "AI-powered coding exercises",
        "Mobile and TV apps",
        "Offline viewing on mobile"
      ]
    },
    {
      title: "Team Plan",
      forText: "For your team",
      userCount: "2 to 20 people",
      price: isAnnual ? "$24.00" : "$30.00",
      period: "per user/month",
      billingInfo: isAnnual ? "Billed annually. Save 20%" : "Billed monthly. Cancel anytime.",
      buttonText: "Try it free",
      planId: "team",
      popular: true,
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      gradient: "bg-gradient-to-br from-indigo-500 to-blue-500",
      features: [
        "Access to 12,000+ top courses",
        "Certification prep",
        "Goal-focused recommendations",
        "AI-powered coding exercises",
        "Analytics and adoption reports",
        "Team learning insights",
        "SSO integration (for 10+ users)",
        "Slack integration"
      ]
    },
    {
      title: "Enterprise Plan",
      forText: "For your whole organization",
      userCount: "More than 20 people",
      priceText: "Contact sales for pricing",
      buttonText: "Request a demo",
      planId: "enterprise",
      icon: <Diamond className="w-5 h-5 text-blue-600" />,
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-500",
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
        "Strategic implementation services with add-on"
      ]
    }
  ], [isAnnual]);

  // Loading skeleton
  if (!mounted) {
    return (
      <section className="relative overflow-hidden py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 mx-auto w-48"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 mx-auto max-w-2xl"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto max-w-xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 animate-pulse "></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative py-12 md:py-16 font-['Montserrat',sans-serif]">
      {/* <AnimatedBackground /> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full text-xs font-medium border border-blue-500/20 backdrop-blur-sm shadow-lg mb-4">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
              Simple pricing
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 leading-tight">
            <span className="text-gray-800">Accelerate </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">growth</span>
          </h2>
          <p className="text-gray-600 text-xs mx-auto mb-6">
            Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 rounded mb-6">
            <button 
              className={`px-3 py-2 text-xs font-medium transition-all duration-300 rounded ${!isAnnual ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => toggleBilling(false)}
            >
              Monthly
            </button>
            <button 
              className={`px-3 py-2 text-xs font-medium transition-all duration-300 flex items-center gap-1.5 rounded ${isAnnual ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => toggleBilling(true)}
            >
              Annual
              <span className="bg-blue-500/20 text-blue-600 text-[10px] px-1.5 py-0.5 rounded">Save 20%</span>
            </button>
          </div>
        </div>        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="md:transform transition-all duration-500"
              onMouseEnter={() => handleCardHover(index)}
            >
              <PricingCard 
                plan={plan} 
                isActive={activeIndex === index}
                isAnnual={isAnnual}
                onPlanSelect={handlePlanSelect}
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm p-6 shadow-lg  border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Need help choosing?</h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
              Not sure which plan is right for you? Our team is here to help you find the perfect solution for your learning goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:transform hover:-translate-y-0.5 rounded text-sm">
                Schedule a call
              </button>
              <button className="bg-blue-500/10 px-5 py-2.5 text-gray-800 font-medium hover:bg-blue-500/20 transition-all duration-300 border border-blue-200 rounded text-sm">
                Compare all plans
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </section>
  );
};

export default PricingPlans;