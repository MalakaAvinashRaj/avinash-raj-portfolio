
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Cube } from 'lucide-react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { motion } from 'framer-motion';

const ViewToggle: React.FC = () => {
  const { viewMode, setViewMode } = useViewMode();

  const toggleView = () => {
    const newMode = viewMode === 'professional' ? 'simple' : 'professional';
    setViewMode(newMode);
    // Force a reload to switch the entire view
    window.location.reload();
  };

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        onClick={toggleView}
        variant="outline"
        className="bg-vscode-highlight border border-vscode-border text-white hover:bg-vscode-active"
      >
        {viewMode === 'professional' ? (
          <>
            <Cube size={16} className="mr-2" />
            <span>Switch to Simple View</span>
          </>
        ) : (
          <>
            <Monitor size={16} className="mr-2" />
            <span>Switch to Professional View</span>
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default ViewToggle;
