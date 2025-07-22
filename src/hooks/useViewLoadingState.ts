import { useState, useEffect } from "react";

/**
 * Shared hook for managing loading state in view components
 * Provides consistent loading behavior across UserView and AdminView
 */
export function useViewLoadingState(loading: boolean) {
  const [showLoading, setShowLoading] = useState(loading);
  const [hasCompletedLoading, setHasCompletedLoading] = useState(false);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setHasCompletedLoading(true);
  };

  // Track loading start time and show loading
  useEffect(() => {
    if (loading && !hasCompletedLoading) {
      setShowLoading(true);
    }
  }, [loading, hasCompletedLoading]);

  return {
    showLoading,
    handleLoadingComplete,
  };
}
