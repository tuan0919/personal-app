import React from "react";
import { FiX, FiFilter } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { FilterValues } from "@/api/types";
import { useFilterSheet, UIFilterValues } from "@/hooks/useFilterSheet";

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  onApply: (values: FilterValues) => void;
  initial?: UIFilterValues;
}

const sheetVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      duration: 0.4,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      duration: 0.3,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const FilterSheet: React.FC<FilterSheetProps> = ({
  open,
  onClose,
  onApply,
  initial,
}) => {
  const {
    values,
    formattedMinPrice,
    formattedMaxPrice,
    handleChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinPriceBlur,
    handleMaxPriceBlur,
    getApiFilters,
  } = useFilterSheet({ initial });

  const handleApply = () => {
    onApply(getApiFilters());
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Filter Sheet */}
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md rounded-t-3xl shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="h-1 w-12 bg-white/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <div className="flex items-center gap-2">
                <FiFilter className="text-white" />
                <h3 className="text-white font-semibold text-lg">Bộ lọc</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiX className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-t-3xl p-6 space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Khoảng giá</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">
                      Từ
                    </label>
                    <Input
                      value={formattedMinPrice}
                      onChange={handleMinPriceChange}
                      onBlur={handleMinPriceBlur}
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">
                      Đến
                    </label>
                    <Input
                      value={formattedMaxPrice}
                      onChange={handleMaxPriceChange}
                      onBlur={handleMaxPriceBlur}
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Product Type */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Loại sản phẩm
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="iceCube"
                      checked={values.iceCube}
                      onChange={(e) =>
                        handleChange("iceCube", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="iceCube"
                      className="ml-2 text-gray-700 select-none"
                    >
                      Đá viên
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="iceBlock"
                      checked={values.iceBlock}
                      onChange={(e) =>
                        handleChange("iceBlock", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="iceBlock"
                      className="ml-2 text-gray-700 select-none"
                    >
                      Đá cây
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Trạng thái thanh toán
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleChange("paidStatus", "all")}
                    className={clsx(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                      values.paidStatus === "all"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    Tất cả
                  </button>
                  <button
                    onClick={() => handleChange("paidStatus", "paid")}
                    className={clsx(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                      values.paidStatus === "paid"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    Đã thanh toán
                  </button>
                  <button
                    onClick={() => handleChange("paidStatus", "unpaid")}
                    className={clsx(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                      values.paidStatus === "unpaid"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    Chưa thanh toán
                  </button>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-colors"
              >
                Áp dụng bộ lọc
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
