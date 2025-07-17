import { formatCurrency } from "@/utils/formatter";
import { motion } from "framer-motion";
import { FiDollarSign, FiClock, FiCheck } from "react-icons/fi";

interface PaymentStatisticsProps {
  totalUnpaidAmount: number;
  totalUnpaidOrders: number;
  selectedUnpaidAmount: number;
}

export function PaymentStatistics({
  totalUnpaidAmount,
  totalUnpaidOrders,
  selectedUnpaidAmount,
}: PaymentStatisticsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-8"
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
        <div className="text-center">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FiDollarSign className="text-pink-600 text-lg" />
          </div>
          <p className="text-gray-600 text-xs mb-1">Tổng tiền cần thu</p>
          <p className="text-lg font-bold text-pink-600">
            {formatCurrency(totalUnpaidAmount)}
          </p>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
        <div className="text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FiClock className="text-orange-600 text-lg" />
          </div>
          <p className="text-gray-600 text-xs mb-1">Đơn chưa thanh toán</p>
          <p className="text-lg font-bold text-orange-600">
            {totalUnpaidOrders}
          </p>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FiCheck className="text-green-600 text-lg" />
          </div>
          <p className="text-gray-600 text-xs mb-1">Đã chọn thu</p>
          <p className="text-lg font-bold text-green-600">
            {formatCurrency(selectedUnpaidAmount)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
