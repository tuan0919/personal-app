import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export interface FilterValues {
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
  initial?: FilterValues;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  open,
  onClose,
  onApply,
  initial,
}) => {
  const [values, setValues] = useState<FilterValues>(
    initial || {
      minPrice: 0,
      maxPrice: 1000,
      iceCube: true,
      iceBlock: true,
      paidStatus: "all",
    }
  );

  const handleChange = <K extends keyof FilterValues>(
    key: K,
    val: FilterValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleApply = () => {
    onApply(values);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60 flex items-end justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="w-full max-w-md bg-white/60 bg-[radial-gradient(ellipse_at_top_left,rgba(255,182,193,0.4),rgba(255,255,255,0.6))] backdrop-blur-2xl border border-white/20 rounded-t-3xl p-6 pb-10 shadow-2xl"
          >
            <div className="h-1.5 w-12 bg-gray-300 rounded-full mx-auto mb-6" />
            {/* Close button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Bộ lọc nâng cao
            </h3>
            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Khoảng giá (₫)
              </label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={values.minPrice}
                  onChange={(e) => handleChange("minPrice", Number(e.target.value))}
                  min={0}
                  className="flex-1 h-10 bg-white/90"
                />
                <span>-</span>
                <Input
                  type="number"
                  value={values.maxPrice}
                  onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
                  min={0}
                  className="flex-1 h-10 bg-white/90"
                />
              </div>
            </div>
            {/* Ice Type Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại đá
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.iceCube}
                    onChange={(e) => handleChange("iceCube", e.target.checked)}
                  />
                  Đá viên
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.iceBlock}
                    onChange={(e) => handleChange("iceBlock", e.target.checked)}
                  />
                  Đá cây
                </label>
              </div>
            </div>
            {/* Payment Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tình trạng thanh toán
              </label>
              <div className="flex gap-3">
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
                      "flex-1 py-2 px-3 rounded-lg text-sm border transition shadow",
                      values.paidStatus === opt.value
                        ? "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white border-transparent shadow-md"
                        : "bg-white/80 text-gray-700 border-white/40 shadow"
                    )}
                    onClick={() => handleChange("paidStatus", opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl font-medium bg-white/70 backdrop-blur-sm text-gray-700 border border-white/40 shadow-md hover:bg-white/90"
                onClick={onClose}
              >
                Đóng
              </button>
              <button
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl"
                onClick={handleApply}
              >
                Áp dụng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
