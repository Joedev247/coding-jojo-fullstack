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
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "support@codingjojo.com",
      action: "mailto:support@codingjojo.com",
    },
    {
      icon: <Phone className="h-5 w-5 text-blue-600" />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
      title: "Live Chat",
      description: "Chat with support",
      value: "Available 24/7",
      action: "#",
    },
    {
      icon: <MapPin className="h-5 w-5 text-blue-600" />,
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
      icon: <Headphones className="h-4 w-4 text-blue-600" />,
      title: "Technical Support",
      description: "Help with platform issues and technical questions",
      availability: "24/7",
    },
    {
      icon: <Users className="h-4 w-4 text-blue-600" />,
      title: "Academic Support",
      description: "Assistance with courses and learning paths",
      availability: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <Globe className="h-4 w-4 text-blue-600" />,
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
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-white border-b border-blue-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-full shadow-md border border-blue-200">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                Contact Us
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Have questions? Need help? We're here to assist you on your
                coding journey.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white border border-blue-200  p-4 text-center hover:shadow-md hover:border-blue-300 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-blue-50 group-hover:bg-blue-100 transition-all duration-300 ">
                    {method.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-1 text-gray-900 text-sm">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-xs mb-2">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                >
                  {method.value}
                </a>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-blue-200  p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <Send className="h-5 w-5 text-blue-600" />
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      Message Sent!
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 transition-colors text-sm"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 transition-colors text-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 transition-colors text-sm"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="academic">Academic Support</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 transition-colors text-sm"
                          placeholder="Brief subject line"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 bg-white border border-gray-300  focus:outline-none focus:border-blue-500 text-gray-900 transition-colors resize-none text-sm"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 font-medium transition-all duration-300 flex items-center justify-center gap-2  text-sm"
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
              <div className="bg-white border border-gray-200  shadow-sm p-4">
                <h3 className="text-xs font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Office Hours
                </h3>
                <div className="space-y-2">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700 text-sm">
                        {schedule.day}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Channels */}
              <div className="bg-white border border-gray-200  shadow-sm p-4">
                <h3 className="text-xs font-semibold mb-3 text-gray-900">
                  Support Channels
                </h3>
                <div className="space-y-3">
                  {supportChannels.map((channel, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="p-1.5 bg-blue-50 rounded flex-shrink-0">
                        {channel.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {channel.title}
                        </h4>
                        <p className="text-gray-600 text-xs mb-1">
                          {channel.description}
                        </p>
                        <span className="text-blue-600 text-xs">
                          {channel.availability}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200  p-4 text-center">
                <h3 className="font-semibold mb-2 text-gray-900 text-sm">
                  Need Quick Help?
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Check our FAQ section for instant answers to common questions.
                </p>
                <a
                  href="/help"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1.5 text-sm font-medium transition-all duration-300 "
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
