import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { ContentWrapper } from "./ContentWrapper";

interface ViewStateWrapperProps {
  showLoading: boolean;
  loading: boolean;
  error: string | null;
  onLoadingComplete: () => void;
  onRetry?: () => void;
  pageName: string;
  children: ReactNode;
}

/**
 * Shared wrapper component for handling loading, error, and content states
 * Used by both UserView and AdminView for consistent state management
 */
export function ViewStateWrapper({
  showLoading,
  loading,
  error,
  onLoadingComplete,
  onRetry,
  pageName,
  children,
}: ViewStateWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      {showLoading ? (
        <LoadingSkeleton
          key="loading"
          onComplete={onLoadingComplete}
          loading={loading}
          pageName={pageName}
        />
      ) : error ? (
        <ErrorState key="error" error={error} onRetry={onRetry} />
      ) : (
        <ContentWrapper key="content">{children}</ContentWrapper>
      )}
    </AnimatePresence>
  );
}
