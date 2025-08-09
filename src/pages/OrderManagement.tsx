import { DailyStatsSection } from "@/components/Home/admin/DailyStatsSection";
import { OrdersSection } from "@/components/Home/admin/OrdersSection";

import { OrderManagementLayout } from "@/components/OrderManagement/OrderManagementLayout";
import { motion } from "framer-motion";

const OrderManagementView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <DailyStatsSection />
      <OrdersSection />
    </motion.div>
  );
};

export function OrderManagement() {
  return (
    <>
      <OrderManagementLayout>
        <OrderManagementView />
      </OrderManagementLayout>
    </>
  );
}
