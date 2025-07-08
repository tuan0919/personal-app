import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaDollarSign, FaCube, FaIceCream } from "react-icons/fa";
import { fadeInUp } from "./animations";
import { useCustomerDetailsAnimation } from "@/hooks/useCustomerDetailsAnimation";

interface Price {
  daCay: number;
  daBi: number;
}

interface PriceSectionProps {
  price: Price;
}

export function PriceSection({ price }: PriceSectionProps) {
  const ref = useRef(null);
  const controls = useCustomerDetailsAnimation(ref);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-pink-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-green-400 rounded-full p-2">
          <FaDollarSign className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Bảng giá sản phẩm</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-transparent"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <FaCube className="h-8 w-8 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-xs font-semibold">HOT</span>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-2">Đá Cây</h4>
            <p className="text-white/80 text-sm mb-4">
              Loại đá cao cấp, chất lượng tốt nhất
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{price.daCay}</span>
              <span className="text-lg font-medium">nghìn</span>
            </div>
            <p className="text-white/80 text-sm mt-1">per cây</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <FaIceCream className="h-8 w-8 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-xs font-semibold">ECO</span>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-2">Đá Bi</h4>
            <p className="text-white/80 text-sm mb-4">
              Đá bi tiết kiệm, giá hợp lý
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{price.daBi}</span>
              <span className="text-lg font-medium">nghìn</span>
            </div>
            <p className="text-white/80 text-sm mt-1">per bịch</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
