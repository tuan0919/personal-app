import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPackage, FiCalendar } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { PaymentStatistics } from "@/components/Payment/PaymentStatistics";
import { OrderCard } from "@/components/Payment/OrderCard";
import { Pagination } from "@/components/shared/Pagination";
import { ActionButtons } from "@/components/Payment/ActionButtons";
import { ConfirmDialog } from "@/components/Payment/ConfirmDialog";
import { CancelDialog } from "@/components/Payment/CancelDialog";
import { CalendarChooser } from "@/components/shared/CalendarChooser";
import { Order } from "@/static/mockPayment";

interface PaymentViewProps {
  loading: boolean;
  filtering: boolean; // Trạng thái đang lọc dữ liệu
  error: string | null;
  orders: Order[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedUnpaidOrders: number[];
  selectedPaidOrders: number[];
  actualPayments: Record<number, number>;
  handleActualPaymentChange: (orderId: number, value: number) => void;
  handleOrderSelect: (orderId: number, isPaid: boolean) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function PaymentView({
  loading,
  filtering,
  error,
  orders,
  currentPage,
  setCurrentPage,
  selectedUnpaidOrders,
  selectedPaidOrders,
  actualPayments,
  handleActualPaymentChange,
  handleOrderSelect,
  selectedDate,
  setSelectedDate,
}: PaymentViewProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const ordersPerPage = 4;

  // Tính toán thống kê
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
    const selectedPaidAmount = selectedPaidOrders.reduce((sum, orderId) => {
      const order = orders.find((o) => o.id === orderId);
      return sum + (order ? order.totalAmount : 0);
    }, 0);

    return {
      totalUnpaidOrders: unpaidOrders.length,
      totalUnpaidAmount,
      selectedUnpaidOrdersCount: selectedUnpaidOrders.length,
      selectedUnpaidAmount,
      selectedPaidOrdersCount: selectedPaidOrders.length,
      selectedPaidAmount,
    };
  }, [orders, selectedUnpaidOrders, selectedPaidOrders]);

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

  // Phân trang
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

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
              Thu Tiền Đơn Hàng
            </h1>
            <p className="text-gray-600">
              Quản lý thanh toán các đơn hàng đã giao
            </p>
          </motion.div>

          {/* Statistics Cards - Compact Grid Layout */}
          <PaymentStatistics
            selectedUnpaidAmount={statistics.selectedUnpaidAmount}
            totalUnpaidAmount={statistics.totalUnpaidAmount}
            totalUnpaidOrders={statistics.totalUnpaidOrders}
          />

          {/* Orders Section - Wrapped in unified container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 rounded-3xl p-6 shadow-lg border border-pink-100 mb-6"
          >
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiPackage className="mr-2 text-pink-600" />
                Danh sách đơn hàng
              </h2>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {filtering && (
                  <div className="flex items-center mr-2 text-pink-500">
                    <FaSpinner className="animate-spin mr-1 h-4 w-4" />
                    <span className="text-xs">Đang lọc...</span>
                  </div>
                )}
                <FiCalendar className="text-pink-500 mr-1 h-4 w-4" />
                <CalendarChooser
                  date={selectedDate}
                  onChange={setSelectedDate}
                />
              </div>
            </div>

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
            total={statistics.selectedUnpaidAmount}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={confirmPayment}
            orderDetails={orderDetails}
          />

          <CancelDialog
            open={showCancelDialog}
            count={selectedPaidOrders.length}
            total={statistics.selectedPaidAmount}
            onClose={() => setShowCancelDialog(false)}
            onConfirm={confirmCancelPayment}
            orderDetails={cancelOrderDetails}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
