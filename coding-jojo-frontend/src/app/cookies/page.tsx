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
      icon: <Shield className="h-5 w-5 text-blue-600" />,
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
      icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
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
      icon: <Settings className="h-5 w-5 text-blue-600" />,
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
      icon: <Target className="h-5 w-5 text-blue-600" />,
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-white border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Cookie className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Learn about how we use cookies to enhance your learning
                experience on Coding Jojo.
              </p>
              <div className="mt-4 text-sm text-gray-600">
                <p>Last updated: June 12, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* What are Cookies */}
          <div className="bg-white border border-gray-200  shadow-sm p-6 mb-6">
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  What are Cookies?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                  Cookies are small text files that are stored on your device
                  when you visit our website. They help us provide you with a
                  better experience by remembering your preferences, analyzing
                  how you use our platform, and improving our services.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  We use both session cookies (which expire when you close your
                  browser) and persistent cookies (which remain on your device
                  for a specified period) to enhance your learning experience on
                  Coding Jojo.
                </p>
              </div>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Types of Cookies We Use
            </h2>

            <div className="grid gap-4">
              {cookieTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200  shadow-sm p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50  flex-shrink-0">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {type.title}
                        </h3>
                        <div className="flex gap-2">
                          {!type.canDisable && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                          {type.canDisable && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              Optional
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 text-sm">{type.purpose}</p>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h4 className="text-sm font-medium text-blue-600 mb-2">
                            Examples:
                          </h4>
                          <ul className="space-y-1">
                            {type.examples.map((example, exampleIndex) => (
                              <li
                                key={exampleIndex}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-600 mb-2">
                            Retention Period:
                          </h4>
                          <p className="text-sm text-gray-700">
                            {type.retention}
                          </p>

                          <h4 className="text-sm font-medium text-blue-600 mb-2 mt-2">
                            Can be disabled:
                          </h4>
                          <p className="text-sm text-gray-700">
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
          <div className="bg-white border border-gray-200  shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-600" />
              Managing Your Cookie Preferences
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium mb-2 text-blue-600">
                  On Our Platform:
                </h4>
                <ul className="space-y-1.5 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Use our cookie consent banner when it appears</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Access cookie settings in your account preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Customize which types of cookies you allow</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-2 text-blue-600">
                  In Your Browser:
                </h4>
                <ul className="space-y-1.5 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Clear cookies and browsing data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Block third-party cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Use incognito/private browsing mode</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 ">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> Disabling certain cookies may affect the
                functionality of our platform and your learning experience.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200  p-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Questions About Cookies?
              </h3>
              <p className="text-gray-700 mb-4 max-w-2xl mx-auto text-sm">
                If you have any questions about our use of cookies or need help
                managing your preferences, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:privacy@codingjojo.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 font-medium transition-all duration-300  text-sm"
                >
                  <Mail className="h-4 w-4" />
                  privacy@codingjojo.com
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 font-medium border border-gray-300 transition-all duration-300  text-sm"
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
