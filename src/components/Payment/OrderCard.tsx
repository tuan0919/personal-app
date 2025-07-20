// components/Payment/OrderCard.tsx
import { motion } from "framer-motion";
import {
  FiUser,
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiPackage,
} from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import { cardVariants } from "@/components/shared/animations";
import { formatCurrency } from "@/utils/formatter";
import { Customer } from "@/api/types";

interface OrderCardProps {
  customer: Customer;
  isSelected: boolean;
  onSelect: () => void;
}

export function OrderCard({ customer, isSelected, onSelect }: OrderCardProps) {
  // Tính toán giá trị đơn hàng
  const orderAmount = customer.amount * 10000;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`backdrop-blur-sm rounded-2xl bg-white/30 p-6 shadow-md border-2 transition-all duration-300 cursor-pointer
        ${
          isSelected
            ? "border-pink-400 bg-pink-50/50 shadow-lg scale-[1.02]"
            : "border-gray-200 hover:border-pink-300 hover:shadow-md"
        }
      `}
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isSelected ? "bg-pink-500 border-pink-500" : "border-gray-300"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSelected && <FiCheck className="text-white text-xs" />}
          </motion.div>
          <div className="flex items-center space-x-2">
            <FiUser className="text-gray-500 flex-shrink-0" />
            <span className="font-semibold text-gray-800 truncate">
              {customer.customerName}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-2 text-gray-600">
          <MdOutlinePayment className="text-pink-500 flex-shrink-0 mt-0.5" />
          <span className="text-sm break-words">
            {customer.paymentStatus === "paid"
              ? "Đã thanh toán"
              : "Chưa thanh toán"}
          </span>
        </div>
        <div className="flex items-start space-x-2 text-gray-600">
          <FiMapPin className="text-pink-500 flex-shrink-0 mt-0.5" />
          <span className="text-sm break-words">{customer.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FiCalendar className="text-pink-500 flex-shrink-0" />
          <span className="text-sm whitespace-nowrap">
            {customer.deliveryTime}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <FiPackage className="text-pink-500 flex-shrink-0" />
          <span className="text-sm text-gray-600 break-words">
            {customer.productType === 1 ? "Đá cây" : "Đá viên"} x
            {customer.amount}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-pink-600">
            {formatCurrency(orderAmount)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
