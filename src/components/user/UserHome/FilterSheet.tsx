import React, { useState, useEffect } from "react";
import { FiX, FiFilter } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { FilterValues } from "@/api/types";

// Extended filter values for UI
interface UIFilterValues extends FilterValues {
  minPrice: number;
  maxPrice: number;
  iceCube: boolean; // đá viên
  iceBlock: boolean; // đá cây
  paidStatus: "all" | "paid" | "unpaid";
}

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

// Hàm định dạng số
const formatNumber = (value: number): string => {
  return value.toLocaleString("vi-VN");
};

// Hàm chuyển đổi từ chuỗi đã định dạng thành số
const parseFormattedNumber = (formattedValue: string): number => {
  // Loại bỏ tất cả các ký tự không phải số
  const numericValue = formattedValue.replace(/[^\d]/g, "");
  return numericValue ? parseInt(numericValue, 10) : 0;
};

export const FilterSheet = ({
  open,
  onClose,
  onApply,
  initial,
}: FilterSheetProps) => {
  const [values, setValues] = useState<UIFilterValues>(
    initial || {
      minPrice: 0,
      maxPrice: 1000000,
      iceCube: true,
      iceBlock: true,
      paidStatus: "all",
    }
  );

  // State cho giá trị đã định dạng
  const [formattedMinPrice, setFormattedMinPrice] = useState(
    formatNumber(values.minPrice)
  );
  const [formattedMaxPrice, setFormattedMaxPrice] = useState(
    formatNumber(values.maxPrice)
  );

  // Cập nhật giá trị định dạng khi values thay đổi
  useEffect(() => {
    setFormattedMinPrice(formatNumber(values.minPrice));
    setFormattedMaxPrice(formatNumber(values.maxPrice));
  }, [values.minPrice, values.maxPrice]);

  const handleChange = <K extends keyof UIFilterValues>(
    key: K,
    val: UIFilterValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value;
    setFormattedMinPrice(formattedValue);
    const numericValue = parseFormattedNumber(formattedValue);
    handleChange("minPrice", numericValue as UIFilterValues["minPrice"]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value;
    setFormattedMaxPrice(formattedValue);
    const numericValue = parseFormattedNumber(formattedValue);
    handleChange("maxPrice", numericValue as UIFilterValues["maxPrice"]);
  };

  const handleApply = () => {
    // Convert UI filter values to API filter values
    const apiFilters: FilterValues = {
      paymentStatus:
        values.paidStatus === "all" ? undefined : values.paidStatus,
      productType:
        values.iceCube && values.iceBlock
          ? undefined
          : values.iceCube
          ? 2
          : values.iceBlock
          ? 1
          : undefined,
      delivered: undefined, // Can be extended later
      // Thêm lọc theo khoảng giá
      priceRange: {
        min: values.minPrice,
        max: values.maxPrice,
      },
    };

    onApply(apiFilters);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Định dạng lại khi blur
  const handleMinPriceBlur = () => {
    setFormattedMinPrice(formatNumber(values.minPrice));
  };

  const handleMaxPriceBlur = () => {
    setFormattedMaxPrice(formatNumber(values.maxPrice));
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
            <div className="px-6 pb-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <FiFilter className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Bộ lọc nâng cao
                    </h3>
                    <p className="text-sm text-white/70">
                      Tùy chỉnh kết quả tìm kiếm
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/30"
                >
                  <FiX className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Khoảng giá (₫)
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="text"
                    value={formattedMinPrice}
                    onChange={handleMinPriceChange}
                    onBlur={handleMinPriceBlur}
                    placeholder="Từ"
                    className="flex-1 h-12 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl text-center"
                  />
                  <span className="text-white/70">-</span>
                  <Input
                    type="text"
                    value={formattedMaxPrice}
                    onChange={handleMaxPriceChange}
                    onBlur={handleMaxPriceBlur}
                    placeholder="Đến"
                    className="flex-1 h-12 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl text-center"
                  />
                </div>
              </div>

              {/* Ice Type Toggle */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Loại đá
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer backdrop-blur-sm",
                      values.iceCube
                        ? "bg-white/30 border-white/50 text-white shadow-lg"
                        : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={values.iceCube}
                      onChange={(e) =>
                        handleChange("iceCube", e.target.checked)
                      }
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 rounded flex items-center justify-center">
                      {values.iceCube && (
                        <div className="w-2 h-2 bg-current rounded-sm" />
                      )}
                    </div>
                    <span className="font-medium">Đá viên</span>
                  </label>
                  <label
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer backdrop-blur-sm",
                      values.iceBlock
                        ? "bg-white/30 border-white/50 text-white shadow-lg"
                        : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/30"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={values.iceBlock}
                      onChange={(e) =>
                        handleChange("iceBlock", e.target.checked)
                      }
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 rounded flex items-center justify-center">
                      {values.iceBlock && (
                        <div className="w-2 h-2 bg-current rounded-sm" />
                      )}
                    </div>
                    <span className="font-medium">Đá cây</span>
                  </label>
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Tình trạng thanh toán
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { label: "Tất cả", value: "all" },
                      { label: "Chưa TT", value: "unpaid" },
                      { label: "Đã TT", value: "paid" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      className={clsx(
                        "py-3 px-2 rounded-xl text-sm font-medium border-2 transition-all backdrop-blur-sm",
                        values.paidStatus === opt.value
                          ? "bg-white/30 text-white border-white/50 shadow-lg"
                          : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:border-white/30"
                      )}
                      onClick={() => handleChange("paidStatus", opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 pt-4 border-t border-white/20">
              <div className="flex gap-3">
                <button
                  className="flex-1 py-4 rounded-xl font-semibold bg-gray-500/30 backdrop-blur-sm text-white hover:bg-gray-500/40 transition-colors border border-white/20"
                  onClick={onClose}
                >
                  Đóng
                </button>
                <button
                  className="flex-1 py-4 bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white rounded-xl font-semibold shadow-lg hover:from-blue-500/90 hover:to-blue-600/90 transition-all border border-blue-400/30"
                  onClick={handleApply}
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
