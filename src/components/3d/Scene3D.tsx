
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';

interface CubeProps {
  position: [number, number, number];
  color: string;
  wireframe?: boolean;
  size?: number;
  rotationSpeed?: number;
}

const Cube: React.FC<CubeProps> = ({
  position,
  color,
  wireframe = false,
  size = 1,
  rotationSpeed = 0.01
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += rotationSpeed;
    mesh.current.rotation.y += rotationSpeed * 0.5;
  });

  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
};

const Logo3D: React.FC = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame(({ mouse, viewport }) => {
    if (!group.current) return;
    // Gently rotate the group based on mouse position
    const x = (mouse.x * viewport.width) / 50;
    const y = (mouse.y * viewport.height) / 50;
    
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.5,
      0.075
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      y * 0.5,
      0.075
    );
  });

  return (
    <group ref={group}>
      <Cube position={[0, 0, 0]} color="#9b87f5" size={2} />
      <Cube position={[2, 0, 0]} color="#6E59A5" size={1} rotationSpeed={0.02} />
      <Cube position={[-2, 0, 0]} color="#6E59A5" size={1} rotationSpeed={0.02} />
      <Cube position={[0, 2, 0]} color="#1EAEDB" size={1} rotationSpeed={0.03} />
      <Cube position={[0, -2, 0]} color="#1EAEDB" size={1} rotationSpeed={0.03} />
      <Cube position={[1.5, 1.5, 0]} color="#F97316" size={0.75} rotationSpeed={0.04} />
      <Cube position={[-1.5, -1.5, 0]} color="#F97316" size={0.75} rotationSpeed={0.04} />
      <Cube position={[-1.5, 1.5, 0]} color="#0EA5E9" size={0.75} rotationSpeed={0.04} />
      <Cube position={[1.5, -1.5, 0]} color="#0EA5E9" size={0.75} rotationSpeed={0.04} />
    </group>
  );
};

interface Scene3DProps {
  className?: string;
}

const Scene3D: React.FC<Scene3DProps> = ({ className }) => {
  return (
    <div className={`${className || ''} w-full h-full min-h-[400px]`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Logo3D />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
