import React from "react";
import { FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-24 right-6 sm:right-10 z-30 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-2xl rounded-full p-4 text-white hover:shadow-3xl transition-all duration-300"
      aria-label="Bộ lọc"
      whileHover={{
        scale: 1.1,
        boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5,
      }}
    >
      <FiFilter className="w-6 h-6" />
    </motion.button>
  );
};
