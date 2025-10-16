import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { immediateRender: false },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true
      }
    });

    tl.from(titleRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    })
    .from(contentRef.current, {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.5")
    .from(statsRef.current, {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.5")
    .from(imageRef.current, {
      duration: 1,
      x: 50,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.8");

    // Counter animation for stats
    const counters = statsRef.current?.querySelectorAll('.counter');
    counters?.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true
        }
      });
    });

  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div ref={titleRef}>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About <span className="gradient-text">Seqato</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>

            <div ref={contentRef} className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                We are a passionate team of developers, designers, and innovators dedicated to creating 
                exceptional software solutions that drive business growth and enhance user experiences.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With over 5 years of experience in the industry, we've helped numerous companies 
                transform their digital presence through cutting-edge technology and creative design.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Innovation First</h3>
                    <p className="text-gray-600">We stay ahead of technology trends to deliver cutting-edge solutions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Assurance</h3>
                    <p className="text-gray-600">Every project undergoes rigorous testing to ensure flawless performance.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Client-Centric</h3>
                    <p className="text-gray-600">Your success is our priority. We work closely with you every step of the way.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-8 pt-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold gradient-text counter" data-target="50">0</div>
                <div className="text-gray-600 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold gradient-text counter" data-target="25">0</div>
                <div className="text-gray-600 font-medium">Happy Clients</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold gradient-text counter" data-target="5">0</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold gradient-text counter" data-target="100">0</div>
                <div className="text-gray-600 font-medium">% Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div ref={imageRef} className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                    <p className="text-blue-100">
                      To empower businesses with innovative software solutions that drive growth and success.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-blue-100">Support</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="text-2xl font-bold">Fast</div>
                      <div className="text-sm text-blue-100">Delivery</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="text-2xl font-bold">Modern</div>
                      <div className="text-sm text-blue-100">Tech Stack</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                      <div className="text-2xl font-bold">Scalable</div>
                      <div className="text-sm text-blue-100">Solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-30"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
