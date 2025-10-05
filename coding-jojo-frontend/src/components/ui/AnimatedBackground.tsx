"use client"
import React, { useState, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black"></div>
      </div>
    );
  }

  return (<div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black"></div>
      
      {/* Twinkling Stars */}
      <div className="absolute inset-0 overflow-hidden opacity-80">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle star-shape"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Floating light particles */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        @keyframes sun-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.8);
            transform: scale(1.05);
          }
        }
        .animate-sun-glow {
          animation: sun-glow 4s ease-in-out infinite;
        }
        
        @keyframes moon-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(243, 244, 246, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 25px rgba(243, 244, 246, 0.7);
            transform: scale(1.03);
          }
        }
        .animate-moon-glow {
          animation: moon-glow 6s ease-in-out infinite;
        }
        
        @keyframes cloud-float {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(10px) translateY(-5px);
          }
          50% {
            transform: translateX(-5px) translateY(-10px);
          }
          75% {
            transform: translateX(-10px) translateY(5px);
          }
        }
        .animate-cloud-float {
          animation: cloud-float 20s ease-in-out infinite;
        }
        
        @keyframes cloud-float-reverse {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-10px) translateY(5px);
          }
          50% {
            transform: translateX(5px) translateY(10px);
          }
          75% {
            transform: translateX(10px) translateY(-5px);
          }
        }
        .animate-cloud-float-reverse {
          animation: cloud-float-reverse 25s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(-10px) scale(0.9);
            opacity: 1;
          }
          75% {
            transform: translateY(-20px) translateX(15px) scale(1.05);
            opacity: 0.7;
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        
        .star-shape {
          width: 3px;
          height: 3px;
          background: white;
          position: relative;
          border-radius: 50%;
        }
        .star-shape:before,
        .star-shape:after {
          content: '';
          position: absolute;
          width: 1px;
          height: 6px;
          background: white;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .star-shape:before {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        .star-shape:after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;