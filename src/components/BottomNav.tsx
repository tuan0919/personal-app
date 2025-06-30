import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt, FaBook } from "react-icons/fa";

export default function BottomNav() {
  const base = "flex flex-col items-center justify-center gap-1 text-xs";
  const active = "text-blue-600";
  const inactive = "text-gray-500";

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-primary flex justify-around z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive} text-mau-chu`
        }
      >
        <FaHome className="text-xl" />
        Trang chủ
      </NavLink>
      <NavLink
        to="/books"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <FaBook className="text-xl" />
        Truyện
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <FaUserAlt className="text-xl" />
        Cá nhân
      </NavLink>
    </nav>
  );
}
