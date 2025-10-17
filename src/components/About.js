import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modern3DBackground from './Modern3DBackground';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef([]);
  const timelineRef = useRef(null);
  const achievementsRef = useRef([]);
  const techStackRef = useRef(null);
  const ctaRef = useRef(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power3.out"
        });
      }

      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          duration: 1,
          y: 30,
          opacity: 0,
          ease: "power3.out"
        });
      }

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          duration: 1,
          y: 30,
          opacity: 0,
          ease: "power3.out"
        });
      }

      // Features animation with stagger
      featuresRef.current.filter(Boolean).forEach((feature, index) => {
        if (!feature) return;
        
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: "power3.out",
          delay: index * 0.1
        });

        // Icon pulse animation
        const icon = feature.querySelector('.feature-icon-pulse');
        if (icon) {
          gsap.to(icon, {
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });

      // Stats counter animation
      const statsCards = statsRef.current?.querySelectorAll('.stat-card');
      statsCards?.forEach((card, index) => {
        // Card entrance animation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          duration: 1,
          y: 30,
          opacity: 0,
          ease: "power3.out",
          delay: index * 0.1
        });

        // Counter animation with easing
        const counter = card.querySelector('.counter');
        if (counter) {
          const target = parseInt(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          
          // Set initial value
          counter.innerText = '0' + suffix;
          
          gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: function() {
              const currentValue = Math.ceil(this.targets()[0].innerText);
              counter.innerText = currentValue + suffix;
            }
          });
        }

        // Progress bar animation
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
          gsap.from(progressBar, {
            scrollTrigger: {
              trigger: progressBar,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            width: 0,
            duration: 2,
            ease: "power3.out",
            delay: 0.5
          });
        }
      });

      // Timeline animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      timelineItems?.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Achievements cards with magnetic hover
      achievementsRef.current.filter(Boolean).forEach((card) => {
        if (!card) return;
        
        const onMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(card, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          });
        };

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);
      });

      // Tech stack with reveal animation
      const techItems = techStackRef.current?.querySelectorAll('.tech-item');
      if (techItems && techItems.length > 0) {
        gsap.from(techItems, {
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: {
            amount: 1,
            from: "center",
            grid: "auto"
          },
          ease: "back.out(1.7)"
        });
      }

      // CTA section animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    });
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Modern 3D Background */}
      <Modern3DBackground />

      {/* Animated Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container-max relative z-10 py-24">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold rounded-full shadow-lg uppercase tracking-wider">
              About Seqato
            </span>
          </div>
          
          <h2 ref={titleRef} className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Innovating the Future of <span className="gradient-text">Technology</span>
          </h2>
          
          <div 
            className="w-32 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-12"
            style={{
              transform: `translateX(${mousePos.x * 10}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          ></div>
        </div>

        {/* Content Introduction */}
        <div ref={contentRef} className="max-w-5xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="animate-paragraph text-xl text-gray-700 leading-relaxed font-light">
                At <span className="font-bold gradient-text">Seqato</span>, we don't just build software—we engineer digital ecosystems that transform industries and empower businesses to achieve unprecedented growth.
              </p>
              <p className="animate-paragraph text-xl text-gray-700 leading-relaxed font-light">
                Founded with a vision to bridge the gap between technology and business success, we've evolved into a powerhouse of innovation, delivering cutting-edge solutions that set new industry standards.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-20 h-20 mx-auto mb-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    <p className="text-lg font-semibold">Watch Our Story</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid with 3D Effects */}
        <div className="mb-24" style={{opacity: 1}}>
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Seqato</h3>
            <p className="text-xl text-gray-600">Excellence delivered through innovation and expertise</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{opacity: 1}}>
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast",
                description: "Optimized performance ensuring your applications run at peak efficiency",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Enterprise Security",
                description: "Bank-grade security protocols protecting your data and operations",
                color: "from-blue-600 to-blue-800"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                ),
                title: "Scalable Solutions",
                description: "Architectures designed to grow seamlessly with your business",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: "Agile Development",
                description: "Rapid iterations with continuous delivery and improvement",
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Expert Team",
                description: "Seasoned professionals with deep industry knowledge",
                color: "from-blue-500 to-blue-700"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Data-Driven",
                description: "Analytics and insights powering informed decision-making",
                color: "from-blue-400 to-cyan-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                ref={el => featuresRef.current[index] = el}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                style={{opacity: 1, visibility: 'visible'}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`feature-icon-pulse w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section with Animated Counters */}
        

        {/* Company Timeline */}
        <div ref={timelineRef} className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h3>
            <p className="text-xl text-gray-600">Milestones that shaped our success</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full"></div>
            
            <div className="space-y-12">
              {[
                { year: "2024", title: "Global Expansion", description: "Opened offices in 5 new countries" },
                { year: "2022", title: "Industry Recognition", description: "Awarded Top IT Company of the Year" },
                { year: "2020", title: "Major Growth", description: "Reached 100+ enterprise clients" },
                { year: "2018", title: "Company Founded", description: "Started with a vision to innovate" }
              ].map((item, index) => (
                <div key={index} className={`timeline-item flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-lg"></div>
                  </div>
                  <div className="flex-1 px-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                      <div className="text-3xl font-bold gradient-text mb-2">{item.year}</div>
                      <div className="text-xl font-bold text-gray-900 mb-2">{item.title}</div>
                      <div className="text-gray-600">{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h3>
            <p className="text-xl text-gray-600">Recognition and certifications that validate our excellence</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🏆", title: "ISO Certified", desc: "Quality Standards" },
              { icon: "⭐", title: "5-Star Rated", desc: "Client Satisfaction" },
              { icon: "🎖️", title: "Industry Awards", desc: "Multiple Recognitions" },
              { icon: "🌟", title: "Best Practices", desc: "Certified Partner" }
            ].map((achievement, index) => (
              <div
                key={index}
                ref={el => achievementsRef.current[index] = el}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="text-6xl mb-4">{achievement.icon}</div>
                <div className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</div>
                <div className="text-gray-600">{achievement.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Showcase */}
        <div ref={techStackRef} className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h3>
            <p className="text-xl text-gray-600">Powered by cutting-edge technologies</p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {["React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "TypeScript", "Next.js", "Kubernetes", "Redis"].map((tech, index) => (
              <div
                key={index}
                className="tech-item bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                style={{ opacity: 1, transform: 'scale(1)' }}
              >
                <span className="font-bold text-gray-800">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's collaborate and create something extraordinary together. Your success story starts here.
            </p>
            <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
