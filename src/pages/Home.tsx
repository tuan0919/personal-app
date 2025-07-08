// Home.tsx
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { motion } from "framer-motion";
import { DailyStatsSection } from "@/components/Home/DailyStatsSection";
import { OrdersSection } from "@/components/Home/OrdersSection";
import { WeeklyChartSection } from "@/components/Home/WeeklyChartSection";
import { WeeklyStatsSection } from "@/components/Home/WeeklyStatsSection";
import { AddOrderButton } from "@/components/Home/AddOrderButton";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";

export default function Home() {
  const { refs, controls } = useHomeAnimations();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-50">
      <TopNav />
      <motion.main
        className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AddOrderButton />
        <DailyStatsSection
          ref={refs.dailyStatsRef}
          controls={controls.dailyStatsCtrl}
        />
        <OrdersSection ref={refs.ordersRef} controls={controls.ordersCtrl} />
        <WeeklyChartSection ref={refs.chartRef} controls={controls.chartCtrl} />
        <WeeklyStatsSection
          ref={refs.weeklyStatsRef}
          controls={controls.weeklyStatsCtrl}
        />
      </motion.main>
      <BottomNav />
    </div>
  );
}
