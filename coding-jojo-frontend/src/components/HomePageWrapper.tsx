'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Hero from '../components/sections/hero';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUs';
import TrustedByCompanies from '../components/sections/trustedByCompanies';
import FeaturedCoursesSection from '../components/sections/featured-courses';
import PopularTopics from '../components/sections/popular-topics';
import PricingPlans from '../components/sections/pricing-plans';
import TestimonialSection from '../components/sections/testimonial-cards';
import FAQSection from '../components/sections/FAQs';
import AboutCodingJojo from '../components/sections/about-coding-jojo';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Navbar from './Navbar';
import AuthenticatedContent from '../app/authenticated/AuthenticatedContent';

const HomePageWrapper = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

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
                <AnimatedBackground/>

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
        <AnimatedBackground/>
        <LoadingSpinner size="sm"  />
      </div>
      </>
    );
  }

  // Show AuthenticatedHomepage for authenticated users
  if (isAuthenticated) {
    return <AuthenticatedContent />;
  }
  // Show default homepage for non-authenticated users
  return (
    <>
    <Navbar/>
      <main className="relative min-h-screen">
        <AnimatedBackground/>
        <Hero/>
        <WhyChooseUsSection/>
        <TrustedByCompanies/>
        <FeaturedCoursesSection/>
        <PopularTopics/>
        <PricingPlans/>
        <TestimonialSection/>
        <FAQSection/>
        <AboutCodingJojo/>
      </main>
      <Footer/>
    </>
  );
};

export default HomePageWrapper;
