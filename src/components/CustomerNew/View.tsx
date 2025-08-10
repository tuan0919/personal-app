import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useCustomerNew } from "@/hooks/useCustomerNew";
import type { CustomerNewFormValues } from "@/types/admin/customer-new-page-types";
import { NewForm } from ".";

export const View = () => {
  const navigate = useNavigate();
  const { state, actions } = useCustomerNew();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (data: CustomerNewFormValues) => {
    actions.createCustomer(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <NewForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={state.isSubmitting}
      />

      {state.submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-100/80 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg backdrop-blur-sm text-center"
        >
          Tạo khách hàng mới thành công!
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
    </motion.div>
  );
};
