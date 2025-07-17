import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import BottomNav from "@/components/BottomNav";
import PaymentNavbar from "@/components/Payment/PaymentNavbar";
import { mockOrders } from "@/static/mockPayment";
import { containerVariants } from "@/components/Payment/animations";
import { PaymentStatistics } from "@/components/Payment/PaymentStatistics";
import { OrderCard } from "@/components/Payment/OrderCard";
import { Pagination } from "@/components/Payment/Pagination";
import { ActionButtons } from "@/components/Payment/ActionButtons";
import { ConfirmDialog } from "@/components/Payment/ConfirmDialog";
import { CancelDialog } from "@/components/Payment/CancelDialog";

export const Payment: React.FC = () => {
  const [selectedUnpaidOrders, setSelectedUnpaidOrders] = useState<number[]>(
    []
  );
  const [selectedPaidOrders, setSelectedPaidOrders] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const ordersPerPage = 4;

  // Tính toán thống kê
  const statistics = useMemo(() => {
    const unpaidOrders = mockOrders.filter((order) => !order.isPaid);
    const totalUnpaidAmount = unpaidOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const selectedUnpaidAmount = selectedUnpaidOrders.reduce((sum, orderId) => {
      const order = mockOrders.find((o) => o.id === orderId);
      return sum + (order ? order.totalAmount : 0);
    }, 0);
    const selectedPaidAmount = selectedPaidOrders.reduce((sum, orderId) => {
      const order = mockOrders.find((o) => o.id === orderId);
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
  }, [selectedUnpaidOrders, selectedPaidOrders]);

  // Phân trang
  const totalPages = Math.ceil(mockOrders.length / ordersPerPage);
  const currentOrders = mockOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleOrderSelect = (orderId: number, isPaid: boolean) => {
    if (isPaid) {
      // Handle paid orders
      setSelectedPaidOrders((prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId)
          : [...prev, orderId]
      );
    } else {
      // Handle unpaid orders
      setSelectedUnpaidOrders((prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId)
          : [...prev, orderId]
      );
    }
  };

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
    setSelectedUnpaidOrders([]);
    setShowConfirmDialog(false);
  };

  const confirmCancelPayment = () => {
    console.log("Hủy xác nhận thanh toán cho các đơn:", selectedPaidOrders);
    setSelectedPaidOrders([]);
    setShowCancelDialog(false);
  };

  return (
    <div className="min-h-screen bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <PaymentNavbar />
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
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
          totalUnpaidAmount={statistics.selectedUnpaidAmount}
          totalUnpaidOrders={statistics.totalUnpaidOrders}
        />

        {/* Orders Section - Wrapped in unified container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-pink-100 mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FiPackage className="mr-2 text-pink-600" />
            Danh sách đơn hàng
          </h2>

          {/* Orders List with improved animation */}
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4 mb-6"
          >
            <AnimatePresence>
              {currentOrders.map((order, index) => (
                <OrderCard
                  key={index}
                  order={order}
                  selectedPaidOrders={selectedPaidOrders}
                  selectedUnpaidOrders={selectedUnpaidOrders}
                  onSelect={() => handleOrderSelect(order.id, order.isPaid)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination - Inside the section */}
          <Pagination
            currentPage={currentPage}
            onChange={(p) => handlePageChange(p)}
            totalPages={totalPages}
          />
        </motion.div>

        {/* Action Buttons */}
        <ActionButtons
          onHandleCollectPayment={handleCollectPayment}
          onhandleCancelPayment={handleCancelPayment}
          selectedPaidOrders={selectedPaidOrders}
          selectedUnpaidOrders={selectedUnpaidOrders}
        />
        <ConfirmDialog
          open={showConfirmDialog}
          count={selectedUnpaidOrders.length}
          total={statistics.selectedUnpaidAmount}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={confirmPayment}
        />

        <CancelDialog
          open={showCancelDialog}
          count={selectedPaidOrders.length}
          total={statistics.selectedPaidAmount}
          onClose={() => setShowCancelDialog(false)}
          onConfirm={confirmCancelPayment}
        />
      </div>
      <div className="h-20"></div>
      <BottomNav />
    </div>
  );
};
