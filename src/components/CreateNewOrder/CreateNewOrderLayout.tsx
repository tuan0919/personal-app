import { ReactNode } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { FaArrowLeft, FaIceCream } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface CreateNewOrderLayoutProps {
  children: ReactNode;
}

export function CreateNewOrderLayout({ children }: CreateNewOrderLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://maxartkiller.com/website/gomobileux2/HTML/assets/img/bgshapes.png')]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 w-full bg-white/30 backdrop-blur-lg border-b border-white/30 shadow-md rounded-b-2xl px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          aria-label="Quay lại"
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-pink-100 transition"
        >
          <FaArrowLeft className="text-pink-400 text-xl" />
        </button>
        <FaIceCream className="text-pink-400 text-2xl" />
        <span className="text-lg font-bold text-gray-800 tracking-wide">
          Thêm thông tin giao hàng
        </span>
      </nav>

      <motion.main
        className="flex-1 overflow-y-auto px-3 pt-4 pb-24 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      <BottomNav />
    </div>
  );
}
