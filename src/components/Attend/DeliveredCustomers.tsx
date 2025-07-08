// /components/Attend/DeliveredCustomers.tsx
import { useState } from "react";
import { motion } from "framer-motion";
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
  const [page, setPage] = useState(1);
  const perPage = 4;
  const pages = Math.max(1, Math.ceil(delivered.length / perPage));
  const slice = delivered.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.section
      className="px-2 sm:px-4 mb-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
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
        className="bg-white p-3 rounded-b-2xl shadow-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-3">
          {slice.length === 0 ? (
            <div className="text-center py-8">
              <FaTruckFast className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-center text-gray-500">Chưa giao khách nào.</p>
            </div>
          ) : (
            <motion.div
              key={`page-${page}`}
              variants={pageTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {slice.map((customer) => (
                <CustomerCard key={customer.customerId} customer={customer} />
              ))}
            </motion.div>
          )}
        </div>

        {pages > 1 && (
          <CustomPagination
            currentPage={page}
            totalPages={pages}
            onPageChange={setPage}
          />
        )}
      </motion.div>
    </motion.section>
  );
}
