"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from 'next/navigation';
import {
  Search,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Sparkles,
  Menu,
  BookOpen,
  Users,
  Trophy,
  GraduationCap,
  User,
  Settings,
  LogOut,
  Shield,
  CreditCard,
  Bell,
} from "lucide-react";
import { useTranslation, languageOptions } from "../contexts/LanguageContext";
import { useInstructorAuth } from "../hooks/useInstructorAuth";

// Time left interface
interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

// Enhanced language options with country flags
const enhancedLanguageOptions = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export default function InstructorNavbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  // Access translation context and instructor auth
  const { language, setLanguage, t } = useTranslation();
  const { isAuthenticated, user, logout } = useInstructorAuth();

  // State for announcement bar
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        event.target instanceof Node &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdownOpen(false);
      }
      
      if (
        profileDropdownRef.current &&
        event.target instanceof Node &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    if (langDropdownOpen || profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownOpen, profileDropdownOpen]);

  // Effect for countdown timer
  useEffect(() => {
    if (!showAnnouncement) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showAnnouncement]);

  // Scroll the secondary navbar
  const scrollMenu = useCallback((direction: "left" | "right"): void => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // Handle language change
  const handleLanguageChange = useCallback(
    (langCode: string): void => {
      setLanguage(langCode as any);
      setLangDropdownOpen(false);
    },
    [setLanguage]
  );

  // Get current language flag
  const getCurrentLanguageFlag = useCallback(() => {
    const currentLang = enhancedLanguageOptions.find(
      (lang) => lang.code === language
    );
    return currentLang ? currentLang.flag : "🌐";
  }, [language]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      const result = await logout();
      if (result.success) {
        setProfileDropdownOpen(false);
        router.push('/instructor');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, router]);

  // Get user initials for avatar
  const getUserInitials = useCallback((userInfo: any) => {
    if (!userInfo) return 'U';
    const firstName = userInfo.firstName || userInfo.fullName?.split(' ')[0] || '';
    const lastName = userInfo.lastName || userInfo.fullName?.split(' ')[1] || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || userInfo.email?.charAt(0).toUpperCase() || 'U';
  }, []);

  // Get user display name
  const getUserDisplayName = useCallback((userInfo: any) => {
    if (!userInfo) return 'User';
    return userInfo.fullName || `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() || userInfo.email || 'User';
  }, []);

  // Enhanced programming languages and technologies for secondary navbar
  const programmingLanguages = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Dart",
    "Scala",
    "R",
    "MATLAB",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Next.js",
    "Svelte",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "Laravel",
    "Ruby on Rails",
    "ASP.NET",
    "React Native",
    "Flutter",
    "Ionic",
    "Xamarin",
    "Unity",
    "Unreal Engine",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Firebase",
    "Supabase",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "DevOps",
    "Machine Learning",
    "Data Science",
    "AI",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Blockchain",
    "Web3",
    "Solidity",
    "Ethereum",
    "Bitcoin",
    "DeFi",
    "Cybersecurity",
    "Ethical Hacking",
    "Network Security",
    "Cloud Security",
    "UI/UX Design",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Photoshop",
    "Illustrator",
  ];

  // Simplified navigation items for instructor page
  const instructorNavItems = [
    {
      name: "courses",
      href: "/courses",
      icon: BookOpen,
      description: "Browse all courses",
    },
    {
      name: "community",
      href: "/community",
      icon: Users,
      description: "Connect with learners",
    },
    {
      name: "services",
      href: "/services",
      icon: Trophy,
      description: "Industry-recognized certificates",
    },
  ];

  return (
    <div className="sticky top-0 z-50 w-full font-['Inter',sans-serif]">
      {/* Announcement Bar - Updated with pink-orange gradient */}
      {showAnnouncement && (
        <div className="relative bg-gradient-to-r from-pink-500 to-orange-500 text-white">
          <div className="max-w-[1500] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center md:justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-3 flex-wrap justify-center">
              <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-xs font-bold px-2 sm:px-3 py-1 sm:py-1 text-white">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-1.5" />
                <span className="text-xs sm:text-xs">{t('announcement.new')}</span>
              </span>
              <p className="text-xs sm:text-sm font-medium">{t('announcement.text')}</p>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="px-1.5 sm:px-2 py-0.5 sm:py-1">
                  <span className="text-xs sm:text-sm font-bold">{timeLeft.hours}</span>
                </div>
                <span className="text-white/80 text-xs sm:text-sm">:</span>
                <div className="px-1.5 sm:px-2 py-0.5 sm:py-1">
                  <span className="text-xs sm:text-sm font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-white/80 text-xs sm:text-sm">:</span>
                <div className="px-1.5 sm:px-2 py-0.5 sm:py-1">
                  <span className="text-xs sm:text-sm font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowAnnouncement(false)}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm text-xs font-bold px-2 sm:px-3 py-1 sm:py-1 text-white hover:bg-white/30 transition-all duration-300"
              >
                {t('announcement.cta')}
              </button>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar - Increased max-width */}
      <nav className={`relative w-full transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl'
        : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl'
        }`}>

        <div className="max-w-[1500] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image
                    src="/image-removebg-preview.png"
                    alt="CodeLearn Academy"
                    width={100}
                    height={40}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {instructorNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group text-sm relative flex items-center gap-2 px-4 py-2.5 text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-all duration-300 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:bg-slate-200/50"
                >
                  <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">{t(`navigation.${item.name}`)}</span>
                </Link>
              ))}
            </div>

            {/* Search Bar - Centered and Enhanced */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-400 text-slate-500 group-focus-within:text-pink-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-orange-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Dropdown */}
              <div className="relative hidden sm:block" ref={langDropdownRef}>
                <button
                  className="flex items-center gap-2 text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors duration-300 p-2 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:bg-slate-200/50 "
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                >
                  <span className="text-lg">{getCurrentLanguageFlag()}</span>
                  <span className="text-sm font-medium hidden lg:inline">{language.toUpperCase()}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Enhanced Language Dropdown with Flags */}
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-12 w-72 bg-slate-900/98 dark:bg-slate-900/98 bg-white/98 backdrop-blur-xl overflow-hidden shadow-2xl border border-slate-600/50 dark:border-slate-600/50 border-slate-300/50 transition-all duration-300 z-[99999] animate-in slide-in-from-top-2">
                    <div className="p-3 border-b border-slate-700 dark:border-slate-700 border-slate-200 bg-gradient-to-r from-pink-500/10 to-orange-500/10">
                      <p className="text-sm font-semibold text-white dark:text-white text-gray-900">{t('language.selectLanguage')}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500">{t('language.choosePreferred')}</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {enhancedLanguageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          className="flex items-center justify-between w-full px-4 py-3 text-sm text-slate-300 dark:text-slate-300 text-slate-600 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 transition-colors duration-300 hover:text-white dark:hover:text-white hover:text-slate-900"
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-slate-500 dark:text-slate-500 text-slate-400 text-xs font-bold uppercase bg-slate-700 dark:bg-slate-700 bg-slate-200 px-2 py-1 rounded">{lang.code}</span>
                            <span className="font-medium">{lang.name}</span>
                          </div>
                          {language === lang.code && <Check className="h-4 w-4 text-pink-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Authentication Section - Conditional rendering */}
              <div className="hidden sm:flex items-center gap-3">
                {isAuthenticated && user ? (
                  /* Authenticated User Profile Dropdown */
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2 p-2 text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-all duration-300 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:bg-slate-200/50 "
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {getUserInitials(user)}
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-medium">{getUserDisplayName(user)}</p>
                        <p className="text-xs text-slate-400">Instructor</p>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-slate-900/98 dark:bg-slate-900/98 bg-white/98 backdrop-blur-xl  shadow-2xl border border-slate-600/50 dark:border-slate-600/50 border-slate-300/50 transition-all duration-300 z-[99999] animate-in slide-in-from-top-2">
                        {/* Profile Header */}
                        <div className="p-4 border-b border-slate-700 dark:border-slate-700 border-slate-200 bg-gradient-to-r from-pink-500/10 to-orange-500/10">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                              {getUserInitials(user)}
                            </div>
                            <div>
                              <p className="font-semibold text-white dark:text-white text-gray-900">{getUserDisplayName(user)}</p>
                              <p className="text-sm text-slate-400 dark:text-slate-400 text-slate-500">{user.email}</p>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified Instructor
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            href="/instructor/instructor-courses"
                            className="flex items-center gap-3 px-4 py-3 text-slate-300 dark:text-slate-300 text-slate-600 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors duration-300"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <BookOpen className="w-4 h-4" />
                            <div>
                              <p className="text-sm font-medium">My Courses</p>
                              <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500">Manage your courses</p>
                            </div>
                          </Link>

                          <Link
                            href="/instructor/verification"
                            className="flex items-center gap-3 px-4 py-3 text-slate-300 dark:text-slate-300 text-slate-600 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors duration-300"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <Shield className="w-4 h-4" />
                            <div>
                              <p className="text-sm font-medium">Verification</p>
                              <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500">Account verification status</p>
                            </div>
                          </Link>

                          <button
                            className="flex items-center gap-3 px-4 py-3 text-slate-300 dark:text-slate-300 text-slate-600 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors duration-300 w-full text-left"
                          >
                            <Settings className="w-4 h-4" />
                            <div>
                              <p className="text-sm font-medium">Settings</p>
                              <p className="text-xs text-slate-400 dark:text-slate-400 text-slate-500">Account preferences</p>
                            </div>
                          </button>

                          <div className="border-t border-slate-700 dark:border-slate-700 border-slate-200 my-2"></div>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-300 w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <div>
                              <p className="text-sm font-medium">Sign Out</p>
                              <p className="text-xs text-red-400/70">Logout from your account</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Unauthenticated - Login/Register Buttons */
                  <>
                    <Link
                      href="/instructor/login"
                      className="text-sm font-semibold px-5 py-2.5 bg-gray-700 dark:bg-gray-700 bg-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600 hover:bg-gray-300 text-white dark:text-white text-gray-900 transition-colors transition-all duration-300 "
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/instructor/register"
                      className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white text-sm font-semibold px-6 py-2.5 shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 "
                    >
                      {t('signup')}
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors p-2 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:bg-slate-200/50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-800/98 dark:bg-slate-800/98 bg-white/98 backdrop-blur-xl border-t border-slate-700 dark:border-slate-700 border-slate-200">
            <div className="max-w-full mx-auto px-4 py-6">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder={t('mobile.searchCourses')}
                  className="w-full h-12 pl-12 pr-4 bg-slate-700/60 dark:bg-slate-700/60 bg-slate-100/60 border border-slate-600 dark:border-slate-600 border-slate-300 focus:border-pink-500/50 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-400 text-slate-500" />
              </div>

              {/* Mobile Navigation Grid */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {instructorNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-4 bg-slate-700/30 dark:bg-slate-700/30 bg-slate-100/30 border border-slate-600/50 dark:border-slate-600/50 border-slate-300/50 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-pink-400" />
                    <div>
                      <span className="text-white dark:text-white text-gray-900 font-medium text-sm">{t(`navigation.${item.name}`)}</span>
                      <p className="text-slate-400 dark:text-slate-400 text-slate-500 text-xs mt-0.5">{t(`descriptions.${item.name}Desc`)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="border-t border-slate-700 dark:border-slate-700 border-slate-200 pt-6">
                {isAuthenticated && user ? (
                  /* Authenticated Mobile Menu */
                  <div className="space-y-4">
                    {/* User Profile Header */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 ">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {getUserInitials(user)}
                      </div>
                      <div>
                        <p className="font-semibold text-white dark:text-white text-gray-900">{getUserDisplayName(user)}</p>
                        <p className="text-sm text-slate-400 dark:text-slate-400 text-slate-500">{user.email}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          Instructor
                        </span>
                      </div>
                    </div>

                    {/* Mobile Menu Links */}
                    <div className="space-y-2">
                      <Link
                        href="/instructor/instructor-courses"
                        className="flex items-center gap-3 p-3 bg-slate-700/30 dark:bg-slate-700/30 bg-slate-100/30 border border-slate-600/50 dark:border-slate-600/50 border-slate-300/50 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 transition-all duration-300 "
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BookOpen className="w-5 h-5 text-pink-400" />
                        <span className="text-white dark:text-white text-gray-900 font-medium">My Courses</span>
                      </Link>

                      <Link
                        href="/instructor/verification"
                        className="flex items-center gap-3 p-3 bg-slate-700/30 dark:bg-slate-700/30 bg-slate-100/30 border border-slate-600/50 dark:border-slate-600/50 border-slate-300/50 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 transition-all duration-300 "
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Shield className="w-5 h-5 text-pink-400" />
                        <span className="text-white dark:text-white text-gray-900 font-medium">Verification</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all duration-300  w-full text-left"
                      >
                        <LogOut className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Unauthenticated Mobile Menu */
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/instructor/login"
                      className="text-center py-3 px-4 border border-slate-600 dark:border-slate-600 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:border-slate-500 dark:hover:border-slate-500 hover:border-slate-400 transition-colors duration-300 "
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/instructor/register"
                      className="text-center py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-lg transition-all duration-300 "
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('user.getStartedFree')}
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Language Selector with Flags */}
              <div className="border-t border-slate-700 dark:border-slate-700 border-slate-200 pt-6 mt-6">
                <p className="text-sm font-semibold text-white dark:text-white text-gray-900 mb-3">{t('mobile.language')}</p>
                <div className="grid grid-cols-3 gap-2">
                  {enhancedLanguageOptions.slice(0, 9).map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex items-center gap-2 px-3 py-2 text-xs transition-all duration-300 ${language === lang.code
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white border border-pink-400'
                        : 'bg-slate-700 dark:bg-slate-700 bg-slate-200 text-slate-300 dark:text-slate-300 text-slate-600 border border-slate-600 dark:border-slate-600 border-slate-400 hover:bg-slate-600 dark:hover:bg-slate-600 hover:bg-slate-300'
                        }`}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span className="font-medium">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Secondary Navbar */}
      <nav className={`w-full transition-all duration-300 z-40 relative ${scrolled
          ? 'bg-slate-800/95 dark:bg-slate-800/95 bg-slate-100/95 backdrop-blur-lg shadow-xl'
          : 'bg-slate-800/95 dark:bg-slate-800/95 bg-slate-100/95 backdrop-blur-lg shadow-xl'
        }`}>
        <div className="max-w-[1500] mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Left scroll button */}
          <button
            onClick={() => scrollMenu('left')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700/80 dark:bg-slate-700/80 bg-slate-200/80 backdrop-blur-sm shadow-lg rounded-full h-9 w-9 flex items-center justify-center border border-slate-600 dark:border-slate-600 border-slate-300 hover:bg-slate-600 dark:hover:bg-slate-600 hover:bg-slate-300 transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4 text-slate-300 dark:text-slate-300 text-slate-600" />
          </button>

          <div className="flex items-center h-10 overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-8 overflow-x-auto py-3 hide-scrollbar w-full px-16 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {programmingLanguages.map((tech, index) => (
                <Link
                  key={index}
                  href={`/learn/${tech.toLowerCase().replace(/\s/g, '-').replace(/\./g, '').replace(/\+/g, 'plus').replace(/#/g, 'sharp')}`}
                  className="group relative whitespace-nowrap text-sm text-slate-400 dark:text-slate-400 text-slate-500 hover:text-white dark:hover:text-white hover:text-slate-900 transition-all duration-300 py-2 px-1 font-medium"
                >
                  <span className="relative z-10">{tech}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 transform scale-110"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scrollMenu('right')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-slate-700/80 dark:bg-slate-700/80 bg-slate-200/80 backdrop-blur-sm shadow-lg rounded-full h-9 w-9 flex items-center justify-center border border-slate-600 dark:border-slate-600 border-slate-300 hover:bg-slate-600 dark:hover:bg-slate-600 hover:bg-slate-300 transition-all duration-300 hover:scale-105"
          >
            <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-300 text-slate-600" />
          </button>
        </div>
      </nav>

      {/* Custom CSS for hiding scrollbars */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
