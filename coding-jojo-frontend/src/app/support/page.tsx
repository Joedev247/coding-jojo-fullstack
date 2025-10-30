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
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      responseTime: "< 2 minutes",
      recommended: true,
      action: "Start Chat",
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "24/7 Available",
      responseTime: "< 24 hours",
      recommended: false,
      action: "Send Email",
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
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
      icon: <Zap className="h-4 w-4 text-blue-600" />,
      title: "Technical Issues",
      description: "Platform bugs, login problems, course access issues",
      examples: [
        "Can't access courses",
        "Video not loading",
        "Code editor not working",
      ],
    },
    {
      icon: <Users className="h-4 w-4 text-blue-600" />,
      title: "Account Management",
      description: "Account settings, profile updates, password resets",
      examples: [
        "Password reset",
        "Update payment method",
        "Change email address",
      ],
    },
    {
      icon: <Shield className="h-4 w-4 text-blue-600" />,
      title: "Billing & Subscriptions",
      description: "Payment issues, subscription changes, refund requests",
      examples: ["Billing questions", "Cancel subscription", "Upgrade plan"],
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-blue-600" />,
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
      color: "text-blue-400",
      icon: <CheckCircle className="h-4 w-4 text-blue-400" />,
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-white border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Headphones className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Support Center
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We're here to help you succeed. Get instant support, track your
                tickets, and stay updated on platform status.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Support Options */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
              Choose Your Support Method
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className={`bg-white border ${
                    option.recommended
                      ? "border-blue-300"
                      : "border-gray-200"
                  }  shadow-sm p-4 hover:border-blue-400 hover:shadow-md transition-all duration-300 group relative`}
                >
                  {option.recommended && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-blue-50  group-hover:bg-blue-100 transition-all duration-300">
                        {option.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {option.description}
                    </p>

                    <div className="space-y-1 mb-4">
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-blue-600" />
                        <span className="text-gray-700">
                          {option.availability}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <Zap className="h-3 w-3 text-blue-600" />
                        <span className="text-gray-700">
                          Response: {option.responseTime}
                        </span>
                      </div>
                    </div>

                    <button
                      className={`w-full px-3 py-2 font-medium transition-all duration-300  text-sm ${
                        option.recommended
                          ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
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
              <div className="bg-white border border-gray-200  shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Common Support Topics
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {supportCategories.map((category, index) => (
                    <div
                      key={index}
                      className="bg-gray-50  p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-2 mb-3">
                        <div className="p-1.5 bg-blue-100 rounded">
                          {category.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                            {category.title}
                          </h4>
                          <p className="text-gray-600 text-xs">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-2">
                          Common issues:
                        </p>
                        <ul className="space-y-1">
                          {category.examples.map((example, exampleIndex) => (
                            <li
                              key={exampleIndex}
                              className="text-xs text-gray-700 flex items-center gap-1"
                            >
                              <div className="w-1 h-1 bg-blue-600 rounded-full flex-shrink-0"></div>
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
              <div className="bg-white border border-gray-200  shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <Send className="h-4 w-4 text-blue-600" />
                  Create Support Ticket
                </h3>

                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 text-sm"
                      >
                        <option value="technical">Technical Issues</option>
                        <option value="account">Account Management</option>
                        <option value="billing">Billing & Subscriptions</option>
                        <option value="course">Course Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 text-sm"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      rows={4}
                      className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 resize-none text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 font-medium transition-all duration-300 flex items-center gap-2  text-sm"
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
              <div className="bg-white border border-gray-200  shadow-sm p-4">
                <h3 className="text-xs font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  System Status
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-600 font-medium text-sm">
                    All Systems Operational
                  </span>
                </div>

                <div className="space-y-2">
                  {statusOptions[0].services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 text-sm">
                        {service.name}
                      </span>
                      <span className="text-blue-600 text-xs">
                        Operational
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mt-3"
                >
                  View Status Page
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Recent Updates */}
              <div className="bg-white border border-gray-200  shadow-sm p-4">
                <h3 className="text-xs font-semibold mb-3 text-gray-900">
                  Recent Updates
                </h3>
                <div className="space-y-3">
                  {recentUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-300 pl-3"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-600">
                          {update.date}
                        </span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            update.type === "feature"
                              ? "bg-blue-100 text-blue-700"
                              : update.type === "security"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {update.type}
                        </span>
                      </div>
                      <h4 className="text-gray-900 text-sm font-medium mb-1">
                        {update.title}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {update.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200  p-4">
                <h3 className="font-semibold mb-3 text-gray-900 text-sm">
                  Need Quick Help?
                </h3>
                <div className="space-y-2">
                  <a
                    href="/help"
                    className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Help Center
                    <ArrowRight className="h-3 w-3" />
                  </a>
                  <a
                    href="/contact"
                    className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Contact Us
                    <ArrowRight className="h-3 w-3" />
                  </a>
                  <a
                    href="/community"
                    className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 transition-colors"
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
