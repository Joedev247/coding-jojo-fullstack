import React from "react";
import { ArrowRight } from "lucide-react";

const Newsletter: React.FC = () => {
  return (
    <div className="relative z-10 bg-gradient-to-r from-blue-50 to-indigo-100 mt-8 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white border border-gray-200  p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full filter blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-blue-500/5 to-purple-500/5 rounded-full filter blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="md:flex-1 mb-4 md:mb-0 md:mr-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Stay ahead with our latest courses
              </h3>
              <p className="text-gray-600 text-sm">
                Join our newsletter to receive updates about new courses,
                special offers, and expert tips.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full md:w-60 bg-gray-50 border border-gray-300  px-3 py-2.5 text-gray-800 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0 sm:mr-2"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5  font-medium text-sm transition duration-200 whitespace-nowrap flex items-center justify-center">
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-1.5">
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
