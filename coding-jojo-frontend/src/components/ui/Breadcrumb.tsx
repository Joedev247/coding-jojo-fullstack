"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="relative z-10 py-4">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center text-sm text-gray-400">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-4 hover:opacity-80 transition duration-200">
            <Image
              src="/image-removebg-preview.png"
              alt="Coding Jojo Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </Link>
          
          {/* Home Link */}
          <Link href="/" className="hover:text-white transition duration-200">
            Home
          </Link>
          
          {/* Breadcrumb Items */}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4 mx-2" />
              {item.href && !item.active ? (
                <Link 
                  href={item.href} 
                  className="hover:text-white transition duration-200 capitalize"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={`${
                    item.active 
                      ? 'text-pink-400 font-medium' 
                      : 'text-gray-200'
                  } truncate max-w-[200px] capitalize`}
                >
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
