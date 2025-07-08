// /components/Home/OrderItem.tsx
import { FaCube, FaIceCream, FaTrash } from "react-icons/fa6";
import { FaUserCircle, FaEdit, FaEye } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { allOrders } from "@/static/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { itemVariants } from "@/components/Home/animations";

export function OrderItem({
  order,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
}: {
  order: (typeof allOrders)[number];
  selected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "p-2.5 rounded-lg border mb-2 cursor-pointer select-none transition-all duration-200",
        selected
          ? "bg-gradient-to-r from-pink-50 to-orange-50 border-pink-300"
          : "bg-white/60 border-gray-200 hover:bg-white/80"
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TbTruckDelivery className="text-pink-500 text-lg" />
          <div>
            <p className="font-semibold text-gray-800 text-sm truncate">
              {order.customer}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FaUserCircle className="text-pink-400 text-xs" />
              {order.shipper}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-600 text-right">
            <span className="flex items-center gap-1">
              <FaIceCream className="text-pink-400" /> {order.daCay}
              <FaCube className="text-sky-400 ml-1" /> {order.daBi}
            </span>
            <div className="font-medium text-green-600">
              {order.revenue.toLocaleString("vi-VN")} ₫
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                ⋮
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <FaEye className="mr-2 h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <FaEdit className="mr-2 h-4 w-4" />
                Sửa đơn
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete}>
                <FaTrash className="mr-2 h-4 w-4" />
                Xóa đơn
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
