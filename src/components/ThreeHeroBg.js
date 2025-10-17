import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeHeroBg = () => {
  const mountRef = useRef(null);
  const requestRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const pointsRef = useRef(null);
  const torusRef = useRef(null);
  const icoRef = useRef(null);
  const bubblesGroupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Create bubble texture for particles
    const createBubbleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      // Main bubble gradient
      const gradient = ctx.createRadialGradient(32, 32, 8, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(180, 220, 255, 0.6)');
      gradient.addColorStop(0.7, 'rgba(120, 160, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(100, 140, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      
      // Highlight
      const highlight = ctx.createRadialGradient(20, 20, 0, 20, 20, 12);
      highlight.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(20, 20, 12, 0, Math.PI * 2);
      ctx.fill();
      
      return new THREE.CanvasTexture(canvas);
    };

    const bubbleTexture = createBubbleTexture();

    // Create particle field with bubble sprites
    const particles = 1500;
    const particleGroup = new THREE.Group();
    pointsRef.current = particleGroup;
    scene.add(particleGroup);

    const colorA = new THREE.Color('#2563eb'); // blue-600
    const colorB = new THREE.Color('#7c3aed'); // purple-600

    for (let i = 0; i < particles; i++) {
      const material = new THREE.SpriteMaterial({
        map: bubbleTexture,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.3, 0.7),
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      const mixed = colorA.clone().lerp(colorB, Math.random());
      material.color = mixed;
      
      const sprite = new THREE.Sprite(material);
      const size = THREE.MathUtils.randFloat(0.8, 2.5);
      sprite.scale.set(size, size, 1);
      
      sprite.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 200
      );
      
      // Store animation data
      sprite.userData = {
        velocityY: THREE.MathUtils.randFloat(0.01, 0.03),
        wobbleSpeed: THREE.MathUtils.randFloat(0.5, 1.5),
        wobbleAmount: THREE.MathUtils.randFloat(0.1, 0.3),
        phase: Math.random() * Math.PI * 2,
        originalScale: size,
        pulseSpeed: THREE.MathUtils.randFloat(0.8, 1.5)
      };
      
      particleGroup.add(sprite);
      
      // GSAP animation for pulsing effect
      gsap.to(sprite.scale, {
        x: size * THREE.MathUtils.randFloat(1.1, 1.3),
        y: size * THREE.MathUtils.randFloat(1.1, 1.3),
        duration: sprite.userData.pulseSpeed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Lights (subtle)
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.3);
    dir.position.set(2, 3, 5);
    scene.add(dir);

    // Add new 3D primitives
    const torusGeom = new THREE.TorusGeometry(8, 1.2, 24, 100);
    const torusMat = new THREE.MeshStandardMaterial({ color: '#7c3aed', metalness: 0.6, roughness: 0.3, transparent: true, opacity: 0.9 });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    torus.position.set(-20, -6, -30);
    torusRef.current = torus;
    scene.add(torus);

    const icoGeom = new THREE.IcosahedronGeometry(6, 0);
    const icoMat = new THREE.MeshStandardMaterial({ color: '#2563eb', metalness: 0.5, roughness: 0.35, transparent: true, opacity: 0.95, flatShading: true });
    const ico = new THREE.Mesh(icoGeom, icoMat);
    ico.position.set(24, 10, -40);
    icoRef.current = ico;
    scene.add(ico);

    // Bubble sprites (soft circular sprites rising with wobble)
    const BOUNDS_X = 80;
    const BOUNDS_Y = 50;
    const NUM_BUBBLES = 90;

    // Create a soft circular texture using canvas
    const bubbleCanvas = document.createElement('canvas');
    bubbleCanvas.width = 128;
    bubbleCanvas.height = 128;
    const ctx2 = bubbleCanvas.getContext('2d');
    const gradient2 = ctx2.createRadialGradient(64, 64, 18, 64, 64, 62);
    gradient2.addColorStop(0.0, 'rgba(255,255,255,0.95)');
    gradient2.addColorStop(0.4, 'rgba(255,255,255,0.35)');
    gradient2.addColorStop(1.0, 'rgba(255,255,255,0.0)');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(64, 64, 62, 0, Math.PI * 2);
    ctx2.fill();
    const bubbleSpriteTexture = new THREE.CanvasTexture(bubbleCanvas);
    bubbleSpriteTexture.minFilter = THREE.LinearFilter;
    bubbleSpriteTexture.magFilter = THREE.LinearFilter;
    bubbleSpriteTexture.generateMipmaps = false;

    const bubblesGroup = new THREE.Group();
    bubblesGroupRef.current = bubblesGroup;
    scene.add(bubblesGroup);

    const bubbleData = [];
    for (let i = 0; i < NUM_BUBBLES; i++) {
      const mat = new THREE.SpriteMaterial({
        map: bubbleSpriteTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(mat);
      const size = THREE.MathUtils.randFloat(0.9, 3.2);
      sprite.scale.set(size * 2.2, size * 2.2, 1);
      sprite.position.set(
        THREE.MathUtils.randFloatSpread(BOUNDS_X),
        THREE.MathUtils.randFloatSpread(BOUNDS_Y),
        THREE.MathUtils.randFloat(-80, -20)
      );
      const speed = THREE.MathUtils.randFloat(0.02, 0.07);
      const wobbleAmp = THREE.MathUtils.randFloat(0.2, 0.9);
      const wobbleFreq = THREE.MathUtils.randFloat(0.6, 1.6);
      const phase = Math.random() * Math.PI * 2;
      sprite.material.opacity = THREE.MathUtils.mapLinear(size, 0.9, 3.2, 0.35, 0.75);
      bubblesGroup.add(sprite);
      bubbleData.push({ sprite, speed, wobbleAmp, wobbleFreq, phase });
    }

    // GSAP float/rotation timelines
    gsap.to(torus.rotation, { x: '+=6.283', y: '+=3.141', duration: 24, ease: 'none', repeat: -1 });
    gsap.to(torus.position, { y: '-=2', duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to(ico.rotation, { y: '+=6.283', z: '+=3.141', duration: 28, ease: 'none', repeat: -1 });
    gsap.to(ico.position, { y: '+=2.5', duration: 4.0, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    const resize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    let t = 0;
    const animate = () => {
      t += 0.003;
      if (pointsRef.current) {
        // Rotate particle group
        pointsRef.current.rotation.y += 0.0008;
        pointsRef.current.rotation.x = Math.sin(t) * 0.05 + mouseRef.current.y * 0.05;
        pointsRef.current.rotation.z = Math.cos(t) * 0.03 + mouseRef.current.x * 0.05;
        
        // Animate each bubble particle
        pointsRef.current.children.forEach((sprite) => {
          const userData = sprite.userData;
          
          // Float upward
          sprite.position.y += userData.velocityY;
          
          // Wobble horizontally
          sprite.position.x += Math.sin(t * userData.wobbleSpeed + userData.phase) * userData.wobbleAmount;
          
          // Wrap around when going off bounds
          if (sprite.position.y > 60) {
            sprite.position.y = -60;
            sprite.position.x = (Math.random() - 0.5) * 200;
          }
        });
      }
      // Bubble rise + horizontal wobble with wrap
      if (bubblesGroupRef.current) {
        for (let i = 0; i < bubbleData.length; i++) {
          const b = bubbleData[i];
          const p = b.sprite.position;
          p.y += b.speed;
          p.x += Math.sin((t * 4 + b.phase) * b.wobbleFreq) * 0.02 * b.wobbleAmp;
          if (p.y > BOUNDS_Y * 0.6) {
            p.y = -BOUNDS_Y * 0.6;
            p.x = THREE.MathUtils.randFloatSpread(BOUNDS_X);
            b.phase = Math.random() * Math.PI * 2;
          }
        }
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rendererRef.current) {
        mount.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (bubblesGroupRef.current) {
        bubblesGroupRef.current.children.forEach((s) => {
          if (s.material) {
            s.material.map && s.material.map.dispose();
            s.material.dispose();
          }
        });
        scene.remove(bubblesGroupRef.current);
      }
      if (pointsRef.current) {
        pointsRef.current.children.forEach((s) => {
          if (s.material) {
            s.material.map && s.material.map.dispose();
            s.material.dispose();
          }
        });
        scene.remove(pointsRef.current);
      }
      bubbleTexture.dispose();
      bubbleSpriteTexture.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
  );
};

export default ThreeHeroBg;


