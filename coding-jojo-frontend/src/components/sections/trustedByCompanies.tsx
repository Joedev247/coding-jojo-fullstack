"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Star, Building2 } from "lucide-react";  
import Image from "next/image";const TrustedByCompanies = () => {
  const [mounted, setMounted] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Throttled scroll handler for better performance
  const throttle = useCallback(
    (func: (...args: any[]) => void, delay: number) => {
      let timeoutId: NodeJS.Timeout | null = null;
      let lastExecTime = 0;
      return (...args: any[]) => {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
          func(...args);
          lastExecTime = currentTime;
        } else {
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func(...args);
            lastExecTime = Date.now();
          }, delay - (currentTime - lastExecTime));
        }
      };
    },
    []
  );

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      if (marqueeRef.current) {
        const scrollPosition = window.scrollY;
        marqueeRef.current.style.transform = `translateX(${
          -scrollPosition * 0.1
        }px)`;
      }
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    if (!mounted) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, mounted]);

  const companies = [
    { name: "Fiverr", logoUrl: "/fiverr-removebg-preview.png" },
    { name: "Google", logoUrl: "/google-removebg-preview.png" },
    { name: "Microsoft", logoUrl: "/microsoft-removebg-preview.png" },
    { name: "Upwork", logoUrl: "/upwork-removebg-preview.png" },
    { name: "Slack", logoUrl: "/slack-removebg-preview.png" },
    { name: "Amazon", logoUrl: "/amazon-removebg-preview.png" },
    { name: "Netflix", logoUrl: "/netflix-removebg-preview.png" }
  ];

  if (!mounted) {
    return (
      <section className="py-16 md:py-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 mx-auto w-48"></div>
            <div className="h-16 bg-gray-200 rounded animate-pulse mb-4 mx-auto max-w-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/60 to-white/40 z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-xs font-semibold shadow-sm mb-3 border border-blue-200">
            <Building2 className="h-3 w-3 text-blue-600" />
            <span className="text-blue-700">Trusted by Industry Leaders</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-gray-900 mb-3">
            Trusted By Industry Leaders
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm">
            Join thousands of top companies who rely on our platform
          </p>
        </div>
        {/* Logo Showcase - Infinite Marquee Carousel */}
        <div className="relative mb-16">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white/80 to-transparent z-30 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white/80 to-transparent z-30 pointer-events-none"></div>

          <div className="overflow-hidden relative">
            <div
              ref={marqueeRef}
              className="flex items-center gap-12 py-8 animate-marquee"
              style={{ width: "calc(200% + 48px)" }}
            >
              {/* First set of logos */}
              {companies.map((company, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 group">
                  <div className=" group-hover:border-blue-300 p-4 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                    <div className="h-12 w-32 flex items-center justify-center">
                      <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width={128}
                        height={48}
                        className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          filter: "grayscale(100%) contrast(1.2) brightness(0.4)",
                        }}
                        onError={(e) => {
                          console.log(`Failed to load logo for ${company.name}`);
                        }}
                      />
                    </div>
                    
                  </div>
                </div>
              ))}

              {/* Second set of logos for seamless loop */}
              {companies.map((company, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 group">
                  <div className=" group-hover:border-blue-300 p-4 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                    <div className="h-12 w-32 flex items-center justify-center">
                      <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width={128}
                        height={48}
                        className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          filter: "grayscale(100%) contrast(1.2) brightness(0.4)",
                        }}
                        onError={(e) => {
                          console.log(`Failed to load logo for ${company.name}`);
                        }}
                      />
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          {[
            { value: "500+", label: "Enterprise Clients" },
            { value: "95%", label: "Customer Satisfaction" },
            { value: "24/7", label: "Global Support" },
            { value: "99.9%", label: "Platform Uptime" },
          ].map((stat, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 p-3 hover:border-blue-300 transition-all duration-300">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Rating Section */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            <span className="text-gray-900 font-semibold">4.9/5</span> average rating from over{" "}
            <span className="text-blue-600 font-semibold">50,000+</span> students
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedByCompanies;
