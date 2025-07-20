import { motion, AnimatePresence } from "framer-motion";
import { FaTruckFast, FaCube, FaIceCream } from "react-icons/fa6";
import { FiFilter, FiLoader } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { CalendarChooser } from "@/components/shared/CalendarChooser";
import { Pagination } from "@/components/shared/Pagination";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { AdminFilterSheet } from "./AdminFilterSheet";
import {
  fadeVariants,
  sectionVariants,
  containerVariants,
  pageTransition,
  itemVariants,
} from "@/components/shared/animations";
import { useAdminState } from "@/hooks/useAdminState";
import { useAdminAnimations } from "@/hooks/useAdminAnimations";

export function AdminOrdersView() {
  const { state, actions, computed } = useAdminState();
  const { controls, variants } = useAdminAnimations();

  // Handle animation complete for popup
  const handleAnimationComplete = () => {
    if (!state.showActionPopup) {
      actions.setSelectedRecord(null);
    }
  };

  // Handle shipper details
  const handleShipperDetails = (id: number) => {
    console.log("Xem chi tiết người giao:", id);
    actions.setShowActionPopup(false);
  };

  // Handle customer details
  const handleCustomerDetails = (id: number) => {
    console.log("Xem chi tiết khách hàng:", id);
    actions.setShowActionPopup(false);
  };

  // Handle edit order
  const handleEdit = (id: number) => {
    console.log("Chỉnh sửa đơn hàng:", id);
    actions.setShowActionPopup(false);
  };

  // Show loading skeleton if initial loading
  if (state.isLoading && computed.paged.length === 0) {
    return (
      <LoadingSkeleton
        loading={state.isLoading}
        pageName="Quản lý đơn giao đá"
        onComplete={() => actions.setLoading(false)}
      />
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
          <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
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
            {state.isLoading && (
              <motion.div
                className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="text-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FiLoader className="w-8 h-8" />
                </motion.div>
                <p className="text-gray-600 mt-2 text-sm">
                  Đang tải dữ liệu...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          {state.error && (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-red-500 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">{state.error}</p>
              <button
                onClick={actions.resetState}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Thử lại
              </button>
            </motion.div>
          )}

          {/* Orders List */}
          {!state.error && (
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`page-${state.currentPage}-filter-${JSON.stringify(
                  state.filters
                )}`}
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2"
              >
                {computed.paged.length === 0 ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FaTruckFast className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">
                      {state.orders.length === 0
                        ? "Không có đơn giao nào trong ngày này."
                        : "Không tìm thấy đơn hàng phù hợp với bộ lọc."}
                    </p>
                  </motion.div>
                ) : (
                  computed.paged.map((order, index) => (
                    <motion.div
                      key={order.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer select-none transition-all duration-200",
                        state.selectedRecord === order.id
                          ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 shadow-md"
                          : "bg-white/60 border-gray-200 hover:bg-white/80 hover:shadow-sm"
                      )}
                      onClick={() => actions.handleOrderSelect(order.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FaTruckFast className="text-blue-500 text-lg" />
                          <div>
                            <p className="font-semibold text-gray-800 text-sm truncate">
                              {order.customer}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <FaUserCircle className="text-blue-400 text-xs" />
                              <span className="font-medium">
                                Người giao:
                              </span>{" "}
                              {order.shipper}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 text-right">
                          <span className="flex items-center gap-1 justify-end">
                            <FaIceCream className="text-pink-400" />{" "}
                            {order.daCay}
                            <FaCube className="text-sky-400 ml-1" />{" "}
                            {order.daBi}
                          </span>
                          <div className="font-medium text-green-600">
                            {order.revenue.toLocaleString("vi-VN")} ₫
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {!state.error && computed.totalPages > 1 && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Pagination
                currentPage={state.currentPage}
                totalPages={computed.totalPages}
                onChange={actions.setCurrentPage}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Action Popup */}
      <AnimatePresence onExitComplete={handleAnimationComplete}>
        {state.showActionPopup && computed.selectedOrder && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={actions.handleClosePopup}
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-40 left-4 right-4 z-50"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-auto border border-gray-100">
                {/* Header */}
                <motion.div
                  className="flex items-center justify-between mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {computed.selectedOrder.customer}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Người giao: {computed.selectedOrder.shipper}
                    </p>
                  </div>
                  <button
                    onClick={actions.handleClosePopup}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => handleEdit(computed.selectedOrder!.id)}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 rounded-xl hover:from-amber-100 hover:to-amber-200 transition-all duration-200 font-medium"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Chỉnh sửa đơn (quản trị viên)</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() =>
                      actions.handleDeleteClick(computed.selectedOrder!.id)
                    }
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
                    <span>Xóa đơn (quản trị viên)</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() =>
                      handleShipperDetails(computed.selectedOrder!.id)
                    }
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 font-medium"
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
                      handleCustomerDetails(computed.selectedOrder!.id)
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Chi tiết khách hàng (quản trị viên)</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
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
                <strong>{computed.selectedOrder?.customer}</strong>?
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
      <AdminFilterSheet
        open={state.showFilterSheet}
        onClose={() => actions.setShowFilterSheet(false)}
        onApply={actions.handleApplyFilter}
        initial={state.filters}
      />
    </>
  );
}
