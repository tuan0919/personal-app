// components/Home/user/SelectableCustomerCard.tsx
import { motion } from "framer-motion";
import {
  FaClock,
  FaBoxesPacking,
  FaMoneyBillWave,
  FaTruckFast,
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Customer } from "@/static/mockCustomers";
import { cardVariants } from "./animations";

const PRICE_MAP: Record<number, number> = {
  1: 10000, // Đá cây
  2: 15000, // Đá viên
};

const PRODUCT_TYPE_NAMES: Record<number, string> = {
  1: "Đá cây",
  2: "Đá viên",
};

interface SelectableCustomerCardProps {
  customer: Customer;
  isSelected: boolean;
  onSelect: (customer: Customer) => void;
}

export function SelectableCustomerCard({
  customer,
  isSelected,
  onSelect,
}: SelectableCustomerCardProps) {
  const unitPrice = PRICE_MAP[customer.productType] || 0;
  const totalPrice = unitPrice * customer.amount;
  const productTypeName =
    PRODUCT_TYPE_NAMES[customer.productType] || "Sản phẩm";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`
        bg-white rounded-xl p-4 shadow-sm border-2 mb-3 cursor-pointer transition-all duration-300
        ${
          isSelected
            ? "border-blue-500 shadow-lg shadow-blue-100"
            : "border-gray-200 hover:border-blue-300"
        }
      `}
      onClick={() => onSelect(customer)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header: Tên khách hàng + Thời gian giao (cùng 1 dòng) */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800 text-lg">
          {customer.customerName}
        </h3>
        <div className="flex items-center gap-1 text-blue-600">
          <FaClock className="text-xs" />
          <span className="text-xs font-medium">{customer.deliveryTime}</span>
        </div>
      </div>

      {/* Địa chỉ + Icon truck (cùng 1 dòng) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-600">
          <FaMapMarkerAlt className="text-sm text-slate-400" />
          <span className="text-sm">{customer.address}</span>
        </div>
        <div className="text-emerald-500">
          <FaTruckFast className="text-lg" />
        </div>
      </div>

      {/* Thông tin sản phẩm: Loại đá + Đơn giá (cùng 1 dòng) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaBoxesPacking className="text-blue-500 text-sm" />
          <span className="text-sm font-medium text-slate-700">
            {productTypeName}: {customer.amount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-amber-500 text-sm" />
          <span className="text-sm font-medium text-slate-700">
            {unitPrice.toLocaleString("vi-VN")}đ/đơn vị
          </span>
        </div>
      </div>

      {/* Footer: Tổng tiền + Trạng thái thanh toán (cùng 1 dòng) */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-900 text-base">
          Tổng: {totalPrice.toLocaleString("vi-VN")}đ
        </span>
        {customer.paymentStatus === "paid" ? (
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
