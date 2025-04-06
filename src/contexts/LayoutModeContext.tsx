
import React, { createContext, useContext, useState, useEffect } from 'react';

type LayoutMode = 'ide' | 'website';

interface LayoutModeContextType {
  mode: LayoutMode;
  toggleMode: () => void;
}

const LayoutModeContext = createContext<LayoutModeContextType | undefined>(undefined);

export const LayoutModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<LayoutMode>('website');

  // Load saved preference on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('layoutMode') as LayoutMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Save preference when it changes
  useEffect(() => {
    localStorage.setItem('layoutMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'ide' ? 'website' : 'ide');
  };

  return (
    <LayoutModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </LayoutModeContext.Provider>
  );
};

export const useLayoutMode = (): LayoutModeContextType => {
  const context = useContext(LayoutModeContext);
  if (context === undefined) {
    throw new Error('useLayoutMode must be used within a LayoutModeProvider');
  }
  return context;
};
