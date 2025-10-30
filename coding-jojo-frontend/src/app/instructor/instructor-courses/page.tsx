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
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading your dashboard...</p>
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Use the new InstructorNavbar */}
      <InstructorNavbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Verification Prompt Modal */}
        {showVerificationPrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-gray-200  p-6 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">Verify Your Account</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Complete your account verification to unlock all instructor features and start earning from your courses.
                </p>
                
                <div className="space-y-2">
                  <button
                    onClick={handleVerifyNow}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-sm rounded transition-all duration-300 shadow-md"
                  >
                    Verify Now
                  </button>
                  <button
                    onClick={handleSkipVerification}
                    className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-sm rounded transition-all duration-300"
                  >
                    Skip for Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200  shadow-lg p-6 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-blue-500/30 rounded-full blur-xl opacity-50 pointer-events-none"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-500/40 rounded-full blur-xl opacity-60 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="block w-10 h-10 rounded-full border-2 border-blue-400 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                    <User className="h-5 w-5 text-white" />
                  </span>
                  <span className="font-medium text-sm text-blue-600">
                    Welcome back!
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  {getGreeting()},{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 text-transparent bg-clip-text">
                    {userName || 'Instructor'}
                  </span>
                  !
                  <Sparkles className="inline-block ml-1 h-5 w-5 text-blue-500" />
                </h1>
                <p className="text-sm text-gray-600 mb-2">
                  Ready to inspire and teach the next generation of coders?
                </p>
                <div className="text-xs text-blue-600/90 italic flex items-center gap-2">
                  <Star className="h-3 w-3 text-blue-500" />
                  <span>Transform your knowledge into impact - create engaging courses today!</span>
                </div>
              </div>
              <div className="flex-shrink-0 hidden lg:block relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center shadow-lg border-2 border-blue-100">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <div className="absolute bottom-0 -right-2 flex flex-col items-center space-y-1">
                  <span className="inline-flex px-2 py-0.5 bg-blue-100 text-xs text-blue-700 font-medium rounded">
                    Instructor
                  </span>
                </div>
              </div>
            </div>
            {/* Instructor Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
              <div className="bg-blue-50 border border-blue-100 rounded p-3 flex flex-col items-center hover:scale-[1.02] transition-all shadow-sm">
                <BookOpen className="h-5 w-5 text-blue-600 mb-1" />
                <p className="text-gray-600 text-xs">Total Courses</p>
                <p className="text-lg font-bold text-gray-900">
                  {instructorStats.totalCourses}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded p-3 flex flex-col items-center hover:scale-[1.02] transition-all shadow-sm">
                <Users className="h-5 w-5 text-blue-600 mb-1" />
                <p className="text-gray-600 text-xs">Total Students</p>
                <p className="text-lg font-bold text-gray-900">
                  {instructorStats.totalStudents}
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded p-3 flex flex-col items-center hover:scale-[1.02] transition-all shadow-sm">
                <DollarSign className="h-5 w-5 text-yellow-600 mb-1" />
                <p className="text-gray-600 text-xs">Total Earnings</p>
                <p className="text-lg font-bold text-gray-900">
                  ${instructorStats.totalEarnings}
                </p>
              </div>
              <div className="bg-pink-50 border border-pink-100 rounded p-3 flex flex-col items-center hover:scale-[1.02] transition-all shadow-sm">
                <Star className="h-5 w-5 text-pink-600 mb-1" />
                <p className="text-gray-600 text-xs">Avg Rating</p>
                <p className="text-lg font-bold text-gray-900">
                  {instructorStats.avgRating}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Reminder Section - Only show if not verified */}
        {!isVerified && (
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200  p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Complete Your Verification</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    To unlock all instructor features and start earning from your courses, please complete your account verification. 
                    This helps us keep our platform secure and ensures you can receive payments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <button
                      onClick={goToVerification}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium text-sm rounded transition-all duration-300 shadow-md"
                    >
                      <GraduationCap className="mr-1.5 w-3.5 h-3.5" />
                      Verify Account Now
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </button>
                    <div className="text-xs text-gray-500 flex items-center justify-center lg:justify-start">
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
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Your Teaching Journey</h2>
              <p className="text-gray-600 text-sm">Track your progress and manage your courses</p>
            </div>
            
            <div className="mt-3 lg:mt-0 flex flex-col sm:flex-row gap-3 items-center">
              <Link
                href="/instructor/courses/create"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-sm rounded transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Plus className="mr-1.5 w-3.5 h-3.5" />
                Create New Course
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500 text-xs min-w-[200px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Ready to create your first course?</h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Whether you've been teaching for years or are teaching for the first time, you can create an engaging course.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200  p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="text-4xl">👩‍🏫</div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Create an Engaging Course</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  We've compiled resources and best practices to help you get to the next level, no matter where you're starting.
                </p>
                <Link
                  href="/instructor/courses/create"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-sm rounded transition-all duration-200 shadow-md"
                >
                  Get Started
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
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
            <div key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200  p-4 shadow-sm group hover:border-gray-300 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{section.illustration}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-gray-600 mb-3 text-xs">
                    {section.description}
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center group text-xs">
                    {section.cta}
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Instructor Challenge */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200  p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="text-4xl">🎯</div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Join the New Instructor Challenge!</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate.
                </p>
                <Link
                  href="/instructor/courses/create"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-sm rounded transition-all duration-200 shadow-md"
                >
                  Start Challenge
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Help Resources */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Need help getting started?</h3>
            <p className="text-gray-600 text-sm">
              Here are our most popular instructor resources to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200  p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-gray-300">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm">
                      {resource.title}
                    </h4>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
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
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200  p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ready to inspire learners worldwide?</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Create your first course and start your teaching journey today!
            </p>
            <Link
              href="/instructor/courses/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <Plus className="mr-1.5 w-3.5 h-3.5" />
              Create Your First Course
            </Link>
          </div>
        </div>
      </div>

<Footer />
    </div>
  );
}
