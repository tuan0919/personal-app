import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-200 text-gray-700"
    >
      {theme === "light" && <FiSun className="w-5 h-5" />}
      {theme === "dark" && <FiMoon className="w-5 h-5" />}
      {theme === "system" && <FiMonitor className="w-5 h-5" />}
    </motion.button>
  );
}
