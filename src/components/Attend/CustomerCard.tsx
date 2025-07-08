// /components/Attend/CustomerCard.tsx
import { motion } from "framer-motion";
import { FaTruckFast } from "react-icons/fa6";
import { Customer } from "@/static/mockCustomers";
import { cardVariants } from "./animations";

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <motion.div
      className="flex items-center gap-2 bg-pink-50 rounded-lg p-3"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <FaTruckFast className="text-pink-600 w-5 h-5" />
      <div className="flex-1">
        <p className="font-medium text-gray-800">{customer.customerName}</p>
        <p className="text-xs text-gray-500">
          📍 {customer.address} • 🕒 {customer.deliveryTime}
        </p>
      </div>
    </motion.div>
  );
}
