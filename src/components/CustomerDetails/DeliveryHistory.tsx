import { useRef } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaCalendarAlt, FaTruck } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerChildren } from "@/components/shared/animations";
import { useCustomerDetailsAnimation } from "@/hooks/useCustomerDetailsAnimation";

interface Delivery {
  date: string;
  daCay: number;
  daBi: number;
  revenue: number;
  shipper: string;
}

interface DeliveryHistoryProps {
  data: Delivery[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export function DeliveryHistory({
  data,
  currentPage,
  onPageChange,
  totalPages,
}: DeliveryHistoryProps) {
  const ref = useRef(null);
  const controls = useCustomerDetailsAnimation(ref, [currentPage]);

  return (
    <motion.div
      ref={ref}
      variants={staggerChildren}
      initial="hidden"
      animate={controls}
      className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-pink-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
          <FaHistory className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Lịch sử giao đá</h3>
      </div>
      <div className="space-y-4">
        {data.map((h, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-pink-50 to-green-50 p-4 border border-pink-100"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
                <FaCalendarAlt className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{h.date}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-pink-600">
                    {h.daCay} cây
                  </span>{" "}
                  •{" "}
                  <span className="font-medium text-green-600">
                    {h.daBi} bịch
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-green-600">
                {h.revenue.toLocaleString("vi-VN")}
                <span className="text-sm text-gray-500 ml-1">₫</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <FaTruck className="h-3 w-3" />
                <span className="font-medium">{h.shipper}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={cn(
                    "rounded-full",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => onPageChange(i + 1)}
                    isActive={currentPage === i + 1}
                    className="rounded-full"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={cn(
                    "rounded-full",
                    currentPage === totalPages &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </motion.div>
  );
}
