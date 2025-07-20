// components/shared/navigation/BottomNav.tsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiUser, FiDollarSign, FiActivity } from "react-icons/fi";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      to: "/",
      icon: FiHome,
      label: "Trang chủ",
    },
    {
      to: "/activity-history",
      icon: FiActivity,
      label: "Lịch sử",
    },
    {
      to: "/payment",
      icon: FiDollarSign,
      label: "Thanh toán",
    },
    {
      to: "/profile",
      icon: FiUser,
      label: "Hồ sơ",
    },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 pb-safe"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs",
              isActive(item.to)
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 mb-1",
                isActive(item.to) && "text-blue-600"
              )}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
