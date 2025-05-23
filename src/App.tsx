
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimpleView from "./components/SimpleView";
import WelcomeModal from "./components/WelcomeModal";
import { ViewModeProvider, useViewMode } from "./contexts/ViewModeContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { viewMode, hasSelectedView } = useViewMode();

  // Only show the welcome modal if the user hasn't selected a view yet
  // (checked via cookies in the context provider)
  if (!hasSelectedView) {
    return <WelcomeModal />;
  }

  // Go directly to the appropriate view based on user preference
  return viewMode === 'professional' ? <Index /> : <SimpleView />;
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
