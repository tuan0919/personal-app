import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentStatistics } from "./PaymentStatistics";
import { OrderCard } from "./OrderCard";
import { DailyRevenue } from "./DailyRevenue";
import { Pagination } from "@/components/shared/Pagination";
import { ActionButtons } from "./ActionButtons";
import { ConfirmDialog } from "./ConfirmDialog";
import { CancelDialog } from "./CancelDialog";
import { CalendarChooser } from "@/components/shared/CalendarChooser";
import { usePaymentContext } from "@/contexts";

export function View() {
  // Get all payment state from context
  const {
    state: {
      loading,
      filtering,
      error,
      orders,
      currentPage,
      selectedUnpaidOrders,
      selectedPaidOrders,
      actualPayments,
      selectedDate,
    },
    actions: {
      setCurrentPage,
      setSelectedDate,
      handleActualPaymentChange,
      handleOrderSelect
    },
    selectors: {
      totalPages,
      currentOrders
    }
  } = usePaymentContext();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Chuẩn bị dữ liệu chi tiết cho ConfirmDialog
  const orderDetails = selectedUnpaidOrders
    .map((orderId) => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return null;
      const actual = actualPayments[orderId] ?? order.totalAmount;
      const provisional = order.totalAmount;
      const diffPercent =
        Math.round(((actual - provisional) / provisional) * 10000) / 100;
      return {
        id: order.id,
        customerName: order.customerName,
        actual,
        provisional,
        diffPercent,
      };
    })
    .filter(Boolean) as {
    id: number;
    customerName: string;
    actual: number;
    provisional: number;
    diffPercent: number;
  }[];

  // Chuẩn bị dữ liệu chi tiết cho CancelDialog
  const cancelOrderDetails = selectedPaidOrders
    .map((orderId) => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return null;
      const actual = order.totalAmount;
      const diffPercent = 0;
      return {
        id: order.id,
        customerName: order.customerName,
        actual,
        diffPercent,
      };
    })
    .filter(Boolean) as {
    id: number;
    customerName: string;
    actual: number;
    diffPercent: number;
  }[];
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCollectPayment = () => {
    setShowConfirmDialog(true);
  };

  const handleCancelPayment = () => {
    setShowCancelDialog(true);
  };

  const confirmPayment = () => {
    console.log("Xác nhận thanh toán cho các đơn:", selectedUnpaidOrders);
    setShowConfirmDialog(false);
  };

  const confirmCancelPayment = () => {
    console.log("Hủy xác nhận thanh toán cho các đơn:", selectedPaidOrders);
    setShowCancelDialog(false);
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <div key="loading">Loading...</div>
      ) : error ? (
        <div key="error">Error: {error}</div>
      ) : (
        <div key="content">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Quản lý hóa đơn
            </h1>
            <p className="text-gray-600">Quản lý các hóa đơn đã giao</p>
          </motion.div>
          <h2 className="text-xl mb-4 underline underline-offset-4 font-semibold text-gray-800 flex items-center">
            Số tiền thu trong ngày
          </h2>
          <DailyRevenue className="mb-6" />

          <h2 className="text-xl mb-4 underline underline-offset-4 font-semibold text-gray-800 flex items-center">
            Danh sách đơn hàng
          </h2>
          {/* Statistics Cards - Compact Grid Layout */}
          <PaymentStatistics/>
          <div className="justify-between mb-6 flex items-center">
            <h2 className="font-semibold flex items-center gap-2 text-gray-800">
              Ngày giao hàng:
            </h2>
            <CalendarChooser date={selectedDate} onChange={setSelectedDate} />
          </div>
          {/* Orders Section - Wrapped in unified container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5"
          >
            {currentOrders.length > 0 ? (
              <>
                <div className={`space-y-4 ${filtering ? "opacity-50" : ""}`}>
                  {currentOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isSelected={
                        order.isPaid
                          ? selectedPaidOrders.includes(order.id)
                          : selectedUnpaidOrders.includes(order.id)
                      }
                      onOrderSelect={() =>
                        handleOrderSelect(order.id, order.isPaid)
                      }
                      actualPayment={actualPayments[order.id]}
                      onActualPaymentChange={(value) => {
                        // Nếu value là undefined, truyền 0 thay thế
                        handleActualPaymentChange(order.id, value ?? 0);
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                    variant="modern"
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Không có đơn hàng nào cho ngày đã chọn
                </p>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <ActionButtons
            selectedUnpaidOrders={selectedUnpaidOrders}
            selectedPaidOrders={selectedPaidOrders}
            onCollectPayment={handleCollectPayment}
            onCancelPayment={handleCancelPayment}
            disabled={filtering}
          />

          {/* Confirm Dialogs */}
          <ConfirmDialog
            open={showConfirmDialog}
            count={selectedUnpaidOrders.length}
            total={0}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={confirmPayment}
            orderDetails={orderDetails}
          />

          <CancelDialog
            open={showCancelDialog}
            count={selectedPaidOrders.length}
            total={0}
            onClose={() => setShowCancelDialog(false)}
            onConfirm={confirmCancelPayment}
            orderDetails={cancelOrderDetails}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
