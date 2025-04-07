
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimpleView from "./components/SimpleView";
import WelcomeModal from "./components/WelcomeModal";
import { ViewModeProvider, useViewMode } from "./contexts/ViewModeContext";
import SimpleLoadingScreen from "./components/SimpleLoadingScreen";

const queryClient = new QueryClient();

const AppContent = () => {
  const { viewMode, hasSelectedView } = useViewMode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always show loading screen for 4 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [viewMode]);

  if (loading) {
    return viewMode === 'professional' ? (
      <Index loadingOnly={true} />
    ) : (
      <SimpleLoadingScreen onComplete={() => setLoading(false)} />
    );
  }

  return (
    <>
      <WelcomeModal />
      
      {viewMode === 'professional' ? <Index /> : <SimpleView />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ViewModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ViewModeProvider>
  </QueryClientProvider>
);

export default App;
