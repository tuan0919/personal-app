import { DailyStatsSection } from "@/components/Home/admin/DailyStatsSection";
import { OrdersSection } from "./admin/OrdersSection";
import { ManagementSection } from "./admin/ManagementSection";

export function AdminView() {
  return (
    <>
      <ManagementSection />
      <DailyStatsSection />
      <OrdersSection />
    </>
  );
}
