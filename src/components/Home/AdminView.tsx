import { DailyStatsSection } from "@/components/Home/admin/DailyStatsSection";
import { OrdersSection } from "@/components/Home/admin/OrdersSection";
import { WeeklyChartSection } from "@/components/Home/admin/WeeklyChartSection";
import { WeeklyStatsSection } from "@/components/Home/admin/WeeklyStatsSection";

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

export function AdminView({ refs, controls }: AdminViewProps) {
  return (
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
  );
}
