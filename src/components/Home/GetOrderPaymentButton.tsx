// /components/Home/AddOrderButton.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMoneyBillWave } from "react-icons/fa6";

export function GetOrderPaymentButton() {
  return (
    <motion.section
      className="mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/payment"
        className="block w-full bg-gradient-to-r from-blue-500 to-pink-400 text-white font-bold rounded-2xl shadow-lg px-4 py-3 text-center text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 hover:scale-105"
      >
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
          <FaMoneyBillWave className="text-xl drop-shadow-sm" />
        </motion.div>
        <span className="drop-shadow-sm">Thu tiền hóa đơn</span>
      </Link>
    </motion.section>
  );
}
