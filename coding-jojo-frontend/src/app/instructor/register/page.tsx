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
          <div className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-medium text-gray-300">
                Full Name
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.name ? "transform scale-[1.02]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-4 w-4 transition-colors duration-300 ${formFocus.name ? "text-pink-400" : "text-gray-500"}`} />
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
                  className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                  placeholder="Your full name"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-medium text-gray-300">
                Email Address
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.email ? "transform scale-[1.02]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-4 w-4 transition-colors duration-300 ${formFocus.email ? "text-pink-400" : "text-gray-500"}`} />
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
                  className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                  placeholder="instructor@example.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs font-medium text-gray-300">
                Password
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.password ? "transform scale-[1.02]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 transition-colors duration-300 ${formFocus.password ? "text-pink-400" : "text-gray-500"}`} />
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
                  className="w-full h-11 pl-12 pr-12 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                  placeholder="Create a strong password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-pink-400 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-300">
                Confirm Password
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.confirmPassword ? "transform scale-[1.02]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 transition-colors duration-300 ${formFocus.confirmPassword ? "text-pink-400" : "text-gray-500"}`} />
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
                  className="w-full h-11 pl-12 pr-12 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-pink-400 focus:outline-none transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            {/* Bio Input */}
            <div className="space-y-1">
              <label htmlFor="bio" className="block text-xs font-medium text-gray-300">
                Professional Bio
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.bio ? "transform scale-[1.02]" : ""}`}>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  required
                  value={formData.bio}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("bio")}
                  onBlur={() => handleBlur("bio")}
                  className="w-full p-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 resize-none"
                  placeholder="Tell us about your teaching experience, skills, and what makes you a great instructor... (minimum 50 characters)"
                />
              </div>
              <div className="flex justify-between items-center">
                {errors.bio && <p className="text-red-400 text-sm">{errors.bio}</p>}
                <p className="text-gray-400 text-xs">{formData.bio.length}/50 characters minimum</p>
              </div>
            </div>

            {/* Expertise Input */}
            <div className="space-y-1">
              <label htmlFor="expertise" className="block text-xs font-medium text-gray-300">
                Primary Area of Expertise
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.expertise ? "transform scale-[1.02]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className={`h-4 w-4 transition-colors duration-300 ${formFocus.expertise ? "text-pink-400" : "text-gray-500"}`} />
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
                  className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                  placeholder="e.g. Web Development, Data Science, Mobile Apps"
                />
              </div>
              {errors.expertise && <p className="text-red-400 text-sm mt-1">{errors.expertise}</p>}
            </div>

            {/* Phone Number Input */}
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-300">
                Phone Number
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.phoneNumber ? "transform scale-[1.02]" : ""}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className={`h-4 w-4 transition-colors duration-300 ${formFocus.phoneNumber ? "text-pink-400" : "text-gray-500"}`} />
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
                  className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Almost Done!</h3>
              <p className="text-gray-300">Review your information and agree to our terms to complete your registration.</p>
            </div>

            <div className="bg-gray-900 rounded p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Name:</span>
                <span className="text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Email:</span>
                <span className="text-white">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Expertise:</span>
                <span className="text-white">{formData.expertise}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Phone:</span>
                <span className="text-white">{formData.phoneNumber}</span>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-pink-500 bg-gray-900 border-gray-600 rounded focus:ring-pink-500 focus:ring-offset-gray-800 transition-all duration-200"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-300 leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-pink-400 hover:text-pink-300 transition-colors">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-pink-400 hover:text-pink-300 transition-colors">
                    Privacy Policy
                  </Link>
                  . I understand that my instructor application will be reviewed and I'll receive verification instructions via email.
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
                      {["teaching", "mentoring", "course-creation", "community"].map(
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

            {/* Right Column: Registration Form */}
            <div className="bg-gray-900/40 backdrop-blur-sm  shadow-xl p-6 hover:shadow-pink-900/20 transition duration-300 order-1 md:order-2">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                    Become an Instructor
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    Join thousands of educators worldwide
                  </p>
                </div>

                {/* Step Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
                          currentStep >= step.number
                            ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {step.number}
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-8 h-px transition-all duration-300 ${
                            currentStep > step.number
                              ? 'bg-gradient-to-r from-pink-500 to-orange-500'
                              : 'bg-gray-700'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-white">
                      {steps[currentStep - 1].title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {steps[currentStep - 1].description}
                    </p>
                  </div>
                </div>

                {/* Display error message if there is one */}
                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                  {renderStepContent()}

                  {/* Form Actions */}
                  <div className="flex justify-between items-center pt-4">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="px-6 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded transition-all duration-300"
                      >
                        Previous
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`${currentStep === 1 ? 'w-full' : 'ml-auto'} flex justify-center items-center py-3 px-6 border border-transparent rounded text-white ${
                        isLoading
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      } transition-all duration-300 font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 group`}
                    >
                      {isLoading ? (
                        <span className="text-sm flex items-center gap-2">
                          <LoadingSpinner size="xs" />
                          {currentStep === 3 ? 'Creating Account...' : 'Processing...'}
                        </span>
                      ) : (
                        <>
                          <span className="text-sm">
                            {currentStep === 3 ? 'Create Account' : 'Continue'}
                          </span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-400">
                    Already have an instructor account?{" "}
                    <Link
                      href="/instructor/login"
                      className="text-pink-400 hover:text-pink-300 font-medium"
                    >
                      Sign in here
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
