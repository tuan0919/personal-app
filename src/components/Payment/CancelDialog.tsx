import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { formatCurrency } from "@/utils/formatter";

export interface CancelDialogProps {
  open: boolean;
  count: number;
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelDialog: React.FC<CancelDialogProps> = ({
  open,
  count,
  total,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-pink-100"
      >
        <div className="text-center mb-6">
          <motion.div
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FiX className="text-red-500 text-2xl" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Hủy xác nhận thanh toán
          </h3>
          <p className="text-gray-600">
            Bạn có chắc chắn muốn hủy xác nhận {count} hóa đơn đã thanh toán với
            tổng số tiền{" "}
            <span className="font-bold text-red-600">
              {formatCurrency(total)}
            </span>
            ?
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Hủy
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Xác nhận
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
