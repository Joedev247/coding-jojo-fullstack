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
      icon: <Users className="h-5 w-5 text-blue-600" />,
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
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
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
      icon: <CreditCard className="h-5 w-5 text-blue-600" />,
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
      icon: <AlertTriangle className="h-5 w-5 text-blue-600" />,
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
      icon: <Shield className="h-5 w-5 text-blue-600" />,
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
      icon: <Scale className="h-5 w-5 text-blue-600" />,
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-white border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Scale className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                These terms govern your use of Coding Jojo and define the rights
                and responsibilities of all users.
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
                  Agreement to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                  Welcome to Coding Jojo! These Terms of Service ("Terms")
                  constitute a legally binding agreement between you and Coding
                  Jojo regarding your use of our educational platform and
                  services.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                  By accessing or using our platform, you agree to be bound by
                  these Terms. If you disagree with any part of these terms, you
                  may not access or use our services.
                </p>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200  p-3">
                  <p className="text-amber-800 text-sm">
                    <strong>Important:</strong> These Terms may be updated from
                    time to time. We will notify you of significant changes via
                    email or platform notification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
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

          {/* Additional Terms */}
          <div className="mt-6 bg-white border border-gray-200  shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Termination & Suspension
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium mb-2 text-blue-600">
                  We may terminate or suspend your account if:
                </h4>
                <ul className="space-y-1.5 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">You violate these Terms of Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Your account remains inactive for extended periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">We reasonably believe suspension is necessary</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-2 text-blue-600">
                  You may terminate your account by:
                </h4>
                <ul className="space-y-1.5 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Contacting our support team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Using account deletion options in settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Canceling your subscription</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200  p-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Questions About These Terms?
              </h3>
              <p className="text-gray-700 mb-4 max-w-2xl mx-auto text-sm">
                If you have any questions about these Terms of Service or need
                clarification on any points, please contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:legal@codingjojo.com"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 font-medium transition-all duration-300  text-sm"
                >
                  <Mail className="h-4 w-4" />
                  legal@codingjojo.com
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

export default TermsOfService;
