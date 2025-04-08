
import React from 'react';
import ViewToggle from './ViewToggle';
import { useViewMode } from '@/contexts/ViewModeContext';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const { viewMode } = useViewMode();
  const isMobile = useIsMobile();
  
  const isProfessional = viewMode === 'professional';
  
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 h-12 ${
        isProfessional 
          ? 'bg-vscode-bg border-b border-vscode-border' 
          : 'bg-gray-900/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`font-bold ${isMobile ? 'text-sm' : 'text-xl'}`}>
            {isProfessional ? (
              <span className="text-white">
                <span className="text-vscode-active">Dev</span>Portfolio<span className="text-vscode-active">IDE</span>
              </span>
            ) : (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Avinash Raj Malaka
              </span>
            )}
          </h1>
        </motion.div>
        
        <ViewToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;
