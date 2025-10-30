"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ThumbsUp, Sparkles } from "lucide-react";

export default function SuccessPaymentPage() {
  const router = useRouter();
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
    rotation: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 8 + Math.random() * 8,
      rotation: Math.random() * 360,
      color: [
        "bg-blue-500",
        "bg-blue-400",
        "bg-blue-600",
        "bg-white",
        "bg-purple-500",
        "bg-indigo-500",
        "bg-cyan-400",
      ][Math.floor(Math.random() * 7)],
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((particle) => (
          <div
            key={particle.id}
            className={`absolute ${particle.color} rounded-sm animate-confetti-fall`}
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Pill shapes pattern */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full transform -rotate-45 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-12 bg-white rounded-full transform rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-14 bg-white rounded-full transform -rotate-12 animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-10 bg-white rounded-full transform rotate-45 animate-float-delayed"></div>
        <div className="absolute top-1/3 right-10 w-36 h-18 bg-white rounded-full transform -rotate-30 animate-float"></div>
        <div className="absolute top-1/2 left-20 w-24 h-12 bg-white rounded-full transform rotate-20 animate-float-delayed"></div>
        <div className="absolute bottom-1/3 right-20 w-32 h-16 bg-white rounded-full transform -rotate-15 animate-float"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Success Icon with Sparkle Effect */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center relative animate-scale-in">
            {/* Icon with blue background */}
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center relative">
              <ThumbsUp className="w-16 h-16 text-white" strokeWidth={2.5} />
              {/* Sparkles */}
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
              <Sparkles className="w-5 h-5 text-blue-200 absolute -bottom-1 -left-2 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            {/* Shadow effect */}
            <div className="absolute bottom-0 w-32 h-8 bg-blue-600 opacity-20 blur-xl rounded-full"></div>
          </div>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-4 border-white/30 rounded-full animate-ping-slow"></div>
          </div>
        </div>

        {/* White Content Card */}
        <div className="bg-white  px-12 py-10 max-w-2xl w-full text-center animate-slide-up">
          {/* Thank You Title */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Congratulations! 🎉
          </h1>

          {/* Success Message with Icon */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-bounce-gentle">
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <p className="text-xl text-gray-700 font-semibold">
              Enrollment Successful!
            </p>
          </div>

          {/* Description Text */}
          <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Your payment has been processed successfully. You now have lifetime access to your purchased courses. Start your coding journey today and unlock your potential!
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-10 py-3.5  hover:shadow-xl transition-all duration-300 text-base transform hover:scale-105 active:scale-95"
          >
            Take me to my Dashboard
          </button>

          {/* Additional Info */}
          <p className="text-sm text-gray-400 mt-6">
            Check your email for course access details and receipt
          </p>
        </div>

        {/* Bottom spacing */}
        <div className="h-12"></div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotation));
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
