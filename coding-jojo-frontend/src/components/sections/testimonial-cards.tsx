"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Code,
  Trophy,
  Zap,
  Users,
} from "lucide-react";

const TestimonialSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced testimonials data for CODING JOJO e-learning platform
  const testimonials = useMemo(
    () => [
      {
        id: 1,
        initial: "A",
        author: "Alex Thompson",
        role: "Full Stack Developer",
        company: "Microsoft",
        timeAgo: "1 week ago",
        quote:
          "CODING JOJO's comprehensive courses helped me transition from junior to senior developer in just 8 months. The hands-on projects are incredible!",
        verified: true,
        avatarColor: "from-pink-500 to-orange-500",
        rating: 5,
        completedCourses: 12,
        skillLevel: "Advanced",
      },
      {
        id: 2,
        initial: "M",
        author: "Maria Garcia",
        role: "Data Scientist",
        company: "Google",
        timeAgo: "2 weeks ago",
        quote:
          "The AI and Machine Learning track at CODING JOJO is outstanding. Real-world projects and mentor support made all the difference in my career.",
        verified: true,
        avatarColor: "from-orange-500 to-red-500",
        rating: 5,
        completedCourses: 18,
        skillLevel: "Expert",
      },
      {
        id: 3,
        initial: "D",
        author: "David Kim",
        role: "Frontend Developer",
        company: "Meta",
        timeAgo: "1 month ago",
        quote:
          "From zero coding knowledge to landing my dream job at Meta. CODING JOJO's structured learning path and community support are unmatched!",
        verified: true,
        avatarColor: "from-purple-500 to-pink-500",
        rating: 5,
        completedCourses: 15,
        skillLevel: "Intermediate",
      },
      {
        id: 4,
        initial: "S",
        author: "Sarah Johnson",
        role: "DevOps Engineer",
        company: "Amazon",
        timeAgo: "1 month ago",
        quote:
          "The cloud computing and DevOps courses are incredibly detailed. I gained practical skills that I use daily in my current role at Amazon.",
        verified: true,
        avatarColor: "from-blue-500 to-purple-500",
        rating: 5,
        completedCourses: 9,
        skillLevel: "Advanced",
      },
      {
        id: 5,
        initial: "J",
        author: "James Wilson",
        role: "Mobile Developer",
        company: "Spotify",
        timeAgo: "2 months ago",
        quote:
          "The React Native and Flutter courses at CODING JOJO gave me the skills to build professional mobile apps. Now I'm developing for millions of users!",
        verified: true,
        avatarColor: "from-teal-500 to-blue-500",
        rating: 5,
        completedCourses: 11,
        skillLevel: "Advanced",
      },
      {
        id: 6,
        initial: "E",
        author: "Emily Chen",
        role: "Cybersecurity Analyst",
        company: "Tesla",
        timeAgo: "2 months ago",
        quote:
          "CODING JOJO's cybersecurity bootcamp prepared me for real-world challenges. The ethical hacking labs were particularly engaging and practical.",
        verified: true,
        avatarColor: "from-green-500 to-teal-500",
        rating: 5,
        completedCourses: 7,
        skillLevel: "Intermediate",
      },
    ],
    []
  );

  const totalSlides = testimonials.length;
  const slidesToShow = useMemo(() => {
    if (!mounted) return 3;
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }, [mounted]);

  // Handle slide change with animation lock
  const handleSlideChange = useCallback(
    (newIndex: number) => {
      if (animating) return;

      setAnimating(true);
      setActiveSlide(newIndex);

      setTimeout(() => {
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  // Navigation functions
  const nextSlide = useCallback(() => {
    const maxSlide = totalSlides - slidesToShow;
    const newIndex = activeSlide >= maxSlide ? 0 : activeSlide + 1;
    handleSlideChange(newIndex);
  }, [activeSlide, totalSlides, slidesToShow, handleSlideChange]);

  const prevSlide = useCallback(() => {
    const maxSlide = totalSlides - slidesToShow;
    const newIndex = activeSlide <= 0 ? maxSlide : activeSlide - 1;
    handleSlideChange(newIndex);
  }, [activeSlide, totalSlides, slidesToShow, handleSlideChange]);

  const goToSlide = useCallback(
    (index: number) => {
      handleSlideChange(index);
    },
    [handleSlideChange]
  );

  // Get skill level color
  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-400 bg-green-500/10";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-500/10";
      case "Advanced":
        return "text-orange-400 bg-orange-500/10";
      case "Expert":
        return "text-pink-400 bg-pink-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <div className="h-8  bg-gray-900 rounded animate-pulse mb-4 mx-auto w-48"></div>
            <div className="h-12  bg-gray-900 rounded animate-pulse mb-4 mx-auto max-w-2xl"></div>
            <div className="h-6  bg-gray-900 rounded animate-pulse mx-auto max-w-xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-80  bg-gray-900  animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
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
              <Star className="h-3 w-3 text-white fill-white" />
            </div>
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold">
              Student Success Stories
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white mb-4">
            <span className="text-white">Transforming Careers at </span>
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
              CODING JOJO
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Join thousands of developers who've landed their dream jobs through
            our comprehensive coding bootcamps and mentorship programs
          </p>

          {/* Enhanced Stats */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="  bg-gray-900/60 backdrop-blur-sm p-4 hover:border-pink-500/30 transition-all duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                4.9★
              </div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="  bg-gray-900/60 backdrop-blur-sm p-4 hover:border-pink-500/30 transition-all duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-sm text-gray-400">Students Enrolled</div>
            </div>
            <div className="  bg-gray-900/60 backdrop-blur-sm p-4 hover:border-pink-500/30 transition-all duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-sm text-gray-400">Job Placement</div>
            </div>
          </div>
        </div>

        {/* Compact Testimonial Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={animating}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20   bg-gray-900/90 hover:border-pink-500/50 rounded-full shadow-xl p-3 backdrop-blur-sm transition-all duration-300 group ${
              animating
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-pink-500/20 hover:bg-gray-800"
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
          </button>

          <div className="overflow-hidden px-8">
            <div
              ref={slidesContainerRef}
              className="flex transition-all duration-400 ease-out will-change-transform"
              style={{
                transform: `translateX(-${
                  activeSlide * (100 / slidesToShow)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="px-3 flex-shrink-0"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  {/* Compact Testimonial Card */}
                  <div className="  bg-gray-900/60 backdrop-blur-sm  p-6 shadow-xl hover:border-pink-500/30 h-full flex flex-col hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 relative group hover:transform hover:scale-[1.02] cursor-pointer">
                    {/* User Info Header */}
                    <div className="flex items-center mb-4">
                      <div className="mr-3 flex-shrink-0 relative">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white/10`}
                        >
                          {testimonial.initial}
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-gray-900">
                          <Code className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-lg truncate">
                          {testimonial.author}
                        </h4>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-300 font-medium">
                            {testimonial.role}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-pink-400 text-xs font-semibold">
                            {testimonial.company}
                          </span>
                          <span className="mx-2 text-gray-600 text-xs">•</span>
                          <span className="text-gray-500 text-xs">
                            {testimonial.timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-amber-400 fill-amber-400"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-400">
                        ({testimonial.rating}.0)
                      </span>
                    </div>

                    {/* Testimonial Quote - Compact */}
                    <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                      "{testimonial.quote}"
                    </p>

                    {/* Skills & Progress */}
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getSkillLevelColor(
                            testimonial.skillLevel
                          )}`}
                        >
                          {testimonial.skillLevel}
                        </span>
                        <span className="text-xs text-gray-400">
                          {testimonial.completedCourses} courses completed
                        </span>
                      </div>

                      {/* Decorative Bottom Border */}
                      <div className="w-full h-1  bg-gray-900 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full transform origin-left group-hover:scale-x-110 transition-transform duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={animating}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20   bg-gray-900/90 hover:border-pink-500/50 rounded-full shadow-xl p-3 backdrop-blur-sm transition-all duration-300 group ${
              animating
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-pink-500/20 hover:bg-gray-800"
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Compact Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({
            length: Math.max(1, totalSlides - slidesToShow + 1),
          }).map((_, index) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={animating}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 w-8 shadow-lg shadow-pink-500/30"
                    : "bg-gray-700 w-2 hover:bg-gray-600 hover:w-4"
                } ${animating ? "opacity-50" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
