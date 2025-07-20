import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PaymentStatistics } from "@/components/Payment/PaymentStatistics";
import { OrderCard } from "@/components/Payment/OrderCard";
import { ActionButtons } from "@/components/Payment/ActionButtons";
import { CancelDialog } from "@/components/Payment/CancelDialog";
import { ConfirmDialog } from "@/components/Payment/ConfirmDialog";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { Order } from "@/static/mockPayment";

interface PaymentViewProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  onCancelOrder: (id: number) => void;
  onConfirmPayment: (id: number) => void;
}

export function PaymentView({
  orders,
  loading,
  error,
  onRetry,
  onCancelOrder,
  onConfirmPayment,
}: PaymentViewProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUnpaidOrders, setSelectedUnpaidOrders] = useState<number[]>(
    []
  );
  const [selectedPaidOrders, setSelectedPaidOrders] = useState<number[]>([]);
  const [actualPayments, setActualPayments] = useState<Record<number, number>>(
    {}
  );

  // Calculate statistics
  const statistics = useMemo(() => {
    const unpaidOrders = orders.filter((order) => !order.isPaid);
    const totalUnpaidAmount = unpaidOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const selectedUnpaidAmount = selectedUnpaidOrders.reduce((sum, orderId) => {
      const order = orders.find((o) => o.id === orderId);
      return sum + (order ? order.totalAmount : 0);
    }, 0);

    return {
      totalUnpaidOrders: unpaidOrders.length,
      totalUnpaidAmount,
      selectedUnpaidAmount,
    };
  }, [orders, selectedUnpaidOrders]);

  // Handle order selection
  const handleOrderSelect = (orderId: number, isPaid: boolean) => {
    if (isPaid) {
      setSelectedPaidOrders((prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId)
          : [...prev, orderId]
      );
    } else {
      setSelectedUnpaidOrders((prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId)
          : [...prev, orderId]
      );
    }
  };

  // Handle actual payment change
  const handleActualPaymentChange = (orderId: number, value: number) => {
    setActualPayments((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  // Handle confirm cancel
  const handleConfirmCancel = () => {
    // Process all selected paid orders
    selectedPaidOrders.forEach((id) => {
      onCancelOrder(id);
    });
    setShowCancelDialog(false);
  };

  // Handle confirm payment
  const handleConfirmPaymentAction = () => {
    // Process all selected unpaid orders
    selectedUnpaidOrders.forEach((id) => {
      onConfirmPayment(id);
    });
    setShowConfirmDialog(false);
  };

  if (loading) {
    return <LoadingSkeleton loading={loading} pageName="Thanh toán" />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  return (
    <div className="pb-24">
      {/* Statistics Section */}
      <PaymentStatistics
        totalUnpaidAmount={statistics.totalUnpaidAmount}
        totalUnpaidOrders={statistics.totalUnpaidOrders}
        selectedUnpaidAmount={statistics.selectedUnpaidAmount}
      />

      {/* Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 px-4"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Danh sách đơn hàng ({orders.length})
        </h2>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <p className="text-gray-500">
                Không có đơn hàng nào cần thanh toán
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isSelected={
                  order.isPaid
                    ? selectedPaidOrders.includes(order.id)
                    : selectedUnpaidOrders.includes(order.id)
                }
                onOrderSelect={() => handleOrderSelect(order.id, order.isPaid)}
                actualPayment={actualPayments[order.id]}
                onActualPaymentChange={(value) =>
                  handleActualPaymentChange(order.id, value || 0)
                }
              />
            ))
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <ActionButtons
        selectedUnpaidOrders={selectedUnpaidOrders}
        selectedPaidOrders={selectedPaidOrders}
        onCollectPayment={() => setShowConfirmDialog(true)}
        onCancelPayment={() => setShowCancelDialog(true)}
      />

      {/* Cancel Dialog */}
      <CancelDialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleConfirmCancel}
        count={selectedPaidOrders.length}
        total={selectedPaidOrders.reduce((sum, id) => {
          const order = orders.find((o) => o.id === id);
          return sum + (order?.totalAmount || 0);
        }, 0)}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmPaymentAction}
        count={selectedUnpaidOrders.length}
        total={selectedUnpaidOrders.reduce((sum, id) => {
          const order = orders.find((o) => o.id === id);
          return sum + (order?.totalAmount || 0);
        }, 0)}
      />
    </div>
  );
}
