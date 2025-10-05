"use client";

import React from "react";
import {
  FileText,
  Scale,
  AlertTriangle,
  Users,
  CreditCard,
  Shield,
  BookOpen,
  Mail,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TermsOfService = () => {
  const sections = [
    {
      icon: <Users className="h-6 w-6 text-blue-400" />,
      title: "Account Registration & Responsibilities",
      content: [
        "You must be at least 13 years old to create an account",
        "Provide accurate and complete information during registration",
        "Maintain the security of your account credentials",
        "You are responsible for all activities under your account",
        "Notify us immediately of any unauthorized use of your account",
      ],
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-400" />,
      title: "Platform Usage & Content",
      content: [
        "Use our platform only for lawful educational purposes",
        "Respect intellectual property rights of all content",
        "Do not share account credentials with others",
        "Course materials are for personal use only",
        "Completed certificates reflect your individual achievement",
      ],
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-400" />,
      title: "Payments & Subscriptions",
      content: [
        "Subscription fees are billed in advance on a recurring basis",
        "All payments are non-refundable unless required by law",
        "We reserve the right to change pricing with 30 days notice",
        "Failed payments may result in service suspension",
        "You can cancel your subscription at any time",
      ],
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-orange-400" />,
      title: "Prohibited Activities",
      content: [
        "Uploading malicious software or harmful content",
        "Attempting to gain unauthorized access to our systems",
        "Sharing copyrighted materials without permission",
        "Creating multiple accounts to circumvent limitations",
        "Engaging in harassment or abusive behavior towards other users",
      ],
    },
    {
      icon: <Shield className="h-6 w-6 text-pink-400" />,
      title: "Intellectual Property",
      content: [
        "All platform content is owned by Coding Jojo or licensors",
        "You may not reproduce or distribute our content without permission",
        "Your submissions grant us license to use for platform improvement",
        "We respect third-party intellectual property rights",
        "Report any copyright infringement to our support team",
      ],
    },
    {
      icon: <Scale className="h-6 w-6 text-yellow-400" />,
      title: "Limitation of Liability",
      content: [
        "Platform provided 'as is' without warranties of any kind",
        "We are not liable for indirect or consequential damages",
        "Maximum liability limited to amount paid in last 12 months",
        "Some jurisdictions do not allow limitation of liability",
        "These limitations apply to the fullest extent permitted by law",
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
                  <Scale className="h-12 w-12 text-pink-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                These terms govern your use of Coding Jojo and define the rights
                and responsibilities of all users.
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
                  Agreement to Terms
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Welcome to Coding Jojo! These Terms of Service ("Terms")
                  constitute a legally binding agreement between you and Coding
                  Jojo regarding your use of our educational platform and
                  services.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  By accessing or using our platform, you agree to be bound by
                  these Terms. If you disagree with any part of these terms, you
                  may not access or use our services.
                </p>
                <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 p-4 ">
                  <p className="text-orange-300 text-sm">
                    <strong>Important:</strong> These Terms may be updated from
                    time to time. We will notify you of significant changes via
                    email or platform notification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
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

          {/* Additional Terms */}
          <div className="mt-8   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Termination & Suspension
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-pink-400">
                  We may terminate or suspend your account if:
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    You violate these Terms of Service
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Your account remains inactive for extended periods
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    We reasonably believe suspension is necessary
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3 text-pink-400">
                  You may terminate your account by:
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Contacting our support team
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Using account deletion options in settings
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    Canceling your subscription
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50 p-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Questions About These Terms?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service or need
                clarification on any points, please contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@codingjojo.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-6 py-3 font-medium transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                  legal@codingjojo.com
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

export default TermsOfService;
