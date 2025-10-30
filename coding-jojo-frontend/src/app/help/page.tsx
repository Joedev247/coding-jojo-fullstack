"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  Book,
  Video,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Star,
  Clock,
  Users,
  PlayCircle,
  Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const helpCategories = [
    {
      icon: <Book className="h-4 w-4 text-blue-600" />,
      title: "Getting Started",
      description: "Learn the basics of using Coding Jojo",
      articles: 12,
      popular: true,
    },
    {
      icon: <Video className="h-4 w-4 text-blue-600" />,
      title: "Course Navigation",
      description: "How to navigate and complete courses",
      articles: 8,
      popular: true,
    },
    {
      icon: <MessageSquare className="h-4 w-4 text-blue-600" />,
      title: "Account & Billing",
      description: "Manage your account and subscription",
      articles: 15,
      popular: false,
    },
    {
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: "Certificates",
      description: "Earning and downloading certificates",
      articles: 6,
      popular: false,
    },
  ];

  const popularArticles = [
    {
      title: "How to start your first course",
      views: "12.5k views",
      rating: 4.9,
      readTime: "3 min read",
      category: "Getting Started",
    },
    {
      title: "Understanding the code editor",
      views: "8.2k views",
      rating: 4.8,
      readTime: "5 min read",
      category: "Course Navigation",
    },
    {
      title: "Downloading your certificate",
      views: "6.1k views",
      rating: 4.7,
      readTime: "2 min read",
      category: "Certificates",
    },
    {
      title: "Changing your subscription plan",
      views: "5.8k views",
      rating: 4.6,
      readTime: "4 min read",
      category: "Account & Billing",
    },
  ];

  const videoTutorials = [
    {
      title: "Platform Overview - Getting Started",
      duration: "5:30",
      thumbnail: "/hero1.png",
      views: "15.2k",
    },
    {
      title: "Your First JavaScript Course",
      duration: "8:45",
      thumbnail: "/hero1.png",
      views: "12.8k",
    },
    {
      title: "Using the Interactive Code Editor",
      duration: "6:20",
      thumbnail: "/hero1.png",
      views: "9.5k",
    },
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking the 'Forgot Password' link on the login page. Enter your email address and we'll send you a reset link.",
    },
    {
      question: "Can I download course materials?",
      answer:
        "Yes! Most course materials including PDFs, code samples, and resources can be downloaded from the course dashboard for offline access.",
    },
    {
      question: "How long do I have access to courses?",
      answer:
        "With an active subscription, you have unlimited access to all courses. Even after canceling, you retain access until your current billing period ends.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team for a full refund.",
    },
    {
      question: "Can I switch between subscription plans?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect at your next billing cycle.",
    },
    {
      question: "Are certificates recognized by employers?",
      answer:
        "Our certificates are industry-recognized and can be shared on LinkedIn, included in resumes, and used to demonstrate your skills to employers.",
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Help Center
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
                Find answers, learn how to use our platform, and get the most
                out of your coding journey.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for help articles, tutorials, or FAQs..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Help Categories */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {helpCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200  shadow-sm p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300 group cursor-pointer relative"
                >
                  {category.popular && (
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-blue-50  group-hover:bg-blue-100 transition-all duration-300">
                      {category.icon}
                    </div>
                  </div>

                  <h3 className="font-semibold mb-2 text-gray-900 text-center text-sm">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-xs text-center mb-2">
                    {category.description}
                  </p>
                  <div className="text-center">
                    <span className="text-blue-600 text-xs font-medium">
                      {category.articles} articles
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Popular Articles */}
              <div className="bg-white border border-gray-200  shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Popular Articles
                </h3>
                <div className="space-y-3">
                  {popularArticles.map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100  transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            {article.rating}
                          </span>
                        </div>
                        <span className="text-xs text-blue-600">
                          {article.category}
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Tutorials & FAQs Side by Side */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Video Tutorials */}
                <div className="bg-white border border-gray-200  shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <PlayCircle className="h-4 w-4 text-blue-600" />
                    Video Tutorials
                  </h3>
                  <div className="space-y-3">
                    {videoTutorials.map((video, index) => (
                      <div
                        key={index}
                        className="bg-gray-50  overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex gap-3 p-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-20 h-14 bg-gray-200 rounded flex items-center justify-center">
                              <PlayCircle className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm truncate">
                              {video.title}
                            </h4>
                            <span className="text-xs text-gray-600">
                              {video.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-white border border-gray-200  shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border border-gray-200  overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 text-sm">
                            {faq.question}
                          </span>
                          {expandedFaq === index ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        {expandedFaq === index && (
                          <div className="px-4 pb-3">
                            <p className="text-gray-700 leading-relaxed text-sm">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white border border-gray-200  shadow-sm p-4">
                <h3 className="text-xs font-semibold mb-3 text-gray-900">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <a
                    href="/contact"
                    className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-50  transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-900 text-sm">Contact Support</span>
                  </a>
                  <a
                    href="/services"
                    className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-50  transition-colors"
                  >
                    <Book className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-900 text-sm">View Services</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-50  transition-colors"
                  >
                    <Download className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-900 text-sm">
                      Download Resources
                    </span>
                  </a>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-white border border-gray-200  shadow-sm p-4">
                <h3 className="text-xs font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Support Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Live Chat</span>
                    <span className="text-blue-600">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Email Support</span>
                    <span className="text-gray-600">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phone Support</span>
                    <span className="text-gray-600">9AM-6PM EST</span>
                  </div>
                </div>
              </div>

              {/* Still Need Help */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200  p-4 text-center">
                <h3 className="font-semibold mb-2 text-gray-900 text-sm">
                  Still Need Help?
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Can't find what you're looking for? Our support team is here
                  to help.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1.5 text-sm font-medium transition-all duration-300 "
                >
                  <MessageSquare className="h-4 w-4" />
                  Get Support
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

export default Help;
