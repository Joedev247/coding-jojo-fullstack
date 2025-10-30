"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

export default function BookingAppointmentSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    subject: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0">
        {/* Right side curved lines */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          <svg className="absolute top-0 right-0 w-64 h-full" viewBox="0 0 400 800" fill="none">
            <path d="M200 0 Q300 100 250 200 Q200 300 300 400 Q350 500 300 600 Q250 700 350 800" stroke="#1E40AF" strokeWidth="1.5"/>
            <path d="M250 0 Q350 150 300 300 Q250 450 350 600 Q400 750 350 800" stroke="#1E40AF" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          
          {/* Left Content - Student Image */}
          <div className="relative flex justify-start -ml-4 sm:-ml-6 lg:-ml-8 -mt-8 -mb-8 lg:-mt-12 lg:-mb-12 lg:pl-0">
            <div className="relative w-full max-w-4xl h-[450px] lg:h-[500px]">
              {/* Decorative Elements Behind Image */}
              <div className="absolute top-12 right-8 w-20 h-20 border-4 border-blue-500/30 rounded-lg transform -rotate-12 z-0"></div>
              <div className="absolute bottom-16 right-12 w-16 h-16 bg-teal-500/20 rounded-full blur-sm z-0"></div>
              
              {/* Professional Coding Student Image */}
              <div className="relative w-full h-full lg:rounded-l-none overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Students collaborating on coding project"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-tl from-slate-900/30 via-transparent to-transparent"></div>
              </div>

            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(59, 130, 246, 0.05) 20px,
                  rgba(59, 130, 246, 0.05) 22px
                )`
              }}></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-600/20 border border-blue-500/30  mb-3">
                <Calendar className="w-3 h-3 text-blue-400" />
                <span className="text-blue-300 font-medium text-[10px] uppercase tracking-wider">
                  BOOKING APPOINTMENT
                </span>
              </div>

              {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100">
                Get Solutions With Our Instructors
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                Quality technologies via fully tested methods of empowerment. Proactively disseminate web-enabled best practices after cross-functional expertise.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address*"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 text-base"
                    />
                  </div>
                </div>

                {/* Date and Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      placeholder="dd/mm/aaaa"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 text-base [color-scheme:dark]"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject*"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 text-base"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-2 rounded transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 text-sm uppercase tracking-wide"
                  >
                    MAKE AN APPOINTMENT
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}