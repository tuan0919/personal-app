// components/Payment/ConfirmDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/formatter";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  count: number;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  amount,
  count,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Xác nhận thanh toán
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FiCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-center text-gray-700">
              Bạn đang xác nhận thanh toán cho <strong>{count}</strong> đơn hàng
              với tổng số tiền:
            </p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {formatCurrency(amount)}
            </p>
          </div>
          <p className="text-center text-sm text-gray-500">
            Sau khi xác nhận, trạng thái thanh toán của các đơn hàng sẽ được cập
            nhật thành "Đã thanh toán".
          </p>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium"
            onClick={onClose}
          >
            Hủy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium ml-3"
            onClick={onConfirm}
          >
            Xác nhận
          </motion.button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
