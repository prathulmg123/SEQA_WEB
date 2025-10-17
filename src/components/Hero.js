import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modern3DBackground from './Modern3DBackground';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial animations
    tl.from(titleRef.current, {
      duration: 1,
      y: 60,
      opacity: 0,
      scale: 0.9,
    })
    .from(subtitleRef.current, {
      duration: 0.8,
      y: 40,
      opacity: 0,
    }, '-=0.5')
    .from(buttonsRef.current.children, {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.15,
    }, '-=0.4')
    .from('.stat-card', {
      duration: 0.8,
      y: 40,
      opacity: 0,
      stagger: 0.15,
    }, '-=0.3')
    .from(imageRef.current, {
      duration: 1,
      x: 60,
      opacity: 0,
    }, '-=0.8');

    // Stats counter animation
    const stats = statsRef.current?.querySelectorAll('.stat-number');
    stats?.forEach((stat) => {
      gsap.from(stat, {
        textContent: 0,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
        },
        onUpdate: function() {
          stat.textContent = Math.ceil(this.targets()[0].textContent);
        }
      });
    });

    // Parallax effect
    gsap.to(heroRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50"
    >
      {/* 3D Background */}
      <Modern3DBackground />

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-blob opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-blob opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

      {/* Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-40"></div>

      <div className="container-max section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div ref={titleRef} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-600">Welcome to Seqato</span>
              </div>
              <h1 className="modern-title text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Transform Your
                <br />
                <span className="gradient-text">Digital Future</span>
              </h1>
            </div>

            <div ref={subtitleRef}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                We craft cutting-edge IT solutions that empower businesses to thrive in the digital age. 
                From web development to cloud services, we're your technology partner.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <button className="btn-primary text-lg">
                Get Started
              </button>
              <button className="btn-secondary text-lg">
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-8">
              <div className="stat-card">
                <div className="stat-number text-4xl font-bold gradient-text" data-target="150">120</div>
                <div className="text-gray-600 text-sm mt-1">Projects Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number text-4xl font-bold gradient-text" data-target="50">300</div>
                <div className="text-gray-600 text-sm mt-1">Happy Clients</div>
              </div>
              <div className="stat-card">
                <div className="stat-number text-4xl font-bold gradient-text" data-target="10">10</div>
                <div className="text-gray-600 text-sm mt-1">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Graphic */}
          <div ref={imageRef} className="relative">
            <div className="relative">
              {/* Main Card */}
              <div className="glass-card p-8 shine-effect">
                <div className="space-y-6">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200"></div>
                      <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-blue-300"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500 rounded-xl shadow-glow-blue animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-600 rounded-full shadow-glow-blue animate-float" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
