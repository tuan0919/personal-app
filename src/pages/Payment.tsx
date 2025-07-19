import { PaymentLayout } from "@/components/Payment/PaymentLayout";
import { PaymentView } from "@/components/Payment/PaymentView";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { usePaymentState } from "@/hooks/usePaymentState";
import { AnimatePresence } from "framer-motion";

export const Payment: React.FC = () => {
  // Sử dụng custom hook để quản lý state
  const paymentState = usePaymentState();

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
            loading={paymentState.loading}
            error={paymentState.error}
            orders={paymentState.orders}
            currentPage={paymentState.currentPage}
            setCurrentPage={paymentState.setCurrentPage}
            selectedUnpaidOrders={paymentState.selectedUnpaidOrders}
            selectedPaidOrders={paymentState.selectedPaidOrders}
            actualPayments={paymentState.actualPayments}
            handleActualPaymentChange={paymentState.handleActualPaymentChange}
            handleOrderSelect={paymentState.handleOrderSelect}
            selectedDate={paymentState.selectedDate}
            setSelectedDate={paymentState.setSelectedDate}
          />
        )}
      </AnimatePresence>
    </PaymentLayout>
  );
};
