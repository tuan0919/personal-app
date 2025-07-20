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

export function AdminOrdersView() {
  const { state, actions, computed } = useAdminState();

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

      {/* Filter Sheet */}
      <AdminFilterSheet
        open={state.showFilterSheet}
        onClose={() => actions.setShowFilterSheet(false)}
        onApply={actions.handleApplyFilter}
        initial={state.filters}
      />

      {/* Action Popup */}
      <AnimatePresence onExitComplete={handleAnimationComplete}>
        {state.showActionPopup && state.selectedRecord !== null && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => actions.setShowActionPopup(false)}
          >
            <motion.div
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-4 sm:p-6 m-2"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tùy chọn cho đơn hàng
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    state.selectedRecord &&
                    handleShipperDetails(state.selectedRecord)
                  }
                  className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <FaUserCircle />
                  <span>Xem chi tiết người giao</span>
                </button>
                <button
                  onClick={() =>
                    state.selectedRecord &&
                    handleCustomerDetails(state.selectedRecord)
                  }
                  className="w-full py-3 px-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <FaUserCircle />
                  <span>Xem chi tiết khách hàng</span>
                </button>
                <button
                  onClick={() =>
                    state.selectedRecord && handleEdit(state.selectedRecord)
                  }
                  className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <FiFilter />
                  <span>Chỉnh sửa đơn hàng</span>
                </button>
                <button
                  onClick={() => actions.setShowActionPopup(false)}
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors mt-2"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
