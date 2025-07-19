import { Customer } from "@/api";
import { GetOrderPaymentButton } from "@/components/Home/user/GetOrderPaymentButton";
import { ActivityHistoryButton } from "@/components/Home/user/ActivityHistoryButton";
import { DeliveredCustomers } from "@/components/Home/user/DeliveredCustomers";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { ContentWrapper } from "./ContentWrapper";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface UserViewProps {
  deliveredCustomers: Customer[];
  loading: boolean;
  error: string | null;
  onDeleteCustomer: (customerId: number) => Promise<void>;
  onUpdateCustomer: (
    customerId: number,
    updates: Partial<Customer>
  ) => Promise<void>;
  onRetry?: () => void;
  onFilterClick?: () => void;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function UserView({
  deliveredCustomers,
  loading,
  error,
  onDeleteCustomer,
  onUpdateCustomer,
  onRetry,
  onFilterClick,
  selectedDate,
  onDateChange,
}: UserViewProps) {
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

  return (
    <AnimatePresence mode="wait">
      {showLoading ? (
        <LoadingSkeleton
          key="loading"
          onComplete={handleLoadingComplete}
          loading={loading}
          pageName="Trang chủ"
        />
      ) : error ? (
        <ErrorState key="error" error={error} onRetry={onRetry} />
      ) : (
        <ContentWrapper key="content">
          <GetOrderPaymentButton />
          <ActivityHistoryButton />
          <DeliveredCustomers
            onDeleteCustomer={onDeleteCustomer}
            onUpdateCustomer={onUpdateCustomer}
            delivered={deliveredCustomers}
            onFilterClick={onFilterClick}
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            loading={loading}
          />
        </ContentWrapper>
      )}
    </AnimatePresence>
  );
}
