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
    <div className={`relative bg-gray-900/60 backdrop-blur-sm shadow-xl border  hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 flex flex-col h-full group ${isActive ? 'scale-[1.02] z-10' : 'scale-100 z-0'}`}>
      {plan.popular && (
        <div className="absolute -top-4 inset-x-0 mx-auto w-fit px-4 py-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full text-xs font-bold text-white shadow-lg animate-pulse">
          Most Popular
        </div>
      )}
      
      {/* Card Header */}
      <div className={`p-8 border-b ${plan.popular ? 'border-pink-500/20' : 'border-gray-800'} rounded-t-lg relative overflow-hidden`}>
        {/* Background gradient effect */}
        <div className={`absolute inset-0 opacity-10 ${plan.gradient || 'bg-gradient-to-br from-pink-500 to-orange-500'}`}></div>
        
        {/* Icon */}
        <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-r from-pink-500/10 to-orange-500/10 mb-4 transition-transform duration-300 group-hover:scale-110 ${plan.popular ? 'from-pink-500/20 to-orange-500/20' : ''}`}>
          {plan.icon || <Crown className="w-6 h-6 text-pink-500" />}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-500 transition-colors duration-300">{plan.title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-300">{plan.forText}</p>
          <div className="flex items-center bg-pink-500/10 px-2 py-1 rounded-full border border-pink-500/20">
            <Users className="w-4 h-4 text-pink-500 mr-1" />
            <span className="text-xs text-pink-500">{plan.userCount}</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="p-8 text-center">
        {plan.price ? (
          <>
            <div className="flex justify-center items-baseline mb-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">{plan.price}</span>
              <span className="text-sm text-gray-300 ml-1">{plan.period}</span>
            </div>
            <p className="text-xs text-gray-400">{plan.billingInfo}</p>
          </>
        ) : (
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">{plan.priceText}</div>
        )}
      </div>      {/* CTA Button */}
      <div className="px-8 pb-8 text-center">
        <button 
          onClick={handlePlanSelect}
          className={`w-full py-3.5 px-4 ${
            plan.popular 
            ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white'
            : 'bg-gray-800 hover:bg-gray-700 text-white'
            } font-medium flex items-center justify-center transition-all duration-300 group shadow-lg ${plan.popular ? 'shadow-pink-500/20' : ''} hover:transform hover:-translate-y-1`}
        >
          {plan.buttonText}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Features List */}
      <div className="px-8 py-6 flex-grow">
        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="mt-0.5">
                <Check className={`w-4 h-4 ${plan.popular ? 'text-pink-500' : 'text-green-500'} mr-3 flex-shrink-0`} />
              </div>
              <span className="text-sm text-gray-300">{feature}</span>
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
      icon: <Rocket className="w-6 h-6 text-pink-500" />,
      gradient: "bg-gradient-to-br from-blue-500 to-purple-500",
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
      icon: <Users className="w-6 h-6 text-orange-500" />,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
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
      icon: <Diamond className="w-6 h-6 text-pink-500" />,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
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
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="h-8 bg-gray-800 rounded animate-pulse mb-5 mx-auto w-48"></div>
            <div className="h-16 bg-gray-800 rounded animate-pulse mb-6 mx-auto max-w-2xl"></div>
            <div className="h-8 bg-gray-800 rounded animate-pulse mx-auto max-w-xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-800 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative py-16 md:py-24 font-['Montserrat',sans-serif]">
      {/* <AnimatedBackground /> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-medium border border-pink-500/20 backdrop-blur-sm shadow-lg mb-5">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold">
              Simple pricing
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="text-white">Accelerate </span>
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">growth</span>
          </h2>
          <p className="text-gray-300 text-lg mx-auto mb-8">
            Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.
          </p>
          
          {/* Billing toggle */}
          <div className="inline-flex items-center p-1 bg-gray-900 mb-8">
            <button 
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${!isAnnual ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => toggleBilling(false)}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => toggleBilling(true)}
            >
              Annual
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">Save 20%</span>
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
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Need help choosing?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Not sure which plan is right for you? Our team is here to help you find the perfect solution for your learning goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-pink-500/30 hover:transform hover:-translate-y-1">
                Schedule a call
              </button>
              <button className="bg-pink-500/10 px-6 py-3 text-white font-medium hover:bg-pink-500/10 transition-all duration-300">
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