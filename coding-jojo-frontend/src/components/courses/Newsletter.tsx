import React from "react";
import { ArrowRight } from "lucide-react";

const Newsletter: React.FC = () => {
  return (
    <div className="relative z-10 bg-gradient-to-r from-pink-900/30 via-black/0 to-orange-900/30 mt-16 py-12 px-4 border-t border-b border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm border border-gray-700  p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="md:flex-1 mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Stay ahead with our latest courses
              </h3>
              <p className="text-gray-300">
                Join our newsletter to receive updates about new courses,
                special offers, and expert tips.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full md:w-64  bg-gray-900/90 border border-gray-700  px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-3 sm:mb-0 sm:mr-2"
                />
                <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-5 py-3  font-medium transition duration-200 whitespace-nowrap flex items-center justify-center">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
