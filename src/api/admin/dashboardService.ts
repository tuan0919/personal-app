import {
  dailySummary,
  DailySummary,
  weeklyRevenueChart,
  WeeklyRevenueChart,
  weeklyStats,
  WeeklyStats,
} from "@/types/api/admin/dashboard-page-types";
import { delay } from "@/utils/delay";

export class DashboardService {
  static async getWeeklyChart(): Promise<WeeklyRevenueChart[]> {
    await delay(1000);
    return [...weeklyRevenueChart];
  }
  static async getWeeklyStats(): Promise<WeeklyStats> {
    await delay(1000);
    return { ...weeklyStats };
  }
  static async getDailySummary(): Promise<DailySummary> {
    await delay(1000);
    return { ...dailySummary };
  }
}
