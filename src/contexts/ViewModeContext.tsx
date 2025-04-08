
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type ViewMode = 'simple' | 'professional';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  hasSelectedView: boolean;
  setHasSelectedView: (value: boolean) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('professional');
  const [hasSelectedView, setHasSelectedView] = useState<boolean>(false);

  useEffect(() => {
    // Check if viewMode cookie exists
    const savedMode = Cookies.get('viewMode') as ViewMode | undefined;
    const viewSelected = Cookies.get('viewSelected');
    
    if (savedMode) {
      setViewModeState(savedMode);
    }
    
    // If viewSelected cookie exists, user has chosen a view before
    if (viewSelected === 'true') {
      setHasSelectedView(true);
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    Cookies.set('viewMode', mode, { expires: 365 });
    Cookies.set('viewSelected', 'true', { expires: 365 });
    setHasSelectedView(true);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, hasSelectedView, setHasSelectedView }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = (): ViewModeContextType => {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};
