"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ProjectShapeProps {
  isHovered: boolean;
  color?: string;
}

export function ProjectShape({ isHovered, color = "#00E5FF" }: ProjectShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Speed up rotation when hovered
      if (isHovered) {
        meshRef.current.rotation.x += delta * 0.8;
        meshRef.current.rotation.y += delta * 1.2;
      }
      
      // Gentle floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1.2, 0]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.8}
        roughness={0.2}
        wireframe={!isHovered}
        distort={isHovered ? 0.4 : 0.2}
        speed={isHovered ? 4 : 2}
        transparent
        opacity={isHovered ? 0.9 : 0.5}
      />
    </Icosahedron>
  );
}
