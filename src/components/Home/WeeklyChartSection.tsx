// /components/Home/WeeklyChartSection.tsx
import { forwardRef } from "react";
import { motion, LegacyAnimationControls } from "framer-motion";
import { WeeklyRevenueAreaChart } from "./WeeklyRevenueAreaChart";
import { weeklyRevenueChart } from "@/static/mock-data";
import { slideInVariants } from "@/components/Home/animations";

interface WeeklyChartSectionProps {
  controls: LegacyAnimationControls;
}

export const WeeklyChartSection = forwardRef<
  HTMLDivElement,
  WeeklyChartSectionProps
>(({ controls }, ref) => {
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
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
});

WeeklyChartSection.displayName = "WeeklyChartSection";
