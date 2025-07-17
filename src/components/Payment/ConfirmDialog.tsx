import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiPercent } from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { formatCurrency } from "@/utils/formatter";

export interface ConfirmDialogProps {
  open: boolean;
  count: number;
  total: number;
  onClose: () => void;
  onConfirm: () => void;
  orderDetails?: Array<{
    id: number;
    customerName: string;
    actual: number;
    provisional: number;
    diffPercent: number;
  }>;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  count,
  total,
  onClose,
  onConfirm,
  orderDetails = [],
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
        className="bg-white/95 mb-15 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-pink-100"
      >
        <div className="text-center mb-6">
          <motion.div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FiCheckCircle className="text-green-500 text-2xl" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Xác nhận thanh toán
          </h3>
          <p className="text-gray-600">
            Bạn có chắc chắn muốn xác nhận {count} hóa đơn đã thanh toán với
            tổng số tiền{" "}
            <span className="font-bold text-pink-600">
              {formatCurrency(total)}
            </span>
            ?
          </p>
        </div>
        {orderDetails.length > 0 && (
          <div
            className="max-h-[30vh] sm:max-h-56 overflow-y-auto mb-4 bg-pink-50/60 rounded-xl p-2 border border-pink-100"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
              overscrollBehavior: "contain",
              pointerEvents: "auto",
            }}
          >
            {orderDetails.map((od, idx) => (
              <div
                key={od.id}
                className="flex items-center gap-2 py-2 px-2 text-sm rounded hover:bg-pink-100/60 transition flex-wrap mb-2"
              >
                <span className="font-semibold text-gray-700">
                  Đơn hàng {idx + 1}:
                </span>
                <FaMoneyBillTransfer
                  className="text-green-500"
                  title="Thực thu"
                />
                <span className="text-green-700 font-semibold">
                  {formatCurrency(od.actual)}
                </span>
                <FiPercent className="text-blue-500" title="Chênh lệch %" />
                <span
                  className={`font-semibold ${
                    od.diffPercent === 0
                      ? "text-gray-500"
                      : od.diffPercent > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {od.diffPercent}%
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex space-x-3 mt-auto">
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
            className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
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
