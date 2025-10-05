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
      icon: <Shield className="h-6 w-6 text-pink-400" />,
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
      icon: <Eye className="h-6 w-6 text-blue-400" />,
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
      icon: <Lock className="h-6 w-6 text-green-400" />,
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
      icon: <Database className="h-6 w-6 text-purple-400" />,
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
      icon: <Users className="h-6 w-6 text-orange-400" />,
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
      icon: <Globe className="h-6 w-6 text-yellow-400" />,
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
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 backdrop-blur-sm border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4  bg-gray-900/60 rounded-full">
                  <Shield className="h-12 w-12 text-pink-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we
                collect, use, and protect your information on Coding Jojo.
              </p>
              <div className="mt-6 text-sm text-gray-400">
                <p>Last updated: June 12, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Introduction */}
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 mb-8">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Welcome to Coding Jojo! We are committed to protecting your
                  privacy and ensuring transparency about how we handle your
                  personal information. This Privacy Policy explains our
                  practices regarding the collection, use, and disclosure of
                  information when you use our educational platform.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By using Coding Jojo, you agree to the collection and use of
                  information in accordance with this policy. We will not use or
                  share your information with anyone except as described in this
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-700/50  flex-shrink-0">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 leading-relaxed">
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
          <div className="mt-12 bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50 p-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Questions About Privacy?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or our data
                practices, please don't hesitate to contact us.
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
                  href="/contact"
                  className="inline-flex items-center gap-2  bg-gray-900/60 hover:bg-gray-700/60 text-white px-6 py-3 font-medium border border-gray-600 transition-all duration-300"
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
