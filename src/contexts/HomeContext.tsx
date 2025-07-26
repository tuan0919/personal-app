import React, { createContext, useContext, ReactNode } from "react";
import { useHomeState } from "@/hooks/useHomeState";
import { useHomeAnimations } from "@/animations/useHomeAnimations";
import { usePWASuggestion } from "@/hooks/usePWASuggestion";
import { FramerControls } from "@/components/Home/types";

// Context types for Admin view only
interface HomeContextType {
  // Admin state (from useHomeState)
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  
  // Animation refs and controls
  refs: {
    dailyStatsRef: React.RefObject<HTMLDivElement | null>;
    ordersRef: React.RefObject<HTMLDivElement | null>;
    chartRef: React.RefObject<HTMLDivElement | null>;
    weeklyStatsRef: React.RefObject<HTMLDivElement | null>;
  };
  controls: {
    dailyStatsCtrl: FramerControls;
    ordersCtrl: FramerControls;
    chartCtrl: FramerControls;
    weeklyStatsCtrl: FramerControls;
  };
  // PWA suggestion
  showPWAPrompt: boolean;
  handleInstallPWA: () => void;
  handleClosePWAPrompt: () => void;
}

// Create context
const HomeContext = createContext<HomeContextType | undefined>(undefined);

// Provider props
interface HomeProviderProps {
  children: ReactNode;
  initialIsAdmin?: boolean;
}

// Provider component
export function HomeProvider({
  children,
  initialIsAdmin = false,
}: HomeProviderProps) {
  // Use admin state hook for admin-specific state
  const { isAdmin, setIsAdmin } = useHomeState({ initialIsAdmin });
  
  // Use animation hooks
  const { refs, controls } = useHomeAnimations();
  
  // Use PWA suggestion hook
  const { showPWAPrompt, handleInstallPWA, handleClosePWAPrompt } =
    usePWASuggestion();

  // Combine all values for admin context
  const contextValue: HomeContextType = {
    // Admin state
    isAdmin,
    setIsAdmin,
    
    // Animation refs and controls
    refs,
    controls,
    
    // PWA suggestion
    showPWAPrompt,
    handleInstallPWA,
    handleClosePWAPrompt,
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
}

// Custom hook to use the context
export function useHomeContext() {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
}

// Export types for use in components
export type { HomeContextType };
