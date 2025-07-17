// components/Attend/CustomerCard.tsx
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

export function CustomerCard({ customer }: { customer: Customer }) {
  const unitPrice = PRICE_MAP[customer.productType] || 0;
  const totalPrice = unitPrice * customer.amount;

  return (
    <motion.div
      className="bg-white/50 rounded-xl shadow-sm p-4 mb-3 flex flex-col space-y-2"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        <FaTruckFast className="text-pink-500 w-5 h-5" />
        <h3 className="font-medium text-gray-800">{customer.customerName}</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt /> {customer.address}
        </div>
        <div className="flex items-center gap-1">
          <FaClock /> {customer.deliveryTime}
        </div>
        <div className="flex items-center gap-1">
          <FaBoxesPacking /> Số lượng: {customer.amount}
        </div>
        <div className="flex items-center gap-1">
          <FaMoneyBillWave /> Đơn giá: {unitPrice.toLocaleString("vi-VN")}đ
        </div>
        <div className="flex items-center gap-1">
          <FaMoneyBillWave /> Tổng: {totalPrice.toLocaleString("vi-VN")}đ
        </div>
        <div className="flex items-center gap-1">
          {customer.paymentStatus === "paid" ? (
            <>
              <FaCheckCircle className="text-green-500" /> Đã thanh toán
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500" /> Chưa thanh toán
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
