"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Sparkles,
  Brain,
  BookOpen,
  Code,
  Bot,
  TrendingUp,
  CheckCircle,
  Users,
  Laptop,
  Database,
  Cloud,
  Terminal,
  Server,
  GitBranch,
  Key,
  Globe,
  ArrowRight,
  Star,
  X,
} from "lucide-react";
import FallbackImage from "../ui/FallbackImage";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [codeSnippets, setCodeSnippets] = useState<
    Array<{ top: string; left: string; transform: string; code: string }>
  >([]);
  const [mounted, setMounted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = [
    {
      title: "AI-Powered Learning",
      description: "Smart, personalized pathway to master coding",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "#FF6B6B",
      secondaryColor: "#FFA500",
      visual: "ai-learning",
    },
    {
      title: "Interactive Coding",
      description: "Real-time feedback as you code and learn",
      icon: <Code className="h-8 w-8 text-white" />,
      color: "#9C27B0",
      secondaryColor: "#FF6B6B",
      visual: "code-editor",
    },
    {
      title: "Smart Mentor",
      description: "24/7 guidance from our intelligent assistant",
      icon: <Bot className="h-8 w-8 text-white" />,
      color: "#FFA500",
      secondaryColor: "#FF6B6B",
      visual: "ai-assistant",
    },
  ];

  // Tech stack items
  const techStack = [
    {
      name: "JavaScript",
      icon: <Code className="h-4 w-4" />,
      color: "#F7DF1E",
    },
    { name: "React", icon: <Globe className="h-4 w-4" />, color: "#61DAFB" },
    { name: "Node.js", icon: <Server className="h-4 w-4" />, color: "#339933" },
    {
      name: "Python",
      icon: <Terminal className="h-4 w-4" />,
      color: "#3776AB",
    },
    { name: "Git", icon: <GitBranch className="h-4 w-4" />, color: "#F05032" },
    { name: "API", icon: <Key className="h-4 w-4" />, color: "#6236FF" },
  ];

  // Generate static code snippets
  useEffect(() => {
    if (mounted) {
      const snippets = Array(15)
        .fill(0)
        .map(() => ({
          top: `${Math.floor(Math.random() * 100)}%`,
          left: `${Math.floor(Math.random() * 100)}%`,
          transform: `rotate(${Math.floor(Math.random() * 90 - 45)}deg)`,
          code: `{code: ${Math.random().toString(36).substring(2, 7)}}`,
        }));
      setCodeSnippets(snippets);
    }
  }, [mounted]);

  // Auto-change slide every 5 seconds
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, mounted]);

  // For slide indicators
  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);
  if (!mounted) {
    return (
      <div className="relative overflow-hidden py-16 md:py-24 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="h-8 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-24 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="h-[600px] bg-gray-800  animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="relative py-16 md:py-24">
      {/* <AnimatedBackground /> */}

      {/* Animated code snippets - Now client-side only */}
      <div
        className={`absolute inset-0 opacity-10 transition-all duration-500 ${isVideoPlaying ? "blur-sm" : ""
          }`}
      >
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="absolute text-gray-500 font-mono text-xs opacity-30"
            style={{
              top: snippet.top,
              left: snippet.left,
              transform: snippet.transform,
            }}
          >
            {snippet.code}
          </div>
        ))}
      </div>

      <div
        className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative transition-all duration-500 ${isVideoPlaying ? "blur-sm" : ""
          }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-medium border border-pink-500/20 backdrop-blur-sm shadow-lg">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                Welcome to Coding Jojo
              </span>
            </div>
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight">
                <span className="text-black dark:text-white">Master New </span>
                <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                  Skills Today
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Elevate your career with our{" "}
                <span className="text-pink-400 font-medium">expert-led</span>{" "}
                courses, hands-on projects, and{" "}
                <span className="text-orange-400 font-medium">
                  personalized
                </span>{" "}
                learning paths.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  value: "500+",
                  label: "Courses",
                  icon: <BookOpen className="h-5 w-5 text-pink-400" />,
                },
                {
                  value: "50K+",
                  label: "Students",
                  icon: <Users className="h-5 w-5 text-orange-400" />,
                },
                {
                  value: "96%",
                  label: "Success Rate",
                  icon: <TrendingUp className="h-5 w-5 text-pink-400" />,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl p-4 text-center hover:border-pink-500/30 transition duration-300"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-black dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>{" "}
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="relative group overflow-hidden bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:shadow-pink-500/30 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group flex items-center gap-3 bg-gray-700 backdrop-blur-sm px-6 py-3 text-lg font-medium text-gray-300 shadow-md hover:border-pink-500/30 transition-all duration-300 hover:shadow-pink-500/10 hover:shadow-lg"
              >
                <div className="h-8 w-8 bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                  <Play className="w-4 h-4 text-pink-400" />
                </div>
                Watch Demo
              </button>
            </div>
            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: <CheckCircle className="h-4 w-4" />,
                  text: "Certified Courses",
                },
                { icon: <Bot className="h-4 w-4" />, text: "AI Mentor" },
                {
                  icon: <Star className="h-4 w-4" />,
                  text: "Expert Instructors",
                },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-sm bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-300 hover:border-pink-500/30 hover:scale-105 transition-all duration-300"
                >
                  <div className="text-pink-400">{badge.icon}</div>
                  {badge.text}
                </div>
              ))}
            </div>
            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-gray-800/70 text-gray-300 text-xs backdrop-blur-sm transition-all hover:scale-105 hover:border-pink-500/30"
                  style={{ boxShadow: `0 0 10px ${tech.color}30` }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${tech.color}20`,
                      color: tech.color,
                    }}
                  >
                    {tech.icon}
                  </div>
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Showcase */}
          <div className="relative h-[500px] z-10">
            {/* Glass Container */}
            <div className="absolute inset-0 overflow-hidden backdrop-blur-sm shadow-xl">
              {/* Decorative elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-500/20 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-orange-500/20 blur-3xl"></div>
            </div>

            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${activeSlide === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
                  }`}
              >
                {/* Feature Badge */}
                <div
                  className="absolute top-5 left-5 z-10 px-4 py-2 flex items-center gap-2 backdrop-blur-sm transition-all duration-500"
                  style={{
                    backgroundColor: `${slide.color}20`,
                    borderColor: `${slide.color}30`,
                    borderWidth: "1px",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`,
                    }}
                  >
                    {slide.icon}
                  </div>
                  <span
                    className="font-medium"
                    style={{
                      color: slide.color,
                    }}
                  >
                    {slide.title}
                  </span>
                </div>

                {/* Main Visual Based on Slide Type */}
                {slide.visual === "ai-learning" && (
                  <div className="relative w-full h-full p-6 pt-16">
                    {/* Main Element - Learning Path */}
                    <div className="absolute right-25 top-20 max-w-md bg-gray-800/90 shadow-2xl border border-gray-700/50 overflow-hidden animate-slide-left transition-all duration-700 ease-out backdrop-blur-sm">
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-pink-500" />
                          AI Learning Path
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Personalized for your skill level and goals
                        </p>

                        <div className="space-y-4">
                          {[
                            {
                              title: "JavaScript Fundamentals",
                              desc: "Variables, functions, and objects",
                              icon: <Code />,
                              progress: 100,
                              color: "#FF6B6B",
                            },
                            {
                              title: "DOM Manipulation",
                              desc: "Selecting and modifying HTML elements",
                              icon: <Laptop />,
                              progress: 72,
                              color: "#FF6B6B",
                            },
                            {
                              title: "Async JavaScript",
                              desc: "Promises, async/await, and fetch API",
                              icon: <Cloud />,
                              progress: 24,
                              color: "#FF6B6B",
                            },
                            {
                              title: "React Fundamentals",
                              desc: "Components, props, and state",
                              icon: <Database />,
                              progress: 0,
                              color: "#FF6B6B",
                            },
                          ].map((module, i) => (
                            <div key={i} className="relative">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-10 h-10  flex items-center justify-center ${module.progress === 100
                                    ? "bg-green-500"
                                    : module.progress > 0
                                      ? "bg-opacity-20"
                                      : "bg-gray-700"
                                    }`}
                                  style={{
                                    backgroundColor:
                                      module.progress > 0 &&
                                        module.progress < 100
                                        ? "#FF6B6B"
                                        : module.progress === 0
                                          ? "rgba(55, 65, 81, 1)"
                                          : "#22c55e",
                                  }}
                                >
                                  <div className="w-5 h-5 text-white">
                                    {module.progress === 100 ? (
                                      <CheckCircle className="w-5 h-5" />
                                    ) : (
                                      module.icon
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-white">
                                      {module.title}
                                    </h4>
                                    <span className="text-xs font-medium text-gray-300">
                                      {module.progress}%
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-400 mb-1.5">
                                    {module.desc}
                                  </p>
                                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full transition-all duration-500"
                                      style={{
                                        width: module.progress + "%",
                                        backgroundColor:
                                          module.progress === 100
                                            ? "#22c55e"
                                            : "#FF6B6B",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              {i < 3 && (
                                <div className="absolute left-5 top-12 w-px h-6 bg-gray-700"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="px-5 py-3 bg-gray-700/50 border-t border-gray-700 flex justify-between items-center">
                        <div className="text-sm text-gray-300">
                          Estimated completion: 4 weeks
                        </div>
                        <button className="text-sm font-medium  px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-all duration-300">
                          Continue Learning
                        </button>
                      </div>
                    </div>

                    {/* Top Floating Element */}
                    <div className="absolute top-24 z-10 p-4 bg-gray-800/90 shadow-xl border border-gray-700/50 w-64 animate-slide-up-fade transition-all duration-700 ease-out delay-100 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10  flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">
                            Your Learning Path
                          </div>
                          <div className="text-lg font-bold text-white">
                            JavaScript Master
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full animate-pulse bg-gradient-to-r from-pink-500 to-orange-500"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-400">Progress: 65%</span>
                        <span className="font-medium text-gray-300">
                          23/35 Lessons
                        </span>
                      </div>
                    </div>

                    {/* Bottom Floating Element - Stats */}
                    <div className="absolute mt-90 animate-slide-up transition-all duration-700 ease-out delay-300">
                      <div className="p-4 shadow-lg backdrop-blur-sm bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30">
                        <div className="flex items-center gap-3 text-white">
                          <div className="w-12 h-12 bg-white/20  flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-white/80">
                              Your Learning Speed
                            </div>
                            <div className="text-2xl font-bold">
                              +27% faster
                            </div>
                            <div className="text-xs text-white/80">
                              than average learner
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Code snippet decoration */}
                    <div className="absolute -bottom-10 -right-5 text-white/5 font-mono text-xs transform rotate-12">
                      <pre>
                        {`function learnCoding() {
  const skills = ['JavaScript', 'React', 'Node'];
  return skills.map(skill => master(skill));
}`}
                      </pre>
                    </div>
                  </div>
                )}

                {slide.visual === "code-editor" && (
                  <div className="relative w-full h-full p-6 pt-16">
                    {/* Floating Code Editor */}
                    <div className="absolute right-25 top-24 max-w-md bg-gray-900 shadow-2xl overflow-hidden animate-slide-left transition-all duration-700 ease-out border border-gray-700/50">
                      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Code className="w-4 h-4" />
                          script.js
                        </div>
                        <div></div>
                      </div>
                      <div className="p-4 font-mono text-sm relative">
                        {/* Line numbers */}
                        <div className="absolute left-2 top-4 text-gray-600 text-xs">
                          {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-5 flex items-center">
                              {i + 1}
                            </div>
                          ))}
                        </div>
                        <pre className="text-gray-300 pl-6">
                          <span className="text-blue-400">function</span>{" "}
                          <span className="text-green-400">calculateTotal</span>
                          <span className="text-yellow-500">(</span>items
                          <span className="text-yellow-500">)</span>{" "}
                          <span className="text-yellow-500">{"{"}</span>
                          <br /> <span className="text-blue-400">
                            return
                          </span>{" "}
                          items.<span className="text-green-400">reduce</span>
                          <span className="text-yellow-500">((</span>total, item
                          <span className="text-yellow-500">)</span>{" "}
                          <span className="text-blue-400">={">"}</span>{" "}
                          <span className="text-yellow-500">{"{"}</span>
                          <br /> <span className="text-blue-400">
                            return
                          </span>{" "}
                          total + item.price * item.quantity;
                          <br /> <span className="text-yellow-500">
                            {"}"}
                          </span>, <span className="text-purple-400">0</span>
                          <span className="text-yellow-500">)</span>;
                          <br />
                          <span className="text-yellow-500">{"}"}</span>
                          <br />
                          <br />
                          <span className="text-blue-400">const</span>{" "}
                          shoppingCart ={" "}
                          <span className="text-yellow-500">[</span>
                          <br /> <span className="text-yellow-500">
                            {"{"}
                          </span>{" "}
                          name: <span className="text-green-400">"Laptop"</span>
                          , price: <span className="text-purple-400">999</span>,
                          quantity: <span className="text-purple-400">1</span>{" "}
                          <span className="text-yellow-500">{"}"}</span>,
                          <br /> <span className="text-yellow-500">
                            {"{"}
                          </span>{" "}
                          name:{" "}
                          <span className="text-green-400">"Headphones"</span>,
                          price: <span className="text-purple-400">99</span>,
                          quantity: <span className="text-purple-400">2</span>{" "}
                          <span className="text-yellow-500">{"}"}</span>,
                          <br /> <span className="text-yellow-500">
                            {"{"}
                          </span>{" "}
                          name: <span className="text-green-400">"Mouse"</span>,
                          price: <span className="text-purple-400">29</span>,
                          quantity: <span className="text-purple-400">1</span>{" "}
                          <span className="text-yellow-500">{"}"}</span>
                          <br />
                          <span className="text-yellow-500">]</span>;
                          <br />
                          <br />
                          <span className="text-blue-400">const</span> total ={" "}
                          <span className="text-green-400">calculateTotal</span>
                          <span className="text-yellow-500">(</span>shoppingCart
                          <span className="text-yellow-500">)</span>;
                          <br />
                          <span className="text-green-400">console</span>.
                          <span className="text-blue-400">log</span>
                          <span className="text-yellow-500">(</span>
                          <span className="text-green-400">
                            Total: $${"{"}total{"}"}
                          </span>
                          <span className="text-yellow-500">)</span>;
                        </pre>

                        {/* Cursor blinking effect */}
                        <div className="absolute h-5 w-1 bg-white/70 bottom-4 left-[216px] animate-blink"></div>
                      </div>

                      {/* Status bar */}
                      <div className="bg-gray-800 px-4 py-1 border-t border-gray-700 flex justify-between items-center text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />
                            <span>main</span>
                          </div>
                          <div>JavaScript</div>
                        </div>
                        <div>UTF-8</div>
                      </div>
                    </div>

                    {/* AI Feedback Card */}
                    <div className="absolute top-25 bg-white shadow-xl border border-gray-200 max-w-xs animate-slide-up transition-all duration-700 ease-out delay-200 backdrop-blur-sm">
                      <div className="h-2 rounded-t-lg bg-gradient-to-r from-pink-500 to-orange-500"></div>
                      <div className="p-4">
                        <div className="flex items-right gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            Code Mentor AI
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">
                          Great job using reduce! One optimization: consider
                          destructuring in the parameter:
                        </p>

                        <div className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-800 mb-3 border border-gray-200">
                          <span className="text-blue-400">
                            ({"{"}price, quantity{"}"})
                          </span>{" "}
                          =&gt; total + price * quantity
                        </div>

                        <div className="flex justify-between">
                          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                            Dismiss
                          </button>
                          <button className="text-xs font-medium text-pink-500 hover:text-pink-600 transition-colors">
                            Apply Fix
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slide.visual === "ai-assistant" && (
                  <div className="relative w-full h-full p-6 pt-16">
                    {/* Chat Interface */}
                    <div className="absolute right-6 top-20 max-w-md bg-gray-900 shadow-2xl overflow-hidden border border-gray-700/50 animate-slide-left transition-all duration-700 ease-out">
                      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-bold">
                              Coding Mentor
                            </div>
                            <div className="text-xs text-gray-400">
                              Always online
                            </div>
                          </div>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 text-white">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 5L5 19M5 5L19 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="h-80 overflow-y-auto p-4 space-y-4">
                        {/* AI Message */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border border-gray-700 flex-shrink-0">
                            <Bot className="w-4 h-4 text-gray-300" />
                          </div>
                          <div>
                            <div className="bg-gray-800  p-3 text-sm text-gray-300 max-w-xs">
                              Hi there! I&apos;m your coding mentor. What are
                              you learning today?
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              10:15 AM
                            </div>
                          </div>
                        </div>

                        {/* User Message */}
                        <div className="flex gap-3 justify-end">
                          <div>
                            <div className=" p-3 text-sm text-white max-w-xs bg-gradient-to-r from-pink-500 to-orange-500">
                              I&apos;m trying to understand async/await in
                              JavaScript but getting confused about error
                              handling.
                            </div>
                            <div className="text-xs text-gray-500 mt-1 text-right">
                              10:16 AM
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex-shrink-0 overflow-hidden">
                            <FallbackImage
                              src="/testimonial-avatar.jpg"
                              alt="User"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* AI Message with code */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 border border-gray-700 flex-shrink-0">
                            <Bot className="w-4 h-4 text-gray-300" />
                          </div>
                          <div>
                            <div className="bg-gray-800  p-3 text-sm text-gray-300 max-w-xs">
                              Error handling with async/await uses try/catch
                              blocks. Here&apos;s an example:
                              <div className="mt-2 bg-gray-900 p-2 rounded font-mono text-xs border border-gray-700">
                                <span className="text-blue-400">
                                  async function
                                </span>{" "}
                                <span className="text-green-400">
                                  fetchData
                                </span>
                                () {"{"}
                                <br />
                                &nbsp;&nbsp;
                                <span className="text-blue-400">try</span> {"{"}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="text-blue-400">
                                  const
                                </span>{" "}
                                response ={" "}
                                <span className="text-blue-400">await</span>{" "}
                                fetch(url);
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="text-blue-400">
                                  const
                                </span>{" "}
                                data ={" "}
                                <span className="text-blue-400">await</span>{" "}
                                response.json();
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="text-blue-400">
                                  return
                                </span>{" "}
                                data;
                                <br />
                                &nbsp;&nbsp;{"}"}{" "}
                                <span className="text-blue-400">catch</span>{" "}
                                (error) {"{"}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {"{/* console error */}"}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="text-blue-400">
                                  throw
                                </span>{" "}
                                <span className="text-blue-400">new</span>{" "}
                                Error(
                                <span className="text-green-400">
                                  &apos;Failed to fetch&apos;
                                </span>
                                );
                                <br />
                                &nbsp;&nbsp;{"}"}
                                <br />
                                {"}"}
                              </div>
                              Would you like me to explain how this works?
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              10:17 AM
                            </div>
                          </div>
                        </div>

                        {/* User Message - Typing */}
                        <div className="flex gap-3 justify-end">
                          <div className="bg-gray-800/50  p-3 text-gray-400 text-sm max-w-xs flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse animation-delay-200"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse animation-delay-400"></div>
                          </div>
                          <div className="flex-1 bg-gray-700  px-3 py-2 text-gray-300 flex items-center">
                            <input
                              type="text"
                              placeholder="Ask anything about coding..."
                              className="bg-transparent flex-1 outline-none text-sm"
                            />
                            <div className="flex gap-2">
                              <button className="text-gray-400 hover:text-gray-300">
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              <button className="text-gray-400 hover:text-gray-300">
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <button className="w-10 h-10  flex items-center justify-center shadow-lg bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Learning Progress Card */}
                    <div className="absolute left-6 top-24 bg-gray-800/90 shadow-xl border border-gray-700/50 max-w-xs animate-slide-up transition-all duration-700 ease-out delay-100 backdrop-blur-sm overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">
                              Current Topic
                            </div>
                            <div className="text-lg font-bold text-white">
                              Asynchronous JavaScript
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 mb-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">
                                Current Progress
                              </span>
                              <span className="text-gray-400">
                                7/12 Concepts
                              </span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500"
                                style={{ width: "58%" }}
                              ></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-gray-700/50  p-3 border border-gray-700/30">
                              <div className="text-gray-400 mb-1">
                                Practice Code
                              </div>
                              <div className="font-bold text-white">
                                12 exercises
                              </div>
                            </div>
                            <div className="bg-gray-700/50  p-3 border border-gray-700/30">
                              <div className="text-gray-400 mb-1">
                                Quiz Score
                              </div>
                              <div className="font-bold text-white">85%</div>
                            </div>
                          </div>
                        </div>

                        <button className="w-full py-2  text-white font-medium text-sm bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-all duration-300">
                          Continue Learning
                        </button>
                      </div>

                      <div className="bg-gray-700/30 px-4 py-3 border-t border-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-300">
                            Next: Error Handling
                          </div>
                          <div className="text-sm font-medium text-pink-400">
                            20 min
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skill Badge */}
                    <div className="absolute mt-90 animate-slide-up transition-all duration-700 ease-out delay-200">
                      <div className="flex gap-3">
                        <div className="p-4 shadow-lg backdrop-blur-sm border border-pink-500/20 bg-gradient-to-br from-pink-500/20 to-orange-500/20">
                          <div className="flex items-center gap-3 text-white mb-3">
                            <div className="w-12 h-12 bg-white/20  flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="text-lg font-bold">
                                Learn Together
                              </div>
                              <div className="text-xs text-white/80">
                                87 students online now
                              </div>
                            </div>
                          </div>
                          <button className="w-full py-1.5 text-sm font-medium text-white  bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-all duration-300">
                            Join Study Room
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>{" "}
      </div>
      {/* Video Overlay */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm mt-20">
          <div className="relative w-full h-full max-w-[1400px] max-h-[80vh] mx-4 flex items-center justify-center">
            {/* Secondary Close Button - Top Right Corner of Video */}
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Video Container */}
            <div className="w-full h-full overflow-hidden shadow-2xl border border-gray-700/50">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                onEnded={() => setIsVideoPlaying(false)}
                poster="/image-removebg-preview.png"
              >
                {/* First try to load from public folder */}
                <source src="/demo-video.mp4" type="video/mp4" />
                <source src="/demo-video.webm" type="video/webm" />

                {/* Fallback to external sources */}
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />

                {/* Fallback for browsers that don't support video */}
                <div className="flex items-center justify-center h-full bg-gray-900 text-white">
                  <div className="text-center">
                    <p className="text-lg mb-4">
                      Your browser does not support the video tag.
                    </p>
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-medium hover:from-pink-600 hover:to-orange-600 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </video>
            </div>
            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Coding Jojo Demo - Master Programming Skills
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Discover how our AI-powered platform helps you learn coding
                faster with personalized learning paths, interactive exercises,
                and real-time feedback from expert mentors.
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span>🎯 AI-Powered Learning</span>
                <span>💡 Interactive Coding</span>
                <span>🚀 Career Growth</span>
              </div>
            </div>{" "}
            {/* Loading indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setIsVideoPlaying(false)}
          ></div>
        </div>
      )}

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

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}
