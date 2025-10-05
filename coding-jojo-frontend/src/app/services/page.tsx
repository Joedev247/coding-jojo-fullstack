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
      icon: <Code className="h-8 w-8 text-pink-400" />,
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
      icon: <BookOpen className="h-8 w-8 text-blue-400" />,
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
      icon: <Award className="h-8 w-8 text-yellow-400" />,
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
      icon: <Users className="h-8 w-8 text-green-400" />,
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
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      title: "Live Coding Sessions",
      description:
        "Join live coding workshops and webinars with industry experts.",
      pricing: "Included in Pro plan",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Enterprise Solutions",
      description: "Custom training programs for teams and organizations.",
      pricing: "Contact for pricing",
    },
    {
      icon: <Globe className="h-6 w-6 text-cyan-400" />,
      title: "Multi-language Support",
      description: "Learn in your preferred language with localized content.",
      pricing: "Free for all users",
    },
    {
      icon: <Headphones className="h-6 w-6 text-pink-400" />,
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
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 backdrop-blur-sm border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4  bg-gray-900/60 rounded-full">
                  <Code className="h-12 w-12 text-pink-400" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Comprehensive learning solutions designed to accelerate your
                programming journey and advance your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-8 py-4 font-medium transition-all duration-300"
                >
                  <Play className="h-5 w-5" />
                  Start Learning Today
                </a>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2  bg-gray-900/60 hover:bg-gray-700/60 text-white px-8 py-4 font-medium border border-gray-600 transition-all duration-300"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Core Services
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to master programming and advance your career
              in technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 hover:border-pink-500/30 transition-all duration-300 group relative"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700/50 group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-orange-500/20 transition-all duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="text-pink-400 hover:text-pink-300 font-medium flex items-center gap-1 transition-colors">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-white text-center">
              Additional Services
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gray-700/50">{service.icon}</div>
                  </div>
                  <h4 className="font-semibold mb-2 text-white">
                    {service.title}
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">
                    {service.description}
                  </p>
                  <span className="text-pink-400 text-xs font-medium">
                    {service.pricing}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-white text-center">
              What Our Students Say
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50 p-6"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 backdrop-blur-sm border border-pink-500/20 p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their careers
              with Coding Jojo. Choose the plan that's right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-8 py-4 font-medium transition-all duration-300"
              >
                Get Started Free
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2  bg-gray-900/60 hover:bg-gray-700/60 text-white px-8 py-4 font-medium border border-gray-600 transition-all duration-300"
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
