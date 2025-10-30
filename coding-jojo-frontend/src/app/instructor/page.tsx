'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  Users,
  DollarSign,
  Star,
  BookOpen,
  Video,
  BarChart3,
  MessageSquare,
  Award,
  Globe,
  CheckCircle,
  TrendingUp,
  Menu,
  X,
  GraduationCap,
  ChevronDown,
  Lightbulb,
  Target,
  Clock,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import InstructorNavbar from '../../components/InstructorNavbar';
import teacherService from '../../services/teacherService';
import Footer from '../../components/Footer';

export default function InstructorLandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if instructor is already authenticated
    const checkAuth = () => {
      const authStatus = teacherService.isAuthenticated();
      const teacherInfo = teacherService.getTeacherInfo();
      
      // If authenticated, redirect to instructor dashboard
      if (authStatus) {
        router.push('/instructor/instructor-courses');
        return;
      }
      
      setIsAuthenticated(authStatus);
      if (authStatus && teacherInfo) {
        setUserName(teacherInfo.name || teacherInfo.firstName || 'Instructor');
      }
    };

    checkAuth();
  }, [router]);

  const stats = [
    { value: '57M+', label: 'Students' },
    { value: '213K+', label: 'Instructors' },
    { value: '1.5B', label: 'Course enrollments' },
    { value: '180+', label: 'Countries' }
  ];

  const benefits = [
    {
      icon: Video,
      title: 'Shape Your Own Path',
      description: 'Design courses that reflect your expertise and teaching style. You have full creative freedom and control.'
    },
    {
      icon: Users,
      title: 'Empower Global Learners',
      description: 'Share your knowledge to inspire students worldwide and help them unlock new opportunities.'
    },
    {
      icon: DollarSign,
      title: 'Grow Your Impact',
      description: 'Build your reputation, connect with a vibrant community, and earn income as your courses reach more people.'
    }
  ];

  const platformFeatures = [
    {
      icon: Video,
      title: 'Create Engaging Content',
      description: 'Craft interactive lessons and resources that keep students motivated and learning.'
    },
    {
      icon: Target,
      title: 'Map Out Success',
      description: 'Organize your curriculum with clear goals and a step-by-step learning journey.'
    },
    {
      icon: Play,
      title: 'Produce Quality Videos',
      description: 'Easily record and edit professional lessons with our intuitive tools.'
    },
    {
      icon: BookOpen,
      title: 'Reach Your Audience',
      description: 'Publish your course and connect with eager learners around the world.'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Design Your Course',
      description: 'Start with your passion and expertise. Choose a topic that excites you and outline your unique approach.',
      detail: 'Use our insights and templates to organize your ideas and set clear learning outcomes.',
      cta: 'See course planning tips'
    },
    {
      step: '2',
      title: 'Film & Edit Lessons',
      description: 'Record engaging videos using your preferred devices. Add visuals, quizzes, and resources to enhance learning.',
      detail: 'Get feedback from our team and access guides to improve your video quality and delivery.',
      cta: 'Explore video resources'
    },
    {
      step: '3',
      title: 'Publish & Inspire',
      description: 'Share your course with the world. Promote it to your network and watch your student community grow.',
      detail: 'Track your impact, gather reviews, and use our marketing tools to boost your reach.',
      cta: 'Learn about launching'
    }
  ];

  const instructors = [
    {
      name: 'Hirmar Ubunti',
      title: 'Instructor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    },
    {
      name: 'Lily Michelle',
      title: 'Senior Instructor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    },
    {
      name: 'Daniel Thomas',
      title: 'Junior Instructor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    },
    {
      name: 'Jennifer Patricia',
      title: 'Instructor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    },
    {
      name: 'Ethan David',
      title: 'Instructor',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    },
    {
      name: 'Michael Richard',
      title: 'Senior Instructor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    },
    {
      name: 'Linda Elizabeth',
      title: 'Junior Instructor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    },
    {
      name: 'James Charlie',
      title: 'Instructor',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=400&auto=format&fit=crop',
      courses: 2,
      students: '60+',
      rating: 4.9
    }
  ];

  const testimonials = [
    {
      name: 'Paulo Dichone',
      title: 'Developer, Instructor',
      quote: "I'm proud to wake up knowing my work is helping people around the world improve their careers and build great things. While being a full-time instructor is hard work, it lets you work when, where, and how you want.",
      courses: '11 courses',
      students: '58,000+',
      earnings: 'Top 10%'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Use the new InstructorNavbar */}
      <InstructorNavbar />
          {/* Hero Section - Matching Screenshot Design with Small Sizing */}
          <div className="relative min-h-[600px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden">
            {/* Clean Background Image from Unsplash */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                alt="Students learning together in modern classroom"
                fill
                className="object-cover"
                priority
              />
              {/* Dark Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90"></div>
            </div>

            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}></div>
            </div>

            {/* Wavy Bottom Border - Matching Screenshot */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg className="w-full h-50" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0C240 80 480 80 720 40C960 0 1200 0 1440 40V120H0V0Z" fill="white"/>
                <path d="M0 20C240 100 480 100 720 60C960 20 1200 20 1440 60V120H0V20Z" fill="#3B82F6" fillOpacity="0.3"/>
              </svg>
            </div>
      
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                
                {/* Left Content */}
                <div className="space-y-8 text-white">
                  {/* Badge - Matching Screenshot */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-full shadow-lg">
                    <span className="text-white font-bold text-xs">35% OFF</span>
                    <span className="text-white/90 font-medium text-xs">LEARN FROM TODAY</span>
                  </div>
      
                  {/* Main Heading - Matching Screenshot with Smaller Size */}
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                      <span className="text-white">The Worlds Best</span>
                      <br />
                      <span className="text-blue-400"> E-learning platform.</span>
                    </h1>
                    <p className="text-gray-300 text-base leading-relaxed max-w-xl">
                      Education can be thought of as the transmission of the values and accumulated knowledge of a society. In this sense, it is equivalent.
                    </p>
                  </div>
      
                  {/* CTA Button - Smaller Size */}
                  <div>
                    <Link
                      href={isAuthenticated ? "/instructor/instructor-courses" : "/instructor/register"}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <span>GET STARTED</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
      
                {/* Right Content - Hero Image with Circular Frame - Smaller Size */}
                <div className="relative">
                  {/* Large Circular Frame with Blue Accent - Matching Screenshot */}
                  <div className="relative">
                    {/* Blue Decorative Circle Background with Smooth Animation */}
                    <div className="absolute -top-6 -right-6 w-[400px] h-[400px] bg-blue-600 rounded-full opacity-80 animate-pulse-slow"></div>
                    <div className="absolute -top-4 -right-4 w-[400px] h-[400px] bg-blue-500/40 rounded-full animate-spin-slow"></div>
                    <div className="absolute -top-8 -right-8 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/30 to-indigo-500/20 rounded-full animate-float-slow"></div>
                    
                    {/* White Border Circle */}
                    <div className="relative w-[500px] h-[500px] bg-white rounded-full p-5 shadow-2xl animate-float">
                      {/* Inner Circle with Image */}
                      <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                        <Image
                          src="/images/instructor/legit.png"
                          alt="Happy students learning together"
                          width={350}
                          height={350}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                    </div>

                    {/* Decorative Dots Pattern - Bottom Right */}
                    <div className="absolute -bottom-3 -right-3 grid grid-cols-6 gap-2">
                      {Array(24).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1.5 h-1.5 bg-gray-800 rounded-full opacity-60 animate-pulse"
                          style={{animationDelay: `${i * 0.1}s`}}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination Dots - Matching Screenshot */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '0s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-['Montserrat',sans-serif] py-6 border-y border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center group hover:scale-105 transition-all duration-300">
             
              <div className="text-2xl lg:text-3xl font-bold text-gray-100 mb-1">
                {stat.value}
              </div>
              <div className="text-md text-gray-200 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Matching Screenshot Design with Small Sizing */}
      <section className="relative bg-white py-10 lg:py-12 overflow-hidden">
        {/* Decorative Blue Dots Pattern - Top Right */}
        <div className="absolute top-12 right-6 grid grid-cols-8 gap-1.5 opacity-40">
          {Array(32).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 bg-blue-500 rounded-full"
              style={{animationDelay: `${i * 0.05}s`}}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Image with Student Counter */}
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative  overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Students learning together in classroom"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
                
                {/* 10k+ Active Students Overlay Card - Smaller */}
                <div className="absolute bottom-4 left-4 bg-white  shadow-xl p-3 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-600 mb-0.5">10k+</h3>
                      <p className="text-xs font-semibold text-gray-700">Active Students</p>
                    </div>
                    
                    {/* Student Avatars - Smaller */}
                    <div className="flex items-center">
                      <div className="flex -space-x-1.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center font-bold text-white text-[10px]">
                          10k+
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GET STARTED Button Below Image - Smaller */}
              <div className="mt-4">
                <Link
                  href={isAuthenticated ? "/instructor/instructor-courses" : "/instructor/register"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side - Content - Smaller Sizing */}
            <div className="space-y-4">
              {/* Badge - Smaller */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span className="text-blue-600 font-bold text-xs uppercase tracking-wide">
                  WHY TEACH WITH US
                </span>
              </div>
              
              {/* Main Heading - Smaller */}
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                So Many Reasons To Start Teaching On Our Platform
              </h2>
              
              {/* Description - Smaller */}
              <p className="text-gray-600 text-sm leading-relaxed">
                Join thousands of successful instructors who are already transforming lives and building their careers on our platform. We provide you with all the tools, support, and community you need to create impactful courses and reach students worldwide.
              </p>

              {/* Feature Grid - 2x2 - Smaller */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* World Class Trainers */}
                <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-all duration-300">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-0.5">Earn Money Doing What You Love</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Turn your expertise into income. Set your own prices and keep up to 97% of revenue.
                    </p>
                  </div>
                </div>

                {/* Easy Learning */}
                <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-all duration-300">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-0.5">Teach Your Way</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Complete creative freedom. Design courses that reflect your unique teaching style.
                    </p>
                  </div>
                </div>

                {/* Flexible */}
                <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-all duration-300">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-0.5">Global Reach & Impact</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Reach millions of students worldwide and make a lasting impact on their lives.
                    </p>
                  </div>
                </div>

                {/* Affordable Price */}
                <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-all duration-300">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-0.5">Powerful Tools & Support</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Access professional course creation tools and dedicated instructor support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Instructors */}
      <section className="relative bg-white py-10 lg:py-12 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          {/* Subtle geometric shapes */}
          <div className="absolute top-12 left-6 w-12 h-12 bg-blue-100/30 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute bottom-20 right-8 w-10 h-10 bg-indigo-100/25 rounded-full blur-md animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-200/20 rounded-full blur-sm animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-4">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-medium text-xs uppercase tracking-wide">
                MEET OUR INSTRUCTORS
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              Learn from the <span className="text-blue-600">best</span>
            </h2>
            <p className="text-bold text-gray-600 max-w-xl mx-auto leading-relaxed">
              Our expert instructors bring years of experience and passion to help you succeed in your learning journey
            </p>
          </div>

          {/* Instructors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {instructors.map((instructor, index) => (
              <div 
                key={index} 
                className="group relative bg-white border border-gray-200 hover:border-blue-200 overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Instructor Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={`${instructor.name} - ${instructor.title}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  
                  {/* Plus button */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 cursor-pointer">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>

                {/* Instructor Details */}
                <div className="p-4">
                  <div className="text-center mb-2">
                    <h3 className="text-base font-bold text-gray-900 mb-0.5 group-hover:text-blue-900 transition-colors duration-300">
                      {instructor.name}
                    </h3>
                    <p className="text-blue-600 font-medium text-xs">
                      {instructor.title}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-0.5">
                      <BookOpen className="w-3 h-3 text-blue-500" />
                      <span>{instructor.courses} Courses</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Users className="w-3 h-3 text-green-500" />
                      <span>Students {instructor.students}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 pt-2 border-t border-gray-100">
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(instructor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium text-xs">{instructor.rating}</span>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4 text-sm">
              Want to join our amazing team of instructors?
            </p>
            <Link
              href={isAuthenticated ? "/instructor/instructor-courses" : "/instructor/register"}
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {isAuthenticated ? "Go to Dashboard" : "Become an Instructor"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How to begin - Matching Screenshot Design with Small Sizing */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 lg:py-12 overflow-hidden">
        {/* Decorative Blue Dots Pattern - Top Left */}
        <div className="absolute top-12 left-6 grid grid-cols-4 gap-1.5 opacity-30">
          {Array(16).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 bg-blue-500 rounded-full"
              style={{animationDelay: `${i * 0.05}s`}}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded mb-3">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-wide">
                GET STARTED TODAY
              </span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2">
              How To Begin Teaching!
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Side - Images */}
            <div className="relative">
              {/* Main Large Image */}
              <div className="relative  overflow-hidden shadow-xl mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Students learning together"
                  width={500}
                  height={350}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Bottom Right Small Image - Overlapping */}
              <div className="absolute bottom-0 right-0 w-60 h-52  overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Student studying with notebook"
                  width={350}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Blue Circle Element */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8">
                <div className="w-24 h-24 border-4 border-blue-600 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Right Side - Feature List */}
            <div className="space-y-4 lg:pl-4">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-3 p-4 bg-white  shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Sign Up & Create Your Profile
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Register as an instructor, complete your profile with expertise and credentials. Set up your teaching preferences and get verified quickly.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3 p-4 bg-blue-50/50  hover:bg-blue-50 transition-all duration-300">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Design & Build Your Course
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Use our intuitive course builder to create engaging content. Upload videos, add quizzes, assignments, and structure your curriculum effectively.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3 p-4 bg-white  shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Publish & Start Earning
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Review and publish your course to reach thousands of students worldwide. Set your pricing, track enrollments, and start earning from day one.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

          {/* Become an Instructor Platform Section - Matching Screenshot Design with Small Sizing */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 lg:py-12 overflow-hidden">
        {/* Decorative Blue Dots Pattern - Top Left */}
        <div className="absolute top-12 left-6 grid grid-cols-3 gap-1.5 opacity-30">
          {Array(12).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 bg-blue-500 rounded-full"
              style={{animationDelay: `${i * 0.05}s`}}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              {/* Section Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
                <span className="text-blue-600 font-bold text-xs uppercase tracking-wide">
                  INSTRUCTOR
                </span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-2">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                  Become an Instructor On Our Online Platform.
                </h2>
              </div>

              {/* Feature Boxes Grid - 2x2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-2 p-3 bg-white rounded shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      Teach your way
                    </h3>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-2 p-3 bg-white rounded shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      Plan your curriculum
                    </h3>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-2 p-3 bg-white rounded shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      Record your video
                    </h3>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-2 p-3 bg-white rounded shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      Launch your course
                    </h3>
                  </div>
                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-3">
                <Link
                  href={isAuthenticated ? "/instructor/instructor-courses" : "/instructor/register"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>GET INSTRUCTOR</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Content - Instructor Image with Decorative Elements */}
            <div className="relative">
              <div className="relative flex justify-center items-center">
                
                {/* Main Curved Border Container */}
                <div className="relative">
                  {/* Blue curved border shape */}
                  <div className="absolute inset-0 transform">
                    <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M200 40 C 120 40, 40 120, 40 200 C 40 280, 120 360, 200 360 C 280 360, 360 280, 360 200 C 360 120, 280 40, 200 40 Z" 
                            stroke="#3B82F6" 
                            strokeWidth="3" 
                            fill="none" 
                            className="animate-float"/>
                    </svg>
                  </div>

                  {/* Instructor Image */}
                  <div className="relative z-10 w-[400px] h-[400px] rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Professional female instructor"
                      width={400}
                      height={400}
                      className="w-full rounded-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                {/* Plus Icon - Top Right */}
                <div className="absolute top-12 right-6 text-gray-400 animate-float" style={{animationDelay: '0.5s'}}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                  </svg>
                </div>

                {/* Blue Star/Asterisk Icon - Top Left */}
                <div className="absolute top-16 left-3 text-blue-500 animate-sparkle" style={{animationDelay: '1s'}}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                  </svg>
                </div>

                {/* Red Circle - Right Side */}
                <div className="absolute top-1/3 -right-3 w-10 h-10 bg-red-500 rounded-full opacity-80 animate-float" style={{animationDelay: '1.5s'}}></div>

                {/* Blue Circle - Bottom Left */}
                <div className="absolute bottom-16 -left-4 w-12 h-12 bg-blue-600 rounded-full opacity-60 animate-float" style={{animationDelay: '0.8s'}}></div>

                {/* Gray Circle - Bottom Right */}
                <div className="absolute bottom-20 right-3 w-8 h-8 bg-gray-400 rounded-full opacity-50 animate-pulse"></div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Animations - Consolidated to avoid nested style tags */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-8px {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes pop {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.08);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-pop {
          animation: pop 4s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
<Footer />
    </div>
  );
}
