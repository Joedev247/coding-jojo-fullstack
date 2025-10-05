'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
      title: 'Teach your way',
      description: 'Publish the course you want, in the way you want, and always have control of your own content.'
    },
    {
      icon: Users,
      title: 'Inspire learners',
      description: 'Teach what you know and help learners explore their interests, gain new skills, and advance their careers.'
    },
    {
      icon: DollarSign,
      title: 'Get rewarded',
      description: 'Expand your professional network, build your expertise, and earn money on each paid enrollment.'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Plan your course',
      description: 'You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.',
      detail: 'The way that you teach — what you bring to it — is up to you.',
      cta: 'How we help you'
    },
    {
      step: '2', 
      title: 'Record your video',
      description: 'Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you have the setup you need to start recording.',
      detail: 'Our support team is available to help you throughout the process and provide feedback on test videos.',
      cta: 'How we help you'
    },
    {
      step: '3',
      title: 'Launch your course',
      description: 'Gather your first ratings and reviews by promoting your course through social networks and your professional communities.',
      detail: 'Our custom coupon tool and instructor promotions give you flexibility to maximize your sales.',
      cta: 'How we help you'
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
    <div className="min-h-screen text-white">
      <AnimatedBackground/>
      {/* Use the new InstructorNavbar */}
      <InstructorNavbar />
      {/* Hero Section */}
      <section className=" py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-medium border border-pink-500/20 shadow-lg">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Welcome to Teaching Excellence
                </span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Come teach <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                    with us
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Become an instructor and change lives — including your own. Join our{" "}
                  <span className="text-pink-400 font-medium">expert-led</span>{" "}
                  community of educators.
                </p>
              </div>

              <Link
                href={isAuthenticated ? "/instructor/instructor-courses" : "/instructor/register"}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-pink-500/30 hover:shadow-xl hover:scale-105"
              >
                <span>{isAuthenticated ? "Go to Dashboard" : "Get started"}</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gray-900/50 border border-gray-700/50 overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500/10 to-orange-500/10">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-pink-500/20 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-orange-500/20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* So many reasons to start */}
      <section className=" py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              So many reasons to start
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the world's largest online learning marketplace and transform your expertise into a thriving business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-pink-500/20 group-hover:border-pink-500/50 transition-all duration-300">
                    <Icon className="h-10 w-10 text-pink-400 group-hover:text-pink-300 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to begin */}
      <section className=" py-16 lg:py-24 relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-orange-500/10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              How to begin
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Start your instructor journey with these simple steps and join thousands of successful teachers
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-gray-400">
                    {step.detail}
                  </p>
                  <button className="text-pink-400 font-medium hover:text-pink-300 transition-colors duration-300 flex items-center gap-2 group">
                    {step.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="aspect-video bg-gray-800/50 border border-gray-700/50 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 rounded-full mx-auto mb-6"></div>
              <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-6">
                "{testimonials[0].quote}"
              </blockquote>
              <div className="space-y-2">
                <div className="font-bold text-gray-100">{testimonials[0].name}</div>
                <div className="text-gray-100">{testimonials[0].title}</div>
                <div className="flex justify-center space-x-6 text-sm text-gray-100">
                  <span>{testimonials[0].courses}</span>
                  <span>{testimonials[0].students} students</span>
                  <span>{testimonials[0].earnings} instructor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become an instructor today */}
      <section className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/10 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Become an instructor today
            </h2>
            <p className="text-xl text-gray-100">
              Join one of the world's largest online learning marketplaces.
            </p>
            <Link
              href={isAuthenticated ? "/instructor/instructor-courses" : "/instructor/register"}
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get started"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

<Footer />
    </div>
  );
}
