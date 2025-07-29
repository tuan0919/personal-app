import { motion } from "framer-motion";
import { AdminDashboardLayout } from "@/components/AdminDashboard/AdminDashboardLayout";
import { WeeklyStatsSection } from "@/components/AdminDashboard/WeeklyStatsSection";
import { WeeklyChartSection } from "@/components/AdminDashboard/WeeklyChartSection";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useEffect } from "react";

const AdminDashboardView = () => {
  const { state, actions } = useAdminDashboard();
  useEffect(() => {
    actions.fetchDashboardData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <WeeklyStatsSection stats={state.weeklyStats} />
      <WeeklyChartSection chartData={state.weeklyRevenueChart} />
    </motion.div>
  );
};

export const AdminDashboard = () => {
  return (
    <AdminDashboardLayout>
      <AdminDashboardView />
    </AdminDashboardLayout>
  );
};
