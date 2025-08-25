import { Customer } from "@/types/api/admin/customer-management-page-types";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiEye, FiPhone } from "react-icons/fi";
import { FaCube, FaRegSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

interface CustomerCardProps {
  customer: Customer;
  onDelete?: (id: number) => void | Promise<void>;
}

export const CustomerCard = ({ customer, onDelete }: CustomerCardProps) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-24 flex items-center justify-center">
        <img
          src={
            customer.avatar ||
            `https://i.pravatar.cc/150?u=${customer.customerId}`
          }
          alt={customer.customerName}
          className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-md"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
          {customer.customerName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate px-2">
          {customer.address}
        </p>
        <div className="mt-2 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <FiPhone className="mr-2 h-4 w-4" />
          <span>{customer.phoneNumber}</span>
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 border-t border-white/10 dark:border-gray-700/30">
        <div className="flex justify-around text-gray-700 dark:text-gray-200">
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <FaCube className="text-fuchsia-500" />
              <span className="font-semibold">Đá Bi</span>
            </div>
            <p className="font-bold text-base text-fuchsia-600 dark:text-fuchsia-400">
              {customer.price1.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <div className="border-l border-white/10 dark:border-gray-700/30"></div>
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <FaRegSquare className="text-sky-500" />
              <span className="font-semibold">Đá Cây</span>
            </div>
            <p className="font-bold text-base text-sky-600 dark:text-sky-400">
              {customer.price2.toLocaleString("vi-VN")}đ
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-black/5 dark:bg-black/10 border-t border-white/20 dark:border-gray-700/50 flex justify-around">
        <Link to={`/customer/${customer.customerId}`}>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100/80 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300 hover:bg-sky-200/80 dark:hover:bg-sky-800/60 transition-all duration-300 transform hover:scale-110">
            <FiEye size={20} />
          </button>
        </Link>
        <button
          onClick={() =>
            navigate(`/admin/customer-management/edit/${customer.customerId}`)
          }
          className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100/80 dark:bg-green-900/50 text-green-600 dark:text-green-300 hover:bg-green-200/80 dark:hover:bg-green-800/60 transition-all duration-300 transform hover:scale-110"
        >
          <FiEdit size={20} />
        </button>
        <button
          onClick={() => setConfirmOpen(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100/80 dark:bg-red-900/50 text-red-500 dark:text-red-400 hover:bg-red-200/80 dark:hover:bg-red-800/60 transition-all duration-300 transform hover:scale-110"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Xóa khách hàng"
        message={`Bạn có chắc chắn muốn xóa khách hàng "${customer.customerName}"?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete?.(customer.customerId);
        }}
      />
    </motion.div>
  );
};
