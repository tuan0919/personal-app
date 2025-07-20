import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function ToggleTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-primary dark:bg-primary text-black dark:text-white transition-colors duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
    </button>
  );
}

export default ToggleTheme;
