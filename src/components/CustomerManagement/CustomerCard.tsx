import { Customer } from "@/api";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-32 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-700/50 dark:to-gray-800/50 flex items-center justify-center">
        <img
          src={`https://i.pravatar.cc/150?u=${customer.customerId}`}
          alt={customer.customerName}
          className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-md"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
          {customer.customerName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {customer.address}
        </p>
      </div>
      <div className="p-4 bg-black/5 dark:bg-black/10 border-t border-white/20 dark:border-gray-700/50 flex justify-around">
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <FiEye size={20} />
        </button>
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-green-100/50 dark:hover:bg-green-900/50 hover:text-green-600 dark:hover:text-green-400 transition-colors">
          <FiEdit size={20} />
        </button>
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-red-100/50 dark:hover:bg-red-900/50 hover:text-red-500 dark:hover:text-red-400 transition-colors">
          <FiTrash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};
