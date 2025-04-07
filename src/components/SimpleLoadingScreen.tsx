
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls, Text3D, Center } from '@react-three/drei';

const SimpleLoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 20; // Update interval in ms
    const steps = duration / interval;
    const increment = 100 / steps;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="h-64 w-64 mb-8">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Box
            args={[2, 2, 2]}
            rotation={[Math.PI / 4 * progress / 25, Math.PI / 4 * progress / 25, 0]}
          >
            <meshStandardMaterial color="#9b87f5" wireframe />
          </Box>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={5}
          />
        </Canvas>
      </div>
      
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Avinash Raj Malaka
      </motion.h1>
      
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>
      
      <p className="text-gray-400 mt-4 text-sm">
        Loading Experience ({Math.floor(progress)}%)
      </p>
    </div>
  );
};

export default SimpleLoadingScreen;
