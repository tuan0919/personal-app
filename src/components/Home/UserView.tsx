import { Customer } from "@/api";
import { GetOrderPaymentButton } from "@/components/Home/user/GetOrderPaymentButton";
import { ActivityHistoryButton } from "@/components/Home/user/ActivityHistoryButton";
import { AddOrderButton } from "@/components/Home/user/AddOrderButton";
import { DeliveredCustomers } from "@/components/Home/user/DeliveredCustomers";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorState } from "./ErrorState";
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
}

export function UserView({
  deliveredCustomers,
  loading,
  error,
  onDeleteCustomer,
  onUpdateCustomer,
  onRetry,
}: UserViewProps) {
  const [showLoading, setShowLoading] = useState(loading);
  const [hasCompletedLoading, setHasCompletedLoading] = useState(false);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setHasCompletedLoading(true);
  };

  // Only show loading if we haven't completed loading yet
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
          duration={3000} // 3 seconds for better visibility
        />
      ) : error ? (
        <ErrorState key="error" error={error} onRetry={onRetry} />
      ) : (
        <ContentWrapper key="content">
          <GetOrderPaymentButton />
          <ActivityHistoryButton />
          <AddOrderButton />
          <DeliveredCustomers
            onDeleteCustomer={onDeleteCustomer}
            onUpdateCustomer={onUpdateCustomer}
            delivered={deliveredCustomers}
          />
        </ContentWrapper>
      )}
    </AnimatePresence>
  );
}
