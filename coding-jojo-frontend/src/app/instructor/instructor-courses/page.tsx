'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  BookOpen,
  Users,
  Star,
  DollarSign,
  Video,
  ArrowRight,
  Globe,
  HelpCircle,
  BarChart3,
  GraduationCap,
  Menu,
  X,
  Sparkles,
  User,
  Brain,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import Link from 'next/link';
import teacherService from '../../../services/teacherService';
import AnimatedBackground from '../../../components/ui/AnimatedBackground';
import InstructorNavbar from '../../../components/InstructorNavbar';
import Footer from '../../../components/Footer';

export default function InstructorCoursesPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const authStatus = teacherService.isAuthenticated();
        const teacherInfo = teacherService.getTeacherInfo();
        
        if (!authStatus) {
          router.push('/instructor/login');
          return;
        }

        // Check verification status - but don't redirect, just track
        const teacherData = localStorage.getItem('teacher_info');
        if (teacherData) {
          const info = JSON.parse(teacherData);
          console.log('Teacher info from localStorage:', info); // Debug log
          // Try multiple possible name fields
          const instructorName = info.fullName || info.firstName || info.name || teacherInfo?.name || teacherInfo?.firstName || 'Instructor';
          console.log('Setting instructor name to:', instructorName); // Debug log
          setUserName(instructorName);
          
          // Check if verification is complete
          const verificationComplete = info.emailVerified && info.phoneVerified && info.kycCompleted;
          setIsVerified(verificationComplete);
          
          // Show verification prompt if first time and not verified
          if (!verificationComplete && !localStorage.getItem('verification_prompt_shown')) {
            setShowVerificationPrompt(true);
          }
        } else {
          console.log('No teacher_info in localStorage, using teacherInfo:', teacherInfo); // Debug log
          // Fallback to teacherInfo if localStorage doesn't have the data
          const instructorName = teacherInfo?.name || teacherInfo?.firstName || teacherInfo?.fullName || 'Instructor';
          console.log('Setting fallback instructor name to:', instructorName); // Debug log
          setUserName(instructorName);
          setIsVerified(false);
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        router.push('/instructor/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Update time for dynamic greeting
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleLogout = async () => {
    try {
      await teacherService.logout();
      router.push('/instructor');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleVerifyNow = () => {
    localStorage.setItem('verification_prompt_shown', 'true');
    setShowVerificationPrompt(false);
    router.push('/instructor/verification');
  };

  const handleSkipVerification = () => {
    localStorage.setItem('verification_prompt_shown', 'true');
    setShowVerificationPrompt(false);
  };

  const goToVerification = () => {
    router.push('/instructor/verification');
  };

  // Calculate instructor stats
  const instructorStats = {
    totalCourses: 0, // Will be calculated from actual course data
    totalStudents: 0, // Will be calculated from enrollment data
    totalEarnings: 0, // Will be calculated from payment data
    avgRating: 0.0, // Will be calculated from course ratings
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (this shouldn't happen due to useEffect, but just in case)
  if (!isAuthenticated) {
    return null;
  }

  const practiceTests = {
    title: 'We upgraded practice tests so you can upgrade yours.',
    description: 'With our creation improvements, new question types, and generative AI features, maximize your practice test\'s certification prep potential.',
    actions: ['Learn more', 'Dismiss']
  };

  const quickActions = [
    {
      title: 'Create an Engaging Course',
      description: 'Whether you\'ve been teaching for years or are teaching for the first time, you can create an engaging course. We\'ve compiled resources and best practices to help you get to the next level, no matter where you\'re starting.',
      cta: 'Get Started',
      icon: BookOpen,
      color: 'from-blue-500 to-purple-600',
      illustration: '👩‍🏫'
    }
  ];

  const helpSections = [
    {
      title: 'Get Started with Video',
      description: 'Quality video lectures can set your course apart. Use our resources to learn the basics.',
      cta: 'Get Started',
      icon: Video,
      illustration: '🎥'
    },
    {
      title: 'Build Your Audience',
      description: 'Set your course up for success by building your audience.',
      cta: 'Get Started',
      icon: Users,
      illustration: '📈'
    }
  ];

  const challengeSection = {
    title: 'Join the New Instructor Challenge!',
    description: 'Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!',
    cta: 'Get Started',
    illustration: '🎯'
  };

  const resources = [
    {
      title: 'Test Video',
      description: 'Send us a sample video and get expert feedback.',
      icon: Video
    },
    {
      title: 'Instructor Community',
      description: 'Connect with experienced instructors. Ask questions, browse discussions, and more.',
      icon: Users
    },
    {
      title: 'Teaching Center',
      description: 'Learn about best practices for teaching on Coding Jojo.',
      icon: BookOpen
    },
    {
      title: 'Marketplace Insights',
      description: 'Validate your course topic by exploring our marketplace supply and demand.',
      icon: BarChart3
    },
    {
      title: 'Help and Support',
      description: 'Browse our Help Center or contact our support team.',
      icon: HelpCircle
    }
  ];

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      
      {/* Use the new InstructorNavbar */}
      <InstructorNavbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Prompt Modal */}
        {showVerificationPrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 p-8 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Verify Your Account</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Complete your account verification to unlock all instructor features and start earning from your courses.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleVerifyNow}
                    className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
                  >
                    Verify Now
                  </button>
                  <button
                    onClick={handleSkipVerification}
                    className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-300"
                  >
                    Skip for Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/50 shadow-2xl shadow-purple-900/10 backdrop-blur-lg p-8 pb-12 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-purple-500/30 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/40 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="block w-12 h-12 rounded-full border-2 border-purple-400 bg-gradient-to-br from-purple-600 via-pink-600 to-pink-400 flex items-center justify-center shadow-lg">
                    <User className="h-7 w-7 text-white" />
                  </span>
                  <span className="font-semibold text-lg text-purple-200">
                    Welcome back!
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow">
                  {getGreeting()},{" "}
                  <span className="bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text">
                    {userName || 'Instructor'}
                  </span>
                  !
                  <Sparkles className="inline-block ml-2 h-8 w-8 text-yellow-400 animate-bounce" />
                </h1>
                <p className="text-xl text-gray-300 mb-2">
                  Ready to inspire and teach the next generation of coders?
                </p>
                <div className="text-sm text-pink-200/90 italic flex items-center gap-2 animate-fade-in-down">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span>Transform your knowledge into impact - create engaging courses today!</span>
                </div>
              </div>
              <div className="flex-shrink-0 hidden lg:block relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-400 via-pink-500 to-yellow-400 flex items-center justify-center shadow-2xl shadow-pink-900/20 border-4 border-white/10 animate-spin-slow">
                  <GraduationCap className="h-16 w-16 text-white drop-shadow" />
                </div>
                <div className="absolute bottom-0 -right-4 flex flex-col items-center space-y-2">
                  <span className="inline-flex px-4 py-1 bg-white/20 text-xs text-white font-semibold uppercase tracking-wider">
                    Instructor
                  </span>
                </div>
              </div>
            </div>
            {/* Instructor Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-purple-500/10">
                <BookOpen className="h-8 w-8 text-blue-400 mb-1" />
                <p className="text-gray-300 text-xs">Total Courses</p>
                <p className="text-2xl font-bold text-white">
                  {instructorStats.totalCourses}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-green-500/10">
                <Users className="h-8 w-8 text-green-400 mb-1" />
                <p className="text-gray-300 text-xs">Total Students</p>
                <p className="text-2xl font-bold text-white">
                  {instructorStats.totalStudents}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-yellow-500/10">
                <DollarSign className="h-8 w-8 text-yellow-400 mb-1" />
                <p className="text-gray-300 text-xs">Total Earnings</p>
                <p className="text-2xl font-bold text-white">
                  ${instructorStats.totalEarnings}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center hover:scale-[1.04] transition-all shadow-md shadow-pink-500/10">
                <Star className="h-8 w-8 text-pink-400 mb-1" />
                <p className="text-gray-300 text-xs">Avg Rating</p>
                <p className="text-2xl font-bold text-white">
                  {instructorStats.avgRating}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Reminder Section - Only show if not verified */}
        {!isVerified && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30 p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-white mb-3">Complete Your Verification</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    To unlock all instructor features and start earning from your courses, please complete your account verification. 
                    This helps us keep our platform secure and ensures you can receive payments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button
                      onClick={goToVerification}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-500/30"
                    >
                      <GraduationCap className="mr-2 w-5 h-5" />
                      Verify Account Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <div className="text-sm text-gray-400 flex items-center justify-center lg:justify-start">
                      <span className="flex items-center">
                        ⏱️ Takes only 5-10 minutes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Dashboard Overview Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Your Teaching Journey</h2>
              <p className="text-gray-300">Track your progress and manage your courses</p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="/instructor/courses/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/30 hover:scale-105"
              >
                <Plus className="mr-2 w-5 h-5" />
                Create New Course
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 min-w-[250px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to create your first course?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Whether you've been teaching for years or are teaching for the first time, you can create an engaging course.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="text-6xl">👩‍🏫</div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Create an Engaging Course</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We've compiled resources and best practices to help you get to the next level, no matter where you're starting.
                </p>
                <Link
                  href="/instructor/courses/create"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-semibold  transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: 'Get Started with Video',
              description: 'Quality video lectures can set your course apart. Use our resources to learn the basics.',
              cta: 'Learn More',
              icon: Video,
              illustration: '🎥'
            },
            {
              title: 'Build Your Audience',
              description: 'Set your course up for success by building your audience and marketing effectively.',
              cta: 'Get Started',
              icon: Users,
              illustration: '📈'
            }
          ].map((section, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-6 shadow-xl group hover:border-gray-600 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="text-4xl">{section.illustration}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                  <p className="text-gray-300 mb-4">
                    {section.description}
                  </p>
                  <button className="text-pink-400 hover:text-pink-300 font-medium transition-colors flex items-center group">
                    {section.cta}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Instructor Challenge */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="text-6xl">🎯</div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Join the New Instructor Challenge!</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate.
                </p>
                <Link
                  href="/instructor/courses/create"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-semibold  transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
                >
                  Start Challenge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Help Resources */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Need help getting started?</h3>
            <p className="text-gray-300">
              Here are our most popular instructor resources to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: 'Test Video', description: 'Send us a sample video and get expert feedback.', icon: Video },
              { title: 'Instructor Community', description: 'Connect with experienced instructors.', icon: Users },
              { title: 'Teaching Center', description: 'Learn about best practices for teaching on Coding Jojo.', icon: BookOpen },
              { title: 'Marketplace Insights', description: 'Validate your course topic by exploring market demand.', icon: BarChart3 },
              { title: 'Help and Support', description: 'Browse our Help Center or contact our support team.', icon: HelpCircle }
            ].map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Link key={index} href="#" className="group">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-6 text-center shadow-xl hover:shadow-pink-500/25 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-gray-600">
                    <div className="w-12 h-12 bg-gray-800/50  flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/20 transition-colors">
                      <Icon className="h-6 w-6 text-gray-400 group-hover:text-pink-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                      {resource.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to inspire learners worldwide?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Create your first course and start your teaching journey today!
            </p>
            <Link
              href="/instructor/courses/create"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white text-lg font-semibold  shadow-lg transition-all duration-300 hover:shadow-pink-500/30 hover:shadow-xl hover:scale-105"
            >
              <Plus className="mr-2 w-5 h-5" />
              Create Your First Course
            </Link>
          </div>
        </div>
      </div>

<Footer />
    </div>
  );
}
