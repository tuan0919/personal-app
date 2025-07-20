// components/Payment/CancelDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

interface CancelDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelDialog({ open, onClose, onConfirm }: CancelDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Hủy lựa chọn
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <p className="text-center text-gray-700">
              Bạn có chắc chắn muốn hủy tất cả các lựa chọn hiện tại?
            </p>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium"
            onClick={onClose}
          >
            Giữ lại
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 px-4 bg-amber-600 text-white rounded-lg font-medium ml-3"
            onClick={onConfirm}
          >
            Hủy lựa chọn
          </motion.button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
