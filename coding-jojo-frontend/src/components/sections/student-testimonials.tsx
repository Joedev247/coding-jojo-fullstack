"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonials data matching the screenshot
  const testimonials = [
    {
      id: 1,
      text: "They took the time to thoroughly inspect my roof and identify all of the issues, and then came up with a comprehensive plan to address them. The team was skilled and efficient, and completed the job and holds various program-specific accreditations, ensuring that the institution holds various program-specific meets rigorous standards of academic quality and integrity.",
      author: {
        name: "Ronald Richards",
        role: "Founder CEO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 4.7
      },
      mainImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      text: "The educational experience exceeded my expectations. The instructors were knowledgeable and supportive throughout my journey. The curriculum was well-structured and provided practical skills that I could immediately apply in my career.",
      author: {
        name: "Sarah Johnson",
        role: "Software Developer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        rating: 4.9
      },
      mainImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      text: "Outstanding learning platform with excellent course content. The interactive approach and real-world projects helped me gain confidence and expertise in my field. Highly recommend to anyone looking to advance their skills.",
      author: {
        name: "Michael Chen",
        role: "Data Scientist",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
        rating: 4.8
      },
      mainImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="relative py-12 md:py-16 bg-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Left side decorative lines */}
        <div className="absolute top-32 left-8">
          <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
            <path d="M10 10 L70 10" stroke="#E5F3FF" strokeWidth="3"/>
            <path d="M10 25 L70 25" stroke="#E5F3FF" strokeWidth="3"/>
            <path d="M10 40 L70 40" stroke="#E5F3FF" strokeWidth="3"/>
            <path d="M10 55 L70 55" stroke="#E5F3FF" strokeWidth="3"/>
          </svg>
        </div>
        
        {/* Right side curved decorative element */}
        <div className="absolute top-16 right-16">
          <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
            <path d="M0 60 Q75 0 150 60 Q75 120 0 60 Z" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.3"/>
            <path d="M20 60 Q75 20 130 60 Q75 100 20 60 Z" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.2"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200  mb-4">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-blue-600 font-medium text-xs uppercase tracking-wider">
              OUR STUDENTS TESTIMONIALS
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            What Students Say's About Us
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Student Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              {/* Main Image */}
              <div className="relative w-full h-96  overflow-hidden shadow-2xl">
                <img
                  src={testimonials[currentTestimonial].mainImage}
                  alt={`${testimonials[currentTestimonial].author.name} - Student testimonial`}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Content - Testimonial */}
          <div className="space-y-6">
            {/* Quote Icon */}
            <div className="flex justify-start">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="space-y-4">
              <blockquote className="text-gray-700 text-base leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Author Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200 shadow-md">
                  <img
                    src={testimonials[currentTestimonial].author.image}
                    alt={testimonials[currentTestimonial].author.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Author Details */}
                <div>
                  <h4 className="font-bold text-gray-900 text-xs">
                    {testimonials[currentTestimonial].author.name}
                  </h4>
                  <p className="text-blue-600 text-sm font-medium">
                    {testimonials[currentTestimonial].author.role}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(testimonials[currentTestimonial].author.rating)}
                    <span className="text-gray-600 text-sm ml-1">
                      ({testimonials[currentTestimonial].author.rating})
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 bg-gray-100 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                </button>
                
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}