import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CameraControllerProps {
  children?: React.ReactNode;
}

const CameraController: React.FC<CameraControllerProps> = ({ children }) => {
  const { camera, scene } = useThree();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cameraTargetRef = useRef({ x: 0, y: 0, z: 8 });

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Camera movement: spiral around the crystal
          const radius = 8 + progress * 12;
          const angle = progress * Math.PI * 2;
          const height = progress * 5 - 2;
          
          cameraTargetRef.current.x = Math.cos(angle) * radius;
          cameraTargetRef.current.y = height;
          cameraTargetRef.current.z = Math.sin(angle) * radius;
        },
      },
    });

    // Add camera shake effect
    tl.to(cameraTargetRef.current, {
      duration: 1,
      ease: 'none',
    });

    // Store timeline reference
    timelineRef.current = tl;

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [camera]);

  useFrame((state) => {
    // Smooth camera interpolation
    camera.position.lerp(
      new THREE.Vector3(
        cameraTargetRef.current.x,
        cameraTargetRef.current.y,
        cameraTargetRef.current.z
      ),
      0.05
    );

    // Always look at center with slight offset based on mouse
    const mouse = state.mouse;
    camera.lookAt(
      mouse.x * 0.5,
      mouse.y * 0.5,
      0
    );

    // Add subtle camera shake
    const time = state.clock.elapsedTime;
    camera.position.x += Math.sin(time * 0.5) * 0.01;
    camera.position.y += Math.cos(time * 0.3) * 0.01;
  });

  return <>{children}</>;
};

export default CameraController; 