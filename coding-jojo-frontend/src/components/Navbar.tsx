"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Globe,
  ChevronDown,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Sparkles,
  Menu,
  BookOpen,
  Users,
  LogOut,
  User,
  Settings,
  Award,
  PlayCircle,
  MessageSquare,
  Star,
  Briefcase,
  Code2,
  Trophy,
  GraduationCap,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";
import { useTranslation, languageOptions } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  // Access translation context
  const { language, setLanguage, t } = useTranslation();

  // Access auth context
  const { user, isAuthenticated, logout } = useAuth();

  // Access cart context - always call the hook but handle potential undefined context
  const cartContext = useCart();
  const cartItems = cartContext?.cartItems || [];
  const getTotalItems = cartContext?.getTotalItems || (() => 0);
  const [cartCount, setCartCount] = useState(0);
  // Access theme context
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update cart count whenever cart items change
  useEffect(() => {
    if (typeof getTotalItems === 'function') {
      setCartCount(getTotalItems());
    } else {
      setCartCount(0);
    }
  }, [cartItems, getTotalItems]);

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
        userDropdownRef.current &&
        event.target instanceof Node &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    if (langDropdownOpen || userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownOpen, userDropdownOpen]);

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

  // Handle logout
  const handleLogout = useCallback((): void => {
    logout();
    setUserDropdownOpen(false);
  }, [logout]);

  // Get user initials for avatar fallback
  const getUserInitials = useCallback((name: string): string => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, []);

  // Get current language flag
  const getCurrentLanguageFlag = useCallback(() => {
    const currentLang = enhancedLanguageOptions.find(
      (lang) => lang.code === language
    );
    return currentLang ? currentLang.flag : "🌐";
  }, [language]);

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
  // Navigation items - dynamic based on authentication status
  const primaryNavItems = isAuthenticated
    ? [
      {
        name: "dashboard",
        href: "/dashboard",
        icon: BookOpen,
        description: "View your learning progress",
      },
      {
        name: "courses",
        href: "/courses",
        icon: GraduationCap,
        description: "Browse all courses",
      },
      {
        name: "community",
        href: "/community",
        icon: Users,
        description: "Connect with learners",
      },
    ]
    : [
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
    <div className="sticky top-0 z-50 w-full font-['Montserrat',sans-serif]">
      {/* Announcement Bar - Updated with pink-orange gradient */}
      {showAnnouncement && (
        <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
          <div className="max-w-[1500] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center md:justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <span className="inline-flex items-center bg-white/25 backdrop-blur-sm text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-0.5 text-white  border border-white/30">
                <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5 sm:mr-1" />
                <span className="text-[10px] sm:text-[10px]">{t('announcement.new')}</span>
              </span>
              <p className="text-[10px] sm:text-xs font-medium">{t('announcement.text')}</p>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <div className="px-1 sm:px-1.5 py-0.5">
                  <span className="text-[10px] sm:text-xs font-bold">{timeLeft.hours}</span>
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs">:</span>
                <div className="px-1 sm:px-1.5 py-0.5">
                  <span className="text-[10px] sm:text-xs font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs">:</span>
                <div className="px-1 sm:px-1.5 py-0.5">
                  <span className="text-[10px] sm:text-xs font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setShowAnnouncement(false)}
                className="inline-flex items-center bg-white text-blue-700 text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-0.5 hover:bg-gray-100 transition-all duration-300  shadow-sm"
              >
                {t('announcement.cta')}
              </button>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="text-white/80 hover:text-white transition-colors p-0.5"
              >
                <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </button>
            </div>
          </div>
        </div>
      )}      {/* Main Navbar - Professional White Theme */}
      <nav className={`relative w-full transition-all duration-300 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white border-b border-primary-100 shadow-sm`}>

        <div className="max-w-[1500] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image
                    src="/image-removebg-preview-6.png"
                    alt="CodeLearn Academy"
                    width={80}
                    height={80}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>  
                      {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-0.5">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group text-xs relative flex items-center gap-1.5 px-3 py-2 text-gray-100 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 "
                >
                  <item.icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-semibold">{t(`navigation.${item.name}`)}</span>
                </Link>
              ))}
            </div>   
                     {/* Search Bar - Professional White Design */}
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full h-8 pl-9 pr-3 bg-gray-50 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 text-gray-800 text-xs outline-none transition-all duration-300 placeholder-gray-500 shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors duration-300" />
              </div>
            </div>       
                 {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Shopping Cart - Professional White */}
              <Link href="/cart" className="relative text-gray-100 hover:text-blue-600 transition-colors duration-300 p-1.5 hover:bg-blue-50 ">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
              <div className="relative hidden sm:block" ref={langDropdownRef}>
                <button
                  className="flex items-center gap-1.5 text-gray-100 transition-colors duration-300 p-1.5 "
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                >
                  <span className="text-sm">{getCurrentLanguageFlag()}</span>
                  <span className="text-xs font-semibold hidden lg:inline">{language.toUpperCase()}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>              
                  {/* Enhanced Language Dropdown with Flags */}
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-8 w-56 bg-white border border-gray-300  overflow-hidden shadow-lg transition-all duration-300 z-[99999]">
                    <div className="p-2 border-b border-gray-200 bg-gray-50">
                      <p className="text-xs font-semibold text-gray-800">{t('language.selectLanguage')}</p>
                      <p className="text-[10px] text-gray-600">{t('language.choosePreferred')}</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {enhancedLanguageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          className="flex items-center justify-between w-full px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 transition-colors duration-300 hover:text-blue-600"
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{lang.flag}</span>
                            <span className="text-blue-600 text-[10px] font-bold uppercase bg-blue-100 px-1.5 py-0.5 rounded">{lang.code}</span>
                            <span className="font-semibold">{lang.name}</span>
                          </div>
                          {language === lang.code && <Check className="h-3 w-3 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>           
                 {/* Authentication Section */}
              {isAuthenticated && user ? (
                // Enhanced User Profile (Bell icon removed)
                <div className="relative" ref={userDropdownRef}>
                  <button
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 p-1.5 hover:bg-blue-50 "
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    {user.profilePicture ? (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-primary-300 group-hover:border-accent-400 transition-colors duration-300">
                        <Image
                          src={user.profilePicture}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {getUserInitials(user.name)}
                      </div>
                    )}                    <div className="hidden lg:block text-left">
                      <p className="text-xs font-semibold text-gray-800">{user.name.split(' ')[0]}</p>
                      {user.isPremium && (
                        <p className="text-[10px] text-blue-600">Premium</p>
                      )}
                    </div>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>       
                             {/* Enhanced User Dropdown */}
                  {userDropdownOpen && (
                  <div className="absolute right-0 mt-8 w-60 bg-white border border-gray-300  overflow-hidden shadow-lg transition-all duration-300 z-[99999]">
                      <div className="p-3 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-2">
                          {user.profilePicture ? (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary-300">
                              <Image
                                src={user.profilePicture}
                                alt={user.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white font-bold text-xs">
                              {getUserInitials(user.name)}
                            </div>
                          )}                          <div>
                            <p className="font-semibold text-xs text-gray-800">{user.name}</p>
                            <p className="text-[10px] text-gray-600">{user.email}</p>
                            {user.isPremium && (
                              <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-blue-600 text-white text-[9px] rounded-full">{t('user.premiumMember')}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        {[
                          { icon: User, label: t('user.profile'), href: "dashboard/settings" },
                          { icon: GraduationCap, label: t('user.trackProgress'), href: "dashboard/analytics" },
                          { icon: Settings, label: t('user.settings'), href: "dashboard/billing" }
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-blue-50 transition-colors duration-300 hover:text-blue-600"
                          >
                            <item.icon className="w-3 h-3" />
                            <span className="font-semibold text-xs">{item.label}</span>
                          </Link>
                        ))}

                        <div className="border-t border-gray-200 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-300"
                          >
                            <LogOut className="w-3 h-3" />
                            <span className="font-semibold text-xs">{t('user.signOut')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (     

                  // Enhanced Auth Buttons with pink-orange gradient
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/instructor"
                    className="text-xs font-semibold px-3 py-1.5 border border-blue-300 text-gray-100 hover:border-blue-400 transition-all duration-300 rounded shadow-sm"
                  >
                    {t("Become Instructor")}
                  </Link>
                  <Link
                    href="/login"
                    className="text-xs font-semibold px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 rounded shadow-sm"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href="/signup"
                    className="text-xs font-semibold px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 rounded shadow-sm"
                  >
                    {t('signup')}
                  </Link>
                </div>
              )}            
                
                {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 "
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-4 w-4" />
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
              </div>              {/* Mobile Navigation Grid */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {primaryNavItems.map((item) => (
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
              </div>              {/* Mobile Auth Section */}
              {isAuthenticated && user ? (
                <div className="border-t border-slate-700 dark:border-slate-700 border-slate-200 pt-6">
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-slate-600/50 dark:border-slate-600/50 border-slate-300/50">
                    {user.profilePicture ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600 dark:border-slate-600 border-slate-300">
                        <Image
                          src={user.profilePicture}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold">
                        {getUserInitials(user.name)}
                      </div>
                    )}                    <div>
                      <p className="font-semibold text-white dark:text-white text-gray-900">{user.name}</p>
                      <p className="text-sm text-slate-400 dark:text-slate-400 text-slate-500">{user.email}</p>
                      {user.isPremium && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs rounded-full">{t('user.premiumMember')}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { icon: User, label: t('user.profile'), href: "/profile" },
                      { icon: GraduationCap, label: t('navigation.courses'), href: "/my-courses" },
                      { icon: Calendar, label: "Schedule", href: "/schedule" },
                      { icon: Settings, label: t('user.settings'), href: "/settings" }
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 p-3 bg-slate-700/30 dark:bg-slate-700/30 bg-slate-100/30 border border-slate-600/50 dark:border-slate-600/50 border-slate-300/50 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 hover:bg-slate-100/50 transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4 text-pink-400" />
                        <span className="text-white dark:text-white text-gray-900 text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">{t('user.signOut')}</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-700 dark:border-slate-700 border-slate-200 pt-6">
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/login"
                      className="text-center py-3 px-4 border border-slate-600 dark:border-slate-600 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:text-gray-900 hover:border-slate-500 dark:hover:border-slate-500 hover:border-slate-400 transition-colors duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/instructor"
                      className="text-center py-3 px-4 border border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("becomeInstructor")}
                    </Link>
                    <Link
                      href="/signup"
                      className="text-center py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-lg transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('user.getStartedFree')}
                    </Link>
                  </div>
                </div>
              )}

              {/* Mobile Language Selector with Flags */}
              <div className="border-t border-slate-700 dark:border-slate-700 border-slate-200 pt-6 mt-6">
                <p className="text-sm font-semibold text-white dark:text-white text-gray-900 mb-3">{t('mobile.language')}</p>
                <div className="grid grid-cols-3 gap-2">
                  {enhancedLanguageOptions.slice(0, 9).map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex items-center gap-2 px-3 py-2 text-xs transition-all duration-300 ${language === lang.code
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white border border-pink-400'
                        : 'bg-slate-700 dark:bg-slate-700 bg-slate-200 text-slate-300 dark:text-slate-300 text-slate-600 border border-slate-600 dark:border-slate-600 border-slate-400 hover:bg-slate-600 dark:hover:bg-slate-600 hove{/* r:bg-slate-300'
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
      </nav>      {/* Enhanced Secondary Navbar */}
      <nav className="w-full transition-all duration-300 z-40 relative bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-[1500] mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Left scroll button */}
          <button
            onClick={() => scrollMenu('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full h-6 w-6 flex items-center justify-center border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
          >
            <ChevronLeft className="h-3 w-3 text-gray-600 hover:text-blue-600" />
          </button>

          <div className="flex items-center h-8 overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-6 overflow-x-auto py-2 hide-scrollbar w-full px-12 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >              {programmingLanguages.map((tech, index) => (
              <Link
                key={index}
                href={`/learn/${tech.toLowerCase().replace(/\s/g, '-').replace(/\./g, '').replace(/\+/g, 'plus').replace(/#/g, 'sharp')}`}
                className="group relative whitespace-nowrap text-xs text-gray-700 hover:text-blue-700 transition-all duration-300 py-1.5 px-2 font-semibold  hover:bg-white/90  shadow-sm hover:shadow-md"
              >
                <span className="relative z-10">{tech}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 "></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"></div>
              </Link>
            ))}
            </div>
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scrollMenu('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-md rounded-full h-6 w-6 flex items-center justify-center border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
          >
            <ChevronRight className="h-3 w-3 text-gray-600 hover:text-blue-600" />
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