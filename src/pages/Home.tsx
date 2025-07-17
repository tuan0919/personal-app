// Home.tsx
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { motion } from "framer-motion";
import { AddOrderButton } from "@/components/Home/user/AddOrderButton";
import { ActivityHistoryButton } from "@/components/Home/user/ActivityHistoryButton";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";
import { GetOrderPaymentButton } from "@/components/Home/user/GetOrderPaymentButton";
import { DailyStatsSection } from "@/components/Home/admin/DailyStatsSection";
import { OrdersSection } from "@/components/Home/admin/OrdersSection";
import { WeeklyChartSection } from "@/components/Home/admin/WeeklyChartSection";
import { WeeklyStatsSection } from "@/components/Home/admin/WeeklyStatsSection";
import { allCustomers } from "@/static/mockCustomers";
import { DeliveredCustomers } from "@/components/Home/user/DeliveredCustomers";
const deliveredToday = allCustomers.filter((c) => c.delivered);
export function Home() {
  const { refs, controls } = useHomeAnimations();
  const isAdmin = false;
  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      <TopNav />
      <motion.main
        className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!isAdmin && (
          <>
            <GetOrderPaymentButton />
            <ActivityHistoryButton />
            <AddOrderButton />
            <DeliveredCustomers
              onDeleteCustomer={() => {}}
              onUpdateCustomer={() => {}}
              delivered={deliveredToday}
            />
          </>
        )}
        {isAdmin && (
          <>
            <DailyStatsSection
              ref={refs.dailyStatsRef}
              controls={controls.dailyStatsCtrl}
            />
            <OrdersSection
              ref={refs.ordersRef}
              controls={controls.ordersCtrl}
            />
            <WeeklyChartSection
              ref={refs.chartRef}
              controls={controls.chartCtrl}
            />
            <WeeklyStatsSection
              ref={refs.weeklyStatsRef}
              controls={controls.weeklyStatsCtrl}
            />
          </>
        )}
      </motion.main>
      <BottomNav />
    </div>
  );
}
