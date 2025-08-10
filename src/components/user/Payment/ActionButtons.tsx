import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiX } from "react-icons/fi";

interface ActionButtonsProps {
  selectedUnpaidOrders: number[];
  selectedPaidOrders: number[];
  onCollectPayment: () => void;
  onCancelPayment: () => void;
  disabled?: boolean;
}

export function ActionButtons({
  selectedUnpaidOrders,
  selectedPaidOrders,
  onCollectPayment,
  onCancelPayment,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {selectedUnpaidOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-md mx-auto"
          >
            <motion.button
              onClick={onCollectPayment}
              className={`w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
              }`}
              whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
              disabled={disabled}
            >
              <FiCheckCircle className="text-xl" />
              <span className="text-center">
                Xác nhận {selectedUnpaidOrders.length} hóa đơn đã thanh toán
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedPaidOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-md mx-auto"
          >
            <motion.button
              onClick={onCancelPayment}
              className={`w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
              }`}
              whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
              disabled={disabled}
            >
              <FiX className="text-xl" />
              <span className="text-center">
                Hủy xác nhận {selectedPaidOrders.length} hóa đơn đã thanh toán
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
