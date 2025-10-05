"use client";

import React, { useState } from "react";
import {
  Headphones,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Zap,
  Shield,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  ExternalLink,
  ArrowRight,
  Star,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Support = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "medium",
    category: "technical",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportOptions = [
    {
      icon: <MessageSquare className="h-8 w-8 text-pink-400" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      responseTime: "< 2 minutes",
      recommended: true,
      action: "Start Chat",
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-400" />,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "24/7 Available",
      responseTime: "< 24 hours",
      recommended: false,
      action: "Send Email",
    },
    {
      icon: <Phone className="h-8 w-8 text-green-400" />,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      availability: "Mon-Fri, 9AM-6PM EST",
      responseTime: "Immediate",
      recommended: false,
      action: "Call Now",
    },
  ];

  const supportCategories = [
    {
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      title: "Technical Issues",
      description: "Platform bugs, login problems, course access issues",
      examples: [
        "Can't access courses",
        "Video not loading",
        "Code editor not working",
      ],
    },
    {
      icon: <Users className="h-5 w-5 text-blue-400" />,
      title: "Account Management",
      description: "Account settings, profile updates, password resets",
      examples: [
        "Password reset",
        "Update payment method",
        "Change email address",
      ],
    },
    {
      icon: <Shield className="h-5 w-5 text-green-400" />,
      title: "Billing & Subscriptions",
      description: "Payment issues, subscription changes, refund requests",
      examples: ["Billing questions", "Cancel subscription", "Upgrade plan"],
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-purple-400" />,
      title: "Course Support",
      description: "Course content questions, learning path guidance",
      examples: [
        "Course recommendations",
        "Certificate issues",
        "Progress tracking",
      ],
    },
  ];

  const statusOptions = [
    {
      status: "All Systems Operational",
      color: "text-green-400",
      icon: <CheckCircle className="h-4 w-4 text-green-400" />,
      services: [
        { name: "Learning Platform", status: "operational" },
        { name: "Video Streaming", status: "operational" },
        { name: "Code Editor", status: "operational" },
        { name: "Payment Processing", status: "operational" },
      ],
    },
  ];

  const recentUpdates = [
    {
      date: "2 hours ago",
      title: "Performance Improvements",
      description: "Improved video loading speeds across all courses",
      type: "improvement",
    },
    {
      date: "1 day ago",
      title: "New Feature: Code Snippets",
      description: "Added ability to save and share code snippets",
      type: "feature",
    },
    {
      date: "3 days ago",
      title: "Security Update",
      description: "Enhanced platform security with additional encryption",
      type: "security",
    },
  ];

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Reset form
    setTicketForm({
      subject: "",
      priority: "medium",
      category: "technical",
      description: "",
    });
  };

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
                  <Headphones className="h-12 w-12 text-pink-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Support Center
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're here to help you succeed. Get instant support, track your
                tickets, and stay updated on platform status.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Support Options */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-white text-center">
              Choose Your Support Method
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className={`  bg-gray-900/60 backdrop-blur-sm border ${
                    option.recommended
                      ? "border-pink-500/50"
                      : "border-gray-700/50"
                  } p-6 hover:border-pink-500/30 transition-all duration-300 group relative`}
                >
                  {option.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gray-700/50 group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-orange-500/20 transition-all duration-300">
                        {option.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {option.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {option.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">
                          {option.availability}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-gray-300">
                          Response: {option.responseTime}
                        </span>
                      </div>
                    </div>

                    <button
                      className={`w-full px-4 py-3 font-medium transition-all duration-300 ${
                        option.recommended
                          ? "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white"
                          : "bg-gray-800/60 hover:bg-gray-700/60 text-white border border-gray-600"
                      }`}
                    >
                      {option.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Support Categories */}
              <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
                <h3 className="text-xl font-semibold mb-6 text-white">
                  Common Support Topics
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {supportCategories.map((category, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/40 p-6 hover:bg-gray-800/60 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-gray-700/50">
                          {category.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {category.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2">
                          Common issues:
                        </p>
                        <ul className="space-y-1">
                          {category.examples.map((example, exampleIndex) => (
                            <li
                              key={exampleIndex}
                              className="text-xs text-gray-400 flex items-center gap-1"
                            >
                              <div className="w-1 h-1 bg-pink-400 rounded-full flex-shrink-0"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Support Ticket */}
              <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
                <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Send className="h-5 w-5 text-pink-400" />
                  Create Support Ticket
                </h3>

                <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white"
                      >
                        <option value="technical">Technical Issues</option>
                        <option value="account">Account Management</option>
                        <option value="billing">Billing & Subscriptions</option>
                        <option value="course">Course Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            priority: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          subject: e.target.value,
                        })
                      }
                      placeholder="Brief description of your issue"
                      className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={ticketForm.description}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Please provide detailed information about your issue..."
                      rows={5}
                      className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Ticket...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Create Ticket
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Status */}
              <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  System Status
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">
                    All Systems Operational
                  </span>
                </div>

                <div className="space-y-3">
                  {statusOptions[0].services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-300 text-sm">
                        {service.name}
                      </span>
                      <span className="text-green-400 text-xs">
                        Operational
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-1 mt-4"
                >
                  View Status Page
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Recent Updates */}
              <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Recent Updates
                </h3>
                <div className="space-y-4">
                  {recentUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-pink-500/30 pl-4"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">
                          {update.date}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            update.type === "feature"
                              ? "bg-blue-500/20 text-blue-400"
                              : update.type === "security"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {update.type}
                        </span>
                      </div>
                      <h4 className="text-white text-sm font-medium mb-1">
                        {update.title}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {update.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-pink-500/20 p-6">
                <h3 className="font-semibold mb-4 text-white">
                  Need Quick Help?
                </h3>
                <div className="space-y-3">
                  <a
                    href="/help"
                    className="flex items-center justify-between text-sm text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    Help Center
                    <ArrowRight className="h-3 w-3" />
                  </a>
                  <a
                    href="/contact"
                    className="flex items-center justify-between text-sm text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    Contact Us
                    <ArrowRight className="h-3 w-3" />
                  </a>
                  <a
                    href="/community"
                    className="flex items-center justify-between text-sm text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    Community Forum
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;
