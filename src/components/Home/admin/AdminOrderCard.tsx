// src/components/Home/admin/AdminOrderCard.tsx
import { motion } from "framer-motion";
import {
  FaClock,
  FaMoneyBillWave,
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaBoxesPacking, FaTruckFast } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Customer } from "@/static/admin/mockCustomers";
import { cardVariants } from "@/components/shared/animations";

const PRICE_MAP: Record<number, number> = {
  1: 10000,
  2: 15000,
};
const PRODUCT_TYPE_NAMES: Record<number, string> = {
  1: "Đá cây",
  2: "Đá viên",
};

interface AdminOrderCardProps {
  order: Customer;
  isSelected: boolean;
  onSelect: (orderId: number) => void;
}

export function AdminOrderCard({
  order,
  isSelected,
  onSelect,
}: AdminOrderCardProps) {
  const unitPrice = PRICE_MAP[order.productType] || 0;
  const totalPrice = unitPrice * order.amount;
  const productTypeName = PRODUCT_TYPE_NAMES[order.productType] || "Sản phẩm";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={cn(
        "bg-white rounded-xl p-4 shadow-sm border-2 mb-3 cursor-pointer transition-all duration-300",
        isSelected
          ? "border-blue-500 shadow-lg shadow-blue-100"
          : "border-gray-200 hover:border-blue-300"
      )}
      onClick={() => onSelect(order.customerId)}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800 text-lg">
          {order.customerName}
        </h3>
        <div className="flex items-center gap-1 text-blue-600">
          <FaClock className="text-xs" />
          <span className="text-xs font-medium">{order.deliveryTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-600">
          <FaMapMarkerAlt className="text-sm text-slate-400" />
          <span className="text-sm">{order.address}</span>
        </div>
        <div className="text-emerald-500">
          <FaTruckFast className="text-lg" />
        </div>
      </div>

      {/* Thêm dòng Người giao */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <FaUserCircle className="text-sm text-slate-400" />
          <span>Người giao:</span>
        </div>
        <span className="font-semibold text-indigo-600">
          {order.shipper.name}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaBoxesPacking className="text-blue-500 text-sm" />
          <span className="text-sm font-medium text-slate-700">
            {productTypeName}: {order.amount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-amber-500 text-sm" />
          <span className="text-sm font-medium text-slate-700">
            {unitPrice.toLocaleString("vi-VN")}đ/đơn vị
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-900 text-base">
          Tổng: {totalPrice.toLocaleString("vi-VN")}đ
        </span>
        {order.paymentStatus === "paid" ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-full">
            <FaCheckCircle className="text-emerald-600 text-sm" />
            <span className="text-xs font-semibold text-emerald-700">
              Đã thanh toán
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-full">
            <FaTimesCircle className="text-red-600 text-sm" />
            <span className="text-xs font-semibold text-red-700">
              Chưa thanh toán
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
