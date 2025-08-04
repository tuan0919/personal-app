import { useParams } from "react-router-dom";
import { useCustomerEdit } from "@/hooks/useCustomerEdit";
import { CustomerEditLayout } from "@/components/CustomerEdit/CustomerEditLayout";
import { CustomerEditForm } from "@/components/CustomerEdit/CustomerEditForm";
import { motion } from "framer-motion";
import { FiLoader, FiAlertCircle } from "react-icons/fi";
import { CustomerEditFormValues } from "@/types/admin/customer-edit-page-types";

const CustomerEditView = () => {
  const { id } = useParams<{ id: string }>();
  const customerId = id ? parseInt(id, 10) : 0;
  const { state, actions } = useCustomerEdit(customerId);

  const handleSubmit = (data: CustomerEditFormValues) => {
    actions.updateCustomer(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
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
        <>
          <CustomerEditForm 
            customer={state.customer} 
            onSubmit={handleSubmit} 
            isSubmitting={state.isSubmitting} 
          />
          
          {state.submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-100/80 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg backdrop-blur-sm text-center"
            >
              Cập nhật thông tin khách hàng thành công!
            </motion.div>
          )}
          
          {state.submitError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-100/80 dark:bg-red-900/50 text-red-500 dark:text-red-300 rounded-lg backdrop-blur-sm text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <FiAlertCircle />
                {state.submitError}
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export const CustomerEdit = () => {
  return (
    <CustomerEditLayout>
      <CustomerEditView />
    </CustomerEditLayout>
  );
};
