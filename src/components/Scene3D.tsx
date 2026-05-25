"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Floating Wireframe Icosahedron — primary hero geometry             */
/* ------------------------------------------------------------------ */
function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  // spring-damped target for mouse parallax
  const springTarget = useMemo(() => new THREE.Vector3(), []);
  const springCurrent = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    // slow autonomous rotation
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.z += delta * 0.05;

    // mouse parallax with spring physics
    springTarget.set(pointer.y * 0.3, pointer.x * 0.3, 0);
    springCurrent.lerp(springTarget, 2.5 * delta);
    meshRef.current.position.x = springCurrent.y;
    meshRef.current.position.y = springCurrent.x;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.6, 1]} />
      <meshBasicMaterial
        color="#2a2a2a"
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbiting TorusKnot — secondary accent geometry                     */
/* ------------------------------------------------------------------ */
function OrbitingTorus() {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    // orbit around the icosahedron
    groupRef.current.rotation.y += delta * 0.25;
    groupRef.current.rotation.x += delta * 0.1;

    // self-rotation
    meshRef.current.rotation.x += delta * 0.4;
    meshRef.current.rotation.z += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[4, 0.5, 0]}>
        <torusKnotGeometry args={[0.55, 0.18, 64, 12, 2, 3]} />
        <meshBasicMaterial
          color="#1a1a1a"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene — composed Canvas with both geometries                       */
/* ------------------------------------------------------------------ */
export default function Scene3D() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.1} />

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
        <Icosahedron />
      </Float>

      <OrbitingTorus />
    </Canvas>
  );
}
