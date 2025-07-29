import { DashboardService } from "@/api/admin/dashboardService";
import {
  DailySummary,
  WeeklyStats,
  WeeklyRevenueChart,
} from "@/types/admin/dashboard-page-types";
import { useState, useCallback } from "react";

interface AdminDashboardState {
  isLoading: boolean;
  dailySummary: DailySummary;
  weeklyStats: WeeklyStats;
  weeklyRevenueChart: WeeklyRevenueChart[];
  error: string | null;
}

export const useAdminDashboard = () => {
  const [state, setState] = useState<AdminDashboardState>({
    isLoading: false,
    dailySummary: {
      daCay: 0,
      daBi: 0,
      doanhThu: 0,
    },
    weeklyStats: {
      totalRevenue: 0,
      growthRate: 0,
      totalDaCay: 0,
      totalDaBi: 0,
    },
    weeklyRevenueChart: [],
    error: null,
  });
  const fetchDashboardData = useCallback(async () => {
    try {
      setState({
        ...state,
        isLoading: true,
      });
      const [dailySummary, weeklyStats, weeklyRevenueChart] = await Promise.all(
        [
          DashboardService.getDailySummary(),
          DashboardService.getWeeklyStats(),
          DashboardService.getWeeklyChart(),
        ]
      );
      setState({
        ...state,
        isLoading: false,
        dailySummary,
        weeklyStats,
        weeklyRevenueChart,
      });
      setState((prev) => ({ ...prev, error: null }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch dashboard data.",
      }));
      console.error(err);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);
  return {
    state,
    actions: {
      fetchDashboardData,
    },
  };
};
