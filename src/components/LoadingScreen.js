import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const logoRef = useRef(null);

  useEffect(() => {
    // Animate progress
    gsap.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      },
      onComplete: () => {
        gsap.to(".loading-screen", {
          duration: 0.8,
          opacity: 0,
          ease: "power2.out",
          onComplete: onComplete
        });
      }
    });

    // Logo animation
    gsap.to(logoRef.current, {
      y: -10,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

  }, [onComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-white z-50 flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
      <div className="absolute inset-0 dot-pattern opacity-30"></div>

      {/* Content */}
      <div className="text-center relative z-10">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl transform rotate-6 animate-glow"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-4xl">S</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="modern-title text-3xl font-bold mb-2 text-gray-900">
          Seqato
        </h2>
        <p className="text-gray-600 mb-8">Loading your experience...</p>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-4 text-sm font-semibold text-gray-700">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
