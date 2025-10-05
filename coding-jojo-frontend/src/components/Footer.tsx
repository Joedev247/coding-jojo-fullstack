import React from 'react';
import Image from 'next/image';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-lg shadow-xl font-['Montserrat',sans-serif] pt-12 pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        {/* Newsletter Subscription */}
        <div className="border-t border-slate-700 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="md:max-w-md">
              <h3 className="text-gray-100 font-semibold text-lg mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-100 text-sm">Stay updated with the latest tutorials, tips, and offers.</p>
            </div>
            <div className="w-full md:max-w-md">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full text-white px-4 py-2 border border-slate-700 focus:outline-none focus:border-pink-500"
                />
                <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-4 py-2 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-12 flex items-center">
                <Image
                  src="/image-removebg-preview.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-100 text-sm leading-relaxed">
              Empowering developers with the tools and knowledge to build amazing web applications.
              Learn coding the right way with our comprehensive tutorials and resources.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="text-gray-100 hover:text-pink-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-100 hover:text-pink-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-100 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-100 hover:text-pink-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gray-100 font-semibold text-lg">Quick Links</h3>
             <ul className="space-y-2">
              <li><Link href="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help</Link></li>
            </ul>
          </div>

          {/* Column 3 - Popular Topics */}
          <div className="space-y-4">
            <h3 className="text-gray-100 font-semibold text-lg">Popular Topics</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-100 hover:text-pink-500 text-sm transition-colors">
                  HTML
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-pink-500 text-sm transition-colors">
                  CSS
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-pink-500 text-sm transition-colors">
                  JavaScript
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-pink-500 text-sm transition-colors">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-100 hover:text-pink-500 text-sm transition-colors">
                  Python
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-gray-100 font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-pink-500 mt-0.5" />
                <span className="text-gray-100 text-sm">
                  1234 Coding Street, Developer City, 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pink-500" />
                <a href="mailto:info@codingjojo.com" className="text-gray-100 hover:text-pink-500 text-sm transition-colors">
                  info@codingjojo.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pink-500" />
                <a href="tel:+11234567890" className="text-gray-100 hover:text-pink-500 text-sm transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <a 
                href="/support" 
                className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white text-sm font-medium px-4 py-2 transition-all duration-300"
              >
                Get Support
              </a>
            </div>
          </div>
        </div>
        

        {/* Copyright Bar */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-100 text-sm mb-4 sm:mb-0">
              © {new Date().getFullYear()} Coding Jojo. All rights reserved.
            </p>            <div className="flex items-center space-x-4">
              <a href="/privacy" className="text-gray-100 hover:text-pink-500 text-xs sm:text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-100 hover:text-pink-500 text-xs sm:text-sm transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-100 hover:text-pink-500 text-xs sm:text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
