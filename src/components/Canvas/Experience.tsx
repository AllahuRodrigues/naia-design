import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Reflector, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import CrystalShader from './CrystalShader';

const ParticleField: React.FC<{ count?: number }> = ({ count = 1000 }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create spiral galaxy pattern
      const i3 = i * 3;
      const radius = Math.random() * 20 + 5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(angle) * radius;
      
      // Color based on distance
      const distance = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2);
      const normalizedDistance = distance / 25;
      
      colors[i3] = 0.5 + normalizedDistance * 0.5; // R
      colors[i3 + 1] = 0.3 + normalizedDistance * 0.4; // G  
      colors[i3 + 2] = 0.8 + normalizedDistance * 0.2; // B
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const MorphingGeometry: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = React.useState<THREE.BufferGeometry | null>(null);

  React.useEffect(() => {
    // Create base icosphere geometry
    const baseGeometry = new THREE.IcosahedronGeometry(2, 4);
    
    // Add detail for morphing
    const positionAttribute = baseGeometry.attributes.position;
    const vertices = positionAttribute.array as Float32Array;
    
    // Store original positions for morphing reference
    const originalPositions = new Float32Array(vertices.length);
    originalPositions.set(vertices);
    baseGeometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
    
    setGeometry(baseGeometry);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the crystal
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      
      // Floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  if (!geometry) return null;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <CrystalShader
          intensity={0.3}
          fresnelPower={2.5}
          glassiness={0.9}
          chromatic={0.03}
        />
      </mesh>
    </Float>
  );
};

const ReflectiveFloor: React.FC = () => {
  return (
    <Reflector
      position={[0, -4, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[20, 20]}
      mixBlur={1}
      mixStrength={0.3}
      resolution={512}
      blur={[300, 100]}
      minDepthThreshold={0.9}
      maxDepthThreshold={1}
      depthScale={1}
      depthToBlurRatioBias={0.25}
      distortion={0.1}
      mirror={0.5}
    >
      {(Material, props) => (
        <Material
          color="#0f0f1a"
          metalness={0.8}
          roughness={0.2}
          {...props}
        />
      )}
    </Reflector>
  );
};

const Experience: React.FC = () => {
  return (
    <>
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />

      {/* Lighting */}
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Accent lights */}
      <pointLight
        position={[-10, 0, -10]}
        color="#5a4ec4"
        intensity={0.3}
      />
      <pointLight
        position={[10, 0, 10]}
        color="#4e76c4"
        intensity={0.3}
      />
      <pointLight
        position={[0, 10, 0]}
        color="#c4764e"
        intensity={0.2}
      />

      {/* Main crystal */}
      <MorphingGeometry />

      {/* Particle field */}
      <ParticleField count={800} />

      {/* Sparkles for extra magic */}
      <Sparkles
        count={100}
        scale={10}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#ffffff"
      />

      {/* Reflective floor */}
      <ReflectiveFloor />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0f', 15, 40]} />
    </>
  );
};

export default Experience; 