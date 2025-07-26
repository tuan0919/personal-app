import { useCustomerManagement } from "@/hooks/useCustomerManagement";
import { CustomerCard } from "@/components/CustomerManagement/CustomerCard";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiLoader } from "react-icons/fi";
import { CustomerManagementLayout } from "@/components/CustomerManagement/CustomerManagementLayout";

const CustomerManagementView = () => {
  const { state, actions } = useCustomerManagement();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          value={state.searchTerm}
          onChange={(e) => actions.handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {state.loading ? (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : state.error ? (
        <div className="text-center text-red-500 bg-red-100/80 dark:bg-red-900/50 p-4 rounded-lg backdrop-blur-sm">
          {state.error}
          <button
            onClick={actions.refetch}
            className="ml-4 px-4 py-1 bg-red-500 text-white rounded-md"
          >
            Thử lại
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {state.filteredCustomers.map((customer) => (
              <CustomerCard key={customer.customerId} customer={customer} />
            ))}
          </div>
        </AnimatePresence>
      )}

      {state.filteredCustomers.length === 0 && !state.loading && (
        <div className="text-center py-16 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl">
          <p className="text-gray-600 dark:text-gray-300">
            Không tìm thấy khách hàng nào.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export const CustomerManagement = () => {
  return (
    <CustomerManagementLayout>
      <CustomerManagementView />
    </CustomerManagementLayout>
  );
};
