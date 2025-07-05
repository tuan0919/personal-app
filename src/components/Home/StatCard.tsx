import { JSX } from "react";

// Thẻ thống kê nhỏ
export function StatCard({
  icon,
  title,
  value,
  gradient,
}: {
  icon: JSX.Element;
  title: string;
  value: string | number;
  gradient: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} text-white rounded-xl shadow flex flex-col items-center justify-center py-2`}
    >
      {icon}
      <span className="text-[11px] sm:text-xs mt-0.5">{title}</span>
      <span className="text-sm sm:text-base font-semibold">{value}</span>
    </div>
  );
}
