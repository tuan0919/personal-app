// components/Payment/ActionButtons.tsx
import { motion } from "framer-motion";
import { FiCheck, FiX, FiCheckSquare } from "react-icons/fi";

interface ActionButtonsProps {
  onConfirm: () => void;
  onCancel: () => void;
  onSelectAll: () => void;
  disabled: boolean;
  selectedCount: number;
}

export function ActionButtons({
  onConfirm,
  onCancel,
  onSelectAll,
  disabled,
  selectedCount,
}: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-20 left-0 right-0 flex justify-center z-30"
    >
      <div className="bg-white shadow-lg rounded-full px-2 py-2 flex gap-2 border border-gray-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onConfirm}
          disabled={disabled || selectedCount === 0}
        >
          <FiCheck />
          <span>Thanh toán {selectedCount > 0 && `(${selectedCount})`}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full flex items-center gap-2"
          onClick={onSelectAll}
          disabled={disabled}
        >
          <FiCheckSquare />
          <span>Chọn tất cả</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onCancel}
          disabled={disabled || selectedCount === 0}
        >
          <FiX />
          <span>Hủy chọn</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
