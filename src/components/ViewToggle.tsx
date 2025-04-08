
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Box } from 'lucide-react';
import { useViewMode } from '@/contexts/ViewModeContext';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const ViewToggle: React.FC = () => {
  const { viewMode, setViewMode } = useViewMode();
  const isMobile = useIsMobile();

  const toggleView = () => {
    const newMode = viewMode === 'professional' ? 'simple' : 'professional';
    setViewMode(newMode);
    
    // Force a hard navigation without reload to prevent the welcome modal
    window.location.replace('/');
  };

  return (
    <Button
      onClick={toggleView}
      variant="outline"
      size={isMobile ? "sm" : "default"}
      className={
        viewMode === 'professional' 
          ? "bg-vscode-highlight border border-vscode-border text-white hover:bg-vscode-active transition-colors"
          : "bg-purple-600/20 border border-purple-400/30 text-white hover:bg-purple-600/30 transition-colors"
      }
    >
      {viewMode === 'professional' ? (
        <>
          <Box size={16} className="mr-1" />
          <span className={isMobile ? "hidden" : "inline"}>Simple View</span>
        </>
      ) : (
        <>
          <Monitor size={16} className="mr-1" />
          <span className={isMobile ? "hidden" : "inline"}>Pro View</span>
        </>
      )}
    </Button>
  );
};

export default ViewToggle;
