import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaMoneyBillWave } from "react-icons/fa";
import { fadeInUp } from "./animations";
import { useCustomerDetailsAnimation } from "@/hooks/useCustomerDetailsAnimation";

interface WeeklyRevenue {
  week: string;
  daCay: number;
  daBi: number;
  total: number;
}

interface WeeklyRevenueChartProps {
  data: WeeklyRevenue[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-pink-200 rounded-2xl p-4 shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString("vi-VN")} ₫
          </p>
        ))}
        <p className="text-sm font-semibold text-gray-700 mt-2 pt-2 border-t border-gray-200">
          Tổng:{" "}
          {payload
            .reduce((sum: number, entry: any) => sum + entry.value, 0)
            .toLocaleString("vi-VN")}{" "}
          ₫
        </p>
      </div>
    );
  }
  return null;
};

export function WeeklyRevenueChart({ data }: WeeklyRevenueChartProps) {
  const ref = useRef(null);
  const controls = useCustomerDetailsAnimation(ref);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-pink-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
          <FaMoneyBillWave className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">
          Biểu đồ doanh thu theo tuần
        </h3>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorDaCay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorDaBi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="daCay"
              stackId="1"
              stroke="#ec4899"
              strokeWidth={2}
              fill="url(#colorDaCay)"
              name="Đá cây"
            />
            <Area
              type="monotone"
              dataKey="daBi"
              stackId="1"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#colorDaBi)"
              name="Đá bi"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
