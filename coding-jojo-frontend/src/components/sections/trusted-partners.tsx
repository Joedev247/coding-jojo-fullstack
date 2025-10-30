"use client";

import React from "react";
import { Shield, GraduationCap, Award, Building2, Users, Trophy, Star, Bookmark } from "lucide-react";

export default function TrustedPartnersSection() {
  // Partner logos data with placeholder icons
  const partners = [
    { id: 1, name: "WCCM", icon: Shield },
    { id: 2, name: "UNIVERSITY", icon: GraduationCap },
    { id: 3, name: "EDUC", icon: Award },
    { id: 4, name: "EDUCENTER", icon: Building2 },
    { id: 5, name: "ONLINE", icon: Users },
    { id: 6, name: "WCCM", icon: Trophy },
    { id: 7, name: "UNIVERSITY", icon: Star },
    { id: 8, name: "EDUCENTER", icon: Bookmark }
  ];

  return (
    <section className="relative py-12 md:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 ">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              <span className="text-blue-600 font-medium text-xs uppercase tracking-wider">
                OUR TRUSTED PARTNERS
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
                We Have More Than{" "}
                <span className="text-blue-600">4263+</span>
                <br />
                Global Partners
              </h2>
            </div>
          </div>

          {/* Right Content - Partner Logos Grid */}
          <div className="relative">
            {/* Partners Grid */}
            <div className="grid grid-cols-4 gap-6">
              {partners.map((partner, index) => {
                const IconComponent = partner.icon;
                return (
                  <div
                    key={partner.id}
                    className="group relative p-6  shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center min-h-[100px] hover:scale-105"
                  >
                    {/* Partner Icon */}
                    <div className="mb-2">
                      <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    {/* Partner Name */}
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-wide">
                        {partner.name}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20  transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-200 rounded-full opacity-40 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}