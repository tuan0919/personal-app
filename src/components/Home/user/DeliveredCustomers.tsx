// components/Home/user/DeliveredCustomers.tsx (Fixed Animation)
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruckFast } from "react-icons/fa6";
import { Customer } from "@/static/mockCustomers";
import { SelectableCustomerCard } from "./SelectableCustomerCard";
import { FloatingActionPopup } from "./FloatingActionPopup";
import { CustomPagination } from "./CustomPagination";
import {
  sectionVariants,
  containerVariants,
  pageTransition,
} from "./animations";
import { useNavigate } from "react-router-dom";

interface DeliveredCustomersProps {
  delivered: Customer[];
  onUpdateCustomer: (
    customerId: string,
    updatedData: Partial<Customer>
  ) => void;
  onDeleteCustomer: (customerId: string) => void;
}

export function DeliveredCustomers({
  delivered,
  onUpdateCustomer,
  onDeleteCustomer,
}: DeliveredCustomersProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // đảm bảo chỉ xài những đơn đã giao
  const deliveredList = delivered.filter((c) => c.delivered);

  const perPage = 3;
  const totalPages = Math.max(1, Math.ceil(deliveredList.length / perPage));
  const [page, setPage] = useState(1);

  // nếu deliveredList thay đổi mà page vượt quá, reset về 1
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const startIdx = (page - 1) * perPage;
  const currentItems = deliveredList.slice(startIdx, startIdx + perPage);
  const navigate = useNavigate();

  const handleCustomerSelect = (customer: Customer) => {
    if (selectedCustomer?.customerId === customer.customerId) {
      // Deselect: CHỈ tắt popup, không clear selectedCustomer ngay
      setShowActionPopup(false);
      // selectedCustomer sẽ được clear sau khi animation hoàn tất
    } else {
      // Select new customer
      setSelectedCustomer(customer);
      setShowActionPopup(true);
    }
  };

  const handleClosePopup = () => {
    // CHỈ tắt popup, không clear selectedCustomer ngay
    setShowActionPopup(false);
    // selectedCustomer sẽ được clear sau khi animation hoàn tất
  };

  // Callback khi animation exit hoàn tất
  const handleAnimationComplete = () => {
    if (!showActionPopup) {
      // Chỉ clear selectedCustomer sau khi animation exit hoàn tất
      setSelectedCustomer(null);
    }
  };

  const handleView = (customer: Customer) => {
    console.log("View customer:", customer);
    setShowActionPopup(false);
  };

  const handleEdit = (customer: Customer) => {
    setShowActionPopup(false);
    navigate(
      { pathname: `/order/${customer.customerId}/edit` },
      {
        state: customer,
      }
    );
  };

  const handleDelete = (customer: Customer) => {
    setShowDeleteConfirm(true);
    setShowActionPopup(false);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      onDeleteCustomer(selectedCustomer.customerId + "");
      setSelectedCustomer(null);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      {/* GIỮ NGUYÊN TITLE GỐC */}
      <h3 className="font-semibold text-base my-3">
        Khách đã giao hôm nay ({deliveredList.length}):
      </h3>

      {/* GIỮ NGUYÊN SECTION GỐC */}
      <motion.section
        className="px-2 sm:px-4 mb-4"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
      >
        {/* GIỮ NGUYÊN CONTENT WRAPPER GỐC */}
        <motion.div
          className="bg-white/70 p-3 rounded-b-2xl shadow-inner min-h-[120px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* GIỮ NGUYÊN ANIMATION CHUYỂN TRANG GỐC */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`page-${page}`}
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {currentItems.length === 0 ? (
                <div className="text-center py-8">
                  <FaTruckFast className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">Chưa giao khách nào.</p>
                </div>
              ) : (
                currentItems.map((customer) => (
                  <SelectableCustomerCard
                    key={customer.customerId}
                    customer={customer}
                    isSelected={
                      selectedCustomer?.customerId === customer.customerId
                    }
                    onSelect={handleCustomerSelect}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* GIỮ NGUYÊN PAGINATION GỐC */}
          {totalPages > 1 && (
            <div className="mt-4">
              <CustomPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* POPUP ACTIONS với animation callback */}
      <FloatingActionPopup
        isVisible={showActionPopup}
        customer={selectedCustomer}
        onClose={handleClosePopup}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAnimationComplete={handleAnimationComplete}
      />

      {/* THÊM DELETE CONFIRMATION */}
      <AnimatePresence>
        {showDeleteConfirm && (
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
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Xác nhận xóa đơn hàng
              </h3>
              <p className="text-gray-600 mb-4">
                Bạn có chắc muốn xóa đơn hàng của{" "}
                <strong>{selectedCustomer?.customerName}</strong>?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-medium"
                >
                  Xóa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
