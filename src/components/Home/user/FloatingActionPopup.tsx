// components/Home/user/FloatingActionPopup.tsx
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { Customer } from "@/static/mockCustomers";
import {
  backdropVariants,
  popupVariants,
  headerVariants,
  buttonVariants,
} from "./animations";

interface FloatingActionPopupProps {
  isVisible: boolean;
  customer: Customer | null;
  onClose: () => void;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onAnimationComplete?: () => void; // Thêm callback
}

export function FloatingActionPopup({
  isVisible,
  customer,
  onClose,
  onEdit,
  onDelete,
  onAnimationComplete,
}: FloatingActionPopupProps) {
  return (
    <AnimatePresence
      onExitComplete={onAnimationComplete} // Callback khi exit animation hoàn tất
    >
      {isVisible && customer && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Enhanced Popup với Scale Down Exit */}
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-40 left-4 right-4 z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-auto border border-gray-100">
              {/* Enhanced Header */}
              <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    {customer.customerName}
                  </h3>
                  <p className="text-sm text-slate-600">{customer.address}</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-gray-400" />
                </motion.button>
              </motion.div>

              {/* Enhanced Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  custom={1}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => onEdit(customer)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 rounded-xl hover:from-amber-100 hover:to-amber-200 transition-all duration-200 font-medium"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <FaEdit className="text-lg" />
                  <span>Chỉnh sửa</span>
                </motion.button>

                <motion.button
                  custom={2}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => onDelete(customer)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-200 font-medium"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <FaTrash className="text-lg" />
                  <span>Xóa đơn hàng</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
