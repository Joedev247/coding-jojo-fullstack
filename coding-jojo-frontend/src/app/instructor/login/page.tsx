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
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Purple decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-bl-[100px] z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-tr-[100px] z-0" />

      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <div className="flex w-full max-w-6xl h-[600px] bg-white shadow-2xl overflow-hidden">
          
          {/* Left Side - Instructor Login Form */}
          <div className="w-[30%] bg-white p-8 flex flex-col justify-center">
            {/* Blue accent bar at top */}
            <div className="w-70 h-0.5 bg-indigo-600 mb-6 rounded-full" />

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome Back, Instructor!</h1>
            <p className="text-xs text-center text-gray-500 mb-6">Sign in to access your teaching dashboard</p>

            {/* Display error message if there is one */}
            {errors.submit && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600 text-xs">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs text-gray-600 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="instructor@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-xs text-gray-600">
                    Password
                  </label>
                  <Link
                    href="/instructor/forgot-password"
                    className="text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your password"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500 focus:ring-offset-white transition-all"
                />
                <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-700">
                  Remember me on this device
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white py-3 rounded font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm ${
                  isLoading 
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-1">
                    <LoadingSpinner size="xs" />
                    Signing in...
                  </span>
                ) : (
                  "ACCESS DASHBOARD"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-4">
              <Link href="/instructor/register" className="flex items-center text-xs text-center pl-7 text-gray-600 hover:text-indigo-600 transition-colors group">
                <span>New to teaching? Apply to become an instructor</span>
                <svg 
                  className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - Teaching Platform Content */}
          <div className="w-[70%] relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop')",
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-900/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12 text-white">
              <div className="mb-8">
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                  <span className="text-sm font-semibold">🎓 Teach Anywhere, Anytime</span>
                </div>
                <h2 className="text-5xl font-bold mb-6">Start Your <br /> Teaching Journey</h2>
                <p className="text-bold justify-center text-center leading-relaxed w-full max-w-lg mb-8">
                  Join thousands of instructors who are sharing their expertise and building sustainable income streams. Create courses that reach students worldwide.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                <div className="bg-white/10 backdrop-blur-md p-4 border border-white/20 rounded">
                  <div className="text-3xl font-bold mb-1">10K+</div>
                  <div className="text-xs text-white/80">Instructors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 border border-white/20 rounded">
                  <div className="text-3xl font-bold mb-1">$3,200</div>
                  <div className="text-xs text-white/80">Avg Monthly</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 border border-white/20 rounded">
                  <div className="text-3xl font-bold mb-1">97%</div>
                  <div className="text-xs text-white/80">Satisfaction</div>
                </div>
              </div>

              {/* Featured Instructor Card */}
              <div className="mt-8 bg-white p-4 shadow-2xl max-w-sm w-full rounded">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-semibold text-gray-800">Featured Instructor</div>
                    <div className="text-xs text-gray-500 mt-1">Dr. Sarah Chen - Web Development</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-xs">★★★★★</span>
                      </div>
                      <span className="text-xs text-gray-400">4.9 (1.2K students)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-indigo-600">$2,400</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
