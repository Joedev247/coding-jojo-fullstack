"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronRight,
  Code,
  Star,
  ArrowRight,
  Cpu,
  Globe,
  Database,
  BarChart,
  Layers,
  Shield,
  Hash,
  TrendingUp,
  Flame,
  Sparkles,
} from "lucide-react";

const TopicButton = ({
  topic,
  icon,
}: {
  topic: string;
  icon?: React.ReactNode;
}) => (
  <button className="group min-w-fit px-8 py-4   bg-gray-900/60 hover:border-pink-500/40 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 whitespace-nowrap text-gray-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden">
    {/* Gradient hover effect */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

    {/* Text content with optional icon */}
    <span className="relative z-10 group-hover:text-pink-500 transition-colors duration-300 flex items-center gap-2">
      {icon && <span className="text-pink-500">{icon}</span>}
      {topic}
    </span>
  </button>
);

// Featured topic with more prominent styling
const FeaturedTopicButton = ({
  topic,
  icon,
}: {
  topic: string;
  icon?: React.ReactNode;
}) => (
  <button className="group min-w-fit px-8 py-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 hover:border-pink-500/60 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 whitespace-nowrap text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden">
    {/* Pulsing background effect */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out animate-pulse" />

    {/* Text content */}
    <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
      {icon && <span className="text-orange-500">{icon}</span>}
      {topic}
      <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
    </span>
  </button>
);

// Enhanced Carousel Row Component
const CarouselRow = ({
  topics,
  rowIndex,
  direction,
  isPaused,
  mounted,
}: {
  topics: { name: string; featured?: boolean; icon?: React.ReactNode }[];
  rowIndex: number;
  direction: "left" | "right";
  isPaused: boolean;
  mounted: boolean;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Clone topics for infinite effect - four times for smoother looping
  const extendedTopics = [...topics, ...topics, ...topics, ...topics];

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!mounted || isPaused || !rowRef.current) {
      stopAnimation();
      return;
    }

    // Variable speed based on row index for visual interest
    const scrollSpeed = 0.5 + rowIndex * 0.25;
    const container = rowRef.current;

    // Animation function
    const animate = () => {
      if (!container) {
        stopAnimation();
        return;
      }

      try {
        if (direction === "left") {
          container.scrollLeft += scrollSpeed;

          // Reset when needed for infinite effect
          if (container.scrollLeft >= (container.scrollWidth / 4) * 3) {
            container.scrollLeft = container.scrollWidth / 4;
          }
        } else {
          container.scrollLeft -= scrollSpeed;

          // Reset when needed for infinite effect
          if (container.scrollLeft <= container.scrollWidth / 4) {
            container.scrollLeft = (container.scrollWidth / 4) * 3;
          }
        }

        animationRef.current = requestAnimationFrame(animate);
      } catch (error) {
        console.error("Animation error:", error);
        stopAnimation();
      }
    };

    // Initialize scrollLeft position
    try {
      if (direction === "left") {
        container.scrollLeft = container.scrollWidth / 4;
      } else {
        container.scrollLeft = (container.scrollWidth / 4) * 3;
      }

      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error("Scroll initialization error:", error);
    }

    return stopAnimation;
  }, [direction, isPaused, rowIndex, mounted, stopAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return stopAnimation;
  }, [stopAnimation]);

  return (
    <div
      className="overflow-x-scroll no-scrollbar flex gap-4 relative"
      ref={rowRef}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Gradient fade effect on sides */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      {extendedTopics.map((topic, index) =>
        topic.featured ? (
          <FeaturedTopicButton
            key={`row${rowIndex}-${index}`}
            topic={topic.name}
            icon={topic.icon}
          />
        ) : (
          <TopicButton
            key={`row${rowIndex}-${index}`}
            topic={topic.name}
            icon={topic.icon}
          />
        )
      )}

      {/* "All topics" button at the end of the third row with enhanced styling */}
      {rowIndex === 2 && (
        <button className="group min-w-fit px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 whitespace-nowrap text-white font-bold text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black flex-shrink-0 transform hover:-translate-y-1">
          <span className="flex items-center gap-2">
            All topics
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </button>
      )}
    </div>
  );
};

