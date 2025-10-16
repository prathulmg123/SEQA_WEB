import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Cross-browser Compatible"],
      color: "blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      features: ["Native Performance", "Cross-platform", "App Store Ready", "Push Notifications"],
      color: "purple"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that provide exceptional user experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "pink"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality Assurance",
      description: "Comprehensive testing services to ensure your software works flawlessly.",
      features: ["Automated Testing", "Manual Testing", "Performance Testing", "Security Testing"],
      color: "green"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions for modern applications.",
      features: ["AWS/Azure/GCP", "DevOps", "Microservices", "Auto-scaling"],
      color: "indigo"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Consulting",
      description: "Strategic technology consulting to help you make informed decisions.",
      features: ["Tech Strategy", "Architecture Review", "Code Audit", "Team Training"],
      color: "yellow"
    }
  ];

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
    });

    cardsRef.current.forEach((card, index) => {
      if (card) {
        tl.from(card, {
          duration: 0.8,
          y: 50,
          opacity: 0,
          ease: "power3.out"
        }, `-=${0.6 + index * 0.1}`);
      }
    });

  }, []);

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      pink: "from-pink-500 to-pink-600",
      green: "from-green-500 to-green-600",
      indigo: "from-indigo-500 to-indigo-600",
      yellow: "from-yellow-500 to-yellow-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive software development services to help your business thrive in the digital world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-hover"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(service.color)} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${getColorClasses(service.color)} rounded-full`}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <button className={`mt-6 text-sm font-semibold text-transparent bg-gradient-to-r ${getColorClasses(service.color)} bg-clip-text hover:scale-105 transition-transform duration-300`}>
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Let's discuss how we can help bring your vision to life with our expert development services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Get Free Consultation
              </button>
              <button className="btn-secondary">
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
