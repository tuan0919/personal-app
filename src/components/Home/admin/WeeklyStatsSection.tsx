// /components/Home/WeeklyStatsSection.tsx
import { forwardRef } from "react";
import { motion, LegacyAnimationControls } from "framer-motion";
import {
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaIceCream,
  FaCube,
} from "react-icons/fa6";
import { StatCard } from "./StatCard";
import { weeklyStats } from "@/static/mock-data";
import { containerVariants } from "@/components/shared/animations";

interface WeeklyStatsSectionProps {
  controls: LegacyAnimationControls;
}

export const WeeklyStatsSection = forwardRef<
  HTMLDivElement,
  WeeklyStatsSectionProps
>(({ controls }, ref) => {
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="mb-4"
    >
      <h2 className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
        Thống kê tuần này
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <StatCard
          gradient="from-emerald-500 via-green-400 to-teal-500"
          icon={
            <FaMoneyBillWave className="text-white text-xl drop-shadow-sm" />
          }
          title="Doanh thu tuần"
          value={`${weeklyStats.totalRevenue.toLocaleString("vi-VN")} ₫`}
          extra={
            <span className="flex items-center text-xs">
              <FaArrowUp className="text-green-200 drop-shadow-sm" /> +
              {weeklyStats.growthRate}%
            </span>
          }
        />
        <StatCard
          gradient="from-violet-500 via-purple-400 to-indigo-500"
          icon={
            weeklyStats.growthRate > 0 ? (
              <FaArrowUp className="text-white text-xl drop-shadow-sm" />
            ) : (
              <FaArrowDown className="text-white text-xl drop-shadow-sm" />
            )
          }
          title="Tăng trưởng"
          value={`${weeklyStats.growthRate}%`}
          subtitle="so với tuần trước"
        />
        <StatCard
          gradient="from-pink-500 via-rose-400 to-pink-600"
          icon={<FaIceCream className="text-white text-xl drop-shadow-sm" />}
          title="Đá cây tuần"
          value={`${weeklyStats.totalDaCay.toLocaleString("vi-VN")} cây`}
        />
        <StatCard
          gradient="from-blue-500 via-sky-400 to-cyan-500"
          icon={<FaCube className="text-white text-xl drop-shadow-sm" />}
          title="Đá bi tuần"
          value={`${weeklyStats.totalDaBi.toLocaleString("vi-VN")} bịch`}
        />
      </div>
    </motion.section>
  );
});

WeeklyStatsSection.displayName = "WeeklyStatsSection";
