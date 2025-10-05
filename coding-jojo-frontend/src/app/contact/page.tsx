"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Headphones,
  Globe,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-pink-400" />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "support@codingjojo.com",
      action: "mailto:support@codingjojo.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-400" />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-400" />,
      title: "Live Chat",
      description: "Chat with support",
      value: "Available 24/7",
      action: "#",
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-400" />,
      title: "Visit Us",
      description: "Our headquarters",
      value: "1234 Coding Street, Tech City",
      action: "#",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
    { day: "Sunday", hours: "Closed" },
  ];

  const supportChannels = [
    {
      icon: <Headphones className="h-5 w-5 text-pink-400" />,
      title: "Technical Support",
      description: "Help with platform issues and technical questions",
      availability: "24/7",
    },
    {
      icon: <Users className="h-5 w-5 text-blue-400" />,
      title: "Academic Support",
      description: "Assistance with courses and learning paths",
      availability: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <Globe className="h-5 w-5 text-green-400" />,
      title: "Sales & Billing",
      description: "Questions about pricing, subscriptions, and payments",
      availability: "Mon-Fri, 9AM-6PM EST",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
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
                  <MessageSquare className="h-12 w-12 text-pink-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Have questions? Need help? We're here to assist you on your
                coding journey.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 text-center hover:border-pink-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-700/50 group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-orange-500/20 transition-all duration-300">
                    {method.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-white">
                  {method.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
                >
                  {method.value}
                </a>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Send className="h-6 w-6 text-pink-400" />
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-green-500/20 rounded-full">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Message Sent!
                    </h3>
                    <p className="text-gray-300">
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white transition-colors"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="academic">Academic Support</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white transition-colors"
                          placeholder="Brief subject line"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3  bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-pink-500 text-white transition-colors resize-none"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Office Hours */}
              <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-pink-400" />
                  Office Hours
                </h3>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-300 text-sm">
                        {schedule.day}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Channels */}
              <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Support Channels
                </h3>
                <div className="space-y-4">
                  {supportChannels.map((channel, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-gray-700/50 flex-shrink-0">
                        {channel.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm">
                          {channel.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-1">
                          {channel.description}
                        </p>
                        <span className="text-pink-400 text-xs">
                          {channel.availability}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-pink-500/20 p-6 text-center">
                <h3 className="font-semibold mb-2 text-white">
                  Need Quick Help?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Check our FAQ section for instant answers to common questions.
                </p>
                <a
                  href="/help"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-4 py-2 text-sm font-medium transition-all duration-300"
                >
                  Visit Help Center
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

export default Contact;
