import React from 'react';
import Image from 'next/image';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  Youtube,
  Globe
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .star-decoration {
          animation: float 3s ease-in-out infinite;
        }
        
        .star-decoration:nth-child(2) {
          animation-delay: -1s;
        }
        
        .star-decoration:nth-child(3) {
          animation-delay: -2s;
        }
        
        .newsletter-input:focus {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>
      
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-['Montserrat',sans-serif] overflow-hidden">
        {/* Star Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Stars */}
          <div className="star-decoration absolute top-8 left-12 text-blue-300 opacity-60">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="star-decoration absolute top-20 left-32 text-blue-400 opacity-40">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5L12 0z"/>
            </svg>
          </div>

          {/* Top Right Plus Signs */}
          <div className="star-decoration absolute top-16 right-20 text-blue-300 opacity-50 text-2xl font-light">+</div>
          <div className="star-decoration absolute top-32 right-32 text-blue-400 opacity-30 text-lg font-light">+</div>

          {/* Bottom Area Decorations */}
          <div className="star-decoration absolute bottom-32 left-16 text-blue-300 opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="star-decoration absolute bottom-48 right-24 text-blue-300 opacity-30 text-xl font-light">+</div>

          {/* Additional scattered decorations */}
          <div className="star-decoration absolute top-40 left-1/3 text-blue-400 opacity-20">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5L12 0z"/>
            </svg>
          </div>
          <div className="star-decoration absolute top-60 right-1/3 text-blue-300 opacity-25 text-sm font-light">+</div>
        </div>

        <div className="relative z-10">
          {/* Newsletter Section */}
          <div className="border-b border-blue-800/30 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="text-center lg:text-left max-w-md">
                  <div className="flex items-center justify-center lg:justify-start mb-3">
                    <div className="h-8 w-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center mr-2">
                      <span className="text-white font-bold text-sm">🎓</span>
                    </div>
                    <span className="text-lg font-bold">CODING JOJO</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">Subscribe Our Newsletter</h3>
                  <p className="text-blue-200 text-sm">For Latest Updates</p>
                </div>
                
                <div className="w-full max-w-md">
                  <div className="flex bg-white  p-0.5">
                    <input 
                      type="email" 
                      placeholder="Enter Your Email" 
                      className="newsletter-input flex-1 text-gray-800 bg-transparent px-3 py-2 text-sm focus:outline-none"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2  font-semibold text-sm transition-all duration-300 flex items-center gap-1">
                      SUBSCRIBE NOW
                      <Send className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* About Company */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white">About Company</h4>
                  <p className="text-blue-200 text-xs leading-relaxed">
                    Continually optimize backward manufactured products whereas communities negotiate life compelling alignments
                  </p>
                  <div className="space-y-1">
                    <p className="text-white font-semibold text-xs">FOLLOW US ON:</p>
                    <div className="flex items-center space-x-2">
                      <a href="#" className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <Facebook className="h-3 w-3" />
                      </a>
                      <a href="#" className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <Twitter className="h-3 w-3" />
                      </a>
                      <a href="#" className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <Linkedin className="h-3 w-3" />
                      </a>
                      <a href="#" className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <Youtube className="h-3 w-3" />
                      </a>
                      <a href="#" className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <Globe className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link href="/courses" className="text-blue-200 hover:text-white transition-colors text-xs">• Life Coach</Link></li>
                    <li><Link href="/business" className="text-blue-200 hover:text-white transition-colors text-xs">• Business Coach</Link></li>
                    <li><Link href="/health" className="text-blue-200 hover:text-white transition-colors text-xs">• Health Coach</Link></li>
                    <li><Link href="/development" className="text-blue-200 hover:text-white transition-colors text-xs">• Development</Link></li>
                    <li><Link href="/design" className="text-blue-200 hover:text-white transition-colors text-xs">• Web Design</Link></li>
                    <li><Link href="/seo" className="text-blue-200 hover:text-white transition-colors text-xs">• SEO Optimize</Link></li>
                  </ul>
                </div>

                {/* Our Courses */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white">Our Courses</h4>
                  <ul className="space-y-2">
                    <li><Link href="/courses/health" className="text-blue-200 hover:text-white transition-colors text-xs">• Health Course</Link></li>
                    <li><Link href="/courses/web-development" className="text-blue-200 hover:text-white transition-colors text-xs">• Web Development</Link></li>
                    <li><Link href="/courses/ui-ux" className="text-blue-200 hover:text-white transition-colors text-xs">• UI/UX Design</Link></li>
                    <li><Link href="/courses/lifestyle" className="text-blue-200 hover:text-white transition-colors text-xs">• Life Style Course</Link></li>
                    <li><Link href="/courses/digital-marketing" className="text-blue-200 hover:text-white transition-colors text-xs">• Digital Marketing</Link></li>
                    <li><Link href="/courses/graphics" className="text-blue-200 hover:text-white transition-colors text-xs">• Graphics Design</Link></li>
                  </ul>
                </div>

                {/* Resources */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white">Resources</h4>
                  <ul className="space-y-2">
                    <li><Link href="/community" className="text-blue-200 hover:text-white transition-colors text-xs">• Community</Link></li>
                    <li><Link href="/support" className="text-blue-200 hover:text-white transition-colors text-xs">• Support</Link></li>
                    <li><Link href="/video-guides" className="text-blue-200 hover:text-white transition-colors text-xs">• Video Guides</Link></li>
                    <li><Link href="/documentation" className="text-blue-200 hover:text-white transition-colors text-xs">• Documentation</Link></li>
                    <li><Link href="/security" className="text-blue-200 hover:text-white transition-colors text-xs">• Security</Link></li>
                    <li><Link href="/templates" className="text-blue-200 hover:text-white transition-colors text-xs">• Template</Link></li>
                  </ul>
                </div>

                {/* Get in touch */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white">Get in touch!</h4>
                  <p className="text-blue-200 text-xs leading-relaxed">
                    Fusce varius, dolor tempor interdum tristique, bibendum service life.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-200 text-xs leading-relaxed">
                        147/I, Green Road, Gulshan Avenue, Panthapath, Dhaka
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <a href="mailto:info@edura.com" className="text-blue-200 hover:text-white text-xs transition-colors">
                        info@edura.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <a href="tel:+256214203215" className="text-blue-200 hover:text-white text-xs transition-colors">
                        +256 214 203 215
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="border-t border-blue-800/30 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <p className="text-blue-200 text-xs">
                  Copyright © 2023 <span className="text-blue-400 hover:text-white cursor-pointer">Edura</span> All Rights Reserved.
                </p>
                <div className="flex items-center space-x-4">
                  <Link href="/privacy" className="text-blue-200 hover:text-white text-xs transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-blue-200 hover:text-white text-xs transition-colors">
                    Terms & Condition
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
