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
  User, 
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
  Github,
  Phone,
  FileText
} from 'lucide-react';
import AnimatedBackground from '../../../components/ui/AnimatedBackground';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { useToast } from '../../../hooks/useToast';
import teacherService from '../../../services/teacherService';

interface FormData {
  // Step 1: Account Info
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Step 2: Profile Info
  bio: string;
  expertise: string;
  phoneNumber: string;
  // Step 3: Agreement
  agreeToTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  bio?: string;
  expertise?: string;
  phoneNumber?: string;
  agreeToTerms?: string;
  submit?: string;
}

interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  lastActive: string;
}

export default function InstructorRegister() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const toast = useToast();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { number: 1, title: 'Account', description: 'Basic information' },
    { number: 2, title: 'Profile', description: 'Teaching details' },
    { number: 3, title: 'Complete', description: 'Terms & finish' }
  ];
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    expertise: '',
    phoneNumber: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Animation and UI states
  const [formFocus, setFormFocus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    bio: false,
    expertise: false,
    phoneNumber: false,
  });

  // Motivational slide content for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const motivationalContent = [
    {
      title: "Join Our Instructors",
      description: "Share your knowledge and earn money teaching students worldwide",
      stats: [
        { number: "10K+", label: "New Students Monthly" },
        { number: "$3,500", label: "Avg. Instructor Earnings" },
      ],
    },
    {
      title: "Expert Community",
      description: "Connect with experienced educators and grow your teaching skills",
      stats: [
        { number: "95%", label: "Instructor Satisfaction" },
        { number: "24/7", label: "Community Support" },
      ],
    },
    {
      title: "Global Impact",
      description: "Make a difference in students' lives across 190+ countries",
      stats: [
        { number: "500+", label: "Success Stories" },
        { number: "Weekly", label: "New Opportunities" },
      ],
    },
  ];

  // Featured instructors mockup
  const featuredInstructors: Member[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "AI/ML Expert",
      lastActive: "Online now",
    },
    {
      id: "2",
      name: "Prof. Alex Kumar",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Web Development",
      lastActive: "Online now",
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Data Science",
      lastActive: "Online now",
    },
    {
      id: "4",
      name: "James Wilson",
      avatarUrl: "/testimonial-avatar.jpg",
      role: "Mobile Development",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    
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

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (step === 2) {
      if (!formData.bio.trim()) newErrors.bio = 'Bio is required (minimum 50 characters)';
      else if (formData.bio.length < 50) newErrors.bio = 'Bio must be at least 50 characters';
      if (!formData.expertise.trim()) newErrors.expertise = 'Area of expertise is required';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (step === 3) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    if (currentStep < 3) {
      handleNext();
      return;
    }
    
    setIsLoading(true);
    
    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        bio: formData.bio,
        experience: formData.bio,
        expertise: formData.expertise ? [formData.expertise] : [],
        teachingExperience: {
          years: 0,
          description: formData.bio || ''
        },
        phoneNumber: formData.phoneNumber,
        agreeToVerification: formData.agreeToTerms
      };

      console.log('🚀 Sending registration data:', registrationData);

      const response = await teacherService.register(registrationData);
      
      if (response.success) {
        if (response.token) localStorage.setItem('teacher_token', response.token);
        if (response.data) localStorage.setItem('teacher_info', JSON.stringify(response.data));
        
        toast.success('Registration successful! Please complete your verification to get started.');
        router.push('/instructor/verification');
      } else {
        const errorMessage = response.error || response.message || 'Registration failed';
        setErrors({ submit: errorMessage });
        toast.error('Registration failed. Please check your information and try again.');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      let errorMessage = 'Network error. Please try again.';
      if (err.message && err.message.includes('HTTP error')) {
        errorMessage = 'Registration failed. Please check your information.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setErrors({ submit: errorMessage });
      toast.error('Registration failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Teaching', href: '/instructor' },
    { label: 'Register', active: true }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3">
            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs text-gray-600 mb-1">
                Full Name
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.name ? "transform scale-[1.01]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-3.5 w-3.5 transition-colors duration-300 ${formFocus.name ? "text-blue-600" : "text-gray-400"}`} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="Your full name"
                />
              </div>
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs text-gray-600 mb-1">
                Email Address
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.email ? "transform scale-[1.01]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-3.5 w-3.5 transition-colors duration-300 ${formFocus.email ? "text-blue-600" : "text-gray-400"}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="instructor@example.com"
                />
              </div>
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs text-gray-600 mb-1">
                Password
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.password ? "transform scale-[1.01]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-3.5 w-3.5 transition-colors duration-300 ${formFocus.password ? "text-blue-600" : "text-gray-400"}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full h-9 pl-10 pr-10 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-gray-800 text-xs outline-none transition-all duration-300 placeholder-gray-500"
                  placeholder="Create a strong password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-xs text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.confirmPassword ? "transform scale-[1.01]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-3.5 w-3.5 transition-colors duration-300 ${formFocus.confirmPassword ? "text-blue-600" : "text-gray-400"}`} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  className="w-full h-9 pl-10 pr-10 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-gray-800 text-xs outline-none transition-all duration-300 placeholder-gray-500"
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            {/* Bio Input */}
            <div className="space-y-1">
              <label htmlFor="bio" className="block text-xs text-gray-600 mb-1">
                Professional Bio
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.bio ? "transform scale-[1.01]" : ""}`}>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("bio")}
                  onBlur={() => handleBlur("bio")}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm resize-none"
                  placeholder="Tell us about your teaching experience, skills, and what makes you a great instructor... (minimum 50 characters)"
                />
              </div>
              <div className="flex justify-between items-center">
                {errors.bio && <p className="text-red-600 text-xs">{errors.bio}</p>}
                <p className="text-gray-500 text-xs">{formData.bio.length}/50 characters minimum</p>
              </div>
            </div>

            {/* Expertise Input */}
            <div className="space-y-1">
              <label htmlFor="expertise" className="block text-xs text-gray-600 mb-1">
                Primary Area of Expertise
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.expertise ? "transform scale-[1.01]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className={`h-3.5 w-3.5 transition-colors duration-300 ${formFocus.expertise ? "text-blue-600" : "text-gray-400"}`} />
                </div>
                <input
                  id="expertise"
                  name="expertise"
                  type="text"
                  required
                  value={formData.expertise}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("expertise")}
                  onBlur={() => handleBlur("expertise")}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="e.g. Web Development, Data Science, Mobile Apps"
                />
              </div>
              {errors.expertise && <p className="text-red-600 text-xs mt-1">{errors.expertise}</p>}
            </div>

            {/* Phone Number Input */}
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="block text-xs text-gray-600 mb-1">
                Phone Number
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.phoneNumber ? "transform scale-[1.01]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className={`h-3.5 w-3.5 transition-colors duration-300 ${formFocus.phoneNumber ? "text-blue-600" : "text-gray-400"}`} />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("phoneNumber")}
                  onBlur={() => handleBlur("phoneNumber")}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Almost Done!</h3>
              <p className="text-gray-600 text-xs">Review your information and agree to our terms to complete your registration.</p>
            </div>

            <div className="bg-blue-50 rounded border border-blue-100 p-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">Name:</span>
                <span className="text-gray-800 text-xs font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">Email:</span>
                <span className="text-gray-800 text-xs font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">Expertise:</span>
                <span className="text-gray-800 text-xs font-medium">{formData.expertise}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">Phone:</span>
                <span className="text-gray-800 text-xs font-medium">{formData.phoneNumber}</span>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-0.5 h-3.5 w-3.5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-white transition-all duration-200"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-gray-700 leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Privacy Policy
                  </Link>
                  . I understand that my instructor application will be reviewed and I'll receive verification instructions via email.
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-600 text-xs">{errors.agreeToTerms}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Purple decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-bl-[100px] z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-100 via-blue-900 to-gray-100 rounded-tr-[100px] z-0" />

      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <div className="flex w-full max-w-6xl h-[600px] bg-white shadow-2xl overflow-hidden">
          {/* Left Side - Instructor Registration Form */}
          <div className="w-[40%] bg-white p-8 flex flex-col justify-center">
            {/* Blue accent bar at top */}
            <div className="w-70 h-0.5 bg-indigo-600 mb-6 rounded-full" />

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Become an Instructor</h1>
            <p className="text-xs text-center text-gray-500 mb-6">Join thousands of educators worldwide</p>

            {/* Step Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-6 h-px transition-all duration-300 ${
                        currentStep > step.number
                          ? 'bg-indigo-600'
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h4 className="text-xs font-semibold text-gray-800">
                  {steps[currentStep - 1].title}
                </h4>
                <p className="text-xs text-gray-600">
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>

            {/* Display error message if there is one */}
            {errors.submit && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600 text-xs">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
              {renderStepContent()}

              {/* Form Actions */}
              <div className="flex justify-between items-center pt-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded text-xs transition-all duration-300"
                  >
                    Previous+-
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${currentStep === 1 ? 'w-full' : 'ml-auto'} text-white py-3 px-6 rounded font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm ${
                    isLoading 
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-1">
                      <LoadingSpinner size="xs" />
                      {currentStep === 3 ? 'Creating Account...' : 'Processing...'}
                    </span>
                  ) : (
                    currentStep === 3 ? 'COMPLETE REGISTRATION' : 'CONTINUE'
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-4">
              <Link href="/instructor/login" className="flex items-center text-xs text-center pl-7 text-gray-600 hover:text-indigo-600 transition-colors group">
                <span>Already an instructor? Sign in here</span>
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
                  <span className="text-sm font-semibold">🎓 Share Your Expertise</span>
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
