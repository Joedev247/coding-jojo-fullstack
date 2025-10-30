'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Navbar from './Navbar';
import Hero from './sections/hero';
import About from './sections/about';
import PopularCoursesSection from './sections/popular-courses';
import TutorCoursesBanner from './sections/tutor-courses-banner';
import OnlineLearningSection from './sections/online-learning-section';
import MeetInstructorsSection from './sections/meet-instructors';
import TestimonialsSection from "./sections/student-testimonials";
import BookingAppointmentSection from './sections/booking-appointment';
import NewsAndBlogsSection from './sections/news-and-blogs';
import TrustedPartnersSection from './sections/trusted-partners';
import Footer from './Footer';
import AuthenticatedHomepage from './sections/AuthenticatedHomepage';
import PricingPlanSection from './sections/PricingPlanSection';
import FAQSection from './sections/FAQs';
import PopularTopics from './sections/popular-topics';

const HomePageWrapper = () => {
  const [mounted, setMounted] = useState(false);
  const [shouldRedirectToOnboarding, setShouldRedirectToOnboarding] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle onboarding redirect logic
  useEffect(() => {
    if (mounted && isAuthenticated && pathname !== '/onboarding' && pathname !== '/signup') {
      const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
      const needsOnboarding = localStorage.getItem('needs_onboarding');
      
      console.log('Onboarding check:', {
        needsOnboarding,
        hasCompletedOnboarding,
        pathname,
        isAuthenticated
      });
      
      if (needsOnboarding === 'true' && !hasCompletedOnboarding) {
        console.log('Redirecting to onboarding...');
        setShouldRedirectToOnboarding(true);
        router.push('/onboarding');
      }
    }
  }, [mounted, isAuthenticated, pathname, router]);

  // Add logging to debug authentication state
  useEffect(() => {
    if (mounted) {
      console.log('HomePageWrapper auth state:', {
        isAuthenticated,
        isLoading,
        hasUser: !!user,
        userEmail: user?.email
      });
    }
  }, [mounted, isAuthenticated, isLoading, user]);

  // Don't render anything until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <>
      <Navbar/>

      <div className="min-h-screen flex items-center justify-center">

        <LoadingSpinner size="sm"  />
      </div>
      </>
    );
  }
  
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="sm"  />
      </div>
      </>
    );
  }

  // Show loading spinner while redirecting to onboarding
  if (shouldRedirectToOnboarding) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      </>
    );
  }

  // Show AuthenticatedHomepage for authenticated users (but not on onboarding or signup pages)
  if (isAuthenticated && pathname !== '/onboarding' && pathname !== '/signup') {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    const needsOnboarding = localStorage.getItem('needs_onboarding');
    
    // If user needs onboarding but hasn't been redirected yet, show loading
    if (needsOnboarding === 'true' && !hasCompletedOnboarding) {
      return (
        <>
          <Navbar/>
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="sm" />
          </div>
        </>
      );
    }
    
    // Show AuthenticatedHomepage for all authenticated users
    return <AuthenticatedHomepage searchParams={searchParams} router={router} />;
  }
  // Show default homepage for non-authenticated users
  return (
    <>
    <Navbar/>
      <main className="relative min-h-screen bg-white">
        <Hero/>
        <About/>
        <PopularCoursesSection/>  
        <TutorCoursesBanner/>
        <OnlineLearningSection/>
        <MeetInstructorsSection/>
        <PopularTopics/>
         <PricingPlanSection />
                 {/* Call to Action */}
        <section className="text-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">Ready to Start Learning?</h2>
          <p className="text-purple-100 text-base lg:text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of students already learning on CodingJojo. Get unlimited access to all courses and start building your future today.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="bg-white text-purple-600 px-6 py-2 font-semibold text-sm hover:bg-gray-100 transition-all transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-6 py-2 font-semibold text-sm hover:bg-white hover:text-purple-600 transition-all">
             upgrade
            </button>
          </div>
        </section>
        <TestimonialsSection/>
        <BookingAppointmentSection/>
        <FAQSection/>
        <NewsAndBlogsSection/>
        <TrustedPartnersSection/>
        {/* <FeaturedCoursesSection/> */}
        {/* <WhyChooseUsSection/> */}
        {/* <TrustedByCompanies/> */}
        {/* <PricingPlans/> */}
        {/* <TestimonialSection/> */}
        {/* <AboutCodingJojo/> */}
      </main>
      <Footer/>
    </>
  );
};

export default HomePageWrapper;
