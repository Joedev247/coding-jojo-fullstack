'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  BookOpen, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Award, 
  Zap, 
  Globe, 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Github 
} from 'lucide-react';
import AnimatedBackground from '../../../components/ui/AnimatedBackground';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { useToast } from '../../../hooks/useToast';
import teacherService from '../../../services/teacherService';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  lastActive: string;
}

export default function InstructorLogin() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const toast = useToast();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation and UI states
  const [formFocus, setFormFocus] = useState({
    email: false,
    password: false,
  });

  // Motivational slide content for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const motivationalContent = [
    {
      title: "Instructor Portal",
      description: "Access your teaching dashboard and connect with thousands of students worldwide",
      stats: [
        { number: "10K+", label: "Active Instructors" },
        { number: "$3,200", label: "Average Monthly" },
      ],
    },
    {
      title: "Teach & Earn",
      description: "Share your expertise and build a sustainable income stream",
      stats: [
        { number: "97%", label: "Student Satisfaction" },
        { number: "89%", label: "Course Completion" },
      ],
    },
    {
      title: "Global Reach",
      description: "Your courses reach students in 190+ countries worldwide",
      stats: [
        { number: "24/7", label: "Platform Support" },
        { number: "Weekly", label: "Instructor Events" },
      ],
    },
  ];

  // Featured instructors mockup
  const featuredInstructors: Member[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Senior Instructor",
      lastActive: "Online now",
    },
    {
      id: "2",
      name: "Prof. Alex Kumar",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Lead Instructor",
      lastActive: "Online now",
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Expert Instructor",
      lastActive: "Online now",
    },
    {
      id: "4",
      name: "James Wilson",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Senior Instructor",
      lastActive: "2h ago",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-carousel for motivational content
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motivationalContent.length);
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, [motivationalContent.length]);

  if (!mounted) {
    return (
      <div className="min-h-screen text-white relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="z-10 flex flex-col items-center">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  // Form field management
  const handleFocus = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFormFocus((prev) => ({ ...prev, [field]: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear any previous errors when the user types
    if (errors.submit) setErrors(prev => ({ ...prev, submit: '' }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await teacherService.login({
        email: formData.email,
        password: formData.password
      });
      
      if (response.success) {
        const teacherInfo = response.data;
        
        // Check if instructor needs verification or can go to dashboard
        const needsVerification = !teacherInfo.emailVerified || !teacherInfo.phoneVerified || !teacherInfo.kycCompleted;
        
        if (needsVerification) {
          toast.success('Login successful! Please complete your verification to get started.');
          router.push('/instructor/verification');
        } else {
          toast.success('Welcome back! Redirecting to your dashboard.');
          router.push('/instructor/instructor-courses');
        }
      } else {
        setErrors({ submit: response.error || 'Login failed. Please check your credentials.' });
        toast.error('Login failed. Please check your credentials and try again.');
      }
    } catch (err: any) {
      setErrors({ submit: err?.message || 'Network error. Please try again.' });
      toast.error('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Teaching', href: '/instructor' },
    { label: 'Login', active: true }
  ];

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      <Breadcrumb items={breadcrumbItems} />
      <div className="relative z-10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column: Brand imagery and message */}
            <div className="bg-gray-900/40 backdrop-blur-sm  shadow-xl p-6 hover:shadow-purple-900/20 transition duration-300 order-2 md:order-1">
              <div className="flex flex-col items-center h-full justify-between">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 blur-md transform scale-110"></div>
                  <div className="flex items-center justify-center h-full relative z-10">
                    <Image
                      src="/image-removebg-preview.png"
                      alt="Coding Jojo Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Carousel for motivational content */}
                <div className="h-40 relative w-full">
                  {motivationalContent.map((content, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
                        currentSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
                        {content.title}
                      </h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4"></div>
                      <p className="text-center text-gray-300 mb-6">
                        {content.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Slide indicators */}
                <div className="flex justify-center space-x-2 my-6">
                  {motivationalContent.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 ${
                        index === currentSlide
                          ? "w-6 bg-gradient-to-r from-pink-500 to-orange-500"
                          : "w-2 bg-gray-700"
                      } rounded-full transition-all duration-300 cursor-pointer`}
                      onClick={() => setCurrentSlide(index)}
                    ></div>
                  ))}
                </div>

                {/* Stats section */}
                <div className="w-full grid grid-cols-2 gap-4">
                  {motivationalContent[currentSlide].stats.map(
                    (stat, index) => (
                      <div
                        key={index}
                        className="text-center bg-gray-900/50 rounded p-4 hover:border-pink-500/30 transition-all duration-300 group"
                      >
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 group-hover:from-pink-300 group-hover:to-orange-300 transition-all duration-300">
                          {stat.number}
                        </p>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300">
                          {stat.label}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Community Preview */}
                <div className="mt-8 w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center">
                      <Users className="w-4 h-4 mr-2 text-pink-400" />
                      Instructor Community
                    </h3>
                  </div>
                  <div className="p-4 bg-gray-900 rounded">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex -space-x-2">
                        {featuredInstructors.slice(0, 3).map((instructor) => (
                          <div
                            key={instructor.id}
                            className="w-6 h-6 rounded-full relative"
                          >
                            <Image
                              src={instructor.avatarUrl}
                              alt={instructor.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        {
                          featuredInstructors.filter(
                            (m) => m.lastActive === "Online now"
                          ).length
                        }{" "}
                        instructors online
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["teaching", "courses", "ai-tools", "analytics"].map(
                        (topic, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-400 text-xs rounded-full px-2 py-1"
                          >
                            #{topic}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="bg-gray-900/40 backdrop-blur-sm  shadow-xl p-6 hover:shadow-pink-900/20 transition duration-300 order-1 md:order-2">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                    Instructor Login
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    Access your teaching dashboard
                  </p>
                </div>

                {/* Display error message if there is one */}
                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-300"
                    >
                      Email Address
                    </label>
                    <div
                      className={`relative transition-all duration-300 ${
                        formFocus.email ? "transform scale-[1.02]" : ""
                      }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail
                          className={`h-4 w-4 transition-colors duration-300 ${
                            formFocus.email ? "text-pink-400" : "text-gray-500"
                          }`}
                        />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                        placeholder="instructor@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-xs font-medium text-gray-300"
                      >
                        Password
                      </label>
                      <Link
                        href="/instructor/forgot-password"
                        className="text-xs font-medium text-pink-400 hover:text-pink-300 transition-colors duration-300"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div
                      className={`relative transition-all duration-300 ${
                        formFocus.password ? "transform scale-[1.02]" : ""
                      }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock
                          className={`h-4 w-4 transition-colors duration-300 ${
                            formFocus.password
                              ? "text-pink-400"
                              : "text-gray-500"
                          }`}
                        />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("password")}
                        onBlur={() => handleBlur("password")}
                        className="w-full h-11 pl-12 pr-12 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-pink-400 focus:outline-none transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center py-2">
                    <div className="flex items-center h-5">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-pink-500 bg-gray-900 border-gray-700 rounded focus:ring-pink-500 focus:ring-offset-gray-800 transition-all duration-200"
                      />
                    </div>
                    <div className="ml-2">
                      <label
                        htmlFor="rememberMe"
                        className="text-sm text-gray-300"
                      >
                        Remember me on this device
                      </label>
                    </div>
                  </div>

                  {/* Login Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded text-white ${
                        isLoading
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      } transition-all duration-300 font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 group`}
                    >
                      {isLoading ? (
                        <span className="text-sm flex items-center gap-2">
                          <LoadingSpinner size="xs" />
                          Signing in...
                        </span>
                      ) : (
                        <>
                          <span className="text-sm">Sign In</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

              
                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-400">
                    New to teaching?{" "}
                    <Link
                      href="/instructor/register"
                      className="text-pink-400 hover:text-pink-300 font-medium"
                    >
                      Apply to become an instructor
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
