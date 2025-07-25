// /components/Home/WeeklyChartSection.tsx
import { motion } from "framer-motion";
import { WeeklyRevenueAreaChart } from "./WeeklyRevenueAreaChart";
import { weeklyRevenueChart } from "@/static/admin/mockChartData";
import { slideInVariants } from "@/components/shared/animations";

export const WeeklyChartSection = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={slideInVariants}
      className="mb-4"
    >
      <h2 className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
        Biểu đồ doanh thu theo tuần
      </h2>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow p-3"
      >
        <WeeklyRevenueAreaChart data={weeklyRevenueChart} />
      </motion.div>
    </motion.section>
  );
};

WeeklyChartSection.displayName = "WeeklyChartSection";
