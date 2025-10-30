"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Code,
  Users,
  Award,
  Globe,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Star,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";

const AboutCodingJojo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "story">(
    "mission"
  );
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection observer to detect when section is visible
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [mounted]);
  // Animated counter hook
  const useCountUp = (end: number, isVisible: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      let animationFrame: number;
      const duration = 2000;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        setCount(Math.floor(percentage * end));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [isVisible, end]);

    return count;
  };
  // Get counter values using the hook
  const yearsCount = useCountUp(10, isVisible);
  const studentsCount = useCountUp(10000, isVisible);
  const awardsCount = useCountUp(15, isVisible);
  const countriesCount = useCountUp(42, isVisible);

  // Memoized achievements data
  const achievements = useMemo(
    () => [
      {
        icon: <Code className="w-4 h-4" />,
        label: "Years Experience",
        value: <>{yearsCount.toLocaleString()}+</>,
        gradient: "from-blue-600 to-indigo-600",
      },
      {
        icon: <Users className="w-4 h-4" />,
        label: "Students Enrolled",
        value: <>{studentsCount.toLocaleString()}+</>,
        gradient: "from-indigo-600 to-blue-600",
      },
      {
        icon: <Award className="w-4 h-4" />,
        label: "Industry Awards",
        value: <>{awardsCount.toLocaleString()}+</>,
        gradient: "from-blue-600 to-indigo-600",
      },
      {
        icon: <Globe className="w-4 h-4" />,
        label: "Countries Reached",
        value: <>{countriesCount.toLocaleString()}+</>,
        gradient: "from-indigo-600 to-blue-600",
      },
    ],
    [yearsCount, studentsCount, awardsCount, countriesCount]
  );

  // Memoized tab content
  const tabContent = useMemo(
    () => ({
      mission: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">Our Mission</h3>
          <p className="text-gray-600 text-sm">
            At Coding Jojo, we&apos;re on a mission to democratize coding
            education through personalized, AI-driven learning experiences that
            adapt to each student&apos;s unique learning style and pace.
          </p>
          <div className="space-y-2 mt-3">
            {[
              "Make quality coding education accessible to everyone",
              "Build confidence through project-based learning",
              "Foster a supportive community of learners and mentors",
              "Prepare students for real-world tech careers",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      vision: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">Our Vision</h3>
          <p className="text-gray-600 text-sm">
            We envision a world where anyone with passion and determination can
            master coding skills, regardless of their background, location, or
            prior experience.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[
              {
                label: "Interactive lessons",
                value: "95%",
              },
              {
                label: "Course completion",
                value: "87%",
              },
              {
                label: "Satisfaction score",
                value: "4.9/5",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 backdrop-blur-sm p-3 flex items-center hover:border-blue-500/30 transition-all duration-300 rounded"
              >
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mr-2"></div>
                <div>
                  <div className="text-xs font-medium text-gray-800">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      story: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">Our Story</h3>
          <p className="text-gray-600 text-sm">
            Coding Jojo was born from founder Joseph Jose Oribaloye's personal
            struggle with traditional coding education. After teaching himself
            to code and later leading engineering teams, he created a platform
            that combines the best of human mentorship with AI-powered
            personalization.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              {
                year: "2015",
                event: "Initial concept developed",
              },
              {
                year: "2017",
                event: "First beta platform launched",
              },
              {
                year: "2019",
                event: "AI curriculum system introduced",
              },
              {
                year: "2021",
                event: "Reached 10,000 students milestone",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 backdrop-blur-sm p-2.5 rounded"
              >
                <p className="text-blue-600 font-bold text-xs">{item.year}</p>
                <p className="text-gray-700 text-xs">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    }),
    []
  );

  // Optimized tab handler
  const handleTabChange = useCallback((tab: "mission" | "vision" | "story") => {
    setActiveTab(tab);
  }, []);

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="relative overflow-hidden py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 md:mb-16 max-w-3xl mx-auto text-center">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 mx-auto w-48"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 mx-auto max-w-2xl"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto max-w-xl"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 font-['Montserrat',sans-serif] bg-white"
    >
      {/* <AnimatedBackground /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="mb-12 md:mb-16 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full text-xs font-medium backdrop-blur-sm shadow-lg mb-4 border border-blue-500/20">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
              Our Story
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 leading-tight">
            <span className="text-gray-800">About </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Coding Jojo
            </span>
          </h2>

          <p className="text-gray-600 text-xs max-w-3xl mx-auto">
            Transforming coding education through personalized learning
            experiences and cutting-edge AI technology
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Photo & Stats (5 columns) */}
          <div className="lg:col-span-5">
            {/* Main Image Container */}
            <div className="relative   bg-gray-900 overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/joedev.jpg"
                  alt="CODING JOJO - Students coding together"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sh14WW"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded border border-gray-200">
                    <p className="text-gray-600 text-center text-xs">
                      Founder & CEO
                    </p>
                    <h3 className="text-gray-800 font-bold text-center mb-2 text-sm">
                      JOSEPH JOSE ORIBALOYE
                    </h3>
                    <p className="text-gray-600 text-center text-xs">
                      Learn with CODING JOJO AI-powered learning that adapts to
                      your pace
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content (7 columns) */}
          <div
            className={`lg:col-span-7 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 translate-x-8"
            } transition-all duration-1000 delay-300`}
          >
            <div className="bg-white border border-gray-200 backdrop-blur-sm shadow-xl overflow-hidden ">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                {[
                  {
                    id: "mission",
                    label: "Mission",
                    icon: <Target className="w-3.5 h-3.5" />,
                  },
                  {
                    id: "vision",
                    label: "Vision",
                    icon: <Lightbulb className="w-3.5 h-3.5" />,
                  },
                  {
                    id: "story",
                    label: "Story",
                    icon: <Heart className="w-3.5 h-3.5" />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      handleTabChange(tab.id as "mission" | "vision" | "story")
                    }
                    className={`flex-1 px-4 py-3 text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-gray-800 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">{tabContent[activeTab]}</div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 backdrop-blur-sm p-3 text-center hover:border-blue-500/30 transition-all duration-300 rounded"
                >
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${achievement.gradient} text-white mb-2`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="text-lg font-bold text-gray-800 mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-xs text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Values Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Our Core Values
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs">
              These principles guide everything we do at Coding Jojo, from
              curriculum development to student support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: "Excellence",
                description:
                  "We strive for the highest quality in everything we create and deliver.",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Student-First",
                description:
                  "Every decision we make puts our students' learning experience at the center.",
              },
              {
                icon: <Lightbulb className="w-6 h-6" />,
                title: "Innovation",
                description:
                  "We continuously evolve our platform using the latest educational technology.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 backdrop-blur-sm p-5 hover:border-blue-500/30 transition-all duration-300 text-center "
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-600 mb-3">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm p-6 md:p-8 shadow-lg  border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Ready to Shape the Future of Education?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Join our mission to make quality coding education accessible to
                everyone. We're always looking for passionate educators and
                innovators.
              </p>
            </div>
            <div className="text-center md:text-right">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-medium px-6 py-2.5 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 rounded text-sm">
                Join Our Team <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCodingJojo;
