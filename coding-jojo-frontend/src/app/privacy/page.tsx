"use client";

import React from "react";
import {
  Shield,
  Eye,
  Lock,
  Database,
  Globe,
  Mail,
  FileText,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, profile picture)",
        "Learning progress and course completion data",
        "Communication preferences and settings",
        "Device information and browser data",
        "Usage analytics to improve our platform",
      ],
    },
    {
      icon: <Eye className="h-5 w-5 text-blue-600" />,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our educational services",
        "Track your learning progress and achievements",
        "Send course updates and platform notifications",
        "Personalize your learning experience",
        "Ensure platform security and prevent fraud",
      ],
    },
    {
      icon: <Lock className="h-5 w-5 text-blue-600" />,
      title: "Data Protection & Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Secure data storage with regular backups",
        "Access controls and authentication measures",
        "Regular security audits and updates",
        "GDPR and CCPA compliance measures",
      ],
    },
    {
      icon: <Database className="h-5 w-5 text-blue-600" />,
      title: "Data Sharing & Third Parties",
      content: [
        "We do not sell your personal information to third parties",
        "Course completion certificates may be shared with employers (with your consent)",
        "Analytics providers to improve platform performance",
        "Payment processors for subscription management",
        "Legal compliance when required by law",
      ],
    },
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      title: "Your Rights & Choices",
      content: [
        "Access, update, or delete your personal information",
        "Opt-out of marketing communications",
        "Request data portability",
        "Withdraw consent for data processing",
        "Contact our support team for privacy concerns",
      ],
    },
    {
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to understand user behavior",
        "Preference cookies to remember your settings",
        "Marketing cookies for personalized content",
        "You can manage cookie preferences in our Cookie Policy",
      ],
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
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we
                collect, use, and protect your information on Coding Jojo.
              </p>
              <div className="mt-4 text-sm text-gray-600">
                <p>Last updated: June 12, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Introduction */}
          <div className="bg-white border border-gray-200  shadow-sm p-6 mb-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                  Welcome to Coding Jojo! We are committed to protecting your
                  privacy and ensuring transparency about how we handle your
                  personal information. This Privacy Policy explains our
                  practices regarding the collection, use, and disclosure of
                  information when you use our educational platform.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  By using Coding Jojo, you agree to the collection and use of
                  information in accordance with this policy. We will not use or
                  share your information with anyone except as described in this
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="grid gap-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200  shadow-sm p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50  flex-shrink-0">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed text-sm">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200  p-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Questions About Privacy?
              </h3>
              <p className="text-gray-700 mb-4 max-w-2xl mx-auto text-sm">
                If you have any questions about this Privacy Policy or our data
                practices, please don't hesitate to contact us.
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
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 font-medium border border-gray-300 transition-all duration-300  text-sm"
                >
                  Contact Support
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

export default PrivacyPolicy;
