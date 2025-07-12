// /components/Home/AddOrderButton.tsx
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export function AddOrderButton() {
  return (
    <motion.section
      className="mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/attend"
        className="block w-full bg-gradient-to-r from-green-500 to-blue-400 text-white font-bold rounded-2xl shadow-lg px-4 py-3 text-center text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 hover:scale-105"
      >
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
          <FaPlusCircle className="text-xl drop-shadow-sm" />
        </motion.div>
        <span className="drop-shadow-sm">Thêm đơn giao đá</span>
      </Link>
    </motion.section>
  );
}
