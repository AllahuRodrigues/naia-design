import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
uniform float uIntensity;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

// Noise function
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  // Create morphing effect
  vec3 pos = position;
  float noise = snoise(pos * 0.5 + uTime * 0.3) * uIntensity;
  pos += normal * noise * 0.3;
  
  // Add crystalline facets
  float facetNoise = snoise(pos * 2.0 + uTime * 0.1) * 0.1;
  pos += normal * facetNoise;
  
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uFresnelPower;
uniform float uGlassiness;
uniform float uChromatic;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  vec3 normal = normalize(vNormal);
  
  // Fresnel effect
  float fresnel = pow(1.0 - dot(viewDirection, normal), uFresnelPower);
  
  // Base color mixing
  vec3 color = mix(uColor1, uColor2, vUv.y);
  color = mix(color, uColor3, fresnel);
  
  // Holographic effect
  float holo = sin(vPosition.y * 10.0 + uTime * 2.0) * 0.1 + 0.9;
  color *= holo;
  
  // Chromatic aberration simulation
  vec3 chromatic = vec3(
    color.r + sin(uTime + vUv.x * 10.0) * uChromatic,
    color.g + sin(uTime + vUv.y * 10.0 + 2.0) * uChromatic,
    color.b + sin(uTime + (vUv.x + vUv.y) * 5.0 + 4.0) * uChromatic
  );
  
  // Glass transparency
  float alpha = mix(0.6, 0.9, fresnel) * uGlassiness;
  
  // Rim lighting
  float rim = 1.0 - dot(viewDirection, normal);
  rim = pow(rim, 2.0);
  chromatic += rim * 0.5;
  
  gl_FragColor = vec4(chromatic, alpha);
}
`;

interface CrystalShaderProps {
  color1?: THREE.Color;
  color2?: THREE.Color;
  color3?: THREE.Color;
  intensity?: number;
  fresnelPower?: number;
  glassiness?: number;
  chromatic?: number;
}

const CrystalShader: React.FC<CrystalShaderProps> = ({
  color1 = new THREE.Color('#5a4ec4'),
  color2 = new THREE.Color('#4e76c4'),
  color3 = new THREE.Color('#c4764e'),
  intensity = 0.2,
  fresnelPower = 2.0,
  glassiness = 0.8,
  chromatic = 0.02,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uColor1: { value: color1 },
      uColor2: { value: color2 },
      uColor3: { value: color3 },
      uFresnelPower: { value: fresnelPower },
      uGlassiness: { value: glassiness },
      uChromatic: { value: chromatic },
    }),
    [color1, color2, color3, intensity, fresnelPower, glassiness, chromatic]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
      blending={THREE.NormalBlending}
    />
  );
};

export default CrystalShader; 