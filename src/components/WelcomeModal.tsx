
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useViewMode } from '@/contexts/ViewModeContext';

const WelcomeModal: React.FC = () => {
  const { setViewMode, hasSelectedView } = useViewMode();

  const handleSelect = (mode: 'simple' | 'professional') => {
    setViewMode(mode);
  };

  return (
    <Dialog open={!hasSelectedView}>
      <DialogContent className="bg-vscode-bg border border-vscode-border text-white w-[90vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-2">
            Welcome to Avinash Raj's Portfolio
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Choose how you'd like to explore my work
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center my-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Button
              onClick={() => handleSelect('simple')}
              className="w-full h-auto py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex flex-col"
            >
              <span className="text-base">Simple View</span>
              <span className="text-xs opacity-80 mt-1">(3D Animated)</span>
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Button
              onClick={() => handleSelect('professional')}
              className="w-full h-auto py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black flex flex-col"
            >
              <span className="text-base">Professional View</span>
              <span className="text-xs opacity-80 mt-1">(IDE Style)</span>
            </Button>
          </motion.div>
        </div>
        
        <p className="text-xs text-center text-gray-400 mt-2">
          Your preference will be saved for future visits
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
