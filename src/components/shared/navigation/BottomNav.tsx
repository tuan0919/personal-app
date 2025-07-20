/*  BottomNav.tsx
 *  – Responsive trên iPhone SE (≤ 375 px)
 *  – Màu & style đồng bộ giao diện hiện tại
 *  – Nút giữa (route ở giữa) có gradient hồng, nổi, tự "active" khi ở đúng route
 */
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaUserAlt, FaBook, FaPlus } from "react-icons/fa";
import clsx from "clsx";

export default function BottomNav() {
  const { pathname } = useLocation();

  /* 5 tab – tab thứ 3 (index 2) ở giữa */
  const tabs = [
    { to: "/", icon: FaHome, label: "Trang chủ" },
    { to: "/stats", icon: FaBook, label: "Thống kê" },
    { to: "/add", icon: FaPlus, label: "Thêm", center: true },
    { to: "/palette", icon: FaBook, label: "Màu sắc" },
    { to: "/profile", icon: FaUserAlt, label: "Cá nhân" },
  ];

  /* Render tab thông thường (không phải tab giữa) */
  const renderTab = (tab: (typeof tabs)[number], idx: number) => {
    const Icon = tab.icon;
    return (
      <NavLink
        key={idx}
        to={tab.to}
        className={({ isActive }) =>
          clsx(
            "flex flex-col items-center justify-center gap-1 flex-1 relative",
            isActive
              ? "text-pink-500"
              : "text-gray-400 hover:text-pink-400 transition-colors"
          )
        }
      >
        <Icon className="text-[22px] sm:text-xl" />
        <span className="text-[10px] sm:text-xs">{tab.label}</span>

        {/* gạch dưới khi active */}
        {pathname === tab.to && (
          <span className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-0.5 sm:h-1 rounded-full bg-pink-400" />
        )}
      </NavLink>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
      {/* wrapper để canh giữa và hỗ trợ safe-area */}
      <div className="flex justify-center items-end">
        <div className="relative w-full max-w-md pointer-events-auto">
          {/* Thanh nền chính */}
          <div className="mx-3 sm:mx-4 mb-3 sm:mb-4 h-14 sm:h-16 bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg flex items-center justify-between px-3 sm:px-5">
            {/* 2 tab trái */}
            {renderTab(tabs[0], 0)}
            {renderTab(tabs[1], 1)}

            {/* chừa chỗ nút giữa */}
            <div className="flex-1" />

            {/* 2 tab phải */}
            {renderTab(tabs[3], 3)}
            {renderTab(tabs[4], 4)}
          </div>

          {/* Nút giữa ‑ Floating Action Button */}
          <NavLink
            to={tabs[2].to}
            className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-7 pointer-events-auto flex flex-col items-center"
          >
            <div
              className={clsx(
                "w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center",
                "bg-gradient-to-tr from-pink-400 via-pink-300 to-pink-500",
                pathname === tabs[2].to && "ring-2 ring-pink-400"
              )}
            >
              <FaPlus className="text-white text-2xl sm:text-3xl" />
            </div>
            <span className="text-pink-500 text-[10px] sm:text-xs mt-0.5">
              {tabs[2].label}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
