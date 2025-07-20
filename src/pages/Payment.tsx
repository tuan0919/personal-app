import { PaymentLayout } from "@/components/Payment/PaymentLayout";
import { PaymentView } from "@/components/Payment/PaymentView";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { usePaymentState } from "@/hooks/usePaymentState";
import { AnimatePresence } from "framer-motion";

export const Payment: React.FC = () => {
  // Sử dụng custom hook để quản lý state
  const paymentState = usePaymentState();

  // Define handlers that match our PaymentView component props
  const handleCancelOrder = (id: number) => {
    // Mark the order as unpaid
    console.log("Cancelling payment for order:", id);
    // In a real app, we would call an API here
  };

  const handleConfirmPayment = (id: number) => {
    // Mark the order as paid
    console.log("Confirming payment for order:", id);
    // In a real app, we would call an API here
  };

  return (
    <PaymentLayout>
      <AnimatePresence mode="wait">
        {paymentState.loading ? (
          <LoadingSkeleton
            key="loading"
            onComplete={() => {}}
            loading={paymentState.loading}
            pageName="Thu tiền đơn hàng"
          />
        ) : paymentState.error ? (
          <ErrorState
            key="error"
            error={paymentState.error}
            onRetry={paymentState.refetchData}
          />
        ) : (
          <PaymentView
            key="content"
            loading={false}
            error={null}
            orders={paymentState.orders}
            onRetry={paymentState.refetchData}
            onCancelOrder={handleCancelOrder}
            onConfirmPayment={handleConfirmPayment}
          />
        )}
      </AnimatePresence>
    </PaymentLayout>
  );
};
