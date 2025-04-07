
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fox model
const Fox = ({ position = [0, -1, 0], scale = 0.02 }) => {
  const group = useRef<THREE.Group>(null!);
  const { mouse, viewport } = useThree();
  const [lookAt, setLookAt] = useState(new THREE.Vector3(0, 0, 1));
  
  useEffect(() => {
    // Load a fallback model if the fox fails
    const onError = () => {
      console.error("Failed to load fox model, using cube fallback");
    };
    
    // Attempt to preload the model
    const img = new Image();
    img.onerror = onError;
  }, []);
  
  useFrame(() => {
    if (!group.current) return;
    
    // Calculate the mouse position in 3D space
    const x = (mouse.x * viewport.width) / 15;
    const y = (mouse.y * viewport.height) / 15;
    
    // Update lookAt target smoothly
    const targetLookAt = new THREE.Vector3(x, y, 5);
    lookAt.lerp(targetLookAt, 0.05);
    
    // Make the fox look at the mouse
    group.current.lookAt(lookAt);
    
    // Add some subtle animation
    group.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
  });
  
  return (
    <group ref={group} position={position} scale={scale}>
      <FoxModel />
    </group>
  );
};

// Fallback cube model
const CubeModel = ({ color = "#9b87f5", size = 2 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Try to use the fox model, fallback to cube
const FoxModel = () => {
  let fox;
  try {
    fox = useGLTF('/fox.glb');
    return <primitive object={fox.scene} />;
  } catch (error) {
    console.error("Failed to load fox model, using cube grid instead");
    return <CubeGrid />;
  }
};

// Fallback cube grid
const CubeGrid = () => {
  return (
    <group>
      <CubeModel position={[0, 0, 0]} color="#9b87f5" size={2} />
      <CubeModel position={[2, 0, 0]} color="#6E59A5" size={1} />
      <CubeModel position={[-2, 0, 0]} color="#6E59A5" size={1} />
      <CubeModel position={[0, 2, 0]} color="#1EAEDB" size={1} />
      <CubeModel position={[0, -2, 0]} color="#1EAEDB" size={1} />
      <CubeModel position={[1.5, 1.5, 0]} color="#F97316" size={0.75} />
      <CubeModel position={[-1.5, -1.5, 0]} color="#F97316" size={0.75} />
      <CubeModel position={[-1.5, 1.5, 0]} color="#0EA5E9" size={0.75} />
      <CubeModel position={[1.5, -1.5, 0]} color="#0EA5E9" size={0.75} />
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
        
        {/* If fox model fails, CubeGrid will be shown */}
        <Fox />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
