import { useState, useEffect } from "react";
import { FilterValues } from "@/api/types";

// Extended filter values for UI
export interface UIFilterValues extends FilterValues {
  minPrice: number;
  maxPrice: number;
  iceCube: boolean; // đá viên
  iceBlock: boolean; // đá cây
  paidStatus: "all" | "paid" | "unpaid";
}

// Hàm định dạng số
export const formatNumber = (value: number): string => {
  return value.toLocaleString("vi-VN");
};

// Hàm chuyển đổi từ chuỗi đã định dạng thành số
export const parseFormattedNumber = (formattedValue: string): number => {
  // Loại bỏ tất cả các ký tự không phải số
  const numericValue = formattedValue.replace(/[^\d]/g, "");
  return numericValue ? parseInt(numericValue, 10) : 0;
};

interface UseFilterSheetProps {
  initial?: UIFilterValues;
}

export function useFilterSheet({ initial }: UseFilterSheetProps = {}) {
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

  const getApiFilters = (): FilterValues => {
    // Convert UI filter values to API filter values
    return {
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
  };

  // Định dạng lại khi blur
  const handleMinPriceBlur = () => {
    setFormattedMinPrice(formatNumber(values.minPrice));
  };

  const handleMaxPriceBlur = () => {
    setFormattedMaxPrice(formatNumber(values.maxPrice));
  };

  return {
    // State
    values,
    formattedMinPrice,
    formattedMaxPrice,

    // Actions
    handleChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinPriceBlur,
    handleMaxPriceBlur,
    getApiFilters,
  };
}
