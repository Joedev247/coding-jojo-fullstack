import React from 'react';

const plans = [
  {
    name: 'Basic Plan',
    price: 156,
    features: [
      { text: 'Access to all courses', included: true },
      { text: 'Example code available', included: true },
      { text: 'High resolution videos', included: true },
      { text: 'Certificate after completion', included: false },
      { text: 'Private sessions', included: false },
    ],
    buttonColor: 'bg-blue-600',
    borderColor: 'border-blue-600',
    buttonText: 'CHOOSE THE PLAN',
  },
  {
    name: 'Standard Plan',
    price: 176,
    features: [
      { text: 'Access to all courses', included: true },
      { text: 'Example code available', included: true },
      { text: 'High resolution videos', included: true },
      { text: 'Certificate after completion', included: true },
      { text: 'Private sessions', included: false },
    ],
    buttonColor: 'bg-red-600',
    borderColor: 'border-red-600',
    buttonText: 'CHOOSE THE PLAN',
  },
  {
    name: 'Premium Plan',
    price: 196,
    features: [
      { text: 'Access to all courses', included: true },
      { text: 'Example code available', included: true },
      { text: 'High resolution videos', included: true },
      { text: 'Certificate after completion', included: true },
      { text: 'Private sessions', included: true },
    ],
    buttonColor: 'bg-blue-600',
    borderColor: 'border-blue-600',
    buttonText: 'CHOOSE THE PLAN',
  },
];

export default function PricingPlanSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center">
        <span className="text-blue-600 font-medium text-sm mb-2 flex items-center gap-2">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          PRICING TABLE
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
          Our Membership Price Plan
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center w-full max-w-5xl">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`flex-1 bg-white shadow-lg px-8 py-8 flex flex-col items-center border-t-4 ${plan.borderColor}`}
            style={{ minWidth: 280 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{plan.name}</h3>
            <div className="bg-blue-50  w-full py-6 flex flex-col items-center mb-2">
              <span className="text-4xl font-bold text-blue-600 mb-2">${plan.price}.00</span>
              <span className="text-xs text-gray-500">/PER MONTHLY</span>
            </div>
            <ul className="w-full mb-6">
              {plan.features.map((feature, i) => (
                <li
                  key={feature.text}
                  className={`flex items-center gap-2 text-sm py-1 ${feature.included ? 'text-blue-700' : 'text-red-500'}`}
                >
                  {feature.included ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3  text-white font-semibold text-sm shadow-md transition ${plan.buttonColor} hover:opacity-90 mb-2`}
            >
              {plan.buttonText} <span className="ml-2">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
