import { DailyStatsSection } from "@/components/Home/admin/DailyStatsSection";
import { WeeklyChartSection } from "@/components/Home/admin/WeeklyChartSection";
import { WeeklyStatsSection } from "@/components/Home/admin/WeeklyStatsSection";
import { OrdersSection } from "./admin/OrdersSection";

// Type for framer-motion animation controls
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FramerControls = any;

interface AdminViewProps {
  refs: {
    dailyStatsRef: React.RefObject<HTMLDivElement | null>;
    ordersRef: React.RefObject<HTMLDivElement | null>;
    chartRef: React.RefObject<HTMLDivElement | null>;
    weeklyStatsRef: React.RefObject<HTMLDivElement | null>;
  };
  controls: {
    dailyStatsCtrl: FramerControls;
    ordersCtrl: FramerControls;
    chartCtrl: FramerControls;
    weeklyStatsCtrl: FramerControls;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AdminView(_props: AdminViewProps) {
  // Props are received from Home.tsx but not used in this component
  // They're kept to maintain structural consistency with UserView
  return (
    <>
      <DailyStatsSection />
      <OrdersSection />
      <WeeklyStatsSection />
      <WeeklyChartSection />
    </>
  );
}
