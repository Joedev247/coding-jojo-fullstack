"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Code2,
  Zap,
  BookOpen,
  Users,
  MessageCircle,
  Trophy,
} from "lucide-react";
import Image from "next/image";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compact FAQs data for CODING JOJO (reduced for better fit)
  const faqs = useMemo(
    () => [
      {
        question: "How does CODING JOJO's AI learning work?",
        answer:
          "Our AI analyzes your coding patterns and creates a personalized curriculum that adapts to your learning speed and style.",
        category: "AI Learning",
        icon: <Zap className="w-4 h-4" />,
        difficulty: "Beginner",
      },
      {
        question: "Do I need coding experience to start?",
        answer:
          "Not at all! Our AI assessment determines your level and creates a customized path from complete beginner to expert.",
        category: "Getting Started",
        icon: <BookOpen className="w-4 h-4" />,
        difficulty: "Beginner",
      },
      {
        question: "What technologies do you teach?",
        answer:
          "JavaScript, Python, React, Node.js, AI/ML, cloud computing, and 50+ modern technologies used by top companies.",
        category: "Courses",
        icon: <Code2 className="w-4 h-4" />,
        difficulty: "All Levels",
      },
      {
        question: "How does the Smart Mentor help?",
        answer:
          "24/7 AI mentor provides instant help, debugging, code reviews, and personalized guidance without spoiling solutions.",
        category: "Mentorship",
        icon: <Users className="w-4 h-4" />,
        difficulty: "All Levels",
      },
      {
        question: "Are certificates industry-recognized?",
        answer:
          "Yes! Our certificates are valued by Google, Microsoft, Amazon, and 500+ companies that actively hire our graduates.",
        category: "Certification",
        icon: <Trophy className="w-4 h-4" />,
        difficulty: "Advanced",
      },
      {
        question: "How long to become job-ready?",
        answer:
          "Most students become job-ready in 6-12 months with our AI-personalized learning paths and hands-on projects.",
        category: "Career",
        icon: <Trophy className="w-4 h-4" />,
        difficulty: "Career",
      },
    ],
    []
  );

  // Optimized handlers with useCallback
  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setOpenIndex(null);
    },
    []
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setOpenIndex(null);
  }, []);

  // Filter FAQs based on search term and category
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchTerm, activeCategory]);

  // Extract unique categories
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(faqs.map((faq) => faq.category)))];
  }, [faqs]);

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "Advanced":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "Career":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      default:
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    }
  };

  // Loading skeleton
  if (!mounted) {
    return (
      <section className="relative overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <div className="h-8  bg-gray-900 rounded animate-pulse mb-4 mx-auto w-48"></div>
            <div className="h-12  bg-gray-900 rounded animate-pulse mb-4 mx-auto max-w-2xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="h-96  bg-gray-900 animate-pulse"></div>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16  bg-gray-900 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative py-16 md:py-24 font-['Inter',sans-serif]">
      {/* <AnimatedBackground /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header for CODING JOJO */}
        <div className="mb-12 md:mb-16 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-semibold backdrop-blur-sm shadow-lg mb-6 border border-pink-500/20">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <HelpCircle className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold">
              Everything You Need to Know
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white mb-4">
            <span className="text-white">Frequently Asked </span>
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
              Questions
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Get instant answers about CODING JOJO's AI-powered learning
            platform, courses, mentorship, and how we help you master coding
            skills faster than ever
          </p>
        </div>

        {/* Main Content Grid - Equal height sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Image Section - KEEP EXACTLY AS IS (4 columns) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 blur-sm opacity-30 group-hover:opacity-60 transition-all duration-500 animate-gradient"></div>

              {/* Main Image Container */}
              <div className="relative   bg-gray-900 overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/hero1.png"
                    alt="CODING JOJO - Students coding together"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sh14WW"
                  />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="  bg-gray-900/80 backdrop-blur-sm p-4 ">
                      <h3 className="text-white font-bold mb-2">
                        Learn with CODING JOJO
                      </h3>
                      <p className="text-gray-300 text-sm">
                        AI-powered learning that adapts to your pace
                      </p>
                      <div className="flex items-center mt-3 gap-2">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-6 h-6 rounded-full border-2 border-gray-900 bg-gradient-to-r ${
                                i === 0
                                  ? "from-pink-500 to-orange-500"
                                  : i === 1
                                  ? "from-blue-500 to-purple-500"
                                  : "from-green-500 to-teal-500"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          50K+ students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="  bg-gray-900/60 backdrop-blur-sm p-4  text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-xs text-gray-400">AI Support</div>
                </div>
                <div className="  bg-gray-900/60 backdrop-blur-sm p-4  text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    95%
                  </div>
                  <div className="text-xs text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact FAQ Section - Right Side (8 columns) - SAME HEIGHT AS LEFT */}
          <div className="lg:col-span-8">
            {/* Compact Container with same height as left section */}
            <div className="  bg-gray-900/60 backdrop-blur-sm h-full max-h-[600px] overflow-hidden">
              {/* Compact Search Bar */}
              <div className="p-4 border-b border-gray-800">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 group-focus-within:text-pink-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2.5 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 focus:border-pink-500/50 text-white placeholder-gray-400 outline-none transition-all duration-300 text-sm"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              {/* Compact Category Filters */}
              <div className="px-4 py-3 border-b border-gray-800">
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact FAQ List with Scroll */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className="group  bg-gray-900/40 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/30 hover:bg-gray-800/60"
                    >
                      <button
                        className="w-full px-4 py-3 flex justify-between items-center text-left"
                        onClick={() => toggleFAQ(index)}
                        aria-expanded={openIndex === index}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {/* Compact Icon */}
                          <div
                            className={`flex-shrink-0 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                              openIndex === index
                                ? "bg-gradient-to-r from-pink-500 to-orange-500"
                                : "bg-gray-700 group-hover:bg-gray-600"
                            }`}
                          >
                            {openIndex === index ? (
                              <Code2 className="w-3.5 h-3.5 text-white" />
                            ) : (
                              React.cloneElement(faq.icon, {
                                className: "w-3.5 h-3.5 text-gray-300",
                              })
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm group-hover:text-pink-400 transition-colors duration-300 truncate">
                              {faq.question}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded border font-medium ${getDifficultyColor(
                                  faq.difficulty
                                )}`}
                              >
                                {faq.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Compact Toggle */}
                        <div
                          className={`flex-shrink-0 ml-2 p-1.5 rounded-full transition-all duration-300 ${
                            openIndex === index
                              ? "bg-gradient-to-r from-pink-500 to-orange-500"
                              : "bg-gray-700 group-hover:bg-gray-600"
                          }`}
                        >
                          {openIndex === index ? (
                            <ChevronUp className="h-3.5 w-3.5 text-white" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-gray-300" />
                          )}
                        </div>
                      </button>

                      {/* Compact Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === index
                            ? "max-h-[200px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 pb-3">
                          <div className="bg-gray-700/30 p-3 border border-gray-600/50">
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-600/30">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  Helpful?
                                </span>
                                <button className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400 hover:bg-green-500/20 transition-colors">
                                  👍
                                </button>
                                <button className="px-2 py-1 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400 hover:bg-red-500/20 transition-colors">
                                  👎
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center mx-auto mb-3">
                      <HelpCircle className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No questions found
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Try different search terms or categories
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setActiveCategory("All");
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Show All FAQs
                    </button>
                  </div>
                )}
              </div>

              {/* Compact Footer */}
              <div className="p-4 border-t border-gray-800 bg-gradient-to-r from-pink-500/5 to-orange-500/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      Need more help?
                    </h4>
                    <p className="text-gray-400 text-xs">
                      24/7 AI mentor available
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg transition-all duration-300">
                    💬 Chat Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #1f2937;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #f97316);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #ea580c);
        }
      `}</style>
    </section>
  );
}
