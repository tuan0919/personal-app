import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// Biểu đồ đường – dùng thư viện recharts (đã cài)
export function RevenueLineChart({
  data,
}: {
  data: Array<{ giờ: string; doanhThu: number }>;
}) {
  return (
    <div className="w-full h-40 sm:h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="giờ"
            tick={{ fontSize: 10 }}
            stroke="#9ca3af"
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v / 1000}k`}
            tick={{ fontSize: 10 }}
            stroke="#9ca3af"
            axisLine={false}
          />
          <Tooltip
            formatter={(val: number) => `${val.toLocaleString("vi-VN")} ₫`}
          />
          <Line
            type="monotone"
            dataKey="doanhThu"
            stroke="#ec4899"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
