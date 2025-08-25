import { motion, AnimatePresence } from "framer-motion";
import { FaTruckFast } from "react-icons/fa6";
import { FiFilter, FiLoader } from "react-icons/fi";
import { CalendarChooser } from "@/components/shared/CalendarChooser";
import { Pagination } from "@/components/shared/Pagination";
import {
  fadeVariants,
  sectionVariants,
  containerVariants,
  pageTransition,
} from "@/components/shared/animations";
import { useOrderManagement } from "@/hooks/useOrderManagement";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { useState, useEffect } from "react";
import { Order } from "@/types/api/admin/order-management-page-types";
import { FilterSheet, OrderCard } from ".";

export function OrderSection() {
  const { state, actions, computed } = useOrderManagement();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // Only show the main skeleton on the very first load.
    // After that, the overlay will be used.
    if (!state.isLoading) {
      const timer = setTimeout(() => setShowSkeleton(false), 500); // Wait for skeleton to finish animation
      return () => clearTimeout(timer);
    }
  }, [state.isLoading]);

  // Handle animation complete for popup
  const handleAnimationComplete = () => {
    if (!state.showActionPopup) {
      actions.setSelectedRecord(null);
    }
  };

  // Handle shipper details, customer details, edit order...
  const handleShipperDetails = (id: number) => {
    console.log("Xem chi tiết người giao:", id);
    actions.setShowActionPopup(false);
  };

  const handleCustomerDetails = (id: number) => {
    console.log("Xem chi tiết khách hàng:", id);
    actions.setShowActionPopup(false);
  };

  const handleEdit = (id: number) => {
    console.log("Chỉnh sửa đơn hàng:", id);
    actions.setShowActionPopup(false);
  };

  if (showSkeleton) {
    return (
      <LoadingSkeleton
        loading={state.isLoading}
        pageName="Quản lý đơn giao đá"
      />
    );
  }

  if (state.error) {
    return (
      <section className="p-4">
        <ErrorState error={state.error} onRetry={actions.resetState} />
      </section>
    );
  }

  return (
    <>
      {/* Header Section */}
      <motion.section
        className="px-2 sm:px-4 mb-4"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <div className="flex flex-wrap items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-700 text-sm sm:text-base mb-3">
            Quản lý đơn giao đá ({state.filteredOrders.length})
          </h2>
          <div className="flex items-center gap-2">
            <div className="z-20">
              <CalendarChooser
                date={state.selectedDate}
                onChange={actions.handleDateChange}
              />
            </div>
            <button
              onClick={() => actions.setShowFilterSheet(true)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-100 transition-shadow"
            >
              <FiFilter className="text-blue-500" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Orders List Section */}
      <motion.section
        className="px-2 sm:px-4 mb-4"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        <motion.div
          className="bg-white/70 p-3 rounded-2xl shadow-inner min-h-[120px] relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Loading Overlay */}
          <AnimatePresence>
            {state.isLoading && !showSkeleton && (
              <motion.div
                className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <FiLoader className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                <p className="text-gray-600 text-sm">
                  Đang cập nhật dữ liệu...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`page-${state.currentPage}`}
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {computed.paged.length === 0 ? (
                <div className="text-center py-8">
                  <FaTruckFast className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">Không có đơn hàng nào.</p>
                </div>
              ) : (
                computed.paged.map((order: Order) => (
                  <OrderCard
                    key={order.customer.id}
                    order={order}
                    isSelected={state.selectedRecord === order.customer.id}
                    onSelect={(id) => actions.setSelectedRecord(id)}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {computed.totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={state.currentPage}
                totalPages={computed.totalPages}
                onChange={actions.setCurrentPage}
              />
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* Action Popup */}
      <AnimatePresence>
        {state.showActionPopup && computed.selectedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onAnimationComplete={handleAnimationComplete}
            className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg p-4 rounded-t-3xl shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-40"
          >
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">
                  Đơn hàng: {computed.selectedOrder.customer.name}
                </h3>
                <button
                  onClick={() => actions.setShowActionPopup(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() =>
                    handleEdit(computed.selectedOrder!.customer.id)
                  }
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 font-medium"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
                    />
                  </svg>
                  <span>Chỉnh sửa đơn hàng</span>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => actions.setShowDeleteConfirm(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-200 font-medium"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>Xóa đơn hàng</span>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() =>
                    handleShipperDetails(computed.selectedOrder!.shipper.id)
                  }
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 font-medium"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Chi tiết người giao (quản trị viên)</span>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() =>
                    handleCustomerDetails(computed.selectedOrder!.customer.id)
                  }
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 font-medium"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 0 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                    />
                  </svg>
                  <span>Chi tiết khách hàng (quản trị viên)</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {state.showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed drop-shadow-2xl inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Xác nhận xóa đơn hàng
              </h3>
              <p className="text-gray-600 mb-4">
                Bạn có chắc muốn xóa đơn hàng của{" "}
                <strong>{computed.selectedOrder?.customer.name}</strong>?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => actions.setShowDeleteConfirm(false)}
                  className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={actions.confirmDelete}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Filter Sheet */}
      <FilterSheet
        open={state.showFilterSheet}
        onClose={() => actions.setShowFilterSheet(false)}
        onApply={actions.handleApplyFilter}
        initial={state.filters}
      />
    </>
  );
}
