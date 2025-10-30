"use client";

import React from "react";
import {
  Code,
  BookOpen,
  Award,
  Users,
  Zap,
  Shield,
  Globe,
  Headphones,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const Services = () => {
  const mainServices = [
    {
      icon: <Code className="h-6 w-6 text-blue-600" />,
      title: "Interactive Coding Courses",
      description:
        "Learn programming through hands-on exercises with real-time feedback and code review.",
      features: [
        "Step-by-step guided tutorials",
        "Real-time code execution",
        "Automated testing and feedback",
        "Progressive skill building",
      ],
      popular: true,
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: "Comprehensive Learning Paths",
      description:
        "Structured curricula designed to take you from beginner to expert in your chosen technology.",
      features: [
        "Curated learning sequences",
        "Prerequisites tracking",
        "Progress monitoring",
        "Skill assessments",
      ],
      popular: false,
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "Professional Certifications",
      description:
        "Earn industry-recognized certificates to validate your skills and boost your career.",
      features: [
        "Industry-standard assessments",
        "Verified digital certificates",
        "LinkedIn integration",
        "Career advancement tracking",
      ],
      popular: true,
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Community & Mentorship",
      description:
        "Connect with fellow learners, experienced developers, and industry mentors.",
      features: [
        "Peer-to-peer learning",
        "Expert mentorship sessions",
        "Code review community",
        "Networking opportunities",
      ],
      popular: false,
    },
  ];

  const additionalServices = [
    {
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      title: "Live Coding Sessions",
      description:
        "Join live coding workshops and webinars with industry experts.",
      pricing: "Included in Pro plan",
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      title: "Enterprise Solutions",
      description: "Custom training programs for teams and organizations.",
      pricing: "Contact for pricing",
    },
    {
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      title: "Multi-language Support",
      description: "Learn in your preferred language with localized content.",
      pricing: "Free for all users",
    },
    {
      icon: <Headphones className="h-5 w-5 text-blue-600" />,
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team.",
      pricing: "Premium feature",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      avatar: "/testimonial-avatar.jpg",
      quote:
        "The interactive coding courses helped me transition from designer to developer in just 6 months.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Full Stack Engineer",
      company: "StartupXYZ",
      avatar: "/testimonial-avatar.jpg",
      quote:
        "The certification program gave me the credibility I needed to land my dream job.",
      rating: 5,
    },
  ];

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
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                Our Services
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                Comprehensive learning solutions designed to accelerate your
                programming journey and advance your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3  font-medium transition-all duration-300 text-sm shadow-md"
                >
                  <Play className="h-4 w-4" />
                  Start Learning Today
                </a>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-gray-700 px-6 py-3  font-medium border border-blue-200 transition-all duration-300 text-sm"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Services */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              Core Services
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Everything you need to master programming and advance your career
              in technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-blue-200  p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group relative"
              >
                {service.popular && (
                  <div className="absolute -top-2 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 group-hover:bg-blue-100 transition-all duration-300  flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-xs text-gray-600"
                        >
                          <CheckCircle className="h-3 w-3 text-blue-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors text-sm">
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="bg-blue-50 border border-blue-200  p-6 mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">
              Additional Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {additionalServices.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-white  shadow-sm">{service.icon}</div>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 text-sm">
                    {service.title}
                  </h4>
                  <p className="text-gray-700 text-xs mb-2">
                    {service.description}
                  </p>
                  <span className="text-gray-600 text-xs font-medium bg-white px-2 py-1 rounded">
                    {service.pricing}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 text-center">
              What Our Students Say
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-200  p-5 shadow-sm"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3 italic text-sm">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600  p-6 text-center">
            <h3 className="text-xl font-semibold mb-3 text-white">
              Ready to Start Your Journey?
            </h3>
            <p className="text-blue-100 mb-5 max-w-xl mx-auto text-sm">
              Join thousands of developers who have transformed their careers
              with Coding Jojo. Choose the plan that's right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-gray-900 px-6 py-3  font-medium transition-all duration-300 text-sm"
              >
                Get Started Free
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-6 py-3  font-medium border border-blue-500 transition-all duration-300 text-sm"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
