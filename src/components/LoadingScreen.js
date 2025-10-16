import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    gsap.to({}, {
      duration: 2,
      ease: "power2.out",
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      },
      onComplete: () => {
        // Fade out loading screen
        gsap.to(".loading-screen", {
          duration: 0.5,
          opacity: 0,
          ease: "power2.out",
          onComplete: onComplete
        });
      }
    });
  }, [onComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-8">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <h2 className="text-2xl font-bold gradient-text mb-4">Seqato</h2>
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mt-4">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
