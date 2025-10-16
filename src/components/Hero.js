import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeHeroBg from './ThreeHeroBg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial animation
    tl.from(titleRef.current, {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.8")
    .from(buttonRef.current, {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.6")
    .from(imageRef.current, {
      duration: 1.5,
      x: 100,
      opacity: 0,
      ease: "power3.out"
    }, "-=1.2");

    // Parallax effect
    gsap.to(imageRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Floating animation for elements
    gsap.to(buttonRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
    
    // Mouse parallax for left column elements
    const onMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(titleRef.current, { x: relX * 20, y: relY * 10, duration: 0.5, ease: 'power2.out' });
      gsap.to(subtitleRef.current, { x: relX * 15, y: relY * 8, duration: 0.5, ease: 'power2.out' });
      gsap.to(buttonRef.current, { x: relX * 10, y: relY * 6, duration: 0.5, ease: 'power2.out' });
    };
    containerRef.current?.addEventListener('mousemove', onMouseMove);
    return () => containerRef.current?.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeHeroBg />

      <div ref={containerRef} className="container-max section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div ref={titleRef} className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">Innovative</span>
                <br />
                <span className="text-gray-900">Software Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                We create cutting-edge software that transforms businesses and delivers exceptional user experiences.
              </p>
            </div>

            <div ref={subtitleRef} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Web Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Mobile Apps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">UI/UX Design</span>
                </div>
              </div>
            </div>

            <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg px-8 py-4">
                Start Your Project
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">25+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div ref={imageRef} className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">S</span>
                      </div>
                      <div className="text-sm text-gray-600">Seqato Dashboard</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-600 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-pink-600 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-500 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
