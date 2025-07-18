import React from "react";
import { FiFilter } from "react-icons/fi";

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 sm:right-10 z-30 bg-white shadow-lg border border-gray-200 rounded-full p-3 text-blue-600 hover:bg-blue-50 transition-colors"
      aria-label="Bộ lọc"
    >
      <FiFilter className="w-5 h-5" />
    </button>
  );
};
