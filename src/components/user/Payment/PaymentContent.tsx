// PaymentContent.tsx - Main content component that uses PaymentContext
import { PaymentLayout } from "@/components/Payment/PaymentLayout";
import { PaymentView } from "@/components/Payment/PaymentView";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { usePaymentContext } from "@/contexts/PaymentContext";
import { AnimatePresence } from "framer-motion";

export function PaymentContent() {
  const { loading, error, refetchData } = usePaymentContext();

  return (
    <PaymentLayout>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingSkeleton
            key="loading"
            onComplete={() => {}}
            loading={loading}
            pageName="Thu tiền đơn hàng"
          />
        ) : error ? (
          <ErrorState
            key="error"
            error={error}
            onRetry={refetchData}
          />
        ) : (
          <PaymentView key="content" />
        )}
      </AnimatePresence>
    </PaymentLayout>
  );
}