const PopularTopics = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced topic list with improved icons
  const topicRows = [
    // Row 1: Web Development
    [
      { name: "React", featured: true, icon: <Code className="w-3.5 h-3.5" /> },
      { name: "Next.js", featured: true },
      { name: "JavaScript", featured: true },
      { name: "TypeScript" },
      { name: "Angular" },
      { name: "Vue.js" },
      { name: "Svelte" },
      { name: "HTML & CSS" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PHP" },
    ],
    // Row 2: Programming & Data
    [
      { name: "Python", featured: true },
      { name: "Java" },
      { name: "C#" },
      { name: "Rust", featured: true },
      { name: "Go" },
      { name: "Swift" },
      { name: "SQL", icon: <Database className="w-3.5 h-3.5" /> },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "GraphQL" },
      { name: "Redis" },
      { name: "Firebase" },
    ],
    // Row 3: Cloud & DevOps + AI/ML
    [
      {
        name: "AI & ML",
        featured: true,
        icon: <Cpu className="w-3.5 h-3.5" />,
      },
      { name: "AWS", icon: <Globe className="w-3.5 h-3.5" /> },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "DevOps" },
      { name: "CI/CD" },
      { name: "Git" },
      { name: "TensorFlow", icon: <Cpu className="w-3.5 h-3.5" /> },
      { name: "PyTorch" },
      { name: "Data Science", icon: <BarChart className="w-3.5 h-3.5" /> },
      { name: "Blockchain" },
      { name: "Cybersecurity", icon: <Shield className="w-3.5 h-3.5" /> },
    ],
  ];

  // Enhanced hover interactions - optimized with useCallback
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    setIsHovered(false);
  }, []);

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="relative overflow-hidden py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <div className="h-8  bg-gray-900 rounded animate-pulse mb-5 w-48"></div>
            <div className="h-16  bg-gray-900 rounded animate-pulse mb-6 max-w-2xl"></div>
            <div className="h-8  bg-gray-900 rounded animate-pulse max-w-xl"></div>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="h-12 w-32  bg-gray-900 animate-pulse"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="relative py-16 md:py-24 font-['Montserrat',sans-serif]">
      {/* <AnimatedBackground /> */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg mb-5 border border-pink-500/20">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold">
              Most searched
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="text-white">Popular </span>
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
              Topics
            </span>
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl">
            Discover the most in-demand coding skills and technologies that are
            shaping the future of software development
          </p>
        </div>

        {/* Enhanced Carousel Container */}
        <div
          className="relative space-y-6 pb-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Visual indicator that hovering pauses the carousel */}
          <div
            className={`absolute inset-0 z-50 pointer-events-none flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="  bg-gray-900/70 px-6 py-3 shadow-lg text-white font-medium backdrop-blur-md transform transition-transform duration-300 scale-100">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                Paused
              </span>{" "}
              - Move mouse away to resume
            </div>
          </div>

          {/* Each row with enhanced styling and different speeds */}
          <CarouselRow
            topics={topicRows[0]}
            rowIndex={0}
            direction="left"
            isPaused={isPaused}
            mounted={mounted}
          />

          <CarouselRow
            topics={topicRows[1]}
            rowIndex={1}
            direction="right"
            isPaused={isPaused}
            mounted={mounted}
          />

          <CarouselRow
            topics={topicRows[2]}
            rowIndex={2}
            direction="left"
            isPaused={isPaused}
            mounted={mounted}
          />
        </div>

        {/* Category Quick Links */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Web Development",
              icon: <Code className="w-5 h-5" />,
              count: 4250,
              color: "from-blue-500 to-cyan-500",
              bgColor: "from-blue-500/10 to-cyan-500/10",
            },
            {
              title: "Mobile Development",
              icon: <Globe className="w-5 h-5" />,
              count: 2180,
              color: "from-green-500 to-teal-500",
              bgColor: "from-green-500/10 to-teal-500/10",
            },
            {
              title: "Data Science",
              icon: <Database className="w-5 h-5" />,
              count: 3120,
              color: "from-purple-500 to-violet-500",
              bgColor: "from-purple-500/10 to-violet-500/10",
            },
            {
              title: "AI & ML",
              icon: <Cpu className="w-5 h-5" />,
              count: 1450,
              color: "from-pink-500 to-orange-500",
              bgColor: "from-pink-500/10 to-orange-500/10",
            },
          ].map((category, index) => (
            <div
              key={index}
              className="flex flex-col p-6   bg-gray-900/50  hover:border-pink-500/20 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
            >
              <div
                className={`self-start rounded-full p-3 bg-gradient-to-r ${category.bgColor} text-white group-hover:scale-110 transition-all duration-300 mb-4`}
              >
                {category.icon}
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-pink-500 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {category.count?.toLocaleString() || 0} courses
              </p>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Popularity</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.ceil(4 + Math.random())
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-600 fill-gray-600"
                        }`}
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center mt-3 text-xs text-white">
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 px-2 py-0.5 rounded text-[10px] mr-2">
                    HOT
                  </span>
                  <span className="text-gray-400">Updated weekly</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-white font-medium">Explore</span>
                <ChevronRight className="w-4 h-4 text-pink-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Trending Technologies Section */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-orange-500/5"></div>
          <div className="relative bg-black/40 backdrop-blur-sm p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <h3 className="text-xl font-bold text-white">
                    Trending Technologies
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Stay ahead of the curve with these rapidly growing
                  technologies
                </p>
              </div>

              <button className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500/20 to-orange-500/20 hover:from-pink-500 hover:to-orange-500 px-4 py-2 transition-all duration-300">
                View all trends
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "Generative AI",
                  growth: "+143%",
                  icon: <Sparkles className="w-4 h-4" />,
                },
                {
                  name: "Web3",
                  growth: "+87%",
                  icon: <Hash className="w-4 h-4" />,
                },
                {
                  name: "Quantum Computing",
                  growth: "+62%",
                  icon: <Cpu className="w-4 h-4" />,
                },
                {
                  name: "AR/VR",
                  growth: "+51%",
                  icon: <Layers className="w-4 h-4" />,
                },
              ].map((trend, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3   bg-gray-900/50 p-4 hover:border-pink-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 text-pink-500">
                    {trend.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-pink-500 transition-colors">
                      {trend.name}
                    </div>
                    <div className="text-xs text-green-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {trend.growth}
                    </div>
                  </div>
                </div>
              ))}
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

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PopularTopics;
