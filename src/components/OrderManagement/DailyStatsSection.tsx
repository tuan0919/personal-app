// /components/Home/DailyStatsSection.tsx
import { motion } from "framer-motion";
import { FaIceCream, FaCube, FaMoneyBillWave } from "react-icons/fa6";
import { dailySummary } from "@/static/admin/mockChartData";
import {
  containerVariants,
  slideInVariants,
} from "@/components/shared/animations";
import { StatCard } from ".";

export function DailyStatsSection() {
  const statsData = [
    {
      gradient: "from-pink-500 via-pink-400 to-rose-500",
      icon: <FaIceCream className="text-white text-xl drop-shadow-sm" />,
      title: "Đá cây",
      value: `${dailySummary.daCay} cây`,
    },
    {
      gradient: "from-blue-500 via-sky-400 to-cyan-500",
      icon: <FaCube className="text-white text-xl drop-shadow-sm" />,
      title: "Đá bi",
      value: `${dailySummary.daBi} bịch`,
    },
    {
      gradient: "from-emerald-500 via-green-400 to-teal-500",
      icon: <FaMoneyBillWave className="text-white text-xl drop-shadow-sm" />,
      title: "Doanh thu",
      value: dailySummary.doanhThu.toLocaleString("vi-VN"),
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-3 gap-2 sm:gap-3 my-4"
    >
      {statsData.map((stat, i) => (
        <motion.div key={i} variants={slideInVariants}>
          <StatCard {...stat} />
        </motion.div>
      ))}
    </motion.section>
  );
}
