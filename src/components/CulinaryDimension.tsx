'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CulinaryDimension() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xd4af37, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. "Plate" - a thin cylinder
    const plateGeo = new THREE.CylinderGeometry(1.5, 1.2, 0.1, 32);
    const goldMat = new THREE.MeshStandardMaterial({ 
      color: 0xd4af37, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const plate = new THREE.Mesh(plateGeo, goldMat);
    plate.position.x = -2;
    group.add(plate);

    // 2. "Floating Spices" - small spheres
    for(let i=0; i<8; i++) {
      const spiceGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const spice = new THREE.Mesh(spiceGeo, goldMat);
      spice.position.set(
        Math.random() * 4 - 2,
        Math.random() * 4 - 2,
        Math.random() * 2 - 1
      );
      group.add(spice);
    }

    // 3. "Chef's Ring" - a torus
    const ringGeo = new THREE.TorusGeometry(0.8, 0.05, 16, 100);
    const ring = new THREE.Mesh(ringGeo, goldMat);
    ring.position.x = 2;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.rotation.x += 0.002;
      
      plate.rotation.y += 0.01;
      ring.rotation.z += 0.01;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-4">Interactive Heritage</p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">The Culinary <br/> <span className="text-[#D4AF37]">Dimension</span></h2>
          <p className="text-white/50 font-light text-lg leading-relaxed mb-8">
            Experience the ingredients and artistry of De Leela in a virtual space. Every element is crafted to perfection, balancing ancestral traditions with modern digital mastery.
          </p>
          <div className="w-20 h-0.5 bg-[#D4AF37]" />
        </div>
        <div ref={containerRef} className="md:w-1/2 h-[400px] cursor-grab active:cursor-grabbing" />
      </div>
    </section>
  );
}
