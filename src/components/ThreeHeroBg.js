import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHeroBg = () => {
  const mountRef = useRef(null);
  const requestRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const pointsRef = useRef(null);
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

    // Create particle field
    const particles = 1500;
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);

    const colorA = new THREE.Color('#2563eb'); // blue-600
    const colorB = new THREE.Color('#7c3aed'); // purple-600

    for (let i = 0; i < particles; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 200; // x
      positions[i3 + 1] = (Math.random() - 0.5) * 120; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 200; // z

      const mixed = colorA.clone().lerp(colorB, Math.random());
      colors[i3 + 0] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    // Lights (subtle)
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

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
        pointsRef.current.rotation.y += 0.0008;
        pointsRef.current.rotation.x = Math.sin(t) * 0.05 + mouseRef.current.y * 0.05;
        pointsRef.current.rotation.z = Math.cos(t) * 0.03 + mouseRef.current.x * 0.05;
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
      geometry.dispose();
      material.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 -z-10" />
  );
};

export default ThreeHeroBg;


