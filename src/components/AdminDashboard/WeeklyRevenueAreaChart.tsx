import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
export function WeeklyRevenueAreaChart({
  data,
}: {
  data: Array<{ thu: string; doanhThu: number }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="thu"
            axisLine={false}
            tickLine={false}
            stroke="#9ca3af"
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <Tooltip formatter={(v) => `${v.toLocaleString("vi-VN")} ₫`} />
          <Area
            type="monotone"
            dataKey="doanhThu"
            stroke="#ec4899"
            fill="url(#grad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
