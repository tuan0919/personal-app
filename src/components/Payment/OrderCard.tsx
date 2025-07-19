// components/Payment/OrderCard.tsx
import { motion } from "framer-motion";
import {
  FiUser,
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiX,
  FiPackage,
  FiPercent,
} from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { cardVariants } from "@/components/shared/animations";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { Order } from "@/static/mockPayment";
import { Input } from "@/components/ui/input";

interface OrderCardProps {
  order: Order;
  onSelect: () => void;
  selectedPaidOrders: number[];
  selectedUnpaidOrders: number[];
  actualPayment?: number;
  onActualPaymentChange?: (value: number | undefined) => void;
}

export function OrderCard({
  order,
  selectedPaidOrders,
  selectedUnpaidOrders,
  onSelect,
  actualPayment,
  onActualPaymentChange,
}: OrderCardProps) {
  // Tính % chênh lệch
  const actual = actualPayment ?? order.totalAmount;
  const diffPercent = ((actual - order.totalAmount) / order.totalAmount) * 100;
  const diffPercentDisplay = isNaN(diffPercent)
    ? 0
    : Math.round(diffPercent * 100) / 100;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`backdrop-blur-sm rounded-2xl p-6 shadow-md border-2 transition-all duration-300 cursor-pointer
        ${
          order.isPaid
            ? selectedPaidOrders.includes(order.id)
              ? "border-red-400 bg-red-50/50 shadow-lg scale-[1.02]"
              : "border-green-200 bg-green-50/50 hover:border-red-300"
            : selectedUnpaidOrders.includes(order.id)
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
              order.isPaid
                ? selectedPaidOrders.includes(order.id)
                  ? "bg-red-500 border-red-500"
                  : "bg-green-500 border-green-500"
                : selectedUnpaidOrders.includes(order.id)
                ? "bg-pink-500 border-pink-500"
                : "border-gray-300"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {order.isPaid ? (
              selectedPaidOrders.includes(order.id) ? (
                <FiX className="text-white text-xs" />
              ) : (
                <FiCheck className="text-white text-xs" />
              )
            ) : (
              selectedUnpaidOrders.includes(order.id) && (
                <FiCheck className="text-white text-xs" />
              )
            )}
          </motion.div>
          <div className="flex items-center space-x-2">
            <FiUser className="text-gray-500 flex-shrink-0" />
            <span className="font-semibold text-gray-800 truncate">
              {order.customerName}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-2 text-gray-600">
          <MdOutlinePayment className="text-pink-500 flex-shrink-0 mt-0.5" />
          <span className="text-sm break-words">
            {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </span>
        </div>
        <div className="flex items-start space-x-2 text-gray-600">
          <FiMapPin className="text-pink-500 flex-shrink-0 mt-0.5" />
          <span className="text-sm break-words">{order.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FiCalendar className="text-pink-500 flex-shrink-0" />
          <span className="text-sm whitespace-nowrap">
            {formatDate(order.deliveryDate)} - {order.deliveryTime}
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <FiPackage className="text-pink-500 flex-shrink-0" />
          <span className="text-sm text-gray-600 break-words">
            {order.products.map((p) => `${p.type} x${p.quantity}`).join(", ")}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-pink-600">
            {formatCurrency(order.totalAmount)}
          </div>
        </div>
      </div>
      {/* Thực tế thu và % chênh lệch */}
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <FaMoneyBillTransfer className="text-green-500" />
          <Input
            type="number"
            min={0}
            className="w-32 text-sm border-pink-300 focus-visible:border-pink-500 focus-visible:ring-pink-200 px-2 py-1 rounded-md"
            value={
              order.isPaid
                ? order.totalAmount
                : actualPayment === undefined
                ? ""
                : actualPayment
            }
            placeholder="Thực tế thu"
            disabled={order.isPaid}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              if (order.isPaid) return;
              const val = e.target.value;
              const num = val === "" ? undefined : Number(val);
              if (onActualPaymentChange) onActualPaymentChange(num);
            }}
          />
          <span className="text-xs text-gray-500">đ</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPercent className="text-blue-500" />
          <span className="text-xs text-gray-600">Chênh lệch</span>
          <span
            className={`font-semibold text-sm ${
              diffPercentDisplay === 0
                ? "text-gray-500"
                : diffPercentDisplay > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {diffPercentDisplay}%
          </span>
        </div>
      </div>
      {order.notes && (
        <div className="mt-3 p-3 bg-gray-50/80 rounded-lg">
          <p className="text-sm text-gray-600 break-words">
            <strong>Ghi chú:</strong> {order.notes}
          </p>
        </div>
      )}
    </motion.div>
  );
}
