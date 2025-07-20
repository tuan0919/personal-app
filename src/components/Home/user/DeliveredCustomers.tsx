// components/Home/user/DeliveredCustomers.tsx (Fixed Animation)
import { motion, AnimatePresence } from "framer-motion";
import { FaTruckFast } from "react-icons/fa6";
import { FiFilter, FiLoader, FiPlus } from "react-icons/fi";
import { Customer } from "@/api/types";
import { SelectableCustomerCard } from "./SelectableCustomerCard";
import { FloatingActionPopup } from "./FloatingActionPopup";
import { Pagination } from "@/components/shared/Pagination";
import {
  fadeVariants,
  sectionVariants,
  containerVariants,
  spinVariants,
} from "@/components/shared/animations";
import { useNavigate } from "react-router-dom";
import { CalendarChooser } from "@/components/shared/CalendarChooser";
import { useDeliveredCustomers } from "@/hooks/useDeliveredCustomers";

interface DeliveredCustomersProps {
  delivered: Customer[];
  onUpdateCustomer?: (
    customerId: number,
    updatedData: Partial<Customer>
  ) => Promise<void>;
  onDeleteCustomer: (customerId: number) => Promise<void>;
  onFilterClick?: () => void;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  loading?: boolean;
}

export function DeliveredCustomers({
  delivered,
  onDeleteCustomer,
  onFilterClick,
  selectedDate = new Date(),
  onDateChange,
  loading = false,
}: DeliveredCustomersProps) {
  const navigate = useNavigate();
  const {
    selectedCustomer,
    showActionPopup,
    showDeleteConfirm,
    isLoading,
    page,
    totalPages,
    currentItems,
    deliveredList,
    setPage,
    handleCustomerSelect,
    handleClosePopup,
    handleAnimationComplete,
    handleView,
    handleEdit,
    handleDelete,
    confirmDelete,
    closeDeleteConfirm,
    setLoadingState,
  } = useDeliveredCustomers({
    delivered,
    onDeleteCustomer,
    loading,
  });

  const handleDateChange = (date: Date) => {
    if (onDateChange) {
      setLoadingState(true); // Set loading state khi chọn ngày mới
      onDateChange(date);
    }
    console.log("Selected date:", date);
  };

  return (
    <>
      {/* Sửa tiêu đề và thêm buttons */}
      <div className="flex flex-wrap items-center justify-between my-3 px-2">
        <h3 className="font-semibold text-base mb-3">
          Danh sách đơn hàng ({deliveredList.length})
        </h3>
        <div className="flex items-center gap-2">
          <div className="z-20">
            <CalendarChooser date={selectedDate} onChange={handleDateChange} />
          </div>
          <button
            onClick={onFilterClick}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-100 transition-shadow"
          >
            <FiFilter className="text-blue-500" />
          </button>
          <button
            onClick={() => navigate("/order/new")}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm hover:shadow-md border border-white/20 transition-shadow"
          >
            <FiPlus className="text-blue-500" />
          </button>
        </div>
      </div>

      {/* GIỮ NGUYÊN SECTION GỐC */}
      <motion.section
        className="px-2 sm:px-4 mb-4"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        {/* GIỮ NGUYÊN CONTENT WRAPPER GỐC */}
        <motion.div
          className="bg-white/70 p-3 rounded-b-2xl shadow-inner min-h-[120px] relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Loading Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-b-2xl z-10 flex flex-col items-center justify-center"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="text-blue-500"
                  variants={spinVariants}
                  animate="animate"
                >
                  <FiLoader className="w-8 h-8" />
                </motion.div>
                <p className="text-gray-600 mt-2 text-sm">
                  Đang tải dữ liệu...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!isLoading && currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FaTruckFast className="text-gray-300 text-4xl mb-2" />
              <p className="text-gray-500">
                Không có đơn hàng nào trong ngày này
              </p>
            </div>
          ) : (
            // Customer Cards
            <div className="space-y-3">
              {currentItems.map((customer) => (
                <SelectableCustomerCard
                  key={customer.customerId}
                  customer={customer}
                  isSelected={
                    selectedCustomer?.customerId === customer.customerId
                  }
                  onSelect={() => handleCustomerSelect(customer)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </div>
          )}

          {/* Action Popup */}
          <AnimatePresence onExitComplete={handleAnimationComplete}>
            {showActionPopup && selectedCustomer && (
              <FloatingActionPopup
                customer={selectedCustomer}
                onClose={handleClosePopup}
                onView={() => handleView(selectedCustomer)}
                onEdit={() => handleEdit(selectedCustomer)}
                onDelete={handleDelete}
              />
            )}
          </AnimatePresence>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl p-6 max-w-xs w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
              >
                <h3 className="text-lg font-bold mb-2">Xác nhận xóa</h3>
                <p className="text-gray-600 mb-4">
                  Bạn có chắc chắn muốn xóa khách hàng này?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 border rounded-lg"
                    onClick={closeDeleteConfirm}
                  >
                    Hủy
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={confirmDelete}
                  >
                    Xóa
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.section>
    </>
  );
}
