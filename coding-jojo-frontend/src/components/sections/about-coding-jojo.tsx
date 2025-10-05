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
        icon: <Code className="w-5 h-5" />,
        label: "Years Experience",
        value: <>{yearsCount.toLocaleString()}+</>,
        gradient: "from-pink-500 to-orange-500",
      },
      {
        icon: <Users className="w-5 h-5" />,
        label: "Students Enrolled",
        value: <>{studentsCount.toLocaleString()}+</>,
        gradient: "from-orange-500 to-pink-500",
      },
      {
        icon: <Award className="w-5 h-5" />,
        label: "Industry Awards",
        value: <>{awardsCount.toLocaleString()}+</>,
        gradient: "from-pink-500 to-orange-500",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        label: "Countries Reached",
        value: <>{countriesCount.toLocaleString()}+</>,
        gradient: "from-orange-500 to-pink-500",
      },
    ],
    [yearsCount, studentsCount, awardsCount, countriesCount]
  );

  // Memoized tab content
  const tabContent = useMemo(
    () => ({
      mission: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Our Mission</h3>
          <p className="text-gray-300">
            At Coding Jojo, we&apos;re on a mission to democratize coding
            education through personalized, AI-driven learning experiences that
            adapt to each student&apos;s unique learning style and pace.
          </p>
          <div className="space-y-3 mt-4">
            {[
              "Make quality coding education accessible to everyone",
              "Build confidence through project-based learning",
              "Foster a supportive community of learners and mentors",
              "Prepare students for real-world tech careers",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-pink-500" />
                </div>
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      vision: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Our Vision</h3>
          <p className="text-gray-300">
            We envision a world where anyone with passion and determination can
            master coding skills, regardless of their background, location, or
            prior experience.
          </p>
          <div className="grid grid-cols-2  gap-3 mt-4">
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
                className="  bg-gray-900/60 backdrop-blur-sm p-4 flex items-center hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mr-3"></div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      story: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Our Story</h3>
          <p className="text-gray-300">
            Coding Jojo was born from founder Joseph Jose Oribaloye's personal
            struggle with traditional coding education. After teaching himself
            to code and later leading engineering teams, he created a platform
            that combines the best of human mentorship with AI-powered
            personalization.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
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
                className="  bg-gray-900/60 backdrop-blur-sm p-3 "
              >
                <p className="text-pink-500 font-bold text-sm">{item.year}</p>
                <p className="text-gray-300 text-xs">{item.event}</p>
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
      <div className="relative overflow-hidden py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 md:mb-20 max-w-3xl mx-auto text-center">
            <div className="h-8  bg--900 rounded animate-pulse mb-5 mx-auto w-48"></div>
            <div className="h-16  bg-gray-900 rounded animate-pulse mb-6 mx-auto max-w-2xl"></div>
            <div className="h-8  bg-gray-900 rounded animate-pulse mx-auto max-w-xl"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 font-['Montserrat',sans-serif]"
    >
      {/* <AnimatedBackground /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="mb-16 md:mb-20 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg mb-5 border border-pink-500/20">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold">
              Our Story
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Coding Jojo
            </span>
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="  bg-gray-900/80 backdrop-blur-sm p-4 ">
                    <p className="text-gray-300 text-center text-sm">
                      Founder & CEO
                    </p>
                    <h3 className="text-white font-bold text-center mb-2">
                      JOSEPH JOSE ORIBALOYE
                    </h3>
                    <p className="text-gray-300 text-center text-sm">
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
            <div className="  bg-gray-900/60 backdrop-blur-sm shadow-xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-800">
                {[
                  {
                    id: "mission",
                    label: "Mission",
                    icon: <Target className="w-4 h-4" />,
                  },
                  {
                    id: "vision",
                    label: "Vision",
                    icon: <Lightbulb className="w-4 h-4" />,
                  },
                  {
                    id: "story",
                    label: "Story",
                    icon: <Heart className="w-4 h-4" />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      handleTabChange(tab.id as "mission" | "vision" | "story")
                    }
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-white border-b-2 border-pink-500"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">{tabContent[activeTab]}</div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="  bg-gray-900/60 backdrop-blur-sm p-4 text-center hover:border-pink-500/30 transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10  bg-gradient-to-r ${achievement.gradient} text-white mb-2`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="text-xl font-bold text-white mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-xs text-gray-400">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Values Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our Core Values
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do at Coding Jojo, from
              curriculum development to student support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Excellence",
                description:
                  "We strive for the highest quality in everything we create and deliver.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Student-First",
                description:
                  "Every decision we make puts our students' learning experience at the center.",
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Innovation",
                description:
                  "We continuously evolve our platform using the latest educational technology.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="  bg-gray-900/60 backdrop-blur-sm p-6 hover:border-pink-500/30 transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-pink-500 mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-24 bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Shape the Future of Education?
              </h3>
              <p className="text-gray-300 mb-6">
                Join our mission to make quality coding education accessible to
                everyone. We're always looking for passionate educators and
                innovators.
              </p>
            </div>
            <div className="text-center md:text-right">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-pink-500/30">
                Join Our Team <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCodingJojo;
