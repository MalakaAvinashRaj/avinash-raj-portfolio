
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      <DialogContent className="bg-vscode-bg border border-vscode-border text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Welcome to Avinash Raj's Portfolio
          </DialogTitle>
        </DialogHeader>
        
        <p className="text-center mb-6">
          How would you like to explore the portfolio?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => handleSelect('simple')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Simple View
              <span className="ml-2 text-xs opacity-80">(3D Animated)</span>
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => handleSelect('professional')}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
            >
              Professional View
              <span className="ml-2 text-xs opacity-80">(IDE Style)</span>
            </Button>
          </motion.div>
        </div>
        
        <p className="text-xs text-center text-gray-400 mt-4">
          Your preference will be saved for future visits
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
