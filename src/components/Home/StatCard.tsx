import { JSX } from "react";
import { motion } from "framer-motion";
// StatCard component
export function StatCard({
  icon,
  title,
  value,
  gradient,
  extra,
  subtitle,
}: {
  icon: JSX.Element;
  title: string;
  value: string;
  gradient: string;
  extra?: JSX.Element;
  subtitle?: string;
}) {
  return (
    <motion.div
      className={`bg-gradient-to-br ${gradient} text-white rounded-xl shadow flex flex-col items-start justify-center p-3 cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs drop-shadow-sm">{title}</span>
      </div>
      <span className="text-base font-bold drop-shadow-sm">{value}</span>
      {extra && <div className="mt-1 text-xs drop-shadow-sm">{extra}</div>}
      {subtitle && (
        <div className="text-xs opacity-90 drop-shadow-sm mt-0.5">
          {subtitle}
        </div>
      )}
    </motion.div>
  );
}
