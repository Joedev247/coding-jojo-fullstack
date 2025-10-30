"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, User, Calendar } from "lucide-react";
import Link from "next/link";

export default function NewsAndBlogsSection() {
  // Blog posts data matching the screenshot
  const blogPosts = [
    {
      id: 1,
      title: "Educate, Empower, Excel: Discover the Power of Learning!",
      author: "David Smith",
      date: "05 Jun, 2023",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      excerpt: "Discover how education can transform your life and unlock new opportunities for personal and professional growth.",
      link: "/blog/educate-empower-excel"
    },
    {
      id: 2,
      title: "Enrich Your Mind, Envision Your Future: Education for Success",
      author: "David Smith", 
      date: "03 Jun, 2023",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      excerpt: "Learn how quality education can help you build the skills needed for a successful future in today's competitive world.",
      link: "/blog/enrich-your-mind"
    },
    {
      id: 3,
      title: "University class starting soon while the lovely valley team work",
      author: "David Smith",
      date: "10 Jul, 2023",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", 
      excerpt: "Join our upcoming university classes and be part of an amazing learning community that supports your academic journey.",
      link: "/blog/university-class-starting"
    }
  ];

  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200  mb-3">
            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
            <span className="text-blue-600 font-medium text-[10px] uppercase tracking-wider">
              OUR NEWS & BLOGS
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            Latest News & Blogs
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Blog Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Blog Content */}
              <div className="p-4">
                {/* Author and Date */}
                <div className="flex items-center gap-3 mb-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-blue-600" />
                    <span>by {post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Blog Title */}
                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                {/* Read More Link */}
                <Link
                  href={post.link}
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors group-hover:gap-2"
                >
                  READ MORE DETAILS
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded transition-all duration-300 shadow-lg hover:shadow-xl text-sm uppercase tracking-wide"
          >
            VIEW ALL POSTS
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}