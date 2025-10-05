"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Star, Building2 } from "lucide-react";
import Image from "next/image";

const TrustedByCompanies = () => {
  const [mounted, setMounted] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  const companies = [
    {
      name: "",
      logoUrl: "/fiverr-removebg-preview.png",
    },
    {
      name: "",
      logoUrl: "/google-removebg-preview.png",
    },
    {
      name: "",
      logoUrl: "/microsoft-removebg-preview.png",
    },
    {
      name: "",
      logoUrl: "/upwork-removebg-preview.png",
    },
    {
      name: "",
      logoUrl: "/slack-removebg-preview.png",
    },
    {
      name: "",
      logoUrl: "/amazon-removebg-preview.png",
    },
    {
      name: "",
      logoUrl: "/netflix-removebg-preview.png",
    },
  ];
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

  if (!mounted) {
    return (
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="h-8  bg-gray-900 rounded animate-pulse mb-4 mx-auto w-48"></div>
            <div className="h-16  bg-gray-900 rounded animate-pulse mb-4 mx-auto max-w-2xl"></div>
            <div className="h-8  bg-gray-900 rounded animate-pulse mx-auto max-w-xl"></div>
          </div>
          <div className="flex justify-center gap-8">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-16 w-40  bg-gray-900 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative py-16 md:py-24">
      {/* <AnimatedBackground /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg mb-4 border border-pink-500/20">
            <Building2 className="h-4 w-4 text-pink-500" />
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white mb-4">
            Trusted By{" "}
            <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
              Industry Leaders
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Join thousands of top companies who rely on our platform for their
            developer education needs
          </p>
        </div>

        {/* Logo Showcase - Infinite Marquee */}
        <div className="relative mb-16">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden relative">
            <div
              ref={marqueeRef}
              className="flex items-center gap-12 py-8 animate-marquee"
              style={{ width: "calc(200% + 48px)" }}
            >
              {/* First set of logos */}
              {companies.map((company, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 group">
                  <div className="  bg-gray-900 backdrop-blur-sm group-hover:border-pink-500/30 p-6 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-pink-500/10">
                    <div className="h-16 w-40 flex items-center justify-center">
                      <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width={160}
                        height={64}
                        className="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sh14WW"
                        style={{
                          filter: "brightness(0) saturate(100%) invert(100%)",
                        }}
                        onError={(e) => {
                          console.log(
                            `Failed to load logo for ${company.name}`
                          );
                        }}
                      />
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xs text-gray-400 font-medium">
                        {company.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Second set of logos for seamless loop */}
              {companies.map((company, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 group">
                  <div className="  bg-gray-900 backdrop-blur-sm group-hover:border-pink-500/30 p-6 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-pink-500/10">
                    <div className="h-16 w-40 flex items-center justify-center">
                      <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width={160}
                        height={64}
                        className="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sh14WW"
                        style={{
                          filter: "brightness(0) saturate(100%) invert(100%)",
                        }}
                        onError={(e) => {
                          console.log(
                            `Failed to load logo for ${company.name}`
                          );
                        }}
                      />
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xs text-gray-400 font-medium">
                        {company.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "500+", label: "Enterprise Clients" },
            { value: "95%", label: "Customer Satisfaction" },
            { value: "24/7", label: "Global Support" },
            { value: "99.9%", label: "Platform Uptime" },
          ].map((stat, index) => (
            <div
              key={index}
              className="  bg-gray-900/50 backdrop-blur-sm p-4 hover:border-pink-500/30 transition-all duration-300"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <p className="text-gray-300 text-sm">
            <span className="text-white font-semibold">4.9/5</span> average
            rating from over{" "}
            <span className="text-pink-400 font-semibold">50,000+</span>{" "}
            students
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
