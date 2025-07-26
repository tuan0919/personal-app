import { DailyStatsSection } from "@/components/Home/admin/DailyStatsSection";
import { WeeklyChartSection } from "@/components/Home/admin/WeeklyChartSection";
import { WeeklyStatsSection } from "@/components/Home/admin/WeeklyStatsSection";
import { OrdersSection } from "./admin/OrdersSection";
import { ManagementSection } from "./admin/ManagementSection";

export function AdminView() {
  return (
    <>
      <ManagementSection />
      <DailyStatsSection />
      <OrdersSection />
      <WeeklyStatsSection />
      <WeeklyChartSection />
    </>
  );
}
