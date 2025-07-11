// components/Attend/DeliveredCustomers.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClipboardList, FaTruckFast } from "react-icons/fa6";
import { CustomerCard } from "./CustomerCard";
import { CustomPagination } from "./CustomPagination";
import { Customer } from "@/static/mockCustomers";
import {
  sectionVariants,
  containerVariants,
  pageTransition,
} from "./animations";

interface DeliveredCustomersProps {
  delivered: Customer[];
}

export function DeliveredCustomers({ delivered }: DeliveredCustomersProps) {
  // đảm bảo chỉ xài những đơn đã giao
  const deliveredList = delivered.filter((c) => c.delivered); // :contentReference[oaicite:0]{index=0}

  const perPage = 3;
  const totalPages = Math.max(1, Math.ceil(deliveredList.length / perPage));
  const [page, setPage] = useState(1);

  // nếu deliveredList thay đổi mà page vượt quá, reset về 1
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const startIdx = (page - 1) * perPage;
  const currentItems = deliveredList.slice(startIdx, startIdx + perPage);

  return (
    <motion.section
      className="px-2 sm:px-4 mb-4"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 p-4 rounded-t-2xl shadow-lg flex items-center gap-3">
        <FaClipboardList className="text-white w-6 h-6" />
        <h3 className="text-white font-bold text-base">
          Khách đã giao hôm nay
        </h3>
      </div>

      {/* Content */}
      <motion.div
        className="bg-white/70 p-3 rounded-b-2xl shadow-inner min-h-[120px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`page-${page}`}
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentItems.length === 0 ? (
              <div className="text-center py-8">
                <FaTruckFast className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">Chưa giao khách nào.</p>
              </div>
            ) : (
              currentItems.map((cust) => (
                <CustomerCard key={cust.customerId} customer={cust} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-4">
            <CustomPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
