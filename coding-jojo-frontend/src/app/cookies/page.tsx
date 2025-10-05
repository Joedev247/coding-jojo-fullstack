"use client";

import React from "react";
import {
  Cookie,
  Shield,
  BarChart3,
  Target,
  Settings,
  Eye,
  Globe,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  const cookieTypes = [
    {
      icon: <Shield className="h-6 w-6 text-green-400" />,
      title: "Essential Cookies",
      purpose: "Required for basic functionality",
      examples: [
        "Authentication and session management",
        "Security and fraud prevention",
        "Basic site functionality and navigation",
        "Load balancing and performance optimization",
      ],
      retention: "Session or up to 1 year",
      canDisable: false,
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
      title: "Analytics Cookies",
      purpose: "Help us understand platform usage",
      examples: [
        "Google Analytics for traffic analysis",
        "Course completion and progress tracking",
        "Feature usage and user behavior patterns",
        "Performance monitoring and optimization",
      ],
      retention: "Up to 2 years",
      canDisable: true,
    },
    {
      icon: <Settings className="h-6 w-6 text-purple-400" />,
      title: "Preference Cookies",
      purpose: "Remember your settings and choices",
      examples: [
        "Language and theme preferences",
        "Course progress and bookmarks",
        "Notification settings",
        "Display preferences and customizations",
      ],
      retention: "Up to 1 year",
      canDisable: true,
    },
    {
      icon: <Target className="h-6 w-6 text-orange-400" />,
      title: "Marketing Cookies",
      purpose: "Deliver relevant content and ads",
      examples: [
        "Personalized course recommendations",
        "Targeted promotional content",
        "Social media integration",
        "Third-party advertising partners",
      ],
      retention: "Up to 1 year",
      canDisable: true,
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 backdrop-blur-sm border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4  bg-gray-900/60 rounded-full">
                  <Cookie className="h-12 w-12 text-pink-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Learn about how we use cookies to enhance your learning
                experience on Coding Jojo.
              </p>
              <div className="mt-6 text-sm text-gray-400">
                <p>Last updated: June 12, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* What are Cookies */}
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 mb-8">
            <div className="flex items-start gap-4">
              <Eye className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  What are Cookies?
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cookies are small text files that are stored on your device
                  when you visit our website. They help us provide you with a
                  better experience by remembering your preferences, analyzing
                  how you use our platform, and improving our services.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We use both session cookies (which expire when you close your
                  browser) and persistent cookies (which remain on your device
                  for a specified period) to enhance your learning experience on
                  Coding Jojo.
                </p>
              </div>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
              <Globe className="h-6 w-6 text-pink-400" />
              Types of Cookies We Use
            </h2>

            <div className="grid gap-6">
              {cookieTypes.map((type, index) => (
                <div
                  key={index}
                  className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-pink-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-700/50 flex-shrink-0">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {type.title}
                        </h3>
                        <div className="flex gap-2">
                          {!type.canDisable && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                          {type.canDisable && (
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                              Optional
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{type.purpose}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-pink-400 mb-2">
                            Examples:
                          </h4>
                          <ul className="space-y-1">
                            {type.examples.map((example, exampleIndex) => (
                              <li
                                key={exampleIndex}
                                className="flex items-start gap-2 text-sm text-gray-300"
                              >
                                <div className="w-1 h-1 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-pink-400 mb-2">
                            Retention Period:
                          </h4>
                          <p className="text-sm text-gray-300">
                            {type.retention}
                          </p>

                          <h4 className="text-sm font-medium text-pink-400 mb-2 mt-3">
                            Can be disabled:
                          </h4>
                          <p className="text-sm text-gray-300">
                            {type.canDisable
                              ? "Yes, in cookie preferences"
                              : "No, required for functionality"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-pink-400" />
              Managing Your Cookie Preferences
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-pink-400">
                  On Our Platform:
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Use our cookie consent banner when it appears
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Access cookie settings in your account preferences
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Customize which types of cookies you allow
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3 text-pink-400">
                  In Your Browser:
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Clear cookies and browsing data
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Block third-party cookies
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Use incognito/private browsing mode
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20">
              <p className="text-orange-300 text-sm">
                <strong>Note:</strong> Disabling certain cookies may affect the
                functionality of our platform and your learning experience.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50 p-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Questions About Cookies?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                If you have any questions about our use of cookies or need help
                managing your preferences, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@codingjojo.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-6 py-3 font-medium transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                  privacy@codingjojo.com
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2  bg-gray-900/60 hover:bg-gray-700/60 text-white px-6 py-3 font-medium border border-gray-600 transition-all duration-300"
                >
                  View Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
