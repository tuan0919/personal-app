import { motion } from "framer-motion";
import { WeeklyStatsSection } from "@/components/admin/AdminDashboard/WeeklyStatsSection";
import { WeeklyChartSection } from "@/components/admin/AdminDashboard/WeeklyChartSection";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useEffect } from "react";

export const View = () => {
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
