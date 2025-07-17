import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}
export function Pagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors"
      >
        <FiChevronLeft className="text-gray-600" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <motion.button
          key={page}
          onClick={() => onChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === page
              ? "bg-pink-500 text-white shadow-lg"
              : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-pink-50 border border-gray-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page}
        </motion.button>
      ))}
      <button
        onClick={() => onChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 transition-colors"
      >
        <FiChevronRight className="text-gray-600" />
      </button>
    </div>
  );
}
