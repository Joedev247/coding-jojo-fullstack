"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, Settings, Shield, BarChart3, Target } from "lucide-react";

interface CookieConsentProps {
  onAccept?: () => void;
  onReject?: () => void;
  onCustomize?: (preferences: CookiePreferences) => void;
}

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onReject,
  onCustomize,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show popup after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
    onAccept?.();
  };

  const handleRejectAll = () => {
    const rejected = {
      essential: true, // Essential cookies cannot be rejected
      analytics: false,
      marketing: false,
      preferences: false,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(rejected));
    setIsVisible(false);
    onReject?.();
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
    onCustomize?.(preferences);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  const cookieTypes = [
    {
      key: "essential" as keyof CookiePreferences,
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      title: "Essential Cookies",
      description:
        "Required for basic site functionality, security, and user authentication.",
      required: true,
    },
    {
      key: "analytics" as keyof CookiePreferences,
      icon: <BarChart3 className="h-5 w-5 text-blue-400" />,
      title: "Analytics Cookies",
      description:
        "Help us understand how you use our platform to improve user experience.",
      required: false,
    },
    {
      key: "preferences" as keyof CookiePreferences,
      icon: <Settings className="h-5 w-5 text-purple-400" />,
      title: "Preference Cookies",
      description:
        "Remember your settings and preferences for a personalized experience.",
      required: false,
    },
    {
      key: "marketing" as keyof CookiePreferences,
      icon: <Target className="h-5 w-5 text-orange-400" />,
      title: "Marketing Cookies",
      description:
        "Used to deliver relevant advertisements and track campaign effectiveness.",
      required: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Cookie Consent Modal */}
      <div className="relative w-full max-w-4xl   bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20">
              <Cookie className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Cookie Preferences
              </h3>
              <p className="text-sm text-gray-400">
                Manage your cookie settings for Coding Jojo
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-2 hover:bg-gray-800/60 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showDetails ? (
            // Simple view
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We use cookies to enhance your learning experience, analyze
                platform usage, and provide personalized content. You can accept
                all cookies, reject optional ones, or customize your
                preferences.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-6 py-3 font-medium transition-all duration-300"
                >
                  Accept All Cookies
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1  bg-gray-900/60 hover:bg-gray-700/60 text-white px-6 py-3 font-medium border border-gray-600 transition-all duration-300"
                >
                  Reject Optional
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex-1 bg-transparent hover:bg-gray-800/40 text-pink-400 px-6 py-3 font-medium border border-pink-500/50 transition-all duration-300"
                >
                  Customize Settings
                </button>
              </div>
            </div>
          ) : (
            // Detailed view
            <div>
              <p className="text-gray-300 mb-6">
                Choose which types of cookies you want to allow. Essential
                cookies are required for the platform to function properly.
              </p>

              <div className="space-y-4 mb-6">
                {cookieTypes.map((type) => (
                  <div
                    key={type.key}
                    className="bg-gray-800/40 border border-gray-700/50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-1.5 bg-gray-700/50 rounded">
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white">
                              {type.title}
                            </h4>
                            {type.required && (
                              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences[type.key]}
                            onChange={() => handlePreferenceChange(type.key)}
                            disabled={type.required}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer transition-all duration-300 ${
                              preferences[type.key]
                                ? "peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-orange-500"
                                : ""
                            } ${type.required ? "opacity-50" : ""}`}
                          >
                            <div
                              className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-300 ${
                                preferences[type.key] ? "translate-x-5" : ""
                              }`}
                            ></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-6 py-3 font-medium transition-all duration-300"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1  bg-gray-900/60 hover:bg-gray-700/60 text-white px-6 py-3 font-medium border border-gray-600 transition-all duration-300"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700/50 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
            <div className="flex gap-4">
              <a
                href="/privacy"
                className="hover:text-pink-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-pink-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
            <p>
              You can change these settings anytime in your account preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
