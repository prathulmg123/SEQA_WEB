import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Modern3DBackground = () => {
  const mountRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 1.5, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.5, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    // Create small bubble shapes
    const shapes = [];
    const bubbleCount = 20;
    
    for (let i = 0; i < bubbleCount; i++) {
      const radius = Math.random() * 0.5 + 0.3;
      const bubbleGeometry = new THREE.SphereGeometry(radius, 32, 32);
      
      // Create bubble material with transparency and refraction-like effects
      const bubbleMaterial = new THREE.MeshPhysicalMaterial({
        color: Math.random() > 0.5 ? 0x3b82f6 : 0x8b5cf6,
        transparent: true,
        opacity: 0.3,
        roughness: 0,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        transmission: 0.9,
        reflectivity: 0.5,
      });
      
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      
      // Random position
      bubble.position.x = (Math.random() - 0.5) * 50;
      bubble.position.y = (Math.random() - 0.5) * 50;
      bubble.position.z = (Math.random() - 0.5) * 50;
      
      scene.add(bubble);
      shapes.push(bubble);
    }

    // Particles
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x3b82f6);
    const color2 = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 80;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 80;

      const color = Math.random() > 0.5 ? color1 : color2;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // GSAP animations for shapes
    shapes.forEach((shape, index) => {
      gsap.to(shape.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20 + index * 5,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(shape.position, {
        y: `+=${5 + index * 2}`,
        duration: 3 + index,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.005;

      // Camera movement
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Rotate particles
      particles.rotation.y += 0.001;
      particles.rotation.x = Math.sin(time) * 0.1;

      // Animate bubbles - floating effect
      shapes.forEach((bubble, index) => {
        bubble.position.y += Math.sin(time * 0.5 + index) * 0.02;
        bubble.position.x += Math.cos(time * 0.3 + index) * 0.01;
        bubble.rotation.y += 0.002;
        bubble.rotation.x += 0.001;
      });

      // Light animation
      pointLight1.position.x = Math.sin(time * 0.5) * 20;
      pointLight1.position.z = Math.cos(time * 0.5) * 20;
      pointLight2.position.x = Math.cos(time * 0.3) * 20;
      pointLight2.position.z = Math.sin(time * 0.3) * 20;

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
      scene.clear();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
  );
};

export default Modern3DBackground;
